import os
import requests
import json
from dotenv import load_dotenv

# Core Imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage, SystemMessage

# DIRECT IMPORT (Bypasses the broken LangChain wrapper)
from duckduckgo_search import DDGS

load_dotenv()

# --- 1. Setup Tools ---

@tool
def fetch_bus_data(query: str = "") -> str:
    """Useful for getting the list of available buses, their schedules, prices, and stands. 
    Always use this when the user asks about bus timings, price, or availability."""
    try:
        # Assuming the Node.js backend is running on port 5000
        response = requests.get("http://localhost:5000/api/buses")
        if response.status_code == 200:
            return str(response.json())
        else:
            return "Failed to fetch bus data from the backend."
    except Exception as e:
        return f"Error fetching bus data: {str(e)}"

@tool
def web_search(query: str) -> str:
    """Useful for searching general travel information not related to specific bus schedules, 
    like hotels, tourist spots, or local transport at the destination."""
    try:
        # Direct implementation using the raw library
        results = DDGS().text(query, max_results=3)
        if not results:
            return "No results found on the web."
        return str(results)
    except Exception as e:
        return f"Web search failed: {str(e)}"

# Map tools for manual execution
tools_map = {
    "fetch_bus_data": fetch_bus_data,
    "web_search": web_search
}

# --- 2. Initialize LLM with Tools Bound ---
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.3
)

# Bind the tools
llm_with_tools = llm.bind_tools([fetch_bus_data, web_search])

# --- 3. Manage Memory Manually ---
SYSTEM_INSTRUCTION = """You are HamsafarAI, a helpful travel assistant for Gumla City, Jharkhand. 
Always start your response with 'Namaste!'. 
Answer in a friendly mix of Hindi and English (Hinglish).

CRITICAL INSTRUCTION: When providing bus details, you MUST explicitly state the 'stand' (Gumla Depot or Dunduriya Stand) for the bus. 

Use the 'fetch_bus_data' tool to get accurate bus schedules.
Use the 'web_search' tool for queries about hotels, places to visit, or things outside the database.
"""

# Global list to hold chat history
chat_history = [
    SystemMessage(content=SYSTEM_INSTRUCTION)
]

# --- 4. The "Agent" Logic (Manual Loop) ---
def get_ai_response(user_query: str) -> str:
    try:
        # 1. Add user message to history
        chat_history.append(HumanMessage(content=user_query))
        
        # 2. First call to LLM
        response = llm_with_tools.invoke(chat_history)
        
        # 3. Check if the LLM wants to use a tool
        while response.tool_calls:
            # Append the LLM's "thought"
            chat_history.append(response)
            
            # Execute the requested tools
            for tool_call in response.tool_calls:
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]
                
                # Run the actual tool function
                if tool_name in tools_map:
                    # Note: We pass the specific argument logic here
                    if tool_name == "web_search":
                        tool_result = tools_map[tool_name].invoke(tool_args.get("query", ""))
                    else:
                        tool_result = tools_map[tool_name].invoke(tool_args)
                else:
                    tool_result = f"Error: Tool {tool_name} not found."
                
                # Add the tool output to history
                chat_history.append(ToolMessage(
                    tool_call_id=tool_call["id"],
                    name=tool_name,
                    content=str(tool_result)
                ))
            
            # 4. Call LLM again to read the tool results
            response = llm_with_tools.invoke(chat_history)

        # 5. Append final answer and return
        chat_history.append(response)
        
        # Parse content if it's a list (Gemini 2.x behavior)
        content = response.content
        if isinstance(content, list):
            final_text = " ".join([block.get("text", "") for block in content if isinstance(block, dict) and "text" in block])
            return final_text
        return str(content)

    except Exception as e:
        return f"Maaf kijiye, main abhi process nahi kar pa raha hu. Error: {str(e)}"
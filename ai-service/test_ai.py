from rag_chain import get_ai_response

print("Testing Bus Query...")
try:
    response = get_ai_response("Bus to Ranchi kab hai?")
    print(f"Response: {response}")
except Exception as e:
    print(f"CRASHED: {e}")
    import traceback
    traceback.print_exc()

# 🚌 Gumla Gadi (Gumla Bus Tracking System)

> A centralized MERN Stack web application to track bus timings, routes, and details for commuters in Gumla, Jharkhand.

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Project Overview
**Gumla Gadi** is designed to solve the transportation information gap in Gumla. Currently, passengers struggle to know exact bus timings and specific departure locations (Main Depot vs. Dunduriya Stand). 

This project provides a digital interface to search for buses, view accurate schedules, and interact with an **AI Chatbot** for natural language queries (e.g., *"Ranchi jane wali next bus kab hai?"*).

### 🌟 Key Features
* **Dual-Depot Logic:** distinct filtering for **Gumla Bus Stand** (Main) and **Dunduriya Bus Stand**.
* **Search & Filter:** Find buses by Source, Destination, and Time.
* **AI Chatbot Assistant:** A smart assistant to answer travel queries instantly.
* **Admin Dashboard:** For bus operators to update timings and fleet details.
* **Responsive UI:** Optimized for mobile users (commuters).

---

## 🏗️ Architecture & Modules

The project is organized into a Monorepo structure containing three core modules:

### 1. 🎨 Frontend (`/client`)
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS (for mobile-first design)
* **State Management:** Context API / Redux Toolkit
* **Routing:** React Router DOM
* **Key Components:**
    * `BusSearchCard`: Displays timing and depot badges.
    * `ChatWidget`: Floating UI for the AI assistant.

### 2. ⚙️ Backend (`/server`)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Authentication:** JWT (JSON Web Tokens)
* **AI Integration:** LangChain / OpenAI API (or Gemini API) for the Chatbot logic.
* **API Structure:** RESTful architecture.

### 3. 🗄️ Database (`MongoDB`)
* **Platform:** MongoDB Atlas (Cloud)
* **Core Models:**
    * `User`: Admin and Public user data.
    * `Bus`: Vehicle details (Reg No, Operator Name).
    * `Schedule`: The core logic linking a Bus to a Route (Source, Destination, Via) and Time.
    * *Special Field:* `stand_location` (Enum: 'GUMLA_MAIN', 'DUNDURIYA').

---

## 🤖 The AI Chatbot Module
The application includes a Generative AI module located in `server/routes/aiRoutes.js`.

* **Function:** It acts as a "Concierge".
* **Workflow:**
    1.  User asks: *"Sham ko 5 baje Simdega ke liye bus hai?"*
    2.  Chatbot converts natural language to a Database Query (Text-to-SQL or Vector Search).
    3.  Fetches live data from the MongoDB `Schedule` collection.
    4.  Responds in simple Hinglish/English.

---
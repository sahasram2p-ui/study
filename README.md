# StudyPilot AI Assistant

StudyPilot is a professional, study-focused AI chatbot built with Flask and Google's GenAI Python SDK.

## Features

- Study and education focused responses
- Gemini integration
- Responsive professional UI
- Quick study question cards
- Sidebar topic navigation
- Chat history in the current browser session
- Typing/loading indicator
- Mobile responsive layout
- Domain restriction: unrelated questions are politely refused
- Academic-integrity guidance

## Project Structure

```text
studypilot_ai_assistant/
├── app.py
├── config.py
├── requirements.txt
├── .env
├── .gitignore
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Setup

### 1. Create and activate a virtual environment

Windows PowerShell:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```powershell
pip install -r requirements.txt
```

### 3. Add your Gemini API key

Open `.env` and replace:

```text
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

with your actual Gemini API key.

The model is configured as:

```text
gemini-3.1-flash-lite
```

### 4. Run the chatbot

```powershell
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

## Example Questions

- Explain photosynthesis in simple words.
- Create a 7-day study plan for my exams.
- Explain Newton's laws with examples.
- Help me understand Python loops.
- Give me 10 practice questions for algebra.
- Summarize this topic for revision.

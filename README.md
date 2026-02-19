# AI Scientific Calculator

A powerful full-stack web-based scientific calculator with both traditional and natural language input modes, powered by AI. Features advanced mathematical operations, trigonometric functions, intelligent parsing, and AI-driven problem solving.

## Features

### Calculator
- **Traditional Mode**: Full keypad with number and operator buttons
- **Natural Language Mode**: Type expressions in plain English (e.g., "sqrt(16)" or "2^10")
- **Scientific Functions**: sin, cos, tan, sqrt, log, ln, exponential, factorial
- **Calculation History**: Track all your calculations
- **Backend-powered**: All calculations validated and processed by the backend

### AI Assistant
- **Conversational Math**: Ask questions naturally (e.g., "What's the square root of 144?")
- **Step-by-Step Solutions**: Get detailed breakdowns of complex calculations
- **Smart Expression Parsing**: Understands natural language math expressions
- **Gemini AI Integration**: Optional integration with Google's Generative AI for advanced problem-solving
- **Fallback Parser**: Works without AI API key using smart expression parsing

### Design
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Modern gradient design with smooth interactions
- **Tab Navigation**: Easy switching between Calculator and AI Assistant

## Tech Stack

### Frontend
- React 18
- Vite
- CSS3 with gradients and animations

### Backend
- Node.js
- Express.js
- Math.js for mathematical calculations
- Google Generative AI SDK (optional)

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "AI Calculator"
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

4. (Optional) Set up AI integration:
   - Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Copy `backend/.env.example` to `backend/.env`
   - Add your API key: `GEMINI_API_KEY=your_key_here`

### Running the Application

#### Option 1: Using the startup script (Windows)
```bash
start-dev.bat
```

#### Option 2: Using the startup script (Linux/Mac)
```bash
chmod +x start-dev.sh
./start-dev.sh
```

#### Option 3: Manual startup
```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend
npm run dev
```

Then open your browser:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── Calculator.jsx          # Main calculator component
│   │   ├── Calculator.css          # Calculator styles
│   │   ├── Display.jsx             # Calculator display
│   │   ├── TraditionalKeypad.jsx   # Button keypad
│   │   ├── NaturalLanguageInput.jsx # Natural language input
│   │   ├── AIChat.jsx              # AI chat component
│   │   └── AIChat.css              # AI chat styles
│   ├── utils/
│   │   ├── api.js                  # API client functions
│   │   └── nlp.js                  # Natural language processing
│   ├── App.jsx                     # Root component with tabs
│   ├── App.css                     # App styles
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Entry point
├── backend/
│   ├── server.js                   # Express server
│   ├── package.json                # Backend dependencies
│   └── .env                        # Environment variables
├── vite.config.js                  # Vite configuration
├── package.json                    # Frontend dependencies
├── start-dev.bat                   # Windows startup script
├── start-dev.sh                    # Unix startup script
└── README.md                       # This file
```

## Usage

### Calculator Tab

#### Traditional Mode
1. Click the "Traditional" button
2. Use the keypad to enter numbers and operations
3. Press "=" to calculate
4. Use scientific function buttons for advanced operations

#### Natural Language Mode
1. Click the "Natural Language" button
2. Type your expression (e.g., "2 + 2", "sqrt(16)", "sin(45)")
3. Press Enter or click "Calculate"
4. Use example buttons for quick calculations

### AI Assistant Tab

1. Click the "AI Assistant" button
2. Type your math question in natural language
3. Get instant answers with explanations
4. Click "Show Steps" to see the step-by-step solution
5. View calculation history

## Supported Operations

### Basic Operations
- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Power: `^`
- Modulo: `%`

### Trigonometric Functions
- Sine: `sin(angle)` - angle in degrees
- Cosine: `cos(angle)` - angle in degrees
- Tangent: `tan(angle)` - angle in degrees

### Logarithmic Functions
- Log (base 10): `log(number)`
- Natural log: `ln(number)`
- Exponential: `exp(number)`

### Other Functions
- Square root: `sqrt(number)`
- Factorial: `factorial(number)` or `x!`
- Absolute value: `abs(number)`

## API Endpoints

### Backend API (Port 5000)

**Health Check**
```
GET /health
```

**Calculate Expression**
```
POST /api/calculate
Body: { "expression": "2 + 2 * 3" }
Response: { "expression": "...", "result": 8, "timestamp": "..." }
```

**AI-Powered Solve**
```
POST /api/ai-solve
Body: { "question": "What's the square root of 144?" }
Response: { "question": "...", "expression": "...", "result": 12, "explanation": "...", "method": "gemini-ai|fallback-parser" }
```

**Get Step-by-Step Solution**
```
POST /api/solve-steps
Body: { "expression": "2 + 2 * 3" }
Response: { "expression": "...", "steps": [...], "finalResult": 8, "method": "gemini-ai|simple" }
```

## Environment Variables

### Backend (.env file in `backend/` folder)

```
PORT=5000
GEMINI_API_KEY=your_api_key_here
```

### Frontend (Vite automatically loads)

```
VITE_API_URL=http://localhost:5000
```

## Building for Production

### Frontend
```bash
npm run build
```
Output: `dist/` folder

### Backend
Backend is ready to deploy. Update the `.env` file with production values.

### Full Stack Deployment
1. Build frontend: `npm run build`
2. Serve `dist/` folder with a web server
3. Deploy backend to a server (Heroku, Vercel, AWS, etc.)
4. Update `VITE_API_URL` to point to your backend URL

## Optional AI Integration

The calculator works perfectly without Google Gemini API, using a smart expression parser. To enable advanced AI features:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a free API key
3. Add to `backend/.env`: `GEMINI_API_KEY=your_key`
4. Restart the backend server

## Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Try: `npm run dev` in the backend folder

### Frontend won't connect to backend
- Ensure backend is running on http://localhost:5000
- Check browser console for errors
- Verify CORS is enabled in Express

### AI features not working
- Backend will work with or without API key
- Check backend logs for errors
- Ensure `GEMINI_API_KEY` is valid if using AI

## License

MIT License

## Contributing

Feel free to fork and submit pull requests!

@echo off
REM AI Calculator - Full Stack Startup Script for Windows

echo ==========================================
echo Starting AI Scientific Calculator
echo ==========================================
echo.

REM Start backend in new window
echo Starting backend server...
start "AI Calculator Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak

REM Start frontend in new window
echo Starting frontend development server...
start "AI Calculator Frontend" cmd /k "npm run dev"

echo.
echo ==========================================
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo ==========================================
echo.
echo Close the windows to stop the servers

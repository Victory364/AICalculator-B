#!/bin/bash

# AI Calculator - Full Stack Startup Script

echo "=========================================="
echo "Starting AI Scientific Calculator"
echo "=========================================="
echo ""

# Start backend
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

sleep 3

# Start frontend
echo "Starting frontend development server..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo ""
echo "=========================================="
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

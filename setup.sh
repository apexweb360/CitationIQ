#!/bin/bash
# ApexWeb360 Automated Project Setup
# Run once after duplicating _template/: ./setup.sh

set -e

PROJECT_NAME=$(basename "$PWD")

echo ""
echo "  ApexWeb360 Project Setup"
echo "  Initializing: $PROJECT_NAME"
echo ""

# 1. Python virtual environment
echo "[1/5] Creating Python virtual environment..."
python3 -m venv .venv
source .venv/bin/activate
echo "      .venv created and activated."

# 2. Backend dependencies
if [ -f "requirements.txt" ]; then
    echo "[2/5] Installing Python dependencies..."
    pip install -r requirements.txt --quiet
    echo "      Backend dependencies installed."
else
    echo "[2/5] No requirements.txt found. Skipping."
fi

# 3. Frontend dependencies
if [ -d "frontend" ]; then
    echo "[3/5] Installing React dependencies..."
    cd frontend && npm install --silent
    cd ..
    echo "      Frontend dependencies installed."
else
    echo "[3/5] No frontend/ folder found. Skipping."
fi

# 4. Environment file
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "[4/5] Copying .env.example to .env..."
        cp .env.example .env
        echo "      .env created. Fill in your secrets before running."
    else
        echo "[4/5] No .env.example found. Skipping."
    fi
else
    echo "[4/5] .env already exists. Skipping."
fi

# 5. Git init
echo "[5/5] Initializing git repository..."
git init
git add .
git commit -m "feat: initial ApexWeb360 scaffold"
echo "      Git repository initialized with first commit."

echo ""
echo "  Setup complete: $PROJECT_NAME"
echo ""
echo "  Commands:"
echo "    make dev-back   — start FastAPI server"
echo "    make dev-front  — start React dev server"
echo "    make test       — run all tests"
echo ""

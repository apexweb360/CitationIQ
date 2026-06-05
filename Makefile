.PHONY: dev-back dev-front test install clean

dev-back:
	source .venv/bin/activate && uvicorn backend.main:app --reload --port 8000

dev-front:
	cd frontend && npm run dev

test:
	source .venv/bin/activate && pytest tests/ -v
	cd frontend && npm test

install:
	python3 -m venv .venv
	source .venv/bin/activate && pip install -r requirements.txt
	cd frontend && npm install

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
	rm -rf frontend/dist frontend/node_modules .venv

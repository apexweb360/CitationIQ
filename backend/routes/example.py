# routes/example.py — Transport Layer Only
from fastapi import APIRouter, HTTPException
from services.example_service import run_example
from models.example import ExampleRequest, ExampleResponse

router = APIRouter()

@router.post("/example", response_model=ExampleResponse)
async def example_endpoint(payload: ExampleRequest):
    try:
        result = await run_example(payload)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

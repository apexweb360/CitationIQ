# services/example_service.py — Thick Service (Domain Logic Lives Here)
from models.example import ExampleRequest, ExampleResponse

async def run_example(payload: ExampleRequest) -> ExampleResponse:
    try:
        return ExampleResponse(message=f"Processed: {payload.input}")
    except Exception as e:
        raise RuntimeError(f"example_service failed: {e}")

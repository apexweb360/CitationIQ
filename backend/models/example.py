# models/example.py — Pydantic Schemas
from pydantic import BaseModel

class ExampleRequest(BaseModel):
    input: str

class ExampleResponse(BaseModel):
    message: str

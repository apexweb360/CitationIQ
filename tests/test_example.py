# tests/test_example.py — Backend unit test stub
# Run: pytest

import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from models.example import ExampleRequest

def test_example_request_model():
    payload = ExampleRequest(input="hello")
    assert payload.input == "hello"

def test_example_request_empty_string():
    payload = ExampleRequest(input="")
    assert payload.input == ""

# utils/helpers.py — Pure Utility Functions. No API calls, no side effects.

def format_currency(amount: float) -> str:
    return f"${amount:,.2f}"

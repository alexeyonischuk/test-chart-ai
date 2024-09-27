import os

from dotenv import load_dotenv
from pydantic import BaseModel


load_dotenv()

class ChartIQ(BaseModel):
    open_ai_api_key: str
    assistant_id: str

class Config(BaseModel):
    chart_iq: ChartIQ


def load_config() -> Config:
    """Get service environmental config."""
    
    return Config(
        chart_iq=ChartIQ(
            open_ai_api_key=os.environ["OPENAI_API_KEY"],
            assistant_id=os.environ["ASSISTANT_ID"]
        )
    )

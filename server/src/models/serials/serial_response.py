from typing import Optional
from pydantic import BaseModel

class SerialResponse(BaseModel):

    message: str
    details: Optional[str]
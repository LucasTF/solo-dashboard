from typing import Optional
from typing_extensions import Annotated
from pydantic import BaseModel, Field

class ValidResponse(BaseModel):

    message: str
    details: Annotated[Optional[str], Field(default=None)]
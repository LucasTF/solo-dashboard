from typing_extensions import Annotated
from pydantic import BaseModel, Field, PositiveFloat, PositiveInt

from src.types.sondagem_types import SondagemPercussaoType


class ValidSondagemPercussao(BaseModel):
    sondagens: Annotated[PositiveInt, Field()]
    metros: Annotated[PositiveFloat, Field()]

    @classmethod
    def serialize(cls, sondagem: SondagemPercussaoType):
        return ValidSondagemPercussao(
            sondagens=sondagem.get("sondagens"), metros=sondagem.get("metros")
        )

from typing import TypedDict


class SondagemPercussaoType(TypedDict):
    sondagens: int
    metros: float


class SondagemTradoType(TypedDict):
    sondagens: int
    metros: float


class SondagemRotativaType(TypedDict):
    sondagens: int
    metros_solo: float
    metros_rocha: float

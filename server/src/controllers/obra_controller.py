from typing import Dict, List
from src.controllers.interfaces.obra_controller_interface import ObraControllerInterface
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.interfaces.obra_repository_interface import ObraRepositoryInterface
from src.types.obra_response import ObraResponse
from src.types.obra_types import ObraInsertType
from src.validators.valid_obra import ValidObra
from src.validators.valid_sondagens import ValidSondagemPercussao


class ObraController(ObraControllerInterface):
    def __init__(self, obra_repository: ObraRepositoryInterface) -> None:
        self.__repository = obra_repository

    def create(self, obra_info: ObraInsertType) -> None:
        self.__validate_obra(obra_info)

        self.__repository.insert_obra(obra_info)

    def find_by_id(self, obra_id: int) -> ObraResponse:
        obra = self.__repository.get_obra_by_id(obra_id)

        if obra is None:
            raise UnavailableResourceError("Obra")

        return obra

    def find_by_cod(self, obra_cod: int) -> ObraResponse:
        obra = self.__repository.get_obra_by_cod(obra_cod)

        if obra is None:
            raise UnavailableResourceError("Obra")

        return obra

    def list(self) -> List[ObraResponse]:
        obras = self.__repository.list_obras()

        return obras

    def update(self, obra_id: int, obra_info: Dict) -> None:
        obra = self.find_by_id(obra_id)

        self.__validate_edit_info(obra, obra_info)
        self.__repository.update_obra(obra_id, obra_info)

    def search(self, search_string: str) -> List[ObraResponse]:
        obras = self.__repository.search_obras(search_string)

        return obras

    def __validate_edit_info(self, obra: ObraResponse, update_info: Dict) -> None:
        edit_obra_dict = {
            "id": obra.id,
            "cod_obra": update_info["cod_obra"]
            if update_info.get("cod_obra") is not None
            else obra.cod_obra,
            "num_obra": update_info["num_obra"]
            if update_info.get("num_obra") is not None
            else obra.num_obra,
            "ano": update_info["ano"]
            if update_info.get("ano") is not None
            else obra.ano,
            "data_inicio": update_info["data_inicio"]
            if update_info.get("data_inicio") is not None
            else obra.data_inicio,
            "data_fim": update_info["data_fim"]
            if update_info.get("data_fim") is not None
            else obra.data_fim,
            "cidade": update_info["cidade"]
            if update_info.get("cidade") is not None
            else obra.cidade,
            "uf": update_info["uf"] if update_info.get("uf") is not None else obra.uf,
            "logradouro": update_info["logradouro"]
            if update_info.get("logradouro") is not None
            else obra.logradouro,
            "bairro": update_info["bairro"]
            if update_info.get("bairro") is not None
            else obra.bairro,
            "cliente": update_info["cliente"]
            if update_info.get("cliente") is not None
            else obra.cliente,
            "tipo_logo": update_info["tipo_logo"]
            if update_info.get("tipo_logo") is not None
            else obra.tipo_logo,
            "complemento": update_info["complemento"]
            if update_info.get("complemento") is not None
            else obra.complemento,
            "lote": update_info["lote"]
            if update_info.get("lote") is not None
            else obra.lote,
            "quadra": update_info["quadra"]
            if update_info.get("quadra") is not None
            else obra.quadra,
            "cep": update_info["cep"]
            if update_info.get("cep") is not None
            else obra.cep,
            "proprietario": update_info["proprietario"]
            if update_info.get("proprietario") is not None
            else obra.proprietario,
        }
        obra_to_validate = ObraResponse(**edit_obra_dict)
        ValidObra.serialize(obra_to_validate)

    def __validate_obra(self, obra_info: ObraInsertType) -> ValidObra:
        valid_obra = ValidObra(
            cod_obra=obra_info.get("cod_obra"),
            num_obra=obra_info.get("num_obra"),
            ano=obra_info.get("ano"),
            data_inicio=obra_info.get("data_inicio"),
            data_fim=obra_info.get("data_fim"),
            tipo_logo=obra_info.get("tipo_logo"),
            logradouro=obra_info.get("logradouro"),
            lote=obra_info.get("lote"),
            quadra=obra_info.get("quadra"),
            bairro=obra_info.get("bairro"),
            cidade=obra_info.get("cidade"),
            uf=obra_info.get("uf"),
            cep=obra_info.get("cep"),
            complemento=obra_info.get("complemento"),
            cliente=obra_info.get("cliente"),
            proprietario=obra_info.get("proprietario"),
        )

        if obra_info.get("sondagem_percussao") is not None:
            ValidSondagemPercussao.serialize(obra_info["sondagem_percussao"])

        return valid_obra

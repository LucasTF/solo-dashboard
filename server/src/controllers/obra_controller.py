from typing import Dict, List
from src.controllers.interfaces.obra_controller_interface import ObraControllerInterface
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.interfaces.obra_repository_interface import ObraRepositoryInterface
from src.types.obra_response import ObraResponse
from src.validators.valid_cliente import ValidCliente
from src.validators.valid_obra import ValidObra


class ObraController(ObraControllerInterface):
    def __init__(self, obra_repository: ObraRepositoryInterface) -> None:
        self.__repository = obra_repository

    def create(self, obra_info: Dict) -> None:
        valid_obra = self.__validate_obra(obra_info)
        self.__validate_cliente(obra_info.get("cliente"))
        if obra_info.get("proprietario"):
            self.__validate_cliente(obra_info.get("proprietario"))

        self.__repository.insert_obra(
            cod_obra=valid_obra.cod_obra,
            num_obra=valid_obra.num_obra,
            ano=valid_obra.ano,
            data_inicio=valid_obra.data_inicio,
            data_fim=valid_obra.data_fim,
            tipo_logo=valid_obra.tipo_logo,
            logradouro=valid_obra.logradouro,
            lote=valid_obra.lote,
            quadra=valid_obra.quadra,
            bairro=valid_obra.bairro,
            cidade=valid_obra.cidade,
            uf=valid_obra.uf,
            cep=valid_obra.cep,
            complemento=valid_obra.complemento,
            cliente=obra_info.get("cliente"),
            proprietario=obra_info.get("proprietario"),
        )

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
        self.__validate_edit_info(obra_info)
        self.__repository.update_obra(
            id=obra_id,
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

    def search(self, search_string: str) -> List[ObraResponse]:
        obras = self.__repository.search_obras(search_string)

        return obras

    def __validate_edit_info(self, obra_info: Dict) -> None:
        if obra_info.get("cod_obra"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "cod_obra", obra_info["cod_obra"]
            )
        if obra_info.get("num_obra"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "num_obra", obra_info["num_obra"]
            )
        if obra_info.get("ano"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "ano", obra_info["ano"]
            )
        if obra_info.get("data_inicio"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "data_inicio", obra_info["data_inicio"]
            )
        if obra_info.get("data_fim"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "data_fim", obra_info["data_fim"]
            )
        if obra_info.get("tipo_logo"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "tipo_logo", obra_info["tipo_logo"]
            )
        if obra_info.get("logradouro"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "logradouro", obra_info["logradouro"]
            )
        if obra_info.get("lote"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "lote", obra_info["lote"]
            )
        if obra_info.get("quadra"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "quadra", obra_info["quadra"]
            )
        if obra_info.get("bairro"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "bairro", obra_info["bairro"]
            )
        if obra_info.get("cidade"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "cidade", obra_info["cidade"]
            )
        if obra_info.get("uf"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "uf", obra_info["uf"]
            )
        if obra_info.get("cep"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "cep", obra_info["cep"]
            )
        if obra_info.get("complemento"):
            ValidObra.__pydantic_validator__.validate_assignment(
                ValidObra.model_construct(), "complemento", obra_info["complemento"]
            )
        if obra_info.get("cliente"):
            self.__validate_cliente(obra_info["cliente"])
        if obra_info.get("proprietario"):
            self.__validate_cliente(obra_info["proprietario"])

    def __validate_cliente(self, cliente_name: str) -> None:
        try:
            ValidCliente.__pydantic_validator__.validate_assignment(
                ValidCliente.model_construct(), "nome", cliente_name
            )
        except ValueError:
            raise ValueError("Nome do cliente/proprietário é inválido.")

    def __validate_obra(self, obra_info: Dict) -> ValidObra:
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
        )

        return valid_obra

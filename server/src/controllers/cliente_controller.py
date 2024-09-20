from typing import Dict, List
from src.controllers.interfaces.cliente_controller_interface import ClienteControllerInterface
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.cliente import Cliente
from src.models.interfaces.cliente_repository_interface import ClienteRepositoryInterface


class ClienteController(ClienteControllerInterface):

    def __init__(self, clienteRepository : ClienteRepositoryInterface) -> None:
        self.__repository = clienteRepository

    def create(self, cliente_info: Dict) -> None:
        raise NotImplementedError

    def find_by_id(self, cliente_id: int) -> Cliente:
        cliente = self.__repository.get_cliente_by_id(cliente_id)

        if cliente is None:
            raise UnavailableResourceError("Cliente")
        
        return cliente

    def list(self) -> List[Cliente]:
        clientes = self.__repository.list_clientes()

        return clientes

    def search(self, search_string: str) -> List[Cliente]:
        clientes = self.__repository.search_clientes(search_string)

        return clientes

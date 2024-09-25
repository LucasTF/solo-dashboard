from typing import Dict, List
from src.controllers.interfaces.cliente_controller_interface import ClienteControllerInterface
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.cliente import Cliente
from src.models.interfaces.cliente_repository_interface import ClienteRepositoryInterface
from src.models.serials.serial_cliente import SerialCliente


class ClienteController(ClienteControllerInterface):

    def __init__(self, clienteRepository : ClienteRepositoryInterface) -> None:
        self.__repository = clienteRepository

    def create(self, cliente_info: Dict) -> None:
        self.__validate_cliente(cliente_info)

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
    
    def __validate_cliente(self, cliente_dict: Dict) -> SerialCliente:
        serialized_cliente = SerialCliente(
            nome=cliente_dict.get('nome'), 
            apelido=cliente_dict.get('apelido'),
            cpf=cliente_dict.get('cpf'),
            cnpj=cliente_dict.get('cnpj'),
            tipo_logo=cliente_dict.get('tipo_logo'),
            logradouro=cliente_dict.get('logradouro'),
            complemento=cliente_dict.get('complemento'),
            bairro=cliente_dict.get('bairro'),
            cidade=cliente_dict.get('cidade'),
            uf=cliente_dict.get('uf'),
            cep=cliente_dict.get('cep'),
            email=cliente_dict.get('email'),
            fone1=cliente_dict.get('fone1'),
            fone2=cliente_dict.get('fone2'),
        )

        return serialized_cliente

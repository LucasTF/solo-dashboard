from typing import Dict, List
from src.controllers.interfaces.cliente_controller_interface import ClienteControllerInterface
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.cliente import Cliente
from src.models.interfaces.cliente_repository_interface import ClienteRepositoryInterface
from src.validators.valid_cliente import ValidCliente


class ClienteController(ClienteControllerInterface):

    def __init__(self, clienteRepository : ClienteRepositoryInterface) -> None:
        self.__repository = clienteRepository

    def create(self, cliente_info: Dict) -> None:
        valid_cliente = self.__validate_cliente(cliente_info)
        self.__repository.insert_cliente(
            nome=valid_cliente.nome,
            apelido=valid_cliente.apelido,
            cpf=valid_cliente.apelido,
            cnpj=valid_cliente.cnpj,
            tipo_logo=valid_cliente.tipo_logo,
            logradouro=valid_cliente.logradouro,
            complemento=valid_cliente.complemento,
            bairro=valid_cliente.bairro,
            cidade=valid_cliente.cidade,
            cep=valid_cliente.cep,
            email=valid_cliente.email,
            uf=valid_cliente.uf,
            fone1=valid_cliente.fone1,
            fone2=valid_cliente.fone2
        )

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
    
    def __validate_cliente(self, cliente_dict: Dict) -> ValidCliente:
        valid_cliente = ValidCliente(
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

        return valid_cliente

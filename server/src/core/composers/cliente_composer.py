from enum import Enum

from src.controllers.cliente_controller import ClienteController
from src.errors.invalid_operation_error import InvalidOperationError
from src.models.repositories.cliente_repository import ClienteRepository
from src.views.api.clientes.cliente_create_view import ClienteCreateView
from src.views.api.clientes.cliente_find_by_id_view import ClienteFindByIdView
from src.views.api.clientes.cliente_list_view import ClienteListView
from src.views.api.interfaces.view_interface import ViewInterface

from src.database.connector import db_connector

class ClienteAction(Enum):
    CREATE = 1,
    FIND_BY_ID = 2,
    LIST = 3,

def compose_cliente(action: ClienteAction) -> ViewInterface:

    repository = ClienteRepository(db_connector)
    controller = ClienteController(repository)

    match action:
        case ClienteAction.CREATE:
            return ClienteCreateView(controller)
        case ClienteAction.FIND_BY_ID:
            return ClienteFindByIdView(controller)
        case ClienteAction.LIST:
            return ClienteListView(controller)
        case _:
            raise InvalidOperationError('Ação para <Cliente> não encontrada.')
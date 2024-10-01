from typing import List
from src.controllers.interfaces.cliente_controller_interface import ClienteControllerInterface
from src.services.pagination_service import PaginationService
from src.validators.valid_cliente import ValidCliente
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ClienteListView(ViewInterface):

    def __init__(self, controller: ClienteControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        page = http_request.params.get('page')
        entries_per_page = http_request.params.get('entries_per_page')
        search = http_request.params.get('search')

        clientes = []

        if search is None:
            clientes = self.__controller.list()
        else:
            clientes = self.__controller.search(search)

        pag_service = PaginationService(clientes)
        paginated_clientes = pag_service.paginate(page, entries_per_page)

        data : List[ValidCliente] = []

        for cliente in paginated_clientes:
            valid_cliente = ValidCliente.serialize(cliente)
            data.append(valid_cliente.model_dump())

        return HttpResponse(status_code=200, body=pag_service.create_paginated_response(data))
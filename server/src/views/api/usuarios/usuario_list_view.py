import math
from typing import List
from src.controllers.interfaces.usuario_controller_interface import UsuarioControllerInterface
from src.services.pagination_service import PaginationService
from src.validators.valid_usuario import ValidUsuario
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class UsuarioListView(ViewInterface):

    def __init__(self, controller: UsuarioControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        page = http_request.params['page']
        entries_per_page = http_request.params['entries_per_page']
        search = http_request.params['search']

        usuarios = []

        if search is None:
            usuarios = self.__controller.list()
        else:
            usuarios = self.__controller.search(search)

        pag_service = PaginationService(usuarios)
        paginated_usuarios = pag_service.paginate(page, entries_per_page)

        data : List[ValidUsuario] = []

        for usuario in paginated_usuarios:
            valid_user = ValidUsuario.serialize(usuario)
            data.append(valid_user.model_dump())

        return HttpResponse(status_code=200, body=pag_service.create_paginated_response(data))
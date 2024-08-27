import math
from typing import List
from src.controllers.interfaces.usuario_controller_interface import UsuarioControllerInterface
from src.models.serials.serial_usuario import SerialUsuario
from src.utils.pagination import paginate
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

        total_usuarios = len(usuarios)
        total_pages = math.ceil(total_usuarios / entries_per_page)

        paginated_usuarios = paginate(usuarios, page, entries_per_page)

        data : List[SerialUsuario] = []

        for usuario in paginated_usuarios:
            serial_user = SerialUsuario.serialize(usuario)
            data.append(serial_user.model_dump())

        body_response = {
            "total_usuarios": total_usuarios,
            "total_pages": total_pages,
            "data": data
        }

        return HttpResponse(status_code=200, body=body_response)
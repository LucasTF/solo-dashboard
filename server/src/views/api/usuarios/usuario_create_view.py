from src.controllers.usuario_controller import UsuarioController
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class UsuarioCreateView(ViewInterface):

    def __init__(self, controller: UsuarioController) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        user_info = http_request.body
        body_response = self.__controller.create(user_info)

        return HttpResponse(status_code=201, body=body_response)
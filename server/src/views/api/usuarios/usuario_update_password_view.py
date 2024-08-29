from src.controllers.interfaces.usuario_controller_interface import UsuarioControllerInterface
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class UsuarioUpdatePasswordView(ViewInterface):

    def __init__(self, controller: UsuarioControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        usuario_id = http_request.params["id"]
        new_password = http_request.body.get("password")

        if new_password is None:
            return HttpResponse(status_code=400)
        
        self.__controller.update_password(usuario_id, new_password)

        return HttpResponse(status_code=204)
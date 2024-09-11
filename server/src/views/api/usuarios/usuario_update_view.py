from src.controllers.interfaces.usuario_controller_interface import UsuarioControllerInterface
from src.errors.invalid_operation_error import InvalidOperationError
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class UsuarioUpdateView(ViewInterface):

    def __init__(self, controller: UsuarioControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        usuario_id = http_request.params["id"]
        token_id = http_request.params["token_id"]

        if usuario_id == token_id:
            raise InvalidOperationError(f"Usuário com <id: {usuario_id}> não pode alterar a si mesmo.")

        request_body = http_request.body
        self.__controller.update(usuario_id, request_body)

        return HttpResponse(status_code=204)
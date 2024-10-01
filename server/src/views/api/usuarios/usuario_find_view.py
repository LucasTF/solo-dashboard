from src.controllers.interfaces.usuario_controller_interface import UsuarioControllerInterface
from src.models.entities.usuario import Usuario
from src.validators.valid_response import ValidResponse
from src.validators.valid_usuario import ValidUsuario
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class UsuarioFindView(ViewInterface):

    def __init__(self, controller: UsuarioControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        identifier = http_request.params.get('identifier')

        usuario : Usuario = None

        try:
            id = int(identifier)
            usuario = self.__controller.find_by_id(id)
        except ValueError:
            usuario = self.__controller.find_by_email(identifier)

        if usuario is not None:
            body_response = ValidUsuario.serialize(usuario).model_dump()
            return HttpResponse(status_code=200, body=body_response)
        
        return HttpResponse(
            status_code=404, 
            body=ValidResponse(message="Usuário não encontrado.").model_dump(exclude_none=True)
        )
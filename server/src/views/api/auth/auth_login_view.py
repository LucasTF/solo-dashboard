from src.controllers.interfaces.auth_controller_interface import AuthControllerInterface
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class AuthLoginView(ViewInterface):

    def __init__(self, auth_controller: AuthControllerInterface) -> None:
        self.__auth_controller = auth_controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        email = http_request.body.get("email")
        password = http_request.body.get("password")

        response = self.__auth_controller.authenticate(email, password)

        return HttpResponse(status_code=200, body={
            "data": response
        })

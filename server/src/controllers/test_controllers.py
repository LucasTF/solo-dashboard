import unittest
import pytest

from src.controllers.usuario_controller import UsuarioController
from src.models.repositories.usuario_repository import UsuarioRepository

from src.database.connector import db_connector
from src.models.serials.serial_response import SerialResponse

# Personal test cases for usage with specific setup database
# Should not be run as legitimate tests

@pytest.mark.skip(reason="Tests directly into the real database.")
class IntegrationUsuarioControllerTestCase(unittest.TestCase):
    
    def setUp(self) -> None:
        db_connector.connect_to_db()
        self.__controller = UsuarioController(UsuarioRepository(db_connector))

    def test_create(self) -> None:

        sample_usuario = {
            "name": "Test User",
            "email": "test@create.com",
            "password": "123456",
            "is_admin": True
        }

        result = self.__controller.create(sample_usuario)

        self.assertIsInstance(result, SerialResponse)
        self.assertEqual(result.message, 'Usuário criado com sucesso.')
import unittest
from unittest.mock import Mock

from src.controllers.usuario_controller import UsuarioController
from src.models.serials.serial_response import SerialResponse
from src.models.serials.serial_usuario import SerialUsuario


class UsuarioControllerTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.__repository = Mock()
        self.__controller = UsuarioController(self.__repository)

    def test_create_without_id(self):

        # Sample without ID
        sample_dict = {
            "name": "John Doe",
            "email": "test@email.com",
            "password": "123456",
            "is_admin": False
        }

        result = self.__controller.create(sample_dict)

        self.assertIsInstance(result, SerialResponse)
        self.assertEqual(result.message, 'Usuário criado com sucesso.')

    def test_create_without_is_admin_and_id(self):

        # Sample without is_admin
        sample_dict = {
            "name": "Jane Doe",
            "email": "test@email.com",
            "password": "123456"
        }

        result = self.__controller.create(sample_dict)

        self.assertIsInstance(result, SerialResponse)
        self.assertEqual(result.message, 'Usuário criado com sucesso.')

    def test_create_with_invalid_name(self):

        # Names cannot contain numbers
        sample_dict = {
            "name": "John95 Asp",
            "email": "john@test.com",
            "password": "123456"
        }

        result = self.__controller.create(sample_dict)

        self.assertIsInstance(result, SerialResponse)
        self.assertNotEqual(result.message, 'Usuário criado com sucesso.')
        self.assertEqual(result.details, 'Dados inválidos.')

    def test_create_with_invalid_email(self):

        # Email in the wrong format
        sample_dict = {
            "name": "John Doe",
            "email": "notvalidemail",
            "password": "123456"
        }

        result = self.__controller.create(sample_dict)

        self.assertIsInstance(result, SerialResponse)
        self.assertNotEqual(result.message, 'Usuário criado com sucesso.')
        self.assertEqual(result.details, 'Dados inválidos.')

    def test_find_by_id(self):

        sample_usuario = SerialUsuario(
            id=1,
            name="John Doe",
            email="email@test.com",
            password="123456",
            is_admin=False
        )

        self.__repository.get_usuario_by_id.return_value = sample_usuario

        result = self.__controller.find_by_id(1)

        self.__repository.get_usuario_by_id.assert_called_once_with(1)
        self.assertEqual(result, sample_usuario)

    def test_find_by_id_not_found(self):

        self.__repository.get_usuario_by_id.return_value = None

        result = self.__controller.find_by_id(1)

        self.__repository.get_usuario_by_id.assert_called_once_with(1)
        self.assertIsNone(result)

    def test_find_by_email(self):

        sample_email = "email@test.com"

        sample_usuario = SerialUsuario(
            id=1,
            name="John Doe",
            email=sample_email,
            password="123456",
            is_admin=False
        )

        self.__repository.get_usuario_by_email.return_value = sample_usuario

        result = self.__controller.find_by_email(sample_email)

        self.__repository.get_usuario_by_email.assert_called_once_with(sample_email)
        self.assertEqual(result, sample_usuario)

    def test_find_by_email_not_found(self):

        sample_email = "email@test.com"

        self.__repository.get_usuario_by_email.return_value = None

        result = self.__controller.find_by_email(sample_email)

        self.__repository.get_usuario_by_email.assert_called_once_with(sample_email)
        self.assertIsNone(result)
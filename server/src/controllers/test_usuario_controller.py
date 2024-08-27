import unittest
from unittest import mock
from unittest.mock import Mock

import pytest

from src.controllers.usuario_controller import UsuarioController
from src.models.entities.usuario import Usuario
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

        sample_serial = SerialUsuario(
            name=sample_dict["name"],
            email=sample_dict["email"],
            password=sample_dict["password"],
            is_admin=sample_dict["is_admin"]
            )

        with mock.patch.object(self.__controller, '_UsuarioController__validate_usuario', return_value=sample_serial) as validate_method:
            self.__controller.create(sample_dict)

            validate_method.assert_called_once_with(sample_dict)
            self.__repository.insert_usuario.assert_called_once()

    def test_create_without_is_admin_and_id(self):

        # Sample without is_admin
        sample_dict = {
            "name": "Jane Doe",
            "email": "test@email.com",
            "password": "123456"
        }

        sample_serial = SerialUsuario(
            name=sample_dict["name"],
            email=sample_dict["email"],
            password=sample_dict["password"],
            )

        with mock.patch.object(self.__controller, '_UsuarioController__validate_usuario', return_value=sample_serial) as validate_method:
            self.__controller.create(sample_dict)

            validate_method.assert_called_once_with(sample_dict)
            self.__repository.insert_usuario.assert_called_once()

    def test_create_with_invalid_name(self):

        # Names cannot contain numbers
        sample_dict = {
            "name": "John95 Asp",
            "email": "john@test.com",
            "password": "123456"
        }

        with pytest.raises(Exception):
            self.__controller.create(sample_dict)


    def test_create_with_invalid_email(self):

        # Email in the wrong format
        sample_dict = {
            "name": "John Doe",
            "email": "notvalidemail",
            "password": "123456"
        }

        with pytest.raises(Exception):
            self.__controller.create(sample_dict)


    def test_find_by_id(self):

        sample_usuario = Usuario(
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

        sample_usuario = Usuario(
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

    def test_list(self):

        sample_usuarios = [
            Usuario(id=1, name='John Doe', email='john_doe@email.com', password='123456', is_admin=False),
            Usuario(id=2, name='Jane Doe', email='jane_doe@email.com', password='123456', is_admin=True)
        ]

        self.__repository.list_usuarios.return_value = sample_usuarios

        result = self.__controller.list()

        self.__repository.list_usuarios.assert_called_once()
        self.assertEqual(len(result), 2)
        self.assertIsInstance(result[0], Usuario)
        self.assertEqual(result[0].name, 'John Doe')
        self.assertIsInstance(result[1], Usuario)
        self.assertEqual(result[1].name, 'Jane Doe')

    def test_list_empty(self):

        self.__repository.list_usuarios.return_value = []

        result = self.__controller.list()

        self.__repository.list_usuarios.assert_called_once()
        self.assertEqual(len(result), 0)

    def test_delete(self):

        usuario_id = 1

        self.__controller.delete(usuario_id)

        self.__repository.delete_usuario.assert_called_once_with(usuario_id)

    def test_update_password(self):

        usuario_id = 1
        new_password = 'newpassword'
        hashed_new_password = 'hashedpassword'

        with mock.patch.object(self.__controller, '_UsuarioController__hash_password', return_value=hashed_new_password) as hash_method:
            self.__controller.update_password(usuario_id, new_password)

            hash_method.assert_called_once_with(new_password)

            self.__repository.update_usuario_password.assert_called_once_with(usuario_id, hashed_new_password)

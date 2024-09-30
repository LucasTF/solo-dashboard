from unittest import TestCase
from unittest.mock import Mock

import pytest

from src.controllers.cliente_controller import ClienteController


class ClienteControllerTestCase(TestCase):

    def setUp(self) -> None:
        self.__repository = Mock()
        self.__controller = ClienteController(self.__repository)
        self.__sample_dict = {
            "nome": "Sample Empresa"
        }

    def test_create_with_only_required_params(self):
        self.__controller.create(self.__sample_dict)

        self.__repository.insert_cliente.assert_called_once()

    def test_uf(self):
        self.__sample_dict.update({"uf": "SP"})

        self.__controller.create(self.__sample_dict)

    def test_uf_with_wrong_number_of_characters(self):
        dict1 = self.__sample_dict | {"uf": "S"}

        with pytest.raises(ValueError):
            self.__controller.create(dict1)

        dict2 = self.__sample_dict | {"uf": "SSP"}

        with pytest.raises(ValueError):
            self.__controller.create(dict2)

    def test_create_with_email(self):
        self.__sample_dict.update({"email": "test@email.com"})

        self.__controller.create(self.__sample_dict)

    def test_create_with_invalid_email(self):
        self.__sample_dict.update({"email": "wrongmail.com"})

        with pytest.raises(ValueError):
            self.__controller.create(self.__sample_dict)
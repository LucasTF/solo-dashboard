from unittest import TestCase, mock
from unittest.mock import Mock

import pytest
from src.database.connector import DBConnector
from src.models.entities.cliente import Cliente
from src.models.repositories.cliente_repository import ClienteRepository


class MockConnector(DBConnector):
    def __init__(self) -> None:
        self.session = Mock()
        self.session.scalars.return_value = [
            Cliente(id=1, nome="Test Enterprise A"),
            Cliente(id=2, nome="Company B"),
        ]

    def __enter__(self):
        return self

    def __exit__(self, *args):
        pass


class ClienteRepositoryTestCase(TestCase):
    def setUp(self) -> None:
        self.mock_connector = MockConnector()
        self.repo = ClienteRepository(self.mock_connector)

    @mock.patch("src.models.repositories.cliente_repository.select")
    def test_list_clientes(self, mock_select):
        clientes = self.repo.list_clientes()

        mock_select.assert_called_once_with(Cliente)

        self.mock_connector.session.scalars.assert_called_once()

        self.assertEqual(len(clientes), 2)
        self.assertEqual(clientes[0].nome, "Test Enterprise A")
        self.assertEqual(clientes[1].nome, "Company B")

    @pytest.mark.skip(reason="Para implementar")
    def test_get_cliente_by_id(self):
        pass

    @pytest.mark.skip(reason="Para implementar")
    def test_get_cliente_by_id_not_found(self):
        pass

    @pytest.mark.skip(reason="Para implementar")
    def test_search_clientes(self):
        pass

    @pytest.mark.skip(reason="Para implementar")
    def test_insert_cliente(self):
        pass

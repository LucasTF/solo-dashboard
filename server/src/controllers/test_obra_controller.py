from random import choice
from string import ascii_letters
import pytest

from src.config.constants import MAX_COD_OBRA_LENGTH
from src.controllers.obra_controller import ObraController
from src.types.obra_response import ObraResponse


@pytest.fixture
def setup_update(mocker):
    repo = mocker.MagicMock()
    controller = ObraController(repo)

    mock_obra = ObraResponse(
        1,
        "SP002/22",
        2,
        2022,
        "2022-01-01",
        "2022-02-02",
        "Santos",
        "SP",
        "Mar, 33",
        "Bairro de teste",
        "Empresa ABC",
    )

    mocker.patch.object(controller, "find_by_id", return_value=mock_obra)

    yield repo, controller, mock_obra


def test_update(setup_update):
    repo_mock, controller, mock_obra = setup_update

    mock_edit = {
        "cod_obra": "SP001/24",
        "num_obra": 1,
        "ano": 2024,
        "data_inicio": "2024-01-01",
        "data_fim": "2024-02-18",
        "cidade": "São Paulo",
        "uf": "SP",
        "tipo_logo": "Rua",
        "logradouro": "Teste, 22",
        "bairro": "Teste",
        "cliente": "Empresa X",
    }

    controller.update(mock_obra.id, mock_edit)

    repo_mock.update_obra.assert_called_once()


def test_update_with_invalid_cod_obra(setup_update):
    _, controller, mock_obra = setup_update

    mock_edit = {
        "cod_obra": "".join(
            choice(ascii_letters) for i in range(MAX_COD_OBRA_LENGTH + 1)
        )
    }

    with pytest.raises(ValueError):
        controller.update(mock_obra.id, mock_edit)

def test_update_with_num_obra_as_zero(setup_update):
    _, controller, mock_obra = setup_update

    mock_edit = {"num_obra": 0}

    with pytest.raises(ValueError):
        controller.update(mock_obra.id, mock_edit)

def test_update_with_num_obra_as_negative(setup_update):
    _, controller, mock_obra = setup_update

    mock_edit = {"num_obra": -1}

    with pytest.raises(ValueError):
        controller.update(mock_obra.id, mock_edit)

def test_update_with_invalid_dates(setup_update):
    _, controller, mock_obra = setup_update

    mock_edit = {
        "data_inicio": "2024-01-10",
        "data_fim": "2023-01-12"
    }

    with pytest.raises(ValueError):
        controller.update(mock_obra.id, mock_edit)

def test_update_with_invalid_tipo_logo(setup_update):
    _, controller, mock_obra = setup_update

    mock_edit = {
        "tipo_logo": "INVALID"
    }

    with pytest.raises(ValueError):
        controller.update(mock_obra.id, mock_edit)
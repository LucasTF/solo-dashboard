import pytest

from src.enums.file_types import FileType
from src.services.file_service import FileService


@pytest.fixture
def setup():
    service = FileService()

    yield service


def test_construct_path(setup):
    filename = "SP002-24-Model.pdf"
    ano = 2024
    cod_obra = "SP002/24"
    file_type = FileType.Planta

    path = setup.contruct_path(filename, ano, cod_obra, file_type, True, True)

    assert path == "/srv/http/sondagens/2024/SP002-24/plantas/SP002-24-Model.pdf"

    path = setup.contruct_path(filename, ano, cod_obra, file_type, False, True)

    assert path == "2024/SP002-24/plantas/SP002-24-Model.pdf"

    path = setup.contruct_path(filename, ano, cod_obra, file_type, True, False)

    assert path == "/srv/http/sondagens/2024/SP002-24/plantas"

    path = setup.contruct_path(filename, ano, cod_obra, file_type, False, False)

    assert path == "2024/SP002-24/plantas"

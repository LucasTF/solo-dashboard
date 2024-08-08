from sqlalchemy import Engine
from .connector import db_connector

def test_connect_to_db():
    assert db_connector.get_engine() is None

    db_connector.connect_to_db()
    db_engine = db_connector.get_engine()

    assert db_engine is not None
    assert isinstance(db_engine, Engine)
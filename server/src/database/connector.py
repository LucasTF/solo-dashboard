from sqlalchemy.orm import sessionmaker

from sqlalchemy import create_engine

from src.config.environment import db_env

class DBConnector:
    def __init__(self) -> None:

        self.__conection_string = db_env["DATABASE_CONN_STRING"]
        self.__engine = None
        self.session = None

    def connect_to_db(self):
        self.__engine = create_engine(self.__conection_string)

    def get_engine(self):
        return self.__engine
    
    def __enter__(self):
        session_maker = sessionmaker()
        self.session = session_maker(bind=self.__engine)
        return self

    def __exit__(self, *args):
        self.session.close()
    
db_connector = DBConnector()
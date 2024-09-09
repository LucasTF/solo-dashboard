from typing import Dict
import jwt
import os

from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

from src.errors.invalid_jwt_token_error import InvalidJwtTokenError

class JwtService:

    def __init__(self) -> None:
        load_dotenv()

        self.__secret = os.getenv("JWT_SECRET")

    def create_jwt_token(self, body : Dict = {}) -> str:
        token = jwt.encode(
            payload={
                'exp': datetime.now(timezone.utc) + timedelta(days=30),
                **body
            },
            key=self.__secret,
            algorithm="HS256"
        )

        return token
    
    def decode_jwt_token(self, token: str) -> Dict:
        try:
            decoded_token = jwt.decode(token, key=self.__secret, algorithms="HS256")
            return decoded_token
        except Exception:
            raise InvalidJwtTokenError()
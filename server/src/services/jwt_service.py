from typing import Dict
import jwt

from datetime import datetime, timedelta, timezone

from src.config.environment import jwt_env


class JwtService:
    def create_jwt_token(self, body: Dict = {}) -> str:
        token = jwt.encode(
            payload={
                "exp": datetime.now(timezone.utc)
                + timedelta(hours=int(jwt_env["JWT_HOURS"])),
                **body,
            },
            key=jwt_env["JWT_SECRET"],
            algorithm=jwt_env["JWT_ALGORITHM"],
        )

        return token

    def decode_jwt_token(self, token: str) -> Dict:
        decoded_token = jwt.decode(
            token, key=jwt_env["JWT_SECRET"], algorithms=jwt_env["JWT_ALGORITHM"]
        )
        return decoded_token

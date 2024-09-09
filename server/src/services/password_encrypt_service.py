import bcrypt


class PasswordEncryptService:

    def hash_password(self, password: str) -> bytes:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
        return hashed_password
    
    def check_password(self, password: str, hashed_password: str | bytes) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password)
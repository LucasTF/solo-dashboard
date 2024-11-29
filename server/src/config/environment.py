import os


db_env = {"DATABASE_CONN_STRING": os.getenv("DATABASE_CONN_STRING")}

jwt_env = {
    "JWT_SECRET": os.getenv("JWT_SECRET"),
    "JWT_ALGORITHM": os.getenv("JWT_ALGORITHM") or "HS256",
    "JWT_HOURS": os.getenv("JWT_HOURS") or 720,
}

files_env = {
    "UPLOADED_FILES_PATH": os.getenv("UPLOADED_FILES_PATH"),
}

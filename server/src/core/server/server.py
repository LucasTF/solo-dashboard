from flask import Flask
from flask_cors import CORS
from src.database.connector import db_connector

# Routes
from src.core.routes.api.api_routes import api_route
from src.core.routes.dashboard.dashboard_routes import dashboard_route
from src.core.routes.static import static_content

db_connector.connect_to_db()

app = Flask(__name__)
CORS(app)

# Config Flags
app.json.sort_keys = False  # Stop Flask from sorting JSON response keys alphabetically

# API Routes
app.register_blueprint(api_route)

# Dashboard Routes
app.register_blueprint(dashboard_route)

## Static content
app.register_blueprint(static_content)

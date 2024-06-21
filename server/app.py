from flask import Flask, render_template

from routes.static import static_content

app = Flask(__name__, template_folder='out', static_folder='out/_next')
app.register_blueprint(static_content)

# App Routes
@app.route('/', methods=['GET'])
def home_page():
    return '<h1>Hello World</h1>'

@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@app.route('/dashboard', methods=['GET'])
def dashboard_page():
    return render_template('dashboard.html')

@app.route('/dashboard/obras', methods=['GET'])
def dashboard_obras_page():
    return render_template('dashboard/obras.html')

@app.route('/dashboard/obras/new', methods=['GET'])
def dashboard_new_obra_page():
    return render_template('dashboard/obras/new.html')

# Error Handler
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html')

if __name__ == '__main__':
    app.run(debug=True)
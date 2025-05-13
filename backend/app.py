from flask import Flask
from predict import predict_bp
from flask_cors import CORS
from flask import Flask, request, jsonify

#Creating the Flask app
app = Flask(__name__)
CORS(app, origins=["https://house-price-predictor-frontend.onrender.com"])
#Registering the blueprint or the route
app.register_blueprint(predict_bp)

@app.route("/")
def index():
    return "House Price Prediction API is running!"

#Run the server
if __name__ == "__main__":
    app.run(debug=True, port=5000)


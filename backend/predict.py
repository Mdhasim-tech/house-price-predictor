import joblib
import pandas as pd
from flask import Blueprint, jsonify, request
#Load the saved model
model=joblib.load("model.joblib")

predict_bp=Blueprint('predict',__name__)
@predict_bp.route('/predict',methods=['POST'])
def predict():
    #Get the data from the POST request
    data=request.get_json()
    #Convert input json to DataFrame
    input_df=pd.DataFrame([data])
    #Make predictions using the model
    prediction=model.predict(input_df)
    #Return the prediction as a JSON response
    return jsonify({'prediction':prediction[0]}),200

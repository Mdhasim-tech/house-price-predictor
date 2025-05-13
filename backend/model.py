import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
#Loading and understanding the data
df=pd.read_csv('Housing_Price.csv')
# print(df.head(30))
# print(df.shape)
# print(df.describe())
# print(df.info())

#Data prepocessing-prepare the data for training
columns=['mainroad','guestroom','basement','hotwaterheating','airconditioning','prefarea']
for col in columns:
    df[col]=df[col].map({"yes":1,"no":0})

#For binary and ordered categorical features , we need to map the values to numerical values
#For non orderd categorical features , we need to use one-hot encoding
df=pd.get_dummies(df,columns=["furnishingstatus"],drop_first=False).astype(int)
#Rename the columns
df = df.rename(columns={'furnishingstatus_semi-furnished': 'furnishingstatus_semifurnished'})
print(df.columns)
#Spitting the data for training and testing
#Features (X) and Target (y)
X=df.drop('price',axis=1)
y=df['price']
Xtrain,Xtest, ytrain, ytest=train_test_split(X,y,test_size=0.2,random_state=42)
#Selecting the model Training the model
model=LinearRegression()
model.fit(Xtrain,ytrain)

#model prediction
# print(ytest[:5]) just for manual check for predictions how close they are
pred=model.predict(Xtest)
# print(pred[:5])

# Evaluate
mae = mean_absolute_error(ytest, pred)
mse = mean_squared_error(ytest, pred)
rmse = np.sqrt(mse)
r2 = r2_score(ytest, pred)

print("MAE :", mae)
print("MSE :", mse)
print("RMSE:", rmse)
print("R² Score:", r2)


print("Mean price:",df.mean().iloc[0])



#Saving the model using joblib
joblib.dump(model, 'model.joblib')









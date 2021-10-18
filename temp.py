from flask import Flask, redirect, url_for, request
app = Flask(__name__)

@app.route('/',methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        print(dict(request.form))
    return "hi"

if __name__ == '__main__':
   app.run(debug = True)
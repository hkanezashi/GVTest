from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')


@app.route('/group-bundle')
def group_bundle():
  with open("static/data/miserables.json", "r") as rf:
    data = json.load(rf)
  return jsonify(data)

if __name__ == '__main__':
  app.run(debug=True)



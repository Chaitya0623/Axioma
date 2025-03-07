import json
from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://newsroom-analytics-demo.vercel.app", "http://localhost:5173", "http://axioma.simppl.org"]}})

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(BASE_DIR, 'src/pages/data.json')

with open(data_path, 'r') as f:
    data = f.read()

load_dotenv()
os.getenv('OPENAI_API_KEY')
client = OpenAI()

@app.route('/ask', methods=['POST'])
def ask_question():
    conversation = request.json.get('conversation', [])
    question = request.json.get('question', None)

    conversation.append({
        "role": "system",
        "content": (
            f"You are an AI assistant that has access to data on local newsrooms and is tasked with answering questions related to audience analytics strictly based on the following dataset:\n{json.dumps(data)}\n"
            "Do not provide information that is not explicitly present in the dataset. "
            "Keep your answers short, concise, and directly relevant to the dataset."
        )
    })
    conversation.append({"role": "user", "content": question})

    if not question:
        return jsonify({"error": "No question provided."}), 400

    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=conversation
        )
        answer = completion.choices[0].message.content
        conversation.append({"role": "assistant", "content": answer})
        return jsonify({"conversation": conversation, "answer": answer})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)

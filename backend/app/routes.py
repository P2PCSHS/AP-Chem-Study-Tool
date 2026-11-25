"""API routes.

Add new endpoints here, or create more blueprints as the project grows.
"""

from flask import Blueprint, jsonify, request

from app.questions import Questions

api = Blueprint("api", __name__)

# Example questions and answers for each topic
QUESTIONS = {
    "topic1": {"question": "What is the chemical formula for water?", "answer": "H2O"},
    "topic2": {"question": "What is the speed of light in m/s?", "answer": "299792458"},
    "topic3": {"question": "What is 2 + 2?", "answer": "4"},
}


@api.get("/hello")
def hello():
    """Simple test endpoint."""
    return jsonify({"message": "Hello from Flask!"})


@api.get("/health")
def health():
    """Used by Docker and the deploy script to check the backend is up."""
    return jsonify({"status": "ok"})


@api.get("/question/<topic>")
def get_question(topic):
    """Send a question based on the selected topic."""
    question_data = Questions.get_question(topic)
    if "error" in question_data:
        return jsonify(question_data), 400
    return jsonify(question_data)


@api.post("/check-answer")
def check_answer():
    """Check the answer sent from the frontend."""
    data = request.get_json()
    topic = data.get("topic")
    answer = data.get("answer")

    if not topic or not answer:
        return jsonify({"error": "Missing topic or answer"}), 400

    correct_answer = QUESTIONS.get(topic, {}).get("answer")
    if not correct_answer:
        return jsonify({"error": "Invalid topic"}), 400

    if answer.strip().lower() == correct_answer.strip().lower():
        return jsonify({"result": "correct"})
    else:
        return jsonify({"result": "incorrect", "correct_answer": correct_answer})
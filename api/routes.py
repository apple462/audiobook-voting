from flask import Blueprint, request, jsonify
from models import db, Audiobook, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api_bp = Blueprint('api', __name__)

# Sample data
audiobooks_data = [
    {"title": "Audiobook 1", "author": "Author 1"},
    {"title": "Audiobook 2", "author": "Author 2"},
]

# Seed initial audiobooks data
@api_bp.route('/audiobooks', methods=['GET'])
@jwt_required()
def get_audiobooks():
    audiobooks = Audiobook.query.all()
    return jsonify([{"id": a.id, "title": a.title, "author": a.author, "votes": a.votes} for a in audiobooks])

# User registration
@api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

# User login
@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Invalid credentials"}), 401

# Voting route
@api_bp.route('/vote/<int:book_id>', methods=['POST'])
@jwt_required()
def vote(book_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.has_voted:
        return jsonify({"msg": "You have already voted!"}), 400

    audiobook = Audiobook.query.get_or_404(book_id)
    audiobook.votes += 1
    user.has_voted = True
    user.voted_audiobook_id = book_id

    db.session.commit()
    return jsonify({"msg": f"Vote cast successfully for '{audiobook.title}'!", "vote_count": audiobook.votes}), 200

# Get the audiobook voted by the logged in user
@api_bp.route('/voted_audiobook', methods=['GET'])
@jwt_required()
def get_voted_audiobook():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user.has_voted:
        return jsonify({"msg": "You have not voted yet!"}), 400

    audiobook = Audiobook.query.get(user.voted_audiobook_id)
    return jsonify({
        "id": audiobook.id,
        "title": audiobook.title,
        "author": audiobook.author,
        "votes": audiobook.votes
    }), 200

@api_bp.route('/audiobooks', methods=['POST'])
# @jwt_required()  # Optionally protect this route to allow only authenticated users to add books. Not relevant to the task, only used for adding audiobooks using postman
def add_audiobook():
    data = request.get_json()
    title = data.get('title')
    author = data.get('author')

    if not title or not author:
        return jsonify({"msg": "Title and author are required"}), 400

    new_audiobook = Audiobook(title=title, author=author)
    db.session.add(new_audiobook)
    db.session.commit()

    return jsonify({
        "msg": f"Audiobook '{title}' by {author} added successfully!",
        "id": new_audiobook.id
    }), 201

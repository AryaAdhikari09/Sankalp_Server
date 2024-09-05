# from flask import Flask, request, jsonify
# import whisper
# import os

# app = Flask(__name__)

# # Load the Whisper model
# model = whisper.load_model("small")

# @app.route('/transcribe', methods=['POST'])
# def transcribe_audio():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     file_path = os.path.join('uploads', file.filename)
#     file.save(file_path)

#     # Transcribe the audio using Whisper
#     result = model.transcribe(file_path)

#     # Optionally remove the uploaded file after transcription
#     os.remove(file_path)

#     return jsonify({"transcription": result['text']}), 200

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001)





from flask import Flask, request, jsonify
import whisper
import os

app = Flask(__name__)

# Load the Whisper model
model = whisper.load_model("small")

# Ensure the 'uploads' directory exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    
    # Save the file to the 'uploads' directory
    file.save(file_path)

    # Transcribe the audio using Whisper
    result = model.transcribe(file_path)

    # Optionally remove the uploaded file after transcription
    os.remove(file_path)

    return jsonify({"transcription": result['text']}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

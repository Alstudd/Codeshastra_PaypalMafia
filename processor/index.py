from flask import Flask, request, jsonify
import requests  # for making HTTP requests to Video Indexer API

# Replace with your Video Indexer account information
account_id = "0de48224-0fc7-4144-a8b1-26adcf7374b4"
access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJWZXJzaW9uIjoiMi4wLjAuMCIsIktleVZlcnNpb24iOiJkYzIzYzYxZDhjMGQ0YTFhYjUzZGI2MzI5YzJjMWNlOCIsIkFjY291bnRJZCI6IjBkZTQ4MjI0LTBmYzctNDE0NC1hOGIxLTI2YWRjZjczNzRiNCIsIkFjY291bnRUeXBlIjoiQXJtIiwiUGVybWlzc2lvbiI6IkNvbnRyaWJ1dG9yIiwiRXh0ZXJuYWxVc2VySWQiOiIzNUJCOEJEMjY4MjA0RTdEQjEyRkI5RkQ2OEE2RUYzRCIsIlVzZXJUeXBlIjoiTWljcm9zb2Z0Q29ycEFhZCIsIklzc3VlckxvY2F0aW9uIjoiZWFzdHVzIiwibmJmIjoxNzExNzk2MzIyLCJleHAiOjE3MTE4MDAyMjIsImlzcyI6Imh0dHBzOi8vYXBpLnZpZGVvaW5kZXhlci5haS8iLCJhdWQiOiJodHRwczovL2FwaS52aWRlb2luZGV4ZXIuYWkvIn0.fpJUdARoXiY1k8BGa_FFMYYrW64-hZwDEM4F2btHqUlDLBCZUY03DH5wfg2k0vraxxVUl_cq7fNDdLX81jaPBoCf2FSKz42SP49ZTnJnRdhrM9oJi8nVFOjFsg-x63ZjAj4RY30svFd929DSRKyD1AqTUu6Y6EUdFnrDRabSF8opFnd6Y4kSo9vp-Ij9AnMkrzS6vyKahvgqFYY14qx8cWTZ55qfIVU-u5aXCyvgsn2eWsKC4OksBcHSnQr_X-_lJwC0poOw4idBzrzsjliniAfgkHnwZMeyW-n2MVDdUfu0qWRbzIzkfcNJoLeygVEhq4OMDxwh2AiftXNFSaTSqg"
video_indexer_url = "https://api.videoindexer.ai/videos"

app = Flask(__name__)

@app.route("/analyze_video", methods=["POST"])
def analyze_video():
  video_url = request.json.get("url")

  if not video_url:
    return jsonify({"error": "Missing video URL in request body"}), 400

  url = "https://api.videoindexer.ai/eastus/Accounts/0de48224-0fc7-4144-a8b1-26adcf7374b4/Videos?name=pythonVideo&videoUrl=https://mafiahackstorage.blob.core.windows.net/learnblocks/1711793226881Python%20in%20100%20Seconds.mp4"

  payload = {}
  headers = {
    'Authorization': f'Bearer {access_token}'
  }

  response = requests.request("POST", url, headers=headers, data=payload)

if __name__ == "__main__":
  app.run(debug=True)

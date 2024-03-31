from flask import Flask, request, jsonify
import requests
import json
import time
from youtube_transcript_api import YouTubeTranscriptApi

# Replace with your Video Indexer account information
account_id = "0de48224-0fc7-4144-a8b1-26adcf7374b4"
access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJWZXJzaW9uIjoiMi4wLjAuMCIsIktleVZlcnNpb24iOiJkYzIzYzYxZDhjMGQ0YTFhYjUzZGI2MzI5YzJjMWNlOCIsIkFjY291bnRJZCI6IjBkZTQ4MjI0LTBmYzctNDE0NC1hOGIxLTI2YWRjZjczNzRiNCIsIkFjY291bnRUeXBlIjoiQXJtIiwiUGVybWlzc2lvbiI6IkNvbnRyaWJ1dG9yIiwiRXh0ZXJuYWxVc2VySWQiOiIzNUJCOEJEMjY4MjA0RTdEQjEyRkI5RkQ2OEE2RUYzRCIsIlVzZXJUeXBlIjoiTWljcm9zb2Z0Q29ycEFhZCIsIklzc3VlckxvY2F0aW9uIjoiZWFzdHVzIiwibmJmIjoxNzExODM5NTkxLCJleHAiOjE3MTE4NDM0OTEsImlzcyI6Imh0dHBzOi8vYXBpLnZpZGVvaW5kZXhlci5haS8iLCJhdWQiOiJodHRwczovL2FwaS52aWRlb2luZGV4ZXIuYWkvIn0.jvkHPdtwU3m3s8laddpOBnqSrUyKvvLR_F5pT26xWfVKHoVBSTKoXgJD_1L4a4UmrPkOs4kQmm-rvmZNMeWXnzSBLjYJ7iuu-H9ZlyolMrylyBs8PeFCqnFyv3KNKJntxzYbttd2opMCyVvld3IwXpdTmvu_xTrVoWz8C8WkyaA_Lhxlc0kiXfDI5Qb4AYftsJet8t0DAKMZCZBwEUNvLKZ7SV0f7kG06zcI7UjQaH2xv6G0-jXKBIj_2V8bE9O4fWnxG1YH8BxsQbn4ckaAuZ-WF_5n8fF5f_586yEg7yxP5zsqeEUleaIuEz6upCwEapC3rOekB-kHAha01aTRWg"
video_indexer_url = "https://api.videoindexer.ai/videos"

app = Flask(__name__)

def getVideoOutput(id):
  url = f"https://api.videoindexer.ai/eastus/Accounts/0de48224-0fc7-4144-a8b1-26adcf7374b4/Videos/{id}/Index?includedInsights=Transcript"

  payload = {}
  headers = {
    'Authorization': f'Bearer {access_token}'
  }
  response = ''

  while True:
    response = requests.request("GET", url, headers=headers, data=payload)
    response = json.loads(response.text)

    if response["state"] == "Processed":
      break

    time.sleep(5)

  print(response)
  transcript = " ".join([i["text"] for i in response["videos"][0]["insights"]["transcript"]])
  return transcript

@app.route("/analyze_video", methods=["POST"])
def analyze_video():
  video_url = request.json.get("url")
  video_id = request.json.get("id")


  if not video_url:
    return jsonify({"error": "Missing video URL in request body"}), 400
  

  url = f"https://api.videoindexer.ai/eastus/Accounts/0de48224-0fc7-4144-a8b1-26adcf7374b4/Videos?name={video_id}&videoUrl={video_url}"

  payload = {}
  headers = {
    'Authorization': f'Bearer {access_token}'
  }

  response = requests.request("POST", url, headers=headers, data=payload)
  print(response.text)
  id  = json.loads(response.text)['id']
  return getVideoOutput(id)

@app.route("/yt_process", methods=["POST"])
def ytProcess():
  code = request.json.get("code")
  transcript = YouTubeTranscriptApi.get_transcript(code)
  content = " ".join([ct["text"] for ct in transcript])
  return content

if __name__ == "__main__":
  app.run(debug=True)

from youtube_transcript_api import YouTubeTranscriptApi

transcript = YouTubeTranscriptApi.get_transcript("x7X9w_GIm1s")

content = " ".join([ct["text"] for ct in transcript])

print(content)
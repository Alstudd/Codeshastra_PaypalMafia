import azure.functions as func
import logging
from youtube_transcript_api import YouTubeTranscriptApi

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

def getTranscript(code):
    transcript = YouTubeTranscriptApi.get_transcript(code)
    content = " ".join([ct["text"] for ct in transcript])
    return content

@app.route(route="http_trigger")
def http_trigger(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    code = req.params.get('code')
    if not code:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            code = req_body.get('code')

    if code:
        op = getTranscript(code)
        return func.HttpResponse(op)
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a code in the query string or in the request body for a personalized response.",
             status_code=200
        )
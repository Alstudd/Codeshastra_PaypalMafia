import { useEffect, useState } from "react"
import { YoutubeTranscript } from "youtube-transcript"

import "./style.css"

function IndexPopup() {
  const [url, setUrl] = useState("")

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url)
    })
  }, [])

  const addToLB = async () => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([^\s&]+)/
    const match = url.match(regex)
    const code = match[1]
  }

  return (
    <button className=" m-5" onClick={addToLB}>
      {" "}
      Add to LearnBlocks{" "}
    </button>
  )
}

export default IndexPopup

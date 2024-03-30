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

  const getData = async () => {
    console.log(url)
    const op = await YoutubeTranscript.fetchTranscript("rfscVS0vtbw")
    console.log(op)
  }

  return (
    <button className=" m-5" onClick={getData}>
      {" "}
      Fetch{" "}
    </button>
  )
}

export default IndexPopup

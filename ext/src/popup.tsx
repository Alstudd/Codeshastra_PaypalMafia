import { useEffect, useState } from "react"
import logo from "data-base64:~/../assets/LearnBlocksLogo.png"
import { YoutubeTranscript } from "youtube-transcript"

import "./style.css"

import { Bookmark, GraduationCap } from "lucide-react"
import AuthForm from "./components/AuthForm"

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
    <>
    <div className="h-[500px] w-80 my-3 mx-2 ">
      <div className="flex flex-row gap-3 py-2 border-b border-gray-600">
        <img src={logo} className="h-8 w-8" alt="pic" />
        <h1 className="font-bold text-2xl my-auto">Welcome to LearnBlocks</h1>
      </div>
      <embed className="rounded-2xl w-full h-full p-4 " src='' type="" />
      <div className="flex flex-row gap-3 justify-center">
      <button onClick={addToLB} className="my-2 hover:bg-[#6F3284] hover:text-white border-gray-600 border p-2 px-4 rounded-md flex flex-row gap-3">
        <Bookmark />
        <p className="text-md my-auto">Save for later</p>
      </button>
      <button onClick={addToLB} className="my-2 hover:bg-[#6F3284] hover:text-white border-gray-500 border p-2 px-4 rounded-md flex flex-row gap-3">
        <GraduationCap />
        <p className="text-md my-auto">Certify Now</p>
      </button>
      </div>

      <AuthForm/>
    </div>
    </>
  )
}

export default IndexPopup

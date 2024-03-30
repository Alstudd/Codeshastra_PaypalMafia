import { BrowserProvider, ethers } from "ethers"
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
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults")
      const provider = ethers.getDefaultProvider()
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      const provider = new ethers.BrowserProvider(window.ethereum)

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      const signer = await provider.getSigner()
      console.log(signer.getAddress())
    }
  }

  return (
    <button className=" m-5" onClick={addToLB}>
      {" "}
      Add to LearnBlocks{" "}
    </button>
  )
}

export default IndexPopup

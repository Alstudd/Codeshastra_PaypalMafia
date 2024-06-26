let handleMemberJoined = async (MemberId) => {
    console.log('A new member has joined the room: ', MemberId)
    addMemberToDOM(MemberId)

    let members = await channel.getMembers()
    updateMemberTotal(members)

    let {name} = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])
    addBotMessageToDOM(`Welcome to the room, ${name}! 👋`)
}

let addMemberToDOM = async (MemberId) => {
    let {name} = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])

    let membersWrapper = document.getElementById('member__list')
    let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                        <span class="green__icon"></span>
                        <p class="member_name">${name}</p>
                      </div>`
    membersWrapper.insertAdjacentHTML('beforeend', memberItem)
}

let updateMemberTotal = async (members) => {
    let total = document.getElementById('members__count')
    total.innerText = members.length
}

let handleMemberLeft = async (MemberId) => {
    removeMemberFromDOM(MemberId)

    let members = await channel.getMembers()
    updateMemberTotal(members)
}

let removeMemberFromDOM = async (MemberId) => {
    let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`)
    let name = memberWrapper.getElementsByClassName('member_name')[0].textContent
    addBotMessageToDOM(`${name} has left the room.`)
    
    memberWrapper.remove()
}

let getMembers = async () => {
    let members = await channel.getMembers()
    updateMemberTotal(members)
    for (let i = 0; members.length > i; i++)
    {
        addMemberToDOM(members[i])
    }
}

let handleChannelMessage = async (messageData, MemberId) => {
    console.log('A new message was received')
    let data = JSON.parse(messageData.text)
    if (data.type === 'chat') {
        addMessageToDOM(data.displayName, data.message)
    }
    if (data.type === 'user_left') {
        document.getElementById(`user-container-${data.uid}`).remove()

        if(userIdInDisplayFrame === `user-container-${uid}`){
            displayFrame.style.display = null
    
            for(let i = 0; videoFrames.length > i; i++){
                videoFrames[i].style.height = '300px'
                videoFrames[i].style.width = '300px'
            }
        }
    }
}

let sendMessage = async (e) => {
    e.preventDefault()
    let message = e.target.message.value
    channel.sendMessage({text:JSON.stringify({'type':'chat', 'message':message, 'displayName':displayName})})
    addMessageToDOM(displayName, message)
    e.target.reset()
}

let addMessageToDOM = (name, message) => {
    let messagesWrapper = document.getElementById('messages')
    let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author">${name}</strong>
                            <p class="message__text">${message}</p>
                        </div>
                      </div>`

    messagesWrapper.insertAdjacentHTML('beforeend', newMessage)
    let lastMessage = document.querySelector('#messages .message__wrapper:last-child')
    if (lastMessage) {
        lastMessage.scrollIntoView()
    }
}

let addBotMessageToDOM = (botMessage) => {
    let messagesWrapper = document.getElementById('messages')
    let newMessage = `<div class="message__wrapper">
                        <div class="message__body__bot">
                            <strong class="message__author__bot">🤖 LearnBlocks ChatBot</strong>
                            <p class="message__text__bot">${botMessage}</p>
                        </div>
                      </div>`

    messagesWrapper.insertAdjacentHTML('beforeend', newMessage)
    let lastMessage = document.querySelector('#messages .message__wrapper:last-child')
    if (lastMessage) {
        lastMessage.scrollIntoView()
    }
}

let leaveChannel = async () => {
    await channel.leave()
    await rtmClient.logout()
}

window.addEventListener('beforeunload', leaveChannel)
let messageForm = document.getElementById('message__form')
messageForm.addEventListener('submit', sendMessage)
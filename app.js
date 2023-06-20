    const FataiSelectorBtn = document.querySelector('#fatai-selector')
    const MichaelSelectorBtn = document.querySelector('#Michael-selector')
    const chatHeader = document.querySelector('.chat-header')
    const chatMessages = document.querySelector('.chat-messages')
    const chatInputform = document.querySelector('.chat-input-form')
    const chatinput = document.querySelector('.chat-input')
    const clearChatBtn = document.querySelector('.clear-chat-button')

    const messages = JSON.parse(localStorage.getItem('messages')) || []

    const chatMessagesElement = (message) => `
    <div class="message ${message.sender === 'fatai' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-time">${message.timestamp}</div>
   </div>
`

window.onload = () => {
    messages.forEach((message) => {
      chatMessages.innerHTML += chatMessagesElement(message)
    })
  }

  let messageSender = 'fatai'

  const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatinput.placeholder = `Type here, ${messageSender}...`
  
    if (name === 'fatai') {
      FataiSelectorBtn.classList.add('active-person')
      MichaelSelectorBtn.classList.remove('active-person')
    }
  
    if (name === 'Michael') {
      MichaelSelectorBtn.classList.add('active-person')
      FataiSelectorBtn.classList.remove('active-person')
    }
  
    chatinput.focus()
  }


FataiSelectorBtn.onclick = () => updateMessageSender('fatai')
MichaelSelectorBtn.onclick = () => updateMessageSender('Michael')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatinput.value,
    timestamp
  }
         
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))
  chatMessages.innerHTML += chatMessagesElement(message)

  chatInputform.reset()
  chatMessages.scrollTop = chatMessages.scrollHeight
}

    chatInputform.addEventListener('submit', sendMessage)

    clearChatBtn.addEventListener('click', () => {
        localStorage.clear()
        chatMessages.innerHTML = ''
    })

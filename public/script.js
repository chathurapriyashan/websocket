const webSocket = new WebSocket("ws://172.20.10.10:8080");
console.log(webSocket);

webSocket.onopen = ()=>{
    webSocket.send('hello what the fuck server doing .. la ala la alalallal lalla ala lalal...');
}

webSocket.onmessage = (e)=>{
    console.log(e);
}



const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const text = chatInput.value;
  if (!text) return;

  appendMessage(text, "you");
  webSocket.send(text);
  chatInput.value = "";

  // Simulate message from the other user after a delay
  

  // setTimeout(() => {
  //   appendMessage("Reply: " + text, "other");
  // }, 800);
});


// webSocket.onmessage = (e)=>{
//     appendMessage("Reply: " + e.data, "other");
// }


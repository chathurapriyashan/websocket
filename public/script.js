const webSocket = new WebSocket("ws://192.168.43.95:8080");
const input = document.querySelector("input[type=text]");
const btn = document.querySelector("button");

console.log(webSocket)

webSocket.onopen = ()=>{
    webSocket.send('hello what the fuck server doing .. la ala la alalallal lalla ala lalal...');
}

webSocket.onmessage = ({data})=>{
    document.body.insertAdjacentHTML( "beforeend",`<div>${data}</div>`);
}

btn.addEventListener("click" , ()=>{
    webSocket.send(input?.value || "no");
    input.value = '';
})
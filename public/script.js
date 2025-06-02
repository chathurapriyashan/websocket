const webSocket = new WebSocket("ws://localhost:8080");

webSocket.onopen = ()=>{
    webSocket.send('hello what the fuck server doing .. la ala la alalallal lalla ala lalal...');
}









// webSocket.onopen = ()=>{
//     webSocket.send('ab');
// }
// webSocket.onopen = ()=>{
//     webSocket.send('abc');
// }
// webSocket.onopen = ()=>{
//     webSocket.send('abcd');
// }
// webSocket.onopen = ()=>{
//     webSocket.send('abcde');
// }
// webSocket.onopen = ()=>{
//     webSocket.send('this is test message');
// }
// webSocket.onopen = ()=>{
//     webSocket.send('kawad bn');
// }


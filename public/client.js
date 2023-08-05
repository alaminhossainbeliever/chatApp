const socket =io();
let name;
let password;
let chatpage=document.querySelector('.chat-sec')
let textarea= document.querySelector('#textarea')
let msgarea= document.querySelector('.message-area')
let username=document.querySelector('#username')
let pass=document.querySelector('#password')
let loginSec=document.querySelector('.login-sec')
function login(){
    name=username.value
    password=pass.value
    if(name!=''&&password==='hello'){
    loginSec.style.display='none';
    chatpage.style.display='block'
}else{
    console.log('working');
}
}

// do{
//     name=prompt('enter your name: ')
// }while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendmessage(e.target.value)
    }
})

  function sendmessage(message){
    let msg={
        user:name,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    scroll()
    
    socket.emit('message',msg)
}

function appendMessage(msg,type){
 let mainDiv=document.createElement('div')
 let className= type
 mainDiv.classList.add(className,'message')

 let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
 `
 mainDiv.innerHTML=markup
 msgarea.appendChild(mainDiv)
}
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scroll()
})
function scroll(){
    msgarea.scrollTop=msgarea.scrollHeight
}
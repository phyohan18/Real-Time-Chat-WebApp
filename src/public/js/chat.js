//Add Chat Heading From localstorage

const title = document.querySelector(".room_name_heading");
const room_name = localStorage.getItem('room');
if (room_name) {
    title.textContent = room_name;
    document.querySelector("#room_name").value = room_name;
}
const socket = io();

document.querySelector("#sendBtn").addEventListener('click', (e) => {
    e.preventDefault();

    emitMsg(document.querySelector("#msg").value);

    //Clear Input
    document.querySelector("#msg").value = '';
    document.querySelector("#msg").focus();
});

//Join chat room 
const room = document.querySelector('#room_name').value;
socket.emit('joinRoom', { username: localStorage.getItem('name'), room })


//Emit Message to server
function emitMsg(msg) {

    socket.emit('outgoingMessage', msg);
    outputMsg(msg, 'outgoing');
}

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    console.log(room);
    console.log(users);
});

//Message From server
socket.on('messageIncoming', message => {
    outputMsg(message, 'incoming');

    //Scroll down
    document.querySelector('.chat-box').scrollTop = document.querySelector('.chat-box').scrollHeight;

});


//System
socket.on('messageSystem', message => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true
    })
    Toast.fire({
        icon: 'info',
        title: message.text,
    })
});

//Output Message To UI
function outputMsg(message, inOrout) {
    const div = document.createElement('div');
    // div.classList.add('outgoing');
    div.classList.add(inOrout);
    if (inOrout == "incoming") {
        if (localStorage.getItem("name") !== message.username) {
            div.innerHTML = ` 
            <div class='details'>
                <span>${message.username}</span>
            </div>
            <p class="text">${message.text}<span><i>${message.time}</i></span></p>`;
        }
    } else {
        div.innerHTML = ` 
        <div class='details'>
            <p> ${message} <span><i> ${moment().format('h:mm a')}</i></p>
        </div>`;
    }
    document.querySelector('.chat-box').appendChild(div);
}
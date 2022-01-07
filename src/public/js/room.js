function addRoom() {
    const req = {
        name: document.querySelector("#nameInput").value,
        id: `${document.querySelector("#nameInput").value}-${Math.floor(Date.now() / 1000)}`,
        pwd: document.querySelector("#passwordInput").value,
    };


    fetch("/roomAdd", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                Toast.fire({
                    icon: 'success',
                    title: res.msg,
                    timer: 800
                }).then(() => {
                    location.href = "/rooms";
                });
            } else {
                //Trigger SweetAlert2
                Toast.fire({
                    icon: 'error',
                    title: res.msg
                });
            }
        })
        .catch((err) => {
            console.error(`${err}uncaughted error during creating room`);
        });
}

fetch("/allRoom")
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            outputRoomname(res.data);
        } else {
            //Trigger SweetAlert2
            Toast.fire({
                icon: 'error',
                title: res.msg
            });
        }
    })
    .catch((err) => {
        console.error(`${err}uncaughted error during registration`);
    });


function outputRoomname(rooms) {
    document.querySelector(".room-list").innerHTML = `${rooms.map(room => `<a href="#" class="hover-chat">
    <input type="hidden" class=".room_id" value="${room.room_id}"/>     
        <div class='content' >
             <img src='https://i.ibb.co/zNR9ct8/photodune-9235903-game-m-16x9.jpg' alt="room-profile">
             <div class='details'>
                 <span> ${room.room_name}</span>
                 <p> Room ID: ${room.room_idx} </p>
               
             </div>
         </div> </a>`).join('')}`;
         
        [...document.querySelectorAll(".hover-chat")].forEach(el => el.addEventListener('click',function (e) {
                    
        Swal.fire({
            title: 'Enter the Secret Code',
            input: 'password',
            inputAttributes: {
            autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Let me in',
            confirmButtonColor: '#3085d6',
            showLoaderOnConfirm: true,
            preConfirm: (pwd) => {
                const req = {
                    id: el.children[0].value,
                    pwd: pwd,
                };
            return fetch(`/roompwdChk`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req),
            })
                .then((res) => res.json())
                .then(res=> {
                    if (res.success) {
                        localStorage.setItem('room',res.room.room_name);
                        location.href = "/chat";
                    }else{
                        Swal.showValidationMessage(
                            `${res.msg}`
                        )
                    }
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        });              
    }));
};
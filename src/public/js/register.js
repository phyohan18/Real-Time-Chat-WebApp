function register() {
    const req = {
        name: document.querySelector("#nameInput").value,
        id: document.querySelector("#emailInput").value,
        pwd: document.querySelector("#passwordInput").value,
    };


    fetch("/registerChk", {
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
                    location.href = "/login";
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
            console.error(`${err}uncaughted error during registration`);
        });
}
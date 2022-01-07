function loginChk() {
    const req = {
        id: document.querySelector("#emailInput").value,
        pwd: document.querySelector("#passwordInput").value,
    }

    fetch("/loginChk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
                    localStorage.clear();
                    localStorage.setItem("name", res.user.user_name);
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
            console.error("uncaughted error during login");
        })
}
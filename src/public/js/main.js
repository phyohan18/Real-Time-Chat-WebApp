const pswrdfield = document.getElementById("passwordInput");
/* 
    Toggle password input in froms 
*/
togglePassword.addEventListener('click', function(e) {
    // toggle the type attribute
    const type = pswrdfield.getAttribute('type') === 'password' ? 'text' : 'password';
    pswrdfield.setAttribute('type', type);
    // toggle the eye / eye slash icon
    this.classList.toggle('fa-eye-slash');
});


//SweetAlert2
const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
})
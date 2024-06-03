(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
   const registrationForm = document.getElementById("signform");
const username =document.getElementById("Username");
            const email =document.getElementById("uemail");
      const pass =document.getElementById("pass");
            const repass =document.getElementById("repass");
    const check=document.getElementById("agree");
    const error1=document.getElementById("errorMessages1");
        const error2=document.getElementById("errorMessages2");
    const error3=document.getElementById("errorMessages3");
    const error4=document.getElementById("errorMessages4");
   const error5=document.getElementById("errorMessages5");
   const login=document.getElementById("login");
   const formse=document.getElementById("formsec");
   const showpass=document.getElementById("eye");
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
if (!username.value.trim() || !isNaN(username.value.trim())) {
    error1.innerHTML="please enter your name , characters A-Z, a-z and '-' are  acceptable "
    error1.style.display="block";
    setTimeout(function () {
    error1.remove();
}, 3000);
    return ;
}
    else{
error1.style.display="none";
username.classList.add('valid');
}
  if (!email.value.trim() || !isValidEmail(email.value)) {

    error2.innerHTML="please enter your email"
    error2.style.display="block";
    setTimeout(function () {
    error2.remove();
}, 3000);
    return;
  }
  else{
        email.classList.add('valid');
    }
if (!pass.value.trim() || !isStrongPassword(pass.value)) {

 error3.innerHTML="please enter a strong that contains at least  captial and small letters and also specail charaters"
error3.style.display="block";
setTimeout(function () {
    error3.remove();
}, 3000);
    return;
  }
  else{
        pass.classList.add('valid');
    }
if (!repass.value.trim()) {
     error4.innerHTML="please confirm your password"
    error4.style.display="block";
    setTimeout(function () {
    error4.remove();
}, 5000);
    return;
  }
if(repass.value.trim()!= pass.value.trim()){
     error4.innerHTML="make sure that both passwords are the same"
    error4.style.display="block";
    setTimeout(function () {
    error4.remove();
}, 5000);
    return;
  }
  else{
        repass.classList.add('valid');
    }
    localStorage.setItem('mail', email.value.trim());
 localStorage.setItem('pw', pass.value.trim());
 Swal.fire({
  position: "center",
  icon: "success",
    title: "congratulation, you are signed in successfully",
showConfirmButton: false,
  timer: 3000
});
registrationForm.reset();
  error1.innerHTML="";
    error2.innerHTML="";
  error3.innerHTML="";
  error4.innerHTML="";
  error5.innerHTML="";
});
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidName(username) {
    return /^[a-z0-9_.]+$/.test(username);
}

function isStrongPassword(pass) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(pass);
}
var hideForm = function() {  
  
  formse.style.display ='none';
  login.style.display="block";
  
};
login.addEventListener('submit', function(event) {
    event.preventDefault();
            var usermail = document.getElementById('Email');
            var password = document.getElementById('password');
            var storedmail = localStorage.getItem('mail');
             var storedPw = localStorage.getItem('pw');
            const alert=document.getElementById('alert1');

         if(usermail.value== storedmail && password.value == storedPw){
            Swal.fire({
  position: "center",
  icon: "success",
    title: "you are logged in successfully",
showConfirmButton: false,
  timer: 3000
});
    }else{
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: 'please enter your email and password correctly'
});
    }
        });
showpass.addEventListener('click',function(){
    if(pass.type ==="password"){
                    pass.type = "text";
                    showpass.classList.replace("uil-eye-slash", "uil-eye");
                  }else{
                    pass.type = "password";
                  }
});
  
window.onload = function () {
let u_name = document.querySelector("#susername")
let u_email = document.querySelector("#semail")
let u_password = document.querySelector("#spassword")

// function for the sign up

document.querySelector("#signupBtn").addEventListener("click",function () {
    if(u_name && u_email && u_password){
             let details = {username : u_name.value ,email:u_email.value , password : u_password.value }
             window.localStorage.setItem("details",JSON.stringify(details))
             window.location.href="login.html"
    }
    else{
        alert("plese enter all credentials ")
    }
})


document.querySelector("#sloginBtn").addEventListener("click",function (){
    window.location.href = "login.html"
})
}

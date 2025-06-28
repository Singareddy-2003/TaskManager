// const { jsxs } = require("react/jsx-runtime")
window.onload = function(){
document.querySelector("#LoginBtn").addEventListener("click" , function (){
    let uu_name = document.querySelector("#lusername").value
    let uu_password = document.querySelector("#lpassword").value


    if (uu_name && uu_password){
        let localStorageData = JSON.parse(localStorage.getItem("details"))
        if(localStorageData){
            if(uu_name === localStorageData.username && uu_password === localStorageData.password){
                window.location.href = "index.html"
            }
           else{
            alert("username or password is invalid")
           }
                  
        }
        else{
               alert("please Sign up first and then login ")
        }
    }
    else{
        alert("plese enter all the credentials ")
    }
})

document.querySelector("#lsignupBtn").addEventListener("click",function (){

    window.location.href = "signup.html"
})

}
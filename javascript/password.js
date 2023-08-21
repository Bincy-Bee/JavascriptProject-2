
let userforgot = JSON.parse(sessionStorage.getItem("userforgot"));

document.getElementById("passform").addEventListener("submit",(e)=>{
    e.preventDefault();

    console.log(userforgot[0].id);

    let passfor ={
        newpass : document.getElementById("newpassword").value,
        repass : document.getElementById("renewpassword").value
    }
    fetch(`http://localhost:8800/signup/${userforgot[0].id}?password=${passfor.newpass}`,{
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(passfor)
    })
    
})
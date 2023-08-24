import nav from "../components/nav.js";

document.getElementById("navbar").innerHTML= nav();

let id = -1;
document.getElementById("signinform").addEventListener("submit",(e)=>{
    e.preventDefault();

    let email = document.getElementById("forcheckemail").value;

    fetch(`http://localhost:8800/signup?email=${email}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.length > 0){
                if(data[0].email == email){
                    alert("user found");
                    id = data[0].id;
                    setTimeout(()=>{
                       document.getElementById("signinform").style.display="none";
                       document.getElementById("passform").style.display="block";
                    }, 1000)
                }
            }
            else{
                alert("Userdata Not found")
            }
        })
});
document.getElementById("passform").addEventListener("submit",(e)=>{
    e.preventDefault();

    let newpassword = document.getElementById("newpassword").value;

    let repass =  document.getElementById("renewpassword").value;

    let passwordcheck = /^(?=.*[A-Z]{1})(?=.*[0-9])(?=.*[!@#$%^&*=-])[a-zA-Z0-9!@#$%^&*=-]{8,16}$/;

    if(!passwordcheck.test(newpassword)){
        document.getElementById("passalert").innerHTML = "** Enter Valid Password";
        document.getElementById("passalert").style.color = "Red";
    }
    else{
        document.getElementById("passalert").innerHTML = "";
    }

    if(!newpassword == repass ){
        document.getElementById("repassalert").innerHTML = "** Password Should be same !";
        document.getElementById("repassalert").style.color = "Red";
    }
    else{
        document.getElementById("repassalert").innerHTML = "";
    }

    if(passwordcheck.test(newpassword) && newpassword == repass){

    fetch(`http://localhost:8800/signup/${id}`,{
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({password : newpassword})
    })
    window.location.href="/pages/signin.html";
}

})
document.getElementById("backforgot").addEventListener("click",()=>{
    window.history.back();
});
const passshow=()=>{
    document.getElementById("fpassshow").style.display="none";
    document.getElementById("fpasshide").style.display="block";

    let show = document.getElementById("newpassword");
  

    if(show.type === "password"){
        show.type = "text";
    }
}
const passhide=()=>{
    document.getElementById("fpassshow").style.display="block";
    document.getElementById("fpasshide").style.display="none";

    let hide = document.getElementById("newpassword");

    if(hide.type === "text"){
        hide.type = "password";
    }
}
document.getElementById("fpassshow").addEventListener("click",passshow);
document.getElementById("fpasshide").addEventListener("click", passhide);
const repassshow=()=>{
    document.getElementById("refpassshow").style.display="none";
    document.getElementById("refpasshide").style.display="block";

    let show = document.getElementById("renewpassword");
  

    if(show.type === "password"){
        show.type = "text";
    }
}
const repasshide=()=>{
    document.getElementById("refpassshow").style.display="block";
    document.getElementById("refpasshide").style.display="none";

    let hide = document.getElementById("renewpassword");

    if(hide.type === "text"){
        hide.type = "password";
    }
}
document.getElementById("refpassshow").addEventListener("click",repassshow);
document.getElementById("refpasshide").addEventListener("click", repasshide);
// import nav from "../components/nav.js";


// document.getElementById("navbar").innerHTML=nav();

// let userforgot = JSON.parse(localStorage.getItem("userforgot"));
// console.log(userforgot)

// document.getElementById("newpassword").value = "";

// document.getElementById("passform").addEventListener("submit",(e)=>{
//     e.preventDefault();

//     console.log(userforgot[0].id);

//     let passfor ={
//         password : document.getElementById("newpassword").value
//     }
//     let repass =  document.getElementById("renewpassword").value;

//     let passwordcheck = /^(?=.*[A-Z]{1})(?=.*[0-9])(?=.*[!@#$%^&*=-])[a-zA-Z0-9!@#$%^&*=-]{8,16}$/;

//     if(!passwordcheck.test(passfor.password)){
//         document.getElementById("passalert").innerHTML = "** Enter Valid Password";
//         document.getElementById("passalert").style.color = "Red";
//     }
//     else{
//         document.getElementById("passalert").innerHTML = "";
//     }

//     if(!passfor.password == repass ){
//         document.getElementById("repassalert").innerHTML = "** Password Should be same !";
//         document.getElementById("repassalert").style.color = "Red";
//     }
//     else{
//         document.getElementById("repassalert").innerHTML = "";
//     }

//     if(passwordcheck.test(passfor.password) && passfor.password == repass){

//         fetch(`http://localhost:8800/signup/${userforgot[0].id}?password=${passfor.newpass}`,{
//             method : "PATCH",
//             headers : {"Content-Type" : "application/json"},
//             body : JSON.stringify(passfor)
//         })
//     }

    
// });
// document.getElementById("backfor").addEventListener("click",()=>{
//     window.history.back();
// })
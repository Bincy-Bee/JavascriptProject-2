import nav from "../components/nav.js";

document.getElementById("navbar").innerHTML = nav();

const passshow=()=>{
    document.getElementById("passshow").style.display="none";
    document.getElementById("passhide").style.display="block";

    let show = document.getElementById("password");
    
    if (show.type === "password"){
        show.type = "text";
    }
    
}
const passhide = ()=>{
    document.getElementById("passhide").style.display="none";
    document.getElementById("passshow").style.display="block";
    let hide = document.getElementById("password");

    if(hide.type === "text"){
        hide.type = "password";
    }
}
document.getElementById("passshow").addEventListener("click", passshow);
document.getElementById("passhide").addEventListener("click", passhide);

document.getElementById("signupform").addEventListener("submit",(e)=>{
    e.preventDefault();

    let user = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
        tel : document.getElementById("tel").value,
    }

    let namecheck = /^[A-Za-z. ]{3,30}$/;
    let emailcheck = /^[A-Za-z0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    let passwordcheck = /^(?=.*[A-Z]{1})(?=.*[0-9])(?=.*[!@#$%^&*=-])[a-zA-Z0-9!@#$%^&*=-]{8,16}$/;
    let telcheck = /^[6-9]{1}[0-9]{9}$/;

    if (!namecheck.test(user.name)){
        document.getElementById("namealert").innerHTML = "** Enter valid Name !!"
        document.getElementById("namealert").style.color = "Red"
    }
    else{
        document.getElementById("namealert").innerHTML = "";
        // document.getElementById("namealert").style.color = "Green"
    }

    if (!emailcheck.test(user.email)){
        document.getElementById("emailalert").innerHTML ="** Enter Valid Email";
        document.getElementById("emailalert").style.color = "Red";
    }
    else{
        document.getElementById("emailalert").innerHTML ="";
        // document.getElementById("emailalert").style.color = "Green";
    }

    if (!passwordcheck.test(user.password)){
        document.getElementById("passalert").innerHTML = "** Enter Valid Password";
        document.getElementById("passalert").style.color = "Red";
    }
    else{
        document.getElementById("passalert").innerHTML = "";
        // document.getElementById("passalert").style.color = "Green";
    }

    if (!telcheck.test(user.tel)){
        document.getElementById("telalert").innerHTML = "**Enter 10 digit number";
        document.getElementById("telalert").style.color = "Red";
    }
    else{
        document.getElementById("telalert").innerHTML = "";
        // document.getElementById("telalert").style.color = "Green";
    }


    if (namecheck.test(user.name) && emailcheck.test(user.email) && passwordcheck.test(user.password) && telcheck.test(user.tel)){
        
        fetch(`http://localhost:8800/signup?email=${user.email}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            if (data.length > 0){
                if (data[0].email == user.email){
                    document.getElementById("emailalert").innerHTML ="Email already exist";
                    alert("Email Already Exist")
                    setTimeout(() => {
                        window.location.href="/pages/signin.html";
                    }, 1000);
                }
            }
            else{
                try {
                    fetch("http://localhost:8800/signup",{
                        method : "POST",
                        headers : {"Content-Type": "application/json"},
                        body : JSON.stringify(user)
                        });
                        localStorage.setItem("loggedIn", true);

                } catch (error) {
                    alert(error)
                }
                
            }
        })
    }
})
document.getElementById("backsignup").addEventListener("click",()=>{
    window.history.back();
})

// document.getElementById("name").addEventListener("keypress",()=>{
//     let name = document.getElementById("name").value;

//     let namecheck = /^[A-Za-z. ]{3,30}$/;

//     if (!namecheck.test(name)){
//         document.getElementById("namealert").innerHTML = "** Enter valid Name !!"
//         document.getElementById("namealert").style.color = "Red"
//     }
//     else{
//         document.getElementById("namealert").innerHTML = "Valid";
//         document.getElementById("namealert").style.color = "Green"
//     }

// });
// document.getElementById("email").addEventListener("keypress",()=>{
//     let email = document.getElementById("email").value;
//     let emailcheck = /^[A-Za-z0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/; 

//     if (!emailcheck.test(email)){
//         document.getElementById("emailalert").innerHTML ="** Enter Valid Email";
//         document.getElementById("emailalert").style.color = "Red";
//     }
//     else{
//         document.getElementById("emailalert").innerHTML ="Valid";
//         document.getElementById("emailalert").style.color = "Green";
//     }

// });
// document.getElementById("password").addEventListener("keypress",()=>{
//     let password = document.getElementById("password").value;
//     let passwordcheck = /^(?=.*[A-Z]{1})(?=.*[0-9])(?=.*[!@#$%^&*=-])[a-zA-Z0-9!@#$%^&*=-]{8,16}$/;

//     if (!passwordcheck.test(password)){
//         document.getElementById("passalert").innerHTML = "** Enter Valid Password";
//         document.getElementById("passalert").style.color = "Red";
//     }
//     else{
//         document.getElementById("passalert").innerHTML = "Valid";
//         document.getElementById("passalert").style.color = "Green";
//     }

// });
// document.getElementById("tel").addEventListener("keypress",()=>{
//     let tel = document.getElementById("tel").value;
//     let telcheck = /^[6-9]{1}[0-9]{9}$/;
        
//     if (!telcheck.test(tel)){
//         document.getElementById("telalert").innerHTML = "**Enter valid number";
//         document.getElementById("telalert").style.color = "Red";
//     }
//     else{
//         document.getElementById("telalert").innerHTML = "Valid";
//         document.getElementById("telalert").style.color = "Green";
//     }
// });

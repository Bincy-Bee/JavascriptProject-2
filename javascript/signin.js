document.getElementById("backsignin").addEventListener("click",()=>{
    window.history.back();
});
const login=(e)=>{
    e.preventDefault();

    let email = document.getElementById("signinemail").value;
    let password = document.getElementById("signinpassword").value;

    let emailcheck = /^[A-Za-z0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    let passwordcheck = /^(?=.*[A-Z]{1})(?=.*[0-9])(?=.*[!@#$%^&*=-])[a-zA-Z0-9!@#$%^&*=-]{8,16}$/;

    if (! emailcheck.test(email)){
        document.getElementById("emailalert").innerHTML = "** Invalid email !!";
    }
    else{
        document.getElementById("emailalert").innerHTML = "";
    }

    if (! passwordcheck.test(password)){
        document.getElementById("passalert").innerHTML = "** Invalid Password !!";
    }
    else{
        document.getElementById("passalert").innerHTML = "";
    }

    if(emailcheck.test(email) && passwordcheck.test(password)){

        fetch(`http://localhost:8800/signup?email=${email}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);

            if (data.length > 0){
                if(data[0].password == password){
                    alert("login succeefully");
                    setTimeout(()=>{
                        window.location.href="/index.html";
                    }, 1000);
                    localStorage.setItem("loggedIn", true);
                }
                else{
                    document.getElementById("passalert").innerHTML = "** Incorrect Password !!";
                }
            }
            else{
                alert("User Not Found")
                
            }
        })
    }

    
}
document.getElementById("signinform").addEventListener("submit",login)
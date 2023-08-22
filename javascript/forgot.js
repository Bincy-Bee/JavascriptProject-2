import nav from "../components/nav.js";

document.getElementById("navbar").innerHTML= nav();


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
                    localStorage.setItem("userforgot", JSON.stringify(data)); 
                    setTimeout(()=>{
                        window.location.href="/pages/password.html"
                    }, 1000)
                }
            }
            else{
                alert("Userdata Not found")
            }
        })
});

document.getElementById("backforgot").addEventListener("click",()=>{
    window.history.back();
})
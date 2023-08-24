let loggedIn = localStorage.getItem("loggedIn");
let user = JSON.parse(localStorage.getItem("userinfo"));
console.log(user);

const usershow=(e)=>{
    e.preventDefault();

    document.getElementById("user-list").style.display="block";
    document.getElementById("userclose").style.display="block";
    document.getElementById("user").style.display="none";
}
document.getElementById("user").addEventListener("click",usershow);

const userhide=(e)=>{
    e.preventDefault();
    
    document.getElementById("user-list").style.display="none";
    document.getElementById("user").style.display="block";
    document.getElementById("userclose").style.display="none";
}
document.getElementById("userclose").addEventListener("click",userhide);

const userdisplay=(info)=>{

    info.map((item)=>{

        let h3 = document.createElement("h3");
        h3.innerHTML = item.name;

        let h4 = document.createElement("h4");
        h4.innerHTML = item.email;

        let div = document.createElement("div");
        div.append(h3, h4);

        document.getElementById("userinfo").append(div);
    })
}


if (loggedIn){
    userdisplay(user);
    document.getElementById("signup").style.display="none";
    document.getElementById("signin").style.display="none";
    document.getElementById("signout").style.display="block";
}
document.getElementById("signout").addEventListener("click",(e)=>{
    e.preventDefault();

    document.getElementById("signup").style.display="block";
    document.getElementById("signin").style.display="block";
    document.getElementById("signout").style.display="none";
    document.getElementById("userinfo").innerHTML="";
    localStorage.clear();

})

document.getElementById("user").addEventListener("click",()=>{
    document.getElementById("user-list").style.display="block";
    document.getElementById("userclose").style.display="block";
    document.getElementById("user").style.display="none";
});
document.getElementById("userclose").addEventListener("click",()=>{
    document.getElementById("user-list").style.display="none";
    document.getElementById("user").style.display="block";
    document.getElementById("userclose").style.display="none";
})
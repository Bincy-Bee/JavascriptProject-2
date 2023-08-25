import nav from "../components/nav.js";

document.getElementById("navbar").innerHTML = nav();

let loggedIn = localStorage.getItem("loggedIn");
let user = JSON.parse(localStorage.getItem("userinfo"));
console.log(user);

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

const usershow=()=>{
    document.getElementById("user-list").style.display="block";
    document.getElementById("userclose").style.display="block";
    document.getElementById("user").style.display="none";
}
document.getElementById("user").addEventListener("click",usershow);

const userhide=()=>{
    document.getElementById("user-list").style.display="none";
    document.getElementById("user").style.display="block";
    document.getElementById("userclose").style.display="none";
}
document.getElementById("userclose").addEventListener("click",userhide);

let sum = 0;
let qtysum = 0;
const cartdisplay =(data)=>{

    // let sum = 0;
    // let qtysum = 0;
    
    data.map((item)=>{
        sum = sum + (item.qty * item.price);
        qtysum = qtysum + (item.qty);
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let bt = document.createElement("button");
        bt.innerHTML = "x";
        bt.setAttribute("id","remove");
        td1.append(bt);
        bt.addEventListener("click",()=>{
            cartproductdelet(item.id);
        })

        let td2 = document.createElement("td");
        td2.setAttribute("id","tdimg")
        let img = document.createElement("img")
        img.src = item.image;
        td2.append(img);

        let td3 = document.createElement("td");
        td3.innerHTML = item.title;
        td3.setAttribute("id","title");

        let td4 = document.createElement("td");
        td4.innerHTML = item.price;
        
        let td5 = document.createElement("td");
        td5.setAttribute("id","qtycol");
        let btn1 = document.createElement("button");
        btn1.innerHTML= "-";
        btn1.setAttribute("id","minus");
        btn1.addEventListener("click",()=>{
            fetch(`http://localhost:8800/cart/${item.id}`)
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                if (data.qty > 0){
                    if(data.qty>1){
                        data.qty = data.qty - 1;
                        fetch(`http://localhost:8800/cart/${data.id}`,{
                            method : "PATCH",
                            headers : {"content-Type": "application/json"},
                            body : JSON.stringify({...data})
                        })
                    }
                    else{
                        cartproductdelet(data.id);
                    }
                }
                else{
                    alert("pleasse add first");
                }
            })
        })
        let qty = document.createElement("span");
        qty.innerHTML = item.qty;
        let btn2 = document.createElement("button");
        btn2.innerHTML = "+";
        btn2.setAttribute("id","plus");
        td5.append(btn1,qty ,btn2);
        btn2.addEventListener("click",()=>{

            fetch(`http://localhost:8800/cart/${item.id}`)
            .then((res)=> res.json())
            .then((data)=>{
                console.log(data);
                if (data.qty > 0){
                    data.qty = data.qty + 1;
                    console.log(data.qty);
                    fetch(`http://localhost:8800/cart/${data.id}`,{
                        method : "PATCH",
                        headers : {"Content-Type": "application/json"},
                        body : JSON.stringify({...data})
                    })
                }
                else{
                    alert("No item were added to the cart")
                }
            })
        })

        let td6 = document.createElement("td");
        td6.innerHTML = item.price * item.qty;

        tr.append(td1, td2, td3, td4, td5, td6);

        document.getElementById("cartpage").append(tr);

    });
    

    document.getElementById("totalqty").innerHTML = qtysum;
    document.getElementById("totalsum").innerHTML = sum.toFixed(2);
}

const cartproductdelet =(id)=>{
    fetch(`http://localhost:8800/cart/${id}`,{
        method : "DELETE"
    })
};
const applycode = (cc)=>{
    let code = document.getElementById("couponcode").value;
    console.log(code)
    if( code === "Select Option"){
        alert("Select Opton");
        document.getElementById("totalsum").innerHTML = sum.toFixed(2);
    }
    else if ( code === cc){
        alert("cc")
        document.getElementById("totalsum").innerHTML = (cc/100 * sum).toFixed(2);
    }
    else{
        alert("no apply");
        document.getElementById("totalsum").innerHTML = sum.toFixed(2);
    }

}

document.getElementById("coupon").addEventListener("change",()=>{
    let discount = document.getElementById("coupon").value;
    let code = document.getElementById("couponcode").value = discount;
    applycode(code);
})

const get = async()=>{

    fetch("http://localhost:8800/cart")
    .then((res)=>res.json())
    .then((data)=>{
        cartdisplay(data);
    })
}
get();
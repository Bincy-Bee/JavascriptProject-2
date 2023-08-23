import nav from "../components/nav.js";

document.getElementById("navbar").innerHTML = nav();

let products = [];

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


const productpage =(data)=>{

    document.getElementById("productpage").innerHTML="";

    data.map((item)=>{

        let img = document.createElement("img");
        img.src = item.image;

        let title = document.createElement("h2");
        title.innerHTML = item.title;

        let price = document.createElement("h3");
        price.innerHTML = item.price;

        let category = document.createElement("h4");
        category.innerHTML = item.category;
      
        let star = document.createElement("p");
        if (item.rating.rate > 4){
            star.innerHTML = "*****";
            star.style.color = "green";
        }
        else if ( item.rating.rate > 2 && item.rating.rate <= 3){
            star.innerHTML = "***";
            star.style.color = "orange";
        }
        else{
            star.innerHTML = "*";
            star.style.color = "red";
        }
        let btn = document.createElement("button");
        btn.setAttribute("id","buynow");
        btn.innerHTML = "Buy Now";

        let btn2 = document.createElement("button");
        btn2.setAttribute("id","addtocart")
        btn2.innerHTML = "Add To Cart";
        btn2.addEventListener("click",()=>{
            let login = localStorage.getItem("loggedIn");

            if (login){
                fetch(`http://localhost:8800/cart?id=${item.id}`)
                .then((res)=> res.json())
                .then((data)=>{
                    console.log(data);
                    if(data.length > 0){
                        alert("Products was added succesfully")

                        data[0].qty = data[0].qty + 1;
                        console.log(data[0].qty);
                        fetch(`http://localhost:8800/cart/${data[0].id}`,{
                            method : "PATCH",
                            headers : {"content-type":"application/json"},
                            body : JSON.stringify(...data)
                        })
                    }
                    else{
                        alert("add to your cart")
                        fetch(`http://localhost:8800/cart`,{
                            method : "POST",
                            headers : {"content-Type":"application/json"},
                            body : JSON.stringify({...item, qty : 1})
                        })
                    }
                })
            }
            else{
                window.location.href="/pages/signin.html";
            }
        })

        let div = document.createElement("div");
        
        div.append(img, title, price, category, star, btn, btn2);
        document.getElementById("productpage").append(div);
    })
};
const handellth =()=>{
    let val = products.sort((a,b)=> a.price-b.price);
    console.log(val)
    productpage(val);;
}
const handelhtl =()=>{
    let lav = products.sort((a,b)=> b.price-a.price);
    console.log(lav)
    productpage(lav);
}
document.getElementById("lth").addEventListener("click", handellth);
document.getElementById("htl").addEventListener("click", handelhtl);

const handelcat =(cat)=>{
    fetch(`http://localhost:8800/products`)
    .then((res)=> res.json())
    .then((data)=>{
         let val = data.filter((item)=> item.category == cat);
         productpage(val);
    })
}

document.getElementById("men").addEventListener("click",()=> handelcat("men's clothing"));
document.getElementById("women").addEventListener("click",()=> handelcat("women's clothing"));
document.getElementById("elect").addEventListener("click",()=> handelcat("electronics"));
document.getElementById("jewel").addEventListener("click",()=> handelcat("jewelery"));
document.getElementById("all").addEventListener("click",()=> get());

const search=()=>{
    let ser = document.getElementById("s-input").value;
    let val = products.filter((item)=> item.title.toLowerCase().match(ser.toLowerCase()));
    productpage(val);
}
document.getElementById("search").addEventListener("click",search);
document.getElementById("search").addEventListener("click",(e)=>{
    if(e.key == "Enter"){
        search()
    }
});
document.getElementById("s-input").addEventListener("input",()=>{
    search();
});

const get = async()=>{

    fetch(`http://localhost:8800/products`)
    .then((res)=> res.json())
    .then((pros)=>{
        products = pros;
        productpage(pros);
    })
}
get();
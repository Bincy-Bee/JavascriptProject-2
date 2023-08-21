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

        let div = document.createElement("div");
        
        div.append(img, title, price, category, star);
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
    fetch(`https://fakestoreapi.com/products`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
         let val = data.filter((item)=> item.category == cat);
         console.log(val);
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

    fetch(`https://fakestoreapi.com/products`)
    .then((res)=> res.json())
    .then((pros)=>{
        products = pros;
        productpage(pros);
    })
}
get();
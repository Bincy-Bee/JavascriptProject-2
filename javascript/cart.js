import nav from "../components/nav.js";

document.getElementById("navbar").innerHTML = nav();

const cartdisplay =(data)=>{
    console.log(data)
    data.map((item)=>{

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
            fetch(`http://localhost:8800/cart/${item.id}?${item.qty}`)
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                if (data.qty > 0){
                    data.qty = data.qty - 1;
                    fetch(`http://localhost:8800/cart/${data.id}?${data.qty}`,{
                        method : "PATCH",
                        headers : {"content-Type": "application/json"},
                        body : JSON.stringify({...data})
                    })
                }
                else if (data.qty < 1){
                    cartproductdelet(data.id);
                }
                else{
                    alert("pleasse add first")
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

            fetch(`http://localhost:8800/cart/${item.id}?${item.qty}`)
            .then((res)=> res.json())
            .then((data)=>{
                console.log(data);
                if (data.qty > 0){
                    data.qty = data.qty + 1;
                    console.log(data.qty);
                    fetch(`http://localhost:8800/cart/${data.id}?${data.qty}`,{
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

    })
}

const cartproductdelet =(id)=>{
    fetch(`http://localhost:8800/cart/${id}`,{
        method : "DELETE"
    })
}

const get = async()=>{

    fetch("http://localhost:8800/cart")
    .then((res)=>res.json())
    .then((data)=>{
        cartdisplay(data);
    })
}
get();
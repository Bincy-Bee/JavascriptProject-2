const nav=()=>{
    return `<header class="text-base">
    <div class="conrainer bg-slate-200 p-3">
        <div class="flex flex-wrap items-center justify-between">
            <div class="logo w-[40px]">
                <a href="/index.html"><img src="/images/b-cart logo.png" alt=""></a>
            </div>
            <nav>
                <ul class="flex font-normal">
                    <li><a href="/index.html" class="mx-1 text-myblue py-1 px-4 hover:bg-slate-50 rounded-2xl font-medium hover:drop-shadow-md">Home</a></li>
                    <li><a href="/pages/products.html" class="mx-1 text-myblue py-1 px-4 hover:bg-slate-50 rounded-2xl font-medium hover:drop-shadow-md">Product</a></li>
                    <li><a href="/pages/cart.html" class="mx-1 text-myblue py-1 px-4 hover:bg-slate-50 rounded-2xl font-medium hover:drop-shadow-md">Cart</a></li>
                </ul>
            </nav>
            <div class="cart-items flex flex-wrap items-center">
                <button id="user"><i class="fa-solid fa-circle-user ml-1 text-xl text-myblue relative hover:text-black px-2 rounded-full p-1 hover:bg-slate-50 z-10"></i></button>
                <button id="userclose" class="close"><i class="fa-solid fa-circle-xmark ml-1 text-xl text-myblue relative hover:text-black px-2 rounded-full p-1 hover:bg-slate-50  z-10"></i></button>
                <div class="user-ops absolute top-[64px] right-0 w-[250px] bg-slate-200 pl-4 pr-4 pb-4 pt-2 rounded-md border border-stone-500" id="user-list">
                    <div class="input flex text-center">
                        <button class="mx-2 text-sm px-1 py-2 w-full bg-myblue m-3 rounded-md text-white"><a href="/pages/signup.html">Sign Up</a></button>
                        <button class="mx-2 text-sm px-1 py-2 w-full bg-myblue m-3 rounded-md text-white"><a href="/pages/signin.html">Sign In</a></button>
                    </div>
                    <div class="list">
                        <ul class="ml-2">
                            <li><a href="#" class="text-sm text-myblue hover:text-orange-500">Orders</a></li>
                            <li><a href="#" class="text-sm text-myblue hover:text-orange-500">Save Addresses</a></li>
                            <li><a href="#" class="text-sm text-myblue hover:text-orange-500">Save Cards</a></li>
                            <li><a href="#" class="text-sm text-myblue hover:text-orange-500">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>`
};


export default nav 
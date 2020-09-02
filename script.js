function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(function (data) {
        categoriesReceived(data)
    })
}
init();

function categoriesReceived(categories) {
    createNavigation(categories);
    createSections(categories);
    fetchProducts();

}

function createSections(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h2 = document.createElement("h2");
        h2.textContent = category;
        section.appendChild(h2);
        document.querySelector(".menu").appendChild(section);
    })
}

function createNavigation(categories) {
    const a = document.createElement("a");
    a.textContent = categories;
    a.setAttribute("href", `#${categories}`)
    document.querySelector("nav").appendChild(a);

}

function fetchProducts() {}

fetch("http://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        dataReceived(data);
    })

function dataReceived(products) {
    products.forEach(showProduct)
}

function showProduct(myProduct) {
    console.log(myProduct)
    const temp = document.querySelector("#productTemplate").content;
    const myCopy = temp.cloneNode(true);

    //discount
    if (!myCopy.discount) {
        myCopy.querySelector(".data_price").classList.add("discount");
        myCopy.querySelector(".data_discount").textContent =
            Math.round(!myCopy.price - !myCopy.discount / 100 * myProduct.price)
    } else {
        myCopy.querySelector(".data_discount").remove();
    }
    /*if (!myProduct.discount) {
        myCopy.querySelector(".data_discount").classList.add("hidden");
    }*/
    //name
    myCopy.querySelector(".data_name").textContent = myProduct.name;

    const parentElem = document.querySelector("section#" + myProduct.category);


    //description
    myCopy.querySelector("p").textContent = myProduct.shortdescription;

    //price
    myCopy.querySelector(".data_price").textContent = myProduct.price;
    //categories


    const parentElem = document.querySelector("section#food");
    parentElem.appendChild(myCopy);

}

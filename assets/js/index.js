const searchProductForm = document.getElementById('search-product-form')
async function getAllCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
async function getAllProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();
        return products.products;
    } catch (error) {
        console.error(error);
    }
}
async function getProductsByCategory(category) {    
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        const products =  await response.json();
        return products.products
    } catch (error) {
        console.error(error);
    }
}
async function searchProduct(query) {
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const filteredProducts = await response.json();
        return filteredProducts.products;
    } catch (error) {
        console.error(error);
    }
}


function displayProducts(products) {
    const productsSection = document.getElementById('products');
    let result = '';
    if(products.length > 0){
        for (const product of products) {
            result += `
            <div class="col-md-4">
                <div class="card p-2">
                    <a href="#"><img src="${product.images[0]}" class="card-img-top img-fluid img-responsive" alt="Image 1"></a>
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="card-title">${(product.title).split(' ').slice(0, 2).join(' ')}</h5>
                                <p class="card-text">${product.category}</p>
                            </div>
                            <span>$ ${product.price}</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }else{
        result = '<div class="d-flex justify-content-center"><p>No data found :)</p></div>'
    }
   
    productsSection.innerHTML = result;
}

function renderCategoriesWithListeners(categories) {
    const categoriesList = document.getElementById('categories');
    console.log(categories);
    let result = `<button class="list-group-item list-group-item-action active">All</button>`;
    for (const category of categories) {
        result += `<button class="list-group-item list-group-item-action">${category}</button>`;
    }
    categoriesList.innerHTML = result;
    let  listGroupItems = document.querySelectorAll('.list-group button');
    addClickListenerToBtn(listGroupItems);
}


searchProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchProductForm.elements[0].value;
    console.log(query);
    const products = await searchProduct(query);
    displayProducts(products);
});


async function generateData(callback, display) {
    let data = await callback()
    display(data)
}
generateData(getAllCategories, renderCategoriesWithListeners)
generateData(getAllProducts, displayProducts)

function addClickListenerToBtn(listGroupItems){
    listGroupItems.forEach((listGroupItem) => {
        listGroupItem.addEventListener('click', async () => {
            const category = listGroupItem.textContent.trim()
            const products = await getProductsByCategory(category);
            displayProducts(products)
        })
    })
}


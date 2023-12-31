const searchProductForm = document.getElementById('search-product-form')
const searchProductCategoryForm = document.getElementById('search-product-category-form')
let currentCategory = 'All'
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
        const products = await response.json();
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
    console.log(products);
    if (products.length > 0) {
        for (const product of products) {
            result += `
            <div class="col-md-4">
                <div class="card p-2">
                    <a class="img-link" href="pages/product.html?id=${product.id}"><img src="${product.images[0]}" class="card-img-top img-fluid img-responsive" alt="Image 1"></a>
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="card-title">${(product.title).split(' ').slice(0, 2).join(' ')}</h5>
                                <p class="card-text">${product.category}</p>
                            </div>
                            <div>
                                <span class="d-block">$ ${product.price}</span>
                            </div>
                        </div>
                        <div class="actions">
                            <button id="add-to-cart-btn" class="cart btn bg-warning text-white"><img class="w-100" src="assets/img/shopping-cart.png"/></button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    } else {
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
    let listGroupItems = document.querySelectorAll('.list-group button');
    addClickListenerToBtn(listGroupItems);
}

function searchProductsByCategory(products) {
    return products.filter((product) => product.category == currentCategory)
}



searchProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchProductForm.elements[0].value;
    console.log(query);
    const products = await searchProduct(query);
    displayProducts(products);
});


searchProductCategoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchProductCategoryForm.elements[0].value;
    console.log(query);
    const products = await searchProduct(query);
    const filteredProducts = searchProductsByCategory(products)
    console.log(filteredProducts);
    displayProducts(filteredProducts);
});

async function generateData(callback, display) {
    const data = await callback()
    display(data)
}


function addClickListenerToBtn(listGroupItems) {
    listGroupItems.forEach((listGroupItem) => {
        listGroupItem.addEventListener('click', async () => {
            const category = listGroupItem.textContent.trim()
            currentCategory = category
            if (category === "All") {
                currentCategory = "All"
                console.log("d");
                generateData(getAllProducts, displayProducts)
            } else {
                const products = await getProductsByCategory(category);
                displayProducts(products)
            }
        })
    })
}

generateData(getAllCategories, renderCategoriesWithListeners)
generateData(getAllProducts, displayProducts)
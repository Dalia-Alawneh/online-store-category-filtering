const categoriesList = document.getElementById('categories');
const productsSection = document.getElementById('products');

async function getAllCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error(error);
    }
}

async function getAllProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();
        displayProducts(products.products);
    } catch (error) {
        console.error(error);
    }
}

getAllProducts();
getAllCategories();

function displayProducts(products) {
    let result = '';
    for (const product of products) {
        result += `
        <div class="col-md-4">
            <div class="card p-2">
                <a href="#"><img src="${product.images[0]}" class="card-img-top img-fluid img-responsive" alt="Image 1"></a>
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <h5 class="card-title">${(product.title).split(' ').slice(0,2).join(' ')}</h5>
                            <p class="card-text">${product.category}</p>
                        </div>
                        <span>$ ${product.price}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    productsSection.innerHTML = result;
}

function displayCategories(categories) {
    let result = `<a href="#" class="list-group-item list-group-item-action active">All</a>`;
    for (const category of categories) {
        result += `<a href="#" class="list-group-item list-group-item-action">${category}</a>`;
    }
    categoriesList.innerHTML = result;
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString)
const id = params.get('id');
console.log(id);

async function getProductById(id) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function generateProduct() {
    let product = await getProductById(id)
    displayProduct(product)
}
generateProduct() 
function displayProduct(product) {
    console.log(product);
    const productSection = document.getElementById('product');
    result =`
    <div class="card p-3">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="${product.thumbnail}" class="card-img" alt="Product Thumbnail">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Price: $${product.price}</p>
                <p class="card-text">Discount: ${product.discountPercentage}%</p>
                <p class="card-text">Rating: ${product.rating}</p>
                <p class="card-text">Stock: ${product.stock}</p>
                <p class="card-text">Brand: ${product.brand}</p>
                <p class="card-text">Category: ${product.category}</p>
        <div class="col-md-12">
            <div class="row">
            ${
                product.images?.map((img) => {
                return `<div class="col-md-2">
                    <img class="w-100" src="${img}"/>
                </div>`
            })
            }
        </div>
        </div>
    </div>
    </div>
    </div>
</div>`;


    productSection.innerHTML = result;
}
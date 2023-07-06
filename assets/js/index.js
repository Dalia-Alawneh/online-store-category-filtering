const categoriesList = document.getElementById('categories');

async function getAllCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error(error);
    }
}

getAllCategories();

function displayCategories(categories) {
    let result = `<a href="#" class="list-group-item list-group-item-action active">All</a>`;
    for (const category of categories) {
        result += `<a href="#" class="list-group-item list-group-item-action">${category}</a>`;
    }
    categoriesList.innerHTML = result;
}
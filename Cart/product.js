const baseURLProducts = "http://localhost:3000/products/";
const addProductBtn = document.getElementById("addProductBtn");

const inputName = document.getElementById("pName");
const inputImage = document.getElementById("pImage");
const inputDescription = document.getElementById("pDescription");
const inputPrice = document.getElementById("pPrice");
const inpuStock = document.getElementById("pStock");

addProductBtn.addEventListener("click", createProduct);


const contentDiv = document.querySelector(".content");

displayProducts()
// Create Products
function createProduct(e) {
  e.preventDefault();
  let productName = inputName.value;
  let productImage = inputImage.value;
  let productDescription = inputDescription.value;
  let productPrice = inputPrice.value;
  let productStock = inpuStock.value;

  let validation = validate(
    productName,
    productImage,
    productDescription,
    productPrice,
    productStock
  )

  if (addProductBtn.textContent === "Add Product"){
      if (validation) {
        productStock = +productStock

        
    //   console.log(typeof(productStock));
        let product = {
        prodName: productName.trim(),
        image: productImage.trim(),
        description: productDescription.trim(),
        price: productPrice.trim(),
        inStock: productStock,
        };
        // console.log(product);
        addProductsDb(product);
    }
  }

}







// display priducts
async function displayProducts() {
    // get the products
    products = await getProductDb();
    console.log(products.length);
  
    console.log("hihi");
    let html = "";
    if (products.length !== 0) {
      products.forEach((p) => {
        // console.log("id is" + p.id)
        html += `
              <div class="card">
              <img src="${p.image}" alt="Product Image" lazy>
              <div class="product-details"
                  <h3>${p.prodName}</h3>
                  <p>${p.description}</p>
                  <div>
                      <p>${p.price} KSH</p>
                      <button class="btn-update" onClick="updateProduct('${p.id}')" >Update</button>
                      <button class="btn-delete" onClick="deleteProduct('${p.id}')" >Delete</button>
                  </div>
              </div>
         </div>
              `;
      });
    } else {
      html = ` <p><i>No Products Found</i></p>`;
      console.log(" NO products Hihi");
    }
  
    contentDiv.innerHTML = html;
  }


  async function deleteProduct(id){
    //get all products in the database
    let products = await getProductDb()
    let product = products.find(p => p.id === id)
    console.log(product);

    deleteProductDb(product)
  }

  async function updateProduct(id){
    let products = await getProductDb()
    let product = products.find(p => p.id === id)
    prepopulate(product)
    console.log(product)
    addProductBtn.addEventListener('click',()=>{
        if (addProductBtn.textContent == "Update Product"){

            console.log(inputName.value, inpuStock.value, inputDescription.value, inputImage.value)
            product = {
                id : product.id,
                prodName: inputName.value,
                image :  inputImage.value,
                description:inputDescription.value,
                price:inputPrice.value,
                inStock:inpuStock.value,
            }
            // console.log("updated products" +  product)
                 updateProductDb(product)
                console.log( "products  updated " +  product)
                addProductBtn.textContent = "Add Product"
                addProductBtn.style = "background-color: orange"
    
        }

    })
    

  }






/////////////////////////////////////////////////////////////////////////////////
//  JSON FUNCTIONSS
// add products to json
function addProductsDb(product) {
  let response = fetch(baseURLProducts, {
    method: "POST",
    body: JSON.stringify(product),
  });
}

// get all products
async function getProductDb() {
  let response = await fetch(baseURLProducts);
  let products = await response.json();
  return products;
}

// update a products
async function updateProductDb({ id, ...product}) {
  let response = await fetch(baseURLProducts+id, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

function deleteProductDb({ id, ...product }) {
  let response = fetch(baseURLProducts + id, {
    method: "DELETE",
  });
}



///////////////////// validation function
function validate(name, image, description, price, stock) {
    if (
      name.trim() == "" &&
      image.trim() == "" &&
      description.trim() == "" &&
      price.trim() == "" &&
      stock.trim() == ""
    ) {
      console.log("fields cannot be empty");
      return false;
    } else {
    //   console.log("Not empty");
      return true;
    }
  }


  function prepopulate(existing){
       inputName.value =   existing.prodName 
       inputImage.value = existing.image  
       inputDescription.value = existing.description
        inputPrice.value =   existing.price  
        inpuStock.value =  existing.inStock  
        // console.log( existing.inStock )
        addProductBtn.textContent = "Update Product"
        // console.log(addProductBtn.textContent);
        addProductBtn.style = "background-color: green"
  }
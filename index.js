var productPriceInput = document.getElementById("productPrice");
var productNameInput = document.getElementById("productName");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var prodlist = [];
var addProductBtn = document.getElementById("addProductBtn");
var UpdateProductBtn = document.getElementById("UpdateProductBtn");
var produtListName = "prodlist";

if (localStorage.getItem(produtListName) != null) {
    prodlist = JSON.parse(localStorage.getItem(produtListName))
    displayproduct(prodlist)
}



function addProduct() {

    if (validateProductName() == true) {
        if (validateProductPrice() == true) {
            if (validateProductCategory() == true) {
                if (validateProductDesc() == true) {

                    product = {
                        name: productNameInput.value,
                        price: productPriceInput.value,
                        category: productCategoryInput.value,
                        desc: productDescInput.value

                    }


                    prodlist.push(product);
                    localStorage.setItem(produtListName, JSON.stringify(prodlist));
                    displayproduct(prodlist);
                    updateFormValues();



                } else { alert("desc not valid"); }
            } else { alert("category not valid"); }
        } else { alert("price not valid"); }
    } else {
        alert("name not valid");
    }



}















function displayproduct(list) {
    var blackBox = "";
    for (var i = 0; i < list.length; i++) {
        blackBox += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].price}</td>
        <td>${list[i].newName ? list[i].newName : list[i].name}</td>
        <td>${list[i].category}</td>
        <td>${list[i].desc} good</td>

        <td>     

        <button onclick="getUpdatedValue(${i})" class="btn btn-warning">Update</button>

        </td>

        <td>  

         <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>

         </td>


    </tr>`
    }
    document.getElementById("productData").innerHTML = blackBox

}


function clearForm() {
    productNameInput.value = ""
    productPriceInput.value = ""

    productCategoryInput.value = ""
    productDescInput.value = ""
}


function deleteProduct(index) {
    prodlist.splice(index, 1);
    localStorage.setItem(produtListName, JSON.stringify(prodlist));
    displayproduct(prodlist);
}


function searchByName(term) {
    var foundedItem = []
    for (var i = 0; i < prodlist.length; i++) {
        if (prodlist[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            prodlist[i].newName = prodlist[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger>${term}</span>`)
        }
    }
    displayproduct(foundedItem)
}





function getUpdatedValue(item) {
    console.log(item, "updated");
    addProductBtn.classList.add("d-none");
    UpdateProductBtn.classList.replace("d-none", "d-block");
    productNameInput.value = prodlist[item].name;
    productPriceInput.value = prodlist[item].price;

    productCategoryInput.value = prodlist[item].category;
    productDescInput.value = prodlist[item].desc;

    updateFormValues(prodlist[item]);
}


function UpdateProduct() {
    addProductBtn.classList.replace("d-none", "d-block");
    UpdateProductBtn.classList.replace("d-block", "d-none");


    productNameInput.value,
        productPriceInput.value,
        productCategoryInput.value,
        productDescInput.value

}
function updateFormValues(flag) {
    productNameInput.value = flag ? flag.name : "";
    productPriceInput.value = flag ? flag.price : "";

    productCategoryInput.value = flag ? flag.category : "";
    productDescInput.value = flag ? flag.desc : "";
}



function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productNameInput.value) == true) {
        return true;
    } else {
        return false;
    }
}

function validateProductPrice() {
    var regex = /^([1-9][0-9][0-9][0-9]|10000)$/;
    if (regex.test(productPriceInput.value) == true) {
        return true;
    } else {
        return false;
    }
}



function validateProductCategory() {
    var regex = /^(tv|mobile|Tv|TV|Mobile|mobile)$/;
    if (regex.test(productCategoryInput.value) == true) {
        return true;
    } else {
        return false;
    }
}


function validateProductDesc() {
    var regex = /^([a-z]|[A-Z]){4}$/;
    if (regex.test(productDescInput.value) == true) {
        return true;
    } else {
        return false;
    }
}
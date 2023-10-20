document.addEventListener('DOMContentLoaded', function() {
  const productForm = document.getElementById('product-form');
  const productList = document.getElementById('product-list');
  const totalPrice = document.createElement("h4");
  const products = [];

  if (localStorage.getItem('products')) {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    products.push(...storedProducts);
    renderProducts();
  }

  if (localStorage.getItem('totalPrice')) {
    totalPrice.textContent = `The total price is ${localStorage.getItem('totalPrice')} RON!`;
  }

  function updateTotalPrice() {
    const total = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    totalPrice.textContent = `The total price is ${total} RON!`;

    localStorage.setItem('totalPrice', total);
    localStorage.setItem('products', JSON.stringify(products));
  }

  function renderProducts() {
    productList.innerHTML = '';

    for (const product of products) {
      const productItem = document.createElement('li');
      const buttonPlus = document.createElement("button");
      const buttonMinus = document.createElement("button");
      const deleteButton = document.createElement("button");
      const productQuantity = document.createElement('span');
      
      buttonPlus.textContent = "+";
      buttonMinus.textContent = "-";
      deleteButton.textContent = "Delete product";
      productQuantity.textContent = product.quantity;
      
      const updateProductItem = () => {
        productItem.textContent = `Name: ${product.name}, Price: ${product.price} RON, Color: ${product.color} - Quantity: `;
        productItem.appendChild(productQuantity);
        productItem.appendChild(buttonMinus);
        productItem.appendChild(buttonPlus);
        productItem.appendChild(deleteButton);
      }

      updateProductItem();

      buttonPlus.addEventListener("click", () => {
        product.quantity += 1;
        productQuantity.textContent = product.quantity;
        updateTotalPrice();
      });

      buttonMinus.addEventListener("click", () => {
        if (product.quantity > 1) {
          product.quantity -= 1;
          productQuantity.textContent = product.quantity;
          updateTotalPrice();
        }
      });

      deleteButton.addEventListener("click", () => {
        productItem.remove();
        const productIndex = products.findIndex(p => p.name === product.name);
        if (productIndex !== -1) {
          products.splice(productIndex, 1);
          updateTotalPrice();
        }
      });

      productList.appendChild(productItem);
      productList.appendChild(totalPrice);
    }
  }

  productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productColor = document.getElementById('product-color').value;

    if (productPrice <= 0) {
      alert("The price should be higher than 0!");
    }

    if (productName && productPrice && productPrice > 0) {
      const productItem = document.createElement('li');
      const buttonPlus = document.createElement("button");
      const buttonMinus = document.createElement("button");
      const deleteButton = document.createElement("button");

      buttonPlus.textContent = "+";
      buttonMinus.textContent = "-";
      deleteButton.textContent = "Delete product";

      const productQuantity = document.createElement('span');
      productQuantity.textContent = 1; 

      const updateProductItem = () => {
        productItem.textContent = `Name: ${productName}, Price: ${productPrice} RON, Color: ${productColor} - Quantity: `;
        productItem.appendChild(productQuantity);
        productItem.appendChild(buttonMinus);
        productItem.appendChild(buttonPlus);
        productItem.appendChild(deleteButton);
      };

      updateProductItem();

      const productObj = {
        name: productName,
        price: productPrice,
        color: productColor,
        quantity: 1
      };

      buttonPlus.addEventListener("click", () => {
        productObj.quantity += 1;
        productQuantity.textContent = productObj.quantity;
        updateTotalPrice();
      });

      buttonMinus.addEventListener("click", () => {
        if (productObj.quantity > 1) {
          productObj.quantity -= 1;
          productQuantity.textContent = productObj.quantity;
          updateTotalPrice();
        }
      });

      deleteButton.addEventListener("click", () => {
        productItem.remove();
        const productIndex = products.findIndex(product => product.name === productName);
        if (productIndex !== -1) {
          products.splice(productIndex, 1);
          updateTotalPrice();
        }
      });

      products.push(productObj);
      updateTotalPrice();
      console.log(productObj);

      productList.appendChild(productItem);
      productList.appendChild(totalPrice);

      productForm.reset();
      
    }
  });
});
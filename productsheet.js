
fetch('https://ab-p5-api.herokuapp.com/api/cameras')
.then(res => res.json())
.then(data => {
  const product = data.lenght;


  const productId = getProductId();
  const productData = getProductData(productId);
   hydratePage(productData)

  function getProductId() {
    return new URL(window.location.href).searchParams.get('_id')
  }

  function getProductData(productId){
    return fetch('https://ab-p5-api.herokuapp.com/api/cameras')
    .catch((error) => {
      console.log(error)
    })
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData)
  }

  function hydratePage(product){
    let nameProduct = document.querySelector('.name-product');
    nameProduct.innerHTML = 'product.name';
    let showProduct = document.querySelector('.show-product');
    let $imgShowProduct = document.createElement('img');
    $imgShowProduct.src = product.imageUrl;
    showProduct.appendChild($imgShowProduct);
  }

})         

        // ;(async () => {
        //     const productId = getProductId()
        //     const productData = await getProductData(productId)
        //     hydratePage(productData)
        //   })()

        //   //Récupère l'id du produit depuis l'URL
        //   function getProductId() {
        //     let positionUrl = window.location.href.indexOf('?');
        //     let idUrlProducts = window.location.href.substr(positionUrl + 1);
        //     console.log(idUrlProducts);    
        //     }

        //   function getProductData(productId) {
        //     return fetch(`http://127.0.0.1:5501/index.html/api/cameras/${productId}`)
        //       .catch((error) => {
        //         console.log(error)
        //       })
        //       .then((httpBodyResponse) => httpBodyResponse.json())
        //       .then((productData) => productData)
        //   }
        //   function hydratePage(productData) {
        //     // Hydrate page with data
        //     document.querySelector('.show-product').src = productData.imageUrl
        //     document.querySelector('.name-product').textContent = 'product.name'
        //     document.querySelector('.p-price').textContent = `${productData.price / 100}.00 €`
        //     document.querySelector('.dscpt-txt').textContent = productData.description
            
    
        //   }
          
        //   function redirectToShoppingCart(productName) {
        //     window.location.href = `${window.location.origin}/cart.html?lastAddedProductName=${productName}`
          
        //   }
    


    
//     let lensesArray = data[0]['lenses'];
//     console.log(lensesArray);

//     for (let i = 0; i < lensesArray.length; i++) {
//         let dropdownMenu = document.querySelector('.dropdown-menu');
//         let $lenses = document.createElement('li');
//         dropdownMenu.appendChild($lenses);
//         let $lensesLinks = document.createElement('a');
//         $lenses.appendChild($lensesLinks);
//         $lensesLinks.innerText = lensesArray[i];
//      })

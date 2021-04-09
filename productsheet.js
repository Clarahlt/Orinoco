fetch('https://github.com/OpenClassrooms-Student-Center/JWDP5/')
.then(res => res.json()
.then(dataP => {
  let dataProducts = dataP;
        

//         var positionUrl = window.location.href.indexOf('?');
//         console.log(positionUrl);
//         var idUrlProducts = window.location.href.substr(positionUrl + 1);
//         console.log(idUrlProducts);


          //Récupère l'id du produit depuis l'URL
          function getProductId() {
            let positionUrl = window.location.href.indexOf('?');
            let idUrlProducts = window.location.href.substr(positionUrl + 1);
            console.log(idUrlProducts);    
            }

          function getProductData(productId) {
            return fetch(`${apiUrl}/api/cameras/${productId}`)
              .catch((error) => {
                console.log(error)
              })
              .then((httpBodyResponse) => httpBodyResponse.json())
              .then((productData) => productData)
          }
          function hydratePage(productData) {
            // Hydrate page with data
            document.querySelector('.show-product').src = productData.imageUrl
            document.querySelector('.name-product').textContent = 'product.name'
            document.querySelector('.p-price').textContent = `${productData.price / 100}.00 €`
            document.querySelector('.dscpt-txt').textContent = productData.description
            
    
          }



    
//     let lensesArray = data[0]['lenses'];
//     console.log(lensesArray);

//     for (let i = 0; i < lensesArray.length; i++) {
//         let dropdownMenu = document.querySelector('.dropdown-menu');
//         let $lenses = document.createElement('li');
//         dropdownMenu.appendChild($lenses);
//         let $lensesLinks = document.createElement('a');
//         $lenses.appendChild($lensesLinks);
//         $lensesLinks.innerText = lensesArray[i];
//     }
// });

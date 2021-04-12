
//Récupération données locale Storage
let Objects = localStorage.getItem('[object Object],[object Object],[object Object],[object Object],[object Object]');
console.log(Objects)

if(!localStorage.getItem("_id")) {
  populateStorage();
} else {
  setStyles();
}

function populateStorage(obj) {
  localStorage.setItem('name', document.getElementsByTagName('legend').value);
  setStyles();
}

function setStyles() {
  var currentName = localStorage.getItem('name');

  document.getElementsByTagName('legend').value = currentName;
}


// Récupération identifiant produit dans l'URL
let positionUrl = window.location.href.indexOf('?');
let idUrlProducts = window.location.href.substr(positionUrl + 1);
console.log(idUrlProducts)












// fetch('https://ab-p5-api.herokuapp.com/api/cameras')
// .then(res => res.json())
// .then(data => {
//   let dataI = data;
  
//   for(let i = 0; i < dataI; i++){
//     console.log(dataI[i])
//         console.log(dataI[i]['_id'])
//         console.log(dataI[i]['name']);
//         console.log(dataI[i]['description']);
//         console.log(dataI[i]['price']);
//         console.log(dataI[i]['imageUrl']);


//   }

 

//   let positionUrl = window.location.href.indexOf('?');
//   let idUrlProducts = window.location.href.substr(positionUrl + 1);
  

//    const productId = idUrlProducts;
//    console.log(productId)
//   const productData = getProductData(productId);
//   const newContent = hydratePage()

//   function getProductData(productId){
//     return fetch('https://ab-p5-api.herokuapp.com/api/cameras')
//     .catch((error) => {
//       console.log(error)
//     })
//     .then((httpBodyResponse) => httpBodyResponse.json())
//     .then((dataI) => dataI)
    
//   }

//   console.log(dataI)

//   if(!localStorage.getItem('_id')) {
  
//     };
//   } else {
//     setStyles();
//   }

//   for (var i = 0; i < localStorage.length; i++) {
//     console.log(localStorage.getItem(localStorage.key(i)));

//  }


// })         

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

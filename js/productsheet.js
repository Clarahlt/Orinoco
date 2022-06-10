/**
 * getProductId => permet de récupèrer depuis l'URL et l'identifiant du produit les données sur l'API
 * @param {string|number} productId définit l'identifiant du produit
 */
function getProductId(productId) {
  console.log('Identifiant du produit selectionné:' + ' ' + productId)
}

let urlPosition = window.location.href.indexOf('?');
let idUrlProducts = window.location.href.substr(urlPosition +1);
getProductId(urlPosition, idUrlProducts)

/**
 * getProductsById affiche les données du produit selectionné
 */
function getProductsbyId() {
fetch('http://localhost:3000/api/cameras/' + idUrlProducts)
.then(res => res.json())
.then(dataProducts => {
  console.log(dataProducts);
  let newName = document.querySelector('.name-product');
  newName.innerHTML = dataProducts.name;
  let showProduct = document.querySelector('.show-product');
  let $imgProduct = document.createElement('img');
  $imgProduct.classList.add('img-show-product');
  $imgProduct.src = dataProducts.imageUrl;
  showProduct.appendChild($imgProduct);
  let newP = document.querySelector('.p-price');
  newP.textContent = dataProducts.price/100 + " € ";
  
  //récupération et affichage dans un selecteur des 'lenses' disponibles pour chaque produit
  let lensesArray = dataProducts.lenses;
  console.log('récupération des lenses disponibles:');
  console.log(lensesArray);
  for (let i = 0; i < lensesArray.length; i++) {
    let dropdownMenu = document.querySelector('.dropdown-menu');
    let $lenses = document.createElement('li');
    dropdownMenu.appendChild($lenses);      
    $lenses.innerText = lensesArray[i];
  }


  

  // Permet d'ajouter, au clic du bouton btnAddToCaddy l'article au panier
  let btnAddToCaddy = document.querySelector('.add-to-caddy');
  btnAddToCaddy.addEventListener('click', (event) => {
    event.preventDefault();
    let inputQty = document.querySelector('#inputQty').value
    let  data = {
      _id: dataProducts._id,
      name: dataProducts.name,
      imageUrl: dataProducts.imageUrl,
      price: dataProducts.price/100,
      quantity: inputQty,
      totalPrice: (inputQty * dataProducts.price)/100
    }
    let key = data._id

    // Sauvegarde du produit par son identifiant dans le SessionStorage
    sessionStorage.setItem(key, JSON.stringify(data))
    console.log('article ajouté au panier:');
    console.log(data);
    
    //Création d'une fenêtre PopUp 'Produit ajouté au panier !'//
    popUpAddToCaddy('Votre produit a été ajouté au panier !')
  })
})
.catch(error => ('Impossible de récupérer le produit ! Veuillez réessayer ultérieurement!'))
}

/**
 * 
 * @param {string} messageAddToCaddy Affiche un message qui indique que le produit a été ajouté au panier
 */
function popUpAddToCaddy(messageAddToCaddy) {
  let containerPopUp = document.querySelector('.row.product-sheet')
  let popUpAddCaddy = document.createElement('div')
  popUpAddCaddy.setAttribute('class','popUpAddCaddy')
  let txtAddCaddy = document.createElement('div')
  txtAddCaddy.setAttribute('class', 'textAddCaddy')
  txtAddCaddy.textContent = messageAddToCaddy;
  let btnpopUp = document.createElement('button')
  btnpopUp.setAttribute('class', 'btnPopUp')
  containerPopUp.appendChild(popUpAddCaddy)
  popUpAddCaddy.appendChild(txtAddCaddy)
  popUpAddCaddy.appendChild(btnpopUp)

  btnpopUp.addEventListener('click', (e)=> {
    e.preventDefault;
    let productSheet = document.querySelector('.row.product-sheet')
    let popUp = document.querySelector('.popUpAddCaddy')
    productSheet.removeChild(popUp)
  })
}
getProductsbyId();



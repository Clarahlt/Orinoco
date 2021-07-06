// Récupération identifiant produit dans l'URL
let positionUrl = window.location.href.indexOf('?');
let idUrlProducts = window.location.href.substr(positionUrl + 1);
console.log(idUrlProducts)

// Récupération données produits par l'id URL et création du contenu HTML
fetch('https://ab-p5-api.herokuapp.com/api/cameras/' + idUrlProducts)
.then(res => res.json())
.then(dataProducts => {
    let newName = document.querySelector('.name-product');
    newName.innerHTML = dataProducts.name;
    let showProduct = document.querySelector('.show-product');
    let $imgProduct = document.createElement('img');
    $imgProduct.classList.add('img-show-product');
    $imgProduct.src = dataProducts.imageUrl;
    showProduct.appendChild($imgProduct);

    let newP = document.querySelector('.p-price');
    newP.textContent = dataProducts.price/100 + " € ";

    let lensesArray = dataProducts.lenses;
    console.log(lensesArray);

    for (let i = 0; i < lensesArray.length; i++) {
      let dropdownMenu = document.querySelector('.dropdown-menu');
      let $lenses = document.createElement('li');
      dropdownMenu.appendChild($lenses);
      $lenses.innerText = lensesArray[i];
    }

    let btnAddToCaddy = document.querySelector('.add-to-caddy');

    btnAddToCaddy.addEventListener('click', (event) => {
    event.preventDefault();

    let inputQty = document.querySelector('#inputQty').value
      let  data = {
        _id: dataProducts._id,
        name: dataProducts.name,
        imageUrl: dataProducts.imageUrl,
        price: dataProducts.price/100,
        _id: dataProducts._id,
        quantity: inputQty,
        totalPrice: (inputQty * dataProducts.price)/100
      }
      let key = data._id;
      let val = JSON.stringify(data);
      window.sessionStorage.setItem(key, val);

//Création d'une fenêtre PopUp 'Produit ajouté au panier !'//
      let containerPopUp = document.querySelector('.row.product-sheet')
      let popUpAddCaddy = document.createElement('div');
      popUpAddCaddy.setAttribute('class','popUpAddCaddy')
      let txtAddCaddy = document.createElement('div')
      txtAddCaddy.setAttribute('class', 'textAddCaddy')
      txtAddCaddy.textContent = 'Votre produit a été ajouté au panier !';
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
    )
})



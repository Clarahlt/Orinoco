
// Récupération identifiant produit dans l'URL
let positionUrl = window.location.href.indexOf('?');
let idUrlProducts = window.location.href.substr(positionUrl + 1);
console.log(idUrlProducts)

fetch('https://ab-p5-api.herokuapp.com/api/cameras/' + idUrlProducts)
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

    let lensesArray = dataProducts.lenses;
    console.log(lensesArray);

    for (let i = 0; i < lensesArray.length; i++) {
      let dropdownMenu = document.querySelector('.dropdown-menu');
      let $lenses = document.createElement('li');
      dropdownMenu.appendChild($lenses);
      $lenses.innerText = lensesArray[i];}
})

    
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

// *** Function 'getProducts' qui récupére les produits
// *** Function 'drawTable(getProducts)' qui crée un tableau "caddy";
// *** Function 'deleteProduct()'qui supprime un article dans la panier ET dans le Storage;
// *** showTotalLine() Function qui affiche le prix total d'une ligne du tableau en fonction de sa quantité;
// ** Function 'showTotalCaddy()'qui affiche le prix total du panier;
// Function de validation pour le formulaire (RegEx)
// Function qui retourne une page de validation de commande avec un numéro random de commande
// Function qui change le contenu de la page en page de validation de commande et génère un numéro de commande random

let arrayProducts = [];
let key = '';
let values = '';
let totalPrice = [];
let arrayPricesLine = []

function getProducts(){
  for (let i = 1; i < sessionStorage.length; i++){
    key = sessionStorage.key(i);
    valeur = JSON.parse(sessionStorage.getItem(key));
    arrayProducts.push(valeur);
    console.log(arrayProducts)
}
}

function drawTable(){
    if(arrayProducts.length > 0){
      for (let i = 0; i < arrayProducts.length; i++){
        let table = document.getElementById('caddy')
        let $newLineProduct = document.createElement('tr')
        let $nameProd = document.createElement('td')
        $nameProd.innerText = arrayProducts[i].name
        let $prodQty = document.createElement('td')
        $prodQty.innerHTML = arrayProducts[i].quantity
        let $unitPrice = document.createElement('td')
        $unitPrice.innerText = arrayProducts[i].price + '€'
        $unitPrice.setAttribute('class', 'unitPrice')
        let $totalLine = document.createElement('td')
        $totalLine.textContent = arrayProducts[i].totalPrice + '€'
        $totalLine.setAttribute('class', 'totalLine')
        totalPrice.push(arrayProducts[i].totalPrice)

        let $deleteCase = document.createElement('td')
        let $deleteBtn = document.createElement('button') 
        $deleteBtn.setAttribute('class', 'deleteBtn')

        table.appendChild($newLineProduct)
        $newLineProduct.appendChild($nameProd)
        $newLineProduct.appendChild($prodQty)
        $newLineProduct.appendChild($unitPrice)
        $newLineProduct.appendChild($totalLine)
        $newLineProduct.appendChild($deleteCase)
        $deleteCase.appendChild($deleteBtn)
        $deleteBtn.onclick = function deleteProduct(){
            sessionStorage.removeItem(key);
            window.location.reload();
        }
      }
    
    } else {
      alert('Votre panier est vide ! ')
    }

  }
  function showTotalCaddy(){
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = totalPrice.reduce(reducer);
    
    let totalProductsPrice = document.getElementById('totalPrice');
    let $total = document.createElement('th');
    $total.setAttribute('id', 'totalCaddy')
    $total.innerHTML = total + '€';
    totalProductsPrice.appendChild($total);
  }

  //********** Récupération des valeurs du formulaire pour les mettre dans le local storage */

  let BtnForm = document.getElementById('btnForm');
  let orderForm = document.getElementById('order-form');
  BtnForm.addEventListener('click', (e)=> {
    e.preventDefault;
      contactForm = {
        lastName: orderForm['lastname'].value,
        firstName: orderForm['firstname'].value,
        adress: orderForm['adress'].value,
        city: orderForm['city'].value,
        email: orderForm['email'].value,
      }
      function validNames(){
      if(/^[A-Za-z$-]{3,20}$/.exec(contactForm.lastName) && /^[A-Za-zà-ÿ\s$-]{3,20}$/.exec(contactForm.firstName) ){
        console.log('ok')
        return true
      }else{
        console.log('ko')
        return false
      };
    }
      function validAdress(){
         if(/^[0-9]{1,4}\s[A-zà-ÿ-\s]{1,}/.exec(contactForm.adress) && /^[A-Za-zà-ÿ\-]|[0-9]{5}$/.exec(contactForm.city)){
          console.log('ok')
           return true
         }else{
           console.log('ko')
           return false
         };
       }
       function validEmail(){
         if(/^([\w\.\-_]+)?\w+@[a-z]+(\.\w+){1,}$/.exec(contactForm.email)){
           console.log('ok')
           return true
         }else{
           console.log('ko')
           return false
         };
        }
    validNames()
    validAdress()
     validEmail()
  
    products = arrayProducts;

    let sentToServer = {
      contactForm,
      products
    }
    
      if(validNames() && validAdress() && validEmail() == true){
        localStorage.setItem('ValidationCaddy', JSON.stringify(sentToServer))
        function hydratatePage(){
          let hydratatePage = document.getElementById('content-form');
          let b = document.body;
          
          let newPage = document.createElement('div')
          newPage.setAttribute('class', 'container content-confirmation');
          let newRow = document.createElement('div')
          newRow.setAttribute('class', 'ctent-confirm')
          let thanks = document.createElement('h1')
          thanks.innerText = 'Merci' + ' ' + orderForm['firstname'].value + ' ' +  'pour votre confiance !'
    
          let contentOrderedInfo = document.createElement('div')
          let orderedInfo = document.createElement('p')
          let totalCaddy = document.getElementById('totalCaddy').innerText;
          console.log(totalCaddy);
          orderedInfo.innerText = "Votre commande a bien été prise en compte. La facture d'un montant de" + ' ' + totalCaddy + ' '+ "vous sera envoyé à l'adresse mail que vous avez indiqué!"
          let numOrdered = document.createElement('p')
          numOrdered.innerText = "Votre commande n°" + ' ' + '2423425FFZZ' + ' ' + 'sera expédiée dans les prochaines 24H'
          
          let btnReturn = document.createElement('button')
          btnReturn.setAttribute('class', 'btn-card btnReturn')
          contentOrderedInfo.appendChild(orderedInfo)
          contentOrderedInfo.appendChild(numOrdered)
          contentOrderedInfo.appendChild(btnReturn)
    
          newPage.appendChild(newRow)
          newRow.appendChild(thanks)
          newRow.appendChild(contentOrderedInfo)
          b.replaceChild(newPage, hydratatePage)
          
          }
          hydratatePage();
      }else{
       
        let containerValidation = document.querySelector('#containerValidation')
      console.log(containerValidation);
      let popUpForm = document.createElement('div');
      popUpForm.setAttribute('class','popUpForm')
      let textCompleteForm = document.createElement('div')
      textCompleteForm.setAttribute('class', 'textCompleteForm')
      textCompleteForm.textContent = 'Veuillez remplir champs correctement.';
      let btnpopUp = document.createElement('button')
      btnpopUp.setAttribute('class', 'btnPopUp')
      containerValidation.appendChild(popUpForm)
      popUpForm.appendChild(textCompleteForm)
      popUpForm.appendChild(btnpopUp)
      btnpopUp.addEventListener('click', ()=> {
        let productSheet = document.querySelector('#containerValidation')
        let popUp = document.querySelector('.popUpForm')
        productSheet.removeChild(popUp)
      })
      }
     
   })
  // function qui envoie vers server la const "sentToServer"

getProducts();
drawTable();
showTotalCaddy()
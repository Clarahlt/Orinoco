let arrayProducts = [];
let arrayProductId = [];
let arrayOrderId = [];
let key = '';
let values = '';
let totalPrice = [];

// Création d'une fonctin 'getProducts()' => récupère les données des produits selectionnés dans le sessionStorage
// place les produits du sessionStorage dans un tableau 'arrayProducts'
function getProducts(){
  for (let i = 1; i < sessionStorage.length; i++){
    key = sessionStorage.key(i);
    valeur = JSON.parse(sessionStorage.getItem(key));
    arrayProducts.push(valeur);
    arrayProductId.push(valeur._id)
    console.log(arrayProductId)
  }
}


// Création d'une fonction 'DrawTable()'
function drawTable(){
  //Crée la table caddy en fonction du nombre de produits stockés dans 'arrayProducts'
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

      //Création d'un boutton de supression pour chaque produit selectionné
      let $deleteCase = document.createElement('td')
      let $deleteBtn = document.createElement('button') 
      $deleteBtn.setAttribute('class', 'deleteBtn')
      // la fonction 'deleteProduct()' supprime le produit du sessionStorage et reload la page web.
      $deleteBtn.onclick = function deleteProduct(){
        sessionStorage.removeItem(key);
        window.location.reload();
      }

      table.appendChild($newLineProduct)
      $newLineProduct.appendChild($nameProd)
      $newLineProduct.appendChild($prodQty)
      $newLineProduct.appendChild($unitPrice)
      $newLineProduct.appendChild($totalLine)
      $newLineProduct.appendChild($deleteCase)
      $deleteCase.appendChild($deleteBtn)
    }
  } else {
      alert('Votre panier est vide ! ')
    }
  };
  
  
// Création d'une fonction 'ShowTotalCaddy ' => affiche le total du panier. 
function showTotalCaddy(){
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = totalPrice.reduce(reducer);
    
  let totalProductsPrice = document.getElementById('totalPrice');
  let $total = document.createElement('th');
  $total.setAttribute('id', 'totalCaddy')
  $total.innerHTML = total + '€';
  totalProductsPrice.appendChild($total);
}

// Récupération des valeurs du formulaire pour les mettre dans le local storage afin de les envoyer au serveur
let BtnForm = document.getElementById('btnForm');
let orderForm = document.getElementById('order-form');

BtnForm.addEventListener('click', ()=> {

  //Création de l'objet à envoyer au serveur
  let sentToServer = {
    contact : {
    firstName: orderForm['firstname'].value,
    lastName: orderForm['lastname'].value,
    address: orderForm['adress'].value,
    city: orderForm['city'].value,
    email: orderForm['email'].value,
  },
  products : arrayProductId
}

// Création de 3 fonctions ValidNames, validAddress, validEmail => permet de valider les données du formulaire avant son envoi 
function validNames(){
  if(/^[A-Za-z$-]{3,20}$/.exec(sentToServer.contact.lastName) && /^[A-Za-zà-ÿ\s$-]{3,20}$/.exec(sentToServer.contact.firstname) ){
    console.log('ok')
    return true
  }else{
    console.log('ko')
    return false
  };
}
function validAddress(){
  if(/^[0-9]{1,4}\s[A-zà-ÿ-\s]{1,}/.exec(sentToServer.contact.address) && /^[A-Za-zà-ÿ\-]|[0-9]{5}$/.exec(sentToServer.contact.city)){
    console.log('ok')
   return true
  }else{
    console.log('ko')
    return false
  };
}
function validEmail(){
  if(/^([\w\.\-_]+)?\w+@[a-z]+(\.\w+){1,}$/.exec(sentToServer.contact.email)){
    console.log('ok')
    return true
  }else{
    console.log('ko')
    return false
  };
}
validNames()
validAddress()
validEmail()

// Si les données sont conformes au code Regex, les données sont stockées dans le localStorage sous la clé 'ValidationCaddy'
if(validNames() && validAddress() && validEmail() == true){
  localStorage.setItem('ValidationCaddy', JSON.stringify(sentToServer))
}else{
  alert('Alert')
}

//Création d'une fonction 'send(e)' => Envoie les données au serveur afin de recevoir une réponse contenant une numéro Id
function send(e) {
  e.preventDefault();
  let promise01 = fetch("http://localhost:3000/api/cameras/order/", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sentToServer)
  })
  .then(function(res) {
    if (res.ok) {
      return res.json()
    }
  })
  .then(function(value) {
    let orderId = value.orderId
    localStorage.setItem("orderId", orderId)
    console.log(orderId);
  })
  .then(hydratatePage())
}

orderForm.addEventListener("submit", send);

//Création d'une fonction qui reload la page avec une page de confirmation de commande à l'envoi du formulaire et des données sur le serveur
function hydratatePage(){
  const responseId = localStorage.getItem("orderId")
  console.log(responseId);
  let hydratatePage = document.getElementById('content-form')         
  let b = document.body;
           
  let newPage = document.createElement('div')
  newPage.setAttribute('class', 'container content-confirmation');
  let newRow = document.createElement('div')
  newRow.setAttribute('class', 'ctent-confirm')
  let thanks = document.createElement('h1')
  thanks.innerText = 'Merci' + ' ' + orderForm['firstname'].value + ' ' +  'pour votre confiance !'
  let contentOrderedInfo = document.createElement('div')
  let orderedInfo = document.createElement('p')
  let totalCaddy = document.getElementById('totalCaddy').innerText
  console.log(totalCaddy);
  orderedInfo.innerText = "Votre commande a bien été prise en compte. La facture d'un montant de" + ' ' + totalCaddy + ' '+ "vous sera envoyé à l'adresse mail que vous avez indiqué!"
  let numOrdered = document.createElement('p')
  numOrdered.innerText = "Votre commande n°" + ' ' + responseId + ' ' + 'sera expédiée dans les prochaines 24H'
          
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
})

getProducts();
drawTable();
showTotalCaddy()

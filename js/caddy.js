let arrayOrderId = [];
let totalPrice = [];

/**
 *
 * @param {array} products array des produits stockés dans le sessionStorage
 * @param {array} productKey array des Key du sessionStorage. Les key représentent les identifiants de chaque produit
 */
function getProducts(products, productKey) {
  for (let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i);
    let value = JSON.parse(sessionStorage.getItem(key));
    if (key == value._id) {
      products.push(value);
      productKey.push(value._id);
    }
  }
}

let arrayProducts = [];
let arrayProductsId = [];
getProducts(arrayProducts, arrayProductsId);
console.log("Tableau des produits selectionnés:");
console.log(arrayProducts);
console.log("Tableau des identifiants produits:");
console.log(arrayProductsId);

/**
 *
 * @param {objet} product objet stockant les données name, qty, price et totalPrice
 */
function drawTable(product) {
  //Crée la table caddy en fonction du nombre de produits stockés dans 'arrayProducts'
  if (arrayProducts.length > 0) {
    for (let i = 0; i < product.length; i++) {
      let table = document.getElementById("caddy");
      let $newLineProduct = document.createElement("tr");
      let $nameProd = document.createElement("td");
      let $prodQty = document.createElement("td");
      let $unitPrice = document.createElement("td");
      $unitPrice.setAttribute("class", "unitPrice");
      let $totalLine = document.createElement("td");
      $totalLine.setAttribute("class", "totalLine");
      //Création d'un boutton de supression pour chaque produit selectionné
      let $deleteCase = document.createElement("td");
      let $deleteBtn = document.createElement("button");
      $deleteBtn.setAttribute("class", "deleteBtn ");
      let deleteIcon = document.createElement("i");
      deleteIcon.setAttribute("class", "fas fa-trash-alt");

      //affichage des données dans la panier
      $nameProd.innerText = product[i].name;
      $prodQty.innerHTML = product[i].quantity;
      $unitPrice.innerText = product[i].price + "€";
      $totalLine.textContent = product[i].totalPrice + "€";
      totalPrice.push(product[i].totalPrice);

      // la fonction 'deleteProduct()' supprime le produit du sessionStorage et reload la page web.
      $deleteBtn.onclick = function deleteProduct() {
        sessionStorage.removeItem(arrayProductsId);
        window.location.reload();
      };

      table.appendChild($newLineProduct);
      $newLineProduct.appendChild($nameProd);
      $newLineProduct.appendChild($prodQty);
      $newLineProduct.appendChild($unitPrice);
      $newLineProduct.appendChild($totalLine);
      $newLineProduct.appendChild($deleteCase);
      $deleteCase.appendChild($deleteBtn);
      $deleteBtn.appendChild(deleteIcon);
    }
  } else {
    popUpEmptyCart("Votre panier est vide ! :(");
  }
}

/**
 * showTotalCaddy => affiche le prix total du panier
 */
function showTotalCaddy() {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = totalPrice.reduce(reducer);
  let totalProductsPrice = document.getElementById("totalPrice");
  let $total = document.createElement("th");
  $total.setAttribute("id", "totalCaddy");
  $total.innerHTML = total + "€";
  totalProductsPrice.appendChild($total);
  
  let number = 3
  console.log('test de la fonction avec un calcul simple:' + ' ' + number+number);

  console.log('prix total du panier:'+ ' ' + total);
}

/**
 * 
 * @param {objet} sentToServer => données du formulaire
 * @returns renvoie 'true' si le code Regex est respecté/ renvoi 'false' et un message d'erreur si ce n'est pas le cas
 */
function validNames(sentToServer) {
  if (
    /^[A-Za-z$-]{3,20}$/.exec(sentToServer.contact.lastName) &&
    /^[A-Za-zà-ÿ\s$-]{3,20}$/.exec(sentToServer.contact.firstName)
  ) {
    console.log("les champs sont remplis correctement");
    return true;
  } else {
    console.log("Un problème est survenu dans l'un des champs du formulaire !");
    return false;
  }
}
/**
 * 
 * @param {objet} sentToServer => données du formulaire
 * @returns renvoie 'true' si le code Regex est respecté/ renvoi 'false' et un message d'erreur si ce n'est pas le cas
 */
function validAddress(sentToServer) {
  if (
    /^[0-9]{1,4}\s[A-zà-ÿ-\s]{1,}/.exec(sentToServer.contact.address) &&
    /^[A-Za-zà-ÿ\-]|[0-9]{5}$/.exec(sentToServer.contact.city)
  ) {
    console.log("les champs sont remplis correctement");
    return true;
  } else {
    console.log("Un problème est survenu dans l'un des champs du formulaire !");
    return false;
  }
}
/**
 * 
 * @param {objet} sentToServer => => données du formulaire
 * @returns renvoie 'true' si le code Regex est respecté/ renvoi 'false' et un message d'erreur si ce n'est pas le cas
 */
function validEmail(sentToServer) {
  if (/^([\w\.\-_]+)?\w+@[a-z]+(\.\w+){1,}$/.exec(sentToServer.contact.email)) {
    console.log("les champs sont remplis correctement");
    return true;
  } else {
    console.log("Un problème est survenu dans l'un des champs du formulaire !");
    return false;
  }
}



/**
 * Récupération des valeurs du formulaire pour les mettre dans le local storage afin de les envoyer au serveue
 */ 
let BtnForm = document.getElementById("btnForm");
let orderForm = document.getElementById("order-form");

BtnForm.addEventListener("click", (e) => {
  e.preventDefault();
  // Création de l'objet à envoyer au serveur
   let sentToServer = {
     contact: {
       firstName: orderForm["firstname"].value,
       lastName: orderForm["lastname"].value,
       address: orderForm["adress"].value,
       city: orderForm["city"].value,
       email: orderForm["email"].value,
     },
     products: arrayProductsId,
   };

   // Si les données sont conformes au code Regex, les données sont stockées dans le localStorage sous la clé 'ValidationCaddy'
   if (validNames(sentToServer) && validAddress(sentToServer) && validEmail(sentToServer) == true) {
     localStorage.setItem("ValidationCaddy", JSON.stringify(sentToServer));
     send(sentToServer);
    } else {
     popUpFormValues("Veuillez remplir les champs du formulaire correctement");
   }
});

/**
 * 
 * @param {objet} sentToServer Envoi des données vers le serveur par le biais d'une requête POST 
 */
function send(sentToServer) {
  const options = {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sentToServer)
  }
  const promise01 = async() => { 
    try {
      const res = await fetch("http://localhost:3000/api/cameras/order/", options)
      if(!res.ok){
        throw new Error(res.status)
      }
      const data = await res.json();
      let orderId = data.orderId
      localStorage.setItem("orderId", orderId)
      console.log('Réponse du serveur: ' + orderId);
      hydratatePage()
    } catch (error) {
      console.log(error);
    }
  }
  promise01()
}



 /**
   * Fonction qui reload la page et renvoi un nouveau contenu confirmation de commande avec un numéro 'orderId'
   */
  function hydratatePage() {
    console.log("Entrée dans la fonction hydratePage");
    const responseId = localStorage.getItem("orderId");
    console.log('Afficher:' + ' ' + responseId);
    let validCaddy = JSON.parse(localStorage.getItem("ValidationCaddy"));
    console.log(validCaddy.contact.firstName);
    let hydratatePage = document.getElementById("content-form");
    let totalCaddy = document.getElementById("totalCaddy").innerText;
    let b = document.body;

    let newPage = document.createElement("div");
    let newRow = document.createElement("div");
    let thanks = document.createElement("h1");
    let orderedInfo = document.createElement("p");
    let numOrdered = document.createElement("p");
    let contentOrderedInfo = document.createElement("div");
    newPage.setAttribute("class", "container content-confirmation");
    newRow.setAttribute("class", "ctent-confirm");

    thanks.innerText =
      "Merci" +
      " " +
      validCaddy.contact.firstName +
      " " +
      "pour votre confiance !";
    orderedInfo.innerText =
      "Votre commande a bien été prise en compte. La facture d'un montant de" +
      " " +
      totalCaddy +
      " " +
      "vous sera envoyé à l'adresse mail que vous avez indiqué!";
    numOrdered.innerText =
      "Votre commande n°" +
      " " +
      responseId +
      " " +
      "sera expédiée dans les prochaines 24H";

    let btnReturn = document.createElement("button");
    btnReturn.setAttribute("class", "btn-card btnReturn btn-secondary");
    btnReturn.innerText = "Retour sur la page d'accueil";
    btnReturn.addEventListener("click", () => {
      location.href = "index.html";
    });

    contentOrderedInfo.appendChild(orderedInfo);
    contentOrderedInfo.appendChild(numOrdered);
    contentOrderedInfo.appendChild(btnReturn);
    newPage.appendChild(newRow);
    newRow.appendChild(thanks);
    newRow.appendChild(contentOrderedInfo);

    b.replaceChild(newPage, hydratatePage);
  }


  /**
   * 
   * @param {string} emptyCart renvoie une pop-up contenant un message d'erreur si le panier est vide
   */
function popUpEmptyCart(emptyCart) {
  let containerPopUp = document.querySelector(".caddy-content-form");
  let popUpEmptyCart = document.createElement("div");
  popUpEmptyCart.setAttribute("class", "popUpEmptyCart");
  let txtEmptyCart = document.createElement("div");
  txtEmptyCart.setAttribute("class", "txtEmptyCart");
  txtEmptyCart.textContent = emptyCart;
  let btnpopUp = document.createElement("button");
  btnpopUp.setAttribute("class", "btnPopUp");
  btnpopUp.innerText = "Selectionner mes produits";
  containerPopUp.appendChild(popUpEmptyCart);
  popUpEmptyCart.appendChild(txtEmptyCart);
  popUpEmptyCart.appendChild(btnpopUp);

  btnpopUp.addEventListener("click", () => {
    let productSheet = document.querySelector(".caddy-content-form");
    let popUp = document.querySelector(".popUpEmptyCart");
    productSheet.removeChild(popUp);
    location.href = "index.html";
  });
}


/**
 * 
 * @param {string} errorMessage renvoie une pop-up contenant un message d'erreur si le formulaire est mal rempli
 */
function popUpFormValues(errorMessage) {
   let containerPopUp = document.querySelector(".caddy-content-form");
   let popUpFormValues = document.createElement("div");
   popUpFormValues.setAttribute("class", "popUpFormValues");
   let txtFormValues = document.createElement("div");
   txtFormValues.setAttribute("class", "txtFormValues");
   txtFormValues.textContent = errorMessage;
   let btnpopUp1 = document.createElement("button");
   btnpopUp1.setAttribute("class", "btnPopUp1");
   containerPopUp.appendChild(popUpFormValues);
   popUpFormValues.appendChild(txtFormValues);
   popUpFormValues.appendChild(btnpopUp1);


   btnpopUp1.addEventListener("click", () => {
     let productSheet = document.querySelector(".caddy-content-form");
     let popUp = document.querySelector(".popUpFormValues");
     productSheet.removeChild(popUp);
   });
}

drawTable(arrayProducts);
showTotalCaddy();

/**
 * Effectue une requête GET avec fetch sur le serveur pour récupérer tous les articles disponibles
 */
function getArticles(){
fetch("http://localhost:3000/api/cameras")
.then(res => {
    console.log('Réponse du serveur' + ' ' + res.status);
    if(res.ok){
        return res.json()
    }
})
.then(data => {
    
    //affichage dans la console le tableau des produits récupérés sur le serveur
    console.log("Données du serveur:");
    console.log(data);

    // Création d'une boucle for afin d'afficher les produits sur la page d'acceuil.
    for(let i = 0; i < data.length; i++){

        //Mise en page des produits    
        let cardsGroup = document.querySelector('.card-group');
        let $eachCard = document.createElement('div');
        $eachCard.classList.add('card','shadow');
        cardsGroup.appendChild($eachCard);

        let $imgProduct = document.createElement('img');
        $imgProduct.setAttribute('class', 'card-img-top img-fluid');
        $imgProduct.src = data[i]['imageUrl'];
        $eachCard.appendChild($imgProduct);

        let $bodyCard = document.createElement('div');
        $bodyCard.classList.add('card-body');
        
        let $nameProduct = document.createElement('h4');
        $nameProduct.innerText = data[i]['name'];
        let $shortDescriptProduct = document.createElement('p');
        $shortDescriptProduct.innerText = data[i]['description'];
        let $priceProduct = document.createElement('p');
        $priceProduct.innerText = data[i]['price']/100 + " € ";

        let $btnCards = document.createElement('a');
        $btnCards.classList.add('btn-card', 'btn', 'btn-secondary', 'stretched-link');

        //Introduction de l'ID du produit dans l'URL de la fiche-produit. 
        $btnCards.setAttribute('id','productLink');
        $btnCards.href = "/productsheet.html?" + data[i]._id;
        $btnCards.innerText = 'Découvrir';

        $eachCard.appendChild($bodyCard);
        $bodyCard.appendChild($nameProduct);
        $bodyCard.appendChild($shortDescriptProduct);
        $bodyCard.appendChild($priceProduct);
        $bodyCard.appendChild($btnCards);
    }; 
})
.catch(error => popUpError('Une erreur est survenue sur le serveur ! veuillez réessayer ultérieurement!'))
}

/**
 * 
 * @param {string} messageError Affiche une popUp contenant un message d'erreur
 */
function popUpError(messageError){
    console.log(messageError);
    let containerProducts = document.querySelector('#products-content')
    let popUpErrServeur = document.createElement('div');
    popUpErrServeur.setAttribute('class','popUpErrServeur')
    let textError = document.createElement('div')
    textError.setAttribute('class', 'textError')
    textError.textContent = messageError;
    let btnpopUp = document.createElement('button')  
    btnpopUp.setAttribute('class', 'btnPopUp')
    containerProducts.appendChild(popUpErrServeur)
    popUpErrServeur.appendChild(textError)
    popUpErrServeur.appendChild(btnpopUp)
    btnpopUp.addEventListener('click', ()=> {
        let productsPage = document.querySelector('#products-content')
        let popUp = document.querySelector('.popUpErrServeur')
        productsPage.removeChild(popUp)
})
}

getArticles();
// //Création de contenu HTML 
// let titleContentProducts = document.querySelector('.title-products-content');
// titleContentProducts.textContent = 'La selection de nos experts !';
function getArticles(){
fetch("https://ab-p5-api.herokuapp.com/api/cameras")
.then(res => res.json())
.then(data => {
    const dataProducts = data.length;

    for(let i = 0; i < dataProducts; i++){
    
        console.log(data[i])
        console.log(data[i]['_id'])
        console.log(data[i]['name']);
        console.log(data[i]['description']);
        console.log(data[i]['price']);
        console.log(data[i]['imageUrl']);

        //Mise en page des produits    
        let cardsGroup = document.querySelector('.card-group');
        let $eachCard = document.createElement('div');
        $eachCard.classList.add('card','shadow');
        cardsGroup.appendChild($eachCard);

        let $imgProduct = document.createElement('img');
        $imgProduct.classList.add('card-img-top');
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
        $btnCards.setAttribute('id','productLink');
        $btnCards.href = "/frontend/productsheet.html?" + data[i]._id;
        $btnCards.innerText = 'Découvrir';

        $eachCard.appendChild($bodyCard);
        $bodyCard.appendChild($nameProduct);
        $bodyCard.appendChild($shortDescriptProduct);
        $bodyCard.appendChild($priceProduct);
        $bodyCard.appendChild($btnCards);
    };

 
    
});
}

getArticles()
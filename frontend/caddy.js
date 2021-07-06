// Récupération des produits du SessionStorage et push dans ArrayProducts
let key = '';
let valeur = '';
let arrayProducts = []

for (let i = 0; i < sessionStorage.length; i++){
    key = sessionStorage.key(i);
    valeur = JSON.parse(sessionStorage.getItem(key));
    arrayProducts.push(valeur);
// Si le tableau des produits en contient, ils s'afficheront dans le panier: Nom, qte, prix unitaire et btn suppression. 
    if (arrayProducts.length) {
        let panier = document.getElementById('panier');
        let $newArticle = document.createElement('tr');
        $newArticle.setAttribute('class', 'linesProducts');
        let $productName = document.createElement('td');
        $productName.setAttribute('class','productName');
        $productName.innerHTML = valeur.name;
        let $Qte = document.createElement('td');
        $Qte.setAttribute('class', 'qteProduct');
        let $inputQte = document.createElement('input')
        $inputQte.setAttribute('type', 'number')
        $inputQte.setAttribute('id', 'inputQty')
        $inputQte.setAttribute('style', 'width:50px')
        $inputQte.value = '1';
        $Qte.appendChild($inputQte);
        let $priceProduct = document.createElement('td');
        $priceProduct.setAttribute('id', 'priceProduct');
        $priceProduct.innerHTML = (valeur.price)/100 + '€';
        $totalSameProduct = document.createElement('td');
        $totalSameProduct.setAttribute('id', 'totalSameProduct');

        //afficher le prix total par ligne 
        let $deleteProduct = document.createElement('td');
        $deleteProduct.setAttribute('class', 'text-center');
        let $deleteBtn = document.createElement('button');
        $deleteBtn.setAttribute('class','btn-primary');
        $deleteBtn.setAttribute('onclick', 'deleteProduct')
        $deleteBtn.setAttribute('id', valeur._id);
        $deleteBtn.innerHTML = 'X';            
        panier.appendChild($newArticle);
        $newArticle.appendChild($productName);
        $newArticle.appendChild($Qte);
        $newArticle.appendChild($priceProduct);
        $newArticle.appendChild($totalSameProduct);
        $newArticle.appendChild($deleteProduct);
        $deleteProduct.appendChild($deleteBtn);

// Supprime un article choisi dans le panier ET dans le sessionStorage et refresh le panier
        $deleteBtn.onclick = function deleteProduct(){
        sessionStorage.removeItem(key);
        window.location.reload(); 
        }
    } else {
        alert("La Panier est vide !");
    }
}

// Quantité des produits 
// qty * arrayProducts[i].price
// Afficher le prix total du panier
let totalPrice = [];
for(let i = 0; i < arrayProducts.length; i++){
    let priceAllProducts = arrayProducts[i].price;
    totalPrice.push(priceAllProducts)
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const total = totalPrice.reduce(reducer);
console.log(total)

let totalProductsPrice = document.getElementById('totalPrice');
let $total = document.createElement('th');
$total.innerHTML = total/100 + ' € ';
totalProductsPrice.appendChild($total);


//Récupérer les valeurs du formulaire 'order-form'.

let BtnForm = document.getElementById('btnForm');
BtnForm.setAttribute('onclick', 'pageValidation');
let orderForm = document.getElementById('order-form');
//Crée un objet "order" à la soumission du formulaire

BtnForm.onclick = function pageValidation() {
    const order = {
     contactForm : {
        lastName: orderForm['lastname'].value,
        firstName: orderForm['firstname'].value,
        adress: orderForm['adress'].value,
        city: orderForm['city'].value,
        email: orderForm['email'].value,
    },
    products : arrayProducts,
};
};

console.log(totalPrice)

function getValueInput(){
    let input = Number(document.getElementById('inputQty').value);
    let price = document.getElementById('priceProduct').value;
    console.log(input)
    console.log(price)
}
getValueInput()

// TEST FONCTION 
// let number = 2;
// function TestFunction(number){
//     alert(number * number)
// } 
// *** ne pas oublier de l'appeler pour qu'elle fonctionne ***
// TestFunction(number)
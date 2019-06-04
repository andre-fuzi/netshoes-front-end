import CacheSelector from './__cache-selectors.js';

const El = CacheSelector;

const Methods = {

    init() {
        Methods.buildShelfs();
    },

    buildShelfs() {
        const productsList = Methods._productList("https://akf-netshoes-front-end.herokuapp.com/api/products", "FETCH_PRODUCT_DONE");

        document.addEventListener("FETCH_PRODUCT_DONE", (ev)=> {
            console.log(productsList);
            Methods._createShelfProduct(productsList,"ns-shelf-container__list")
        });

    },

    _createShelfProduct(list, className) {
        const container = Methods._createElementWithClass('ul', className),
             itemClass = className.slice(0, className.indexOf(" ")) + "__item";

        El.shelf.container.insertAdjacentElement('afterbegin', container);

        list.map(el => {
            
            const item = Methods._createElementWithClass('li', itemClass);

            (!el.imageUrl) ? el.loader = ' ns-shelf__img-loader' : el.loader = ''
            item.innerHTML =    `<a class="ns-shelf__link${el.loader}" href="#"><img class="ns-shelf__img" src="./dist/assets/images/${el.image}" alt="${el.name}"></a>
                                <div class="ns-shelf__actions">
                                    <div class="ns-shelf__actions--size">
                                        
                                    </div>
                                    <div class="ns-shelf__actions--quant">
                                        <button class="ns-shelf__qty--minus" data-qty-selector="-">-</button>
                                        <input class="ns-shelf__qty" type="text" value="1" min="1">
                                        <button class="ns-shelf__qty--plus" data-qty-selector="+">+</button>
                                    </div>
                                </div>
                                <div class="ns-shelf__content">
                                    <h3 class="ns-shelf__title">${el.title} ${el.description}</h3>
                                    <p class="ns-shelf__price-best">R$<span>${Math.floor(el.price)}</span>${el.price.toFixed(2).toString().replace(/\d+\./g,',')}</p>
                                    ${(el.installments) ? `<p class="ns-shelf__price-installments">Ou ${el.installments}x de R$ ${(el.price/el.installments).toFixed(2).replace(/\./gi,',')}</p>` : ''}
                                </div>
                                `
            container.insertAdjacentElement('beforeend',item);
        });
    },

    _productList(url, event) {
        const ProductList = new Array();
        const _url = url   
        const _event = event     

        fetch(_url)
            .then((response) => response.json())
            .then((result) => {
                ProductList.push(...result);
                Methods._sendCustomEvent(_event);
            })
            .catch(err => console.log(err));

        return ProductList;
    },

    _sendCustomEvent(eventName) {
        const newEvent = new CustomEvent(eventName);
        document.dispatchEvent(newEvent);
    },

    _createElementWithClass(tag, ClassNames) {
        const element = document.createElement(tag);
        (ClassNames.split(" ")) ? ClassNames.split(" ").map(el => element.classList.add(el)) : element.classList.add(ClassNames);
        return element;
    }
}

export default {
    init:  Methods.init,
}

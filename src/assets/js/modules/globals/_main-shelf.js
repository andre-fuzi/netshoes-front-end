import CacheSelector from './__cache-selectors.js';

const El = CacheSelector;

const Methods = {

    init() {
        Methods.buildShelfs();
    },

    buildShelfs() {
        const productsList = Methods._productList("https://raw.githubusercontent.com/netshoes/front-end-recruitment/master/public/data/products.json", "FETCH_PRODUCT_DONE");

        document.addEventListener("FETCH_PRODUCT_DONE", (ev)=> {
            console.log(productsList);

        });

    },

    _createShelfProduct(list, className) {
        const container = Methods._createElementWithClass('ul', className),
             itemClass = className.slice(0, className.indexOf(" ")) + "__item";

        list.map(el => {
            
            const item = Methods._createElementWithClass('li', itemClass);

            (!el.imageUrl) ? el.loader = ' ns-shelf__img-loader' : el.loader = ''
            item.innerHTML =    `<a class="ns-shelf__link${el.loader}" href="#"><img class="ns-shelf__img" src="${el.imageUrl}" alt="${el.name}"></a>
                                <div class="ns-shelf__content">
                                    <h3 class="ns-shelf__title">${el.name}</h3>
                                    <span class="ns-shelf__price-old">De: R$ ${el.priceFrom.toFixed(2)}</span>
                                    <p class="ns-shelf__price-best">Por: <span>R$ ${el.price.toFixed(2)}</span></p>
                                    <p class="ns-shelf__price-installments">Ou até 10x de R$ ${(el.price/10).toFixed(2)}</p>
                                </div>
                                <div class="ns-shelf__actions">
                                    <input class="ns-shelf__installments" type="number" value="1" min="1" max="10">
                                    <a class="ns-shelf__cep" href="#">Consultar CEP</a>
                                </div>`
            container.insertAdjacentElement('beforeend',item);
        });

        return container;
    },

    _productList(url, event) {
        const ProductList = new Array();
        const _url = url   
        const _event = event     

        fetch(_url)
            .then((response) => response.json())
            .then((result) => {
                ProductList.push(...result.products);
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

import CacheSelector from './__cache-selectors.js';

const El = CacheSelector.shelf;

const Methods = {

    init() {
        Methods.buildShelfs();
    },

    buildShelfs() {
        const productsList = Methods._productList("https://akf-netshoes-front-end.herokuapp.com/api/products", "FETCH_PRODUCTSLIST_DONE");

        document.addEventListener("FETCH_PRODUCTSLIST_DONE", (ev) => {
            console.log(productsList);
            Methods._createShelfProducts(productsList, "ns-shelf__list");

            Methods._selectSize();
            Methods._addQty();
            Methods._removeQty();
            Methods._buy();
        });

    },

    _createShelfProducts(list, className) {
        const container = netshoes.createElementWithClass('ul', className)
        El.container.insertAdjacentElement('afterbegin', container);

        list.map(el => {

            const item = netshoes.createElementWithClass('li', "ns-shelf__item");

            item.innerHTML = `<div class="ns-shelf__item--content">
                                    ${(el.isFreeShipping) ? `<span class="ns-shelf__item--flag">Frete Grátis</span>` : ""}
                                    <a class="ns-shelf__link" href=""><img class="ns-shelf__img" src="./dist/assets/images/${el.image}" alt="${el.name}"></a>
                                    <div class="ns-shelf__item--actions" data-sku="${el.sku}">
                                        <div class="ns-shelf__size">
                                            ${el.availableSizes.map(el => `<a class="ns-shelf__size--btn" data-size="${el}">${el}</a>`).join("")}
                                        </div>
                                        <div class="ns-shelf__qty">
                                            <button class="ns-shelf__qty--operator is--minus" data-qty-operator="-">-</button>
                                            <input class="ns-shelf__qty--value" type="text" value="1">
                                            <button class="ns-shelf__qty--operator is--plus" data-qty-operator="+">+</button>
                                        </div>
                                        <button class="ns-shelf__buy-btn">COMPRAR</button>
                                    </div>
                                </div>
                                <div class="ns-shelf__item--info">
                                    <h3 class="ns-shelf__title">${el.title} ${el.description}</h3>
                                    <p class="ns-shelf__price-best">R$ <span>${Math.floor(el.price)}</span>${el.price.toFixed(2).toString().replace(/\d+\./g, ',')}</p>
                                    ${(el.installments) ? `<p class="ns-shelf__price-installments">Ou ${el.installments}x R$ ${(el.price / el.installments).toFixed(2).replace(/\./gi, ',')}</p>` : ''}
                                </div>
                                `
            container.insertAdjacentElement('beforeend', item);
        });

        netshoes.stopAjaxLoader();
    },

    _productList(url, event) {
        netshoes.startAjaxLoader();
        const ProductList = new Array();
        const _url = url
        const _event = event

        fetch(_url)
            .then((response) => response.json())
            .then((result) => {
                ProductList.push(...result);
                netshoes.sendCustomEvent(_event);
            })
            .catch(err => console.log(err));

        return ProductList;
    },

    _selectSize() {
        const sizeBtns = document.querySelectorAll('.ns-shelf__size--btn');
        [...sizeBtns].map((el) => {
            el.addEventListener('click', (ev) => {
                [...ev.currentTarget.parentElement.children].map((el) => el.classList.remove('is--active'));
                ev.currentTarget.classList.add('is--active');
            })
        })
    },

    _addQty() {
        const qtyPlusBtn = document.querySelectorAll('.ns-shelf__qty--operator.is--plus');
        [...qtyPlusBtn].map((el) => {
            el.addEventListener('click', (ev) => {
                const newValue = parseInt(ev.currentTarget.previousElementSibling.value) + 1;
                ev.currentTarget.previousElementSibling.value = newValue;
            })
        });
    },

    _removeQty() {
        const qtyMinusBtn = document.querySelectorAll('.ns-shelf__qty--operator.is--minus');
        [...qtyMinusBtn].map((el) => {
            el.addEventListener('click', (ev) => {
                const value = parseInt(ev.currentTarget.nextElementSibling.value);
                (value > 1) ? ev.currentTarget.nextElementSibling.value = value - 1 : false;
            })
        });
    },

    _buy() {
        const buyBtn = document.querySelectorAll('.ns-shelf__buy-btn');
        [...buyBtn].map((el) => {
            el.addEventListener('click', (ev) => {
                const product = {};
                const parent = ev.currentTarget.parentElement;

                product.sku = parent.dataset.sku;
                product.qty = ev.currentTarget.previousElementSibling.querySelector('input').value;
                const sizeValidator = [...parent.firstElementChild.children].find((el) => el.classList.contains('is--active'));

                (sizeValidator) ? product.size = sizeValidator.dataset.size : Methods._noteSelectSize();

                (product.size) ? netshoes.addToCart(product) : false;
            })
        });
    },

    _noteSelectSize() {
        const warnning = netshoes.createElementWithClass('div', 'ns-shelf__warnning');
        warnning.innerHTML = `<h4>Tamanho não selecionado</h4><p>Por favor, selecionar um tamanho para adicionar o produto à sacola.</p>`

        El.container.insertAdjacentElement('beforeend', warnning);

        setTimeout(function () {
            warnning.remove()
        }, 2500);
    }
}

export default {
    init: Methods.init,
}

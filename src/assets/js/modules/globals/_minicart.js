import El from './__cache-selectors'

const Methods = {

    init() {
        netshoes.openCart = Methods._open;
        netshoes.closeCart = Methods._close;
        netshoes.addToCart = Methods._addToCart;
        Methods._loadStorageData();
        Methods._overlayClick();
        Methods._btnCart();
    },

    _addToCart(product) {
        netshoes.startAjaxLoader();
        const _url = 'https://akf-netshoes-front-end.herokuapp.com/api/product/';
        const _sku = product.sku;
        fetch(_url + _sku)
            .then((res) => res.json())
            .then((res) => {
                res.qty = product.qty;
                res.size = product.size;

                const item = [...El.minicart.list.children].find((el) => el.dataset.sku == product.sku && el.dataset.size == product.size);
                (!item) ? Methods._createItem(res) : Methods._updateItem(item, res.qty); 

                Methods._totalItemsUpdate();
                Methods._totalValueUpdate();
                Methods._storageCartData();
                
                netshoes.stopAjaxLoader();
                netshoes.openCart();
            })
    },

    _createItem(product) {
        const item = netshoes.createElementWithClass('li','ns-minicart__item');
        item.dataset.installments = product.installments;
        item.dataset.sku = product.sku;
        item.dataset.size = product.size;
        item.dataset.qty = product.qty;
        item.dataset.price = product.price;

        item.innerHTML = `  <img class="ns-minicart__item--img" src="./dist/assets/images/${product.image}" alt="${product.name}">
                            <div class="ns-minicart__item--info">
                                <h3 class="ns-minicart__item--title">${product.title} ${product.description}</h3>
                                <p class="ns-minicart__item--details">${product.size} | ${product.style}</p>
                                <p class="ns-minicart__item--qty">Quantidade: ${product.qty}</p>
                            </div>
                            <p class="ns-minicart__item--value">R$ ${product.price.toFixed(2).replace(/\./gi, ',')}</p>
                            <span class="ns-minicart__item--delete">X</span>`

        El.minicart.list.insertAdjacentElement('beforeend', item);

        Methods._removeFromCart();
    },

    _updateItem(item, qty) {
        item.dataset.qty = qty;
        const value = [...item.children[1].children].find((el) => el.classList.contains('ns-minicart__item--qty'));
        value.textContent = value.textContent.replace(/\d+/g, qty);
    },

    _removeFromCart() {
        const btnDelete = document.querySelectorAll('.ns-minicart__item--delete');
        [...btnDelete].map((el) => {
            el.addEventListener('click', (ev) => {
                const item = ev.currentTarget;
                item.parentElement.classList.add('is--deleted');
                setTimeout(function() {
                    item.parentElement.remove();
                    Methods._totalItemsUpdate();
                    Methods._totalValueUpdate();
                    Methods._storageCartData();
                },1000);
            })  
        })
    },

    _totalItemsUpdate() {
        El.minicart.totalItems.textContent = El.minicart.list.childElementCount;
    },

    _totalValueUpdate() {
        const currentValue = [...El.minicart.list.children].reduce((value, el, id) => {
            let itemValue = el.dataset.price * el.dataset.qty;
            return value += itemValue
        },0);

        El.minicart.subtotal.textContent = "R$ " + currentValue.toFixed(2);
    },

    _storageCartData() {
        const currentList = [...El.minicart.list.children].reduce((value, el, id, list) => {
            let item = `${el.dataset.sku}/${el.dataset.qty}/${el.dataset.size}|`;
            if( id+1 == list.length) {
                item = item.replace(/\|/g,"");
                return value += item;
            }
            return value += item;
        },'');

        window.localStorage.setItem('cartDataStorage',currentList);
    },

    _loadStorageData() {
        const storage = window.localStorage.getItem('cartDataStorage');

        if (storage) {
            const list = storage.split('|');
            list.map((el) => {
                const product = {};
                const item = el.split('/');
                product.sku = item[0];
                product.qty = item[1];
                product.size = item[2];
                
                Methods._addToCart(product);
                Methods._close();
            })
        } 
    },

    _overlayClick() {
        El.minicart.overlay.addEventListener('click', (ev) => {
            ev.stopPropagation();
            Methods._close();
        });

        El.minicart.container.addEventListener('click', (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
        });
    },

    _btnCart() {
        El.minicart.btn.addEventListener('click', Methods._open);
        El.minicart.btnClose.addEventListener('click', Methods._close);
    },

    _open() {
        El.minicart.overlay.classList.add('is--active');
    },

    _close() {
        El.minicart.overlay.classList.remove('is--active');
    }

}

export default {
    init: Methods.init,
}
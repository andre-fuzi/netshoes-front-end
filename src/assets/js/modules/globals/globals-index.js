import GlobalMethods from './_globals-methods.js';
import Minicart from './_minicart.js';

const init = () => {
    GlobalMethods.init();
    Minicart.init();
}

export default {
    init: init,
}
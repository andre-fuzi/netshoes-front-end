import El from './__cache-selectors';

const Methods = {

    init() {
        netshoes.startAjaxLoader = Methods.startAjaxLoader;
        netshoes.stopAjaxLoader = Methods.stopAjaxLoader;
        netshoes.createElementWithClass = Methods.createElementWithClass;
        netshoes.sendCustomEvent = Methods.sendCustomEvent;
    },

    startAjaxLoader() {
        El.ajaxLoader.classList.add('is--active');
    },

    stopAjaxLoader() {
        El.ajaxLoader.classList.remove('is--active');
    },

    createElementWithClass(tag, ClassNames) {
        const element = document.createElement(tag);
        (ClassNames.split(" ")) ? ClassNames.split(" ").map(el => element.classList.add(el)) : element.classList.add(ClassNames);
        return element;
    },

    sendCustomEvent(eventName) {
        const newEvent = new CustomEvent(eventName);
        document.dispatchEvent(newEvent);
    },

}

export default {
    init: Methods.init,
}
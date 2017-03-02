
    var doc = document.currentScript.ownerDocument;
    Vue.component('page-hero-item', {
        template: doc.querySelector("template").innerHTML,
    });

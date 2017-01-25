{
    var doc = document.currentScript.ownerDocument;
    Vue.component('list', {
        template: doc.querySelector("template").innerHTML
    })
}
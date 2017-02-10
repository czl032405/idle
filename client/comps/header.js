{
    var doc = document.currentScript.ownerDocument;
    Vue.component('common-header', {
        template: doc.querySelector("template").innerHTML
    })
}
{
    var doc = document.currentScript.ownerDocument;
    Vue.component('warning', {
        template: doc.querySelector("template").innerHTML,
        props:['msg'],
    })
}
var PopMessage = function (message) {
    if(!message)
    return;
    var messageDiv = document.createElement("span");
    messageDiv.classList.add("PopMessage");
    message.length > 20 && messageDiv.classList.add("small");
    messageDiv.innerHTML = "<span>" + message + "</span>";
    document.body.appendChild(messageDiv);
    // setTimeout(function(){
    //     messageDiv.style.marginLeft = messageDiv.offsetWidth/(-2)+"px";
    //     messageDiv.style.marginLeft = messageDiv.offsetWidth/(-2)+"px";
    // },50);
    setTimeout(function () {
        messageDiv.classList.add("removeing");
        setTimeout(function () {
            messageDiv.parentNode.removeChild(messageDiv);
        }, 500);
    }, 2000);
};

export default  PopMessage;
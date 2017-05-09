const wait = async function(time){
    return new Promise(resolve=>{
        setTimeout(function(){
            resolve();
        },time)
    })
}

export default {
    wait
}
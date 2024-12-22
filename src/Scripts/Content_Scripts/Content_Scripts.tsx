import "./Content_Script.css"

chrome.runtime.onMessage.addListener(function(message){
    if(message.inject){
        injectIntoLinks()
    }
})

function injectIntoLinks(){
    const allLinks = document.querySelectorAll("a")
    allLinks.forEach((link)=>{
        if(link.target !== "_blank"){
            link.target= "_blank"
        }
    })
}
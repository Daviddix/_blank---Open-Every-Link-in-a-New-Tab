import "./Content_Script.css"

console.log("hello from content script")

chrome.runtime.onMessage.addListener(function(message){
    if(message.inject){
        console.log("message gotten")
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

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// const root = document.createElement("div");
// root.id = "crx-root";
// document.body.appendChild(root);

// ReactDOM.createRoot(root).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
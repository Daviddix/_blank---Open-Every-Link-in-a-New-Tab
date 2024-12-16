chrome.runtime.onInstalled.addListener(async ()=>{
      await enableSidePanel()
})
  
async function enableSidePanel(){
      chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error))
}

console.log("gg")
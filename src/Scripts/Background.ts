// chrome.runtime.onInstalled.addListener(async ()=>{
//       await enableSidePanel()
// })
  
// async function enableSidePanel(){
//       chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error) => console.error(error))
// }

chrome.tabs.onActivated.addListener(async (activeInfo) => {
      console.log("i just navigated")
      await chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            if(url){
            console.log(url)
            checkIfCurrentPageIsAmongAddedSites(url, activeInfo.tabId)
            }
        })
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
      console.log(tab.url)
      if(tab.url){
            checkIfCurrentPageIsAmongAddedSites(tab.url, tabId)
      }
})


async function checkIfCurrentPageIsAmongAddedSites(url : string, currentTabId : number){
      const splitUrl = url.split("/")[2]
      const allSites = await getAllSitesFromStorage()
      if (allSites.length == 0){
            return
      }else{
            allSites.forEach((site : {name : string, id : number})=>{
                  if(site.name.includes(splitUrl)){
                        chrome.tabs.sendMessage(currentTabId , {
                              inject : true
                  })}
            })
      }
}

async function getAllSitesFromStorage() : Promise<[]>{
      const sites = await chrome.storage.local.get("sitesInStorage")

      const sitesValues = await sites.sitesInStorage || []

      return sitesValues
}

console.log("gg")
type AddedSite = {
      name : string;
      id : number;
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
      chrome.tabs.query({active: true, lastFocusedWindow: true}, async(tabs) => {
            let url = tabs[0].url;
            if(url){
                  if(await useOnAllSites()){
                        runOnEverySite(activeInfo.tabId)
                  }else{
                        checkIfCurrentPageIsAmongAddedSites(url, activeInfo.tabId)
                  }
            }
        })
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab)=>{
      if(tab.url){
            if(await useOnAllSites()){
                  runOnEverySite(tabId)
            }else{
                  await checkIfCurrentPageIsAmongAddedSites(tab.url, tabId)
            }
      }
})

async function checkIfCurrentPageIsAmongAddedSites(url : string, currentTabId : number){
      const splitUrl = url.split("/")[2]
      const allSites = await getAllSitesFromStorage()
      if (allSites.length == 0){
            return
      }else{
            allSites.forEach((site : AddedSite)=>{
                  if(splitUrl.includes(site.name)){
                        chrome.tabs.sendMessage(currentTabId , {
                              inject : true,
                              runOnAllSites : false
                  })
                  return
            }

      })}
}

function runOnEverySite(currentTabId : number){
      chrome.tabs.sendMessage(currentTabId , {
            inject : true,
            runOnAllSites : true
      })
}

async function getAllSitesFromStorage() : Promise<AddedSite[]>{
      const sites = await chrome.storage.local.get("sitesInStorage")

      const sitesValues = await sites.sitesInStorage || []

      return sitesValues
}

async function useOnAllSites() : Promise<boolean>{
      const value = await chrome.storage.local.get("UseOnAllSitesInStorage")

      const UseOnAllSitesInStorageValue = await value.UseOnAllSitesInStorage || false

      return UseOnAllSitesInStorageValue
}

export {}
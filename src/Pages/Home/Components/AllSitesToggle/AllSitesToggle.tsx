import { useLayoutEffect, useState } from "react"
import "./AllSitesToggle.css"

type PropTypes = {
  useOnAllSites : boolean;
  setUseOnAllSites :  React.Dispatch<React.SetStateAction<boolean>>
}


function AllSitesToggle({useOnAllSites, setUseOnAllSites} : PropTypes) {

  async function updateUseOnAllSitesValue(newVal : boolean){
    setUseOnAllSites(newVal)
    await chrome.storage.local.set({UseOnAllSitesInStorage : newVal})
  }

  return (
    <div className="all-sites">
          <div className="all-sites-inner">
          <input 
          checked={useOnAllSites}
          type="checkbox" 
          onChange={(e)=>{
            updateUseOnAllSitesValue(e.target.checked)
          }}
          name="all"
          />

          <p id="all">Use on all sites</p>
          </div>
    </div>
  )
}

export default AllSitesToggle
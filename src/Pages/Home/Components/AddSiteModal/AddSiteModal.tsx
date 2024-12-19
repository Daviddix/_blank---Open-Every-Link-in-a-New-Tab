import "./AddSiteModal.css"
import globeIcon from "../../../../assets/new-site-icon.svg"
import { FormEvent, useState } from "react"

type AddedSite = {
  name : string,
  id : number
}

type propTypes = {
  setAllAddedSites :  React.Dispatch<React.SetStateAction<AddedSite[]>>
  setShowAddToSiteModal : React.Dispatch<React.SetStateAction<boolean>>
}

function AddSiteModal({setAllAddedSites, setShowAddToSiteModal} : propTypes) {
  const [siteNameBeingTyped, setSiteNameBeingTyped] = useState("")
  const [inputIsInvalid, setInputIsInvalid] = useState(false)

  async function addNewSite(siteName : string, e : FormEvent<HTMLFormElement>){
    e.preventDefault()

    const regex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

    const input = siteName

    if (!regex.test(input)) {
      setInputIsInvalid(true)
      return
    }

    const newSiteData : AddedSite = {
      name : siteName,
      id : Date.now()
    }

    const sitesInStorage = await chrome.storage.local.get(["sitesInStorage"])

    const sitesInStorageValue = await sitesInStorage.sitesInStorage || []

    await chrome.storage.local.set({sitesInStorage : [...sitesInStorageValue, newSiteData]})

    setAllAddedSites((prev)=> [...prev, newSiteData])
    setSiteNameBeingTyped("")
    setShowAddToSiteModal(false)
  }

  function closeModal(){
    setShowAddToSiteModal(false)
    setSiteNameBeingTyped("")
  }

  return (
    <div 
    onClick={closeModal}
    className="add-site-modal">

          <div 
          
          onClick={(e)=>{
            e.stopPropagation()
          }}
          className="modal">

            <div className="modal-header">
                <div className="inner">
                    <img src={globeIcon} alt="globe" />
                    <h1>Add a new Site</h1>
                </div>
            </div>

            <form 
            onSubmit={(e)=>{
              addNewSite(siteNameBeingTyped, e)
            }}
            >
                <label htmlFor="URL">Site's URL</label>

                <input
                required
                onChange={(e)=>{
                  inputIsInvalid ? setInputIsInvalid(false) : ""
                  setSiteNameBeingTyped(e.target.value)
                }}
                value={siteNameBeingTyped}
                type="text" 
                id='URL' 
                placeholder='e.g www.google.com' />

                <small className={inputIsInvalid? "error" : ""}>Format of www.[website name].[website extension]</small>

                <div className="buttons">
                  <button 
                    onClick={()=>{
                      closeModal()
                    }}
                    type="button">Cancel
                    </button>
                  
                    <button type='submit'>Add Site</button>
                </div>
            </form>
          </div>
        </div>
  )
}

export default AddSiteModal
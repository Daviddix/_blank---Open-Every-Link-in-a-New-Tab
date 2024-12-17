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

  function addNewSite(siteName : string, e : FormEvent){
    e.preventDefault()

    const newSiteData : AddedSite = {
      name : siteName,
      id : Date.now()
    }

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
                  setSiteNameBeingTyped(e.target.value)
                }}
                value={siteNameBeingTyped}
                type="text" 
                id='URL' 
                placeholder='e.g www.google.com' />

                <div className="buttons">
                    <button type='submit'>Add Site</button>

                    <button 
                    onClick={()=>{
                      closeModal()
                    }}
                    type="button">Cancel</button>
                </div>
            </form>
          </div>
        </div>
  )
}

export default AddSiteModal
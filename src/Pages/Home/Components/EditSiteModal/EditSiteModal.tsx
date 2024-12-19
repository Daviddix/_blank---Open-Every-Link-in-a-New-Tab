import "./EditSiteModal.css"
import editIcon from "../../../../assets/update-icon.svg"
import { FormEvent, useState } from "react";

type propTypes = {
  name : string;
  id : number;
  setShowEditModal : Function;
  setValuesToEdit : null;
}

type addedSites = {
  name : string;
  id : number
}

function EditSiteModal({valuesToEdit, setShowEditModal, setValuesToEdit, allAddedSites, setAllAddedSites} : any) {
  const [newName, setNewName] = useState(valuesToEdit.name)

  function closeModal(){
    setValuesToEdit({})

    setShowEditModal(false)
  }

  async function updateParticularSite(newSiteName : string, oldSiteId : number, e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const filteredSites = allAddedSites.filter((site : addedSites)=> site.id !== oldSiteId)

    const newSiteCreated = {
      name : newSiteName,
      id : Date.now()
    }

    filteredSites.push(newSiteCreated)

    await chrome.storage.local.set({sitesInStorage : filteredSites})

    setAllAddedSites(filteredSites)

    closeModal()
  }

  return (
    <div 
    onClick={()=>{
      closeModal()
    }}
    className="update-site-modal">

          <div 
          onClick={(e)=>{
            e.stopPropagation()
          }}
          className="modal">

            <div className="modal-header">
                <div className="inner">
                    <img src={editIcon} alt="pencil" />
                    <h1>Update URL</h1>
                </div>
            </div>

            <form
            onSubmit={(e)=>{
              updateParticularSite(newName, valuesToEdit.id, e)
            }}
            >
                <label htmlFor="URL">Site's URL</label>
                <input 
                required
                onChange={(e)=>{
                  setNewName(e.target.value)
                }}
                value={newName}
                type="text" 
                id='URL' 
                placeholder='e.g www.google.com' />

                <div className="buttons">
                    <button 
                   type='submit'>Update Site</button>

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

export default EditSiteModal
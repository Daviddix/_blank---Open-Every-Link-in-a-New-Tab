import "./EditSiteModal.css"
import editIcon from "../../../../assets/update-icon.svg"
import { FormEvent, useState } from "react";


type editValue = {
  name : string,
  id : number
}

type AddedSite = {
  name : string,
  id : number
}

type PropTypes = {
  valuesToEdit : editValue;
  setShowEditModal : React.Dispatch<React.SetStateAction<boolean>>;
  setValuesToEdit : React.Dispatch<React.SetStateAction<editValue>>;
  allAddedSites : AddedSite[];
  setAllAddedSites : React.Dispatch<React.SetStateAction<AddedSite[]>>;
}

type addedSites = {
  name : string;
  id : number
}

function EditSiteModal({valuesToEdit, setShowEditModal, setValuesToEdit, allAddedSites, setAllAddedSites} : PropTypes) {
  const [newName, setNewName] = useState(valuesToEdit.name)
  const [inputIsInvalid, setInputIsInvalid] = useState(false)

  function closeModal(){
    setValuesToEdit({name : "", id : 0})

    setShowEditModal(false)
  }

  async function updateParticularSite(newSiteName : string, oldSiteId : number, e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const regex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/

    const input = newSiteName

    if (!regex.test(input)) {
      setInputIsInvalid(true)
      return
    }

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
                  inputIsInvalid ? setInputIsInvalid(false) : ""
                  setNewName(e.target.value)
                }}
                value={newName}
                type="text" 
                id='URL' 
                placeholder='e.g google.com' />

                <small className={inputIsInvalid? "error" : ""}>Format of [website name].[website extension]</small>

                <div className="buttons">
                    <button 
                    onClick={()=>{
                      closeModal()
                    }}
                    type="button">Cancel
                    </button>

                  <button 
                   type='submit'>Update Site
                  </button>
                </div>
            </form>
          </div>
        </div>
  )
}

export default EditSiteModal
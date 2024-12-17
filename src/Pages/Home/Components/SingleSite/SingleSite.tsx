import editIcon from "../../../../assets/pencil-icon.svg"
import deleteIcon from "../../../../assets/trash-icon.svg"
import "./SingleSite.css"


type AddedSite = {
  name : string,
  id : number
}

type propTypes = {
  name : string;
  id : number;
  setShowEditModal : React.Dispatch<React.SetStateAction<boolean>>;
  setValuesToEdit : React.Dispatch<React.SetStateAction<{name : string, id : number}>>;
  allAddedSites : AddedSite[],
  setAllAddedSites :  React.Dispatch<React.SetStateAction<AddedSite[]>>,
}

function SingleSite({name, id, setShowEditModal, setValuesToEdit, allAddedSites, setAllAddedSites} : propTypes) {

  function showEditModal(){
    setValuesToEdit({
      name,
      id
    })
    setShowEditModal(true)
  }

  async function deleteSiteFromList(id : number){
    const newSites = allAddedSites.filter((site : AddedSite)=> site.id !== id)

    const sitesInStorage = await chrome.storage.local.get(["sitesInStorage"])

    await chrome.storage.local.set({sitesInStorage : newSites})
    
    setAllAddedSites(newSites)
  }
  
  return (
    <div className="single-site">
            <h2>{name}</h2>

            <button 
            onClick={showEditModal}
            className="edit">
              <img src={editIcon} alt="edit site name" />
            </button>

            <button 
            onClick={()=>{
              deleteSiteFromList(id)
            }}
            className="delete">
            <img src={deleteIcon} alt="delete site" />
            </button>
    </div>
  )
}

export default SingleSite
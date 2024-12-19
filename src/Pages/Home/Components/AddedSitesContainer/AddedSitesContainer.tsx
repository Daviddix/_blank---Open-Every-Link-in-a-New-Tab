import "./AddedSitesContainer.css"
import SingleSite from '../SingleSite/SingleSite'

type AddedSite = {
  name : string,
  id : number
}

type propTypes = {
  allAddedSites : AddedSite[],
  setAllAddedSites :  React.Dispatch<React.SetStateAction<AddedSite[]>>;
  setShowEditModal : React.Dispatch<React.SetStateAction<boolean>>;
  useOnAllSites : boolean;
  setValuesToEdit : React.Dispatch<React.SetStateAction<AddedSite>>;//might bug out
}


function AddedSitesContainer({allAddedSites, setAllAddedSites, setShowEditModal, setValuesToEdit, useOnAllSites} : propTypes) {
  const mappedSites = allAddedSites.map(({name, id})=>{
    return <SingleSite 
    allAddedSites={allAddedSites}
    setAllAddedSites={setAllAddedSites}
    setValuesToEdit={setValuesToEdit}
    setShowEditModal={setShowEditModal}
    id={id} 
    key={id} 
    name={name}/>
  })
  
  return (
    <div className={useOnAllSites ? "added-sites disabled":"added-sites"}>
          <h1>Sites you've Added</h1>

          <div className="all-single-site-container">
          {mappedSites}
          </div>
        </div>
  )
}

export default AddedSitesContainer
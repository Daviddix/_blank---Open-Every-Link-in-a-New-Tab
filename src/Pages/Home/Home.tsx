import "./Home.css"
import Header from "./Components/Header/Header"
import AllSitesToggle from "./Components/AllSitesToggle/AllSitesToggle"
import EmptySites from "./Components/EmptySites/EmptySites"
import SingleSite from "./Components/SingleSite/SingleSite"
import AddedSitesContainer from "./Components/AddedSitesContainer/AddedSitesContainer"
import AddSiteModal from "./Components/AddSiteModal/AddSiteModal"
import EditSiteModal from "./Components/EditSiteModal/EditSiteModal"
import { useEffect, useState } from "react"

type AddedSite = {
  name : string,
  id : number
}

type editValue = {
  name : string,
  id : number
}

function Home() {
  const [showAddToSiteModal, setShowAddToSiteModal] = useState(false)

  const [showEditModal, setShowEditModal] =  useState(false)

  const [valuesToEdit, setValuesToEdit] = useState<editValue | {}>({})

  const [allAddedSites, setAllAddedSites] = useState<AddedSite[]>([])

  function showAddToListModal(){
    setShowAddToSiteModal(true)
  }

  async function getSitesFromStorage(){
    const sites = await chrome.storage.local.get("sitesInStorage")

    const sitesValues = await sites.sitesInStorage || []

    setAllAddedSites(sitesValues)
  }

  useEffect(()=>{
    getSitesFromStorage()
  }, [])
  
  return (
    <main>
        <Header />

        <AllSitesToggle
        />

        {
          allAddedSites.length !== 0 &&
        <AddedSitesContainer 
        setValuesToEdit={setValuesToEdit}
        allAddedSites={allAddedSites}
        setShowEditModal={setShowEditModal}
        setAllAddedSites={setAllAddedSites}
        />}

        {
          allAddedSites.length == 0 &&
          <EmptySites />
        }

        {
        showAddToSiteModal && 
        <AddSiteModal
        setShowAddToSiteModal={setShowAddToSiteModal}
        setAllAddedSites={setAllAddedSites}
        />
        }

        {
          showEditModal &&
          <EditSiteModal 
          allAddedSites={allAddedSites}
          setAllAddedSites={setAllAddedSites}
          setValuesToEdit={setValuesToEdit}
          setShowEditModal={setShowEditModal}
          valuesToEdit={valuesToEdit} /> 
        }

        <button 
        onClick={()=>{
          showAddToListModal()
        }}
        className="primary-button">Add New Site</button>
    </main>
  )
}

export default Home
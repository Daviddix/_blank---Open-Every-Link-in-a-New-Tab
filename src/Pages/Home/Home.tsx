import "./Home.css"
import Header from "./Components/Header/Header"
import AllSitesToggle from "./Components/AllSitesToggle/AllSitesToggle"
import EmptySites from "./Components/EmptySites/EmptySites"
import SingleSite from "./Components/SingleSite/SingleSite"
import AddedSitesContainer from "./Components/AddedSitesContainer/AddedSitesContainer"

function Home() {
  return (
    <main>
        <Header />

        {/* <AllSitesToggle /> */}

        <AddedSitesContainer />

        <EmptySites />

        <button className="primary-button">Add New Site</button>
    </main>
  )
}

export default Home
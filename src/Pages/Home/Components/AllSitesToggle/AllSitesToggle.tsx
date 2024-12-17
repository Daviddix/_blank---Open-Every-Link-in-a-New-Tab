import "./AllSitesToggle.css"


function AllSitesToggle() {
  return (
    <div className="all-sites">
          <div className="all-sites-inner">
          <input type="checkbox" name="all" id="all" />
          <p>Use on all sites</p>
          </div>
        </div>
  )
}

export default AllSitesToggle
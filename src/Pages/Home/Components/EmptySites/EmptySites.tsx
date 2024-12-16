import emptyIllustration from "../../../../assets/empty-illustration.svg"
import "./EmptySites.css"

function EmptySites() {
  return (
    <div className="empty-sites">
          <img src={emptyIllustration} alt="empty sites illustrations" />

          <h1>No Site Added Yet</h1>
          <p>You haven't added any site yet. You can add a site by clicking the "add new site" button</p>
        </div>
  )
}

export default EmptySites
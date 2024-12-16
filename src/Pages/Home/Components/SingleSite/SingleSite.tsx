import editIcon from "../../../../assets/pencil-icon.svg"
import deleteIcon from "../../../../assets/trash-icon.svg"
import "./SingleSite.css"

function SingleSite() {
  return (
    <div className="single-site">
            <h2>www.stackoverflow.com</h2>

            <button className="edit">
              <img src={editIcon} alt="edit site name" />
            </button>

            <button className="delete">
            <img src={deleteIcon} alt="delete site" />
            </button>
          </div>
  )
}

export default SingleSite
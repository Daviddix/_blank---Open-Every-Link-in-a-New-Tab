import "./EditSiteModal.css"
import editIcon from "../../../../assets/update-icon.svg"

function EditSiteModal() {
  return (
    <div className="update-site-modal">
          <div className="modal">

            <div className="modal-header">
                <div className="inner">
                    <img src={editIcon} alt="globe" />
                    <h1>Update URL</h1>
                </div>
            </div>

            <form>
                <label htmlFor="URL">Site's URL</label>
                <input type="text" id='URL' placeholder='e.g www.google.com' />

                <div className="buttons">
                    <button type='submit'>Update Site</button>
                    <button>Cancel</button>
                </div>
            </form>
          </div>
        </div>
  )
}

export default EditSiteModal
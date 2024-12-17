import "./AddSiteModal.css"
import globeIcon from "../../../../assets/new-site-icon.svg"

function AddSiteModal() {
  return (
    <div className="add-site-modal">
          <div className="modal">

            <div className="modal-header">
                <div className="inner">
                    <img src={globeIcon} alt="globe" />
                    <h1>Add a new Site</h1>
                </div>
            </div>

            <form>
                <label htmlFor="URL">Site's URL</label>
                <input type="text" id='URL' placeholder='e.g www.google.com' />

                <div className="buttons">
                    <button type='submit'>Add Site</button>
                    <button>Cancel</button>
                </div>
            </form>
          </div>
        </div>
  )
}

export default AddSiteModal
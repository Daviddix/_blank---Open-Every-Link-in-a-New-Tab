import logoIcon from "../../../../assets/logo.svg"
import coffeeLogo from "../../../../assets/coffee.svg"
import "./Header.css"

function Header() {
  function supportWebsite(){
    chrome.tabs.create({ url: "https://buymeacoffee.com/david05" })
  }
  
  return (
    <header>
          <div className="header-inner">
          <img src={logoIcon} alt="_blank logo" className="logo"/>

          <button 
          onClick={supportWebsite}
          className="coffee">
            <img src={coffeeLogo} alt="support the developer" />
          </button>
          </div>
        </header>
  )
}

export default Header
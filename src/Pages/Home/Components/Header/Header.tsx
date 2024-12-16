import logoIcon from "../../../../assets/logo.svg"
import coffeeLogo from "../../../../assets/coffee.svg"
import "./Header.css"

function Header() {
  return (
    <header>
          <div className="header-inner">
          <img src={logoIcon} alt="_blank logo" className="logo"/>

          <button className="coffee">
            <img src={coffeeLogo} alt="support the developer" />
          </button>
          </div>
        </header>
  )
}

export default Header
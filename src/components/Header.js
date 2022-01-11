import React from "react"
import "./Header.css"
import LogoUser from "../images/Logo_user.png"
import Logo from "../images/Netflix_logo.svg"

export const Header = ({ dark }) => {
  return (
    <header className={dark ? "dark" : ""}>
      <div className="header--logo">
        <a href="/">
          <img src={Logo} alt="Netflix" />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src={LogoUser} alt="Usuario" />
        </a>
      </div>
    </header>
  )
}

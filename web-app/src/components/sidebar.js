import React from 'react'
import { Home } from 'react-feather'
import { Link } from '@reach/router'

export default () => {
  return (
    <nav
      className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light"
      id="sidebar"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="index.html">
          {/* <img src="./assets/img/logo.svg" className="navbar-brand-img 
    mx-auto" alt="..." /> */}
          Logo
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <Home size={16} className="mr-3" /> Dashboards
              </Link>
            </li>
          </ul>

          <hr className="navbar-divider my-3" />
        </div>
      </div>
    </nav>
  )
}

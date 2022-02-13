import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
export const Sidebar = ({ componentsAccess }) => {
  return (
    <div className="sidebar">
      {componentsAccess.map(componentsData => (
        <>
          <NavLink
            key={componentsData.id}
            to={componentsData.path}
            activeClassName="active"
            className="sidebar__link"
            onClick={() => { console.log("first") }}
          >
            <i className={`${componentsData.icon} sidebar__link__icon`} />
            <span className="sidebar__link__text">{componentsData.text}</span>
          </NavLink>

          <Route path={componentsData.path}>
            <div className='sidebar__submenu'>
              {componentsData.subMenu.map(({ id, path, icon, text }) => (
                <NavLink
                  key={id}
                  to={path}
                  activeClassName="active"
                  className="sidebar__submenu__link"
                >
                  <i className={`${icon} sidebar__submenu__link__icon`} />
                  <span className="sidebar__submenu__link__text">{text}</span>
                </NavLink>
              ))}
            </div>
          </Route>

        </>
      ))
      }

    </div >
  )
}

import React, { Fragment } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
export const Sidebar = ({ componentsAccess }) => {
  return (
    <div className="sidebar">
      {componentsAccess.map((componentsData, i) => (
        <Fragment key={componentsData.path + 'asdfasdfasdf'} >
          <NavLink
            key={i + 1000000000000}
            to={componentsData.path}
            activeClassName="active"
            className="sidebar__link"
          >
            <i className={`${componentsData.icon} sidebar__link__icon`} />
            <span className="sidebar__link__text">{componentsData.text}</span>
          </NavLink>

          <Route key={i + 1000} path={componentsData.path}>
            <div className='sidebar__submenu'>
              {componentsData.subMenu.map(({ id, path, icon, text }) => (
                <NavLink
                  key={path}
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
        </Fragment>
      ))
      }

    </div >
  )
}

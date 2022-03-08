import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Sidebar } from '../ui/Sidebar'
import { useAccess } from '../../hooks/useAccess'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';


export const Main = () => {
  const { ui: { isModalOpen } } = useSelector(state => state);
  const [roles, componentsAccess] = useAccess();
  return (
    <div className={`mainContainer ${isModalOpen && 'modal-active'} `}>
      {/* Texture */}
      <div className="texture" />

      {/* Navbar */}
      <Navbar />

      {/* card and menu */}
      <div className="content">
        <Sidebar componentsAccess={componentsAccess} />
        <div className="overtexture" >
          <Switch>
            {
              componentsAccess.map((componentData, index) => (
                <Route key={index} path={`${componentData.path}/:name?`} component={componentData.component}  />
              ))
            }
          </Switch>
        </div>
      </div>
    </div>
  )
}

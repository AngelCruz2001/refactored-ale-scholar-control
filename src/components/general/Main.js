import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Sidebar } from '../ui/Sidebar'
import { useAccess } from '../../hooks/useAccess'
import { Route, Switch } from 'react-router-dom'
export const Main = () => {
  const [roles, componentsAccess] = useAccess();
  return (
    <div className='mainContainer'>
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
                <Route key={index} path={`${componentData.path}/:name?`} component={componentData.component} key={index} />
              ))
            }
          </Switch>
        </div>
      </div>
    </div>
  )
}

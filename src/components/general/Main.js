import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Sidebar } from '../ui/Sidebar'
import { useAccess } from '../../hooks/useAccess'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';


export const Main = () => {
  const { ui: { isModalOpen, isModalOpenExpenses } } = useSelector(state => state);
  const [roles, componentsAccess] = useAccess();
  return (
    <div className={`mainContainer ${isModalOpen && 'modal-active'} ${isModalOpenExpenses && 'modal-active-expense'} `}>
      {/* Texture */}
      <div className="texture" />

      {/* Navbar */}
      <Navbar />

      {/* card and menu */}
      <div className="content">
        <Sidebar componentsAccess={componentsAccess} />
        <div className={`overtexture ${isModalOpenExpenses && 'modal-active-expense'}`} >
          <Switch>
            {
              componentsAccess.map((componentData, index) => (
                <Route key={index} path={`${componentData.path}/:name?`} component={componentData.component} />
              ))
            }
          </Switch>
        </div>
      </div>
    </div>
  )
}

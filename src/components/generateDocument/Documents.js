import React from 'react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import { GenerateDocument } from './GenerateDocument'
import { RequestsDocuments } from './RequestsDocuments'
export const Documents = () => {
    return (
        <>
            {/* <div className="animation__loadIcon"></div> */}
            <div className='gen'>
                <div className="gen__header">
                    <div className='gen__header__checkHistory'>
                        <button className="btn  req__footer__checkHistory" onClick={() => console.log(true)}><i className="fas fa-history"></i><span>Ver Historial</span></button>
                    </div>
                    <div className='gen__header__nav'>
                        <NavLink className="gen__header__nav__item" activeClassName="gen__header__nav__item__active" to="/generar_documento/solicitudes" >
                            <p>Solicitudes</p>
                        </NavLink>
                        <NavLink className="gen__header__nav__item" activeClassName="gen__header__nav__item__active" to="/generar_documento/generar" >
                            <p>Generar documento</p>
                        </NavLink>
                    </div>
                </div>

                <div className="gen__body">
                    <Switch>
                        <Route path="/generar_documento/solicitudes" component={RequestsDocuments} />
                        <Route path="/generar_documento/generar" component={GenerateDocument} />
                        <Redirect to="/generar_documento/solicitudes" />
                    </Switch>
                </div>
            </div>
        </>
    )
}

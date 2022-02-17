import React from 'react'
import { useSelector } from 'react-redux'
import { paySetMethod } from '../../../actions/pay'
import { activeDisabled } from '../../../helpers/activeDisabled'
import { MethodPayButton } from '../ButtonsPay'

export const MethodPay = () => {
    const { concept, method } = useSelector(state => state.pay)
    const { ui } = useSelector(state=> state)
    return (
        <div className={`make__payMethod ${!concept && 'ui__disabledEffect'}`}>
            <p className="make__titleSection make__payMethod__container">METODO DE PAGO</p>
            <div className="btn-payContainer make__payMethod__items">
                <MethodPayButton  text="Efectivo" activeClassName={activeDisabled(3,ui.current)} setData={paySetMethod} isSelected={method === "Efectivo"} />
                <MethodPayButton  text="Depósito" activeClassName={activeDisabled(3,ui.current)} setData={paySetMethod} isSelected={method === "Depósito"} />
                <MethodPayButton text="Tarjeta"  activeClassName={activeDisabled(3,ui.current)}  setData={paySetMethod} isSelected={method === "Tarjeta"} />
            </div>
        </div>
    )
}

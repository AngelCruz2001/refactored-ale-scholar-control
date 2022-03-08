import React from 'react'
import { useDispatch } from 'react-redux';
import { payClearModalData, paySetMethod, payStartGetCards } from '../../actions/pay';
import { uiSetCurrent } from '../../actions/ui';

export const ConceptPayButton = ({ text, icon = true, isSelected = false, setData, activeClassName}) => {
    const dispatch = useDispatch();
    const setValueState = () => {
        dispatch(payClearModalData());
        dispatch(setData(text));
        dispatch(uiSetCurrent(3))
        
    };
    return (
        <div className={`btn-payElement ${isSelected && "selected"} ${activeClassName}` } onClick={setValueState} >
            <p>
                {text}
            </p>
            {
                icon && <div><i className="fas fa-chevron-circle-right"></i></div>
            }
        </div>
    )
}

export const MethodPayButton = ({ text, isSelected = false, setData, activeClassName }) => {
    const dispatch = useDispatch();
    const setValueState = () => {
        
        dispatch(paySetMethod(text));
        text !== "Efectivo" && dispatch(payStartGetCards())
        dispatch(uiSetCurrent(4));
        
    };

    return (
        <div className={`btn-payElement ${isSelected && "selected"} ${activeClassName}`} onClick={setValueState} >
            <p>
                {text}
            </p>
        </div>
    )
}

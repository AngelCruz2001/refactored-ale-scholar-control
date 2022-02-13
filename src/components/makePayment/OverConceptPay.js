import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { paySetThingToPay } from '../../actions/pay';

export const OverConceptPay = () => {

    const dispatch = useDispatch();
    const [findValue, setFindValue] = useState("");
    const { concept } = useSelector(state => state.pay)
    const regex = new RegExp(findValue, 'gi');
    const months = ["Materia Enero", "Materia Febrero", "Materia Marzo", "Materia Abril", "Materia Mayo", "Materia Junio", "Materia Julio", "Materia Agosto", "Materia Septiembre", "Materia Octubre", "Materia Noviembre", "Materia Diciembre"];
    const documents = ["Constancia con de estudios. (Con calificaciones)", "Constancia de estudios (Sin calificaciones)", "Carta maestrante", "Kardex", "Credenciales", "Certificado", "Acta de examen", "Oficio de servicio social y practicas", "Titulo", "Constancia de título en proceso"];

    return (
        <div className="make__containerListConcepts">
            <div className="make__containerListConcepts__show">

                <div className="check-state-pay__form make__containerListConcepts__show__form">
                    <form onSubmit={(e) => e.preventDefault()} >
                        <div className="check-state-pay__form__inIcon">
                            <input type="text" name="materia" placeholder="Buscar" maxLength="30" onChange={(e) => setFindValue(e.target.value)} />
                            <span><i className="fas fa-search"></i></span>
                        </div>
                    </form>
                </div>
                <div className="make__containerListConcepts__show__data">
                    {
                        (concept === "Materia" ? months : documents).filter(
                            data => data.match(regex)).map((data, i) =>
                                <p
                                    key={i}
                                    onClick={() => dispatch(paySetThingToPay({ name: data, id: i }))}
                                >
                                    {data}
                                </p>
                            )
                    }
                </div>
            </div>

        </div>
    )
}

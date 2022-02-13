import React from 'react'
import { useSelector } from 'react-redux';
import { Separator } from '../../ui/Separator';
import { ConceptPayButton } from '../ButtonsPay';
import { paySetConcept } from '../../../actions/pay';
import { activeDisabled } from '../../../helpers/activeDisabled';

export const ConceptPay = () => {
    const { concept, thingToPay} = useSelector(state => state.pay);
    const { student, ui }  = useSelector(state=> state)
  
    const payText = (!concept) ? 'Concepto a pagar' : (concept == "Inscripción") ? 'Inscripción a pagar' : (concept == "Materia") ? 'Materia a pagar' : 'Documento a pagar';

    return (
        <div className={`make__conceptPay ${!student.matricula && 'ui__disabledEffect'}`}>
            <div className="make__conceptPay-way">
                <p  className={`make__titleSection ${
            !student.matricula && "ui__disabledEffectInfo-title "
          }`}>Concepto de pago</p>
                <div className="btn-payContainer">
                    <ConceptPayButton activeClassName={activeDisabled(2,ui.current)} text="Inscripción" icon={false} setData={paySetConcept} isSelected={concept === "Inscripción"} />
                    <ConceptPayButton activeClassName={activeDisabled(2,ui.current)} text="Materia" setData={paySetConcept} isSelected={concept === "Materia"} />
                    <ConceptPayButton activeClassName={activeDisabled(2,ui.current)} text="Documento" setData={paySetConcept} isSelected={concept === "Documento"} />
                </div>
            </div>
            {/* <Separator /> */}

            <div className="make__conceptPay-data">
                <p  className={`make__titleSection ${!concept && "ui__disabledEffectInfo-title "}`}>{payText}</p>
                <input value={concept === "Inscripción" ? "Inscripción Correspondiente" : thingToPay.name} onChange={() => { console.log("You cannot change me.") }} />
            </div>
            {/*Inscripción correspondiente*/}
            {/* <Separator /> */}

        </div>
    )
}

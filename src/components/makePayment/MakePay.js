import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Date } from '../ui/Date'
import { Separator } from '../ui/Separator'
import { OverConceptPay } from './OverConceptPay'
import { PayCard, PayDeposit } from './PayMethods'
import { ReceiveMoney } from './ReceiveMoney'
import { TotalPay } from './TotalPay'
import { SubmitPay } from './SubmitPay'
import { ConceptPay } from './conceptPay/ConceptPay'
import { MethodPay } from './methodPay/MethodPay'
import { Matricula } from '../ui/Matricula'
import { StudentInformation } from '../ui/StudentInformation'
import { activeDisabled } from '../../helpers/activeDisabled'

export const MakePay = () => {

    const { concept, method, thingToPay, idPayment } = useSelector(state => state.pay)
    // useEffect(() => {
    //     const { concept, method, thingToPay, idPayment } = useSelector(state => state.pay)

    // }, [])
    const { ui, student} = useSelector(state => state)
    const { current, loading } = ui;
    return (
        <div className="make__ ">
            <div className="make__date">
                <Date />
            </div>

            <div className="make__container">
                <div className={`make__subContainerLeft ${idPayment ? "ui__noTouch" : ""}`}>
                    <Matricula
                        activeClassName={activeDisabled(0, current)}
                        matricula={student.matricula}
                        payment={true}
                    />
                    <StudentInformation
                        activeClassName={activeDisabled(1, current)}
                        loading={loading}
                        student={student}
                        payment={true}
                    />

                    <ConceptPay />

                </div>
                {/* .ui__disabledEffect */}
                <div className={`make__subContainerRight `} >

                    <MethodPay />

        

                    <TotalPay
                        activeClassName={activeDisabled(4, current)} 
                    />

                 

                    {
                        !thingToPay.name && (concept !== "Inscripción") && concept && <OverConceptPay />
                    }

                    {
                        method && (method !== "Efectivo") ? (method === "Depósito") ? <PayDeposit /> : <PayCard /> : <></>
                    }

                    <ReceiveMoney />

                 

                    <SubmitPay />

                </div>

            </div>

        </div>
    )
}


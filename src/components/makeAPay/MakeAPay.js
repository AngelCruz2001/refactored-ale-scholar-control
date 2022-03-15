import React from 'react'
import { Date } from '../ui/Date'
import { Matricula } from '../ui/Matricula'
import { StudentInformation } from '../ui/StudentInformation'
import { ButtonMakeAPay } from './ButtonMakeAPay'

export const MakeAPay = () => {


    const studentInformation = {
        headers: ["Nombre", "Grupo", "Campus"],
        data: ['Angel Cruz', "2B", "Instituto de educación y cultura Alejandría"],
    }

    return (
        <div className='makeAPay'>
            <div className="makeAPay__headers">
                <Date />
            </div>

            <div className="makeAPay__body">
                <div className="makeAPay__body__container">
                    <Matricula />

                    <div className='makeAPay__body__container__studentData'>
                        <StudentInformation
                            studentInformation={studentInformation}
                        />
                    </div>

                    <div className="makeAPay__body__container__concept">
                        <p className='payTitle'>Concepto de pago</p>
                        <div className='makeAPay__body__container__concept__buttons'>
                            <ButtonMakeAPay text="Inscripción" />
                            <ButtonMakeAPay text="Materia" hasIcon={true} />
                            <ButtonMakeAPay text="Documento" hasIcon={true} />
                            <ButtonMakeAPay text="Extra-curricular" hasIcon={true} />
                        </div>
                    </div>

                    <div className="makeAPay__body__container__conceptToPay">
                        <p className='payTitle'>Concepto a pagar</p>
                        <span>Inscripción</span>
                    </div>

                </div>

                <div className="makeAPay__body__container">
                    <div className='makeAPay__body__container__concept'>
                        <p className="payTitle">Método de pago</p>
                        <div className="makeAPay__body__container__concept__buttons method">
                            <ButtonMakeAPay text="Efectivo" />
                            <ButtonMakeAPay text="Depósito" />
                            <ButtonMakeAPay text="Tarjeta" />
                        </div>
                    </div>

                    <div className="makeAPay__body__container__total ">
                        <button className='btn'>Total de pago</button>
                    </div>

                    <div className="makeAPay__body__container__money">
                        <label htmlFor="quantity"></label>
                        <input name='quantity' type="text" placeholder="$0.00" className='' />
                        <label htmlFor="change"></label>
                        <input name='change' type="text" placeholder="$0.00" className='' />
                    </div>

                    <div className="makeAPay__body__container__pay">
                        <button className='makeAPay__body__container__pay__button'>Pagar</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

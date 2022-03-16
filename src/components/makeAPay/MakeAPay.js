import React, { useState } from 'react'
import { Date } from '../ui/Date'
import { Matricula } from '../ui/Matricula'
import { StudentInformation } from '../ui/StudentInformation'
import { ButtonMakeAPay } from './ButtonMakeAPay'

export const MakeAPay = () => {


    const studentInformation = {
        headers: ["Nombre", "Grupo", "Campus"],
        data: ['Angel Cruz', "2B", "Instituto de educación y cultura Alejandría"],
    }

    const [dataPay, setDataPay] = useState({
        concept: '',
        type: '',
        method: 0, // 0: cash, 1: card, 2: deposit
        account: '',
        quantity: '',
        change: '',
    })

    const handleInputChange = (e) => {
        console.log("🚀 ~ file: MakeAPay.js ~ line 31 ~ handleInputChange ~ e", e.target)

        setDataPay(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
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
                            <ButtonMakeAPay onClick={handleInputChange} value={'Inscripción'} name="concept" text="Inscripción" />
                            <ButtonMakeAPay onClick={handleInputChange} value={'Materia'} name="concept" text="Materia" hasIcon={true} />
                            <ButtonMakeAPay onClick={handleInputChange} value={'Documento'} name="concept" text="Documento" hasIcon={true} />
                            <ButtonMakeAPay onClick={handleInputChange} value={'Extra'} name="concept" text="Extra-curricular" hasIcon={true} />
                        </div>
                    </div>

                    <div className="makeAPay__body__container__conceptToPay">
                        <p className='payTitle'>Concepto a pagar</p>
                        <span>{dataPay.concept}</span>
                    </div>

                </div>

                <div className="makeAPay__body__container right">
                    <div className='makeAPay__body__container__concept'>
                        <p className="payTitle">Método de pago</p>
                        <div className="makeAPay__body__container__concept__buttons method">
                            <ButtonMakeAPay text="Efectivo" name="method" />
                            <ButtonMakeAPay text="Depósito" name="method" />
                            <ButtonMakeAPay text="Tarjeta" name="method" />
                        </div>
                    </div>

                    <div className="makeAPay__body__container__total ">
                        <button className='btn btn-bluePay '>Total de pago</button>
                        <div className='makeAPay__body__container__total__price'>
                            <p>$5,000</p>
                        </div>
                    </div>
                    {
                        true && <div className="makeAPay__body__container__deposit">
                            <select name="deposit" id="">
                                <option value="0">Cuenta 1</option>
                                <option value="1">Cuenta 2</option>
                                <option value="2">Cuenta 3</option>
                            </select>
                        </div>
                    }
                    {
                        false && <div className="makeAPay__body__container__card">
                            <p className='title'>Información bancaria</p>
                            <p>xxxxxxxxxxxxxxxxxxxx</p>
                            <p>xxxxxxxxxxxxxxxxxxxxx</p>
                            <p>xxxxxxxxxxxxxxxxxxxxxx</p>

                        </div>
                    }
                    <div className="makeAPay__body__container__money">
                        <div>
                            <label htmlFor="quantity">Cantidad</label>
                            <input name='quantity' type="text" placeholder="$0.00" className='' />
                        </div>
                        <div>
                            <label htmlFor="change">Restante</label>
                            <input name='change' type="text" placeholder="$0.00" className='' />
                        </div>
                    </div>

                    <div className="makeAPay__body__container__pay">
                        <button className='btn btn-bluePay'>Pagar</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

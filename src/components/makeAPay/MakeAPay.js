import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik'
import { Date } from '../ui/Date'
import { Matricula } from '../ui/Matricula'
import { ItemsToPay } from './ItemsToPay'
import { usePayments } from '../../hooks/usePayments'
import { StudentData } from './StudentData';
import { ConceptPay } from './ConceptPay';
import { PayMethod } from './PayMethod';
import { PayTotal } from './PayTotal';
import { MethodDetails } from './MethodDetails';
import { PayQuantity } from './PayQuantity';
import { PaySubmit } from './PaySubmit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { payStartFertilizer, payStartMakePay } from '../../actions/pay';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom";


export const MakeAPay = () => {

    const history = useHistory();
    const { name } = useParams();
    const { matricula, studentInfo, loading, id_user, cards, totalPayMoney, activeFertilizer } = usePayments(name);

    const [isAFer, setIsAFer] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsAFer(activeFertilizer != null)
    }, [activeFertilizer])

    const handleGetTotal = () => {

    }


    return (
        <div className='makeAPay'>
            <div className="makeAPay__headers">
                <Date />
            </div>

            <Formik
                initialValues={
                    {
                        matricula: matricula ? matricula : '',
                        id_user,
                        payment_method: '',
                        payment_type: isAFer ? activeFertilizer.payment_type : null,
                        thingToPay: isAFer ? activeFertilizer.name : null,
                        amount: 0,
                        document_type: null,
                        id_card: null,
                        start_date: null,
                        id_ext_cou: null,
                        search: ''
                    }
                }
                enableReinitialize={true}


                validationSchema={Yup.object({

                })}

                onSubmit={(values, { resetForm }) => {
                    isAFer ? dispatch(payStartFertilizer(values, activeFertilizer.id_payment, history)) : dispatch(payStartMakePay(values, history))

                }}


            >

                {({ values, setFieldValue, resetForm, handleSubmit }) => (

                    <Form className="makeAPay__body">

                        <div className="makeAPay__body__container">
                            <Matricula />

                            <StudentData studentInfo={studentInfo} loading={loading} />

                            <ConceptPay payment_type={values.payment_type} setFieldValue={setFieldValue} thingToPay={values.thingToPay} />

                        </div>

                        <div className="makeAPay__body__container right">

                            <ItemsToPay payment_type={values.payment_type} search={values.search} thingToPay={values.thingToPay} matricula={matricula} setFieldValue={setFieldValue} />

                            <PayMethod payment_method={values.payment_method} handleGetTotal={handleGetTotal} />

                            <PayTotal total={`$${isAFer ? activeFertilizer.missing : totalPayMoney}`} />

                            <MethodDetails payment_method={values.payment_method} cards={cards} />

                            <PayQuantity total={isAFer ? activeFertilizer.missing : totalPayMoney} amount={values.amount} />

                            <PaySubmit handleSubmit={handleSubmit} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

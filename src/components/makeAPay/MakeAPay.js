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
import { useEffect } from 'react';



export const MakeAPay = () => {


    const { matricula, studentInfo, loading, id_user, cards, totalPayMoney } = usePayments();

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
                        payment_type: null,
                        thingToPay: null,
                        amount: 0,
                        document_type: null,
                        id_card: 0,
                        start_date: null,
                        id_ext_cou: null,
                        search: ''
                    }
                }
                enableReinitialize={true}

                validationSchema={Yup.object({
                    matricula: Yup.string().required('La matricula es requerida'),
                    payment_method: Yup.string().required('El metodo de pago es requerido'),
                    id_card: Yup.string().when('payment_method', { is: 'Tarjeta', then: Yup.string().required('La tarjeta es requerida') }),
                    payment_type: Yup.string().required('El tipo de pago es requerido'),
                    thingToPay: Yup.string().when('payment_method', {
                        is: 'Inscripción',
                        then: Yup.string().nullable(true),
                        otherwise: Yup.string().required('El tipo de pago es requerido')
                    }),
                    amount: Yup.number().required('La cantidad es requerida'),
                })}
                onSubmit={(values) => {
                    console.log(values)
                }}

            >

                {({ values, setFieldValue, resetForm }) => (
                    <Form className="makeAPay__body">

                        <div className="makeAPay__body__container">
                            <Matricula />

                            <StudentData studentInfo={studentInfo} loading={loading} />

                            <ConceptPay payment_type={values.payment_type} setFieldValue={setFieldValue} />

                        </div>

                        <div className="makeAPay__body__container right">

                            <ItemsToPay payment_type={values.payment_type} search={values.search} thingToPay={values.thingToPay} matricula={matricula} />

                            <PayMethod payment_method={values.payment_method} handleGetTotal={handleGetTotal} />

                            <PayTotal total={`$${totalPayMoney}`} />

                            <MethodDetails payment_method={values.payment_method} cards={cards} />

                            <PayQuantity total={totalPayMoney} amount={values.amount} />

                            <PaySubmit />
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

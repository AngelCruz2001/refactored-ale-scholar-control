import { Formik, Form, Field } from "formik";
import { Date } from "../ui/Date";
import { Matricula } from "../ui/Matricula";
import { ItemsToPay } from "./ItemsToPay";
import { usePayments } from "../../hooks/usePayments";
import { StudentData } from "./StudentData";
import { ConceptPay } from "./ConceptPay";
import { PayMethod } from "./PayMethod";
import { PayTotal } from "./PayTotal";
import { MethodDetails } from "./MethodDetails";
import { PayQuantity } from "./PayQuantity";
import { PaySubmit } from "./PaySubmit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  payStartFertilizer,
  payStartMakePay,
  payClearModalData,
} from "../../actions/pay";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

export const MakeAPay = () => {
  const history = useHistory();
  const { name } = useParams();
  const {
    matricula,
    studentInfo,
    loading,
    id_user,
    cards,
    totalPayMoney,
    activeFertilizer,
  } = usePayments(name);

  const [isAFer, setIsAFer] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAFer(activeFertilizer != null);
  }, [activeFertilizer]);

  const handleGetTotal = () => { };

  const handleCancelFertilizer = () => {
    // dispatch(payClearModalData());
    history.push("/abonos");
  };

  const ConsoleLog = ({ children }) => {
    console.log(children);
    return false;
  };

  return (
    <div className="makeAPay">
      <div className="makeAPay__headers">
        <Date />
      </div>
      <Formik
        initialValues={{
          matricula: matricula ? matricula : "",
          id_user,
          payment_method: "",
          payment_type: isAFer ? activeFertilizer.payment_type : null,
          thingToPay: isAFer ? activeFertilizer.name : null,
          amount: 0,
          document_type: null,
          id_card: "",
          start_date: null,
          id_ext_cou: null,
          search: "",
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          matricula: Yup.string().required("Matricula requerida"),
          id_user: Yup.string().required("Usuario requerido"),
          payment_method: Yup.string().required("Método de pago requerido"),
          payment_type: Yup.string().required("Tipo de pago requerido"),
          thingToPay: Yup.string().required("Concepto de pago requerido"),
          amount: Yup.number().required("Cantidad requerida").min(1),
          document_type: !isAFer ? Yup.number()
            .when("payment_type", {
              is: (payment_type) => payment_type === "Documento",
              then: Yup.number().required("Tipo de documento requerido"),
            })
            .nullable()
            :
            Yup.number()
              .nullable(),
          id_card: Yup.string().when
            ('payment_method', {
              is: 'Depósito',
              then: Yup.string().required('Requerido')
            }).nullable(),
          start_date: !isAFer ? Yup.string()
            .nullable()
            .when("payment_type", {
              is: (payment_type) => payment_type === "Materia",
              then: Yup.string().required("La materia es requerida."),
            })
            :
            Yup.string()
              .nullable()
          ,
          id_ext_cou: Yup.string()
            .nullable()
            .when("payment_type", {
              is: (payment_type) => payment_type === "Extra",
              then: Yup.string().required("El curso es requerido."),
            }),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          values.id_card = values.id_card !== '' ? values.id_card : null;
          isAFer
            ? dispatch(
              payStartFertilizer(values, activeFertilizer.id_payment, history)
            )
            : dispatch(payStartMakePay(values, resetForm, history));
        }}
      >
        {({
          values,
          setFieldValue,
          resetForm,
          handleSubmit,
          setFieldError,
          errors,
          dirty,
          isValid
        }) => (
          <>
            <Form className="makeAPay__body" onSubmit={handleSubmit}>
              <ConsoleLog>{(values, errors)}</ConsoleLog>
              <div className="makeAPay__body__container">
                <Matricula />
                <StudentData studentInfo={studentInfo} loading={loading} />
                <ConceptPay
                  payment_type={values.payment_type}
                  setFieldValue={setFieldValue}
                  thingToPay={values.thingToPay}
                />
              </div>
              <div className="makeAPay__body__container right">
                <ItemsToPay
                  payment_type={values.payment_type}
                  search={values.search}
                  thingToPay={values.thingToPay}
                  matricula={matricula}
                  setFieldValue={setFieldValue}
                />

                <PayMethod
                  payment_method={values.payment_method}
                  handleGetTotal={handleGetTotal}
                />

                <PayTotal
                  total={`$${isAFer ? activeFertilizer.missing : totalPayMoney
                    }`}
                />

                <MethodDetails
                  payment_method={values.payment_method}
                />

                <PayQuantity
                  total={isAFer ? activeFertilizer.missing : totalPayMoney}
                  amount={values.amount}
                />

                <PaySubmit
                  type="submit"
                  onCancel={handleCancelFertilizer}
                  cancel={isAFer}
                  isValid= {isValid}
                   />
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

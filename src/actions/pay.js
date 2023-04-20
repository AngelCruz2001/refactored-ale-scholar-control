import { types } from "../types/types";
import Swal from "sweetalert2";
import {
  uiFinishLoading,
  uiFinishLoadingCards,
  uiStartLoading,
  uiStartLoadingCards,
} from "./ui";
import { fetchConToken } from "../helpers/fetch";
import { studentClearData } from "./student";
export const payStartGetStudentByMatricula = (matricula) => {
  return async (dispatch) => {
    dispatch(uiStartLoading());
    dispatch(payClearActivePay());
    dispatch(payClearModalData());
    try {
      const res = await fetchConToken(`students/${matricula}`, "GET");
      const body = await res.json();
      if (body.ok) {
        dispatch(paySetActivePay(body.student));
      } else {
        console.log(body);
        Swal.fire({
          title: "¡Oops!",
          text: body.msg,
          icon: "question",
        });
      }
      dispatch(uiFinishLoading());
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Hablar con el administrador", "error");
    }
  };
};
export const payStartGetCards = () => {
  return async (dispatch) => {
    dispatch(uiStartLoadingCards());
    try {
      const res = await fetchConToken(`cards`, "GET");
      const body = await res.json();
      if (body.ok) {
        dispatch(paySetCards(body.cards));
      } else {
        console.log(body);
        Swal.fire({
          title: "¡Oops!",
          text: body.msg,
          icon: "question",
        });
      }
      dispatch(uiFinishLoadingCards());
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Hablar con el administrador", "error");
    }
  };
};
export const payStartGetPrice = (payment_type, thingToPay) => {
  // thingToPay = id del documento o mes que se esta pagando este llega como string
  // payment_type = "Documento" | "Materia" | "Inscripción"
  return async (dispatch, getState) => {
    try {
      const dataToSend = {
        payment_type, // ¿Qué andas pagando?
        document_type:
          payment_type === "Documento" ? parseInt(thingToPay) : null, //Id document == i
        start_date: payment_type === "Materia" ? parseInt(thingToPay) : null, //Mes que se esta pagando == i
      };

      console.log(dataToSend);

      const res = await fetchConToken(
        `payments/students/${getState().student.matricula}/check`,
        dataToSend,
        "POST"
      );
      const body = await res.json();
      if (body.ok) {
        console.log(body);
        dispatch(paySetPrice(body.total_to_pay));
      } else {
        console.log(body);
        Swal.fire({
          title: "¡Oops!",
          text: body.msg,
          icon: "question",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Hablar con el administrador", "error");
    }
  };
};
export const payStartMakePay = (values, resetForm) => {
  return async (dispatch, getState) => {
    try {
      console.log("values", values);
      console.log("caca");

      // const dataToSend = {
      //     matricula,
      //     id_user,
      //     payment_method: method,
      //     amount: amountToPay,
      //     id_card: method === 'Efectivo' ? null : activeAccount,
      //     payment_type: concept, //¿Qué andas pagando?

      // }

      const res = await fetchConToken(
        "payments",
        {
          ...values,
          id_card: values.payment_method === "Efectivo" ? null : values.id_card,
        },
        "POST"
      );
      const body = await res.json();

      if (body.ok) {
        console.log(body);
        //history.goBack()
        Swal.fire({
          title: "Pagos",
          text: "Pago realizado con exito" + ".",
          icon: "success",
        });
        resetForm();
        dispatch(studentClearData());
        dispatch(payClearModalData());
        dispatch(payClearActivePay());
      } else {
        console.log(body);
        Swal.fire({
          title: "¡Oops!",
          text: body.msg,
          icon: "question",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Hablar con el administrador", "error");
    }
  };
};
export const payStartFertilizer = (values, idPayment, history) => {
  return async (dispatch) => {
    try {
      console.log(values);
      const dataToSend = {
        pay_amount: values.amount,
        payment_method: values.payment_method,
        id_card: values.id_card,
      };

      const res = await fetchConToken(
        `payments/${idPayment}/payFor`,
        dataToSend,
        "POST"
      );
      const body = await res.json();

      console.log(dataToSend);
      if (body.ok) {
        console.log(body);
        dispatch(payClearModalData());
        dispatch(payClearActivePay());
        history.goBack();
        Swal.fire({
          title: "Pagos",
          text: body.msg,
          icon: "success",
        });
      } else {
        console.log(body);
        Swal.fire({
          title: "¡Oops!",
          text: body.msg,
          icon: "question",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Hablar con el administrador", "error");
    }
  };
};
export const payStartGetAllPayments = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());

      const res = await fetchConToken(`payments`, "GET");
      const body = await res.json();
      if (body.ok) {
        console.log(body);
        dispatch(paySetPayments(body.payments));
      } else {
        console.log(body);
        Swal.fire({
          title: "¡Oops!",
          text: body.msg,
          icon: "question",
        });
      }
      dispatch(uiFinishLoading());
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Hablar con el administrador", "error");
    }
  };
};
export const payStartGetFertilizerPay = (matricula) => {
  return async (dispatch) => {
    try {
      const res = await fetchConToken(`payments/students/${matricula}`, "GET");
      const body = await res.json();

      if (body.ok) {
        console.log(body);
        dispatch(paySetFertilizers(body.student.payments));
      } else {
        console.log(body);
        Swal.fire({
          title: "¡Oops!",
          text: body.msg,
          icon: "question",
        });
      }
      dispatch(uiFinishLoadingCards());
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Hablar con el administrador", "error");
    }
  };
};

const paySetActivePay = (data) => ({ type: types.paySetActive, payload: data });

export const payClearActivePay = () => ({ type: types.payClearActive });

const paySetCards = (cards) => ({ type: types.paySetCards, payload: cards });

const paySetFertilizers = (fertilizers) => ({
  type: types.paySetFertilizers,
  payload: fertilizers,
});
const paySetPayments = (payments) => ({
  type: types.paySetPayments,
  payload: payments,
});

export const paySetPrice = (price) => ({
  type: types.paySetPrice,
  payload: price,
});
export const paySetAmountToPay = (amount) => ({
  type: types.payAmountToPay,
  payload: amount,
});
export const paySetConcept = (data) => ({
  type: types.payConceptPay,
  payload: data,
});
export const paySetMethod = (data) => ({
  type: types.payMethodPay,
  payload: data,
});
export const paySetThingToPay = (data) => ({
  type: types.payThingToPay,
  payload: data,
});
export const paySetActiveAccount = (account) => ({
  type: types.paySetActiveAccount,
  payload: account,
});
export const payClearModalData = () => ({ type: types.payClearModalData });
export const paySetIdPayment = (id) => ({
  type: types.paySetIdPayment,
  payload: id,
});

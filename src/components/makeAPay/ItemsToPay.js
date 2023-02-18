import { Field } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { documentStartGetDocuments } from "../../actions/document";
import { payStartGetPrice } from "../../actions/pay";
import { isACoincidenceAssing } from "../../helpers/isACoincidence";
import moment from "moment";

export const ItemsToPay = ({
  payment_type,
  search,
  thingToPay,
  matricula,
  setFieldValue,
}) => {
  const dispatch = useDispatch();

  const { documentsAvailable } = useSelector((state) => state.document);

  const [dataDisplayedInOptions, setDataDisplayedInOptions] = useState([]);

  useEffect(() => {
    if (payment_type == "Documento") {
      dispatch(documentStartGetDocuments(matricula));

      setDataDisplayedInOptions(
        documentsAvailable.map((doc) => ({
          name: doc.name,
          value: doc.id,
        }))
      );
    }

    if (payment_type == "Materia") {
      setDataDisplayedInOptions([
        { name: "Enero", value: "0" },
        { name: "Febrero", value: "1" },
        { name: "Marzo", value: "2" },
        { name: "Abril", value: "3" },
        { name: "Mayo", value: "4" },
        { name: "Junio", value: "5" },
        { name: "Julio", value: "6" },
        { name: "Agosto", value: "7" },
        { name: "Septiembre", value: "8" },
        { name: "Octubre", value: "9" },
        { name: "Noviembre", value: "10" },
        { name: "Diciembre", value: "11" },
      ]);
    }
  }, [payment_type]);

  // useEffect(() => {
  //     if (payment_type !== null) {
  //         if (thingToPay !== null ) {
  //             console.log("caca", thingToPay)
  //             dispatch(payStartGetPrice(payment_type, thingToPay.value));
  //         }
  //     }
  // }, [ thingToPay]);

  useEffect(() => {
    if (payment_type === "Inscripción") {
      dispatch(payStartGetPrice(payment_type, null));
    }
  }, [payment_type]);

  const getPrice = (valueOptionSelected) => {
    console.log("caca", valueOptionSelected);
    if (payment_type == "Materia")
      setFieldValue("start_date", valueOptionSelected);
    if (payment_type == "Documento")
      setFieldValue("document_type", valueOptionSelected);
    dispatch(payStartGetPrice(payment_type, valueOptionSelected));
  };

  return (
    <>
      {payment_type !== null &&
        payment_type !== "Inscripción" &&
        thingToPay === null && (
          <div className="makeAPay__body__container__cosaAPagar">
            <label className="makeAPay__body__container__cosaAPagar__searchBar">
              <Field
                className="makeAPay__body__container__cosaAPagar__searchBar__input"
                type="text"
                placeholder="Buscar"
                name="search"
              />
              <i className="fa-solid fa-search" />
            </label>

            <div className="makeAPay__body__container__cosaAPagar__items">
              {dataDisplayedInOptions
                .filter((item) => isACoincidenceAssing(item, search))
                .map((item, index) => (
                  <label
                    key={item.value}
                    className={`makeAPay__body__container__cosaAPagar__items__item ${
                      thingToPay == item.value ? "selected" : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="thingToPay"
                      value={item.name}
                      onClick={() => getPrice(item.value)}
                    />
                    {item.name}
                  </label>
                ))}
            </div>
          </div>
        )}
    </>
  );
};

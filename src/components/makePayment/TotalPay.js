import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { payStartGetPrice } from "../../actions/pay";

export const TotalPay = (activeClassName) => {

  const { method, totalPayMoney, idPayment } = useSelector(state => state.pay);
 
  const dispatch = useDispatch()
  const handleClickTotal = () => {
    console.log("idPayment", idPayment)
    !idPayment && dispatch(payStartGetPrice());
  }

  return (
    <div className={`make__total btn-blue ${ activeClassName} `}>
      <button className={`make__total-pay btn-blue getPay ${!method && 'ui__disabledEffect totalPay '}`} onClick={handleClickTotal}>Total de pago</button>
      {totalPayMoney && (
        <span className="make__total-quantity"> $ {totalPayMoney}.00</span>
      )}
    </div>
  );
}
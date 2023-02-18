export const PaySubmit = ({ onCancel, cancel, isValid }) => {
  return (
    <div className="makeAPay__body__container__pay">
      {cancel && (
        <button className="btn-cancelPay " type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}

      <button type="submit" className={`btn btn-bluePay active`}>
        Pagar
      </button>
    </div>
  );
};

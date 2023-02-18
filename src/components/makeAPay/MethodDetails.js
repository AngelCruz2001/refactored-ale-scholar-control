import { Field } from "formik";
import { useSelector } from "react-redux";

export const MethodDetails = ({ payment_method }) => {
  const { cards } = useSelector((state) => state.pay);
  return (
    <>
      {payment_method === "Depósito" && (
        <div className="makeAPay__body__container__deposit">
          <Field as="select" name="id_card">
            
            <option value="" disabled defaultValue>Selecciona una tarjeta</option>
            {cards.map((card) => (
              <option key={card.card_number} value={card.id_card}>
                {card.card_number}
              </option>
            ))}
          </Field>
        </div>
      )}

      {payment_method === "Tarjeta" && (
        <div className="makeAPay__body__container__card">
          <p className="title">Pago por terminal</p>
        </div>
      )}
    </>
  );
};

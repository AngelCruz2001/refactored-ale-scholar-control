import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paySetActiveAccount } from '../../actions/pay';
import { Separator } from '../ui/Separator'

export const PayCard = () => {
    const dispatch = useDispatch()
    const { ui, pay } = useSelector(state => state);
    const { cards } = pay;
    const { loadingCards } = ui;
    const data = cards[0];
    useEffect(() => {
        dispatch(paySetActiveAccount(data.id_card))
    }, [dispatch])
    return (
        <div className="make__card">
            <h5>Información bancaria</h5>
            {
                loadingCards ?
                    <h4>Cargando</h4>
                    :
                    <>
                        <p>{data.id_card}</p>
                        <p>{data.bank}</p>
                        <p>{data.owner}</p>
                    </>
            }
            <Separator />
        </div>
    )
}

export const PayDeposit = () => {
    const { cards } = useSelector(state => state.pay);
    const dispatch = useDispatch()
    const handleAccountOptionClick = ({ target }) => dispatch(paySetActiveAccount(target.value)) //target.value == id_card

    return (
        <>
            <div className="make__account">
                <select defaultValue="Seleccione..." onChange={handleAccountOptionClick} name="account">
                    <option value="Seleccione..." disabled>Seleccione una cuenta...</option>
                    {cards.map(({ id_card, card_number, bank }) =>
                        <option key={id_card} value={id_card}>{`${card_number} - ${bank}`}</option>
                    )}
                </select>
                <div className="iconContainer">
                    <i className="fas fa-chevron-circle-down"></i>
                </div>

            </div>
            <Separator />
        </>
    )
}
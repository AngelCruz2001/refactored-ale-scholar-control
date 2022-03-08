import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { documentSetDocument } from '../../actions/document'
import { uiSetCurrent } from '../../actions/ui'

export const RadioButtonListDocument = ({
    activeClassName,
    text,
    currentNumber,
}) => {
    const { ui, document } = useSelector(state => state)
    // documentsAvailable.length > 0 ?  
    const { idDocument, documentsAvailable } = document;
    const { loading } = ui;
    const dispatch = useDispatch();
    const onChangeValueDocument = ({ target }) => {
        dispatch(uiSetCurrent(currentNumber))
        dispatch(documentSetDocument(parseInt(target.id)))
    }
    
    return (
        <div className={"radioButtonList son ".concat(activeClassName)}>
            <p className="general__titleSection">{text}</p>
            <div className={"radioButtonList__container son"} onChange={onChangeValueDocument}>
                {
                    !loading ?
                        documentsAvailable.map(({ id, name }) => (
                            <div className="pretty-radio" key={id}>
                                <input type="radio" className="radio" name="document" id={id} checked={idDocument == id} onChange={onChangeValueDocument} />
                                <span className="radio-look"></span>
                                <span>{name}</span>
                            </div>
                        ))
                        :
                        <p>Cargando</p>
                }
            </div>
        </div>
    )
}

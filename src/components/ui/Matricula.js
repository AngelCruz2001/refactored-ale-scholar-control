import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { studentStartGetStudentByMatricula } from '../../actions/student';
import { uiSetCurrent } from '../../actions/ui';
import { typesRegex } from '../../types/typesValidators';

export const Matricula = ({
    activeClassName,
    payment
}) => {
    const dispatch = useDispatch()
    const {matricula} = useSelector(state => state.student)
    useEffect(() => {
        setComponentMatricula(matricula)
    }, [matricula])
    const [componentMatricula, setComponentMatricula] = useState(matricula || '')
    const handleMatriculaChange = ({ target }) => {
        setComponentMatricula(target.value);
        if (target.value.match(typesRegex.matricula)) {
            dispatch(uiSetCurrent(1))
            dispatch(studentStartGetStudentByMatricula(target.value))
        } else {
            dispatch(uiSetCurrent(0))
        }

    }

    return (

        <div style={{ marginTop: payment && "1rem" }} className="matri__container">
            <label className="general__titleSection matri__label" htmlFor="matricula">Matrícula</label>
            <input className={activeClassName} value={componentMatricula} onChange={handleMatriculaChange} placeholder="0000000000000" maxLength="13" id="matricula" name="matricula" />
        </div>

    )
}

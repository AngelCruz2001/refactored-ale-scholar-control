import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiSetCurrent } from '../../actions/ui';

export const StudentInformation = ({
    activeClassName = '',
    loading = false,
    studentInformation = { headers: [], data: [] },
    isStudentShowed = true,
}) => {
    const dispatch = useDispatch()
    const { headers, data } = studentInformation;
    useEffect(() => {
        if (!loading && activeClassName === 'activeGuide') {
            dispatch(uiSetCurrent(2));
        }
    }, [loading, dispatch])
    return (
        <div className={`stuInfo son ${activeClassName}`}>
            {isStudentShowed && <p className="general__titleSection">Información del alumno</p>}

            <div className="stuInfo__container son">

                {loading ?
                    <p>Cargando</p>
                    :
                    (activeClassName === '') &&
                    <div className="stuInfo__container__containerTwo">
                        {
                            headers.map((header, index) => (
                                <div className="stuInfo__container__containerTwo__row" key={index}>
                                    <div className="stuInfo__container__containerTwo__row__header">
                                        <p className="stuInfo__name">{header}:</p>
                                    </div>
                                    <div className="stuInfo__container__containerTwo__row__info">
                                        {data[index]}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                }

            </div>


        </div>
    )
}

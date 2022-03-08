import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Separator } from '../ui/Separator';
import { Matricula } from '../ui/Matricula';

export const StudentInfo = () => {
    const { active } = useSelector(state => state.pay);
    const { loading, correct } = useSelector(state => state.ui);
    console.log(correct)
    return (
        <>
            <Matricula />
            <Separator />
            <div className="make__studentInformation">
                <p className="make__subTitleSection">Información del alumno</p>
                <div className="data">
                    {
                        correct === null ?
                            <div style={{ height: '100.8px' }}></div>
                            :
                            correct
                                ?
                                <>
                                    {
                                        loading
                                            ?
                                            <div style={{ height: '100.8px' }}>
                                                <h3>Cargando</h3>
                                            </div>
                                            :
                                            active ?
                                                <>
                                                    <p>Alumno: {active.student_fullname}</p>
                                                    <p>Grupo: {active.name_group}</p>
                                                    <p>Campus: {active.campus_name}</p>
                                                </>
                                                :
                                                <div style={{ height: '100.8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <h4>No existe esa Matricula</h4>
                                                </div>
                                    }
                                </>
                                :
                                <div style={{ height: '100.8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h4>Matricula no valida</h4>
                                </div>
                    }
                </div>
            </div>
            <Separator />
        </>
    )
}

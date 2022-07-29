import React from 'react'
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import * as Yup from 'yup';
import { Field, Form, Formik, useFormik } from 'formik';
import { DataList } from './DataList';
import { BackButton } from '../ui/BackButton';
import { useIrregularStudents } from '../../hooks/useIrregularStudents';
import { useDispatch } from 'react-redux';
import { studentStartAssignATest, studentStartMoveStudentGroup } from '../../actions/student';
import { useState } from 'react';
import { useEffect } from 'react';

const headers = [
    {
        title: "Nombre del alumno",
        textAlign: 'left'
    },
    {
        title: "Matricula",
        textAlign: 'center'
    },
    {
        title: "Carrera",
        textAlign: 'left'
    },
    {
        title: "Asignar",
        textAlign: 'center'
    },
    {
        title: "",
        textAlign: 'center'
    }
];

export const IrregularStudents = () => {



    const dispatch = useDispatch();
    
    const {
        dataShow,
        dataList,
        formData,
        valueSearchFilter,
        setValueSearchFilter,
        handleBack,
        isModalOpen,
        active,
        isAssingingGroup } = useIrregularStudents();

    
    return (
        <>
            {
                (active) ?
                    <Formik
                        {...formData}
                        enableReinitialize={true}
                        onSubmit={(values, { resetForm }) => {
                            isAssingingGroup ?
                                dispatch(studentStartMoveStudentGroup(active.matricula, values.id_group))
                                :
                                dispatch(studentStartAssignATest({ matricula: active.matricula, ...values }))
                            resetForm()
                        }}
                    >
                        {({ handleReset, values, setFieldValue, isValid, dirty }) => (

                            <Form
                                style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}
                            >


                                <div className='assign__container'>
                                    <div className='assign__container__header'>
                                        <BackButton handleBack={handleBack} />
                                        <h2 className='assign__container__header__title'>{`${isAssingingGroup ? 'Asignar grupo' : 'Asignar examen'} `}</h2>
                                    </div>

                                    <div className='assign__container__content'>
                                        <Searchbar placeholder="Buscar" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />

                                        <div className='assign__container__content__list scroll'>
                                            <DataList
                                                key={isAssingingGroup ? 'assignGroup' : 'assignTest'}
                                                data={dataList}
                                                type='radio'
                                                valueSearchFilter={valueSearchFilter}
                                                nameDataList={isAssingingGroup ? 'id_group' : 'id_course'}
                                            />
                                        </div>

                                        <div className='assign__container__content__submit'>
                                            {!isAssingingGroup &&
                                                <div className='assign__container__content__submit__dateInput'>
                                                    <label htmlFor="end_date">Fecha de aplicación</label>
                                                    <Field name='application_date' type="date" />
                                                </div>
                                            }

                                            <button disabled={!isValid || !dirty} className={`btn btnAssignGroup ${(isValid && dirty) ? '' : 'disableGuide'}`} type='submit'>Aceptar</button>
                                        </div>

                                    </div>
                                </div>

                            </Form>
                        )}

                    </Formik >
                    :
                    <div className={`gra__container ${isModalOpen && 'modal-active'}`} >
                        <Searchbar placeholder="Buscar por nombre, matrícula o grupo del estudiante" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />
                        <h4 className="general__title-h4">Todos los alumnos irregulares</h4>
                        <Table
                            headers={headers}
                            data={dataShow}
                            sizesColumns={[30, 15, 30, 12.5, 12.5]}
                        />
                    </div>
            }
        </>
    )
}

import { Field, Form, Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { groupsClearActiveCourse, groupsClearActiveGroup, groupsSetActiveCourse, groupsStartGetAllGroups, groupsStartGetCoursesByGroup, groupsStartGetCoursesCouldTakeByGroup, groupsStartRelateGroupCourse } from '../../actions/groups';
import { teachersStartGetTeachers } from '../../actions/teachers';
import { uiSetModalClose, uiSetModalOpen } from '../../actions/ui';
import { buildDataGroupOrganization, buildDataStudents } from '../../helpers/buildDataTables';
import { isACoincidenceSearch } from '../../helpers/isACoincidence';
import { Assign } from '../irregularStudents/Assign';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import * as Yup from 'yup';
import { DataList } from '../irregularStudents/DataList';
import { BackButton } from '../ui/BackButton';



const headers = [{
    title: "Nombre del grupo",
    textAlign: 'left'
},
{
    title: "Carrera",
    textAlign: 'center'
},
{
    title: "Campus",
    textAlign: 'center'
},
{
    title: "Asignar",
    textAlign: 'center'
},
];


export const GroupsOrganization = () => {

    const dispatch = useDispatch();
    const { groups: { data, courses, activeCourse }, ui: { loading, isModalOpen }, teachers: { teachers } } = useSelector(state => state)
    const [dataList, setDataList] = useState([])
    const [isActiveCourse, setIsActiveCourse] = useState(activeCourse ? true : false);
    const [allowToSubmit, setAllowToSubmit] = useState(false)

    useEffect(() => {
        dispatch(groupsStartGetAllGroups())
        dispatch(teachersStartGetTeachers())
    }, [])

    useEffect(() => {
        setIsActiveCourse(activeCourse ? true : false)
        if (activeCourse) {
            setIsActiveCourse(true)
            dispatch(uiSetModalOpen())
        } else {
            dispatch(uiSetModalClose())
            setIsActiveCourse(false)
            setAllowToSubmit(false)
        }
    }, [activeCourse])

    const handleAssignCourse = (id_group) => {
        dispatch(groupsSetActiveCourse(id_group))
        dispatch(groupsStartGetCoursesCouldTakeByGroup(id_group));
    }

    useEffect(() => {
        setDataList(courses.map(({ id_course, course_name }) => ({ value: id_course, label: course_name })))
    }, [courses]);

    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })
    const [dataShow, setDataShow] = useState([])

    const handleBack = () => {
        dispatch(groupsClearActiveGroup());
    }

    const generateData = () => {
        const dataToShow = [];
        const { searchWord } = valueSearchFilter;
        data.forEach(({ id_group, group_name, major_name, campus_name }) => {
            const coincidence = isACoincidenceSearch([group_name, major_name, campus_name], searchWord)
            const dataBuilded = buildDataGroupOrganization(id_group, group_name, major_name, campus_name, handleAssignCourse, coincidence)
            if (searchWord === '') {
                dataToShow.push(dataBuilded)
            } else if (coincidence.includes(true)) {
                dataToShow.push(dataBuilded)
            }
        });

        setDataShow(dataToShow)
    }

    useEffect(() => {
        generateData()
    }, [data, loading, valueSearchFilter])

    const initialData = {
        id_teacher: '',
        start_date: '',
        id_course: '',
        end_date: ''
    }


    const [formData, setFormData] = useState(initialData)



    console.log(dataList)


    const ExtraCampus = () => (

        <Formik
            initialValues={{
                id_teacher: '',
                start_date: '',
                id_course: '',
                end_date: ''
            }}
            enableReinitialize={true}
            validationSchema={
                Yup.object({
                    id_teacher: Yup.string().required('El profesor es requerido'),
                    id_course: Yup.number().required('El curso es requerido'),
                    start_date: Yup.date().required('La fecha de inicio es requerida'),
                    end_date: Yup.date().required('La fecha de finalización es requerida')

                })}
            onSubmit={(values, { resetForm }) => {
                dispatch(groupsStartRelateGroupCourse(values))
                // resetForm()
            }
            }
        >

            {({ handleReset, values, setFieldValue, isValid }) => (
                <Form
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}
                >

                    <div className='assign__container'>

                        <div className='assign__container__header'>
                            <BackButton handleBack={handleBack} />
                            <h2 className='assign__container__header__title'>Asignar curso</h2>
                        </div>

                        <div className='assign__container__content'>
                            <Searchbar placeholder="Buscar" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />

                            <div className='assign__container__content__list scroll'>
                                <DataList
                                    data={dataList}
                                    type='radio'
                                    valueSearchFilter={valueSearchFilter}
                                    nameDataList={'id_course'}
                                />
                            </div>

                            <div className='assign__container__content__submit'>
                                <div className='assign__container__content__submit__select'>
                                    <label htmlFor="">Seleccionar un maestro</label>

                                    <Field name='id_teacher' as='select'>
                                        <option hidden defaultValue>Seleccione una opción</option>
                                        {teachers.map((teacher) => (
                                            <option key={teacher.id_teacher} value={teacher.id_teacher}>{teacher.teacher_name}</option>
                                        ))}
                                    </Field>

                                </div>
                                <div className='assign__container__content__submit__dateInput'>
                                    <label htmlFor="start_date">Fecha de inicio</label>
                                    <Field name='start_date' type="date" />
                                </div>

                                <div className='assign__container__content__submit__dateInput'>
                                    <label htmlFor="end_date">Fecha de termino</label>
                                    <Field name='end_date' type="date" />
                                </div>

                                <button className={`btn btnAssignGroup `} type='submit'>Aceptar</button>
                            </div>
                        </div>
                    </div>

                </Form>
            )}

        </Formik>

    )

    return (
        <>
            {

                (isActiveCourse) ?

                    // <Assign
                    //     handleBack={handleBack}
                    //     dataList={dataList}
                    //     title={'Asignar curso'}
                    //     allowToSubmit={allowToSubmit}
                    //     // handleInputChange={handleInputChange}
                    //     nameDataList={'id_course'}
                    //     ExtraCampus={ExtraCampus}

                    //     type={'radio'}
                    // />
                    <ExtraCampus />

                    : <div className={`gra__container ${isModalOpen && 'modal-active'}`} >
                        <Searchbar placeholder="Buscar por nombre, carrera, campus" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />
                        <h4 className="general__title-h4">Todos los grupos</h4>
                        <Table
                            headers={headers}
                            data={dataShow}
                            sizesColumns={[25, 35, 25, 15]}
                        />
                    </div>
            }

        </>
    )
}

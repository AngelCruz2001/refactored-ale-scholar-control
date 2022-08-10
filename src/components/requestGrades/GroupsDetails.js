import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { groupsClearActiveGroup, groupsGetStudentAndGradesGroup, groupsSetActiveCourse, groupsStartDeleteGroupCourse, groupsStartUpdateGrade } from '../../actions/groups'
import { buildDataCoursesStudents, buildDataGroupsDetails } from '../../helpers/buildDataTables'
import { StudentInformation } from '../ui/StudentInformation'
import { Table } from '../ui/Table'

let headers = [
    {
        title: "Materias",
        textAlign: 'left'
    },
    {
        title: "Docente",
        textAlign: 'left'
    },
    {
        title: "Clave",
        textAlign: 'center'
    },

    {
        title: "Ver",
        textAlign: 'center'
    },
    {
        title: "Eliminar",
        textAlign: 'center'
    }
];


export const GroupsDetails = ({ dataGroup, setIsGroupActive }) => {

    const dispatch = useDispatch();
    const { groups: { activeGroup, activeCourse, coursesByGroup, courses }, ui: { loading } } = useSelector(state => state)
    const [isActiveCourse, setIsActiveCourse] = useState(false)
    const [dataShow, setDataShow] = useState([]);

    // console.log('activeGroup', dataGroup)

    const handleDelete = (id_course) => {
        dispatch(groupsStartDeleteGroupCourse(id_course, dataGroup.id_group))
    }

    const handleClickSeeCourse = (id_course) => {
        setIsActiveCourse(true)
        console.log(courses.find(course => course.id_course === id_course))
        dispatch(groupsSetActiveCourse(courses.find(course => course.id_course === id_course)))
        dispatch(groupsGetStudentAndGradesGroup(id_course, dataGroup.id_group))
    }

    const handleEditGrade = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Cambiar calificación',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(groupsStartUpdateGrade(id, result.value))
                // YA ES GRUPOS. 
                console.log("caca")
            }


        })
    }

    const generateData = () => {
        console.log(activeGroup, isActiveCourse, activeCourse)
        let dataToShow;
        if (isActiveCourse) {
            dataToShow = activeCourse.grades.map(({ id_grade, student_name, matricula, grade }) => buildDataCoursesStudents(
                id_grade,
                student_name,
                matricula,
                grade,
                handleEditGrade
            ))
        } else {
            dataToShow = courses?.map(({ id_course, course_name, clave, teacher_name }) => buildDataGroupsDetails(
                id_course,
                course_name,
                teacher_name,
                clave,
                handleClickSeeCourse,
                handleDelete))
        }
        setDataShow(
            dataToShow
        )
    }

    useLayoutEffect(() => {
        !loading && generateData()
    }, [loading,courses])



    const dataInformation = isActiveCourse
        ? {
            headers: ['MATERIA', 'CLAVE', 'GRUPO', 'CAMPUS', 'CARRERA'],
            data: [
                activeCourse.course_name,
                activeCourse.clave,
                dataGroup.group_name,
                dataGroup.campus_name,
                dataGroup.major_name,
            ]
        }
        : {
            headers: ['GRUPO', 'CARRERA', 'CAMPUS'],
            data: [
                dataGroup.group_name,
                dataGroup.major_name,
                dataGroup.campus_name,
            ]
        };
    const handleBack = () => {
        setIsGroupActive(false)
        dispatch(groupsClearActiveGroup())
    }

    return (
        <>
            <div className='gra__container__details'>
                <div className="gra__container__details__headers">
                    <div className='gra__container__details__headers__searchAndBack'>
                        <button className="btn btn__back" onClick={handleBack}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
                <div className="gra__container__details__informationStudent">
                    <StudentInformation
                        title='Información del grupo'
                        studentInformation={dataInformation}
                    />
                </div>
                <div className="gra__container__details__table">
                    <Table
                        headers={!isActiveCourse ? headers : [
                            {
                                title: "Estudiante",
                                textAlign: "center",
                            },
                            {
                                title: "Matricula",
                                textAlign: "center",
                            },
                            {
                                title: "Promedio",
                                textAlign: "center",
                            },
                            {
                                title: "Editar",
                                textAlign: "center",
                            },
                            {
                                title: "",
                                textAlign: "center",
                            },

                        ]}
                        data={dataShow}
                        sizesColumns={isActiveCourse ? [40, 40,  10, 10] : [40, 30, 10, 10, 10]}
                    />
                </div>
            </div>
        </>
    )
}

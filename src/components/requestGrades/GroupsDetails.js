import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { gradesStartUpdateGrade } from '../../actions/grades'
import { groupsClearActiveGroup, groupsGetStudentAndGradesGroup, groupsSetActiveCourse } from '../../actions/groups'
import { buildDataCoursesStudents, buildDataGroupsDetails } from '../../helpers/buildDataTables'
import { StudentInformation } from '../ui/StudentInformation'
import { Table } from '../ui/Table'

const headers = [
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
    }];


export const GroupsDetails = ({ dataGroup, setIsGroupActive }) => {

    const dispatch = useDispatch();
    const { groups: { activeGroup, activeCourse, coursesByGroup, courses }, ui: { loading } } = useSelector(state => state)
    const [isActiveCourse, setIsActiveCourse] = useState(false)
    const [dataShow, setDataShow] = useState([]);

    // console.log('activeGroup', dataGroup)

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
            confirmButtonText: 'Look up',
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(gradesStartUpdateGrade(id, result.value))
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
                handleClickSeeCourse))
        }
        setDataShow(
            dataToShow
        )
    }

    useLayoutEffect(() => {
        !loading && generateData()
    }, [loading])

    // useEffect(() => {
    //     isActiveCourse && dispatch(groupsGetStudentAndGradesGroup(activeCourse.id_course, activeGroup.id_group))
    // }, [activeCourse])

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
                        headers={headers}
                        data={dataShow}
                        sizesColumns={[40, 40, 10, 10]}
                    />
                </div>
            </div>
        </>
    )
}

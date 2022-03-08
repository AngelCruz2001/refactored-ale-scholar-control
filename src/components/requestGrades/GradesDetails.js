import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { gradesStartGetGradesByMatricula, gradesStartUpdateGrade } from '../../actions/grades'
import { buildDataGradesDetail } from '../../helpers/buildDataTables'
import { isACoincidenceDate, isACoincidenceSearch } from '../../helpers/isACoincidence'
import { Filters } from '../ui/Filters'
import { Searchbar } from '../ui/Searchbar'
import { StudentInformation } from '../ui/StudentInformation'
import { Table } from '../ui/Table'

const headers = [
    {
        title: "Materia",
        textAlign: 'left'
    },
    {
        title: "Profesor",
        textAlign: 'left'
    },
    {
        title: "Fecha de impartición",
        textAlign: 'center'
    },
    {
        title: "Calificación",
        textAlign: 'center'
    },
    {
        title: "",
        textAlign: 'center'
    }];
export const GradesDetails = ({ dataStudent, setIsAStudentActive, allowEdit }) => {
    const dispatch = useDispatch();
    const { grades, ui } = useSelector(state => state)
    const { loading } = ui;
    const { activeStudentGrade } = grades;
    const [dataShow, setDataShow] = useState([]);
    useEffect(() => {
        dispatch(gradesStartGetGradesByMatricula(dataStudent.matricula))
    }, [])

    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '', dateSearch: { month: '', year: '' } })

    const dataInformation = {
        headers: ['alumno', 'matricula', 'grupo', 'campus', 'carrera'],
        data: [
            dataStudent.student_name,
            dataStudent.matricula,
            dataStudent.group_name,
            dataStudent.campus_name,
            dataStudent.major_name,
        ]
    };

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
        const dataToShow = [];
        const { searchWord, dateSearch } = valueSearchFilter;
        const { month, year } = dateSearch;

        activeStudentGrade.forEach(({ id_grade, course, grade, teacher, date }) => {
            const coincidenceInDate = isACoincidenceDate(date.split(','), dateSearch);
            const coincidenceInSearch = isACoincidenceSearch([course, teacher, grade], searchWord)
            const dataBuilded = buildDataGradesDetail(id_grade, course, teacher, date, grade, [...coincidenceInSearch, coincidenceInDate], true, handleEditGrade);
            const hasDateSearchValue = (month === '' && year === '') ? false : true;
            const hasSearchWordValue = searchWord === '' ? false : true;
            if (!hasSearchWordValue && !hasDateSearchValue) return dataToShow.push(dataBuilded);
            if (hasSearchWordValue && (coincidenceInSearch.includes(true))
                && (coincidenceInDate || !hasDateSearchValue)) return dataToShow.push(dataBuilded);
            if (coincidenceInDate && !hasSearchWordValue) return dataToShow.push(dataBuilded);
        });
        setDataShow(dataToShow)
    }

    useLayoutEffect(() => {
        if (activeStudentGrade.length !== 0) generateData();
        console.log(activeStudentGrade)
    }, [loading, valueSearchFilter, activeStudentGrade])

    return (
        <>
            <div className='gra__container__details'>
                <div className="gra__container__details__headers">
                    <div className='gra__container__details__headers__searchAndBack'>
                        <button className="btn btn__back" onClick={() => setIsAStudentActive(false)}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <Searchbar placeholder="Buscar por nombre de materia" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />
                    </div>
                    <Filters setValueSearchFilter={setValueSearchFilter} returnDay={false} />
                </div>
                <div className="gra__container__details__informationStudent">
                    <StudentInformation
                        studentInformation={dataInformation}
                    />
                </div>
                <div className="gra__container__details__table">
                    <Table
                        headers={headers}
                        data={dataShow}
                        sizesColumns={[30, 30, 20, 10, 10]}
                    />
                </div>
            </div>
        </>
    )
}

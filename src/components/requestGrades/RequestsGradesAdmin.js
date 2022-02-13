import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gradesStartGetGrades } from '../../actions/grades';
import { buildDataGrades } from '../../helpers/buildDataTables';
import { isACoincidenceSearch } from '../../helpers/isACoincidence';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import { GradesDetails } from './GradesDetails';

export const RequestGradesAdmin = () => {
    const headers = [{
        title: "Nombre del alumno",
        textAlign: 'left'
    },
    {
        title: "Matricula",
        textAlign: 'center'
    },
    {
        title: "Grupo",
        textAlign: 'center'
    },
    {
        title: "Carrera",
        textAlign: 'left'
    },
    {
        title: "Ver",
        textAlign: 'center'
    }];
    useEffect(() => {
        dispatch(gradesStartGetGrades())
    }, [])
    const dispatch = useDispatch();
    const { grades, ui, student } = useSelector(state => state)
    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })
    const [isAStudentActive, setIsAStudentActive] = useState(false);
    const [dataStudent, setDataStudent] = useState({});
    const [dataShow, setDataShow] = useState([])
    const { loading } = ui;

    const handleClickSetActiveStudent = (data) => {
        setIsAStudentActive(true);
        setDataStudent(data);
        // dispatch(gradesStartGetGrades)
    }

    const generateData = () => {
        const dataToShow = [];
        const { searchWord } = valueSearchFilter;
        grades.data.forEach(({ id_student, student_name, matricula, group_name, major_name, campus_name }) => {
            const coincidence = isACoincidenceSearch([student_name, matricula, group_name, major_name], searchWord)
            const dataBuilded = buildDataGrades(id_student, student_name, matricula, group_name, major_name, campus_name, handleClickSetActiveStudent, coincidence)
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
    }, [loading, valueSearchFilter])
    return (
        <>
            {
                isAStudentActive ?

                    <GradesDetails
                        setIsAStudentActive={setIsAStudentActive}
                        dataStudent={dataStudent}
                    />
                    :
                    < div className="gra__container" >
                        <Searchbar placeholder="Buscar por nombre, matrícula o grupo del estudiante" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />
                        <h4>Todos los alumnos</h4>
                        <Table
                            headers={headers}
                            data={dataShow}
                            sizesColumns={[29, 15, 15, 35, 7]}
                        />
                    </div >
            }
        </>
    )
}

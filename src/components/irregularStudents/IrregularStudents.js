import React, { useEffect, useState } from 'react';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import { buildDataStudents } from '../../helpers/buildDataTables';
import { isACoincidenceSearch } from '../../helpers/isACoincidence';
import { useDispatch, useSelector } from 'react-redux';
import { studentStartGetIrregularStudents } from '../../actions/student';
import { uiSetModalOpen } from '../../actions/ui';
import { Assign } from './Assign';

const headers = [{
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
    title: "",
    textAlign: 'center'
},
{
    title: "",
    textAlign: 'center'
}
];

export const IrregularStudents = () => {

    const dispatch = useDispatch();
    const [groups, setGroups] = useState(false)


    const handleClick = (matricula) => {
        console.log(matricula)
        dispatch(uiSetModalOpen());
        setGroups(!groups)
    }






    useEffect(() => {
        dispatch(studentStartGetIrregularStudents())
    }, [])

    const { student: { irregularStudents }, ui: { loading, isModalOpen } } = useSelector(state => state)
    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })
    const [dataShow, setDataShow] = useState([])


    const generateData = () => {
        const dataToShow = [];
        const { searchWord } = valueSearchFilter;
        irregularStudents.forEach(({ id_student, student_name, matricula, major_name }) => {
            const coincidence = isACoincidenceSearch([student_name, matricula, major_name], searchWord)
            const dataBuilded = buildDataStudents(id_student, student_name, matricula, major_name, handleClick, coincidence)
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
                (groups) ?
                    <Assign handleBack={handleClick} />
                    : <div className={`gra__container ${isModalOpen && 'modal-active'}`} >
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

import React, { useEffect, useState } from 'react';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import { buildDataStudents } from '../../helpers/buildDataTables';
import { isACoincidenceSearch } from '../../helpers/isACoincidence';
import { useDispatch, useSelector } from 'react-redux';
import { studentStartGetIrregularStudents } from '../../actions/student';
import { uiSetModalOpen } from '../../actions/ui';
import { Assign } from './Assign';
import { majorsStartGetgroupsFromAMajor } from '../../actions/majors';

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

    const [isActiveStudent, setIsActiveStudent] = useState(false);

    const {
        student: { irregularStudents },
        ui: { loading, isModalOpen },
        majors: { groupsData }
    } = useSelector(state => state);

    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })

    const [dataShow, setDataShow] = useState([])

    const [student, setStudent] = useState({});

    const [dataList, setDataList] = useState([]);
    const handleBack = () => {
        setIsActiveStudent(!isActiveStudent);
        dispatch(uiSetModalOpen());
    }

    const handleAssignGroup = (matricula, id_major) => {
        handleBack();
        dispatch(majorsStartGetgroupsFromAMajor(id_major));
        setStudent({ matricula, id_major });
    }

    const handleAssignTest = (matricula) => {
        console.log(matricula);
        dispatch(uiSetModalOpen());
    }

    useEffect(() => {
        dispatch(studentStartGetIrregularStudents())
    }, [])

    const generateDataList = () => groupsData.map(group => ({ value: group.id_group, label: group.group_name }))

    useEffect(() => {
        setDataList(generateDataList());
        console.log(dataList);
    }, [groupsData])


    const generateData = () => {
        const dataToShow = [];
        const { searchWord } = valueSearchFilter;
        irregularStudents.forEach(({ id_student, student_name, matricula, major_name, id_major }) => {
            const coincidence = isACoincidenceSearch([student_name, matricula, major_name], searchWord)
            const dataBuilded = buildDataStudents(id_student, student_name, matricula, major_name, id_major, handleAssignGroup, handleAssignTest, coincidence)
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
                (isActiveStudent) ?
                    <Assign
                        handleBack={handleBack}
                        data={dataList}
                    />
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

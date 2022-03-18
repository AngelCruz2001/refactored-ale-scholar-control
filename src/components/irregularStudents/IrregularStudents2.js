import React, { useEffect, useState } from 'react';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import { buildDataStudents } from '../../helpers/buildDataTables';
import { isACoincidenceSearch } from '../../helpers/isACoincidence';
import { useDispatch, useSelector } from 'react-redux';
import { studentStartGetIrregularStudents, studentStartMoveStudentGroup } from '../../actions/student';
import { uiSetModalOpen } from '../../actions/ui';
import { Assign } from './Assign';
import { majorsStartGetgroupsFromAMajor } from '../../actions/majors';
import { teachersStartGetTeachers } from '../../actions/teachers';

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

    const [isActiveStudent, setIsActiveStudent] = useState(false);
    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })

    const {
        student: { irregularStudents },
        ui: { loading, isModalOpen },
        majors: { groupsData },
        teachers: { teachers }
    } = useSelector(state => state);

    const [dataAssign, setDataAssign] = useState({
        section: '',
        title: '',
        dataList: [],
        student: [],
        isActiveStudent: false,
        dataShow: [],
        initialValues: {
        }
    });


    useEffect(() => {
        dispatch(studentStartGetIrregularStudents())
        dispatch(teachersStartGetTeachers())
    }, [])

    const handleBack = () => {
        dispatch(uiSetModalOpen());
        setDataAssign(prev => ({ ...prev, isActiveStudent: !prev.isActiveStudent }));
    }

    const handleSubmit = (values) => {
        console.log(values)
        setDataAssign(prev => ({ ...prev, student: { ...prev.student, ...values } }))
        dispatch(studentStartMoveStudentGroup({ ...dataAssign.student, ...values }));
        handleBack();
    }

    const handleAssignGroup = (matricula, id_major) => {
        dispatch(majorsStartGetgroupsFromAMajor(id_major));
        setDataAssign(prev => ({ ...prev, section: 'assignGroup', student: { matricula } }))
        handleBack();
    }

    const handleAssignTest = (matricula) => {
        console.log(matricula);
        setDataAssign(prev => ({ ...prev, section: 'assignTest', student: { matricula } }))
        handleBack();
    }

    const generateDataListGroups = () => groupsData.map(group => ({ value: group.id_group, label: group.group_name }))

    useEffect(() => {
        setDataAssign(prev => ({ ...prev, dataList: generateDataList() }));
        // console.log(dataList);
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
        setDataAssign(prev => ({ ...prev, dataShow: dataToShow }));
    }

    useEffect(() => {
        generateData()
    }, [loading, dataAssign.valueSearchFilter])

    return (
        <>
            {
                (dataAssign.isActiveStudent) ?
                    <Assign
                        dataAssign={dataAssign}
                        handleBack={handleBack}
                        selectData={teachers.map(teacher => ({ value: teacher.id_teacher, label: teacher.teacher_name }))}
                        handleSubmit={handleSubmit}
                        nameSelect='id_teacher'
                    />
                    : <div className={`gra__container ${isModalOpen && 'modal-active'}`} >
                        <Searchbar placeholder="Buscar por nombre, matrícula o grupo del estudiante" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />
                        <h4 className="general__title-h4">Todos los alumnos irregulares</h4>
                        <Table
                            headers={headers}
                            data={dataAssign.dataShow}
                            sizesColumns={[30, 15, 30, 12.5, 12.5]}
                        />
                    </div>
            }
        </>
    )
}

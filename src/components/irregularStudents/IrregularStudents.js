import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { majorsStartGetgroupsFromAMajor } from '../../actions/majors';
import { studentClearIrregularActive, studentSetActive, studentSetIrregularActive, studentStartAssignATest, studentStartGetIrregularStudents, studentStartMoveStudentGroup } from '../../actions/student';
import { teachersStartGetTeachers } from '../../actions/teachers';
import { uiSetModalClose, uiSetModalOpen } from '../../actions/ui';
import { buildDataStudents } from '../../helpers/buildDataTables';
import { isACoincidenceSearch } from '../../helpers/isACoincidence';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
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

    useEffect(() => {
        dispatch(studentStartGetIrregularStudents())
        dispatch(teachersStartGetTeachers())
    }, [])

    const {
        student: { irregularStudents },
        ui: { loading, isModalOpen },
        majors: { groupsData },
        teachers: { teachers }
    } = useSelector(state => state);

    const { data, active } = irregularStudents;
    const [isActiveStudent, setIsActiveStudent] = useState(active ? true : false);

    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })

    const [dataShow, setDataShow] = useState([])

    const [dataList, setDataList] = useState([])

    const [isAssingingGroup, setIsAssingingGroup] = useState([])

    const initialData = isAssingingGroup ? {
        id_group: '',
    } : {
        id_teacher: '',
        application_date: '',
    }

    const [allowToSubmit, setAllowToSubmit] = useState(false)

    const [formData, setFormData] = useState(initialData)


    const handleSubmit = (values) => {
        if (isAssingingGroup) {
            values.id_group && dispatch(studentStartMoveStudentGroup(values.id_group))
        } else {
            values.id_teacher && values.application_date && dispatch(studentStartAssignATest(values.id_course, values.application_date))
        }
    }

    useEffect(() => {
        setIsActiveStudent(active ? true : false)
    }, [active])


    useEffect(() => {
        console.log("🚀 ~ file: IrregularStudents.js ~ line 83 ~ useEffect ~ isActiveStudent", isActiveStudent)
        if (isActiveStudent) {
            dispatch(uiSetModalOpen())
            setIsActiveStudent(true)
        } else {
            dispatch(uiSetModalClose())
            setIsActiveStudent(false)
            setFormData(initialData)
            setAllowToSubmit(false)
        }
    }, [isActiveStudent])


    const handleAssignGroup = (matricula) => {
        const currentStudent = data.find(student => student.matricula === matricula);
        dispatch(majorsStartGetgroupsFromAMajor(currentStudent.id_major));
        dispatch(studentSetIrregularActive(currentStudent));
        // dispatch(uiSetModalOpen())
        setIsAssingingGroup(true)
    }

    const handleAssignTest = (matricula) => {
        // dispatch(uiSetModalOpen())
        dispatch(studentSetIrregularActive(data.find(student => student.matricula === matricula)));
        setIsAssingingGroup(false)
        console.log(data)
    }

    const handleBack = () => {
        dispatch(studentClearIrregularActive());
    }

    const generateDataListGroups = () => groupsData.map(group => ({ value: group.id_group, label: group.group_name }))

    useEffect(() => {
        !isAssingingGroup && setDataList(generateDataListGroups())
        isAssingingGroup && setDataList(groupsData.map(group => ({ value: group.id_group, label: group.group_name })))
    }, [isAssingingGroup])



    const generateData = () => {
        const dataToShow = [];
        const { searchWord } = valueSearchFilter;
        data.forEach(({ id_student, student_name, matricula, major_name, id_major }) => {
            const coincidence = isACoincidenceSearch([student_name, matricula, major_name], searchWord)
            const dataBuilded = buildDataStudents(id_student, student_name, matricula, major_name, id_major, handleAssignGroup, handleAssignTest, coincidence)
            if (searchWord === '') {
                dataToShow.push(dataBuilded)
            } else if (coincidence.includes(true)) {
                dataToShow.push(dataBuilded)
            }
        });
        setDataShow(dataToShow);
    }

    const handleInputChange = ({ target }) => {
        const preValues = { ...formData, [target.name]: target.value }
        setFormData(prev => ({ ...prev, [target.name]: target.value }))
        setAllowToSubmit(
            isAssingingGroup ?
                preValues.id_group !== '' :
                preValues.id_teacher !== '' && preValues.application_date !== ''
        )
        console.log(
            isAssingingGroup ?
                preValues.id_group !== '' :
                preValues.id_teacher !== '' && preValues.application_date !== ''
        )
        console.log(preValues)
    }


    useEffect(() => {
        generateData()
    }, [loading, valueSearchFilter])


    const ExtraCampus = () => {
        return (
            <>
                {!isAssingingGroup &&
                    <div className='assign__container__content__submit__dateInput'>
                        <label htmlFor="application_date">Fecha de Aplicación</label>
                        <input onChange={handleInputChange} name='application_date' type="date" value={formData.application_date} />
                    </div>}
            </>

            // <>
            //     <div className='assign__container__content__submit__select'>
            //         <label htmlFor="">Seleccionar un maestro</label>

            //         <select name={'id_teacher'} >
            //             <option hidden defaultValue>Seleccione una opción</option>
            //             {teachers.map((teacher) => (
            //                 <option key={teacher.id_teacher} value={teacher.id_teacher}>{teacher.teacher_name}</option>
            //             ))}
            //         </select>
            //     </div>

            //     <div className='assign__container__content__submit__dateInput'>
            //         <label htmlFor="start_date">Fecha de inicio</label>
            //         <input onChange={handleInputChange} name='start_date' type="date" />
            //     </div>
            //     <div className='assign__container__content__submit__dateInput'>
            //         <label htmlFor="end_date">Fecha de termino</label>
            //         <input onChange={handleInputChange} name='end_date' type="date" />
            //     </div>
            // </>

        )
    }

    return (
        <>
            {
                (active) ?
                    <Assign
                        handleBack={handleBack}
                        handleSubmit={handleSubmit}
                        ExtraCampus={ExtraCampus}
                        dataList={dataList}
                        title={isAssingingGroup ? 'Asignar grupo' : 'Asignar examen'}
                        type="radio"
                        handleInputChange={handleInputChange}
                        allowToSubmit={allowToSubmit}
                        nameDataList={isAssingingGroup ? 'id_group' : 'id_course'}
                    />
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

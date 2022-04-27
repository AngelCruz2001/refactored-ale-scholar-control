import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { majorsStartGetgroupsFromAMajor } from '../actions/majors';
import { studentClearIrregularActive, studentSetIrregularActive, studentStartAssignATest, studentStartGetIrregularStudents, studentStartMoveStudentGroup, studentsStartGetTestsStudent } from '../actions/student';
import { uiSetModalClose, uiSetModalOpen } from '../actions/ui';
import { buildDataStudents } from '../helpers/buildDataTables';
import { isACoincidenceSearch } from '../helpers/isACoincidence';

import * as Yup from 'yup';

export const useIrregularStudents = () => {

    const {
        student: { irregularStudents: { data, active, availableTests } },
        ui: { loading, isModalOpen },
        majors: { groupsData },
        teachers: { teachers }
    } = useSelector(state => state);

    const dispatch = useDispatch();

    const [dataShow, setDataShow] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [formData, setFormData] = useState({
        initialValues: {},
        validationSchema: {}
    })
    const [isAssingingGroup, setIsAssingingGroup] = useState([]);


    useEffect(() => {
        setFormData(
            isAssingingGroup ? {
                initialValues: {
                    id_group: ''
                },
                validationSchema: Yup.object({
                    id_group: Yup.string().required('El grupo es requerido')
                })
            } : {
                initialValues: {
                    id_course: '',
                    application_date: ''
                },
                validationSchema: Yup.object({
                    id_course: Yup.string().required('El curso es requerido'),
                    application_date: Yup.string().required('La fecha de aplicación es requerida')
                })
            }
        )
    }, [isAssingingGroup]);




    useEffect(() => {
        dispatch(studentStartGetIrregularStudents());
    }, [])

    useEffect(() => {
        if (active) {
            dispatch(uiSetModalOpen())
        } else {
            dispatch(uiSetModalClose())
            // setFormData(initialData)
            // setAllowToSubmit(false)
        }
    }, [active])

    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' });

    const handleAssignGroup = (matricula) => {
        const currentStudent = data.find(student => student.matricula === matricula);
        dispatch(majorsStartGetgroupsFromAMajor(currentStudent.id_major));
        dispatch(studentSetIrregularActive(currentStudent)); // Find all the occurrences
        setIsAssingingGroup(true)
    }

    const handleAssignTest = (matricula) => {
        setIsAssingingGroup(false)
        dispatch(studentsStartGetTestsStudent(matricula));
        dispatch(studentSetIrregularActive(data.find(student => student.matricula === matricula)));
    }

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


    useEffect(() => {
        generateData()
    }, [data, loading, valueSearchFilter])


    const handleBack = () => {
        dispatch(studentClearIrregularActive());
    }

    useEffect(() => {
        // setDataList([])
        isAssingingGroup
            ? setDataList(groupsData.map(group => ({ value: group.id_group, label: group.group_name })))
            : setDataList(availableTests.map(test => ({ value: test.id_course, label: test.course_name })))
    }, [isAssingingGroup, groupsData])

    return ({
        dataShow,
        dataList,
        formData,
        valueSearchFilter,
        setValueSearchFilter,
        handleBack,
        isModalOpen,
        active,
        isAssingingGroup
    })


}

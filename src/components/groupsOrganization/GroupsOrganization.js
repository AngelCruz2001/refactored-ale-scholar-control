import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { groupsClearActiveCourse, groupsClearActiveGroup, groupsSetActiveCourse, groupsStartGetAllGroups, groupsStartGetCoursesByGroup, groupsStartRelateGroupCourse } from '../../actions/groups';
import { teachersStartGetTeachers } from '../../actions/teachers';
import { uiSetModalClose, uiSetModalOpen } from '../../actions/ui';
import { buildDataGroupOrganization, buildDataStudents } from '../../helpers/buildDataTables';
import { isACoincidenceSearch } from '../../helpers/isACoincidence';
import { Assign } from '../irregularStudents/Assign';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';

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
        dispatch(groupsStartGetCoursesByGroup(id_group));
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


    const handleSubmit = (values) => {
        console.log("🚀asdf", formData)
        allowToSubmit && dispatch(groupsStartRelateGroupCourse(formData))
    }


    const handleInputChange = ({ target }) => {
        const preValues = { ...formData, [target.name]: target.value }
        setFormData(prev => ({ ...prev, [target.name]: target.value }))
        console.log(preValues)
        setAllowToSubmit(
            preValues.start_date !== '' && preValues.end_date !== '' && preValues.id_teacher !== '' && preValues.id_course !== ''
        )

        console.log(preValues)
    }



    const ExtraCampus = () => (
        <>
            <div className='assign__container__content__submit__select'>
                <label htmlFor="">Seleccionar un maestro</label>

                <select name={'id_teacher'} onChange={handleInputChange} value={formData.id_teacher}>
                    <option hidden defaultValue>Seleccione una opción</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id_teacher} value={teacher.id_teacher}>{teacher.teacher_name}</option>
                    ))}
                </select>
            </div>
            <div className='assign__container__content__submit__dateInput'>
                <label htmlFor="start_date">Fecha de inicio</label>
                <input onChange={handleInputChange} value={formData.start_date} name='start_date' type="date" />
            </div>
            <div className='assign__container__content__submit__dateInput'>
                <label htmlFor="end_date">Fecha de termino</label>
                <input onChange={handleInputChange} value={formData.end_date} name='end_date' type="date" />
            </div>
        </>
    )

    return (
        <>
            {

                (isActiveCourse) ?

                    <Assign
                        handleBack={handleBack}
                        dataList={dataList}
                        title={'Asignar curso'}
                        allowToSubmit={allowToSubmit}
                        handleInputChange={handleInputChange}
                        nameDataList={'id_course'}
                        ExtraCampus={ExtraCampus}
                        handleSubmit={handleSubmit}
                        type={'radio'}
                    />

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

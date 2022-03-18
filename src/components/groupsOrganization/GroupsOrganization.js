import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { groupsStartGetAllGroups } from '../../actions/groups';
import { teachersStartGetTeachers } from '../../actions/teachers';
import { uiSetModalOpen } from '../../actions/ui';
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
{
    title: "",
    textAlign: 'center'
}
];
export const GroupsOrganization = () => {

    const dispatch = useDispatch();
    const [courses, setCourses] = useState(false)

    useEffect(() => {
        dispatch(groupsStartGetAllGroups())
        dispatch(teachersStartGetTeachers())
    }, [])

    const handleClick = (id_group) => {
        console.log(id_group)
        dispatch(uiSetModalOpen());
        setCourses(!courses)
    }

    const { groups: { data }, ui: { loading, isModalOpen } } = useSelector(state => state)
    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })
    const [dataShow, setDataShow] = useState([])



    const generateData = () => {
        const dataToShow = [];
        const { searchWord } = valueSearchFilter;
        data.forEach(({ id_group, group_name, major_name, campus_name }) => {
            const coincidence = isACoincidenceSearch([group_name, major_name, campus_name], searchWord)
            const dataBuilded = buildDataGroupOrganization(id_group, group_name, major_name, campus_name, handleClick, coincidence)
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
                (courses) ?
                    <Assign handleBack={handleClick} />
                    : <div className={`gra__container ${isModalOpen && 'modal-active'}`} >
                        <Searchbar placeholder="Buscar por nombre, carrera, campus" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />
                        <h4 className="general__title-h4">Todos los grupos</h4>
                        <Table
                            headers={headers}
                            data={dataShow}
                            sizesColumns={[25, 30, 20, 12.5, 12.5]}
                        />
                    </div>
            }

        </>
    )
}

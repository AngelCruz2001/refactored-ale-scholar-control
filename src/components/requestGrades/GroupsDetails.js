import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buildDataGroupsDetails } from '../../helpers/buildDataTables'
// import { isACoincidenceDate, isACoincidenceSearch } from '../../helpers/isACoincidence'
// import { Filters } from '../ui/Filters'
// import { Searchbar } from '../ui/Searchbar'
import { StudentInformation } from '../ui/StudentInformation'
import { Table } from '../ui/Table'

const headers = [
    {
        title: "Materias",
        textAlign: 'left'
    },
    {
        title: "Clave",
        textAlign: 'left'
    },

    {
        title: "Docente",
        textAlign: 'center'
    },
    {
        title: "Ver",
        textAlign: 'center'
    }];
export const GroupsDetails = ({ dataGroup, setIsAGroupActive }) => {

    const dispatch = useDispatch();
    const { groups, ui } = useSelector(state => state)
    const { loading } = ui;
    const { activeGroup } = groups;
    const [dataShow, setDataShow] = useState([]);

    const handleClickSeeGroup = (id_group) => {
        console.log(id_group)
        console.log("asdfasdfdsafasdfsdaf")
    }

    const dataInformation = {
        headers: ['GRUPO', 'CARRERA', 'CAMPUS'],
        data: [
            dataGroup.group_name,
            dataGroup.major_name,
            dataGroup.campus_name,
        ]
    };

    const generateData = () => {
        activeGroup.length > 0 && setDataShow(
            activeGroup.coursesTaken.forEach(({ data }) => buildDataGroupsDetails(...data, handleClickSeeGroup))
        );

    }


    useLayoutEffect(() => {
        generateData();
    }, [loading])



    return (
        <>
            <div className='gra__container__details'>
                <div className="gra__container__details__headers">
                    <div className='gra__container__details__headers__searchAndBack'>
                        <button className="btn btn__back" onClick={() => setIsAGroupActive(false)}>
                            <i className="fas fa-arrow-left"></i>
                        </button>

                    </div>
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
                        sizesColumns={[35, 35, 20, 10]}
                    />
                </div>
            </div>
        </>
    )
}

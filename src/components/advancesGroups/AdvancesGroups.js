import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { majorsStartGetGroupsById, majorsStartGetMajors } from '../../actions/majors';
import { GroupsTable } from './GroupsTable';

export const AdvancesGroups = () => {
    const { majors } = useSelector(state => state)
    const { data, groupsData } = majors
    const [groups, setGroups] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(majorsStartGetMajors());
    }, [])

    const handleMajor = ({ id_major = false }) => {
        setGroups(!groups);
        if (id_major) {
            dispatch(majorsStartGetGroupsById(id_major))
        }
    }

    
    return (
        <>

            {
                groups ?
                    <GroupsTable handleBack={handleMajor} data={groupsData} /> :

                    <div className='advance-groups__container scroll'>
                        {data.map(({ major_name, id_major }) => (
                            <div key={major_name} className='advance-groups__container__card' onClick={() => handleMajor(id_major)}>
                                <img src='./images/tigreblanco.png' alt="Logo Alejandría" />
                                <h2>{major_name}</h2>
                            </div>
                        ))}
                    </div>
            }
        </>

    )
}

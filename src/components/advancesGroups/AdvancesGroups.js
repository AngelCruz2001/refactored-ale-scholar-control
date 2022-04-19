import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { majorsStartGetGroupsById, majorsStartGetMajors } from '../../actions/majors';
import { GroupsTable } from './GroupsTable';

export const AdvancesGroups = () => {
    const { majors } = useSelector(state => state)
    const { data } = majors
    const [groups, setGroups] = useState(false)
    const dispatch = useDispatch()
    const [majorName, setMajorName] = useState('No se encontraron grupos')
    useEffect(() => {
        dispatch(majorsStartGetMajors());
    }, [])


    const handleback = () => {
        setGroups(!groups);
    }

    const handleMajor = ( id_major, major_name) => {
        setGroups(!groups);
        setMajorName(major_name)
        dispatch(majorsStartGetGroupsById(id_major))
    }

    return (
        <>
            {
                groups ?
                    <GroupsTable handleBack={handleback} majorName={majorName}  /> :
                    <div className='advance-groups__container scroll'>
                        {data.map(({ major_name, id_major }) => (
                            <div key={major_name} className='advance-groups__container__card' onClick={() => handleMajor(id_major, major_name)}>
                                <img src='./images/tigreblanco.png' alt="Logo Alejandría" />
                                <h2>{major_name}</h2>
                            </div>
                        ))}
                    </div>
            }
        </>

    )
}

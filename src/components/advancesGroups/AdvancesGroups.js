import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { majorsStartGetMajors } from '../../actions/majors';

export const AdvancesGroups = () => {
    const { majors: { data } } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(majorsStartGetMajors());
    }, [])

    return (
        <div className='advance-groups__container scroll'>
            {data.map(({ major_name, id_major }) => (
                <div key={major_name} className='advance-groups__container__card'>
                    <img src='./images/tigreblanco.png' alt="Logo Alejandría" />
                    <h2>{major_name}</h2>
                </div>
            ))}
        </div>

    )
}

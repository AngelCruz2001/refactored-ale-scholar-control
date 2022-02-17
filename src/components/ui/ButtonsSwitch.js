import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const ButtonsSwitch = ({
    names,
    paths = ['', ''],
    handleSwitchData,
}) => {



    const [firstName, secondName] = names;
    return (
        <div className="switch__container">
            <NavLink to={paths[0]} name={firstName} className="switch__container_NavLink" activeClassName='active' onClick={() => handleSwitchData(firstName)}>{firstName}</NavLink>
            <NavLink to={paths[1]} name={secondName} className="switch__container_button" activeClassName='active' onClick={() => handleSwitchData(secondName)}>{secondName}</NavLink>
        </div>
    )
}

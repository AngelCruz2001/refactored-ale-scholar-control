import React from 'react';

export const Searchbar = ({ placeholder, setValueSearchFilter, searchWord }) => {
    const handleInputChange = ({ target }) => {
        setValueSearchFilter(prev => ({ ...prev, searchWord: target.value }));
    }
    return (
        <div className="sea__container">
            <i className="fas fa-search"></i>
            <input type="sea__container__input" value={searchWord} onChange={handleInputChange} placeholder={placeholder} />
        </div>

    )
}

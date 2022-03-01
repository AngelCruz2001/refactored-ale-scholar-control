import React from 'react'

export const InputTable = (
    { value }
) => {
    const handleChange = (e) => {
        value(e.target.value)
        
    }

    return (
        <input
            onChange={handleChange}
            value={value}
            name="input"
            type="text"
            style={
                {
                    border: 'none',
                    height: '100%',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '2rem',
                    backgroundColor: 'transparent',
                    fontFamily: 'Segoe UI',
                    userSelect: 'none',
                    outline: 'none',
                    MozUserSelect: 'none',
                    WebkitUserSelect: 'none',
                    msUserSelect: 'none',
                    MozUserFocus: 'none',
                    MozUserModify: 'read-only',
                }
            }
        />
    )
}

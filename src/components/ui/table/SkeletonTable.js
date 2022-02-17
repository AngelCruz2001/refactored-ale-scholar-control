import React from 'react';

export const SkeletonTable = ({ headers, sizesColumns, isEmpty = false }) => {
    return (
        <>
            <div className={`table__headers ${isEmpty && 'empty__body'}`}>
                {
                    headers.map(({ title, textAlign }, index) => (
                        <div className="table__headers__cell" style={{ width: `${sizesColumns[index]}%`, textAlign: `${textAlign}` }} key={index}>{title}</div>
                    ))
                }
            </div>
            <div className={`table__body scroll ${isEmpty && 'empty__body'}`}>
                {
                    new Array(7).fill(0).map(({ }, index) => (
                        <div className={`table__body__row noselect ${!isEmpty && 'skeleton__row'}`} key={index}>
                            {
                                headers.map((header, index) => (
                                    <div className={`table__body__row__cell ${!isEmpty && 'skeleton__cell'}`} key={index} style={{ color: 'transparent', width: `${sizesColumns[index]}%`, justifyContent: `${headers[index].textAlign}`, textAlign: `${headers[index].textAlign}` }}>
                                        .
                                    </div>
                                ))
                            }
                        </div>
                    ))}
            </div>
        </>
    )
}

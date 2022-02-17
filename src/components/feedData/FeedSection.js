import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { buildData } from '../../helpers/buildData';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import { FormContainer } from './forms/FormContainer';
export const FeedSection = ({ dataSection }) => {

    const { data } = useSelector(state => state.feed);
    const [dataTable, setDataTable] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    const {
        headers,
        nameSection,
        placeholder,
        sizesColumn,
        orderTable,
        campusTable,
        classNameIconAdd,
        form
    } = dataSection;

    const handleIsAdding = () => {
        setIsAdding(!isAdding)
    }

    useEffect(() => {
        setDataTable(buildData(data, orderTable, campusTable));
        console.log("Cargo")
    }, [data])


    if (isAdding) return (
        <FormContainer
            dataSection={dataSection}
            handleIsAdding={handleIsAdding}
            dataForm={form}
        />
    );

    return (
        <>
            <div className='feed__headers'>
                <Searchbar
                    placeholder={placeholder}
                />
                <button className='btn btn__add feed__headers__addButton' onClick={handleIsAdding}>
                    <i className={`fas ${classNameIconAdd}`}></i>
                    <span>Agregar nuevo</span>
                </button>
            </div>
            <div className='feed__body'>
                <div className='feed__body__title'>
                    <h4 className="">Registro de {nameSection}</h4>
                </div>
                <div className='feed__body__content'>
                    <Table
                        headers={headers}
                        data={dataTable}
                        sizesColumns={sizesColumn}
                    />
                </div>
            </div>
        </>
    )
}

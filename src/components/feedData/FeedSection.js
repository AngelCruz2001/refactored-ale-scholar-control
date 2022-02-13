import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { feedStartGetData } from '../../actions/feed';
import { useBuildData } from '../../hooks/useBuildData';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import dataSections from './dataSections.json';
export const FeedSection = () => {

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.feed);
    const { name } = useParams();
    const history = useHistory();
    const [dataSection, setDataSection] = useState({})
    const {
        headers,
        endpoint,
        nameSection,
        placeholder,
        sizesColumn,
        dataEndpointName,
        orderTable,
        campusTable
         } = dataSection;
        
    const [dataTable] = useBuildData(data, orderTable, campusTable);

    useEffect(() => {
        if (name === undefined) {
            history.push('/captura_de_datos/alumnos')
        } else {
            const data = dataSections[name];
            dispatch(feedStartGetData(data.endpoint, data.dataEndpointName))
            setDataSection(data)
        }
    }, [])

    return (
        <>
            <div className='feed__headers'>
                <Searchbar
                    placeholder={placeholder}
                />
                <button className='btn btn__add feed__headers__addButton'>
                    <i className='fas fa-plus-circle'></i>
                    <span>Agregar nuevo</span>
                </button>
            </div>
            <div className='feed__body'>
                <div className='feed__body__title'>
                    <p className="">Registro de {nameSection}</p>
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

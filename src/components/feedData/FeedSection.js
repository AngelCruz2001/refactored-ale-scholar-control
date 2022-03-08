import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feedClearActive, feedSetIsAdding, feedStartGetSelectsData } from '../../actions/feed';
import { useBuildData } from '../../helpers/buildData';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import { FormContainer } from './forms/FormContainer';
export const FeedSection = ({ dataSection }) => {
    const dispatch = useDispatch();
    const { data, active, dataSelects, isAdding } = useSelector(state => state.feed);

    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' });
    const dataTable = useBuildData(data, dataSection, valueSearchFilter.searchWord);

    useEffect(() => {
        if (active) {
            dispatch(feedSetIsAdding(true));
        }
    }, [active])

    useEffect(() => {
        dispatch(feedClearActive());
        dispatch(feedSetIsAdding(false));
        console.log(dataSection.formsSelectsDataEndpoint)
        dataSection.formsSelectsDataEndpoint &&
            dispatch(feedStartGetSelectsData(dataSection.formsSelectsDataEndpoint))
    }, [])

    const handleIsAdding = () => {
        dispatch(feedSetIsAdding(!isAdding))
    }

    if (isAdding) return (
        <FormContainer
            dataSection={dataSection}
            handleIsAdding={handleIsAdding}
            dataForm={dataSection.form}
            active={active}
            dataSelects={dataSelects} 
        />
    );

    return (
        <>
            <div className='feed__headers'>
                {/* <Searchbar
                    placeholder={dataSection.placeholder}
                    setValueSearchFilter={setValueSearchFilter}
                    searchWord={valueSearchFilter.searchWord}
                /> */}
                <button className='btn btn__add feed__headers__addButton' onClick={handleIsAdding}>
                    <i className={`fas ${dataSection.classNameIconAdd}`}></i>
                    <span>Agregar {`${dataSection.genderOfSection ? 'nueva' : 'nuevo'}`}</span>
                </button>
            </div>
            <div className='feed__body'>
                <div className='feed__body__title'>
                    <h4 className="">Registro de {dataSection.nameSection}</h4>
                </div>
                <div className='feed__body__content'>
                    <Table
                        headers={dataSection.headers}
                        data={dataTable}
                        sizesColumns={dataSection.sizesColumn}
                    />
                </div>
            </div>
        </>
    )
}

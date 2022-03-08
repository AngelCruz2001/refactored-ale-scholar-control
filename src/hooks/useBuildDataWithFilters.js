import { useState } from 'react';
import { buildData } from '../helpers/buildDataTables';
import { isACoincidenceDate, isACoincidenceSearch } from '../helpers/isACoincidence';

export const useBuildDataWithFiltersRequest = (
    requests,
    handleCancelClick,
    valueSearchFilter
) => {
    const [dataToShow, setDataToShow] = useState([])

    const { searchWord, dateSearch } = valueSearchFilter; //word: "asdf",. date: {day: "23", month: "", year: ""}
    const { day, month, year } = dateSearch;

    const generateDataToShow = () => {
        const dataToShow = [];
        const hasDateSearchValue = (day === '' && month === '' && year === '') ? false : true;
        const hasSearchWordValue = searchWord === '' ? false : true; 

        requests.data.forEach((request) => {

            const {
                id_request,
                student_name,
                matricula,
                creation_date,
                document_name,
            } = request;

            const coincidenceInDate = isACoincidenceDate(creation_date.split(','), dateSearch);
            const coincidenceInSearch = isACoincidenceSearch([student_name, matricula, document_name], searchWord);
            const dataBuilded = buildData(id_request, student_name, matricula, creation_date, document_name, 3, handleCancelClick, [...coincidenceInSearch, coincidenceInDate]);
            if (!hasSearchWordValue && !hasDateSearchValue) return dataToShow.push(dataBuilded);

            if (hasSearchWordValue && (coincidenceInSearch.includes(true))
                && (coincidenceInDate || !hasDateSearchValue)) return dataToShow.push(dataBuilded);
            if (coincidenceInDate && !hasSearchWordValue) return dataToShow.push(dataBuilded);
        });
        setDataToShow(dataToShow);
    }


    return [dataToShow, generateDataToShow];
}
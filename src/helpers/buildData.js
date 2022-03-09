import { useDispatch } from "react-redux";
import { feedSetActive, feedStartDeleteData } from "../actions/feed";
import { ButtonTable } from "../components/ui/table/ButtonTable";
import { isACoincidenceSearchTuneado, isACoincidenceSpecificWord } from "./isACoincidence";

export const useBuildData = (data, dataSection, wordToSearch) => {

    const dispatch = useDispatch();

    const {
        orderTable,
        campusTable,
        nameId,
        endpoint,
        columsToSearch
    } = dataSection;
    const editElement = (id) => {
        dispatch(feedSetActive(id));
    }
    const deleteElement = (id) => {
        console.log(id)
        dispatch(feedStartDeleteData(endpoint, id));
    }


    const dataTable = [];
    data.forEach((dataElement, index) => {
        let coincidences = [];
        const data = campusTable.map((elementName, index) => {
            if (columsToSearch && !columsToSearch.includes(elementName)) return generateElement(orderTable[index], dataElement[elementName], dataElement[nameId], editElement, deleteElement, false);
            const coincidence = isACoincidenceSpecificWord(dataElement[elementName], wordToSearch);
            coincidences.push(coincidence)
            if (coincidence === null) return generateElement(orderTable[index], dataElement[elementName], dataElement[nameId], editElement, deleteElement, false)

            if (coincidence) return generateElement(orderTable[index], dataElement[elementName], dataElement[nameId], editElement, deleteElement, true)

            return generateElement(orderTable[index], dataElement[elementName], dataElement[nameId], editElement, deleteElement, false);
        })
        if (coincidences.includes(true) || wordToSearch === '') dataTable.push(data)
        else dataTable.push(null);
    })

    return dataTable.filter(data => data !== null);
}


const generateElement = (typeOfElement, infoForElement, id, editElement, deleteElement, searched) => {
    switch (typeOfElement) {
        case 'text':
            return { element: <p>{infoForElement}</p>, searched: searched }
        case 'button':
            return { element: <ButtonTable type={7} id={id} onClick={editElement} onClick2={deleteElement} />, searched: false }
        case 'buttonSee':
            return { element: <ButtonTable type={0} id={id} onClick={editElement} onClick2={deleteElement} />, searched: false }
        default:
            return { element: <p>default</p>, searched: false }
    }
}
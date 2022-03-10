import { useDispatch } from "react-redux";
import { feedSetActive, feedSetActiveGroup, feedStartDeleteData } from "../actions/feed";
import { ButtonTable } from "../components/ui/table/ButtonTable";
import { isACoincidenceSearchTuneado, isACoincidenceSpecificWord } from "./isACoincidence";
import { useHistory } from "react-router-dom";

export const useBuildData = (data, dataSection, wordToSearch) => {
    let history = useHistory();

    const dispatch = useDispatch();

    const {
        orderTable,
        campusTable,
        nameId,
        endpoint,
        columsToSearch
    } = dataSection;




    const dataTable = [];
    data.forEach((dataElement, index) => {
        let coincidences = [];
        const data = campusTable.map((elementName, index) => {

            const coincidence = isACoincidenceSpecificWord(dataElement[elementName], wordToSearch);

            coincidences.push(coincidence)

            const element = generateElement(orderTable[index], dataElement[elementName],
                dataElement[nameId], coincidence, dispatch, endpoint, history);

            if (columsToSearch && !columsToSearch.includes(elementName)) return element;

            if (coincidence === null) return element;

            return element;
        })

        if (coincidences.includes(true) || wordToSearch === '') dataTable.push(data)

        else dataTable.push(null);
    })

    return dataTable.filter(data => data !== null);
}


const generateElement = (typeOfElement, infoForElement, id, searched = false, dispatch, endpoint, history) => {


    const editElement = (id) => {
        dispatch(feedSetActive(id));
    }
    const deleteElement = (id) => {
        console.log(id)
        dispatch(feedStartDeleteData(endpoint, id));
    }

    const seeElement = (id) => {
        dispatch(feedSetActiveGroup(id))
        history.push("/captura_de_datos/alumnos");
    }

    switch (typeOfElement) {
        case 'text':
            return { element: <p>{infoForElement}</p>, searched: searched }
        case 'button':
            return { element: <ButtonTable type={7} id={id} onClick={editElement} onClick2={deleteElement} />, searched: false }
        case 'buttonSee':
            return { element: <ButtonTable type={8} id={id} onClick={seeElement} onClick2={deleteElement} />, searched: false }
        default:
            return { element: <p>default</p>, searched: false }
    }
}
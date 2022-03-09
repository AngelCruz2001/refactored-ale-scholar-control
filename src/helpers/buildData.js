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




    const dataTable = [];
    data.forEach((dataElement, index) => {
        let coincidences = [];
        const data = campusTable.map((elementName, index) => {

            if (columsToSearch && !columsToSearch.includes(elementName)) return element;
            const coincidence = isACoincidenceSpecificWord(dataElement[elementName], wordToSearch);

            coincidences.push(coincidence)

            const element = generateElement(orderTable[index], dataElement[elementName],
                dataElement[nameId], coincidence, dispatch);

            if (coincidence === null) return element;

            return element;
        })

        if (coincidences.includes(true) || wordToSearch === '') dataTable.push(data)

        else dataTable.push(null);
    })

    return dataTable.filter(data => data !== null);
}


const generateElement = (typeOfElement, infoForElement, id, searched = false, dispatch) => {


    const editElement = (id) => {
        dispatch(feedSetActive(id));
    }
    const deleteElement = (id) => {
        console.log(id)
        dispatch(feedStartDeleteData(endpoint, id));
    }

    const seeElement = (id) => {
        console.log(id)
        // TODO: Dispath que guarde el grupo seleccionado. 
        // Redux comparar el id del grupo con el id del grupo seleccionado para saber el grupo. 
        // TODO: Ya teniendo el nombre del grupo, guardarlo en un active. 
        // TODO: Renderizar el componente de los alumnos, con el grupo seleccionado como active en la busqueda.

    }

    switch (typeOfElement) {
        case 'text':
            return { element: <p>{infoForElement}</p>, searched: searched }
        case 'button':
            return { element: <ButtonTable type={7} id={id} onClick={editElement} onClick2={deleteElement} />, searched: false }
        case 'buttonSee':
            return { element: <ButtonTable type={0} id={id} onClick={seeElement} onClick2={deleteElement} />, searched: false }
        default:
            return { element: <p>default</p>, searched: false }
    }
}
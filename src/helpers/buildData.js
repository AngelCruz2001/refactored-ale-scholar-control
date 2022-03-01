import { useDispatch } from "react-redux";
import { feedSetActive, feedStartDeleteData } from "../actions/feed";
import { ButtonTable } from "../components/ui/table/ButtonTable";

export const useBuildData = (data, dataSection) => {

    const dispatch = useDispatch();

    const {
        orderTable,
        campusTable,
        nameId,
        endpoint
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
        dataTable.push(campusTable.map((elementName, index) => (
            generateElement(orderTable[index], dataElement[elementName], dataElement[nameId], editElement, deleteElement)
        )))
    });

    return dataTable
}


const generateElement = (typeOfElement, infoForElement, id, editElement, deleteElement) => {
    switch (typeOfElement) {
        case 'text':
            return { element: <p>{infoForElement}</p>, coincidence: false }
        case 'button':
            return { element: <ButtonTable type={7} id={id} onClick={editElement} onClick2={deleteElement} />, coincidence: false }
        case 'buttonSee':
            return { element: <ButtonTable type={0} id={id} onClick={editElement} onClick2={deleteElement} />, coincidence: false }
        default:
            return { element: <p>default</p>, coincidence: false }
    }
}
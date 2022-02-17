import { ButtonTable } from "../components/ui/table/ButtonTable";

export const buildData = (data, orderTable, campusTable) => {

    const dataTable = [];
    data.forEach((dataElement, index) => {
        dataTable.push(campusTable.map((elementName, index) => (
            generateElement(orderTable[index], dataElement[elementName])
        )))
    });
    return dataTable
}

const generateElement = (typeOfElement, infoForElement) => {
    switch (typeOfElement) {
        case 'text':
            return { element: <p>{infoForElement}</p>, coincidence: false }
        case 'button':
            return { element: <ButtonTable type={7} />, coincidence: false }
        default:
            return { element: <p>default</p>, coincidence: false }
    } 
}
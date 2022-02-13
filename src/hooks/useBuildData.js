
export const useBuildData = (data, orderTable, campusTable) => {

    const dataTable = [];
    data.forEach((dataElement, index) => {
        dataTable.push(campusTable.map((elementName, index) => {
            return generateElement(orderTable[index], dataElement[elementName]);
        }))
    });

    return [dataTable]
}

const generateElement = (typeOfElement, infoForElement) => {
    switch (typeOfElement) {
        case 'text':
            return { element: <p>{infoForElement}</p>, coincidence: false }
        case 'button':
            return { element: <p>bUTTON</p>, coincidence: false }
    }
}
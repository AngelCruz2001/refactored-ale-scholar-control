
export const runFunctionsTable = (nameFunction) => {
    switch (nameFunction) {
        case 'buildData':
            return buildDataTable;
        case 'generateElement':
            return generateElementTable;
        default:
            return null;
    }
}

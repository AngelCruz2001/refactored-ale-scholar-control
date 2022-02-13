export const isACoincidenceDate = (creationDateSplit, { day, month, year }) => {
    const searchDate = [...day !== '' ? [day] : [], ...month !== '' ? [month] : [], ...year !== '' ? [year] : [],]
    const isInTheArray = searchDate.filter((item) => ((creationDateSplit.includes(item))));
    return isInTheArray.length === searchDate.length && searchDate.length > 0 && true;
}

export const isACoincidenceSearch = (data = [], wordToSearch) => {
    const coincidence = [];
    for (let i = 0; i < data.length; i++) {
        if ((data[i]).toString().match(RegExp(wordToSearch, 'gi')) && wordToSearch !== '') coincidence.push(true)
        else coincidence.push(false)
    }
    return coincidence;
}


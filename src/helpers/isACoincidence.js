export const isACoincidenceDate = (creationDateSplit, { day, month, year }) => {
    const searchDate = [...day !== '' ? [day] : [], ...month !== '' ? [month] : [], ...year !== '' ? [year] : [],]
    const isInTheArray = searchDate.filter((item) => ((creationDateSplit.includes(item))));
    return isInTheArray.length === searchDate.length && searchDate.length > 0 && true;
}

export const isACoincidenceSearch = (data = [], wordToSearch) => {
    const coincidence = [];
    for (let i = 0; i < data.length; i++) {
        try {
            if ((data[i]).toString().match(RegExp(wordToSearch, 'gi')) && wordToSearch !== '') coincidence.push(true)
            else coincidence.push(false)
        } catch (error) {
            console.log(error)
            console.log(data)
        }

    }
    return coincidence;
}

export const isACoincidenceSpecificWord = (searchIn, wordToSearch) => {

    if (wordToSearch === '') return null;
    if (searchIn == undefined) return null;
    let coincidence;
    try {
        coincidence = searchIn.toString().match(RegExp(wordToSearch, 'gi')) ? true : false;
    } catch (error) {
        coincidence = null;
    }
    return coincidence;
}

export const isACoincidenceAssing = (searchIn, wordToSearch) => {

    if (wordToSearch === '') return true;
    if (searchIn == undefined) return null;
    let coincidence;
    try {
        coincidence = searchIn.toString().match(RegExp(wordToSearch, 'gi')) ? true : false;
    } catch (error) {
        coincidence = null;
    }
    return coincidence;
}

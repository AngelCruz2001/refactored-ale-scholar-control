
export const activeDisabled = (item, current) => {

    if (item > current) {
        return 'disabledGuide'
    }

    if (item < current) {
        return ''
    }

    if (item === current) {
        return 'activeGuide'
    }
}

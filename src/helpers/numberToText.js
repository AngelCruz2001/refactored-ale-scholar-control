import conversor from 'conversor-numero-a-letras-es-ar';

export const numberToText = (number) => {
    let conversorClass = conversor.conversorNumerosALetras;
    let conversorObject = new conversorClass();
    return conversorObject.convertToText(number);
}

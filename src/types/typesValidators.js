export const typesRegex = {
    matricula: new RegExp('(([A-Z]){4})+([0-9]{9})'), //DEDG202103002
}

export const typesRegexInputs = {
    numbers: /^[0-9]+$/,
    matricula: /^[A-Z]{4}[0-9]{9}$/,
}

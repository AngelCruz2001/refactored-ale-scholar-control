export const typesRegex = {
    matricula: new RegExp('(([A-Z]){4})+([0-9]{9})'), //DEDG202103002
}

export const typesRegexInputs = {
    numbers: /^[0-9]+$/,
    matricula: /^[A-Z]{4}[0-9]{9}$/,
    curp: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
    rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/, 
    becaPercentage: /\d+(\\.\\d+)?%/
}

export const types = {

    authCheckingStart: '[auth] Start checking login state',
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

    uiSetError: '[UI] Set Error',
    uiSetCorrect: '[UI] Set Correct',
    uiRemoveError: '[UI] Remove Error',
    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',
    uiSetCurrent: '[UI] Set current component',
    uiIsModalOpen: '[UI]Change modal open',
    uiStartLoadingCards: '[UI] Start loading cards',
    uiFinishLoadingCards: '[UI] Finish loading cards',
    uiIsShowHistoryOpen: '[UI] Change show history open',
    uiStartLoadingDocument: '[UI] Start loading document',
    uiFinishLoadingDocument: '[UI] Finish loading document',
    uiIsSubMenuOpen: '[UI] Change show sub menu',

    studentSetActive: '[student] Set active',
    studentClearData: '[student] Clear data',

    requestSetRequests: '[request] Set requests',
    requestDeleteRequest: '[request] Delete request',

    gradesSetGrades: '[grades] Set grades',
    gradesSetSpecificGrades: '[grades] Set specific grades',

    documentSetDocument: '[document] Set Document',
    documentClearActive: '[document] Clear Active',
    documentClearData: '[document] Clear document data',
    documentSetHistory: '[document] Set History',
    documentSetDocumentsAvailable: '[UI] Set documents available',

    expenseSetTypeExpenses: '[expense] Set type expenses',
    expensesSetExpenses: '[expense] Set expenses',
    expensesSetDataInputs: '[expense] Set data inputs',
    expensesClearData: '[expense] Clear data',
    expensesSetActive: '[expense] Set active',
    expensesDeleteExpense: '[expense] Delete expense',


    paySetActive: '[pay] Set Active',
    paySetCards: '[pay] Set Cards',
    paySetPrice: '[pay] Set Price',
    payClearActive: '[pay] Clear Active',
    payConceptPay: '[pay] Concept pay',
    payMethodPay: '[pay] Method pay',
    payThingToPay: '[pay] Material to pay',
    payClearModalData: "[pay] Clear modal data",
    payAmountToPay: "[pay] Set amount paying",
    paySetActiveAccount: "[pay] Set Active Acount",
    paySetFertilizers: "[pay] Set fertilizers",
    paySetIdPayment: "[pay] Set id payment",
    paySetPayments: '[pay] Set payments',

    feedGetData: '[feed] Get data',
}

export const typesExpenses = [
    "Transporte",
    "Artículos de limpieza",
    "Artículos de oficina",
    "Servicios básicos",
    "Comida",
    "Pagos a maestros",
    "Pagos a personal adminisativo",
    "Pagos al sistema",
    "Pagos a servicios extras",
    "Pagos para evento",
]

export const typesDocuments = [
    "Constancia de estudios",
    "Constancia de estudios con calificaciones",
    "Carta maestrante",
    "Credencial",
    "Certificado de maestría",
    "Certificado de licenciatura",
    "Titulo de maestri",
    "Titulo de licenciatura",
    "Acta de examen",
    "Constancia de titulo en progreso",
]


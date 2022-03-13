import { ExpenseRecord } from '../components/expenseRecord/ExpenseRecord'
import { Feed } from '../components/feedData/Feed'
import { FertilizerPay } from '../components/fertilizerPay/FertilizerPay'
import { Documents } from '../components/generateDocument/Documents'
import { AdvancesGroups } from '../components/advancesGroups/AdvancesGroups'
import { IrregularStudents } from '../components/irregularStudents/IrregularStudents'

import { RequestDocument } from '../components/requestDocument/RequestDocument'
import { RequestGrades } from '../components/requestGrades/RequestGrades'
import { RequestGradesAdmin } from '../components/requestGrades/RequestsGradesAdmin'
import { MakeAPay } from '../components/makeAPay/MakeAPay'



export const itemsMenu = [
    {
        permissions: [
            11,
            14,
            1
        ],
        text: "Solicitud de documento",
        icon: "fas fa-file",
        css: {
            "transform": "rotate(90deg) scaleX(-1)"
        },
        path: "/solicitud_de_documento",
        component: RequestDocument,
        subMenu: [],
        name: "requestDocument"
    },
    {
        permissions: [
            11,
            14,
            1
        ],
        text: "Avances de grupos",
        icon: "fas fa-file",
        css: {
            "transform": "rotate(90deg) scaleX(-1)"
        },
        path: "/avances_de_grupo",
        component: AdvancesGroups,

        subMenu: [],
        name: "advancesGroups"
    },
    {
        permissions: [
            11,
            14,
            1
        ],
        text: "Alumnos irregulares",
        icon: "fas fa-file",
        css: {
            "transform": "rotate(90deg) scaleX(-1)"
        },
        path: "/irregular_students",
        component: IrregularStudents,

        subMenu: [],
        name: "irregularStudents"
    },
    {
        permissions: [
            11,
        ],
        text: "Consulta de calificaciones",
        icon: "fas fa-folder-open",
        css: {},
        path: "/consulta_de_calificaciones",
        component: RequestGrades,
        subMenu: [],
        name: "requestGrades"

    },
    { //ADMINISTRATIVO
        permissions: [
            2,
            3,
            4,
            1
        ],
        text: "Consulta de calificaciones",
        icon: "fas fa-folder-open",
        css: {},
        path: "/consulta_de_calificaciones",
        component: RequestGradesAdmin,
        subMenu: [],
        name: "admnistration"
    },
    {
        permissions: [
            1
        ],
        text: "Registro de gastos",
        icon: "fas fa-ticket-alt",
        css: {},
        path: "/registro_de_gastos",
        component: ExpenseRecord,
        subMenu: [],
        name: "expenseRecord"
    },
    {
        permissions: [
            1,
            2,
        ],
        text: "Realizar pago",
        icon: "fas fa-money-bill",
        css: {},
        path: "/realizar_pago",
        component: MakeAPay,
        subMenu: []
    },
    {
        permissions: [
            1,
            2,
        ],
        text: "Abonos",
        icon: "fas fa-coins",
        css: {},
        path: "/abonos",
        component: FertilizerPay,
        subMenu: []
    },
    {
        permissions: [
            1,
            2,
        ],
        text: "Generar documento",
        icon: "fas fa-file",
        css: {
        },
        path: "/generar_documento",
        component: Documents,
        subMenu: []
    },
    {
        permissions: [
            20,
            1
        ],
        name: "feed",
        text: "Captura de datos",
        icon: "fas fa-database",
        css: {
        },
        path: "/captura_de_datos",
        component: Feed,
        subMenu: [
            {
                text: "Alumnos",
                icon: "fas fa-user-graduate",
                css: {},
                path: "/captura_de_datos/alumnos",
                default: true,
            },
            {
                text: "Grupos",
                icon: "fas fa-id-badge",
                css: {},
                path: "/captura_de_datos/grupos",
            },
            {
                text: "Materias",
                icon: "fas fa-book-open",
                css: {},
                path: "/captura_de_datos/materias",
            },
            {
                text: "Carreras",
                icon: "fas fa-graduation-cap",
                css: {},
                path: "/captura_de_datos/carreras",
            },
            {
                text: "Colaboradores",
                icon: "fa-solid fa-address-card",
                css: {},
                path: "/captura_de_datos/colaboradores",
            },
            // {
            //     text: "Becas",
            //     icon: "fa-solid fa-hand-holding-dollar",
            //     css: {},
            //     path: "/captura_de_datos/becas",
            // },
            {
                text: "Campus",
                icon: "fa-solid fa-landmark",
                css: {},
                path: "/captura_de_datos/campus",
            },
            {
                text: "Docentes",
                icon: "fa-solid fa-chalkboard-user",
                css: {},
                path: "/captura_de_datos/docentes",
            },
            {
                text: "Cursos extracurriculares",
                icon: "fa-solid fa-book",
                css: {},
                path: "/captura_de_datos/cursos-extra",
            },
            // {
            //     text: "Cursos de graduacion",
            //     icon: "fa-solid fa-award",
            //     css: {},
            //     path: "/captura_de_datos/cursos-graduacion",
            // },

        ]
    }

]
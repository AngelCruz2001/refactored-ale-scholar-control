import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { gradesStartGetGrades } from '../../actions/grades';
import { groupsStartGetAllGroups } from '../../actions/groups';
import { buildDataGrades, buildDataGroups } from '../../helpers/buildDataTables';
import { isACoincidenceSearch } from '../../helpers/isACoincidence';
import { ButtonsSwitch } from '../ui/ButtonsSwitch';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';
import { GradesDetails } from './GradesDetails';
import { GroupsDetails } from './GroupsDetails';
import { groupsStartGetCoursesByGroup } from '../../actions/groups'

const headers = [
    [
        {
            title: "Nombre del alumno",
            textAlign: 'left'
        },
        {
            title: "Matricula",
            textAlign: 'center'
        },
        {
            title: "Grupo",
            textAlign: 'center'
        },
        {
            title: "Carrera",
            textAlign: 'left'
        },
        {
            title: "Ver",
            textAlign: 'center'
        }
    ],
    [
        {
            title: "Grupo",
            textAlign: 'left'
        },
        {
            title: "Carrera",
            textAlign: 'left'
        },
        {
            title: "Campus",
            textAlign: 'center'
        },
        {
            title: "Ver",
            textAlign: 'center'
        }
    ]
];


export const RequestGradesAdmin = () => {

    const dispatch = useDispatch();
    const { grades, ui, groups } = useSelector(state => state)

    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })
    const [dataStudent, setDataStudent] = useState({});
    const [dataShow, setDataShow] = useState([])

    const [showGroups, setShowGroups] = useState(false)
    const [headersToShow, setHeadersToShow] = useState(headers[0])

    const [isAStudentActive, setIsAStudentActive] = useState(false);
    const [isGroupActive, setIsGroupActive] = useState(false)
    const [activeGroupData, setActiveGroupData] = useState([])
    const { name } = useParams();
     
    useEffect(() => {
        setHeadersToShow(headers[(name === 'grupos') ? 1 : 0]);
        setShowGroups(name === 'grupos');
        dispatch(name === 'grupos' ? groupsStartGetAllGroups() : gradesStartGetGrades())
    }, [name])

    const { loading } = ui;

    const handleClickSetActiveStudent = (data) => {
        setIsAStudentActive(true);
        setDataStudent(data);
        // dispatch(gradesStartGetGrades)
    }
    const handleClickSetActiveGroup = (id_groupDataShowed) => {
        setActiveGroupData(groups.data.find(({ id_group }) => id_group === id_groupDataShowed));
        console.log('activeGroupData', activeGroupData, id_groupDataShowed, groups)
        dispatch(groupsStartGetCoursesByGroup(id_groupDataShowed));
        setIsGroupActive(true);
        // dispatch(gradesStartGetGrades)
    }

    const handleSwitchData = () => {
        // setHeadersToShow(headers[(name === 'Grupos') ? 1 : 0]);
        // setShowGroups(name === 'Grupos');
    }

    const generateData = () => {

        const generateDictionary = {
            grades: {
                dataNames: ["id_student", "student_name", "matricula", "group_name", "major_name", "campus_name"],
                dataSearchElements: ["student_name", "matricula", "group_name", "major_name"],
                functionButton: handleClickSetActiveStudent
            },
            groups: {
                dataNames: ["id_group", "group_name", "major_name", "campus_name"],
                dataSearchElements: ["group_name", "major_name"],
                functionButton: handleClickSetActiveGroup,
            }
        }


        const dataToShow = [];
        const { searchWord } = valueSearchFilter;
        const baseElements = showGroups ? generateDictionary.groups : generateDictionary.grades;
        const { dataNames, dataSearchElements, functionButton } = baseElements;

        (showGroups ? groups : grades).data.forEach(data => {

            const coincidence = isACoincidenceSearch(dataSearchElements.map(element => data[element]), searchWord)
            const dataBuilded = (showGroups ? buildDataGroups : buildDataGrades)(
                ...dataNames.map(element => data[element]),
                functionButton,
                coincidence
            )

            if (searchWord === '') {
                dataToShow.push(dataBuilded)
            } else if (coincidence.includes(true)) {
                dataToShow.push(dataBuilded)
            }
        });
        setDataShow(dataToShow)
    }

    useEffect(() => {
        generateData()
    }, [loading, valueSearchFilter])


    if (isGroupActive) return (
        <GroupsDetails
            dataGroup={activeGroupData}
            // setIsAStudentActive={setIsAStudentActive}
            setIsGroupActive={setIsGroupActive}
        />
    )

    return (
        <>
            {

                isAStudentActive ?

                    <GradesDetails
                        setIsAStudentActive={setIsAStudentActive}
                        dataStudent={dataStudent}
                        allowEdit={true}
                    />
                    :
                    < div className="gra__container" >
                        <div className='gra__container__headers'>
                            <Searchbar placeholder="Buscar" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />
                            <ButtonsSwitch
                                names={['Alumnos', 'Grupos']}
                                paths={['/consulta_de_calificaciones/alumnos', '/consulta_de_calificaciones/grupos']}
                                handleSwitchData={handleSwitchData}
                            />
                        </div>

                        <div className='gra__container__body'>
                            <Switch>
                                <Route path='/consulta_de_calificaciones/alumnos'>
                                    <h4 className="general__title-h4">Todos los alumnos</h4>
                                    <Table
                                        headers={headersToShow}
                                        data={dataShow}
                                        sizesColumns={[29, 15, 15, 35, 7]}

                                    />
                                </Route>
                                <Route path='/consulta_de_calificaciones/grupos'>

                                    <h4 className="general__title-h4">Todos los grupos</h4>
                                    <Table
                                        headers={headersToShow}
                                        data={dataShow}
                                        sizesColumns={[30, 35, 25, 10]}
                                    />
                                </Route>

                                <Redirect to="/consulta_de_calificaciones/alumnos" />

                            </Switch>



                        </div>

                    </div >
            }
        </>
    )
}

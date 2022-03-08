import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buildDataFertilizer } from '../../helpers/buildDataTables';
import { Date } from '../ui/Date';
import { Matricula } from '../ui/Matricula';
import { StudentInformation } from '../ui/StudentInformation';
import { Table } from '../ui/Table';
const headers = [
    { title: 'FECHA', textAlign: 'center' },
    { title: 'CONCEPTO', textAlign: 'center' },
    { title: 'COSTO', textAlign: 'center' },
    { title: 'ANTICIPO', textAlign: 'center' },
    { title: 'RESTANTE', textAlign: 'center' },
    { title: '', textAlign: 'center' },

]

const pay = {
    fertilizers: [{
        id: 1,
        date: '15 - junio - 2021',
        concept: 'Fertilizante',
        cost: '$100',
        anticipo: '$100',
        restante: '$100',
    }]
}
export const FertilizerPay = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(payStart)
    }, [])
    const { student, ui } = useSelector(state => state);
    const { loading, } = ui;
    const [dataToShow, setDataToShow] = useState([]);
    const [studentInformation, setStudentInformation] = useState({headers: [], data: []});
    useEffect(() => {
        setStudentInformation({
            headers: ["Nombre", "Grupo", "Campus", "Carrera"],
            data: [student.student_name, student.name_group, student.campus_name, student.major_name],
        });
    }, [student])
    const generateData = () => {
        const dataShow = [];
        pay.fertilizers.forEach(({
            id, date, concept, cost, anticipo, restante
        }) => {
            const builData = buildDataFertilizer(id, date, concept, cost, anticipo, restante);
            dataShow.push(builData);

        });

        setDataToShow(dataShow);
    }

    useEffect(() => {
        student.matricula && generateData()
    }, [loading, student])

    console.log(studentInformation)
    return (
        <div className='fert'>
            <div className='fert__up'>
                <Date />
                <div className='fert__up__headers'>
                    <div className='fert__up__headers__matricula'>
                        <Matricula
                            // activeClassName={activeDisabled(0, ui.current)}
                            matricula={student.matricula}
                        />
                    </div>
                    <div className='fert__up__headers__data'>
                        {
                            student.matricula ?
                                <StudentInformation studentInformation={studentInformation} isStudentShowed={false} />
                                :
                                <p className="noInformation">
                                    ¿Deseas liquidar o realizar un abono? Introduce la matrícula del alumno para conocer sus conceptos de adeudo.
                                </p>
                        }
                    </div>

                </div>
            </div>

            <div className='fert__down'>
                <Table
                    data={dataToShow}
                    headers={headers}
                    sizesColumns={[15, 35, 10, 10, 10, 20]}
                />
            </div>
        </div >
    )
}

import React from 'react';
import { ButtonTable } from '../components/ui/table/ButtonTable';
import { InputTable } from '../components/ui/table/InputTable';
import { SpanTable } from '../components/ui/table/SpanTable';

export const buildData = (
    id,
    student_name,
    matricula,
    creation_date,
    document_name,
    typeButton,
    handelClick,
    coincidence
) => {
    console.log(coincidence);
    return [
        { element: <SpanTable text={student_name} />, searched: coincidence[0] },
        { element: <SpanTable text={matricula} />, searched: coincidence[1] },
        { element: <SpanTable text={creation_date} />, searched: coincidence[3] },
        { element: <SpanTable text={document_name} />, searched: coincidence[2] },
        { element: <ButtonTable type={typeButton} onClick={handelClick} id={id} />, searched: false },
    ];
}
export const buildDataGrades = (
    id_student,
    student_name,
    matricula,
    group_name,
    major_name,
    campus_name,
    handleClick,
    coincidence
) => {
    return [
        { element: <SpanTable text={student_name} />, searched: coincidence[0] },
        { element: <SpanTable text={matricula} />, searched: coincidence[1] },
        { element: <SpanTable text={group_name} />, searched: coincidence[2] },
        { element: <SpanTable text={major_name} />, searched: coincidence[3] },
        { element: <ButtonTable type={0} onClick={() => handleClick({ id_student, student_name, matricula, group_name, campus_name, major_name })} id={id_student} />, searched: false },
    ];
}
export const buildDataExpenses = (
    id,
    expenses_type,
    date,
    handleClickSee,
    handleClickEdit,
    handleClickDelete,
) => {

    return [
        { element: <SpanTable text={expenses_type} />, searched: false },
        { element: <SpanTable text={date} />, searched: false },
        { element: <ButtonTable onClick={() => handleClickSee(id)} type={0} title="Ver" id={id} />, searched: false },
        { element: <ButtonTable onClick={() => handleClickEdit(id)} type={1} title="Editar" id={id} />, searched: false },
        { element: <ButtonTable onClick={() => handleClickDelete(id)} type={2} title="Borrar" id={id} />, searched: false },

    ];
}
export const buildDataGradesDetail = (course, teacher, date, credits, coincidence, adminUser = false) => {
    if (adminUser) {
        return [
            { element: <SpanTable text={course} />, searched: coincidence[0] },
            { element: <SpanTable text={teacher} />, searched: coincidence[1] },
            { element: <SpanTable text={date} />, searched: coincidence[2] },
            { element: <SpanTable text={credits} />, searched: coincidence[3] },
            { element: <ButtonTable text={credits} />, searched: coincidence[3] },
        ];
    }
    return [
        { element: <SpanTable text={course} />, searched: false },
        { element: <SpanTable text={teacher} />, searched: false },
        { element: <SpanTable text={date} />, searched: false },
        { element: <InputTable value={credits} />, searched: false },
        { element: <ButtonTable value={credits} />, searched: false },

    ];
}


export const buildDataFertilizer = (id, date, concept, cost, anticipo, restante) => {
    return [
        { element: <SpanTable text={date} />, searched: false },
        { element: <SpanTable text={concept} />, searched: false },
        { element: <SpanTable text={cost} />, searched: false },
        { element: <SpanTable text={anticipo} />, searched: false },
        { element: <SpanTable text={restante} />, searched: false },
        { element: <ButtonTable type={5} id={id} />, searched: false },

    ];
}

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


export const buildDataStudents = (
    id,
    student_name,
    matricula,
    major_name,
    id_major,
    handleClick,
    handleClick2,
    coincidence
) => {
    return [
        { element: <SpanTable text={student_name} />, searched: coincidence[0] },
        { element: <SpanTable text={matricula} />, searched: coincidence[1] },
        { element: <SpanTable text={major_name} />, searched: coincidence[2] },
        { element: <ButtonTable id={matricula} id2={id_major} title={"Grupo"} type={10} onClick={handleClick} />, searched: false },
        { element: <ButtonTable id={matricula} title={"Examen"} type={9} onClick={handleClick2} />, searched: false },
    ];
}

export const buildDataGroupOrganization = (
    id_group,
    group_name,
    major_name,
    campus_name,
    handleClick,
    coincidence
) => {
    return [
        { element: <SpanTable text={group_name} />, searched: coincidence[0] },
        { element: <SpanTable text={major_name} />, searched: coincidence[1] },
        { element: <SpanTable text={campus_name} />, searched: coincidence[2] },
        { element: <ButtonTable id={id_group} title={"Curso"} type={9} onClick={handleClick} />, searched: false },
    ];
}

export const buildDataMajorsGroup = (
    id,
    student_name,
    matricula,
    major_name,
    handleClick,
    coincidence
) => {
    return [
        { element: <SpanTable text={student_name} />, searched: false },
        { element: <SpanTable text={matricula} />, searched: false },
        { element: <SpanTable text={major_name} />, searched: false },

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
export const buildDataGradesDetail = (id_grade, course, teacher, date, credits, coincidence, adminUser = false, handleEditGrade) => {
    if (adminUser) {
        return [
            { element: <SpanTable text={course} />, searched: coincidence[0] },
            { element: <SpanTable text={teacher} />, searched: coincidence[1] },
            { element: <SpanTable text={date} />, searched: coincidence[2] },
            { element: <SpanTable text={credits} />, searched: coincidence[3] },
            { element: <ButtonTable type={7} id={id_grade} onClick={handleEditGrade} />, searched: coincidence[3] },
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

export const buildDataGroupsDetail = (course, teacher, date, credits, coincidence, adminUser = false) => {
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

export const buildDataFertilizer = (id_payment, last_payment_date, name, expected, current, missing) => {
    return [
        { element: <SpanTable text={last_payment_date} />, searched: false },
        { element: <SpanTable text={name} />, searched: false },
        { element: <SpanTable text={expected} />, searched: false },
        { element: <SpanTable text={current} />, searched: false },
        { element: <SpanTable text={missing} />, searched: false },
        { element: <ButtonTable type={5} id={id_payment} />, searched: false },
    ];
}

export const buildDataGroups = (id_group, group_name, major_name, campus_name, onClick, coincidence) => {
    return [
        { element: <SpanTable text={group_name} />, searched: coincidence[0] },
        { element: <SpanTable text={major_name} />, searched: coincidence[1] },
        { element: <SpanTable text={campus_name} />, searched: coincidence[2] },
        { element: <ButtonTable type={8} id={id_group} onClick={onClick} />, searched: false },
    ];
}



export const buildDataGroupsDetails = (id_course, course_name, clave, teacher_name, handleClick, handleClick2) => {
    return [
        { element: <SpanTable text={course_name} />, searched: false },
        { element: <SpanTable text={clave} />, searched: false },
        { element: <SpanTable text={teacher_name} />, searched: false },
        { element: <ButtonTable onClick={handleClick} type={8} id={id_course} />, searched: false },
        { element: <ButtonTable onClick={handleClick2} type={2} id={id_course} />, searched: false },
    ];
}

export const buildDataCoursesStudents = (id_grade, id_course, student_name, matricula, grade, handleClick, handleDelete) => {
    return [
        { element: <SpanTable text={student_name} />, searched: false },
        { element: <SpanTable text={matricula} />, searched: false },
        { element: <SpanTable text={grade} />, searched: false },
        { element: <ButtonTable onClick={handleClick} type={1} id={id_grade} />, searched: false },
        { element: <ButtonTable onClick={handleDelete} type={2} id={{id_course, matricula}} />, searched: false } //Lo de {} es una mexicanada, para no tener que recibir los dos objetos
    ];
}
export const buildDataCourses = (id_course, student_name, matricula, grade, handleClick) => {
    return [
        { element: <SpanTable text={student_name} />, searched: false },
        { element: <SpanTable text={matricula} />, searched: false },
        { element: <SpanTable text={grade} />, searched: false },
        { element: <ButtonTable onClick={handleClick} type={7} id={id_course} />, searched: false },
    ];
}

export const buildDataRequestsDocuments = (
    id_request,
    student_name,
    matricula,
    date,
    document_name,
    handleClick
) => {
    return [
        { element: <SpanTable text={student_name} />, searched: false },
        { element: <SpanTable text={matricula} />, searched: false },
        { element: <SpanTable text={date} />, searched: false },
        { element: <SpanTable text={document_name} />, searched: false },
        { element: <ButtonTable id={id_request} id2={matricula} onClick={handleClick} type={11} />, searched: false },
    ];
}
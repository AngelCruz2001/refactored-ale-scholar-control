import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { documentClearData } from "../../actions/document";
import { studentStartGetStudentByMatricula } from "../../actions/student";
import { uiSetCurrent } from "../../actions/ui";
import { typesRegex } from "../../types/typesValidators";

export const Matricula = ({ activeClassName, payment }) => {
  const dispatch = useDispatch();
  const { matricula } = useSelector((state) => state.student);

  const [componentMatricula, setComponentMatricula] = useState(matricula || "");

  useEffect(() => {
    setComponentMatricula(matricula);
    matricula === null && setComponentMatricula("");
  }, [matricula]);

  const handleMatriculaChange = ({ target }) => {
    setComponentMatricula(target.value);
    !target.value.match(typesRegex.matricula) && dispatch(documentClearData());
    if (target.value.match(typesRegex.matricula)) {
      dispatch(uiSetCurrent(1));
      dispatch(studentStartGetStudentByMatricula(target.value));
    } else {
      dispatch(uiSetCurrent(0));
    }
  };

  return (
    <div className="matri__container">
      <label className="general__titleSection matri__label" htmlFor="matricula">
        Matrícula
      </label>
      <input
        className=""
        value={componentMatricula}
        onChange={handleMatriculaChange}
        placeholder="0000000000000"
        maxLength="13"
        id="matricula"
        name="matricula"
      />
    </div>
  );
};

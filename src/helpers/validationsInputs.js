import * as Yup from 'yup';
import { typesRegex, typesRegexInputs } from '../types/typesValidators';

export const validationsInputs = (dataForm, active) => {
    const initialValues = {};
    const requiredFields = {};
    dataForm && Object.values(dataForm).forEach((data) => {
        data.forEach((row) => {
            row.forEach(({ name, value, validations }) => {
                // If is acrive charge from active object else charge from dataForm object
                initialValues[name] = active ? active[name] : value;
                if (validations) {
                    {
                        let schema;
                        for (const rule of validations) {

                            const yupsSchema = {
                                'required': Yup.string().required('Introduzca los datos correspondientes.'),
                                'radioSex': Yup.string().required().oneOf(["M", "F"], 'Introduzca los datos correspondientes.'),
                                'email': Yup.string().email('Introduzca una dirección de correo electrónico válida.'),
                                'number': Yup.string().matches(typesRegexInputs.numbers, 'Solo números son permitidos.'),
                                // 'date': Yup.string().matches(typesRegexInputs.date, 'Invalid date'),
                                'matricula': Yup.string().min(13, 'Introduzca 13 caracteres.').matches(typesRegex.matricula, 'Matricula invalida'),
                                'curp': Yup.string().min(18, 'Introduzca 18 caracteres.').matches(typesRegexInputs.curp, 'Curp no válida'),
                                'phone': Yup.string().min(10, 'Teléfono no válido'),
                                'timeTable': Yup.array().required('Debe seleccionar al menos un día.').min(1, ''),
                                'rfc': Yup.string().min(13, 'Introduzca 13 caracteres.').matches(typesRegexInputs.rfc, 'Rfc no válido'),
                            }
                            if (yupsSchema[rule.type]) {
                                schema = !schema ? yupsSchema[rule.type] : schema.concat(yupsSchema[rule.type]);
                            }

                            requiredFields[name] = schema;

                        }
                    }
                }
            })

        })
    })
    const validationSchema = Yup.object({ ...requiredFields });

    return [initialValues, validationSchema];
}

import * as Yup from 'yup';
import { typesRegex, typesRegexInputs } from '../types/typesValidators';

// 0: {day: 0, start_hour: '13:00', finish_hour: '19:00'}
export const validationsInputs = (dataForm, active) => {
    const initialValues = {};
    const requiredFields = {};
    dataForm && Object.values(dataForm).forEach((data) => {
        data.forEach((row) => {
            row.forEach(({ name, value, validations }) => {
                // If is active charge from active object else charge from dataForm object
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
                                'timeTable': Yup.array().min(1).of(
                                    Yup.object({
                                        day: Yup.number(),
                                        start_hour: Yup.string('Johan no le sabe 1'),
                                        finish_hour: Yup.string('Johan no le sabe 2'),
                                    }, 'asdfasdf').required('Introduzca los datos correspondientes.')
                                ).required('Introduzca los datos correspondientes.'),
                                'rfc': Yup.string().min(13, 'Introduzca 13 caracteres.').matches(typesRegexInputs.rfc, 'Rfc no válido'),
                                'clave': Yup.string().min(5, 'Introduzca 5 caracteres.'),
                                'name_course': Yup.string().max(15,'Introduzca 15 caracteres.')
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

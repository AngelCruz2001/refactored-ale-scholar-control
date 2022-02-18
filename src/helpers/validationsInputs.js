import * as Yup from 'yup';
import { typesRegex, typesRegexInputs } from '../types/typesValidators';

export const validationsInputs = (dataForm) => {
    const initialValues = {};
    const requiredFields = {};
    Object.values(dataForm).forEach((data) => {
        data.forEach((row) => {
            row.forEach(({ name, value, validations }) => {
                initialValues[name] = value;
                if (validations) {
                    {
                        let schema;
                        for (const rule of validations) {

                            // Solo letras son permitidas.
                            // 
                            // Seleccione una opción.

                            const yupsSchema = {
                                'required': Yup.string().required('Introduzca los datos correspondientes.'),
                                // 'min': Yup.string().min(8, 'Min 8 characters'),
                                // 'max': Yup.string().max(8, 'Max 8 characters'),
                                'email': Yup.string().email('Introduzca una dirección de correo electrónico válida.'),
                                'number': Yup.string().matches(typesRegexInputs.numbers, 'Solo números son permitidos.'),
                                // 'date': Yup.string().matches(typesRegexInputs.date, 'Invalid date'),
                                'matricula': Yup.string().min(13, 'Introduzca 13 caracteres.').matches(typesRegex.matricula, 'Invalid matricula'),
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

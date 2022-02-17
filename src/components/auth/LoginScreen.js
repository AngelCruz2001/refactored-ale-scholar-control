import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authStartLogin } from '../../actions/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logoAleNoText from '../../helpers/resources/images/logoAleNoText.png';


export const LoginScreen = () => {
    const { checking } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik({
        initialValues: {
            username: 'admin',
            password: 'jopi',
        },
        
        onSubmit: (values) => {
            dispatch(authStartLogin(values.username, values.password))
            resetForm()
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Requerido'),
            password: Yup.string()
                .required('Requerido'),
        })
    });


    return (
        <div className="container auth__container">

            <div className="auth__login">
                <form className={`${(checking) && "ui_blur "}`} onSubmit={handleSubmit}>
                    <div className="auth__login-inputs">
                        <input className="auth__login-inputs-input" placeholder="Usuario" type="text" {...getFieldProps('username')} />
                        <i className="auth__login-inputs-icon fas fa-user-alt"></i>
                    </div>
                    {touched.username && errors.username && <span>{errors.username}</span>}

                    <div className="auth__login-inputs">
                      

                        <input className="auth__login-inputs-input" placeholder="Contraseña" type="text" {...getFieldProps('password')} />



                        <i className="auth__login-inputs-icon fas fa-key"></i>
                    </div>
                        {touched.password && errors.password && <span>{errors.password}</span>}
                   

                    <button
                        className="auth__login-submit btn"
                        type="submit"
                    >
                        <p>Ingresar</p>
                    </button>
                </form>
                {
                    (checking) &&
                    <div className="ui_fadeIn ui_aniContainer">
                        <div className="ui_loadIcon" />
                    </div>
                }
            </div>


            <div className="auth__hero">
                <img className="auth__hero-logo" src='./logoAleNoText.png' alt="Logo Alejandría" />
                <h1 className="auth__hero-text">Instituto de Educación <br /> y Cultura Alejandría S.C.</h1>
            </div>

        </div >
    )
}
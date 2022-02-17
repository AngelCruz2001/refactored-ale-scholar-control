import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useError = () => {
    const { errors } = useSelector(state => state.forms)
    useEffect(() => {
        [...document.getElementsByClassName("input__error")].map(element => (element.classList.remove("input__error")));
        errors.map((errorBackend, i) => {
            if (errorBackend !== 'birthdate') {
                document.getElementsByName(errorBackend)[0].className += (" input__error");
            } else {
                document.getElementsByName("day")[0].className += (" input__error");
                document.getElementsByName("month")[0].className += (" input__error");
                document.getElementsByName("year")[0].className += (" input__error");
            }
        })
    }, [errors])
}


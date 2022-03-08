import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseDropMenu } from "../actions/ui";

export const useOutsideAlerter = (ref) => {
    const { openDropMenu } = useSelector(state => state.ui)
    const dispatch = useDispatch()
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropMenu && ref.current && !ref.current.contains(event.target)) {
                dispatch(uiCloseDropMenu());
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, openDropMenu]);
}





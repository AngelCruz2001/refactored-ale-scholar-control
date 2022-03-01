import { useSelector } from "react-redux";
import { itemsMenu } from "../resources/itemsMenu";




export const useAccess = () => {
    // const { user } = useSelector(state => state.auth);
    // const { roles } = user;
    const roles = [1];
    const componentsAccess = []

    roles.length > 0 && itemsMenu.map(componentsData => {
        componentsData.permissions.some(
            permissions => roles.includes(permissions)
        ) && componentsAccess.push(componentsData)
    })
    return [roles, componentsAccess];
}

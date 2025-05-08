import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {
    const {token} = useStateContext();

    // if token exist (i.e. user is authorized) redirect him to home page
    if(token) {
        return <Navigate to={"/"}/>
    }

    return(
        <div>
            <Outlet/>
        </div>
    )
}

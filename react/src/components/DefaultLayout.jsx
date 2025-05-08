import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    // get the required fields from the context
    const {user, token, notification, setUser, setToken} = useStateContext()

    useEffect(() => {
        // получаем данные пользователя и устанавливаем их в state
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    // if token does not exist redirect user to login
    if(!token) {
        return  <Navigate to="/login"/>
    }

    const onLogout = e => {
        e.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
    }

    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>

                    <div>
                        {/*User info*/}
                        {user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-logout" href="#">Log Out</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

            { notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}

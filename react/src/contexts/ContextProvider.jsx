import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({children}) => {

    // state for storing user data
    const [user, setUser] = useState({});
    // state for storing token in local storage
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('')

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const setToken = (token) => {
        // update react state
        _setToken(token)

        // set token in local storage
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return(
        // Provider makes available to all child components (user, token etc...)
        <StateContext.Provider value={ {
            user,
            setUser,
            token,
            setToken,
            notification,
            setNotification,
        } }>
            {children}
        </StateContext.Provider>
    )
}

// This is a custom hook that allows you to easily access context in any component.
export const useStateContext = () => useContext(StateContext);

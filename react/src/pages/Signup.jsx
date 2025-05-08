import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {

    // получаем доступ к инпутам
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        // передаем значения с фронта в payload
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        // Отправляем POST-запрос; на сервер по адресу /signup с данными из переменной payload
        console.log(payload)
        axiosClient.post('/signup', payload)
            /*
            Ответ деструктурируется, извлекается data (data — это вложенное поле из ответа сервера.).
            {
              data: { user: {...}, token: "..." },  // Тело ответа (то, что отправил сервер)
              status: 200,
              headers: {...},
              config: {...}
            }
             */
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {          // ловим ошибку
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Create account
                    </h1>
                    {/* отображаем ошибки если есть */}
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key} >{errors[key][0]}</p>
                        ))}
                    </div>}
                    <input ref={nameRef} type="text" placeholder="Full Name"/>
                    <input ref={emailRef} type="email" placeholder="Email Address"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
                    <button className="btn btn-block">Sign Up</button>
                    <p className="message">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

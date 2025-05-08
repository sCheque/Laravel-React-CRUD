import axios from "axios";


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

// Interceptors - special func which will be executed before the request send or after the response is receive
// Перехватываем каждый запрос перед его отправкой
// добавляем токен авторизации в заголовки каждого отправляемого HTTP-запроса.
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`            // Добавляет токен в заголовок Authorization
    return config;                                              // Возвращает изменённую конфигурацию запроса
})

axiosClient.interceptors.response.use((response) => {  // Обработка успешного ответа
    return response                                             //  Просто возвращает ответ без изменений
}, (error) => {                                // Обработка ошибки
    const {response} = error;                                   // Извлекает ответ из ошибки

    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;
})

export default axiosClient

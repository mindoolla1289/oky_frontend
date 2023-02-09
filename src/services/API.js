import axios from "axios";
import { useMainStore } from '../store/mainStore';
import { ref } from 'vue'

const token = ref('')

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

token.value = localStorage.getItem('user/token')

// Тут добовляем в headers наш токен для каждого запроса 
// Кроме для рефреш url 
axios.interceptors.request.use(request => {
  const store = useMainStore()
  if (!store.token == '') {
    if (request.url == "auth/jwt/refresh") {
      return request
    } else {
      request.headers.Authorization = token.value
      return request
    }


  }
  else {
    return request
  }
})

// Тут ловим ошибку 401 и если обновляем токен и снова делаем запрос 
// Если ошибка была в url refresh токена тогда вызываем функцию logout() и просим пользователя снова зайти 
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "auth/jwt/create" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        debugger
        originalConfig._retry = true;
        if (err.response.request.responseURL == "http://127.0.0.1:8000/auth/jwt/refresh") {
          const store = useMainStore()
          store.Logout()
          window.location.href = 'http://127.0.0.1:3000/'

        } else {
          try {
            const rs = await axios.post("auth/jwt/refresh", {
              refresh: localStorage.getItem('refresh'),
            });

            const accessToken = 'Bearer ' + rs.data.access;
            debugger
            localStorage.setItem('user/token', accessToken)
            token.value = accessToken
            debugger


            return axios(originalConfig);
          } catch (_error) {
            debugger
            console.log(_error)
            return Promise.reject(_error);
          }
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axios;

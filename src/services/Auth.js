import axios from "./API" 

const auth = {
    getQ(){
        return axios
    },
    async loggin(data){
        const res = await axios.post('auth/jwt/create',data)
        return res
    },
    createCourse(){
        return axios.post('/api/v1/course/new')
    }
}

export default auth
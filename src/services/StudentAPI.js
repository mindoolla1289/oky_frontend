import axios from "./API"

export default{
    getCourses(){
        return axios.get('/api/v1/mycourses/')
    },
    createCourse(){
        return axios.post('/api/v1/course/new')
    },
}
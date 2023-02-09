import axios from "./API" 
import auth from "./Auth"

const TeacherAPI = {
    getBaseUrls(){
        return axios.defaults.baseURL
    },
    async getCourses(){
        const response = await axios.get('api/v1/course/all')
        return response

    },
    async createCourse(data){
        const response = await axios.post('/api/v1/course/new',data)
        return response
    },
    async getCourse(){
        const response = await axios.get(`/api/v1/course/${parametr}`)
        return response
    },
    async updateCourse(){
        const response = await axios.get(`/api/v1/course/${parametr}`)
        return response
    },
    async delateCourse(){
        const response = await axios.get(`/api/v1/course/${parametr}`)
        return response
    },
    async createLesson(data){
        const response = await axios.post('/api/v1/lesson/new',data)
        return response
    },
    async getLesson(id){
        const response = await axios.get(`/api/v1/lesson/${id}`)
        return response
    },
    async getLessons(id){
        const response = await axios.get(`/api/v1/lesson/all/${id}`)
        return response
    },
    async createStudent(){
        const response = await axios.post('http://127.0.0.1:8000/auth/users/')
        return response
    },
    async getStudents(){
        const response = await axios.get('/api/v1/tstudent/all')
        debugger
        return response
    },
    async addStudentToCourse(){
        const response = await axios.get(`/api/v1/tstudent/addstudent/${parametr}`)
        return response
    },
}


export default TeacherAPI

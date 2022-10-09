import axios from "axios";

const httpClient = axios.create({
    baseURL:'https://minhas-tarefas-api.herokuapp.com'
})

class ApiService{
    
    constructor(apiUrl){
        this.apiUrl = apiUrl
    }

    post(url, objeto){
        const finalUrl = `${this.apiUrl}${url}`
        return httpClient.post(finalUrl, objeto);
    }

    put(url, objeto){
        const finalUrl = `${this.apiUrl}${url}`
        return httpClient.put(finalUrl, objeto)
    }

    delete(url){
        const finalUrl = `${this.apiUrl}${url}`
        return httpClient.delete(finalUrl)
    }

    get(url){
        const finalUrl = `${this.apiUrl}${url}`
        return httpClient.get(finalUrl)
    }

}

export default ApiService
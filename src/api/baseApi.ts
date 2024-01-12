import axios from "axios"

const baseApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 90_000
})

export default baseApi
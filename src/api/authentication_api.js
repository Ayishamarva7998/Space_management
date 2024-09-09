import axios from "axios";

export const add_login = (data)=>axios.post(`http://localhost:3040/api/login`,data)



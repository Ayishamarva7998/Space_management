import axios from "axios";

export const add_login = (data)=>axios.post(`http://localhost:3040/api/login`,data)

export const addstaff = (data) =>axios.post(`http://localhost:3040/api/staff`, data)
  
  

// export const addstaff = (formData) => {
//     return axios.post('http://localhost:3040/api/staff', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//   };
import axios from 'axios';
const Api=axios.create({
    baseURL:"http://localhost:5000/api"
})

Api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');
    // console.log(token);
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});
export default Api
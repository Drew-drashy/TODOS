import axios from 'axios';
import AuthForm from '../components/AuthForm';
import Api from '../services/Api';
const Login=()=>{
    const handleLogin=async(credentials)=>{
        try{
            const {data}=await Api.post('/auth/login',credentials);
            localStorage.setItem('token',data.token);
            console.log(data.token);
            window.location='/'
        }
        
        catch(err){
            alert('login failed');
            console.log(err);
        }
    };
    return <AuthForm isLogin={true} onSubmit={handleLogin} />;
};

export default Login;
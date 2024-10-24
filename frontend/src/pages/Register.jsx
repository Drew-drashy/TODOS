import axios from 'axios';
import AuthForm from '../components/AuthForm';
import Api from '../services/Api';
const Register=()=>{
    const handleLogin=async(credentials)=>{
        try{
            const {data}=await Api.post('/auth/register',credentials);
            console.log(data);
            localStorage.setItem('token',data.token);
            window.location='/'
        }
        
        catch(err){
            alert('Registeration failed');
            console.log(err);
        }
    };
    return <AuthForm isLogin={false} onSubmit={handleLogin} />;
};

export default Register;
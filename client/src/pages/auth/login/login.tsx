import LoginCard from "@/components/cards/logincard";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {CheckSession} from "@/services/auth/authService.ts";

function Login() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkUserSession = async () => {
            await CheckSession();
        };
        
        checkUserSession().then(() => {
         navigate("/dashboard")   
        });
    }, [navigate])
    return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginCard />
    </div>
);
}

export default Login;
import LoginCard from "@/components/cards/logincard";
import { auth } from "@/firebase/firebaseConfig";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    var user = auth.currentUser;
    if (user){
        navigate("/dashboard");
    }
    return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginCard />
    </div>
);
}

export default Login;
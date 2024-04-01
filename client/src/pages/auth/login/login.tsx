import login from "@/services/auth/login";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log(email, password);
    await login(email, password).then((userCredential) => {
        console.log(userCredential);
    }).catch((error) => {
        console.error(error);
    });
  }


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account? Sign up here</Link>
    </div>
  );
}

export default Login;
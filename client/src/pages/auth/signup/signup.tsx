import signUp from '@/services/auth/signup';
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const handleSubmit = async () => {
    await signUp(email, password).then(() => {
        redirect('/dashboard');
    }).catch((error) => {
        console.error(error);
    });
}

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Sign Up
        </button>
      </form>
      <Link to="/login">Already have an account? Log in</Link>
    </div>
  );
}

export default SignUp;
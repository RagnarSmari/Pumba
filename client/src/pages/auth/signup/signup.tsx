import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { SignUp } from '@/services/auth/auth';


function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const handleSubmit = async () => {
    await SignUp(email, password).then(() => {
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

export default SignUpPage;
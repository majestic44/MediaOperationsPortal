
'use client';
import axios from "axios";

export default function LoginPage() {
  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div style={{padding:40}}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" /><br/>
        <input placeholder="Password" type="password"/><br/>
        <button type="submit">Login</button>
      </form>
      <hr/>
      <a href="http://localhost:3001/auth/google">Login with Google</a><br/>
      <a href="http://localhost:3001/auth/microsoft">Login with Microsoft</a><br/>
      <a href="http://localhost:3001/auth/facebook">Login with Facebook</a>
    </div>
  );
}

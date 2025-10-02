import LoginComponent from '../Components/LoginComponent';

function Login({ setUser }) {  // Receive setUser as prop
  return (
    <div>
      <LoginComponent setUser={setUser} />  {/* Pass it down */}
    </div>
  );
}

export default Login;
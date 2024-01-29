import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from 'axios';
import apiURL from '../../constants/ApiURL';
import { useNavigate } from 'react-router-dom';
import basePath from '../../constants/BasePath';

interface SignInProps {

}

function SignIn(props: SignInProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this line
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  function onSignIn(email: string, password: string): void {
    const queryParams = `?email=${email}&password=${password}`;
    axios.post(apiURL + '/sign-in' + queryParams)
    .then((response) => {
      console.log(response.data);

      navigate(basePath);
    })
    .catch((error) => {
      setError("Senha inválida. Por favor, verifique suas credenciais.");

      setTimeout(() => setError(''), 5000);
    });
  }

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p>{error}</p>} {/* Add this line */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          required
        />
        <br />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;

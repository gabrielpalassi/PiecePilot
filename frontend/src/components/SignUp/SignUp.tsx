import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from 'axios';
import apiURL from '../../constants/ApiURL';
import { useNavigate } from 'react-router-dom';
import basePath from '../../constants/BasePath';

interface SignUpProps {

}

function SignUp(props: SignUpProps): JSX.Element {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this line
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(name, cpf, email, password);
  };

  function onSignUp(name: string, cpf: string, email: string, password: string): void {
    const queryParams = `?name=${name}&cpf=${cpf}&email=${email}&password=${password}`;
    axios.post(apiURL + '/sign-up' + queryParams)
    .then((response) => {
      console.log(response.data);

      navigate(basePath + '/logar');
    })
    .catch((error) => {
      setError("Usuário invalido.");

      setTimeout(() => setError(''), 5000);
    });
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>} {/* Add this line */}
      <form onSubmit={handleSubmit}>
      <TextField
          label="Name"
          variant="standard"
          fullWidth
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              </InputAdornment>
            ),
          }}
          required
        />
        <br />
        <TextField
          label="Cpf"
          variant="standard"
          fullWidth
          onChange={(e) => setCpf(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              </InputAdornment>
            ),
          }}
          required
        />
        <br />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

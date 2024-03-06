import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import {login} from '../services/AuthService';
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [userAuthenticated, setUserAuthenticated] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    

      await login({username: username,password:senha}).then((response) => {
        setUserAuthenticated(response.data.token);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // direcionar o usuário para a página inicial
        navigate("/Dashboard");
      })
      .catch((e) => {
        console.log(e);
      })

  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login de Administrador
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="senha"
            label="Senha"
            name="senha"
            type="text"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Enviar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Admin;

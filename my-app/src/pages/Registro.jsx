import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import {createUser} from '../services/UserAccountService';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [Twousername, setTwoUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [Twosenha, setTwoSenha] = useState('');
  const [isIncorrect, setIsIncorrect] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === Twousername && senha === Twosenha) {
      try {
        const us = await createUser({
          username: username,
          password: senha
        });
        console.log("Cadastro Feito com Sucesso!");
        return us;
      } catch (e) {
        console.log("Cadastro Falhou", e);
      }
      console.log("Cadastro Feito com Sucesso!");
     
    }
    setIsIncorrect(true);

  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Cadastro {isIncorrect == true && (
            "Incorreto. Senha ou Email Não conformes"
          )}
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
            type='email'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Confirme o Username"
            name="username"
            autoFocus
            type='email'
            value={Twousername}
            onChange={(e) => setTwoUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            inputProps={{
              minLength: 8,
              maxLength: 22,
              pattern: ".{8,22}",  // Adiciona uma expressão regular para validar o tamanho
            }}
            fullWidth
            id="senha"
            label="Senha"
            name="senha"
            type="text"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            inputProps={{
              minLength: 8,
              maxLength: 22,
              pattern: ".{8,22}",  // Adiciona uma expressão regular para validar o tamanho
            }}
            fullWidth
            id="senha"
            label="Senha"
            name="Confirme a senha"
            type="text"
            value={Twosenha}
            onChange={(e) => setTwoSenha(e.target.value)}
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

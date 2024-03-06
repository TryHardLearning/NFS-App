// DataTable.js
import React, { useState, useEffect} from 'react';



import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Grid,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TransactionReceivedService from '../services/TransactionReceivedService';

const DataTable = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setData([{
      id: 0,
      type: 'Is Working?',
      month: 1,
      year: 2023,
      thePrice: 50.0,
      accountBank: 123,
    },{
      id: 1,
      type: 'Is Working?',
      month: 1,
      year: 2023,
      thePrice: 50.0,
      accountBank: 123,
    }])
    /*TransactionReceivedService.findAll()
      .then((response) => {
        const transactions = response.data.map((item) => ({
          id: item.id,
          type: item.type,
          month: item.month,
          year: item.year,
          thePrice: item.thePrice,
          accountNumber: item.accountNumber
        }));

        setData(transactions);
      })
      .catch((error) => {
        console.log(error);
      });*/
  };

  let [editId, setId] = useState('');
  let [ThePrice, setThePrice] = useState('');
  let [Ano, setAno] = useState('');
  let [Mes, setMes] = useState('');
  let [Tipo, setTipo] = useState('');
  let [nBanco, setNBanco] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (item) => {
    setId(item.id);
    setThePrice(item.thePrice)
    setAno(item.year)
    setMes(item.month)
    setTipo(item.type)
    setNBanco(item.accountNumber);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    TransactionReceivedService.delete(id)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    TransactionReceivedService.saveDTO({
      id: editId,
      type: Tipo,
      month: Mes,
      year: Ano,
      thePrice: ThePrice
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>The Price</TableCell>
              <TableCell>Account Bank</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.month}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.thePrice}</TableCell>
                <TableCell>{item.accountBank}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Edição */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}

        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={editModalOpen}>
          <Grid container spacing={2} md={12} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
              <h2>Edit Item</h2>
              <form onSubmit={handleSubmit}>
                {/* Campos de edição */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ThePrice"
                  label="Valor Enviado"
                  name="ThePrice"
                  type="number"
                  value={ThePrice}
                  onChange={(e) => setThePrice(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Tipo"
                  label="Tipo: "
                  name="Tipo"
                  type="string"
                  value={Tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Mes"
                  label="Mês:"
                  name="Mes"
                  type="number"
                  value={Mes}
                  onChange={(e) => setMes(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Ano"
                  label="Ano"
                  name="Ano"
                  type="number"
                  value={Ano}
                  onChange={(e) => setAno(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nBanco"
                  label="nBanco"
                  name="nBanco"
                  type="number"
                  value={nBanco}
                  onChange={(e) => setNBanco(e.target.value)}
                />
                {/* Adicione mais campos conforme necessário */}
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </form>
            </Box>
          </Grid>
        </Fade>

      </Modal>
    </div>
  );
};

export default DataTable;

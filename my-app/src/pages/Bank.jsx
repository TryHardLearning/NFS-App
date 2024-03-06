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
import BankAccountService from '../services/BankAccountService';
import Delete from '@mui/icons-material/Delete';
import PlusOneOutlinedIcon from '@mui/icons-material/PlusOneOutlined';
import {findAll, remove as removeSend, save as saveSend } from '../services/BankAccountService';
import { isAuthenticated } from '../services/AuthService';

const DataTable = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    isAuthenticated();
    loadData();
  }, []);

  const loadData = async () => {
    setData([{
      id: 0,
      bankName: "Nubank",
      accountNumber: "74258392-1"
    },{
      id: 1,
      bankName: "N26",
      accountNumber: "70058212-4"
    }])
    await findAll()
      .then((response) => {
        const transactions = response.data.map((item) => ({
          id: item.id,
          bankName: item.bankName,
          accountNumber: item.accountNumber
        }));

        setData(transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let [editId, setId] = useState('');
  let [banco, setBanco] = useState('');
  let [nBanco, setNBanco] = useState('');


 const [MoreModalOpen, setMoreModalOpen] = useState(false);


  const handleDeleteClick = async (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    await removeSend(id)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const handleMoreClick = async () => {
    setBanco('');
    setNBanco('');
    setMoreModalOpen(true);
    
  }
  const MorehandleSubmit = async (e) => {
    e.preventDefault();
    await saveSend({
      banco,
      nBanco 
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
              <TableCell>Bank Name</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>
                  <IconButton onClick={() => handleMoreClick()}>
                    <PlusOneOutlinedIcon />
                  </IconButton>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.bankName}</TableCell>
                <TableCell>{item.accountNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteClick()}>
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
        open={MoreModalOpen}
        onClose={() => setMoreModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}

        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={MoreModalOpen}>
          <Grid container spacing={2} md={12} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
              <h2>Edit Item</h2>
              <form onSubmit={MorehandleSubmit}>
                {/* Campos de edição */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Banco"
                  label="Nome do Banco:"
                  name="Banco"
                  type="text"
                  value={banco}
                  onChange={(e) => setBanco(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nbanco"
                  label="Numero do Banco: "
                  name="nbanco"
                  type="text"
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

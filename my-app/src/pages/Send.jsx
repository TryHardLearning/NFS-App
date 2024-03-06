// DataTable.js
import React, { useState, useEffect } from 'react';
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
import PlusOneOutlinedIcon from '@mui/icons-material/PlusOneOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { update as updateSend, findAll, remove as removeSend, save as saveSend } from '../services/TransactionSendService';
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
      type: 'Is Working?',
      month: 1,
      thePrice: 50.0,
      accountBank: 123,
    }, {
      id: 1,
      type: 'Is Working?',
      dateMoonth: 1,
      thePrice: 50.0,
      accountBank: 123,
    }])
    await findAll()
      .then((response) => {
        const transactions = response.data.map((item) => ({
          id: item.id,
          type: item.type,
          month: item.month,
          year: item.year,
          thePrice: item.thePrice,
          accountBank: item.accountNumber
        }));

        setData(transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let [editId, setId] = useState('');
  let [ThePrice, setThePrice] = useState('');
  let [dateMoonth, setdateMoonth] = useState('');
  let [Priority, setPriority] = useState('');
  let [Tipo, setTipo] = useState('');
  let [nBanco, setNBanco] = useState('');


  const [editModalOpen, setEditModalOpen] = useState(false);
  const [MoreModalOpen, setMoreModalOpen] = useState(false);

  const handleEditClick = (item) => {
    setId(item.id);
    setThePrice(item.thePrice)
    setdateMoonth(item.dateMoonth)
    setPriority(item.priority)
    setEditModalOpen(true);
  };

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
    setThePrice()
    setdateMoonth('')
    setTipo('')
    setPriority('')
    setMoreModalOpen(true);
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSend({
      id: editId,
      type: Tipo,
      month: dateMoonth,
      priority: Priority,
      thePrice: ThePrice,
      accountBank: nBanco
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const MorehandleSubmit = async (e) => {
    e.preventDefault();
    await saveSend({
      type: Tipo,
      priority: Priority,
      dateMoonth: dateMoonth,
      thePrice: ThePrice,
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
              <TableCell>Type</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>The Price</TableCell>
              <TableCell>Account Bank</TableCell>
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
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell>{item.dateMoonth}</TableCell>
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
                  type="text"
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
                  type="text"
                  value={dateMoonth}
                  onChange={(e) => setdateMoonth(e.target.value)}
                />
               
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Priority"
                  label="Priority:"
                  name="Priority"
                  type="number"
                  value={Priority}
                  onChange={(e) => setPriority(e.target.value)}
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
                  type="text"
                  value={Tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Mes"
                  label="Data: 01/01/2000"
                  name="Mes"
                  type="text"
                  value={dateMoonth}
                  onChange={(e) => setdateMoonth(e.target.value)}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Priority"
                  label="Priority:"
                  name="Priority"
                  type="number"
                  value={Priority}
                  onChange={(e) => setPriority(e.target.value)}
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

import './App.css';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'; 
import Grid from '@material-ui/core/Grid';   
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Navbar from './components/Navbar';

const baseUrl = 'http://localhost:8080/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 620,
  },
  margen:{
    marginRight:5
  },
}));


function App() {
  const classes = useStyles();

  const [ listProduct, setListProduct ] = useState([]);
  const [ name, setName ] = useState('')
  const [ price, setPrice ] = useState('')
  const [ quantity, setQuantity ] = useState('')

   useEffect( () => {
      getProducts();
   },[])

  const getProducts = async() => {
    const response = await fetch(baseUrl+'api/product');
    if(response.ok){  
       const data = await response.json();
       setListProduct(data);
    }
  }


  const addProduct = async() => {
    const data = { name, price, quantity }
    const response = await fetch(baseUrl+'api/product',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json()
    console.log(result)
    clearInput() 
    getProducts()
  }

  const clearInput = () => {
    setName('')
    setPrice('')
    setQuantity('')
  }


  return (
    <div className={classes.root}>

      <Navbar/>
      <Grid container spacing={3}>

         <Grid item xs={4}>
          <div className="card p-2">
          <TextField
             className="mb-2"
             label="Name"
             variant="outlined" 
             onChange={e => setName(e.target.value)}
             value={name}
          />

          <TextField 
             className="mb-2"
             label="Price"
             variant="outlined"
             onChange={e => setPrice(e.target.value)}
             value={price}
           />

          <TextField className="mb-2"
             label="Quantity"
             variant="outlined" 
             onChange={e => setQuantity(e.target.value)}
             value={quantity}
           />

          <Button variant="contained" color="primary"
            onClick={addProduct}
           >
             Add Product
          </Button>
          </div>
        </Grid>

        <Grid item xs={8} >
        <div className="p-3">
         <TableContainer component={Paper}  >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>quantity</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
            {listProduct.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
             ))}
            </TableBody>
      </Table>
   
    </TableContainer>
    </div>
  </Grid>

</Grid>
</div>
  );
}

export default App;

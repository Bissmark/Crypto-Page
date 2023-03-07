import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, Tooltip, YAxis } from 'recharts';
import {addFirestoreCollectionEntry, getFirestoreCollectionEntry } from "./firestore"
import MediaQuery from 'react-responsive';
import { TableContainer, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headers = [
  {
    id: 'rank',
    numeric: true,
  }, 
  {
    id: 'name',
    numeric: false,
  }, 
  {
    id: 'price',
    numeric: true,
  }, 
  {
    id: '24hr',
    numeric: true,
  }, 
  {
    id: 'volume',
    numeric: true,
  }, 
  { id: 'marketcap',
    numeric: true,
  }, 
  {
    id: 'Last 7 Days',
    numeric: true,
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    // <MediaQuery minWidth={600}>
      <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
           <Checkbox 
            sx={{
              color: '#f1bb09 !important',
              '&.Mui-checked': 
              {
                color: '#f1bb09 !important',
              },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            icon={<StarBorderIcon />}
            onChange={onSelectAllClick}
            />
        </TableCell>
        {headers.map((header) => (
          <TableCell
            sx={{color: 'white'}}
            key={ header.id }
            align={'center'}
            // padding={header.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === header.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === header.id}
              direction={orderBy === header.id ? order : 'asc'}
              onClick={createSortHandler(header.id)}
              sx={{color: 'white', "&:hover": { color: '#1976d2'}, "active": { color: '#1976d2'}}}
            >
              {header.id}
              {orderBy === header.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
      </TableHead>
  );
}

function EnhancedTable() {
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  const [values, loadingFirebase, errorFB, snaphot] = getFirestoreCollectionEntry("favourites");

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
      )
      .then(res => setCoins(res.data))
      .catch(error => console.log(error))
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = coins.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const Toolip = props =>  
  (! props.active) ? null :  ( 
  <div style={{ fontFamily: 'Montserrat',  color : 'white',  fontSize: '15px', fontFamily: 'Montserrat', fontWeight: 'bold' }} >
  {props.payload.map((v, i) => <p key ={ i }>{v.value}</p>)}
  </div> )

  const pushToFirebaseDB = (e,coin) => {
    const {id, current_price, market_cap_rank, total_volume, market_cap, sparkline_in_7d, price_change_percentage_24h} = coin 
    addFirestoreCollectionEntry('favourites', market_cap_rank, id, current_price, total_volume, market_cap, sparkline_in_7d, price_change_percentage_24h )
    console.log('added')
  }

  const valuesAddedToDB = (coin) => {
    if (!values) {
      return false;
    }
    let checkStatus = values?.some(value => coin.id === value.name)

    return checkStatus
  }

  const priceFormatter = (price) => {
    if(price > 0.001) return price.toLocaleString(undefined, { 'minimumFractionDigits': 2,'maximumFractionDigits': 2 })
    if(price < 0.001) return price.toLocaleString(undefined, { 'minimumFractionDigits': 6,'maximumFractionDigits': 6 })
  }

  const theme = useTheme();
  const tableWidth = useMediaQuery('(min-width:600px)');
  

  return (
    <div>
      <div className="coin-search">
        <h1 className="coin-text"></h1>
          <TextField
            className="coin-input"
            type='text'
            onChange={ handleChange }
            placeholder='Search...'
            sx={{ input: {color: 'white'}}}
          />
      </div>
      <MediaQuery minWidth={600}>
      <TableContainer>
        <Table>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={coins.length}
          />
          <TableBody>
            {stableSort(coins, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((coin => coin.name.toLowerCase().includes(search.toLowerCase())))
              .map((coin) => {
                const isItemSelected = isSelected(coin.id);
                const min = coin.sparkline_in_7d.price[0];
                const max = coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1];
                const priceIncrease = max > min ? true : false;
                const coinPricingData = coin.sparkline_in_7d.price.map(value => {
                  return {"price": value.toFixed(5)}
                })
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, coin.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={coin.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                    <Checkbox 
                      sx={{
                        color: '#f1bb09',
                        '&.Mui-checked': 
                        {
                          color: '#1976d2',
                        },
                      }}
                      onClick={(e) => pushToFirebaseDB(e, coin)}
                      icon={<StarBorderIcon />} 
                      checkedIcon={<StarIcon />}
                      checked={valuesAddedToDB(coin)}
                      >
                    </Checkbox>
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'white;', fontFamily: 'Montserrat'}}>{coin.market_cap_rank}</TableCell>
                    <MediaQuery minWidth={600}>
                      <TableCell 
                        sx={{ color: 'white', fontFamily: 'Montserrat'}}
                      >
                      <Link to={coin.id}>
                        <img className='image-table' src={coin.image} />
                        {coin.name}
                      </Link>
                      </TableCell>  
                    </MediaQuery>
                    <MediaQuery maxWidth={500}>
                    <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat'}}><Link to={coin.id}><img className='image-table' src={coin.image} /></Link></TableCell>  
                    </MediaQuery>
                    <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat'}}>${ priceFormatter(coin.current_price) }</TableCell>
                    <TableCell
                      align="center"
                      sx={ coin.price_change_percentage_24h > 0 ? {color: 'green !important'} : {color: 'red !important', width: '1%'}}>
                      { coin.price_change_percentage_24h.toFixed(2) }%
                    </TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat' }}>${ coin.total_volume.toLocaleString() }</TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat' }}>${ coin.market_cap.toLocaleString() }</TableCell>
                      <TableCell key={coin.name}>
                        <LineChart width={300} height={100} data={coinPricingData}>
                        <Line type="natural" dataKey="price" stroke={priceIncrease ? "#82ca9d" : "red"} dot={false} />
                        <Tooltip content={ Toolip } cursor={ false } wrapperStyle={{ outline: 'none' }} />
                        <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                        </LineChart> 
                      </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        </TableContainer>
        </MediaQuery>
        <MediaQuery maxWidth={500}>
        <TableContainer  sx={{ maxWidth: 361 }}> {/* Need to look into media query for a style*/}
        <Table sx={{ marginLeft: '1.3em' }}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={coins.length}
          />
          <TableBody>
            {stableSort(coins, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((coin => coin.name.toLowerCase().includes(search.toLowerCase())))
              .map((coin) => {
                const isItemSelected = isSelected(coin.id);
                const min = coin.sparkline_in_7d.price[0];
                const max = coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1];
                const priceIncrease = max > min ? true : false;
                const coinPricingData = coin.sparkline_in_7d.price.map(value => {
                  return {"price": value.toFixed(5)}
                })
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, coin.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={coin.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                    <Checkbox 
                      sx={{
                        color: '#f1bb09',
                        '&.Mui-checked': 
                        {
                          color: '#1976d2',
                        },
                      }}
                      onClick={(e) => pushToFirebaseDB(e, coin)}
                      icon={<StarBorderIcon />} 
                      checkedIcon={<StarIcon />}
                      checked={valuesAddedToDB(coin)}
                      >
                    </Checkbox>
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'white;', fontFamily: 'Montserrat'}}>{coin.market_cap_rank}</TableCell>
                    <MediaQuery minWidth={600}>
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat'}}><Link to={coin.id}><img className='image-table' src={coin.image} />{coin.name}</Link></TableCell>  
                    </MediaQuery>
                    <MediaQuery maxWidth={500}>
                    <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat'}}><Link to={coin.id}><img className='image-table' src={coin.image} /></Link></TableCell>  
                    </MediaQuery>
                    <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat'}}>${ priceFormatter(coin.current_price) }</TableCell>
                    <TableCell
                      align="center"
                      sx={ coin.price_change_percentage_24h > 0 ? {color: 'green !important'} : {color: 'red !important', width: '1%'}}>
                      { coin.price_change_percentage_24h.toFixed(2) }%
                    </TableCell>
                    {/* <MediaQuery maxWidth={500}>
                      <TableCell align="center" sx={{ display: { xs: 'none'}, color: 'white', fontFamily: 'Montserrat' }}>${ coin.total_volume.toLocaleString() }</TableCell>
                      <TableCell align="center" sx={{ display: { xs: 'none'}, color: 'white', fontFamily: 'Montserrat' }}>${ coin.market_cap.toLocaleString() }</TableCell>  
                    </MediaQuery> */}
                    {/* <MediaQuery minWidth={600}> */}
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat' }}>${ coin.total_volume.toLocaleString() }</TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat' }}>${ coin.market_cap.toLocaleString() }</TableCell>
                      <TableCell key={coin.name}>
                        <LineChart width={300} height={100} data={coinPricingData}>
                        <Line type="natural" dataKey="price" stroke={priceIncrease ? "#82ca9d" : "red"} dot={false} />
                        <Tooltip content={ Toolip } cursor={ false } wrapperStyle={{ outline: 'none' }} />
                        <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                        </LineChart> 
                      </TableCell>
                    {/* </MediaQuery> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        </TableContainer>
        </MediaQuery>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={coins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  );
}

export default EnhancedTable;
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, Tooltip, YAxis } from 'recharts';

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <StarBorderIcon
          sx={{color: 'white'}} 
           /> */}
           <Checkbox 
            sx={{
              color: '#f1bb09',
              '&.Mui-checked': 
              {
                color: '#f1bb09',
              },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            icon={<StarBorderIcon />} 
            checkedIcon={<StarIcon />}>
          </Checkbox>
          {/* <Checkbox 
            sx={{color: 'white'}}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headers.map((header) => (
          <TableCell 
            sx={{color: 'white'}}
            key={ header.id }
            align={'center'}
            padding={header.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === header.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === header.id}
              direction={orderBy === header.id ? order : 'asc'}
              onClick={createSortHandler(header.id)}
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
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);

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
  <div style={{ fontFamily: 'Roboto',  color : 'white',  fontSize: '12px', fontFamily: 'Montserrat', fontWeight: 'bold' }} >
  {props.payload.map(v => <p>{v.value}</p>)}
  </div> )

  return (
    <div>
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
            <input
            className="coin-input"
            type='text'
            onChange={ handleChange }
            placeholder='Search...'
            />
        </form>
      </div>  
    <Box sx={{ width: '100%' }}>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={coins.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(coins, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((coin => coin.name.toLowerCase().includes(search.toLowerCase())))
                .map((coin, index) => {
                  const isItemSelected = isSelected(coin.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
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
                      role="checkbox"
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
                            color: '#f1bb09',
                          },
                        }}
                        aria-label="upload picture" 
                        component="label" 
                        icon={<StarBorderIcon />} 
                        checkedIcon={<StarIcon />}>
                      </Checkbox>
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat' }}>{coin.market_cap_rank}</TableCell>
                      <TableCell align="left" sx={{ color: 'white', fontFamily: 'Montserrat' }}><img className='image-table' src={coin.image} /><Link to={coin.id}>{coin.name}</Link></TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat' }}>${ coin.current_price.toLocaleString() }</TableCell>
                      <TableCell 
                        align="center"
                        sx={ coin.price_change_percentage_24h > 0 ? {color: 'green'} : {color: 'red'}}>
                        { coin.price_change_percentage_24h.toFixed(2) }%
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat' }}>${ coin.total_volume.toLocaleString() }</TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontFamily: 'Montserrat' }}>${ coin.market_cap.toLocaleString() }</TableCell>
                      <TableCell key={coin.name}>
                        <LineChart width={350} height={100} data={coinPricingData}>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={coins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </div>
  );
}

export default EnhancedTable;
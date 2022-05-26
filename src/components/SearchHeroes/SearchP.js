import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

class SearchP extends React.Component {


render() {
  const{inputeValue} = this.props
  return (
    <>
      <Box
        component = "form"
        noValidate
        autoComplete = "off"
        sx = {{display: 'flex', justifyContent: 'center'}}
        onSubmit={this.props.click}
      >
        <TextField 
          value={inputeValue}
          onChange={this.props.onChange}
          id="outlined-basic" 
          sx={{ width: '45ch'}} 
          label="Search" 
          variant="outlined" 
          />
        <Button 
          variant="contained" 
          type='submit'
          sx = {{
            color: '#c3e3ff', 
            background: '#16456d', 
            ml: '10px',
          }} 
          endIcon={<SearchIcon />}
          >
          Search
        </Button>
      </Box>
    </>
  );
}
}
    


export default SearchP;
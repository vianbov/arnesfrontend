import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useState, useEffect} from 'react';
import { Paper} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';



export default function Entity() {
  const paperStyle={padding:'50px 20px', width:600, margin:"20px auto"}
  const[title,setTitle]=useState('')
  const[id, setId]=useState('')
  const [start_at, setDateTime] = useState(dayjs('2023-10-24T15:30'));
  const[entities, setEntities]=useState([])
   
  const handleClick=(e)=>{
    e.preventDefault()
    const entity={title,start_at}
    console.log(entity)
    if(title !== ""){
    fetch("http://localhost:8080/reservations/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(entity)
    }).then(()=>{
      console.log("New entity added")})
    }
  }

  const handleClickDelete=(e)=>{
    e.preventDefault()
    console.log(id)
    if(id>0){
    fetch("http://localhost:8080/reservations/delete/" + id,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(id)
    }).then(()=>{
      console.log("Entity deleted")})
    }
  }

useEffect(()=>{
  fetch("http://localhost:8080/reservations/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setEntities(result);
  }
)
},[])

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Title" variant="outlined"
      value={title}
      onChange={(e)=>setTitle(e.target.value)} />
          <Paper elevation={3} style={paperStyle}>
          { <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label="Start Date"
          value={start_at}
          onChange={(e) => setDateTime(e)}
        />
      </DemoContainer>
    </LocalizationProvider> }
    </Paper>
      <button onClick={handleClick}>
Submit
      </button>
      <TextField id="outlined-basic" label="Delete by Id" variant="outlined"
      value={id}
      onChange={(e)=>setId(e.target.value)} />
      <button onClick={handleClickDelete}>
    Delete
  </button>
    <h1>Reservations</h1>
    <Paper elevation={3} style={paperStyle}>
      {entities.map(entity=>(
        <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={entity.id}>
      Id:{entity.id}<br/>
    Title:{entity.title}<br/>
  StartDate:{entity.start_at}<br/> 
    </Paper>
      ))
}
      </Paper>
    </Box>
  );
}



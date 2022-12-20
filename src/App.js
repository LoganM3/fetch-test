import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

function App() {

  const [form, setForm] = useState({});
  const [info, setInfo] = useState()


  useEffect (() => {
    fetch('https://frontend-take-home.fetchrewards.com/form')
    .then(res => res.json())
    .then(data => setInfo(data))
    .catch(err => console.log(err))
  }, [])

  //console.log(info)

   const handleSubmit = (e) => {
     e.preventDefault();
     fetch('https://frontend-take-home.fetchrewards.com/form', 
     {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
    .then((res) => res.json())
    .then((data) => alert('Form Submitted Successfully'))
    .catch((err) => alert(err.message));
  }


  const updateForm = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  
  console.log(form)

  return (
    <div className='App'>
      <div className='img-container'>
        <img src='fetch.png' className='logo'/>
     </div>
      <div className='form-container' id='fmc'>
  <Form  onSubmit={handleSubmit} >
    <h1>Please Fill Out </h1>
  <Form.Group className='Name' id='inner-container'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control className='input'
                type='text'
                name='name'
                placeholder='add name'
                required
                onChange={updateForm}
              />
            </Form.Group>
         
             <Form.Group className='email' id='inner-container'>  
              <Form.Label>Email</Form.Label>
              <Form.Control className='input'
                type='email'                         
                name='email'
                placeholder='example@test.com'
                 required
                onChange={updateForm}
              />
            </Form.Group> 

            <Form.Group className='password' id='inner-container'>
              <Form.Label>Password</Form.Label>
              <Form.Control  className='input'
              type='password' 
              name='password'
              placeholder='password' 
               required
              onChange={updateForm}
              />
            </Form.Group>

            <Form.Group className='dropDown' id='inner-container'>
              <Form.Label>occupation</Form.Label>
             <Form.Select className='input'
              required  
             name='occupation'
            onChange={updateForm}
             >
               <option >-select job-</option>
                 {info?.occupations.map((occupation, index) =>(
                   <option key={index} value={occupation} >
                     {occupation}
                   </option>
                     ))}  
             </Form.Select>
            </Form.Group>
           
            <Form.Group className='dropDown' id='inner-container'>
              <Form.Label>State</Form.Label>
             <Form.Select className='input'
            required  
            name='state'
            onChange={updateForm}
             >
             <option>-Select your state-</option>
             {info?.states.map((state, index) =>(
                   <option key={index} value={state.name} >
                     {state.name}
                   </option>
                     ))}  
             </Form.Select>
             </Form.Group>
             <br/>
               <div  className='btn'>
                 <Button type='submit'> Submit </Button>
               </div>
          </Form>
          </div>
    </div>
  );
}

export default App;

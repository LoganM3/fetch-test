import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import './App.css';

function App() {

  const [form, setForm] = useState({});
  const [info, setInfo] = useState()

  useEffect (() => {
    fetch('https://frontend-take-home.fetchrewards.com/form')
    .then(res => res.json())
    .then(data => setInfo(data))
    .catch(err => console.log(err))
  }, [setInfo])

  //console.log(info)

  // const occupations = info?.occupations.map ((occupation, index) =>{
  //   return(
  //   <div>key={index} value={occupation.id}</div>,
  //   {occupation}
  //   )});


  // console.log(occupations)

  const updateForm = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
  <Form>
  <Form.Group className="Name" controlId="">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="add name"
                required={true}
                // value={form.name}
                onChange={updateForm}
              />
            </Form.Group>
         
         
             <Form.Group className="email" controlId="">  
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"                         
                name="email"
                placeholder="example@test.com"
                required={true}
                onChange={updateForm}
              />
            </Form.Group> 

            <Form.Group className="password" controlId="">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              name="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="password" 
              required={true}
              onChange={updateForm}
              />
              
            </Form.Group>

            <Form.Group className="dropDown" controlId="">
           
            
              <Form.Label>ocupation</Form.Label>
             <Form.Select>
               <option>Open this select menu</option>
                
                 {info?.occupations.map((job, index) =>(
                   <option key={index} value={job.occupation} >
                     {job.occupation}
                   </option>
                     ))}  
             {/* <option value="1">One</option>
             <option value="2">Two</option>  */}
              onChange={updateForm}
             </Form.Select>
            </Form.Group>
           
            <Form.Group className="dropDown" controlId="">
              <Form.Label>State</Form.Label>
             <Form.Select>
             <option>Select your state</option>

             {info?.states.map((state, index) =>(
                   <option key={index} value={state.name} >
                     {state.name}
                   </option>
                     ))}  
             </Form.Select>
            </Form.Group>
  

          </Form>
    </div>
  );
}

export default App;

import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import './App.css';
import { Button } from "react-bootstrap";

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
     fetch('https://frontend-take-home.fetchrewards.com/form'
    , {
      method: "POST",
      mode: "cors",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
     .catch(err => alert(err.message))
  }


  const updateForm = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  console.log(form)

  return (
    <div className="App">
  <Form action="submit">
  <Form.Group className="Name" controlId="">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="add name"
                onChange={updateForm}
                 value={form.name}
                required="true"
              />
            </Form.Group>
         
         
             <Form.Group className="email" controlId="">  
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"                         
                name="email"
                placeholder="example@test.com"
                 required="true"
                onChange={updateForm}
                value={form.email}
              />
            </Form.Group> 

            <Form.Group className="password" controlId="">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              name="Password"
              placeholder="password" 
               required="true"
              onChange={updateForm}
              value={form.password}
              />
              
            </Form.Group>

            <Form.Group className="dropDown" controlId="">
              <Form.Label>occupation</Form.Label>
             <Form.Select 
              required="true"  
             name="occupation"
            onChange={updateForm}
             value={form.occupation}
             >
               <option >-select job-</option>
                 {info?.occupations.map((occupation, index) =>(
                   <option key={index} value={occupation} >
                     {occupation}
                   </option>
                     ))}  
             </Form.Select>
            </Form.Group>
           
            <Form.Group className="dropDown" controlId="">
              <Form.Label>State</Form.Label>
             <Form.Select 
            required="true"  
             name="state"
            onChange={updateForm}
             value={form.state}
             >
             <option>-Select your state-</option>
             {info?.states.map((state, index) =>(
                   <option key={index} value={state.name} >
                     {state.name}
                   </option>
                     ))}  
             </Form.Select>
             </Form.Group>
              <Button type="submit" onClick={handleSubmit}> Submit </Button>
          </Form>
    </div>
  );
}

export default App;

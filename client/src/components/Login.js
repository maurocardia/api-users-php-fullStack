import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/login.css"
import {useForm} from "react-hook-form"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    const {register, handleSubmit, reset} = useForm()
    const [personaje,setPersonaje]=useState([])

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/usuarios")
        .then(res=>setPersonaje(res.data))

        },[])
        console.log(personaje)

    const onSubmit=(data)=>{
    
        axios.post("http://127.0.0.1:8000/api/login",data)
        .then(res=> {console.log(res.data.accessToken)
            localStorage.setItem('token',res.data.accessToken)
                    navigate(`/${res.data.user.id}`)})
             
        .catch(error=>{
            if(error.response?.status===401){
                alert("usuario no valido")
            }
            console.log (error.response)
        })
        reset({
            email:"",
            password:""
        })

    }


  return (
    <div className="containerLogin">
       
       <h1 className="titleLogin">User App</h1> 
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password")}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button> 
      </Form>
    </div>
  );
};

export default Login;

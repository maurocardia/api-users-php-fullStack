import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../styles/user.css";
import Form from "react-bootstrap/Form";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form"
import getConfig from "../utils/getConfig"
import { URL_API } from "../http/const";


const User = () => {
  const {register, handleSubmit, reset, } = useForm()

  const { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [refresh,setRefresh]=useState()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=2`)
      .then((res) => setCharacters(res.data.results));

    axios
      .get(`${URL_API}/usuarios/${id}`,getConfig())
      .then((res) => setUser(res.data.user[0]));
  }, []);

  const buttonStatus = (status) => {
    if (status === "Alive") {
      return <div className="statusAlived"></div>;
    } else if (status === "Dead") {
      return <div className="statusDead"></div>;
    } else {
      return <div className="statusUnknown"></div>;
    }
  };

  const onSubmit=(data)=>{
    axios
    .patch(`${URL_API}/usuarios/${id}`,data, getConfig())
    .then(res=> {handleClose()
                  setRefresh(user.name)})
    alert("se ha modificado el usuario con exito!")
    }



  console.log(user);

  return (
    <div className="containerCharacterPage">
      <div className="containerUser">
        <div className="containerBanner">
          <div className="banner"></div>
        </div>
        <div className="secondBar">
          <div className="user">
            <div className="userIcon">
              <AiOutlineUser />
            </div>
            <h5 className="userInSession">{user.name}</h5>
          </div>

          <div className="controlBar">
            <Form.Select
              className="selectPersonaje"
              aria-label="Default select example"
            >
              <option disabled selected>
                Ver personajes por:
              </option>
              <option value="1">Todos los personajes</option>
              <option value="2">Mis personajes favoritos</option>
            </Form.Select>
          </div>
          <div className="editUserForm">
            <Button className="buttonEdit" variant="primary" onClick={handleShow}>
              Edit User
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Editar informacion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pepito Perez"
                      autoFocus
                     {...register("name")}
                     value={user.name}

                     
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="carrera 123 # 123-123"
                      autoFocus
                      
                    
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="cali"
                      autoFocus
                      {...register("city")}
                    
                      
                    />
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="2000-04-20 "
                      autoFocus
                     {...register("birthdate")}
                     defaultValues={user.birthdate}
                     
                    />
                  </Form.Group>
                    <br />
                  <Button variant="primary" type="submit" onClick={onSubmit}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <div className="containerCharacter">
        {characters.map((character) => (
          <div className="character">
            <img
              src={character.image}
              alt=""
              onClick={() => navigate(`/user/${character.id}`)}
            />
            <h5>{character.name}</h5>
            <div className="containerStatus">
              <div>
                <p>{character.status}</p>
              </div>
              {buttonStatus(character.status)}
            </div>
            <div className="buttonFavorite">
              <h1>
                <FaHeart />
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;

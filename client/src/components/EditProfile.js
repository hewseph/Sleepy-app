/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { updateProfile } from '../actions';

const userSchema = Yup.object().shape({
  email: Yup.string().email(),
  name: Yup.string(),
  nameKid: Yup.string(),
  kidBD: Yup.date(),
});

export default function EditProfile({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.errorMessage);

  const { email } = user;
  const { name } = user;
  const { nameKid } = user;
  const { kidBD } = user;
  const [email1, setEmail] = useState(null);
  const [name1, setName] = useState(null);
  const [nameKid1, setNameKid] = useState(null);
  const [kidBD1, setKidBD] = useState(null);

  const data = { email1, name1, nameKid1, kidBD1 };
  console.log('data', data);
  const handleFormSubmit = () => {
    dispatch(
      updateProfile(data, () => {
        navigate('/personal');
      })
    );
  };

  const errorRender = () => {
    if (error) {
      return <p className="error-message">{error}</p>;
    }
  };

  return (
    <div
      className="h-100 p-5 text-white bg-dark main-container-center"
      style={{
        position: 'absolute',
        display: 'inline-block',
        width: '100%',
        marginTop: '5%',
      }}
    >
      <Form className="form-signup" onSubmit={handleSubmit(handleFormSubmit)}>
        <h3 className="centered">Edit Profile</h3>
        {errorRender()}
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Update email</Form.Label>
          <Form.Control
            type="email"
            value={email1}
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
            // {...register('email')}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label>Update name</Form.Label>
          <Form.Control
            type="text"
            value={name1}
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
            // {...register('name')}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicNameKid">
          <Form.Label>Update kid's name</Form.Label>
          <Form.Control
            type="text"
            value={nameKid1}
            placeholder={nameKid}
            onChange={(e) => setNameKid(e.target.value)}
            // {...register('nameKid')}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicDate">
          <Form.Label>Update kid's birthday</Form.Label>
          <Form.Control
            type="date"
            value={kidBD1}
            placeholder={kidBD}
            onChange={(e) => setKidBD(e.target.value)}
            // {...register('kidBD')}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="centered-button">
          Update
        </Button>
      </Form>
    </div>
  );
}

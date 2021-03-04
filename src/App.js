import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import Input from './components/Form/Input';
import { Scope } from '@unform/core'
import * as Yup from 'yup';
import './App.css';


function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatória')
        })
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      
      formRef.current.setErrors([]);
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Gallo',
        email: 'gallo@gmail.com',
        address: {
          city: 'Joinville'
        }
      })
    }, 2000)
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <Scope path="address">
          <Input name="street" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>
        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;

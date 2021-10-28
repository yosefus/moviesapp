import React, { useState, useEffect } from 'react';

// components
import { Input } from '.';

// functions
import Joi from 'joi';
import userService from '../services/userServices';
import { Redirect } from 'react-router';

export default function LoginForm(props) {
  const [formData, setFormData] = useState({ email: '', userName: '', password: '' });
  const [Errors, setErrors] = useState({ email: '', userName: '', password: '' });
  const [iHaveAnAccount, setIhaveAnAccount] = useState(false);
  const [schemaArr, setSchemaArr] = useState([
    Joi.object({ email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) }),
    Joi.object({ userName: Joi.string().required().alphanum().label('User Name') }),
    Joi.object({ password: Joi.string().required().label('Password') }),
  ]);

  const [schema, setSchema] = useState(
    Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      userName: Joi.string().required().alphanum().label('User Name'),
      password: Joi.string().required().label('Password'),
    })
  );

  useEffect(() => {
    iHaveAnAccount ? resetFormToLogin() : resetFormToRegister();
  }, [iHaveAnAccount]);

  function resetFormToLogin() {
    setSchemaArr([
      Joi.object({ email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) }),
      Joi.object({ password: Joi.string().required().label('Password') }),
    ]);

    setSchema(
      Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().label('Password'),
      })
    );

    setFormData({ email: '', password: '' });
    setErrors({ email: '', password: '' });
  }

  function resetFormToRegister() {
    setSchemaArr([
      Joi.object({ email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) }),
      Joi.object({ userName: Joi.string().required().alphanum().label('User Name') }),
      Joi.object({ password: Joi.string().required().label('Password') }),
    ]);

    setSchema(
      Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        userName: Joi.string().required().alphanum().label('User Name'),
        password: Joi.string().required().label('Password'),
      })
    );

    setFormData({ email: '', userName: '', password: '' });
    setErrors({ email: '', userName: '', password: '' });
  }

  async function doSubmit(formData) {
    try {
      !iHaveAnAccount && (await userService.register(formData)); //first register then login
      await userService.login(formData);

      const { state } = props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const tempErrors = { ...Errors };
        tempErrors.email = error.response.data.error;
        setErrors(tempErrors);
      }
    }
  }

  function resetForm() {
    setFormData(iHaveAnAccount ? { email: '', password: '' } : { email: '', userName: '', password: '' });
  }

  // reusable function
  const renderBtnSubmit = (label) => (
    <button type="submit" disabled={validate()} className="btn btn-primary">
      {label}
    </button>
  );

  const renderInput = (name, label, type) => (
    <Input
      onChange={handleInputChange}
      label={label}
      type={type}
      name={name}
      error={Errors[name]}
      value={formData[name]}
    />
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const isAnError = validate();

    if (isAnError) {
      setErrors(isAnError);
      return null;
    }

    await doSubmit(formData);
    // e.target.reset();
    resetForm();
  }

  function validate() {
    const options = { abortEarly: false };
    const { error } = schema.validate(formData, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value };

    let result = null;

    const tryObjToArr = Object.keys(formData);

    tryObjToArr.forEach((item, index) => {
      if (item === name) result = schemaArr[index].validate(obj);
    });

    return result.error ? result.error.details[0].message : null;
  }

  function handleInputChange({ target: input }) {
    const tempData = { ...formData };
    tempData[input.name] = input.value;
    setFormData(tempData);

    handleErrorsOnChangeInput(input);
  }

  function handleErrorsOnChangeInput(input) {
    const tempErrors = { ...Errors };

    const errorMsg = validateProperty(input);

    errorMsg ? (tempErrors[input.name] = errorMsg) : (tempErrors[input.name] = '');

    setErrors(tempErrors);
  }

  if (userService.getCurrentUser()) return <Redirect to="/" />;
  return (
    <div className="container p-3">
      <div className="d-flex justify-content-center">
        <form style={{ maxWidth: 600, width: 600 }} onSubmit={handleSubmit}>
          <h1 className="text-center m-3">{iHaveAnAccount ? 'Login' : 'Register'}</h1>
          {renderInput('email', 'Email', 'email')}
          {formData?.userName?.length >= 0 ? renderInput('userName', 'User Name', 'text') : ''}
          {renderInput('password', 'Password', 'password')}
          {renderBtnSubmit(iHaveAnAccount ? 'Login' : 'Register')}
          <button onClick={() => setIhaveAnAccount(!iHaveAnAccount)} className="btn btn-outline-info m-2">
            {iHaveAnAccount ? 'I Don`t Have An Account Yet' : 'I`m Already Have An Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

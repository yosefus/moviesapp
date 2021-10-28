import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Joi from 'joi';
import { Input } from '../../Components';

// functions
import { getMovie, saveMovie, getGenres, createMovie } from '../../services/moviesServices';

// css

export default function MoviesForm({ id }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    numberInStock: 0,
    dailyRentalRate: 0,
  });
  const [Errors, setErrors] = useState({
    title: '',
    genre: '',
    numberInStock: '',
    dailyRentalRate: '',
  });
  const [genres, setGenres] = useState([]);

  const newMovie = id === 'new' && true;

  useEffect(() => {
    !newMovie && getTheCurrentMovie();
    getAllGenres();
  }, [newMovie]);

  async function getTheCurrentMovie() {
    if (!newMovie) {
      try {
        const { title, genre, numberInStock, dailyRentalRate } = await getMovie(id);

        setFormData({
          title: title,
          genre: genre.name,
          numberInStock: numberInStock,
          dailyRentalRate: dailyRentalRate,
        });
      } catch (error) {
        if (error.response && error.response.status === 400) return history.replace('/not-found');
      }
    }
  }

  async function getAllGenres() {
    const res = await getGenres();
    setGenres(res);
  }

  const schemaArr = [
    Joi.object({ title: Joi.string().required().label('Title') }),
    Joi.object({ genre: Joi.string().required().alphanum().label('Genre') }),
    Joi.object({ numberInStock: Joi.number().integer().min(1).max(10).required().label('Number In Stock') }),
    Joi.object({
      dailyRentalRate: Joi.number().min(1).max(10).required().label('Daily Rental Rate'),
    }),
  ];

  const schema = Joi.object({
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().alphanum().label('Genre'),
    numberInStock: Joi.number().integer().min(1).max(10).required().label('Number In Stock'),
    dailyRentalRate: Joi.number().min(1).max(10).required().label('Daily Rental Rate'),
  });

  async function doSubmit(formData) {
    const data = { ...formData };
    data.genre = genres.filter((g) => g.name === formData.genre)[0];
    id !== 'new' ? await saveMovie({ id: id, data: data }) : await createMovie({ data: data });
    history.push('/movies');
  }

  const renderSelectionInput = () => (
    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="inputGroupSelect01">
        Genre
      </label>
      <select
        onChange={handleInputChange}
        value={formData.genre}
        name={'genre'}
        className="form-select"
        id="inputGroupSelect01"
      >
        {newMovie && <option>Choose...</option>}
        {genres.map((genre) => (
          <option key={genre._id} className="titles" value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );

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

  function handleSubmit(e) {
    e.preventDefault();
    const isAnError = validate();

    if (isAnError) {
      setErrors(isAnError);
      return null;
    }

    doSubmit(formData);
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

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-center">
        <form style={{ maxWidth: 600, width: 600 }} onSubmit={handleSubmit}>
          <h1 className="text-center m-3">{newMovie ? 'Create New Movie' : 'Update Movie Details'}</h1>
          {renderInput('title', 'Title', 'text')}
          {renderSelectionInput()}
          {renderInput('numberInStock', 'Number In Stock', 'number')}
          {renderInput('dailyRentalRate', 'Daily Rental Rate', 'number')}
          {renderBtnSubmit(newMovie ? 'Create' : 'Update')}
        </form>
      </div>
    </div>
  );
}

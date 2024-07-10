import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
        setLoading(false);
      });
  }, [id, navigate]);

  const handleDeleteBook = () => {
    setLoading(true); 
    axios.delete(`http://localhost:8000/books/${id}`).then((res) => {
      setLoading(false);
      navigate('/');
    }).catch((err) => {
      console.log(err);
      setLoading(false);
      alert('Error while deleting the book');
    });
  }
  return (
    <div className='p-4'>
      <BackButton /> 
      <h1 className='text-3xl my-4'>
        Delete Book
      </h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-800 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>
          Are you sure you want to delete this book?
        </h3>
        <button 
          className='p-4 bg-red-500 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
         Yes, Delete it! 
        </button>

      </div> 
    </div> 
  )
}

export default DeleteBook
import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

function Description() {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();
  const movie = location.state;
  console.log("movie----------", movie)
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();


  const { id } = useParams();
  console.log('id =', id)

  return (
    <>
      <Layout />
        <h2>
         {movie.description}
        </h2>
        <h3>category:{movie.category}</h3>
        
      <img
        src={'http://localhost:4000/uploads/' + movie.uploaded_file}
        width='400' height='400'
         className='descimg'
      />
      <h3 className='ratingdesc'>
       Ratings : {movie.rating}
      </h3>

    </>

  )
}

export default Description
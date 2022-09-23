import React from 'react'
import Layout from './Layout'
import { useAuth0 } from "@auth0/auth0-react";
import '../App.css'

function Home() {

    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
    <Layout />
    <div>
        {(isAuthenticated ? 
        <div>
            <h2>Welcome to Netflix </h2>
            <p>Here you can add your custom movies and series.</p>
            <p>Unlimited movies, TV shows and more .</p>
            <h3>Netflix, Inc. is an American subscription streaming service and production company based in Los Gatos, California.</h3>
        </div>
        :
         <h1 className='please'>
          Please Login first
        </h1>
        )}
    </div>
    </>
  )
}

export default Home
import { Outlet ,Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
 const Layout = () =>{

    const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
      return  (

        <>
    <nav>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand netflix" >Netflix</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <Link  class="nav-link" to="/">Home</Link>
            </li>

            {(isAuthenticated &&
            <li class="nav-item">
                <Link class="nav-link" to="/List">Category</Link>
            </li>
            )}

            {(isAuthenticated &&
              <li class="nav-item">
                <Link class="nav-link" to="/Series">All</Link>
              </li>
              )}

                {/* {(isAuthenticated &&
              <li class="nav-item">
            <Link class="nav-link" to="/Anime">Anime</Link>
              </li>
              )} */}
  

        

             {(isAuthenticated ?
                <li class="nav-item">
                <Link  onClick={() => logout({ returnTo: window.location.origin })}     class="nav-link"> {user.name} Logout</Link>
                </li>
                 : 
                <li class="nav-item"> 
                        <Link  type="button"  onClick={() => loginWithRedirect()} class="nav-link">Log In</Link>
                </li>
                
             )}
             
            </ul>
        </div>
    </nav>
         

        </nav>
        </>
      )
 }
 export default Layout
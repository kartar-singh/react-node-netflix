// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import '../App.css'
const axios = require('axios').default;

function Series() {

  useEffect(()=>{
    fetchData()
  },[]) 
  const [data , setData] = useState([]);
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
    const fetchData = async (currentPage1) => {
      const response = await axios.get(`http://localhost:4000/series_page?pageSize=6&page=${currentPage1}`)
      setData(response.data)
      console.log("::::::::::::::::::responce",response);
           }

           console.log(':::::::Fetchdata',data)

           const handlePageClick = async (data) => {
            let currentPage = localStorage.setItem("page_no",data.selected) ;
            let currentPage1 = localStorage.getItem("page_no");
            console.log('::::paginate=>',currentPage1);
            console.log("test",data.selected)
            const commentsFormServer = await fetchData(currentPage1);
      
          }
          async function searchData(key) {
    
            if (key) {
        
              const result = await axios.get(`http://localhost:4000/search/${key}`)
              console.log("search=>", result)
              setData(result.data)
        
            } else {
        
              fetchData();
            
            }
          }
        
          
     

  return (
  <>

      
   <Layout />
  {isAuthenticated && !isLoading &&
  <div  className='container-fluid main' >
    <input type="text"
            onChange={(e) => searchData(e.target.value)}
            placeholder="search"
            className=" mysearch"
          />
      <div className='container '>
      <div className="row sec" >
   {
     data.map((todo, index) =>
     <div className="col-lg-4 col-sm-6">
          <div key={index}>
            <li className="name">
               <a href="/description">{todo.moviename}</a>
            </li>
            <img
                src={'http://localhost:4000/uploads/'+todo.uploaded_file} 
                width='200' height='250'
            />
      </div>
        </div>
         )    }
         </div>
          <div className='fixed-bottom page'>

          <ReactPaginate 
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            />

           </div>
           </div>
            </div> 
           } 
           { isLoading &&  <h1>Loading</h1>}
   </>
  )
}

export default Series

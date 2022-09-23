// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import '../App.css'
import async from "hbs/lib/async";
const axios = require('axios').default;
var cors = require('cors')

function List() {
  const navigate = useNavigate()
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState({});
  const [getdata,setGetdata] = useState([]);

  useEffect(() => {
    fetchData()
    fetchCategory();
  }, [])

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const fetchData = async (currentPage1) => {
    const response = await axios.get(`http://localhost:4000/pagi?pageSize=6&page=${currentPage1}`)
    setData(response.data)
    console.log("::::::::::::::::::responce", response);
  }

  console.log(':::::::Fetchdata', data)

  const fetchCategory = async () => {
    const responce2 = await axios.get(`http://localhost:4000/categ`)
    console.log('categoryResponce ===>----------------------------------------------', responce2);
    setCategory(responce2.data)
  }
  const sendCategory = async (e) => {
    setSelect(e.target.value)
    console.log("--------------------------------------------",e.target.value)
    const send = await axios.get(`http://localhost:4000/cata?type=${e.target.value}`)
    console.log('xxxxxxxxxxxxxMy new sendCatagory ===>', send.data.register);
    setGetdata(send.data.register)
  }
   console.log("::::::::::::::::::>getData",getdata)
  console.log(":::::::> category", category)

  const handlePageClick = async (data) => {
    let currentPage = localStorage.setItem("page_no", data.selected);
    let currentPage1 = localStorage.getItem("page_no");
    console.log('::::paginate=>', currentPage1);
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

  console.log("::::::::selected_category=>", select);
  return (
    <>
      <Layout />
      {isAuthenticated && !isLoading &&

        <div className='container-fluid main' >
          <input type="text"
            onChange={(e) => searchData(e.target.value)}
            placeholder="search"
            className=" mysearch"
          />
          <select class="form-select selectbox" aria-label="Default select example" value={select} onChange={(e) => sendCategory(e)}>
            {
              category.map((item, key) => {
                return <option key={key} value={item.category}>{item.category}</option>
              })
            }
          </select>


          <div className='container '>

            <div className="row sec" >
              {
               (getdata && getdata.length > 0) ? 
               getdata.map((todo, index) =>
                  <div className="col-lg-4 col-sm-6" key={index}>
                    <div >

                      <a onClick={() => navigate(`/description/${todo._id}`, { state: todo })}>

                        <li className="name">

                          {todo.moviename}
                        </li>
                        <img
                          src={'http://localhost:4000/uploads/' + todo.uploaded_file}
                          width='200' height='250'
                        />
                      </a>
                    </div>
                  </div>
                )
               : 
                data.map((todo, index) =>
                  <div className="col-lg-4 col-sm-6" key={index}>
                    <div >

                      <a onClick={() => navigate(`/description/${todo._id}`, { state: todo })}>

                        <li className="name">

                          {todo.moviename}
                        </li>
                        <img
                          src={'http://localhost:4000/uploads/' + todo.uploaded_file}
                          width='200' height='250'
                        />
                      </a>
                    </div>
                  </div>
                )}
            </div>
            <div className='fixed-bottom page'>

              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={4}
                marginPagesDisplayed={1}
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
      {isLoading && <h1>Loading</h1>}
    </>
  )
}

export default List

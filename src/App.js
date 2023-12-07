import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Alert from './components/Alert';

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  
  const navigate = useNavigate();
  
  const  logOut = () => {
    setJwtToken("");
    navigate("/login");
  }

  useEffect(()=>{
    if (jwtToken === ""){
      const requestOptions = {
        method: "GET",
        credentials: "include",
      }

      fetch(`/request`, requestOptions)
        .then((response) => response.json())
        .then((data)=> {
          if(data.access_token) {
            setJwtToken(data.access_token);
          }
        })
        .catch(error => {
          console.log("user is not logged in");
        })
    }
  }, [jwtToken])

  return (
    <div className="container">
        <div className="row text-center">
          <div className='col offset-md-4'>
            <h1 className="mt-3">Go Code, it's 10:30</h1>
          </div>
          <div className="col text-end">
            <Link to="/login">
              {jwtToken === ""
              ?(
                <span className="badge bg-success">Login</span>
              )
              :(
                <a href='#!' onClick={logOut}><span className='badge bg-danger'>Logout</span></a>
              )
              }
            </Link>
          </div>
          
          <hr className="mg-3"/>
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <div className="list-group">
                <Link to="/" className="list-group-item list-group-item-action">Home</Link>
                <Link to="/timesheet" className="list-group-item list-group-item-action">Timesheet</Link>
                <Link to="/graph" className="list-group-item list-group-item-action">Graph</Link>
                {jwtToken !== "" && 
                <>
                  <Link to="/admin/times/0" className="list-group-item list-group-item-action">Add Times</Link>
                  <Link to="/manage-times" className="list-group-item list-group-item-action">Manage Times</Link>
                  <Link to="/graphql" className="list-group-item list-group-item-action">GraphQL</Link>
                </>
                }
              </div>
            </nav>
          </div>
          
          <div className="col-md-10">
            <Alert 
              message = {alertMessage}
              className = {alertClassName}
            />

            <Outlet context = {{
              setJwtToken, jwtToken, setAlertClassName, setAlertMessage
            }}/>
          </div>
        </div>
    </div>
  );
}

export default App;

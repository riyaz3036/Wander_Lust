import React, {useState,useContext,useEffect}from 'react'
import '../styles/login.css'
import {Container, Row, Col,Form, FormGroup, Button} from 'reactstrap'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {BASE_URL} from '../utils/config.js';
import {AuthContext} from "./../context/AuthContext";


const Login = ()=>{

    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

//to scroll to top
const { pathname } = useLocation();
useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);

    //to Store the login details
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });


    //Handling change and submit
    const handleChange = e=>{
        setCredentials(prev=>({...prev,[e.target.id]:e.target.value}));
    }

   
   const handleSubmit = async e=>{
    e.preventDefault();
    dispatch({type:'LOGIN_START'})
    


    try{
        const res = await fetch(`${BASE_URL}/auth/login`,{
            method: 'post',
            headers:{
             'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })
        const result = await res.json();

        if(!res.ok) {
            alert(result.message)
            return;
        }

        
        dispatch({type:'LOGIN_SUCCESS', payload:result.data})
        alert("Login Successfull")
        navigate('/')

    }catch(e){
        dispatch({type:'LOGIN_FAILURE', payload:e.message})
    }


   }
    
    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" className="m-auto">
                        <div className="login__container">
                            <div className="login__form">
                            <h2 className="text-center">Login</h2>

                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <input type="text" placeholder="email" required id="email" onChange={handleChange}/>
                                </FormGroup>

                                <FormGroup>
                                    <input type="password" placeholder="Password" required id="password" onChange={handleChange}/>
                                </FormGroup>

                                <Button className="btn secondary__btn auth__btn" type="submit" onSubmit={handleSubmit}>Login</Button>
                            </Form>

                            <p>Dont have an account?<Link to="/register">Register</Link></p>
                            </div>
                        
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};


export default Login;

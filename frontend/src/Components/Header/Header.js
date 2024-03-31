import React, {useEffect, useRef,useContext} from 'react'
import {Container, Row, Button} from 'reactstrap';
import { NavLink, Link,useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';
import {AuthContext} from "./../../context/AuthContext";




const Header = ()=>{

  
    const navigate = useNavigate();
    const {user, dispatch} = useContext(AuthContext);

    //Logout
     const logout =()=>{
     
     dispatch({type:'LOGOUT'})
     navigate('/')
     alert("Successfully Logged out!!")
     }
    

    const nav_links = [
        {
            path:'/home',
            display: 'Home'
        },
        {
            path:'/my-bookings',
            display: 'My Bookings'
        },
        {
            path:'/toggle-Membership',
            display:  user ? `${user.username}` : 'About'
        },    
    
    ]



//FOR STICKY HEADER
const headerRef = useRef(null)

const stickyHeaderFunc =()=>{
    window.addEventListener('scroll',()=>{
        if(document.body.scrollTop >80 || document.documentElement.scrollTop >80){
            headerRef?.current.classList.add('sticky__header')
        }else{
            headerRef?.current.classList.remove('sticky__header')
        }
    })
}

useEffect(()=>{
    stickyHeaderFunc()
    return window.removeEventListener('scroll',stickyHeaderFunc)
})

return (
    <header className="header" ref={headerRef}>
    
    <Container>
    <Row>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* logo start */}

            <div className="logo-top">
                <img className="logo-img" src={logo} alt="logo-image"/>
            </div>
            {/* logo start */}

            {/* menu start */}
            <div className="navigation">

            <ul className="menu d-flex align-items-center gap-5">
            {
                nav_links.map((item,index)=>(
                 <li className="nav__item" key={index}>
                    <NavLink to= {item.path} className={navClass=> navClass.isActive? "active__link":""}>{item.display}</NavLink>
                 </li>
                ))
            }
            </ul>

            </div>
            
            {/* menu end */}

            {/* login register start */}
            <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">
                
                {
                    user?<>
                    <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                    </>:<>
                    <Button className="btn secondary__btn">
                    <Link to='/login'>Login</Link>
                    </Button>

                     <Button className="btn primary__btn">
                    <Link to='/register'>Register</Link>
                    </Button>
                    
                    </>
                }

                

                </div>

                <span className="mobile__menu">
                 <i class="ri-menu-line"></i>
                </span>
                
            </div>
            {/* login register end */}


        </div>
    </Row>    
    </Container>


    </header>

)
};


export default Header;
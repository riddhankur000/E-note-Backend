// import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import Header from '../Header/Header.jsx'
import { IoCloseSharp } from "react-icons/io5";
import ReactTextTransition, { presets } from 'react-text-transition';
import { FcGoogle } from "react-icons/fc";
import Intro from '../Intro.jsx';
import Main_login from "../Main_login.jsx"
// import Intro from "../Intro.jsx";
// import TextLoop from "react-text-loop";
// import Footer from '../Footer/Footer.jsx'
// import { Outlet } from 'react-router-dom'
// import '../../src/index.css'









function Login(props) {

    // const navigateTo = useNavigate();

    
    // let index=0;
    let [intro, setintro] = useState(props.status);

    useEffect(()=>{

        setTimeout(() => {
            setintro(false);
            localStorage.setItem('firstLoadDone', 0);
        }, 4700);

        

    },[]);
    

    return (
        <>
            <div className='background_out'>
                <div className='background_in'>

                </div>
            </div>
            {/* <div id="google"></div> */}
            
            {intro?<div><Intro/></div>:
            <div><Main_login code={props.code}/></div>}
                
                








            {/* </div>} */}
            
                

            <script src="index.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </>
    )
}

export default Login
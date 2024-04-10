import React, { useState } from 'react'
import { IoLogOut } from "react-icons/io5";



function Header(props) {

  let [visible,setvisible]=useState(false);

  const make_visible=()=>{
    if(visible){
      document.querySelector(".user_data").classList.add("invisible");
      document.querySelector(".user_bg").classList.add("invisible_bg");
      setvisible(false);
    }
    else{
      document.querySelector(".user_data").classList.remove("invisible");
      document.querySelector(".user_bg").classList.remove("invisible_bg");
      setvisible(true)
    }
  }

  const right_shift=()=>{
    document.querySelector(".logout_icon").classList.remove("invisible_logout");
  }

  const left_shift=()=>{
    document.querySelector(".logout_icon").classList.add("invisible_logout");

  }

  return (
    <>
    <div className='Header'>
      
      <span className='Site_Logo'><span className='title_e'>E</span><span className='title_note'>note</span></span>
      {props.logged?(<div className='user_name' onClick={()=>{make_visible()}}>
          <b>{props.User}</b>
        </div>):
      (<span className='Login_button'> <input type='button' value="Login" className="login_inside" onClick={()=>{props.display_box()}}></input></span>)}
      {/* <span></span> */}
    </div>
    {props.logged?(<div className='user_data invisible'>
    <div user_email>{props.Email}</div>
    <div className='log_out_cover'><input type="button" value="Log out" id="log_out" onMouseLeave={()=>{left_shift();}} onMouseOver={()=>{right_shift();}} onClick={()=>{props.log_out();}}></input>
    <span className='logout_icon invisible_logout'><IoLogOut /></span>
    </div>
    </div>):(<div></div>)}
    {props.logged?(<div  className='user_bg invisible_bg'></div>):(<div></div>)}
    <div className='header_bg'></div>
    </>
  )
}

export default Header
import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios';
import Card from "../Card.jsx";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx'
import { IoCloseSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { HiMiniEye } from "react-icons/hi2";
import { IoIosCopy } from "react-icons/io";
import { FaShareSquare } from "react-icons/fa";
// import reactLogo from '../../src/assets/reactLogo'
// import viteLogo from '/vite.svg'
import "../../src/App.css"

function Notes() {

  const BASE_URL="https://enote-backend.onrender.com";

  const navigateTo = useNavigate();

  const [count, setCount] = useState(0)
  let [User,setUser]=useState();
  let [Email,setEmail]=useState();
  let [id_,setid]=useState();
  let [edittext,setedittext]=useState([]);
  let [edit, setedit] = useState(false)
  let [show, setshow] = useState(false);
  let [clicked, setclicked] = useState(false);
  let [lists, setlists] = useState([]);
  let [head, sethead] = useState();
  let [txt, settxt] = useState();
  let [listheading, setlistheading] = useState();
  let [listtext, setlisttext] = useState();
  let [logged,setlogged]= useState(false);

  const edit_data=()=>{
    var main_body = {
      _id:id_,
      heading: edittext[0],
      text: edittext[1]
    }
    console.log(main_body);

    if (!(main_body.heading == "" && main_body.text == "")){
      axios.post(BASE_URL+'/api/edit', main_body).then(function (response) {
        // console.log(response.data);
        setlists(response.data.map((x) => { return x }));
      })
        .catch(function (error) {
          console.log(error);
        });
      }

    setshow(false);
    setedit(false);
  }

  const update_edittext=()=>{
    // if(edit)
    setedittext([listheading,listtext]);

  }

  const update_lists = (x) => {
    setlists(x.map((m) => { return m }));
  }

  useEffect(() => {

    axios.get(BASE_URL+"/api/add").then(async (response) => {
      console.log("hello");
      console.log(response);
      setlists(response.data.notes.map((x) => { return x }));
      console.log(lists);
      setUser(response.data.username);
      setEmail(response.data.email);
    }).catch((err) => { console.log(err) })

  }, [lists.length])

  const false_clicked = () => {
    setclicked(false);

  }

  const show_data = async (_id_,list_heading, list_text,edit_clicked) => {
    console.log(lists)
    console.log("show data:",list_heading,list_text);
    setid(_id_);
    if(list_heading==undefined){
      setedittext(["",list_text]);

    }
    else if(list_text==undefined){
      setedittext([list_heading,""]);
      
    }
    else{
      setedittext([list_heading,list_text]);
 
    } 
    setlistheading(list_heading);
    setlisttext(list_text);
    // update_edittext();
    console.log("show data:",edittext);
    setshow(true);
    if(edit_clicked){
      setedit(true);
    }
  }

  const send_data = async () => {

    // if (!(main_body.heading == "" && main_body.text == ""))
    
    false_clicked();
    
    var main_body = {
      heading: head,
      text: txt
    }
    // console.log(main_body)

    // console.log(main_body);
    // console.log(lists);
    // console.log("acchha");
    if (!(main_body.heading == "" && main_body.text == "")){
      axios.post(BASE_URL+'/api/add', main_body).then(function (response) {
        console.log("axios post",response.data);
        setlists(response.data.map((x) => { return x }));
      })
      .catch(function (error) {
        console.log(error);
      });
      sethead("");
      settxt("");
    }
    
  }

  const close_add=()=>{
    false_clicked();
    sethead("");
    settxt("");
  }

  const log_out=()=>{
    // send_data();
    Cookies.remove("user");
    navigateTo("/");

  }

  async function copy_text() {
    // Get the text field
    var copyText = document.querySelector(".watchtext");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    await navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    document.querySelector(".copy_message").classList.remove("slide");
    setTimeout(() => {
      
      document.querySelector(".copy_message").classList.add("slide");
      
    }, 1500);
  }

  async function share_data(){
    const shareData ="Title: "+listheading+"\nNote: "+listtext;
    const txtdata={
      title:shareData,
      text:shareData
    }
    try {
      await navigator.share(txtdata);
      // alert("MDN shared successfully");
    } catch (err) {
      alert("Error: " +err);
    }
    
  }
  
  return (
    <>
    <div className='copy_message slide'>Note Copied</div>
    <div className='background_out'>
        <div className='background_in' id='background_in'>
            
        </div>
    </div>
      <div className='disable' style={{ zIndex: (clicked||show ? 3 : -5) }}></div>
      <div className='disable' id='disable_blur' style={{ zIndex: (clicked||show ? 3 : -5) }}></div>
      <div className='notdisable'>

        <div className='Heading'>
          <Header logged={true} log_out={log_out} User={User} Email={Email}/>
            
        </div>
        <div>
          <div  className='input' style={{ transform: clicked ? "scale(1)" : "scale(0)" }}>
            <div  className='close_show btn_' onClick={()=>{close_add();}}><IoCloseSharp /></div>
            <input type='text' placeholder='Heading' className=' listheading' id="_listheading" value={head} onChange={(e) => { sethead(e.target.value) }} required></input>
            <textarea type='text' placeholder='Note' className=" listtext" id="_listtext" value={txt} onChange={(e) => { settxt(e.target.value) }} required></textarea>
            <input onClick={send_data} type="submit" value="ADD" className='btn_ inside_input' />
          </div>
          <div className='input' id='input_overlay' style={{ transform: clicked ? "scale(1)" : "scale(0)" }}></div>
          <div>
            <div className='Show' style={{ transform: show ? "scale(1)" : "scale(0)" }}>
              <div className='show_list'>
                <input type='text' value={edit?edittext[0]:listheading} onChange={(e) => { setedittext([e.target.value,edittext[1]]) }}  className={!edit?"listheading watchheading":"listheading"} readOnly={!edit}></input>
                <textarea type='text' value={edit?edittext[1]:listtext} onChange={(e) => { setedittext([edittext[0],e.target.value]) }} className={!edit?"listtext watchtext":"listtext"} readOnly={!edit}></textarea>
              </div>
              <div>
                <div  className="show_done" style={{visibility:(edit?"visible":"hidden")}} onClick={edit_data}>Update Note</div>
              </div>
              {/* <h1>{listheading}</h1>
            <h3> {listtext}</h3> */}
              <div  className='close_show' onClick={() => { setshow(false); setedit(false) }} ><IoCloseSharp /></div>
              <div className='close_show edit_watch' id='show_edit' onClick={() => { setedit(!edit); if(edit)update_edittext();}} >{!edit ?<RiEdit2Fill /> : <HiMiniEye />}</div>
              <div className='close_show copy_note' id='copy' onClick={()=>{copy_text();}} ><IoIosCopy /></div>
              <div className='close_show share_note' id='share'  onClick={()=>{share_data();}}><FaShareSquare /></div>
            </div>
          <div className='show' id='show_overlay' style={{ transform: show ? "scale(1)" : "scale(0)" }}></div>
          </div>

        </div>
        <div className='lists' >
          {lists.map((list, i) => { return <Card key={i} head={list.heading} txt={list.text} id={list._id} update_list={update_lists} show_list={show_data} /> })}
          {/* <Card  lst={lists}/> */}
          {/* {lists[0].heading} */}
          <div>

            <div className='card' id='add' onClick={() => { setclicked(true); console.log(clicked) }}>

              <input type='button' value="+" className='add_button' ></input>


            </div>
          </div>
        </div>
      </div>
      <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </>
  )
  
}

export default Notes

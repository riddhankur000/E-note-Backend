import { useState,useEffect } from 'react'
import axios from 'axios';  
// import { LogoNodejs } from 'react-ionicons'
import { CreateOutline } from 'react-ionicons'
import { MdEdit } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { HiMiniEye } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { BsFillPinAngleFill } from "react-icons/bs";










function Card(props) {


    // console.log(props.lst);
    // let list =props.lists[0];
    console.log(props)

    
    const delete_data=()=>{
      
    let main_body={
      _id:props.id,
      heading:props.head,
      text:props.txt
    }
    axios.post('/api/delete', main_body).then(function (response) {
      
        console.log(response.data);
        props.update_list(response.data.map((x)=>{return x}));
    })
    .catch(function (error) {
        console.log(error);
    });
    }


    // const show_data=()=>{
    //   let main_body={
    //     _id:props.id,
    //     heading:props.head,
    //     text:props.txt
    //   }
    // }

    const [hover,sethover]=useState(false);
  
  return (
    <div>
    <div className='card' id="card" onMouseEnter={()=>{sethover(true)}}>
    
    {/* <div className='pin'><BsFillPinAngleFill /></div> */}

        <h3 className='card_heading'>
           {props.head}
        </h3>
        {/* <p className='card_text'>
          {props.txt}
        </p> */}
    </div>
        {/* <div className='card' onMouseOut={()=>{sethover(false)}} id='overlay' style={!hover?{zIndex:-1,opacity:0}:{zIndex:2,opacity:0.5}}> */}
        <div className='card overlay' id='card_disable'>
            <div className="card_button"  onClick={()=>{props.show_list(props.id,props.head,props.txt,false)}}><HiMiniEye />
</div>
            <div className="card_button"  onClick={()=>{props.show_list(props.id,props.head,props.txt,true)}}><RiEdit2Fill />


</div>
            <div className="card_button"  onClick={()=>{delete_data()}}><MdDelete />
</div>
        </div>
    
        
    </div>
  )
}

export default Card

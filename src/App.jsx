import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios';
import Card from "../components/Card";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [count, setCount] = useState(0)

  let [id_,setid]=useState();
  let [edittext,setedittext]=useState([]);
  let [edit, setedit] = useState(false)
  let [show, setshow] = useState(false);
  let [clicked, setclicked] = useState(false);
  let [lists, setlists] = useState(["hello"]);
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

    if (!(main_body.heading == "" && main_body.text == "")){
      axios.post('/api/edit', main_body).then(function (response) {
        console.log(response.data);
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

    axios.get("/api/add").then(async (response) => {

      setlists(response.data.map((x) => { return x }));
      console.log(lists);

    }).catch((err) => { console.log(err) })

  }, [lists.length])

  const false_clicked = () => {
    setclicked(false);

  }

  const show_data = async (_id_,list_heading, list_text,edit_clicked) => {
    console.log(list_heading,list_text);
    setid(_id_);
    setlistheading(list_heading);
    setlisttext(list_text);
    // update_edittext();
    await setedittext([listheading,listtext]);
    setshow(true);
    if(edit_clicked){
      setedit(true);
    }
  }

  const send_data = () => {

    false_clicked();

    var main_body = {
      heading: head,
      text: txt
    }

    console.log(main_body);
    console.log(lists);

    if (!(main_body.heading == "" && main_body.text == "")){
    axios.post('/api/add', main_body).then(function (response) {
      console.log(response.data);
      setlists(response.data.map((x) => { return x }));
    })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  // if(logged){
  return (
    <>
      <div className='disable' style={{ zIndex: (clicked ? 3 : -5) }}></div>
      <div className='notdisable'>

        <div className='Heading'>
          <h1 className='Logo'>eNOTE</h1>
          <h2 className='user'>Username</h2>
        </div>
        <div>
          <div className='input' style={{ transform: clicked ? "scale(1)" : "scale(0)" }}>
            <input type='text' placeholder='Heading' className='inside_input' value={head} onChange={(e) => { sethead(e.target.value) }}></input>
            <input type='text' placeholder='Note' className="inside_input" value={txt} onChange={(e) => { settxt(e.target.value) }}></input>
            <input type="button" value="ADD" className='btn inside_input' onClick={() => { send_data(); }} />
          </div>
          <div>
            <div className='Show' style={{ transform: show ? "scale(1)" : "scale(0)" }}>
              <div className='show_list'>
                <input type='text' value={edit?edittext[0]:listheading} onChange={(e) => { setedittext([e.target.value,edittext[1]]) }} className='listheading' readOnly={!edit}></input>
                <input type='text' value={edit?edittext[1]:listtext} onChange={(e) => { setedittext([edittext[0],e.target.value]) }} className='listtext' readOnly={!edit}></input>
              </div>
              <div>
                <input type='button' value="Edit" style={{visibility:(edit?"visible":"hidden")}} onClick={edit_data}></input>
              </div>
              {/* <h1>{listheading}</h1>
            <h3> {listtext}</h3> */}
              <input type='button' className='close_show' onClick={() => { setshow(false); setedit(false) }} value="Close"></input>
              <input type='button' className='edit_watch' onClick={() => { setedit(!edit); if(edit)update_edittext();}} value={!edit ? "Edit" : "Watch"}></input>
            </div>
          </div>
          <div></div>
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
    </>
  )
  }
//   else{
//     return(
//       <>
        
//       </>
//     )
//   }
// }

export default App

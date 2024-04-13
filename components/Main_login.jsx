import { useState, useEffect, useRef, useCallback } from 'react'
import { redirect } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import Header from '../components/Header/Header.jsx'
import { IoCloseSharp } from "react-icons/io5";
import ReactTextTransition, { presets } from 'react-text-transition';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import env from "dotenv";
import "../src/App.css";

// import Intro from '../Intro.jsx';
// import Main_body from '../main_login.jsx';


function Main_login(props) {

    // env.config();

    const BASE_URL="https://enote-backend.onrender.com";

    const navigateTo = useNavigate();


    let [index, setIndex] = useState(0);


    const TEXTS = ['Write', 'Save', 'Edit', 'View', 'Share'];

    function increase_index() {
        setIndex((index + 1) % TEXTS.length);

    }



    useEffect(() => {
        setTimeout(() => {
            setTimeout(() => {
                document.querySelector("#transitions").classList.add("visible_text");
            }, 100);
            increase_index();
            console.log(TEXTS[index % (TEXTS.length)]);
            setTimeout(() => {

                document.querySelector("#transitions").classList.remove("visible_text");
            }, 4500);
        }, 5000);


    }, [index]);

    useEffect(() => {


        setTimeout(() => {
            document.querySelector("#transitions").classList.add("visible_text");
        }, 100);

        setTimeout(() => {

            document.querySelector("#transitions").classList.remove("visible_text");
        }, 4500);


    }, []);

    useEffect(() => {

        // localStorage.setItem('firstLoadDone', null);

        if (localStorage.getItem('firstLoadDone') == 0) {

            // If it's the first load, set the flag in local storage to true and reload the page
            if (props.code == "ip") {
                display_box();
                document.querySelector("#ip").classList.remove("slide");
                localStorage.setItem('firstLoadDone', 1);
                setTimeout(() => {

                    document.querySelector("#ip").classList.add("slide");
                    localStorage.setItem('firstLoadDone', 1);

                }, 1500);
            }
            else if (props.code == "nr") {
                display_box();

                document.querySelector("#nr").classList.remove("slide");
                var element = document.querySelector(".box2");
                // console.log(element);
                element.classList.add("reg");
                document.querySelector(".box1").classList.add("big");
                document.querySelector(".login").classList.add("login-rotate");
                document.querySelector(".registration").classList.add("reg-rotate");
                localStorage.setItem('firstLoadDone', 1);
                setTimeout(() => {

                    document.querySelector("#nr").classList.add("slide");
                    localStorage.setItem('firstLoadDone', 1);

                }, 1500);

            }
            else if (props.code == "ar") {
                display_box();

                document.querySelector("#ar").classList.remove("slide");
                var element = document.querySelector(".box2");
                // console.log(element);
                element.classList.remove("reg");
                document.querySelector(".box1").classList.remove("big");
                document.querySelector(".registration").classList.remove("reg-rotate");
                localStorage.setItem('firstLoadDone', 1);
                setTimeout(() => {

                    document.querySelector("#ar").classList.add("slide");

                    localStorage.setItem('firstLoadDone', 1);
                }, 1500);

            }
            // localStorage.setItem('firstLoadDone', 1);




        } else {
            navigateTo("/");
        }



        make_big();
        make_small();




        let tok_en = Cookies.get("user");

        if (tok_en) {
            // navigateTo("/Notes");
            var main_body = {
                token: tok_en
            }
            console.log(main_body);
            axios.post(BASE_URL+"/api/adduser", main_body).then(async (response) => {

                console.log("hello");
                console.log(response);
                console.log(response.data);
                if (response.data.code == "redirect") {
                    // props.updatelogged(true);
                    // setredirect(true);
                    // console.log()
                    navigateTo("/Notes");
                }
                else {
                    navigateTo("/");
                }
            }).catch((err) => { console.log(err) })
        }

    }, [])


    let [Email, setEmail] = useState("");
    let [Password, setPassword] = useState("");
    let [Username, setUsername] = useState("");


    function make_big() {
        document.querySelector("#regis-ter").addEventListener("click", function () {
            var element = document.querySelector(".box2");
            // console.log(element);
            element.classList.add("reg");
            document.querySelector(".box1").classList.add("big");
            document.querySelector(".login").classList.add("login-rotate");
            document.querySelector(".registration").classList.add("reg-rotate");
        });
    }

    function make_small() {
        document.querySelector("#log-in").addEventListener("click", function () {
            var element = document.querySelector(".box2");
            // console.log(element);
            element.classList.remove("reg");
            document.querySelector(".box1").classList.remove("big");
            document.querySelector(".registration").classList.remove("reg-rotate");
            setTimeout(function () {

                document.querySelector(".login").classList.remove("login-rotate");
            }, 125);
            // console.log(document.querySelector(".login").classList);
        });
    }

    function display_box() {
        // document.querySelector(".transitions").classList.add("visible_text");

        document.querySelector(".box1").classList.add("full");
    }

    function hide_box() {
        // document.querySelector(".transitions").classList.remove("visible_text");

        document.querySelector(".box1").classList.remove("full");
    }

    function Log_in() {

        const main_body = {
            email: Email,
            password: Password
        }

        axios.post(BASE_URL+'/api/login', main_body).then(function (response) {
            // const data = await JSON.parse(response);
            console.log(response);
            if (response.data.code == "redirect") {
                navigateTo("/Notes");
            }
            else if (response.data.code == "register") {
                alert("Please Register First");

                var element = document.querySelector(".box2");
                // console.log(element);
                element.classList.add("reg");
                document.querySelector(".box1").classList.add("big");
                document.querySelector(".login").classList.add("login-rotate");
                document.querySelector(".registration").classList.add("reg-rotate");

            }
            else if (response.data.code == "incorrect_password") {
                alert("Incorrect Password..");
            }
            // setlists(response.data.map((x) => { return x }));
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    function Register() {

        const main_body = {
            username: Username,
            email: Email,
            password: Password
        }

        axios.post(BASE_URL+'/register', main_body).then(function (response) {
            console.log(response.data);
            if (response.data.code == "redirect") {
                navigateTo("/Notes");
            }
            else if (response.data.code == "regitered_already") {
                alert("User Already Registered. Please Login.");
                var element = document.querySelector(".box2");
                // console.log(element);
                element.classList.remove("reg");
                document.querySelector(".box1").classList.remove("big");
                document.querySelector(".registration").classList.remove("reg-rotate");
                setTimeout(function () {

                    document.querySelector(".login").classList.remove("login-rotate");
                }, 125);
            }
            else {
                navigateTo("/");
            }
            // setlists(response.data.map((x) => { return x }));
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    function google_auth() {
        axios.get(BASE_URL+'/api/auth/google').then(function (response) {
            // console.log(response.data);
            // setlists(response.data.map((x) => { return x }));
        })
            .catch(function (error) {
                console.log(error);
            });

    }



    return (

        <>
            <div className='copy_message slide' id='ip'>Incorrect Password</div>
            <div className='copy_message slide' id='nr'>User Not Found</div>
            <div className='copy_message slide' id='ar'>User already Registered</div>
            {/* <div className='home_body' id='home_body'></div> */}
            <div className='home_body' id='home_body_2'></div>
            <div className='home_body' id='home_body_3'></div>
            {/* <div className='home_body_2' id='home_body_4'></div> */}
            <div className='home_body'>

                <div className='text_transition'><span ><h1 className='transitions' id='transitions'><b>{TEXTS[index % (TEXTS.length)]}</b></h1><span><h2 className='transitions' id='text_note'><b>&nbsp;&nbsp;&nbsp;Notes</b></h2></span></span>

                </div>
                <div className='description'><h2>Streamline your note-taking experience and stay organized effortlessly with our online notes saving website.</h2></div>
            </div>
            <div ></div>
            <Header display_box={display_box} logged={false} />
            <div className="box1">

                <button type="button" className="cls" onClick={() => { hide_box() }}><IoCloseSharp /></button>
                <div className="box2">
                    <div className="login">
                        <div className="login-heading">
                            <h2>Login</h2>
                        </div>

                        <form action={BASE_URL+"/api/login"} method='POST'>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                                <input type="email" required name='Email' value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                                <input type="password" required name='Password' value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                                <label>Password</label>
                            </div>
                            {/* <div className="remember-login">
                <label><input type="checkbox"/>Remember Me</label>
                <a href="#">Forgot Password?</a>
            </div> */}
                            <input type="submit" value="Login" className="btn" id="btn1" />
                            <div className="register">
                                Don't have an Account?<span><span id="regis-ter" onClick={make_big}><b>Register Now</b></span></span>
                            </div>
                        </form>
                        <a id='google' href={BASE_URL+"/auth/google"} role="button">
                            <div className='btn'>Sign In With&nbsp;<div className='g_logo'><FcGoogle /></div></div>
                        </a>
                    </div>
                    <div className="registration">
                        <div className="login-heading">
                            <h2>Registration</h2>
                        </div>

                        <form action={BASE_URL+"/register"} method='POST'>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="person"></ion-icon></span>
                                <input type="email" required name="Username" value={Username} onChange={(e) => { setUsername(e.target.value) }} />
                                <label>Username</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                                <input type="email" required name='Email' value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                                <input type="password" required name='Password' value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                                <label>Password</label>
                            </div>
                            {/* <div className="remember-login">
                <label><input type="checkbox"/>Remember Me</label>
                <a href="#">Forgot Password?</a>
            </div> */}
                            <input type="submit" value="Register" className="btn" id="btn3" />
                            <div className="register">
                                Already Have An Account?<span><span id="log-in" onClick={make_small}><b>Login</b></span></span>
                            </div>
                        </form>
                        <a id='google' href={BASE_URL+"/auth/google"} role="button">
                            <div className='btn'>Sign In With&nbsp;<div className='g_logo'><FcGoogle /></div></div>
                        </a>
                    </div>
                </div>
            </div>


            <div className='home_body'>

                <div className='text_transition'><span ><h1 className='transitions' id='transitions'><b>{TEXTS[index % (TEXTS.length)]}</b></h1><span><h2 className='transitions' id='text_note'><b>&nbsp;&nbsp;&nbsp;Notes</b></h2></span></span>

                </div>
                <div className='description'><h2>Streamline your note-taking experience and stay organized effortlessly with our online notes saving website.</h2></div>
            </div>
            <div className='home_body' id='home_body'></div>
            <Header display_box={display_box} logged={false} />
            <div className="box1">

                <button type="button" className="cls" onClick={() => { hide_box() }}><IoCloseSharp /></button>
                <div className="box2">
                    <div className="login">
                        <div className="login-heading">
                            <h2>Login</h2>
                        </div>

                        <form action={BASE_URL+"/api/login"} method='POST'>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                                <input type="email" required name='Email' value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                                <input type="password" required name='Password' value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                                <label>Password</label>
                            </div>
                            {/* <div className="remember-login">
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href="#">Forgot Password?</a>
                </div> */}
                            <input type="submit" value="Login" className="btn" id="btn4" />
                            <div className="register">
                                Don't have an Account?<span><span id="regis-ter" onClick={make_big}><b>Register Now</b></span></span>
                            </div>
                        </form>
                        <a id='google' href={"http://enote-backend.onrender.com/auth/google"} role="button">
                            <div className='btn'>Sign In With&nbsp;<div className='g_logo'><FcGoogle /></div></div>
                        </a>
                    </div>
                    <div className="registration">
                        <div className="login-heading">
                            <h2>Registration</h2>
                        </div>

                        <form action={BASE_URL+"/register"} method='POST'>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="person"></ion-icon></span>
                                <input type="email" required name="Username" value={Username} onChange={(e) => { setUsername(e.target.value) }} />
                                <label>Username</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                                <input type="email" required name='Email' value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                                <input type="password" required name='Password' value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                                <label>Password</label>
                            </div>
                            {/* <div className="remember-login">
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href="#">Forgot Password?</a>
                </div> */}
                            <input type="submit" value="Register" className="btn" id="btn2" />
                            <div className="register">
                                Already Have An Account?<span><span id="log-in" onClick={make_small}><b>Login</b></span></span>
                            </div>
                        </form>
                        <a id='google' href={"https://enote-backend.onrender.com/auth/google"} role="button">
                            <div className='btn'>Sign In With&nbsp;<div className='g_logo'><FcGoogle /></div></div>
                        </a>
                    </div>
                </div>
            </div>
            {/* </div> */}

        </>
    )
}

export default Main_login;
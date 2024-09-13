import './login.css'
import { AiOutlineArrowLeft } from "react-icons/ai";
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

interface FormData {
    user: string;
    pass: string;
  }

const login = () => {


    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({ user: '', pass: '' });



    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const username = formData.user;
        const password = formData.pass;
    
        try {

            console.log("sending fetch request");
          const response = await fetch('https://pantry-pal-backend-ajai.onrender.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
    
          if (data.accessToken) {
            // Store JWT token in Chrome Storage
            chrome.storage.local.set({ token: data.accessToken }, () => {
              console.log('JWT Token saved!');
              // Redirect to welcome page
              navigate('/welcome');
            });
          } else {
            console.log('Login failed');
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };


      
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };


    
    return (
        <div className='sign'>
            <a href='#/' className='backarr'>
                <AiOutlineArrowLeft size={20} color='white'/>
            </a>
            <div
            style={{
                margin: "auto",
                marginTop: "15px",
                textAlign: "center",
            }}
            className='form'
            >
                <h2>Login</h2>
                <br/>
                <br/>
                <form onSubmit={handleLogin}>
                    <label>
                        Username: <input required type="text" name="user" value={formData.user} onChange={handleChange} />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Password: <input required type="text" name="pass" value={formData.pass} onChange={handleChange} />
                    </label>
                    
                    <br/>
                    <br/>
                    <input type="submit" value="Submit" className='submission' />
                </form>

                <p id="loginmessage"></p>

            </div>
        </div>
    )
}

export default login

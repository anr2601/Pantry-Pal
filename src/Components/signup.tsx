import './signup.css'
import { AiOutlineArrowLeft } from "react-icons/ai";
import React, {useState} from 'react'
// import { useNavigate } from 'react-router-dom';


interface FormData {
  user: string;
  pass: string;
}


const signup = () => {

  // const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({ user: '', pass: '' });

    const [message, setMessage] = useState('');

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        const username = formData.user;
        const password = formData.pass;
        
        
        try {

            console.log("sending fetch request");
          const response = await fetch('https://pantry-pal-backend-ajai.onrender.com/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });


          if (response.status==201) {
            setMessage('Signup Successful!');
          } else {
            setMessage('Signup failed. Please try again.');
          }
    
          // Reset message after 3 seconds
          setTimeout(() => {
            setMessage('');
          }, 10000);
        }catch (error) {
        console.error('Error during signup:', error);
        setMessage('An error occurred. Please try again.');
      }
      }
      




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
                    <h2>Sign Up</h2>
                    <br/>
                    <br/>
                <form onSubmit={handleSignup} style={{marginBottom:'30px'}}>
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
                    
                    <input type="submit" value="Submit" className='submission'/>
                </form>
                <div style={{ height: '40px', lineHeight:'40px'}}>{message}</div>
            </div>
        </div>
    )
}

export default signup;

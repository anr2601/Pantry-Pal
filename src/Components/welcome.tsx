import React from 'react'
import { decode } from 'jwt-js-decode';
import { useNavigate } from 'react-router-dom';

const welcome = () => {

    const [username, setUsername] = React.useState<string>("");

    const navigate = useNavigate();

    const handleLogout = () => {
      chrome.storage.local.remove('token', () => {
        console.log('Logged out!');
        navigate('/');
      });
    };

    

    const loadUserFromToken = () => {
        chrome.storage.local.get(['token'], (result) => {
          const token = result.token;
          
          if (token) {
            try {
              // Decode the JWT token
              const decodedToken = decode(token);
              
              // Extract the username
              const username = decodedToken.payload.username; // Assumes `username` is in the payload
              setUsername(username);
            } catch (error) {
              console.error('Error decoding token:', error);
            }
          }
        });
      };

      React.useEffect(() => {
        loadUserFromToken();
      }, []);

    return(
        <>
            <h2 style={{marginBottom:'50px'}}>Welcome {username}!</h2>

            <a href="#/view">
                <button>
                    View Allergies
                </button>
            </a>
            <p></p>
            <a href="#/scrape">
                <button>
                    Check Product
                </button>
            </a>
            <p></p>
            <a href="#/">
            <button onClick={handleLogout}>
                  Logout
            </button>
            </a>
            
        </>
        
    )
}

export default welcome


//#productDetails_techSpec_section_1 > tbody > tr:nth-child(12) > td
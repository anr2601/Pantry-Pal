import {useEffect, useState} from 'react'
import { decode } from 'jwt-js-decode';
import { AiOutlineArrowLeft } from "react-icons/ai";
import './view.css'


const view = () => {

    const [username, setUsername] = useState<string>("");
    const [allergies, setAllergies] = useState<string[]>([]);
    const [newAllergy, setNewAllergy] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showScroll, setShowScroll] = useState(false);

    const removeAllergy = async (allergy: string) => {
      try {
        const response = await fetch('http://localhost:3000/api/removeallergy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, allergy }),
        });
        if (response.ok) {
          setAllergies(allergies.filter(a => a !== allergy));
        } else {
          console.error('Error removing allergy:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing allergy:', error);
      }
    };

    const addAllergy = async () => {
      if (newAllergy.trim()) {
        try {
          await fetch('http://localhost:3000/api/addallergy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, allergy: newAllergy }),
          });
          setAllergies([...allergies, newAllergy]);
          setNewAllergy('');
        } catch (error) {
          console.error('Error adding allergy:', error);
        }
      }
    };


      const fetchUserAllergies = async (username: string) => {
        try {

          console.log(username)
          const response = await fetch(`http://localhost:3000/api/allergies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username}),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data);
          return data.allergies; // Adjust based on your API response
        } catch (error) {
          console.error('Error fetching allergies:', error);
          return [];
        }
      };

      useEffect(() => {
        
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
      }, []);

      useEffect(() => {

        if (!username) return;
        const loadAllergies = async () => {
          try {
            const allergiesData = await fetchUserAllergies(username);
            setAllergies(allergiesData);
          } catch (error) {
            setError('Failed to fetch allergies');
          } finally {
            setLoading(false);
          }
        };
    
        loadAllergies();
      }, [username]);

        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;

    return(

        <>
            <a href='#/welcome' className='backarr'>
                <AiOutlineArrowLeft size={20} color='white'/>
            </a>
            
            <h2 style={{marginBottom:"10px"}}>Your Allergies</h2>
            <div style={{ listStyleType: 'none', padding: 0, marginTop:'35px',  marginBottom: '20px'  }} className="scroll-container" onMouseEnter={() => setShowScroll(true)}
      onMouseLeave={() => setShowScroll(false)}>
            
            {allergies.length > 0 ? (
              <ul className={`allergies-list ${showScroll ? 'show-scroll' : ''}`}>
          {allergies.map((allergy, index) => (
            
            <li key={index} style={{ fontSize: '15px', marginBottom: '10px' }} className='scroll-item' >
              {allergy}
              <button
                onClick={() => removeAllergy(allergy)}
                style={{ marginLeft: '10px', fontSize:'13px' }}
              >
                Remove
              </button>
            </li>
          ))}
          </ul>
        ) : (
          <p>No allergies found</p>
        )}
        </div>
        <label style={{marginTop:'35px',marginBottom:"0px", paddingBottom:'0px'}}>
            <input
              type="text"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              placeholder="Add new allergy"
              style={{marginBottom:'10px', marginTop:'20px'}}
            />
            <button onClick={addAllergy}>Add Allergy</button>
        </label>
            
   
        </>
    )

}

export default view
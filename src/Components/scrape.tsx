import {useState, useEffect} from 'react'
import { decode } from 'jwt-js-decode';
import './view.css'
import { AiOutlineArrowLeft } from "react-icons/ai";




const scrape = () => {

    const [username, setUsername] = useState<string>("");
    const [allergies, setAllergies] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showScroll, setShowScroll] = useState(false);



    const handleScrape = async (username:string) => {
        // Get the current tab's URL
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
          const currentTab = tabs[0];
          const currentUrl = currentTab.url;

          if (!currentUrl) {
            console.log('Unable to retrieve current tab URL.');
            return;
          }
    
          try {
                
                // Extract the username
            const user = username;

            console.log(user);
            // Send the URL to the Express server
            const response = await fetch('http://pantry-pal-backend-ajai.onrender.com/api/scrape', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url: currentUrl, username:user }),
            });
    
            if(!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setAllergies(data.matchedAllergies)
            return data.matchedAllergies;
          } catch (err) {
            console.error('Error:', err);
            console.log('Failed to scrape ingredients.');
            return[]
          }
        });
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
        
        const fetchData = async () => {
          try {
            await handleScrape(username); // Fetch matching results for the current URL
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
          }
          finally{
            setLoading(false)
          }
        };
    
        fetchData();
      }, [username]);


      if (loading) return <div>Loading...</div>;
      if (error) return <div>{error}</div>;

    return(
        <>
        <a href='#/welcome' className='backarr'>
                <AiOutlineArrowLeft size={20} color='white'/>
            </a>
        <h2 style={{marginBottom:"10px"}}>Allergies Found</h2>
        <div style={{ listStyleType: 'none', padding: 0, marginTop:'35px',  marginBottom: '20px'  }} className="scroll-container" onMouseEnter={() => setShowScroll(true)}
      onMouseLeave={() => setShowScroll(false)}>
            
            {allergies.length > 0 ? (
              <ul className={`allergies-list ${showScroll ? 'show-scroll' : ''}`}>
          {allergies.map((allergy, index) => (
            
            <li key={index} style={{ fontSize: '15px', marginBottom: '10px' }} className='scroll-item' >
              {allergy}
            </li>
          ))}
          </ul>
        ) : (
          <p>No allergies found</p>
        )}
        </div>
        </>
    )
}

export default scrape
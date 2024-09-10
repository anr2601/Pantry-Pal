import { Player } from '@lottiefiles/react-lottie-player';


const home = () => {

    return(
        <div>
                <Player
                src='https://lottie.host/cc966d7f-4b45-4a51-9120-8b619253b073/6xatClOO7N.json'
                className="player"
                autoplay
                loop
                style={{height:'150px', width:'250px'}}
            />
            
                <h1>Pantry Pal</h1>
                <a href="#/signup">
                <button>
                Signup
                </button>
                </a>
                <p/><p/>
                <a href="#/login">
                <button>
                Existing User
                </button>
                </a>
        </div>
    )
}

export default home;
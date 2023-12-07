import { Link } from 'react-router-dom';
import Glasses from './../images/glasses_logo.png'

const Home = () => {

    return(
        <>
        <div className="text-center">
            <h2>See how consistently I've been coding</h2>
            <hr/>
            <Link to="/timesheet">
                <img className='img-fluid' src={Glasses} alt='glasses'></img>
            </Link>
        </div>
        </>
    )
}

export default Home;
import '../styles/globals.css'
import './signup.css'
import './login.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../components/feed.css'
import AuthWrapper from '../context/AuthWrapper';
import '../components/Profile.css';
import '../components/post.css'
function MyApp({ Component, pageProps }) 
{
  //Component becomes child of AuthWrapper so its destructure in AuthWrapper.js 
  return(
    <AuthWrapper>
     <Component {...pageProps} /> 
    </AuthWrapper>
    )
}

export default MyApp

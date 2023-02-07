import './App.css';
import RouteTree from '../src/components/routes/RouteTree'
import '../src/assets/bootstrap/css/bootstrap.min.css'
import '../src/assets/css/homestyle.css'
import '../src/assets/css/menu.css'
import '../src/assets/css/style.css'
import '../src/assets/fonts/simple-line-icons.min.css'
import '../src/assets/css/vanilla-zoom.min.css'
import '../src/assets/slick/slick.css'
import '../src/assets/slick/slick-theme.css'

// navbar and footer template
import Navbar from '../src/components/templates/Navbar'
import Footer from '../src/components/templates/Footer'
import AdminNavbar from './components/templates/AdminNavbar';

function App() {
  return (
    <div className={localStorage.getItem('sidetoggle') === true ? "App toggle-sidebar" : "App"} id="scroller" >
      {!localStorage.getItem('adminAuthenticated') ?
      <>
      <Navbar/>
      <RouteTree/>
      <Footer/>
      </> 
      : 
      <>
      <AdminNavbar/>
      <RouteTree/>
      </>
      }
      
    </div>
  );
}

export default App;

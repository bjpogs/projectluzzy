import './App.css';
import RouteTree from '../src/components/routes/RouteTree'
import '../src/assets/bootstrap/css/bootstrap.min.css'
import '../src/assets/css/homestyle.css'
import '../src/assets/css/menu.css'
import '../src/assets/css/style.css'

function App() {
  return (
    <div className="App" id="scroller" >
      <RouteTree/>
    </div>
  );
}

export default App;

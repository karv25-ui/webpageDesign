/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */ /*-- Reference code from create-react-app, modified to fit the webpage design --*/
import KapturedMoment from './Kaptured Moment .png';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
    <div className="background">
      <header className="header">
      <img src={KapturedMoment} alt="Kaptured Moment" className="logo" />
        </header>
       <div className="content">
        <Nav />
        </div>
       <div className="footer">
        </div>
      </div>
    </div>
  );
}

export default App;
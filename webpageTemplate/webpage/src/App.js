{/*import logo from './logo.svg';
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
} */}

function App() {
  return (
    <div>
      <h1>Welcome to My Webpage</h1>
      <p>This is a simple webpage template created with React.</p>
      <button onClick={() => alert('Button Clicked!')}>Click Me</button>
    </div>
  );
}
export default App;

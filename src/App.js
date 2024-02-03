import './App.css';

function App() {
  return (
    <div>
      <p className="User-bar" > Username - 99 practices this week  </p>
      <header className="Start-screen">
        <h1 className="Title"> Practice Cards </h1>
        <StartButton level="1"/>
      </header>
    </div>
  );
}

//Home screen has a top bar with user name and data
function StartButton({level}) {
  return (
    <button className="Start-button"onClick={startPractice}>
      Start Practice - month no. {level}
    </button>
  );
}

function startPractice() {
  alert('Starting practice session!');
}

export default App;

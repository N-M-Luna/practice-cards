import './App.css';
import { useState } from 'react';

function App() {
  const [practiceInSession, setPracticeInSession] = useState(false);
  function startPractice() {
    setPracticeInSession(true);
    alert('Starting practice session!');
  }
  function endPractice() {
    setPracticeInSession(false);
    alert('Session completed. Good job!');
  }

  if (practiceInSession) {
    return (
      <div>
        <header className="Practice-screen">
          <EndButton className="End-button" endPractice={endPractice} />
        </header>
      </div>
    );
  } else {
    return (
      <div>
        <p className="User-bar" > Username - 99 practices this week  </p>
        <header className="Start-screen">
          <h1 className="Title"> Practice Cards </h1>
          <StartButton level="1" startPractice={startPractice} />
        </header>
      </div>
    );
  }
}

//Home screen has a top bar with user name and data, the title, and the start button(s)
function StartButton({level, startPractice}) {
  return (
    <button className="Start-button" onClick={startPractice}>
      Start Practice - month no. {level}
    </button>
  );
}


//Practice screen has a flash card, counter, back button, help button, and either a next button or a endPractice button
function EndButton({endPractice}) {
  return(
    <button className="Start-button" onClick={endPractice}>
      Done
    </button>
  );
}


export default App;

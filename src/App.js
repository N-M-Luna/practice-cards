import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowRight, faQuestion, faCheck } from '@fortawesome/free-solid-svg-icons'

const steps = require('../src/FlashCards')
const iconSize = 'fa-3x'
const currentLevel = 1

function App() {
  const [practiceInSession, setPracticeInSession] = useState(false);
  const [practiceSteps, setPracticeSteps] = useState([])
  const [practiceLevel, setPracticeLevel] = useState(1)

  function startPractice(level) {
    setPracticeInSession(true);
    setPracticeLevel(level)
    const shuffledSteps = shuffleThisArray(steps[level-1])
    setPracticeSteps(shuffledSteps)
  }
  function endPractice() {
    setPracticeInSession(false);
    setPracticeSteps([]);
  }
  function completePractice() {
    setPracticeInSession(false);
    setPracticeSteps([]);
    alert('Session completed. Good job!');
  }

  if (practiceInSession) {
    return (
      <PracticeScreen practiceSteps={practiceSteps} endPractice={endPractice} completePractice={completePractice} level={practiceLevel} />
    );
  } else {
    return (
      <HomeScreen startPractice={startPractice} />
    );
  }
}

//Home screen has: a top bar, the title, and the start buttons
function HomeScreen({startPractice}) {
  const startPracticeButtons = [1, 2, 3].map(i => <StartButton level={i} startPractice={startPractice} />)
  return (
    <div>
        <p className="Top-bar-home" > <a href='https://www.instagram.com/alianza.dance/'>Alianza Dance Co.</a> Salsa Curriculum </p>
        <header className="Start-screen">
          <h1 className="Title"> Practice Cards </h1>
          {startPracticeButtons}
        </header>
      </div>
  )
}
function StartButton({level, startPractice}) {
  if (currentLevel < level) {
    return (
      <button disabled className="Disable-start-button" onClick={() => startPractice(level)}>
        Start practice - level {level}
      </button>
    );
  } else {
    return (
      <button className="Start-button" onClick={() => startPractice(level)}>
        Start practice - level {level}
      </button>
    );
  }
}


//Practice screen has: a flash card, counter, back button, help button, and either a next button or a endPractice button
function PracticeScreen({practiceSteps, endPractice, completePractice, level}) {
  const [stepCounter, setStepCounter] = useState(0)

  function goToNextStep() {
    setStepCounter(stepCounter+1)
  }

  return (
    <div>
        <p className="Top-bar-practice" > Practicing steps from level {level}</p>
        <header className="Practice-screen">
          <FlashCard displayName={practiceSteps[stepCounter]} />
          <div className="Action-buttons">
            <EndButton endPractice={endPractice} />
            <HelpButton />
            {stepCounter < practiceSteps.length-1 ?
              <NextStepButton goToNextStep={goToNextStep}  />
              : <CompletePracticeButton completePractice={completePractice} />}
            </div>
        </header>
      </div>
  )
}
function FlashCard({displayName}) {
  return (
    <div className="Flash-card">
      <p>{displayName}</p>
    </div>
  )
}
function EndButton({endPractice}) {
  return (
    <button className="Action-button Left-action-button" onClick={endPractice}>
      <FontAwesomeIcon className={iconSize} icon={faHouse} />
    </button>
  );
}
function HelpButton() {
  return (
    <button className="Action-button Middle-action-button">
      <FontAwesomeIcon className={iconSize} icon={faQuestion} />
    </button>
  )
}
function NextStepButton({goToNextStep}) {
  return (
    <button className="Action-button Right-action-button" onClick={goToNextStep}>
      <FontAwesomeIcon className={iconSize} icon={faArrowRight} />
    </button>
  )
}
function CompletePracticeButton({completePractice}) {
  return (
    <button className="Action-button Right-action-button" onClick={completePractice}>
      <FontAwesomeIcon className={iconSize} icon={faCheck} />
    </button>
  );
}

//Helpers
function shuffleThisArray (myArray) {
  //TODO
  return myArray
}

export default App;

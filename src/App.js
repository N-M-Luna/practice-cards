import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowRight, faQuestion, faCheck } from '@fortawesome/free-solid-svg-icons'
import notFound from './notFound.png'

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
          <h1 className="Title"> Footwork <br/> Practice Cards </h1>
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
  const [feetDiagramIsDisplayed, setFeetDiagramIsDisplayed] = useState(false)

  function goToNextStep() {
    setStepCounter(stepCounter+1)
    setFeetDiagramIsDisplayed(false)
  }
  function displayfeetDiagram() {
    setFeetDiagramIsDisplayed(!feetDiagramIsDisplayed)
  }

  return (
    <div>
        <p className="Top-bar-practice" > Practicing steps from level {level}</p>
        <header className="Practice-screen">
          <FlashCard currentStep={practiceSteps[stepCounter]} feetDiagramIsDisplayed={feetDiagramIsDisplayed} />
          <div className="Action-buttons">
            <EndButton endPractice={endPractice} />
            <HelpButton displayfeetDiagram={displayfeetDiagram} feetDiagramIsDisplayed={feetDiagramIsDisplayed}/>
            {stepCounter < practiceSteps.length-1 ?
              <NextStepButton goToNextStep={goToNextStep}  />
              : <CompletePracticeButton completePractice={completePractice} />}
            </div>
        </header>
      </div>
  )
}
function FlashCard({ currentStep, feetDiagramIsDisplayed }) {

  let diagram = !feetDiagramIsDisplayed ? <div></div>
    : <img src={notFound} className="Feetsies-Diagram" alt="[Artist is still working on this piece.]" />

  return (
    <div className="Flash-card">
      <h1>{currentStep.name}</h1>
      {diagram}
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
function HelpButton({displayfeetDiagram, feetDiagramIsDisplayed}) {
  let classesForHelpBtn = "Action-button Middle-action-button"
  if (feetDiagramIsDisplayed) { classesForHelpBtn += " Active-help-button" }
  return (
    <button className={classesForHelpBtn} onClick={displayfeetDiagram}>
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
  let m = myArray.length, t, i;

  // While there remain elements to shuffle...
  while (m) {

    // Pick a remaining element...
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = myArray[m];
    myArray[m] = myArray[i];
    myArray[i] = t;
  }

  return myArray
}

export default App;

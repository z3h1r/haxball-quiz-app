// components
import Main from "./components/Main";
import Pyramid from "./components/Pyramid";
import Start from "./components/Start";

// css file
import { useEffect, useState } from "react";
import './app.css';
import './text.css';


// import the data 
import { pyramidData, Question } from "./Question_Prize";
import html2canvas from 'html2canvas';


function App() {


  const [name, setName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stopgame, setStopGame] = useState(false);
  const [earned, setEarned] = useState("$ 0");


  const handleScreenshot = async () => {
    try {
      const canvas = await html2canvas(document.body);
      const ctx = canvas.getContext('2d');
      // Ekran görüntüsünün boyutları
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Yazının boyutları ve konumu
      const text = 'Copyright © 2023 Z3H1R';
      const textWidth = ctx.measureText(text).width;
      const textHeight = 5; // Yazının yüksekliği
      const textX = (canvasWidth - textWidth) / 2;
      const textY = canvasHeight - textHeight - 10; // Yazının alt boşluk

      ctx.font = '10px Monospace';
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.fillText(text, textX, textY);
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = 'screenshot.png';
      link.click();
    } catch (error) {
      console.error('Could not take screenshot:', error);
    }
  };

  useEffect(() => {
    questionNumber > 1 && setEarned(pyramidData.find((d) => d.id === questionNumber - 1).amount);
  }, [questionNumber])

  return (

    name ?
      <div className="app">


        <div className="main">

          {stopgame || questionNumber > 15 ?

            <div className="score">

              <h1> {name} Earned : <span>{earned}</span> </h1>
              <button onClick={() => window.location.reload()} >Play Again</button>
              <div>
                <button onClick={handleScreenshot}>Screenshot and Download</button>
              </div>
            </div>
            :

            (<Main questionNumber={questionNumber} data={Question} setStopGame={setStopGame} setQuestionNumber={setQuestionNumber} />)

          }
        </div>

        <Pyramid activePyramidId={questionNumber} />
      </div >
      : <Start setName={setName} />

  );
}

export default App;

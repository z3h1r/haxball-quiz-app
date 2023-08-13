import { cloneDeep } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Timer from './Timer';

// import files
import fifty_fifty from '../assets/fifty_fifty.png';
import correct from '../assets/src_sounds_correct.mp3';
import wrong from '../assets/src_sounds_wrong.mp3';
import stopTimer from '../assets/stopTImer.jpg';
import CookieConsent from "react-cookie-consent";


const Main = ({ data, setStopGame, setQuestionNumber, questionNumber }) => {


  const [question, setQuestion] = useState(null);
  const [selectedanswer, setSelectedAnswer] = useState(null);
  const [classname, setClassname] = useState("answer");

  // options
  const [isRuning, setIsRuning] = useState(false); // for timer to stop
  const alwaysRun = useRef(false); // state management for controlling one time stop timer option &
  // continious stop watch runing again for next question

  const [active50_50, setActive50_50] = useState(false);
  const option50_50 = useRef(true) // state management for option 50_50



  useEffect(() => {

    if (active50_50 && option50_50.current) {

      const clone_question = cloneDeep(data[questionNumber - 1]);
      const updatedQuestion = {};

      updatedQuestion.id = clone_question.id;
      updatedQuestion.question = clone_question.question;

      const correct_answer = clone_question.answer.filter((v) => v.correct === true)
      const false_answer = clone_question.answer.filter((v) => v.correct === false);

      const incorrect_index = Math.floor(Math.random() * false_answer.length);

      updatedQuestion.answer = [...correct_answer, false_answer[incorrect_index]]

      setQuestion(updatedQuestion);
      option50_50.current = !option50_50.current; // to stop 50_50 

    } else {
      setQuestion(data[questionNumber - 1]);
    }
  }, [data, questionNumber, active50_50])


  const delayFunction = (duration, cb) => {
    setTimeout(() => {
      cb()
    }, duration);
  }

  const correct_answer = useMemo(() => {
    return () => new Audio(correct).play()
  }, [])

  const wrong_answer = useMemo(() => {
    return () => new Audio(wrong).play()

  }, [])

  const clickedAnswer = (ans) => {
    setSelectedAnswer(ans);
    setClassname("answer active");
    // check the correct answer 
    // after clicking any option with in 1 seconds
    // update it with class "correct" or "wrong"
    delayFunction(2000,
      () => setClassname(ans.correct ? "answer correct" : "answer wrong"))

    // after done with the animation
    // check wheither the answer is wrong or right
    // update the question or stop the game

    delayFunction(4000,
      () => {
        if (ans.correct) {
          correct_answer()

          delayFunction(1000, () => {

            setQuestionNumber(prev => prev + 1)
            setSelectedAnswer(null)
          })

        } else {

          wrong_answer()

          delayFunction(1000, () => {
            setStopGame(true)
          })

        }
      }
    )


  }


  return (

    <>
      <CookieConsent
        location="bottom"
        buttonText="Let's GO !"
        cookieName="z3cookie"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        <summary>
          There will be <span>15 question & 40 seconds</span> to answer each one of them.
          Also you can take <span className="color:blue;font-weight:bold">(50/50)</span> and <span>(STOP TIMER)</span> option for one time in case of help for any question.
          Test your haxball knowledge and have fun.
        </summary>
        {" "}
      </CookieConsent>
      <div className="top">
        {/* timer class */}
        <div className="timer"><Timer alwaysRun={alwaysRun} isRuning={isRuning} setStopGame={setStopGame} questionNumber={questionNumber} />        </div>
      </div>
      <div className="bottom">
        {/* question & answers */}

        <div className="haxball">

          <div className="question">{question ? question.question : null}</div>
          <div className={selectedanswer ? "answers no-drop" : "answers"}>

            {
              question ? question.answer.map(ans =>

                <div key={Math.random()}
                  className={selectedanswer === ans ? classname : 'answer'}
                  onClick={() => clickedAnswer(ans)}>
                  {ans.text}</div>

              ) : null
            }

          </div>

        </div>

      </div>


      <div className={selectedanswer ? "options no-drop" : "options"}>

        <img src={fifty_fifty} className={active50_50 ? 'no-cursor' : 'choice'}
          onClick={() => setActive50_50(prev => !prev)} alt="50/50" />

        <img src={stopTimer} onClick={() => setIsRuning(prev => !prev)}
          className={isRuning ? 'no-cursor' : 'choice'} alt='timer_stop' />

      </div>

    </>
  )
}

export default Main
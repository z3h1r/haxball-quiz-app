import React, { useRef } from 'react';
import video from '../assets/z3h1r.mp4';


const Start = ({ setName }) => {

  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.value && setName(inputRef.current.value)
  }
  return (



    <div className="startPage">
      <div className="App">
        <video autoPlay loop muted className="background-video">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="center">
        <div class="choose-nickname-view">
          <div class="dialog"><h1>Choose nickname</h1><div class="label-input"><label>Nick:</label>
            <input ref={inputRef} type={"text"} placeholder="Enter your name" name='username' />
          </div>
            <button class='glowing-btn' onClick={handleClick}><span class='glowing-txt'>S<span class='faulty-letter'>T</span>ART</span></button></div></div>

        {/*<summary>
          There will be <span>15 question & 40 seconds</span> to answer each one of them. <br />
          Also you can take <span>(50/50)</span> and <span>(STOP TIMER)</span> option for one time in case of help for any question. <br />
          Test your haxball knowledge and have fun.
  </summary>*/}




      </div>

    </div>
  )
}

export default Start
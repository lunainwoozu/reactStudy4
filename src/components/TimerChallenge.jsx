import { useState, useRef } from "react"
import ResultModal from "./ResultModal"

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef()
  const dialog = useRef()

  const [timeRemaining, setTimeRemaining] = useState(targetTime*1000)
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

  if (timeRemaining <= 0) {
    clearInterval(timer.current); // 시간이 더는 남지 않았으므로 초기화
    dialog.current.open(); // 자동으로 멈춰졌을 때
  }

  function handleReset(){
    setTimeRemaining(targetTime * 1000); // 초기 시간으로 다시 타이머 설정
  }

  function handleStart(){
    timer.current = setInterval(() => {
      setTimeRemaining(prev => prev - 10) // 10 밀리초마다 그만큼 줄어든 타이머 실행!
    }, 10)
  }

  function handleStop(){
    dialog.current.open(); // 수동으로 멈췄을 때
    clearInterval(timer.current); // set-clear 짝
  }

  return (
    <>
      {/* dialog는 본래 보이지 않는 html 코드로 항상 렌더링 상태도 가능 */}
      <ResultModal ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime>1 ? 's':''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timeRemaining ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}
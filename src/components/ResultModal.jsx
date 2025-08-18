import { useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";

export default function ResultModal({ref, targetTime, remainingTime, onReset}){
  const dialog = useRef();

  const lost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((remainingTime / (targetTime*1000))*100)

  useImperativeHandle(ref, () => {
    return {
      open(){
        // 따로 정의하는 이유: timerChallenge에서 해당 기능을 직접 수행하게 하는 대신
        // ResultModal 내에서 온전히 기능을 정의 및 수정하게끔 하기 위해서
        // 타인과 함께 프로젝트를 수정하는 큰 프로젝트에서 유용
        dialog.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      <h2>You {lost ? 'lost' : 'win'}</h2>
      {!lost && 
        <p>your score: {score}</p>
      }
      <p>The target time was <strong>{targetTime} second{targetTime > 1 ? 's': ''}.</strong></p>
      {remainingTime > 0 && <p>You stopped the timer with
        <strong>{formattedRemainingTime} seconds left.</strong></p>}
      <form action="dialog" onSubmit={onReset} onClose={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
}
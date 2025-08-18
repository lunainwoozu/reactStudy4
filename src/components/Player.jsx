import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [userName, setUserName] = useState(null)

  function handleClick(){
    setUserName(playerName.current.value)
    playerName.current.value = ''; // 직접 DOM 요소에 명령을 내리므로 리액트의 취지에는 맞지 않는 코드
  }

  return (
    <section id="player">
      <h2>Welcome {userName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

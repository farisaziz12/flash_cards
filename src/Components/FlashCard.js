import React, { useState } from "react";
import "./FlashCard.css";

export default function FlashCard(props) {
  const { answer, question } = props;
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      <p>{!flipped ? "Question" : "Answer"}</p>
      <div onClick={() => setFlipped(!flipped)} className="flashcard">
        <h1 className="flashcard-txt ">{!flipped ? question : answer}</h1>
      </div>
      <p>
        Click to flip{" "}
        <span role="img" aria-label="emoji">
          🔄
        </span>
      </p>
    </>
  );
}

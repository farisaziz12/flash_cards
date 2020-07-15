import React, { useState, useEffect } from "react";
import "./FlashCard.css";

export default function FlashCard(props) {
  const { answer, question } = props;
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      <p>{!flipped ? "Question" : "Answer"}</p>
      <div onClick={() => setFlipped(!flipped)} className="flashcard">
        <h1 className={!flipped ? "flashcard-txt" : "flashcard-txt"}>
          {!flipped ? question : answer}
        </h1>
      </div>
    </>
  );
}

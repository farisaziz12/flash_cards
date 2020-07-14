import React from "react";
import "./FlashCard.css";

export default function FlashCard(props) {
  return (
    <div className="flashcard">
      <h1 className="flashcard-txt">{props.question}</h1>
    </div>
  );
}

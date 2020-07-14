import React from "react";
import "./FlashCard.css";

export default function FlashCard(props) {
  return (
    <div>
      <h1>{props.question}</h1>
    </div>
  );
}

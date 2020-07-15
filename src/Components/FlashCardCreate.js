import React, { useState } from "react";
import "./FlashCardCreate.css";

export default function FlashCardCreate(props) {
  const [showAnsInput, setShowAnsInput] = useState(false);
  const { setQuestion, setAnswer, question, answer, saveNewCard } = props;

  return (
    <div>
      <form
        //   On input change if the question has already been provided then the answer state will be changed
        onChange={(e) => {
          !showAnsInput
            ? setQuestion(e.target.value)
            : setAnswer(e.target.value);
        }}
      >
        {/* Conditionaly rendering the answer input based on if the question input had been filled*/}
        {!showAnsInput ? (
          <input
            type="text"
            className="create-flashcard-input"
            value={question}
            placeholder="Type Question Here"
          />
        ) : (
          <input
            type="text"
            className="create-flashcard-input"
            value={answer}
            placeholder="Type Answer Here"
          />
        )}
        <button
          type="submit"
          onClick={
            !showAnsInput
              ? (e) => {
                  //   Preventing default form behaviour of refreshing window
                  e.preventDefault();
                  //   Checking if there is content before switching state to show answer input
                  setShowAnsInput(question !== "" && true);
                }
              : (e) => {
                  e.preventDefault();
                  //   Once both question and answer are giventhen the object is passed to the parent component
                  saveNewCard();
                  setShowAnsInput(false);
                }
          }
          className="done-btn"
        >
          {/* Conditionally rendering button text depending on input type */}
          {!showAnsInput ? "Done" : "Create"}
        </button>
      </form>
    </div>
  );
}

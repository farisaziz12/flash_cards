import React, { useState } from "react";
import "./App.css";
import FlashCardCreate from "./Components/FlashCardCreate";
import FlashCard from "./Components/FlashCard";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCardQuestion, setNewCardQuestion] = useState("");
  const [newCardAnswer, setNewCardAnswer] = useState("");

  const saveNewCard = () => {
    const flashcard = { question: newCardQuestion, answer: newCardAnswer };
    setFlashcards([...flashcards, flashcard]);
    setNewCardQuestion("");
    setNewCardAnswer("");
  };

  return (
    <>
      <h1>Flash Cards</h1>
      <FlashCardCreate
        question={newCardQuestion}
        setQuestion={setNewCardQuestion}
        answer={newCardAnswer}
        setAnswer={setNewCardAnswer}
        saveNewCard={saveNewCard}
      />
      {newCardQuestion && (
        <FlashCard question={newCardQuestion} answer={newCardAnswer} />
      )}
    </>
  );
}

export default App;

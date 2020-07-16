import React, { useState, useEffect } from "react";
import "./App.css";
import FlashCardCreate from "./Components/FlashCardCreate";
import FlashCard from "./Components/FlashCard";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCardQuestion, setNewCardQuestion] = useState("");
  const [newCardAnswer, setNewCardAnswer] = useState("");
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    const storedFlashcards = localStorage.getItem("flashcards");
    if (storedFlashcards) {
      setFlashcards(storedFlashcards);
    }
  }, []);

  const saveNewCard = () => {
    const id = flashcards.length + 1;
    const flashcard = {
      id: id,
      question: newCardQuestion,
      answer: newCardAnswer,
    };
    setFlashcards([...flashcards, flashcard]);
    setNewCardQuestion("");
    setNewCardAnswer("");

    localStorage.setItem(
      "flashcards",
      JSON.stringify([...flashcards, flashcard])
    );
  };

  return (
    <>
      <h1>Flash Cards</h1>
      <button onClick={() => setTestMode(!testMode)}>
        {testMode ? "Create" : "Test"}
      </button>
      {testMode ? (
        <>
          <h2>Flascards: {flashcards.length}</h2>
        </>
      ) : (
        <>
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
      )}
    </>
  );
}

export default App;

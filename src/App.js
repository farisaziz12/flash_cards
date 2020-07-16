import React, { useState, useEffect } from "react";
import "./App.css";
import FlashCardCreate from "./Components/FlashCardCreate";
import FlashCard from "./Components/FlashCard";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCardQuestion, setNewCardQuestion] = useState("");
  const [newCardAnswer, setNewCardAnswer] = useState("");
  const [testMode, setTestMode] = useState(false);
  const [cardsWrong, setCardsWrong] = useState([]);
  const [cardsRight, setCardsRight] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardsFinished, setCardsFinished] = useState(false);

  useEffect(() => {
    const storedFlashcards = localStorage.getItem("flashcards");
    if (storedFlashcards) {
      setFlashcards(JSON.parse(storedFlashcards));
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

  const launchTestMode = () => {
    setTestMode(true);
    if (flashcards[0]) {
      const card = flashcards[Math.floor(Math.random() * flashcards.length)];
      setCurrentCard(card);
    }
  };

  const handleFlashCardCorrect = (correct) => {
    const completedCards = cardsRight.concat(cardsWrong);
    const leftOverCards = flashcards.filter(
      (flashcard) =>
        !completedCards.includes(flashcard.id) &&
        flashcard.id !== currentCard.id
    );
    const nextCard =
      leftOverCards[Math.floor(Math.random() * leftOverCards.length)];

    if (correct) {
      setCardsRight([...cardsRight, currentCard.id]);
      if (nextCard) {
        setCurrentCard(nextCard);
      }
    } else {
      setCardsWrong([...cardsWrong, currentCard.id]);
      if (nextCard) {
        setCurrentCard(nextCard);
      }
    }
    if (!nextCard) {
      setCardsFinished(true);
      window.alert(
        `You got ${
          correct ? cardsRight.length + 1 : cardsRight.length
        } flashcards correct and ${
          !correct ? cardsWrong.length + 1 : cardsWrong.length
        } wrong.`
      );
    }
  };
  return (
    <>
      <h1>Flash Cards</h1>
      <button
        className="btn"
        onClick={testMode ? () => setTestMode(false) : launchTestMode}
      >
        {testMode ? "Create" : "Test"}
      </button>
      <h2>Flascards: {flashcards.length}</h2>
      {testMode ? (
        <>
          {flashcards[0] && cardsFinished === false ? (
            <>
              <h3>Got it right?</h3>
              <button
                className="btn"
                onClick={() => handleFlashCardCorrect(true)}
              >
                Yes
              </button>
              <button
                className="btn"
                onClick={() => handleFlashCardCorrect(false)}
              >
                No
              </button>

              <FlashCard
                question={currentCard.question}
                answer={currentCard.answer}
              />
            </>
          ) : (
            <h2>No Cards</h2>
          )}
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

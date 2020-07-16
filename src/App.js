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
    // Fetching stored flashcards from localstorage
    const storedFlashcards = localStorage.getItem("flashcards");
    // If stored flashcards exist the JSON is parsed into a JS object and is set in state
    if (storedFlashcards) {
      setFlashcards(JSON.parse(storedFlashcards));
    }
  }, []);

  const saveNewCard = () => {
    // An ID is alloted to a new card, which is + 1 greater than the length of the existing cards array
    const id = flashcards.length + 1;
    const flashcard = {
      id: id,
      question: newCardQuestion,
      answer: newCardAnswer,
    };
    // The new card is added to the array of existing cards and the input fields are reset
    setFlashcards([...flashcards, flashcard]);
    setNewCardQuestion("");
    setNewCardAnswer("");

    // Localstorage is updated with the latest collection of flashcards by stringifying the array of flashcards
    localStorage.setItem(
      "flashcards",
      JSON.stringify([...flashcards, flashcard])
    );
  };

  const launchTestMode = () => {
    // Setting testMode state to true to conditionally render the test view
    setTestMode(true);
    // If flashcards exist then set the current card to a random flashcard
    if (flashcards[0]) {
      const card = flashcards[Math.floor(Math.random() * flashcards.length)];
      setCurrentCard(card);
    }
  };

  const handleFlashCardCorrect = (correct) => {
    // Finding leftover cards via filtering currently answered card and list of completed cards
    const completedCards = cardsRight.concat(cardsWrong);
    const leftOverCards = flashcards.filter(
      (flashcard) =>
        !completedCards.includes(flashcard.id) &&
        flashcard.id !== currentCard.id
    );
    // Finding next card randomly using leftover cards
    const nextCard =
      leftOverCards[Math.floor(Math.random() * leftOverCards.length)];

    // Seperating correct and incorrect answers by flashcard ID and setting next card in state
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
      // Setting finished state to true to end card shuffling
      setCardsFinished(true);
      // Alerting user of score
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

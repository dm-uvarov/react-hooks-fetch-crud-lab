import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


const link = "http://localhost:4000/questions"

function App() {
  const [page, setPage] = useState("List");

  // tulpe for tracking stae of loaded questions
  const [arQuestions, setArQuestions] = useState([]);

  // loads data with Use effect via fetch
  useEffect(() => {
    fetch(link)
      .then(r => r.json())
      .then(setArQuestions)
  }, [])

  // add new question state callback fucntion
  const addNewQuestionToStateVariable = newQuestion => {
    // newQuestion.id = arQuestions.length
    let newObjQuest = {
      id: 0,
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    }

    newObjQuest.id = arQuestions.length + 1;
    newObjQuest.prompt = newQuestion.prompt;
    newObjQuest.correctIndex = newQuestion.correctIndex;
    newObjQuest.answers[0] = newQuestion.answer1;
    newObjQuest.answers[1] = newQuestion.answer2;
    newObjQuest.answers[2] = newQuestion.answer3;
    newObjQuest.answers[3] = newQuestion.answer4;

    fetch(link, {
      method: "POST",
      body: JSON.stringify({
        prompt: newObjQuest.prompt,
        answers: [newObjQuest.answers[0],
        newObjQuest.answers[1],
        newObjQuest.answers[2],
        newObjQuest.answers[3]],
        correctIndex: newObjQuest.correctIndex
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(r => r.json()).then(console.log)

    console.log("obj from form:", newQuestion);
    console.log("new obj:", newObjQuest);
    setArQuestions([...arQuestions, newObjQuest])


  }

  console.log("array from state variable:", arQuestions);

  //
  const deleteAndDisposeQ = delQ => {
    console.log("to delete:", delQ)

    fetch(link + "/" + delQ.id, {
      method: "DELETE"
    }).then(r => r.json()).then(console.log)

    fetch(link)
      .then(r => r.json())
      .then(setArQuestions)
  }

  //
  const patchCorrectIndex = (pQuestion, pIndex) => {
    console.log("to patch:", pQuestion, 'with index:', pIndex)

    fetch(link + "/" + pQuestion.id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          correctIndex: parseInt(pIndex)
        })

    }).then(r => r.json()).then(console.log)

    fetch(link)
      .then(r => r.json())
      .then(setArQuestions)

  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestionToStateVariable={addNewQuestionToStateVariable} />
        : <QuestionList questions={arQuestions}
          deleteAndDisposeQ={deleteAndDisposeQ}
          patchCorrectIndex={patchCorrectIndex} />}
    </main>
  );
}

export default App;


// [
//   {
//     "id": 1,
//     "prompt": "What special prop should always be included for lists of elements?",
//     "answers": [
//       "id",
//       "name",
//       "key",
//       "prop"
//     ],
//     "correctIndex": 2
//   },
//   {
//     "id": 2,
//     "prompt": "A React component is a function that returns ______.",
//     "answers": [
//       "HTML",
//       "JSX",
//       "props",
//       "state"
//     ],
//     "correctIndex": 1
//   },

import React from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questions, deleteAndDisposeQ, patchCorrectIndex }) {
  console.log("recieved props", questions);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
        questions.map((question) => {
          return < QuestionItem
            question={question}
            key={question.id}
            deleteAndDisposeQ={deleteAndDisposeQ}
            patchCorrectIndex ={patchCorrectIndex} />
        })
      }
      </ul>
    </section>
  )
}

export default QuestionList;

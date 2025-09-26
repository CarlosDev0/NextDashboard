"use client";
import React, { useEffect, useState } from "react";
import { Question } from "../utils/interfaces/interfaces";
import GetQuestion from "../../app/assessment/getQuestion";
import "./assessment.css";
import ProgressBar from "../../components/progressbar/page";
import { RootState } from "../redux/counter/store";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/counter/counter-slice";

export default function Assessment() {
  //const [questionId, setId] = useState<number>(0);
  const [questions, setQuestion] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [totalQuestions, setTotal] = useState<number>(4);
  const [conclusion, setConclusion] = useState(false);
  const [quantityCorrectAnswers, setQCorrectAns] = useState(0);
  const [currentAnswerReceived, setReceived] = useState(false);

  const questionId = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const historicQuestions = [...questions];
      const newQuestion = await GetQuestion(questionId);
      historicQuestions[questionId] = newQuestion[0];
      setQuestion(historicQuestions);
    };
    fetchData();
  }, [questionId]);

  const handleAnswer = (questionId: number, answer: string) => {
    const updated = [...userAnswers];
    updated[questionId] = answer;
    setReceived(true);
    setUserAnswers(updated);
    // console.log(userAnswers);
  };
  const calculateResult = () => {
    setConclusion(true);
    const correctAnswers = userAnswers.filter(
      (a, i) => a === questions[i].correctAnswer
    ).length;
    /*.filter(...): The filter method creates a new array containing all elements of userAnswers 
    that satisfy the condition specified in the callback function.
    Callback Function: The callback function (a, i) => a === questions[i].correctAnswer 
    checks each answer a at index i in the userAnswers array against the corresponding 
    correct answer in the questions array. If the user's answer matches the correct answer, 
    it returns true, and that answer is included in the new array.*/
    setQCorrectAns(correctAnswers);
  };
  const handleNext = () => {
    setReceived(false);
    questionId + 1 >= totalQuestions
      ? calculateResult()
      : dispatch(increment());
    //: setId((prev) => prev + 1);
  };
  return (
    <div>
      <center>
        <h3>
          In this module the backend uses a MongoDB database to store the
          questions and the right answers.
        </h3>
        <h3>Choose an answer and click Next.</h3>
        {!conclusion ? (
          <main className="main-container">
            <div className="question">
              {questions[questionId] != undefined
                ? questions[questionId]?.description
                : ""}
            </div>
            <div className="options">
              <button
                id="true"
                className="button-25"
                onClick={() => handleAnswer(questionId, "True")}
              >
                True
              </button>{" "}
              <button
                id="false"
                className="button-25"
                onClick={() => handleAnswer(questionId, "False")}
              >
                False
              </button>
            </div>
            <button
              id="Next"
              className="button-71"
              type="submit"
              onClick={() => (currentAnswerReceived ? handleNext() : "")} //onClick event
            >
              {questionId < totalQuestions ? "Next" : "End"}
            </button>
          </main>
        ) : (
          <main className="main-container">
            <div className="question">Results:</div>
            <div>
              You scored {quantityCorrectAnswers} out of {totalQuestions}
              {". Percentage: "}
              {(quantityCorrectAnswers * 100) / totalQuestions}
              {"%. "}
              <div>
                {quantityCorrectAnswers / totalQuestions > 0.75
                  ? "Congratulations"
                  : ""}
              </div>
            </div>
          </main>
        )}
        <ProgressBar currentId={questionId + 1} total={totalQuestions} />
      </center>
    </div>
  );
}

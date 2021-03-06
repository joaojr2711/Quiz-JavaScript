const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const restartButton = document.getElementById('restart-btn')
const questionContainerElement = document.getElementById('question-container')
const scoreContainerElement = document.getElementById('score')
const scoreElement = document.getElementById('score-p')
const textindex = document.getElementById('text-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, pontos

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  pontos = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = ('End')
    startButton.classList.remove('hide')
    startButton.addEventListener('click', score)
    scoreElement.innerHTML = pontos
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    pontos = pontos + 1
    console.log(pontos)
  } else {
    element.classList.add('error')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('error')
}

function score(){
  questionContainerElement.remove('question-container')
  scoreContainerElement.classList.remove('hide')
}

const questions = [
  {
    question: 'O que significa HTML?',
    answers: [
      { text: 'HyperText Markup Language', correct: true },
      { text: 'HypnoToad Multiple Loop', correct: false },
      { text: 'HyperText Master Language', correct: false },
      { text: 'HardText Markup Language', correct: false }
    ]
  },
  {
    question: 'Qual a primeira tag que um documento HTML deve conter?',
    answers: [
      { text: '<html>', correct: false },
      { text: '<head>', correct: false },
      { text: '<!DOCTYPE html>', correct: true },
      { text: '<title>', correct: false }
    ]
  },
  {
    question: 'As tags HTML são envolvidas por quais caracteres?',
    answers: [
      { text: '<!--Tag-->', correct: false },
      { text: '{Tag}', correct: false },
      { text: '[Tag]', correct: false },
      { text: '<Tag>', correct: true }
    ]
  },
  {
    question: 'O que simboliza uma tag de fechamento?',
    answers: [
      { text: ' \ (barra invertida)', correct: false },
      { text: '; (ponto e vírgula)', correct: false },
      { text: '! (exclamação)', correct: false },
      { text: '/ (barra)', correct: true}
    ]
  }
]
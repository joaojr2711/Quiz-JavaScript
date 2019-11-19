const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', () => { 
  startGame(),
  setCronometro()
})
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
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
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('error')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('error')
}

const questions = [
  {
    question: 'HTML é uma linguagem de...',
    answers: [
      { text: 'Marcação', correct: true },
      { text: 'Progamação', correct: false },
      { text: 'Criação', correct: false },
      { text: 'Formatação', correct: false }
    ]
  },
  {
    question: 'A tag para adição do estilo CSS fica entre que tags?',
    answers: [
      { text: '<body></body>', correct: false },
      { text: '<title></title>', correct: false },
      { text: '<head></head>', correct: true },
      { text: '</title></head>', correct: false }
    ]
  },
  {
    question: 'Para deixar a página com o fundo azul claro, qual tag deve ser inserida?',
    answers: [
      { text: '<body style="background-color:lightblue">', correct: true },
      { text: '<body style="backcolor:blue">', correct: false },
      { text: '<body style="back-color-type:blue">', correct: false },
      { text: '<body style="background-color:#0000FF">', correct: false }
    ]
  },
  {
    question: 'Para criar um link entre uma página e outra, usa-se a tag:',
    answers: [
      { text: '<a="pagina.html"></a>', correct: false },
      { text: '<href a="pagina.html"></a>', correct: false },
      { text: '<link href="pagina.html">', correct: true },
      { text: '<a href=pagina_html></a>', correct: false }
    ]
  }
]
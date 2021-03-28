const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Update the wrong letters
function updateWrongLetterEl() {
  wrongLetterEl.innerHTML = `${wrongLetters.length>0?"<p>wrong</p>":""}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

  //Display parts
  figureParts.forEach((part, index)=>{
    const errors = wrongLetters.length;
    if(index <errors){
      part.style.display="block";
    }else{
      part.style.display = "none";
    }
  })

  // Check if lost
  if(wrongLetters.length === figureParts.length){
    finalMessage.innerText="You Lost."
    popup.style.display="flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Show hidden word
function display() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
            </span>
            `
      )
      .join("")}    
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        display();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", ()=>{
  wrongLetters.splice(0);
  correctLetters.splice(0);

  selectedWord = words[Math.floor(Math.random()*words.length)];
  updateWrongLetterEl();
  display();

  popup.style.display="none";
})

display();

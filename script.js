const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistakes span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector(".btn");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    " aroma of exotic spices and the vibrant colors of textiles created a sensory feast.",
    "The mysterious cat prowled through the moonlit alley, its eyes gleaming with an otherworldly glow. ",
    " In the bustling city, a street musician played a haunting melody on a worn-out violin, capturing the attention of passersby.",
    " As the sun dipped below the horizon, a vibrant palette of colors painted the sky, creating a breathtaking sunset.",
    "Lost in the pages of a novel, she savored the bittersweet emotions that words could evoke.",
    "The old lighthouse stood sentinel against the crashing waves, a beacon of hope in the stormy night.",
    "Laughter echoed through the family picnic, blending with the aroma of grilled burgers and the warmth of shared stories.",
  ];

  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = "";
  for (const char of paragraph[randomIndex]) {
    console.log(char);
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => {
    input.focus();
  });
}

function initTyping() {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);

  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }

    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
      console.log("Correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
      console.log("Incorrect");
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;

  }
   else {
    clearInterval(timer);
    input.value = "";
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    let wpmVal = Math.round(
      ((charIndex - mistake)/5) / (maxTime - timeLeft) * 60);
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
  }
}


function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText=timeLeft;
    input.value='';
    charIndex = 0;
    mistake =0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click",reset);
loadParagraph();

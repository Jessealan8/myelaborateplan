import { gsap } from 'gsap';
import { typeWriter, DynoDelay, sleep, showClipboard, hideClipboard, showQuestion1, showQuestion2, showQuestion3 } from './functions';


// Define elements
const wakeButton = document.getElementById('wakeButton');
const bubbleContainer = document.getElementById('bubble-container');
const textBubble = document.querySelector('.text-bubble');
const submitBTN = document.getElementById('submitBTN');
const confirmReadyBTN = document.getElementById('confirmReady');
const confirmUnReadyBTN = document.getElementById('confirmUnReady');
const BTN1 = document.getElementById('BTN1');
const BTN2 = document.getElementById('BTN2');
const BTN3 = document.getElementById('BTN3');
const BTN4 = document.getElementById('BTN4');
const answerBTNs = document.getElementById('answerContainer');
let user = ""
let CurQuestion = 0;


wakeButton.addEventListener('click', () => {
  bubbleContainer.style.display = 'block';
  wakeButton.style.display = 'none';
  openingDialog();
  // securityQuestion1();
})

submitBTN.addEventListener('click', () => {

})

// opening interactions
async function openingDialog() {
  const line1 = "Oh, hi! Sorry I nodded off there for a bit. Things have been pretty slow around here lately.";
  const line2 = "I'm Woodley. Im what you could call the tour guide here.";
  const line3 = "But anyway, first things first. Lets get you signed in!";
  const line4 = "I'll have you put your name and date down on this clip board...";

  await typeWriter(line1, textBubble);
  await sleep(DynoDelay(line1));

  await typeWriter(line2, textBubble);
  await sleep(DynoDelay(line2));

  await typeWriter(line3, textBubble);
  await sleep(DynoDelay(line3));

  await typeWriter(line4, textBubble);
  await sleep(DynoDelay(line4));

  showClipboard();
}

//Send form data to Google Sheet

const form = document.getElementById('signInForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submitted');
  hideClipboard();

  setTimeout(() => {
    Introductions();
  }, 500)

  const name = document.getElementById('nameInput').value;
  const date = document.getElementById('dateInput').value;

  user = name;

  fetch('https://script.google.com/macros/s/AKfycbx5HD1acdd-iIerrbnR4eJviw51ZbQptiI8mG6LkrzX-UIvdbB7OxxALW1Hx2y4E0u9/exec', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({ name, date }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log('Success!', data);
    // maybe show next scene or feedback message
  })
  .catch(err => {
    console.error('Error!', err);
  });
});

async function Introductions() {
  const line1 =  `Oh so your Shelby! Good to finally meet you!`
  const line2 = `Good to meet you ${user}!`;
  const lineA = "Yeah that isnt gonna work. I'm gonna need you to put your name down."
  const lineB = "lets try this again!"

  if (!user) {
    await typeWriter(lineA, textBubble);
    await sleep(DynoDelay(lineA));

    await typeWriter(lineB, textBubble);
    await sleep(DynoDelay(lineB));
    showClipboard();
  } else if (user.toLowerCase().includes('shelby')) {

    await typeWriter(line1, textBubble);
    await sleep(DynoDelay(line1));

  } else {
    await typeWriter(line2, textBubble);
    await sleep(DynoDelay(line2));
  }
  securityQuestionsIntro();
}

async function securityQuestionsIntro() {

  const line1 = "Now just one more thing before we get started.";
  const line2 = "Im going to need you to answer a few security questions. Sorry its just policy.";
  const line3 = "You ready?"
  const notReady = "Oh...well uhh im just gonna sit here till you are...so uhh...hit 'ready' when you are I guess.";

  await typeWriter(line1, textBubble);
  await sleep(DynoDelay(line1));

  await typeWriter(line2, textBubble);
  await sleep(DynoDelay(line2));

  await typeWriter(line3, textBubble);
  await sleep(DynoDelay(line3));
  confirmReadyBTN.style.display = 'block';
  confirmUnReadyBTN.style.display = 'block';

  confirmUnReadyBTN.addEventListener('click', () => {
    typeWriter(notReady, textBubble);
    confirmReadyBTN.style.display = 'none';
    confirmUnReadyBTN.style.display = 'none';
    setTimeout(() => {
      confirmReadyBTN.style.display = 'block';
    }, DynoDelay(notReady) + 2000);
  })
  confirmReadyBTN.addEventListener('click', () => {
    confirmReadyBTN.style.display = 'none';
    confirmUnReadyBTN.style.display = 'none';
    securityQuestion1();
  })

}

BTN1.addEventListener('click', () => {
  const answer = BTN1.textContent;
  PostQuestionAnswers(CurQuestion, answer)
  switch (CurQuestion) {
    case 1:
      typeWriter("Mmm really? Heard that song was kinda mid.", textBubble);
      setTimeout(() => {
        securityQuestion2();
      }, 4000)
      break;
    case 2:
      typeWriter("Dang your a server? Definitley not my best position.", textBubble);
      setTimeout(() => {
        securityQuestion3();
      }, 4500)
      break;
    case 3:
      typeWriter("I guess if thats what you want then hey, go for it!", textBubble);
      setTimeout(() => {
        nextPhase();
      }, 4500)
      break;
  }
})
BTN2.addEventListener('click', () => {
  const answer = BTN2.textContent;
  PostQuestionAnswers(CurQuestion, answer)
  switch (CurQuestion) {
    case 1:
      typeWriter("Thats valid. Great song. Wrong, but still valid.", textBubble);
      setTimeout(() => {
        securityQuestion2();
      }, 4000)
      break;
    case 2:
      typeWriter("Thats what im talking about! Setter is 100% my best position.", textBubble);
      setTimeout(() => {
        securityQuestion3();
      }, 4500)
      break;
    case 3:
      typeWriter("Really? Why? Just ask yourself. Am I a bull? If no then maybe rethink your answer.", textBubble);
      setTimeout(() => {
        nextPhase();
      }, 6000)
      break;
  }
})
BTN3.addEventListener('click', () => {
  switch (CurQuestion) {
    case 1:
      typeWriter("Yup. Thats uhhhh.. right. Next question!", textBubble);
      setTimeout(() => {
        securityQuestion2();
      }, 4000)
      break;
    case 2:
      typeWriter("Takes guts, coordination, and height! ...I myself am lacking at least one of those things.", textBubble);
      setTimeout(() => {
        securityQuestion3();
      }, 6000)
      break;
    case 3:
      typeWriter("Ya know, It gives people something to look at when you blink!", textBubble);
      setTimeout(() => {
        nextPhase();
      }, 4500)
      break;
  }
})
BTN4.addEventListener('click', () => {
  switch (CurQuestion) {
    case 1:
      typeWriter("Ya know what? I find myself asking that all the time.", textBubble);
      setTimeout(() => {
        securityQuestion2();
      }, 4500)
      break;
    case 2:
      typeWriter("Every team needs one. And they are just as important as everyone else!", textBubble);
      setTimeout(() => {
        securityQuestion3();
      }, 5000)
      break;
    case 3:
      typeWriter("Okay I cant even begin to express my thoughts on that...", textBubble);
      setTimeout(() => {
        nextPhase();
      }, 4500)
      break;
  }
})

function PostQuestionAnswers (question, answer) {
  console.log(`On question ${question} they answered ${answer}.`)
}

//potential questions:
// Favorite vollyball position - Setter
// How many piercings - 8? *could have changed*
// Whats one piercing youve always wanted - Belly button
// most listened to jonas brothers song - Miracle *confirm again*
//
async function securityQuestion1() {
  CurQuestion = 1;
const question1 = "What was your most listened to Jonas Brothers song in 2024?"

await typeWriter(question1, textBubble);
await sleep(DynoDelay(question1));

showQuestion1();

}

async function securityQuestion2() {
  CurQuestion = 2;
  const question2 = "What is your favorite position in Vollyball?"
  answerBTNs.style.display = 'none';
  await typeWriter(question2, textBubble);
  await sleep(DynoDelay(question2));
  
  showQuestion2();
  
}

async function securityQuestion3() {
  CurQuestion = 3;
  const question3 = "What is one piercing you have always wanted to have?"
  answerBTNs.style.display = 'none';
  await typeWriter(question3, textBubble);
  await sleep(DynoDelay(question3));
  
  showQuestion3();
  
}

async function nextPhase () {
  answerBTNs.style.display = 'none';
  const line1 = "SO this is when we go to the next phase...";
  await typeWriter(line1, textBubble);
}


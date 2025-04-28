
export function typeWriter(text, element, speed = 50) {
    return new Promise((resolve) => {
      element.textContent = '';
      let i = 0;
  
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          resolve(); // Done typing
        }
      }
  
      type();
    });
  }

export const DynoDelay = (line) => {
    return line.length * 40;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const showClipboard = () => {
    const clipboard = document.getElementById('clipboard');
    clipboard.style.display = 'block';
    setTimeout(() => {
        clipboard.classList.add('show');
    }, 10);
}

export const hideClipboard = () => {
    const clipboard = document.getElementById('clipboard');
    clipboard.classList.remove('show');
    clipboard.classList.add('hide');
    setTimeout(() => {
        clipboard.style.display = 'none';
        clipboard.classList.remove('hide');
    }, 300);
}

//Showing security questions
const answerBTNs = document.getElementById('answerContainer');
const BTN1 = document.getElementById('BTN1');
const BTN2 = document.getElementById('BTN2');
const BTN3 = document.getElementById('BTN3');
const BTN4 = document.getElementById('BTN4');

export const showQuestion1 = () => {
  BTN1.textContent = "Leave Before You Love Me";
  BTN2.textContent = "Every Single Time"
  BTN3.textContent = "Miracle";
  BTN4.textContent = "What a Man Gotta Do";
  answerBTNs.style.display = 'grid';
}

export const showQuestion2 = () => {
  BTN1.textContent = "Server";
  BTN2.textContent = "Setter"
  BTN3.textContent = "Hitter";
  BTN4.textContent = "Back Left";
  answerBTNs.style.display = 'grid';
}

export const showQuestion3 = () => {
  BTN1.textContent = "belly button ";
  BTN2.textContent = "Septum"
  BTN3.textContent = "eyebrow";
  BTN4.textContent = "Uvula";
  answerBTNs.style.display = 'grid';
}
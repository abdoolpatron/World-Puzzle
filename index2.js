const words = ['apple', 'ball', 'window', 'piano', 'short', 'white', 'juice', 'goat', 'shoot', 'brand', 'water', 'room', 'africa', 'computer', 'mirage', 'conclude', 'destroy', 'empty', 'rumble', 'light', 'rhythm', 'family', 'square', 'right', 'conceal', 'treason', 'bookmark', 'happy', 'champion'];
let firstWord = document.getElementsByClassName('words')[0];
const wrapper = document.getElementsByClassName('wrapper')[0];
const button = document.getElementById('submit');
button.disabled = true;

let random = Math.floor(Math.random() * words.length);
let selectedWord = words[random]; // generate random words
selectedWord = selectedWord.toUpperCase();


for(i = 0; i < selectedWord.length; i++) {
    const letter = document.createElement('p');
    letter.className = 'new';
    firstWord.appendChild(letter);
}

const letters = firstWord.children; // each letter of the first word except the first

letters[0].textContent = selectedWord[0];

for (i = 1; i < firstLetter.length; i++) {
    letters[i].innerHTML = '<input type = "text">';
}

let inputs = document.querySelectorAll('input');
inputs[0].focus();

let guessedWord = '';
let counter = 0;
let lastIndex;

function wordInput() {
    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            lastIndex = index;
            if(index < inputs.length-1) {
                inputs[lastIndex].disabled = true;
                inputs[lastIndex+=1].focus();
            }
            if(inputs[lastIndex].value != '') {
                inputs[lastIndex].blur();
                button.disabled = false;
            }
        })
    })
}
wordInput();
button.addEventListener('click', () => {
    for(i = 0; i < firstWord.children.length; i++) {
        if(firstWord.children[i].innerHTML.includes('input')) {
            guessedWord += firstWord.children[i].firstElementChild.value;
        }
        else {
            guessedWord += firstWord.children[i].textContent;
        }
    }
    if(guessedWord.length == selectedWord.length && counter < 5) {
        let newDiv = document.createElement('div');
        newDiv.className = 'words';
        if(guessedWord == selectedWord) {
            merit();
        }
        for(i = 0; i < guessedWord.length; i++) {
            if(guessedWord[i] == selectedWord[i]) {
                let newWord = document.createElement('p');
                newWord.className = 'new';
                newWord.textContent = guessedWord[i];
                newDiv.appendChild(newWord);
                wrapper.appendChild(newDiv);
            }
            if(guessedWord[i] != selectedWord[i]) {
                let newWord = document.createElement('p');
                newWord.className = 'new';
                newWord.innerHTML = '<input type = "text">';
                newDiv.appendChild(newWord);
                wrapper.appendChild(newDiv);
            }
            for(j = 0; j < firstWord.children.length; j++) {
                if(firstWord.children[j].innerHTML.includes('input')) {
                    if(firstWord.children[j].firstElementChild.value != selectedWord[j] && selectedWord.includes(firstWord.children[j].firstElementChild.value)) {
                        firstWord.children[j].firstElementChild.style.color = 'blue';
                    }
                    if(firstWord.children[j].firstElementChild.value != selectedWord[j] && !selectedWord.includes(firstWord.children[j].firstElementChild.value)) {
                        firstWord.children[j].firstElementChild.style.color = 'grey';
                    }
                }
            }
        }
        counter+=1;
        firstWord = newDiv;
        inputs = document.querySelectorAll('input');
        inputs[lastIndex+1].focus();
        button.disabled = true;
        wordInput();
        guessedWord = '';
        moves.textContent = 5 - counter;
        if(counter == 5) {
            gameMerit.style.display = 'block';
            word.textContent = selectedWord;
            remark.textContent = 'YOU FAILED TO GUESS THE WORD';
            for(i = 0; i < inputs.length; i++) {
                inputs[i].disabled = true;
            }
        }
    }
})


const gameMerit = document.getElementById('merit');
const remark = document.getElementById('remark');
const rating = document.getElementById('rating');
const retry = document.getElementById('retry');
const word = document.getElementById('word');
const moves = document.getElementById('moves');
let starCount = 0;

function merit() {
    word.textContent = guessedWord;
    if(counter == 0) {
        gameMerit.style.display = 'block';
        while(starCount < 3) {
            starCount+=1;
            rating.innerHTML += '<i class="fa fa-star" aria-hidden="true"></i>';
        }
    }
    if(counter >= 1 && counter <= 3) {
        gameMerit.style.display = 'block';
        while(starCount < 2) {
            starCount+=1;
            rating.innerHTML += '<i class="fa fa-star" aria-hidden="true"></i>';
        }
    }
    if(counter == 4) {
        gameMerit.style.display = 'block';
        rating.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    }
}

retry.addEventListener('click', () => {location.reload();})
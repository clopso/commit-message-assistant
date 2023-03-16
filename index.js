import { words, conectores, phrases, emojis } from './data.js'

const btnFunny = document.getElementById("btn-funny")
const btnRandom = document.getElementById("btn-random")
const text = document.getElementById("text")

function generateWords() {
    const randomWordsNum1 = Math.floor(Math.random() * words.length);
    const randomWordsNum2 = Math.floor(Math.random() * words.length);

    const randomConectorNum = Math.floor(Math.random() * conectores.length);

    const randomEmojisNum = Math.floor(Math.random() * emojis.length);
    

    const randomWordsAssemble = "\"" + emojis[randomEmojisNum] + " " + words[randomWordsNum1] + " " + conectores[randomConectorNum] + " " + words[randomWordsNum2] + "\""
    const randomWords = "git commit -m " + randomWordsAssemble.toLowerCase()

    return randomWords
}

function generatePhrases() {
    const randomPhrasesNum = Math.floor(Math.random() * phrases.length);
    const randomEmojisNum = Math.floor(Math.random() * emojis.length);

    const message = "git commit -m " + "\"" + emojis[randomEmojisNum] + " " + phrases[randomPhrasesNum] + "\""
    
    return message
}

function copyText(text) {

    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    
    document.body.appendChild(tempElement);
    
    const range = document.createRange();
    range.selectNodeContents(tempElement);
    
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    navigator.clipboard.writeText(tempElement.textContent).then(() => {
      console.log('Copied to clipboard');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
    
    document.body.removeChild(tempElement);

}

btnFunny.onclick = function () {
    text.innerHTML = generatePhrases()
    copyText(text.innerHTML)
};

btnRandom.onclick = function () {
    text.innerHTML = generateWords()
    copyText(text.innerHTML)
};
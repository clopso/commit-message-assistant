import { words, conectores, phrases, emojis } from './data.js'

const copyPhrase = document.getElementById("copy-phrase")
const btnRandom = document.getElementById("btn-random")
const btnFunny = document.getElementById("btn-funny")
const btnEmoji = document.getElementById("btn-emoji")
const text = document.getElementById("text")

function randomGenerator(data){
    const randomData = Math.floor(Math.random() * data.length)

    return data[randomData]
}

function assemblePhrases(...commitPhrases){
    let phrase = ""
    for(let commitPhrase of commitPhrases){
        phrase += randomGenerator(commitPhrase).toLowerCase() + " "
    }
    phrase = phrase.slice(0, -1);

    const commit = "git commit -m \"" + phrase + "\""

    text.innerHTML = commit
    copyText(text.innerHTML)

    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    copyPhrase.style.color = "#" + randomColor;
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
        copyPhrase.innerHTML = "Frase copiada!"
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
    
    document.body.removeChild(tempElement);
}

btnFunny.onclick = function () {
    assemblePhrases(emojis, phrases)
};

btnRandom.onclick = function () {
    assemblePhrases(emojis, words, conectores, words)
};

btnEmoji.onclick = function () {
    assemblePhrases(emojis)
};
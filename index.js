import { words, conectores, phrases, emojis } from './data.js'

const text = document.getElementById("text")

const btnFunny = document.getElementById("btn-funny")
const btnEmoji = document.getElementById("btn-emoji")
const btnRandom = document.getElementById("btn-random")
const btnConfig = document.getElementById("btn-config")

const checkboxAM = document.getElementById("checkbox-am")
const checkboxQuote = document.getElementById("checkbox-quote")

const copyPhrase = document.getElementById("copy-phrase")

function randomGenerator(data){
    const randomData = Math.floor(Math.random() * data.length)

    return data[randomData]
}

function assembleCommitMSG(phrase){
    let am  = (checkboxAM.checked ? " -am " : " -m ")
    let quote = (checkboxQuote.checked ? "\'" : "\"")

    const commit = "git commit" + am + quote + phrase + quote
    return commit
}


function assemblePhrases(...commitPhrases){
    let phrase = ""
    for(let commitPhrase of commitPhrases){
        phrase += randomGenerator(commitPhrase) + " "
    }
    phrase = phrase.slice(0, -1);

    const commit = assembleCommitMSG(phrase)

    text.innerHTML = commit.toLowerCase()
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

btnConfig.onclick = function () {
    document.getElementById("settingsMenu").classList.toggle("show");
}
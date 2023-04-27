import { words, conectores, phrases, emojis } from './data.js'

// Generated commit
const generatedText = document.getElementById("text")

// Custom commit area
const customButtons = document.getElementById("custom-buttons")
const customDiv = document.getElementById("custom-div")

const customCommit = document.getElementById("custom-commit")
const btnCustom = document.getElementById("btn-custom")
const prefixCustom = document.getElementById("custom-prefix")

// Random commit area
const randButtons = document.getElementById("random-buttons")

const btnFunny = document.getElementById("btn-funny")
const btnEmoji = document.getElementById("btn-emoji")
const btnRandom = document.getElementById("btn-random")

// Config area
const btnConfig = document.getElementById("btn-config")

const checkboxAM = document.getElementById("checkbox-am")
const checkboxQuote = document.getElementById("checkbox-quote")
const checkboxText = document.getElementById("checkbox-text")

const copyPhrase = document.getElementById("copy-phrase")

function randomGenerator(data){
    const randomData = Math.floor(Math.random() * data.length)

    return data[randomData]
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

function checkSelection(){
    switch (prefixCustom.selectedIndex) {
        case 0:
            return randomGenerator(emojis)
        case 1:
            return "fix:"
        case 2:
            return "feat:"
        case 3:
            return "docs:"
        case 4:
            return "breaking changes:"
        default:
            return null
    }
}

function assembleCommitMSG(phrase){
    let am  = (checkboxAM.checked ? " -am " : " -m ")
    let quote = (checkboxQuote.checked ? "\'" : "\"")

    const commit = "git commit" + am + quote + phrase + quote
    return commit
}

function printGeneratedCommit(generatedCommit){
    generatedText.innerHTML = generatedCommit
    copyText(generatedText.innerHTML)

    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    copyPhrase.style.color = "#" + randomColor;
}

function assemblePhrases(...commitPhrases){
    let phrase = ""
    for(let commitPhrase of commitPhrases){
        phrase += randomGenerator(commitPhrase) + " "
    }
    phrase = phrase.slice(0, -1);

    const commit = assembleCommitMSG(phrase)

    printGeneratedCommit(commit.toLocaleLowerCase())
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

btnCustom.onclick = function () {
    let customCommitMessage = checkSelection() + " " + customCommit.value
    customCommitMessage = assembleCommitMSG(customCommitMessage)
    printGeneratedCommit(customCommitMessage)
}

btnConfig.onclick = function () {
    document.getElementById("settingsMenu").classList.toggle("show");
}

checkboxText.addEventListener("change", () => {
    if(checkboxText.checked){
        customButtons.style.display = "block"
        customDiv.style.display = "inline-flex"
        randButtons.style.display = "none"
    }else{
        customButtons.style.display = "none"
        customDiv.style.display = "none"
        randButtons.style.display = "block"
    }
})
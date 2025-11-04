let level, ans, score = 0, tries;
let startT;
let name_ = "hacker";
let triesS = [];
let lb = document.getElementsByName("leaderboard");
const levels_ = document.getElementsByName("level");
date.textContent = time();
playBtn.disabled = true;
guess.disabled = true;

inpName.addEventListener('click',setN)
playBtn.addEventListener('click', play)
guessBtn.addEventListener('click', makeGuess);
giveUp.addEventListener('click', givesUp);

function setN(){
    if(nameM.value != "" && /^[A-Za-z]+$/.test(nameM.value)){
        name_ = nameM.value[0].toUpperCase()+nameM.value.slice(1).toLowerCase();
    } else{
        nameMsg.textContent = "Please input a valid string (no spaces)."
        return;
    }
    msg.textContent = name_+", please select a level."
    playBtn.disabled = false;
    inpName.disabled = true;
    nameM.disabled = true;
}

function play(){
    guess.disabled = false;
    startT = performance.now();
    tries = 0;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    giveUp.disabled = false;
    for(let i = 0; i < levels_.length; ++i){
        if(levels_[i].checked == true){
            level = levels_[i].value;
        }
        levels_[i].disabled = true;
    }
    msg.textContent = name_+", guess a random number from 1-" + level;
    ans  = Math.floor(Math.random()*level)+1;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = name_ + " please enter a valid number, 1-" + level; return;
    }
    else msg.textContent = name_ + ", guess a random number from 1-" + level;
    ++tries;
    if(userGuess > ans) msg.textContent = userGuess+" is too high, " + name_;
    else if(userGuess < ans) msg.textContent = userGuess+" is too low, " + name_;
    else{
        ++score;
        let tElapsed = performance.now() - startT;
        msg.textContent = "Good Job "+name_+"! It took you "+tries+" tries and "+ (tElapsed/1000).toFixed(2) + " seconds.";
        reset();
        updateScore();
    }    
}

function updateScore(){
    triesS.push(tries);
    fastest.textContent = "Fastest game"
    wins.textContent = "Total wins: "+score;
    triesS.sort((a,b) => a - b);
    let avg = 0;
    for(let i = 0; i < triesS.length; ++i){
        avg += triesS[i];
        if(i < lb.length){
            lb[i].textContent = triesS[i] + " tries";
        }
    }
    avg /= triesS.length;
    avgScore.textContent = "Average score: "+avg.toFixed(2);
}

function reset(){
    guess.disabled = true;
    playBtn.disabled = false;
    guessBtn.disabled = true;
    giveUp.disabled = true;
    guess.value = "";
    for(let i = 0; i < levels_.length; ++i){
        levels_[i].disabled = false;
    }
}

function givesUp(){
    triesS.push(parseInt(level));
    wins.textContent = "Total wins: "+score;
    triesS.sort((a,b) => a - b);
    let avg = 0;
    for(let i = 0; i < triesS.length; ++i){
        avg += triesS[i];
        if(i < lb.length){
            lb[i].textContent = triesS[i] + " tries";
        }
    }
    avg /= triesS.length;
    avgScore.textContent = "Average score: "+avg.toFixed(2);
    msg.textContent = "Choose a level";
    reset();
}

function time() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let d = new Date();
    let day = d.getDate();
    if(day%10 == 1 && day != 11) day +="rst";
    else if(day%10 == 2 && day != 12) day += "nd";
    else if(day%10 == 3 && day != 13) day += "rd";
    else day += "th";
    let formatted = months[d.getMonth()] + " " + day + ", " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return formatted;
}
let level, ans, score = 0, tries;
let triesS = [];
let lb = document.getElementsByName("leaderboard");
const levels_ = document.getElementsByName("level");
date.textContent = time();

playBtn.addEventListener('click', play)
guessBtn.addEventListener('click', makeGuess);
giveUp.addEventListener('click', givesUp);

function play(){
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
    msg.textContent = "Guess a random number from 1-" + level;
    ans  = Math.floor(Math.random()*level)+1;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = "Enter a valid number, 1-" + level; return;
    }
    else msg.textContent = "Guess a random number from 1-" + level;
    ++tries;
    if(userGuess > ans) msg.textContent = userGuess+" is too high";
    else if(userGuess < ans) msg.textContent = userGuess+" is too low";
    else{
        ++score;
        msg.textContent = "Correct! It took you "+tries+" tries. Choose a level";
        reset();
        updateScore();
    }    
}

function updateScore(){
    triesS.push(tries);
    wins.textContent = "Total wins: "+score;
    triesS.sort((a,b) => a - b);
    let avg = 0;
    for(let i = 0; i < triesS.length; ++i){
        avg += triesS[i];
        if(i < lb.length){
            lb[i].textContent = triesS[i];
        }
    }
    avg /= triesS.length;
    avgScore.textContent = "Average score: "+avg.toFixed(2);
}

function reset(){
    playBtn.disabled = false;
    guessBtn.disabled = true;
    giveUp.disabled = true;
    guess.value = "";
    for(let i = 0; i < levels_.length; ++i){
        levels_[i].disabled = false;
    }
}

function givesUp(){
    msg.textContent = "Choose a level";
    reset();
}

function time(){
    let d = new Date();
    return d;
}
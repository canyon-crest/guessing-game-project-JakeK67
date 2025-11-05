let level, ans, score = 0, tries;
let startT;
let tElapsed =0;
let name_ = "hacker";
inGame = false;
let triesS = [];
let lb = document.getElementsByName("leaderboard");
let fastestGT = 1e10;
let TTime = 0, wonT = 0;
let playTime = 0;
const levels_ = document.getElementsByName("level");
date.textContent = time();
playBtn.disabled = true;
guess.disabled = true;

inpName.addEventListener('click',setN)
playBtn.addEventListener('click', play)
guessBtn.addEventListener('click', makeGuess);
giveUp.addEventListener('click', givesUp);

setInterval(setT, 1000);
setInterval(playT, 1);

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
    inGame = true;
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
        inGame = false;
        ++score;
        TTime += tElapsed/1000;
        ++wonT;
        avgTime.textContent = "Average time: " + (TTime/wonT).toFixed(2);
        fastestGT = Math.min((performance.now()-startT)/1000, fastestGT);
        msg.textContent = "Good Job "+name_+"! It took you "+tries+" tries and "+ (tElapsed/1000).toFixed(2) + " seconds.";
        if(tries < Math.ceil(Math.log(level)/Math.log(2))-1) msg.textContent += " You did great!";
        else if(tries < Math.ceil(Math.log(level)/Math.log(2))) msg.textContent += " You did fairly well.";
        else if(tries == Math.ceil(Math.log(level)/Math.log(2))) msg.textContent += " You got it in "+tries+" tries, which is what was expected.";
        else if(tries <= level) msg.textContent += " You did... absolutely horribly.";
        else msg.textContent += " (How did you do so badly?)";
        reset();
        updateScore();
        return;
    }
    msg.textContent += ". Your answer is " + close(Math.abs(ans-userGuess), level)
}

function updateScore(){
    triesS.push(tries);
    fastest12.textContent = "Fastest game: " + fastestGT.toFixed(2) + "seconds"; 
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
    inGame = false;
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

function setT(){
    date.textContent = time();
}

function playT(){
    tElapsed = performance.now() - startT;
    if(inGame) timerR.textContent = (tElapsed/1000).toFixed(2);
}

function close(dist, lev){
    if(dist <= Math.ceil(lev/20)) return "hot";
    else if(dist <= Math.ceil(lev/3)) return "warm";
    else return "cold";
}
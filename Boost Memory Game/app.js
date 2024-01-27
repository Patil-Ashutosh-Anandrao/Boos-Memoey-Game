// here  we are use btn every were but keep in mind let have functional scope so it will not create any problem

let gameSeq=[]; // game sequence
let userSeq=[]; // user sequence

let started=false; // game started or not
let level=0; // game level

let h2=document.querySelector("h2"); // access vale of h2 tag

let btns=["green","red","yellow","blue"]; // button colors for random selection 



// `localStorage.getItem('highScore')` is a method used to retrieve the value associated with the key 'highScore' from the browser's local storage.
// In your case, 'highScore' is the key used to store and retrieve the high score from the local storage. If there is a value associated with 'highScore' in the local storage, `localStorage.getItem('highScore')` will return that value. If there is no such value, it will return `null`.
//So, `localStorage.getItem('highScore')` is used to get the high score that was saved in a previous session of the game.


let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0; // high score

let h3 = document.querySelector("h3"); // access vale of h3 tag




// when user press any key of keyboar to start the game
// lets detect the pressed key and start the game.
document.addEventListener("keypress",function(){
    
    // if game is not started then start the game 
    // when user press any key of keyboard
    if(started==false){
        started=true;  
    // Now the  game is started then start the game

    // Lets level up the game
        levelUp();
    } 
}
);

function levelUp(){

    userSeq=[]; // empty the user sequence array to track the sequence of color pressed by user for next level 
                // so make it empty for next level

                
    level++; // level up the game and move to next level 
    h2.innerHTML=`Level ${level}`; // update the level on h2 tag and display 

    // random button will goin to flash or blink
    let randIdx=Math.floor(Math.random()*3); // generate random number between 0 to 3 
    let randColor=btns[randIdx]; // get the random color from array of colors between ["green","red","yellow","blue"]
    let randBtn=document.querySelector(`.${randColor}`); // get the class of random button from the random color


    gameSeq.push(randColor); // push the random color in game sequence array to track the sequence of color random generated 


    gameFlash(randBtn); // flash or blink the button means change background color of button for few seconds
             
    
   maintainHighscore (highScore); // maintain high score of game

}


// function to flash or blink the button - means change background color of button for few seconds 
function gameFlash(btn){

    btn.classList.add("flash"); // add the flash class to button and set white color to background 

    setTimeout(function(){  // after 1s white color will be removed and default color will be set to background of button
        btn.classList.remove("flash"); // remove the flash class from button and set default color to background 
    },500); // after 500milisec 
}



// function to flash or blink the button - means change background color of button for few seconds when user hits any button 
function userFlash(btn){

    btn.classList.add("userflash"); // add the flash class to button and set white color to background 

    setTimeout(function(){  // after 1s white color will be removed and default color will be set to background of button
        btn.classList.remove("userflash"); // remove the flash class from button and set default color to background 
    },500); // after 5milisec 
}


function maintainHighscore (highScore) {  // maintain high score of game

if (level > highScore) {
    highScore = level;
    localStorage.setItem('highScore', highScore);
    }
    
    h3.innerHTML=`Your High Score of this session is : ${highScore*5}`; // display the level and high score on h3 tag

}



let allBtns=document.querySelectorAll(".btn"); // get all buttons access


for(btn of allBtns){ // add event listener to all buttons
    btn.addEventListener("click",btnPress); // when user click on button then btnPress function will be called
}

function btnPress(){
    let btn = this ; // get the button which is pressed by user
    userFlash(btn); // flash or blink the button when your click on button

     
    userColor=btn.getAttribute("id"); // get the color of button which is pressed by user
    userSeq.push(userColor); // push the color of button which is pressed by user in user sequence array to track the sequence of color pressed by user

    checkAns(userSeq.length-1); // check the sequence of color pressed by user and random generated color sequence is same or not ??
                                // the argument is last color pressed by user and random generated color is same or not
}



// now we also need to check the sequence of color pressed by user and random generated color sequence is same or not ??
function checkAns(idx){

    // check the last color pressed by user and random generated color is same or not
    // here level is continue increasing and we need to check color enter by user is same as random color from level 0 hence level-1 we have used 

    if (userSeq [idx] === gameSeq[idx])
    {// if color is same then
        
        // for level up or move to next level if user hit correct color
        if(userSeq.length == gameSeq.length){ // if user enter all color correctly then
                setTimeout(levelUp,1000); // level up the game and move to next level 
            }
    }
    else {
        h2.innerHTML = `Game Over, Press Any Key to Restart Game ! <br/>
                        Your Score was <b>${level*5} </b>`; // if color is not same then print Game Over, Press Any Key to Restart on h2 tag

        document.querySelector("body").style.backgroundColor = "red"; // change the background color of body to red when user loss the game ...
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"; // change the background color of body to default after 1s when user loss the game ...
        }, 150);

        
        reset (); // when user hits wrong button then restart game again 
    }
}


function reset(){
    started=false; // game started or not
    gameSeq=[]; // game sequence
    userSeq=[]; // user sequence
    level=0; // game level
}


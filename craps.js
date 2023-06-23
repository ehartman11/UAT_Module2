//create variables to track wins, loses, pushes, and total games played, and set the all to zero upon initiation of the program
var wins = 0;
var loses = 0;
var pushes = 0;
var total_games = 0;

//create a function which will display a rolling dice gif, generate two random numbers, display those numbers as dice images, 
//calculate a total value from those dice, then tell the player whether or not they won, lost, or pushed
function roll(){
    //upon initiation, destroy the buttons on the screen
    destroyElementId('roll_btn');
    destroyElementId('back_btn');
    //create local objects for dice 1 and 2
    let d_1 = {};
    let d_2 = {};
    //assign name attributes to dice 1 and 2
    d_1.name = "d_1";
    d_2.name = "d_2";
    //generate a random number and assign it to dice 1 and 2 as value attributes
    d_1.value = getRandomInteger(1, 6);
    d_2.value = getRandomInteger(1, 6);

    //execute the rollGif function to run the gif
    rollGif();

    //all setTimeout() methods used in this function are to allow the roll gif to run and then be destroyed prior to the execution of the remainder of this function
    // setTimeout(*code to execute*, milliseconds to elapse prior to execution)
    setTimeout(function(){
        //execute the result function to display the dice results as .png images
        rollResult(d_1);
        rollResult(d_2);}, 2500);

    setTimeout(function(){
        //add the dice results and assign the total to a variable called d_t
        let d_t = d_1.value + d_2.value;
        //determine if the dice total is 7 or 11
        if (d_t == (7 || 11)){
            //if condition is true, display the dice total, inform player they lost, and add 1 to the loses variable
            alert(" Sorry, You lost");
            ++ loses;
        }
        //determine if the dice are even and equal in value
        else if ((d_1.value == d_2.value) && (d_1.value % 2 == 0)){
            //if condition is true, inform player they won, and add 1 to the wins variable
            alert("You Won!!");
            ++ wins;
        }
        //if neither of the above conditions are true, inform the player the result is a push, and add 1 to the pushes variable
        else{
            alert("It's a Push");
            ++ pushes;
        }
        }, 4000);

    // regardless of outcome, add 1 to the total games variable
    ++ total_games;
    
    //create a button to return to the previous screen state
    setTimeout(function(){
        newElement('p');
        newElement('button', 'back_btn', 'Back', null, 'returnHome()');
    }, 4000);
}


function getRandomInteger(min, max){
    //generate a random number (min and max inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Display the dice rolling gif and create a timer after which the gif will be destroyed
function rollGif(){
    newElement('img', 'rolling_dice', null, 'rolling_dice.gif', null);
    //wait 2 sec, then destroy the gif
    setTimeout(function(){
        destroyElementId('rolling_dice');
    }, 2000);
}


function rollResult(dice){
    //upload image of dice roll result
    //the image will be dependent on roll function d_1 or 2 result
    //convert the dice value integer to a string
    newElement('img', 'res_' + dice.name, null, 'die_0' + dice.value.toString() + '.png', null);
}


function play(){
    //Upon pressing play button, destroy the buttons on the screen and create new back and roll buttons
    destroyElementId('rules_btn');
    destroyElementId('stats_btn');
    destroyElementId('play_btn');
    
    newElement('button', 'back_btn', 'Back', null, 'returnHome()');
    newElement('button', 'roll_btn', 'Roll' ,  null, 'roll()');
}


function returnHome(){
    //upon pressing the back button, return the previous screen state
    //first, create a gif for screen transition. this is simply for asthetics
    newElement('img', 'rotating_dice', null, 'rotating_dice.gif', null);
    //if on the roll screen: destroy the roll and back buttons, wait 2 seconds then destroy the gif and create the rules, play, and stats buttons
    try{destroyElementId('roll_btn');
        destroyElementId('back_btn');

        setTimeout(function(){
            destroyElementId('rotating_dice');

            newElement('button', 'rules_btn','Show Rules', null, 'showRules()');
            newElement('button', 'play_btn', 'Play Game', null, 'play()');
            newElement('button', 'stats_btn','Show Stats', null, 'showStats()');
            }, 2000);}
    //if on the dice roll results screen, destroy the dice images and back button, wait 2 seconds then create the roll and back buttons
    catch{ 
        destroyElementId('back_btn');
        destroyElementId('res_d_1');
        destroyElementId('res_d_2');

        setTimeout(function(){
            destroyElementId('rotating_dice');
    
            newElement('button', 'back_btn', 'Back', null, 'returnHome()');
            newElement('button', 'roll_btn', 'Roll' ,  null, 'roll()');
            }, 2000);}
    //I could've used variables to determine the actual state of all the possible buttons (rules, play, stats, back, and roll -> each as true or false) 
    //and used an if/else statement to determine what was present on screen
    //But decided against it because it would've required changing their states every time they were created or destroyed throughout the program
    //The try/catch method seemed like an easier/more streamline solution to determining what buttons were present on the screen and needed to be destroyed 
    //alternatively, I could've made variables to track the screen states, ie A home, roll, and results screen state that whenever play, roll, and back were pressed,
    //got updated to true or false
    //There are many different possible solutions to the issue
    }


//Display the player's stats
function showStats(){
    //calculate win percentage and assign it to a local (inner scope) variable
    let winPercentage = (wins / total_games) * 100;
    alert('Games Played:  ' + total_games + '\n\
    Wins:  ' + wins + '\n\
    Loses:  ' + loses + '\n\
    Pushes:  ' + pushes + '\n\
    Win Percentage:  ' + winPercentage + '%');
}


//Display the rules of the game
function showRules(){
    alert("Rules:\n\
    Rolling even sided doubles is a Win\n\
    Rolling a total dice value of 7 or 11 is a Loss\n\
    Any other roll is a Push");
}

//simple function to destroy an html element
//I made this a stand-alone function due to its abundant use, plus its easier to understand its purpose when seen in the rest of the code
// Strong possibility of adding this function to a util.js file for later reuse due to its versatility *//
function destroyElementId(id){
    //find an html element by its id and assign it to a variable
    element = document.getElementById(id);
    //go to the parent node of the element and then remove the child node (the element itself)
    element.parentNode.removeChild(element);
}

//a more complex function that creates specific elements within the html doc
//      Args:    
//         element: the element to create (ie. button, img, <h1>, <a> etc)
//         id: element id
//         text: the text to add to a textNode (say, for a button, <h1>, <p> etc.)
//         src: the source path of an image or gif
//         onClick: a function or command to be executed when GUI is clicked
//         href: hyperlink path
//
// All args subsequent to the element itself have a default value of null
// This for the purposes of determining conditionally whether or not the arg is to be added as an attribute to the element
// *Strong possibility of adding this function to a util.js file for later reuse due to its versatility (note: more args could be added later) *//
function newElement(element, id=null, text=null, src=null, onClick=null, href=null){
    //create the element
    element = document.createElement(element);
    //set the element's attributes
    if (id != null){
        element.setAttribute('id', id);
    }
    if (src != null){
        element.setAttribute('src', src);
    }
    if (onClick != null){
        element.setAttribute('onClick', onClick);
    }
    if (href != null){
        element.setAttribute('href', href);
    }

    //add the element as a child node to the the html body 
    //this can(should) be amended later to allow for appending to any html tag
    document.body.appendChild(element);

    //adding a text node must occur after the creation of the element node
    //can't add a child node to a parent node that doesn't exist
    if (text != null){
        text = document.createTextNode(text);
        element.appendChild(text);
    }
}

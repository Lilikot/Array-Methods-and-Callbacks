const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
// const final2014 = fifaData.filter(function(item){
//     return item.Stage === 'Final' && item.Year === 2014;
// });
// console.log(final2014)
// //(a) Home Team name for 2014 world cup final
// console.log("Task1a is ", final2014[0]["Home Team Name"])
// //(b) Away Team name for 2014 world cup final
// console.log("Task1b is ", final2014[0]["Away Team Name"])
// //(c) Home Team goals for 2014 world cup final
// console.log("Task1c is ", final2014[0]["Home Team Goals"])
// //(d) Away Team goals for 2014 world cup final
// console.log("Task1d is ", final2014[0]["Away Team Goals"])
// //(e) Winner of 2014 world cup final */
// console.log("Task1e is ", final2014[0]["Win conditions"])

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    return data.filter(item => item.Stage === "Final");
}

console.log("Task2 " , getFinals(fifaData))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, getFinalCb) {
    return getFinalCb(data).map(item => item.Year);
}
console.log("Task3" , getYears(fifaData, getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(data, getFinalCb) {
    const winners = getFinalCb(data).map(item => {
        if (item["Home Team Goals"] > item["Away Team Goals"]){
            return item["Home Team Name"]
        } else {
            return item["Away Team Name"]
        }        
    });
    return winners;
}
console.log("Task4", getWinners(fifaData, getFinals))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */
function getWinnersByYear(data, getFinalCb, getYearsCb, getWinnersCb) {
    const winners = getWinnersCb(data,getFinalCb)
    const years = getYearsCb(data,getFinalCb)

    const answer = winners.map(function(item,index) {
        return `In ${years[index]}, ${item} won the world cup!`
    })
    return answer;
}

console.log("Task5" , getWinnersByYear(fifaData,getFinals,getYears,getWinners))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinalCb) {
    const totalGoals = getFinalCb.reduce((total, item) => {
        return total + item["Home Team Goals"] + item["Away Team Goals"]
   },0);
   return (totalGoals / getFinalCb.length).toFixed(2)

}
console.log("Task6", getAverageGoals(getFinals(fifaData)))



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initial) {
    // array of data which initial's won
    const initials = data.filter(item => item["Home Team Initials"] === initial || item["Away Team Initials"] === initial)
    const wins = initials.reduce((total, item) => {
        if (item["Home Team Initials"] === initial && item["Home Team Goals"] > item["Away Team Goals"]){
            return total + 1
        } else if (item["Away Team Initials"] === initial && item["Away Team Goals"] > item["Home Team Goals"]){
            return total + 1
        }
        return total
    },0)
    return wins;
}
console.log("Stretch 1" ,getCountryWins(fifaData,"KOR"))


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    const goals = data.filter(item => {
        if (item["Home Team Goals"] < item["Away Team Goals"]){
            return item["Away Team Goals"], item["Away Team Name"]
        } else if (item["Home Team Goals"] > item["Away Team Goals"]){
            return item["Home Team Goals"], item["Home Team Name"]
        }
    });
    return goals
}
console.log("Stretch 2" , getGoals(fifaData))

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}

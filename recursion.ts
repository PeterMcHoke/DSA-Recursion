//example inputs
const list = [2, 4, 6, 8, 10];
const number = 3;

//————————————————————————————————————————————————————————————————————————————


// find the sum of a list of numbers
const sumOf = (list) => {
    if (list.length === 1) 
        return list[0]
    else
        return list[0] + sumOf(list.slice(1)) 
}
//console.log(sumOf(list));

//————————————————————————————————————————————————————————————————————————————

//Counting Sheep
const countingSheep = (num) => {
    if (num === 0)
        console.log('All sheep jumped over the fence');
    else {
        console.log(`${num}: Another sheep jumps over the fence`);
        return countingSheep(num-1);
    }
}
//countingSheep(number);

//————————————————————————————————————————————————————————————————————————————
//Exponents
const powerCalculator = (num, exp) => {
    if (exp < 0)
        return 'exponent should be >= 0'
    else if (exp === 0)
    //any number to the 0th power if 1 because any number to the zero power is just the product of no numbers at all, which is the multiplicative identity
        return 1;
    else
        return (num * powerCalculator(num, exp-1))
}
//console.log(powerCalculator(4, 0));


//————————————————————————————————————————————————————————————————————————————

const reverseString = (string) => {
    if (string.length === 1)
        return string
    else
        return reverseString(string.slice(1)) + string[0]
}
// console.time('reverseString');
// reverseString('IJKLMNOP')
// console.timeEnd('reverseString')
// reverseString: 0.715ms

//————————————————————————————————————————————————————————————————————————————
//Reverse a string w/o recursion
const reverseStringTwo = (string) => {
    return string.split('').reverse().join('');
}
// console.time('reverseStringTwo');
// reverseStringTwo('ABCDEFGH')
// console.timeEnd('reverseStringTwo')
//reverseStringTwo: 0.051ms <-----------


//————————————————————————————————————————————————————————————————————————————

//nth Triangular Number
const triangle = (n) => {
    if (n === 1) 
        return 1
    else 
        return triangle(n-1) + n
}
//console.log(triangle(9))

//————————————————————————————————————————————————————————————————————————————

//Need help from Alvaro
// const split = (str, sep) => {
//     if (str.indexOf('/') <= 0 )
//         return str    
//     else
//         return [str.slice(0, str.indexOf('/')), split(str.slice(str.indexOf('/')+1))]
// }
//console.log(split('02/20/2020','/'))

//————————————————————————————————————————————————————————————————————————————

//Fibonacci Sequence
const fib = (num) => {
    if (num <= 2)
        return 1
    else 
     return fib(num-1) + fib(num-2)
}
//console.log(fib(7));

//————————————————————————————————————————————————————————————————————————————

const factorial = (num) => {
    if (num === 1)
        return 1
    else
        return num * factorial(num-1)
}
//console.log(factorial(5))

//————————————————————————————————————————————————————————————————————————————

let maze = [
    [' ', ' ', ' ', '*', ' ', ' ', ' '],
    ['*', '*', ' ', '*', ' ', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', '*', '*', '*', '*', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'e']
];
//Alvaro, Why does the traverse function run twice? How do we print the values of the correct
//turns without printing all of the failed attemps of the Depth First Search?
function exitMaze(maze:any[][]):void {
    this.maze = maze;
    this.traverse = function(col:number, row:number):void {
        if (this.maze[col][row] === 'e') {
            console.log(`We exited the maze at ${col},${row}`)
        }
        else if(this.maze[col][row] === ' ') {
            console.log(`At valid position`)
            //we want to track which cells in the maze we have been to so we assign a random value to that cell
            maze[col][row]="!";
            if (col < maze.length -1) {
                this.traverse(col+1,row)
            }
            if (row < maze[0].length -1){
                this.traverse(col, row + 1)
            } 
            if (col > 0) {
                this.traverse(col-1, row)
            }
            if (row > 0) {
                this.traverse(col, row-1)
            }
        }
    }
}

const newMaze = new exitMaze(maze);
newMaze.traverse(0,0);
console.table(newMaze.maze);

//

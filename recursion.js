//example inputs
const list = [2, 4, 6, 8, 10];
const number = 3;
const word = 'east';
//————————————————————————————————————————————————————————————————————————————
// find the sum of a list of numbers
const sumOf = (list) => {
    if (list.length === 1)
        return list[0];
    else
        return list[0] + sumOf(list.slice(1));
};
//console.log(sumOf(list));
//————————————————————————————————————————————————————————————————————————————
//Counting Sheep
const countingSheep = (num) => {
    if (num === 0)
        console.log('All sheep jumped over the fence');
    else {
        console.log(`${num}: Another sheep jumps over the fence`);
        return countingSheep(num - 1);
    }
};
//countingSheep(number);
//————————————————————————————————————————————————————————————————————————————
//Exponents
const powerCalculator = (num, exp) => {
    if (exp < 0)
        return 'exponent should be >= 0';
    else if (exp === 0)
        //any number to the 0th power if 1 because any number to the zero power is just the product of no numbers at all, which is the multiplicative identity
        return 1;
    else
        return (num * powerCalculator(num, exp - 1));
};
//console.log(powerCalculator(4, 0));
//————————————————————————————————————————————————————————————————————————————
const reverseString = (string) => {
    if (string.length === 1)
        return string;
    else
        return reverseString(string.slice(1)) + string[0];
};
// console.time('reverseString');
// reverseString('IJKLMNOP')
// console.timeEnd('reverseString')
// reverseString: 0.715ms
//————————————————————————————————————————————————————————————————————————————
//Reverse a string w/o recursion
const reverseStringTwo = (string) => {
    return string.split('').reverse().join('');
};
// console.time('reverseStringTwo');
// reverseStringTwo('ABCDEFGH')
// console.timeEnd('reverseStringTwo')
//reverseStringTwo: 0.051ms <-----------
//————————————————————————————————————————————————————————————————————————————
//nth Triangular Number
const triangle = (n) => {
    if (n === 1)
        return 1;
    else
        return triangle(n - 1) + n;
};
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
        return 1;
    else
        return fib(num - 1) + fib(num - 2);
};
//console.log(fib(7));
//————————————————————————————————————————————————————————————————————————————
const factorial = (num) => {
    if (num === 1)
        return 1;
    else
        return num * factorial(num - 1);
};
//console.log(factorial(5))
//————————————————————————————————————————————————————————————————————————————
// Finding our way out of a "maze" (matrix)
let maze = [
    [' ', ' ', ' ', '*', ' ', ' ', ' '],
    ['*', '*', ' ', '*', ' ', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', '*', '*', '*', '*', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'e']
];
//Alvaro, Why does the traverse function run twice? How do we print the values of the correct
//turns without printing all of the failed attemps of the Depth First Search?
function exitMaze(maze) {
    this.maze = maze;
    this.traverse = function (col, row) {
        if (this.maze[col][row] === 'e') {
            console.log(`We exited the maze at ${col},${row}`);
        }
        else if (this.maze[col][row] === ' ') {
            console.log(`At valid position`);
            //we want to track which cells in the maze we have been to so we assign a random value to that cell
            maze[col][row] = "!";
            if (col < maze.length - 1) {
                this.traverse(col + 1, row);
            }
            if (row < maze[0].length - 1) {
                this.traverse(col, row + 1);
            }
            if (col > 0) {
                this.traverse(col - 1, row);
            }
            if (row > 0) {
                this.traverse(col, row - 1);
            }
        }
    };
}
const newMaze = new exitMaze(maze);
//RUN THIS newMaze.traverse(0,0);
//————————————————————————————————————————————————————————————————————————————
// Finding All Permutations of a String (Anagram)
//We want to traverse down the tree until we hit a node that has no children at which point we know we've completed one permutation.
//Essentially, if we pick "a" first, we want to call traverse with the string "bc". In order to do that, we're using the native slice 
// method to copy and concatenate everything besides the character at our current index, then we'll recursively call our traverse.
function traverse(string) {
    for (let i = 0; i < string.length; i++)
        traverse(string.slice(0, i) + string.slice(i + 1));
}
//Right now, we have no way of keeping track of our output, so let's wrap the traverse function in another function with an array we can push to
//We also want to keep track of what permutation we are on. So let's add another parameter to our traverse function that starts as an empty string and changes as we traverse the tree
//Now, we have to maintain our array by pushing when our traversal hits a leaf node. 
//Given that we're cutting down our string by a character at each step, we'll eventually reach a point where there aren't any more characters in string.
//It's at that point that we'll want to push to our output array. i.e. if (!string) this.output.push(perm)
function anagramInProcess(word) {
    this.output = [];
    this.traverse = function (str, perm = '') {
        if (!str)
            this.output.push(perm);
        for (let i = 0; i < str.length; i++) {
            //str.slice(0,i) will return nothing when i = 0 which isolates the rest of the string using str.slice(i+1)
            this.traverse(str.slice(0, i) + str.slice(i + 1), perm + str[i]);
        }
    };
    this.traverse(word);
    return this.output;
}
//We also want to keep track of letters that we have already traversed their branch. (if we have repeat letters we will end up doing many of the same tasks twice)
//This is an ideal case for a Set to keep track of these characters.
//We're putting our seen inside of traverse very intentionally. A "b" at our top level node is different than a "b" one or two levels deep, so keeping distinct sets for each stack frame is vital.
function anagram(word) {
    this.output = [];
    this.traverse = function (str, perm = '') {
        const seen = new Set();
        if (!str)
            this.output.push(perm);
        for (let i = 0; i < str.length; i++) {
            if (!seen.has(str[i])) {
                seen.add(str[i]);
                this.traverse(str.slice(0, i) + str.slice(i + 1), perm + str[i]);
            }
        }
    };
    this.traverse(word);
    return this.output;
}
//RUN ME console.log('anagram', anagram('east'));
//method 2, but we are just loggin to the console
function anagrams(prefix, str) {
    if (str.length <= 1) {
        console.log(prefix + str);
    }
    else {
        for (let i = 0; i < str.length; i++) {
            const current = str.substring(i, i + 1);
            const before = str.substring(0, i);
            const after = str.substring(i + 1);
            anagrams(prefix + current, before + after);
        }
    }
}
;
//RUN ME anagrams('', 'east')
//————————————————————————————————————————————————————————————————————————————
//Log the heirarchy of bosses 
const org = [
    { id: 'Zuckerberg', boss: null },
    { id: 'Schroepfer', boss: 'Zuckerberg' },
    { id: 'Schrage', boss: 'Zuckerberg' },
    { id: 'Sandberg', boss: 'Zuckerberg' },
    { id: 'Bosworth', boss: 'Schroepfer' },
    { id: 'Zhao', boss: 'Schroepfer' },
    { id: 'Steve', boss: 'Bosworth' },
    { id: 'Kyle', boss: 'Bosworth' },
    { id: 'Andra', boss: 'Bosworth' },
    { id: 'Richie', boss: 'Zhao' },
    { id: 'Sofia', boss: 'Zhao' },
    { id: 'Jen', boss: 'Zhao' },
    { id: 'VanDyck', boss: 'Schrage' },
    { id: 'Swain', boss: 'Schrage' },
    { id: 'Sabrina', boss: 'VanDyck' },
    { id: 'Michelle', boss: 'VanDyck' },
    { id: 'Josh', boss: 'VanDyck' },
    { id: 'Blanch', boss: 'Swain' },
    { id: 'Tom', boss: 'Swain' },
    { id: 'Joe', boss: 'Swain' },
    { id: 'Goler', boss: 'Sandberg' },
    { id: 'Hernandez', boss: 'Sandberg' },
    { id: 'Moissinac', boss: 'Sandberg' },
    { id: 'Kelley', boss: 'Sandberg' },
    { id: 'Eddie', boss: 'Goler' },
    { id: 'Julie', boss: 'Goler' },
    { id: 'Annie', boss: 'Goler' },
    { id: 'Rowi', boss: 'Hernandez' },
    { id: 'Inga', boss: 'Hernandez' },
    { id: 'Morgan', boss: 'Hernandez' },
    { id: 'Amy', boss: 'Moissinac' },
    { id: 'Chuck', boss: 'Moissinac' },
    { id: 'Vinni', boss: 'Moissinac' },
    { id: 'Eric', boss: 'Kelley' },
    { id: 'Ana', boss: 'Kelley' },
    { id: 'Wes', boss: 'Kelley' },
];
const organize = (team, boss = '') => {
    let node = {};
    team.filter(person => person.boss === boss)
        .forEach(person => node[person.id] = organize(team, person.id));
    return node;
};
//console.log(JSON.stringify(organize(org, null)));
//————————————————————————————————————————————————————————————————————————————
//Alvaro can we go over this?
//Turn numbers into their binary equivalent
const binary = (num) => {
    if (num === 0) {
        return '0';
    }
    const dividedNum = Math.floor(num / 2);
    const remainder = num % 2;
    if (dividedNum === 0) {
        return `${remainder}`;
    }
    return binary(dividedNum) + remainder.toString();
};
console.log(binary(25));

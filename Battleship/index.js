let grid = [
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ],
    [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ]
]

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const question = prompt => {
    return new Promise((resolve, reject) => {
      rl.question(prompt, resolve)
    })
}


let run = async () => {
    //print()
    let shipLocation = randomLocation() // temporary ship location to get hiddenspot
    let ship = {
        row: shipLocation[0],
        col: shipLocation[1],
        symbol: 'S'
    }
    let player = {
        row: 0,
        col: 0,
        symbol: 'P'
    }
    grid[ship.row][ship.col] = ship.symbol
    hideShipLocation(ship)
    let isRunning = true
    // player select where to place their ship
    let rowAnswer = await question('Select row between 0-14: ')
    player.row = rowAnswer
    
    let colAnswer = await question('Select col between 0-14: ')
    player.col = colAnswer
    
    
    // place player to grid
    grid[player.row][player.col] = player.symbol

    print()
    // game loop running.
    while (isRunning){
        // kontrollera om man har gissat på alla platser runt skeppet.
        if (grid[ship.row - 1][ship.col - 1] === 'X' && grid[ship.row - 1][ship.col] === 'X' && grid[ship.row - 1][ship.col + 1] === 'X' && grid[ship.row][ship.col + 1] === 'X' && grid[ship.row + 1][ship.col + 1] === 'X' && grid[ship.row + 1][ship.col] === 'X' && grid[ship.row + 1][ship.col - 1] === 'X' && grid[ship.row][ship.col - 1] === 'X'){
            grid[ship.row][ship.col] = 'N'
        }
        // player make a move
        let checkUserMove = true
        let rowShot = ''
        let colShot = ''
        while (checkUserMove){
            rowShot = await question('Type in row cordinate between 0-14: ')
            colShot = await question('Type in col cordinate between 0-14: ')

            if (grid[rowShot][colShot] !== 'X' || grid[rowShot][colShot] !== 'C'){
                checkUserMove = !checkUserMove
            }
            console.log('Block has already been targeted.')
            console.log('Try Again!')
        }
        

        grid[rowShot][colShot] = 'X'
        print()

        // computer make a move
        let rowComputer = Math.floor(Math.random() * (14 - 0))
        let colComputer = Math.floor(Math.random() * (14 - 0))

        grid[rowComputer][colComputer] = 'C'
        print()

        // if player wins
        if (grid[ship.row][ship.col] === 'X'){
            console.log('VICTORY!!!')
            isRunning = !isRunning
        }
        // if computer wins
        if (grid[ship.row][ship.col] === 'C'){
            console.log('Computer WINS this game!')
            isRunning = !isRunning
        }
    }
    rl.close()
}

let print = () => {
    for (let i = 0; i < grid.length; i++){
        let row = grid[i].toString()
        row = row.replace(/,/g, " ")
        console.log(row)
    }  
}

let randomLocation = () => {
    let location = [] // index: 0 = x, 1 = y
    let getRow = () => {
        let x = Math.floor(Math.random() * (14 - 0))
        return x
    }

    let getCol = () => {
        let y = Math.floor(Math.random() * (14 - 0))
        return y
    }
    location.push(getRow())
    location.push(getCol())
    return location
}

let hideShipLocation = (ship) =>{
    let row = ship.row
    let col = ship.col
    // checks if ships is near a corner or wall
    let x = []
    let y = []
    const minArrIndex = 0
    const maxArrIndex = 14

    // hide ship
    grid[row][col] = '#'
    
    // upper part
    if (row - 1 >= minArrIndex){
        grid[row - 1][col] = '#'
    }
    if (row - 2 >= minArrIndex){
        grid[row - 2][col] = '#'
    }
    // upper left
    if (row - 1 >= minArrIndex){
        grid[row - 1][col - 1] = '#'
    }
    // upper right
    if (row - 1 >= minArrIndex){
        grid[row - 1][col + 1] = '#'
    }
    // lower part
    if (row + 1 <= maxArrIndex){
        grid[row + 1][col] = '#'
    }
    if (row + 2 <= maxArrIndex){
        grid[row + 2][col] = '#'
    }
    // lower left
    if (row + 1 <= maxArrIndex){
        grid[row + 1][col - 1] = '#'
    }
    // lower right
    if (row + 1 <= maxArrIndex){
        grid[row + 1][col + 1] = '#'
    }
    //left side
    if (col - 1 >= minArrIndex){
        grid[row][col - 1] = '#' 
    }
    if (col - 2 >= minArrIndex){
        grid[row][col - 2] = '#'
    }
    // right side
    if (col + 1 <= maxArrIndex){
        grid[row][col + 1] = '#'
    }
    if (col + 2 <= maxArrIndex){
        grid[row][col + 2] = '#'
    }
}

run()


// A SHIP SHOULD HAVE
// SYMBOL
// X LOCATION
// Y LOCATION

let t = () => {
    // push center
    grid[centerX][centerY] = '#'
    // push upper part
    //grid[centerX - 1][centerY] = '#' ---------------
    //grid[centerX - 2][centerY] = '#' ---------------
    // upper left
    grid[centerX - 1][centerY - 1] = '#'
    // upper right
    grid[centerX - 1][centerY + 1] = '#'
    // push lower part
    grid[centerX + 1][centerY] = '#'
    grid[centerX + 2][centerY] = '#'
    // lower left
    grid[centerX + 1][centerY - 1] = '#'
    // lower right
    grid[centerX + 1][centerY + 1] = '#'
    // right side
    grid[centerX][centerY + 1] = '#'
    grid[centerX][centerY + 2] = '#'
     // left side
    grid[centerX][centerY - 1] = '#'
     grid[centerX][centerY - 2] = '#'
}
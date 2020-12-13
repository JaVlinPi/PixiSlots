

function getSymbolsAtPosition(reel,position,overflow) {
    overflow = overflow == false ? false : true;
    let numOfSymbols = overflow ? VISIBLE_ROWS : NUM_OF_ROWS;
    let reelData = REEL_SYMBOL_DATA[reel];
    let index = Math.floor(position);
    let returnArr = reelData.slice(index,index+numOfSymbols);
    if ( returnArr.length < numOfSymbols ) {
        returnArr = returnArr.concat(reelData.slice(0,numOfSymbols-returnArr.length));
    }
    return returnArr;
}

function getResult() {
    let reelPositions = [];
    let resultSymbols = [];
    for ( let i = 0; i < NUM_OF_REELS; i++ ) {
        let pos = Math.floor(Math.random()*REEL_SYMBOL_DATA[i].length);
        reelPositions[i] = pos;
        resultSymbols[i] = getSymbolsAtPosition(i,pos,false);
    }
    let wins = getWins(resultSymbols);
    return {
        reelPositions: reelPositions,
        wins: wins,
    };
}

function getWins(symbols) {
    let wins = [];
    for ( var i = 0; i < WIN_LINES.length; i++ ) {
        let startSymbol = symbols[0][WIN_LINES[i][0]];
        for ( var n = 1; n < WIN_LINES[i].length; n++ ) {
            if ( startSymbol != 'wild' && symbols[n][WIN_LINES[i][n]] != startSymbol && symbols[n][WIN_LINES[i][n]] != 'wild' ) {
                break;
            }
            if ( startSymbol == 'wild' && symbols[n][WIN_LINES[i][n]] != 'wild' ) {
                startSymbol = symbols[n][WIN_LINES[i][n]];
            }
        }
        if ( n >= MIN_WIN_LENGTH ) {
            wins.push({
                lineId: i,
                length: Math.min(n,WIN_LINES[i].length),
            });
        }
    }
    return wins;
  }
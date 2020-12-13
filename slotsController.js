

function SlotController() {

    let reels = [];
    let reelPositions = [0,0,0,0,0];
    let currSymbols = [];

    // populate reels
    for ( var i = 0; i < NUM_OF_REELS; i++ ) {
        var r = new Reel({
            position: {
                x: REELS_X+(i*(REEL_WIDTH+REEL_SPACING)),
                y: REELS_Y,
            },
            width: REEL_WIDTH,
            symbolHeight: SYMBOL_HEIGHT,
        });
        reels.push(r);
    }

    function showPositions(positions) {
        for ( var i = 0; i < Math.min(positions.length,reels.length,NUM_OF_REELS); i++ ) {
            let symbols = getSymbolsAtPosition(i,positions[i]);
            currSymbols[i] = symbols;
            reels[i].display(symbols,(positions[i]%1));
        }
    }

    let _isSpinning = false;
    let spinStartTime;
    let lastSpinUpdateTime;
    let spinId;
    function spin() {
        if ( isResultSpinning ) return;
        resetSymbolDisplay();
        _isSpinning = true;
        spinStartTime = lastSpinUpdateTime = performance.now();
        spinId = window.requestAnimationFrame(doSpin);
    }
    this.spin = spin.bind(this);

    function isSpinning() {
        return _isSpinning;
    }
    this.isSpinning = isSpinning.bind(this);

    function doSpin(e) {
        let msPassed = e - lastSpinUpdateTime;
        for ( var i = 0; i < reelPositions.length; i++ ) {
            if ( e-spinStartTime > i*SPIN_DELAY_PER_REEL ) {
                reelPositions[i] += msPassed/1000*SPIN_SPEED;
                if ( reelPositions[i] > REEL_SYMBOL_DATA[i].length ) {
                    reelPositions[i] -= REEL_SYMBOL_DATA[i].length;
                }
            }
        }
        showPositions(reelPositions);
        lastSpinUpdateTime = e;
        if ( _isSpinning ) {
            spinId = window.requestAnimationFrame(doSpin);
        }
    }

    showPositions(reelPositions);

    let endSpinSymbols = [];
    let endSpinPositions = [];
    let isResultSpinning = false;
    let wins;
    function stopSpin(result) {
        _isSpinning = false;
        window.cancelAnimationFrame(spinId);
        if ( result ) {
            let resultPositions = result.reelPositions;
            wins = result.wins;
            isResultSpinning = true;
            // create new list of symbols, current + result
            for ( var i = 0; i < Math.min(resultPositions.length,reels.length,NUM_OF_REELS); i++ ) {
                endSpinSymbols[i] = currSymbols[i].concat(getSymbolsAtPosition(i,resultPositions[i]));
                endSpinPositions[i] = reelPositions[i]%1;
            }
            // start new frame function for showing new symbols
            spinId = window.requestAnimationFrame(doStopToResult);
            reelPositions = resultPositions.concat();
        }
    }
    this.stopSpin = stopSpin.bind(this);

    function doStopToResult(e) {
        let msPassed = e - lastSpinUpdateTime;
        let endSpinComplete = true;
        for ( var i = 0; i < endSpinPositions.length; i++ ) {
            if ( endSpinPositions[i] < endSpinSymbols[i].length-NUM_OF_ROWS-1 ) {
                endSpinPositions[i] += msPassed/1000*SPIN_SPEED;
                endSpinComplete = false;
            }
            else {
                endSpinPositions[i] = endSpinSymbols[i].length-NUM_OF_ROWS-1;
            }
            reels[i].display(endSpinSymbols[i],endSpinPositions[i]);
        }

        lastSpinUpdateTime = e;
        if ( !endSpinComplete && isResultSpinning ) {
            spinId = window.requestAnimationFrame(doStopToResult);
        }
        else {
            isResultSpinning = false;
            if ( wins && wins.length ) {
                showWins();
            }
        }
    }

    let isShowingWins = false;
    let currWinIndex;
    let winLineTimerId;
    function showWins() {
        currWinIndex = 0;
        showWinLine(wins[currWinIndex].lineId,wins[currWinIndex].length);
    }
    
    function showWinLine(lineId,length) {
        fadeAllSymbols();
        let winLine = WIN_LINES[lineId];
        for ( var r = 0; r < length; r++ ) {
            reels[r].applyFilters(winLine[r],getWinFilters(r));
        }
        clearTimeout(winLineTimerId);
        winLineTimerId = setTimeout(()=>{
            currWinIndex++;
            if ( currWinIndex >= wins.length ) {
                currWinIndex = 0;
            }
            showWinLine(wins[currWinIndex].lineId,wins[currWinIndex].length);
        },WIN_LINE_DURATION);
    }

    function getWinFilters(index) {
        let winFilter = new PIXI.filters.AdvancedBloomFilter({bloomScale:0.5,threshold:0.5});
        createjs.Tween.get(winFilter)
        .wait(index*WIN_LINE_DURATION/10)
        .to({bloomScale:1,brightness:1.5,threshold:0.25}, WIN_LINE_DURATION/4)
        .to({bloomScale:0.5,brightness:1,threshold:0.5}, WIN_LINE_DURATION/4);
        return [winFilter];
    }

    function fadeAllSymbols() {
        for ( var r = 0; r < NUM_OF_REELS; r++ ) {
            reels[r].fade();
        }
    }

    function resetSymbolDisplay() {
        clearTimeout(winLineTimerId);
        for ( var i = 0; i < reels.length; i++ ) {
            reels[i].clearFilters();
        }
    }
    
};
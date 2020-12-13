
const NUM_OF_REELS = 5;
const NUM_OF_ROWS = 4;
// NUM_OF_ROWS is the actual number of rows, however we need an extra symbol to cover when we are between 2 positions
const VISIBLE_ROWS = NUM_OF_ROWS+1;
const REELS_X = 95;
const REELS_Y = 130;
const REEL_WIDTH = 125;
const REEL_SPACING = 21;
const SYMBOL_HEIGHT = 95;
const SPIN_SPEED = 7; // speed in symbols passing per second during spin
const SPIN_DELAY_PER_REEL = 100;

// 'banana',
// 'coconut',
// 'pineapple',
// 'apricot'
// 'wild',
const REEL_SYMBOL_DATA = [
    // ['wild',  'wild',  'wild',  'wild',   'wild',   'wild',     'wild',    'wild',      'wild',       'wild'],
    // ['wild',  'wild',  'wild',  'wild',   'wild',   'wild',     'wild',    'wild',      'wild',       'wild'],
    // ['wild',  'wild',  'wild',  'wild',   'wild',   'wild',     'wild',    'wild',      'wild',       'wild'],
    // ['banana',  'coconut',  'apricot',  'banana',   'coconut',   'apricot',     'pineapple',    'coconut',      'banana',       'wild'],
    // ['banana',  'coconut',  'apricot',  'banana',   'coconut',   'apricot',     'pineapple',    'coconut',      'banana',       'wild'],
    // ['banana',  'coconut',  'apricot',  'banana',   'coconut',   'apricot',     'pineapple',    'coconut',      'banana',       'wild'],
    // ['banana',  'coconut',  'apricot',  'banana',   'coconut',   'apricot',     'pineapple',    'coconut',      'banana',       'wild'],
    ['banana',  'coconut',  'wild',     'banana',   'wild',      'apricot',     'pineapple',    'coconut',      'banana',       'wild'],
    ['apricot', 'banana',   'coconut',  'banana',   'apricot',   'coconut',     'banana',       'pineapple',    'coconut',      'pineapple'],
    ['coconut', 'banana',   'apricot',  'banana',   'coconut',   'apricot',     'pineapple',    'coconut',      'pineapple',    'wild'],
    ['apricot', 'coconut',  'banana',   'wild',     'coconut',   'pineapple',   'apricot',      'coconut',      'banana',       'pineapple'],
    ['banana',  'coconut',  'apricot',  'wild',     'coconut',   'apricot',     'pineapple',    'coconut',      'wild',         'pineapple'],
];

const WIN_LINE_DURATION = 2000; // in milliseconds
const MIN_WIN_LENGTH = 3;
const WIN_LINES = [
    [0,0,0,0,0],
    [1,1,1,1,1],
    [2,2,2,2,2],
    [3,3,3,3,3],
    [0,1,2,1,0],
    [1,2,3,2,1],
    [3,2,1,2,3],
    [2,1,0,1,2],
    [0,0,1,2,3],
    [3,3,2,1,0],
    [0,1,2,3,3],
    [3,2,1,0,0],
]
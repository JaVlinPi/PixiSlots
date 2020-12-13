
let resources = PIXI.Loader.shared.resources;

//Create a Pixi Application
let app = new PIXI.Application({ 
  width: 900,         // default: 800
  // height: 256,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1       // default: 1
});


//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

const resourceList = {
  apricot: 'images/slot/apricot.png',
  banana: 'images/slot/banana.png',
  coconut: 'images/slot/coconut.png',
  pineapple: 'images/slot/pineapple.png',
  wild: 'images/slot/wild.png',
  reelBack: 'images/table/reelback.png',
  reelFront: 'images/table/reelfront.png',
  spinButton: 'images/spin button/basic.png',
}

//load an image and run the `setup` function when it's done
for ( let a in resourceList ) {
  PIXI.Loader.shared.add(a, resourceList[a])
}
PIXI.Loader.shared.load(setup);

//This `setup` function will run when the image has loaded
let spinText;
function setup() {
  
  app.stage.sortableChildren = true;

  let reelBack = new PIXI.Sprite(resources.reelBack.texture);
  app.stage.addChild(reelBack);
  reelBack.zIndex = -1;

  let reelFront = new PIXI.Sprite(resources.reelFront.texture);
  app.stage.addChild(reelFront);
  reelFront.zIndex = 1;

  reelBack.width = reelFront.width = 900;
  reelBack.height = reelFront.height = 560;

  let spinButtonContainer = new PIXI.Container();
  spinButtonContainer.sortableChildren = true;
  app.stage.addChild(spinButtonContainer);
  let text = new PIXI.Text('SPIN',{
    fontFamily: "\"Comic Sans MS\", cursive, sans-serif",
    fontWeight: "bolder",
    fontSize: 36,
    fill : 0xffffff,
    align : 'center'
  });
  spinButtonContainer.addChild(text);
  text.x = 75;
  text.y = 37;
  text.zIndex = 2;
  let spinButton = new PIXI.Sprite(resources.spinButton.texture);
  spinButtonContainer.addChild(spinButton);
  spinButtonContainer.zIndex = 2;
  spinButtonContainer.interactive = true;
  spinButtonContainer.x = 330;
  spinButtonContainer.y = 510;


  let slotContoller = new SlotController();

  spinButtonContainer.on('click', (event) => {
    if ( slotContoller.isSpinning() ) {
      text.text = 'SPIN';
      let results = getResult();
      slotContoller.stopSpin(results);
    }
    else {
      slotContoller.spin();
      text.text = 'STOP';
    }
  });
  
}


const stage = new createjs.Stage("MyCanvas");

let droppedItems = [];

function drawBackground(x, y, width, height, color) {
  const bg = new createjs.Shape();
  bg.graphics.beginFill(color).drawRect(0, 0, width, height);
  bg.x = x;
  bg.y = y;
  stage.addChild(bg);
  return bg;
}

function createButton(x, y, label, width, height) {
  const container = new createjs.Container();
  const bg = drawBackground(0, 0, width, height, "#C7DDF2");

  const text = new createjs.Text(label, "20px Arial", "#000");
  text.textAlign = "center";
  text.textBaseline = "middle";
  text.x = width / 2;
  text.y = height / 2;

  container.addChild(bg, text);
  container.x = x;
  container.y = y;
  container.label = label;
  container.setBounds(0, 0, width, height);
  stage.addChild(container);

  //drag-drop functionality
  container.on("mousedown", function (evt) {
    container.offset = {
      x: container.x - evt.stageX,
      y: container.y - evt.stageY,
    };
    stage.addChild(container);
  });

  container.on("pressmove", function (evt) {
    container.x = evt.stageX + container.offset.x;
    container.y = evt.stageY + container.offset.y;
    stage.update();
  });

  container.on("pressup", function (evt) {
    if (dropZone.hitTest(evt.stageX - dropZone.x, evt.stageY - dropZone.y)) {
      droppedItems.push(container.label);
      container.x = dropZone.x + 10 + (droppedItems.length - 1) * 50;
      container.y = dropZone.y + 20;
      dropText.text = "";
    } else {
      container.x = x;
      container.y = y;
    }
    stage.update();
  });

  return container;
}

// Drop Zone
const dropZone = drawBackground(100, 80, 400, 100, "#C7DDF2");
const dropText = new createjs.Text("Drop tiles here...", "20px Arial", "#000");
dropText.x = 250;
dropText.y = 110;
dropText.textAlign = "center";
stage.addChild(dropText);

const previewText = new createjs.Text("Preview", "20px Arial", "#000");
const container1 = new createjs.Container();
const bg = drawBackground(200, 20, 100, 40, "#C7DDF2");
previewText.x = 250;
previewText.y = 30;
previewText.textAlign = "center";
stage.addChild(previewText);

function calculateExpression(expression) {
  try {
    return eval(expression);
  } catch (error) {
    return "Error";
  }
}

const showPreviewButton = createButton(320, 20, "SHOW PREVIEW", 180, 40);
showPreviewButton.on("click", function () {
  const expression = droppedItems.join("");
  const result = calculateExpression(expression);
  previewText.text = "";
  previewText.text = result;
  stage.update();
});

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const numberPositions = [
  { x: 100, y: 200 }, //1
  { x: 160, y: 200 },
  { x: 220, y: 200 },

  { x: 100, y: 260 },
  { x: 160, y: 260 },
  { x: 220, y: 260 },

  { x: 100, y: 320 },
  { x: 160, y: 320 },
  { x: 220, y: 320 },

  { x: 160, y: 380 }, //0
];

for (let i = 0; i < numbers.length; i++) {
  createButton(numberPositions[i].x, numberPositions[i].y, numbers[i], 50, 50);
}

const operators = ["+", "-", "*", "/", "(", ")"];

const operatorPositions = [
  { x: 390, y: 200 },
  { x: 450, y: 200 },

  { x: 390, y: 260 },
  { x: 450, y: 260 },

  { x: 390, y: 320 },
  { x: 450, y: 320 },
];

for (let i = 0; i < operators.length; i++) {
  createButton(
    operatorPositions[i].x,
    operatorPositions[i].y,
    operators[i],
    50,
    50
  );
}

stage.update();

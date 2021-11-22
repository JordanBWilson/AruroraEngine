
// draws text to the stage and only redraws it if the stage has been resized
// ex: '48px serif', 'Hello', 10, 50, 'black', 'start'
function drawText(font, msg, posX, posY, color, align, isAnim, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId);
  }

  // if (doesExist && Game.methodObjects[index] && (Game.methodObjects[index].posX !== posX || Game.methodObjects[index].posY !== posY)) {
    // isAnim = true;
  // }
  if (!doesExist) {
    let text = {
      font: font,
      msg: msg,
      posX: posX,
      posY: posY,
      color: color,
      align: align,
      isAnim: isAnim,
      props: props,
      isDeleted: false,
      methodId: methodId,
    }
    const shadowText = Object.assign({}, text);
    Game.methodObjects.push(text);
    Main.methodObjectShadows.push(shadowText);
  }
  if (!doesExist || Main.isResizing) {
    redrawText(font, msg, posX, posY, color, align);
    if (Main.methodObjectShadows[index]) {
      Main.methodObjectShadows[index].font = font;
      Main.methodObjectShadows[index].msg = msg;
      Main.methodObjectShadows[index].posX = posX;
      Main.methodObjectShadows[index].posY = posY;
      Main.methodObjectShadows[index].color = color;
      Main.methodObjectShadows[index].align = align;
      Main.methodObjectShadows[index].isAnim = isAnim;
      Main.methodObjectShadows[index].props = props;
    }
  }
  // if (doesExist && Main.isResizing) {
    // Game.methodObjects[index].font = font;
    // Game.methodObjects[index].msg = msg;
    // Game.methodObjects[index].posX = posX;
    // Game.methodObjects[index].posY = posY;
    // Game.methodObjects[index].color = color;
    // Game.methodObjects[index].align = align;
    // Game.methodObjects[index].isAnim = isAnim;
    // Game.methodObjects[index].props = props;
  // }
}
function redrawText(font, msg, posX, posY, color, align) {
  Main.stage.fillStyle = color;
  Main.stage.font = font;
  Main.stage.textAlign = align;
  Main.stage.fillText(msg, posX, posY);
}
// this will draw a rectangle to the screen
// ex: 9, 51, 100, 100, 1, 'green', false
function drawRect(posX, posY, width, height, lineWidth, color, isFilled, id, isSolid, isAnim, isBackground, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId) ;
    // console.log(Game.methodObjects[index]);
    // console.log(Game.methodObjects[index], Game.methodObjects.findIndex(x => x.methodId === methodId));
    // Game.methodObjects[index].isAnim = false;
    // check to see if there is animations going on.
    backgroundAnimationCheck(index);
  }

  // if (doesExist && Game.methodObjects[index] && (Game.methodObjects[index].posX !== posX || Game.methodObjects[index].posY !== posY)) {
    // isAnim = true;
  // }
  if (!doesExist) {
    let rect = {
      posX: posX,
      posY: posY,
      width: width,
      height: height,
      lineWidth: lineWidth,
      color: color,
      isFilled: isFilled,
      id: id,
      isSolid: isSolid,
      isAnim: isAnim,
      isBackground: isBackground,
      props: props,
      isDeleted: false,
      methodId: methodId,
    }
    const shadowRect = Object.assign({}, rect);
    Game.methodObjects.push(rect);
    Main.methodObjectShadows.push(shadowRect);
  }
    if (!doesExist || Main.isResizing) {
    redrawRect(posX, posY, width, height, lineWidth, color, isFilled);
  }
  // if (doesExist && Main.isResizing) {
    // Game.methodObjects[index].posX = posX;
    // Game.methodObjects[index].posY = posY;
    // Game.methodObjects[index].width = width;
    // Game.methodObjects[index].height = height;
    // Game.methodObjects[index].lineWidth = lineWidth;
    // Game.methodObjects[index].color = color;
    // Game.methodObjects[index].isFilled = isFilled;
    // Game.methodObjects[index].isSolid = isSolid;
    // Game.methodObjects[index].isAnim = isAnim;
    // Game.methodObjects[index].isBackground = isBackground;
    // Game.methodObjects[index].props = props;
  // }
  if (doesExist && Game.methodObjects[index].isAnim) {
    // console.log(Game.methodObjects);
    redrawRect(posX, posY, width, height, lineWidth, color, isFilled);
    Game.methodObjects[index].isAnim = false;
  }
}
function redrawRect(posX, posY, width, height, lineWidth, color, isFilled) {
  Main.stage.beginPath();
  if (!lineWidth) {
    Main.stage.lineWidth = '1';
  } else {
    Main.stage.lineWidth = lineWidth;
  }
  Main.stage.rect(posX, posY, width, height);
  if (isFilled) {
    Main.stage.fillStyle = color;
    Main.stage.fill();
  } else {
    Main.stage.strokeStyle = color;
    Main.stage.stroke();
  }
}
// this will draw a circle to the screen
// ex: 9, 51, 100, 0, 2 * Math.PI, 1, 'green', false
function drawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled, id, isSolid, isAnim, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId);
    // console.log(Game.methodObjects[index].posY, Main.methodObjectShadows[index].posY);
    // Game.methodObjects[index].isAnim = false;
  }
  // if (doesExist && Game.methodObjects[index] && (Game.methodObjects[index].posX !== posX || Game.methodObjects[index].posY !== posY)) {
    // isAnim = true;
  // }
  if (!doesExist) {
    const arc = {
      posX: posX,
      posY: posY,
      width: width,
      aglStrt: aglStrt,
      aglEnd: aglEnd,
      lineWidth: lineWidth,
      color: color,
      isFilled: isFilled,
      id: id,
      isSolid: isSolid,
      isAnim: isAnim,
      props: props,
      isDeleted: false,
      methodId: methodId,
    }
    const shadowArc = Object.assign({}, arc);
    Game.methodObjects.push(arc);
    Main.methodObjectShadows.push(shadowArc);
  }
  if (!doesExist || Main.isResizing) {
    redrawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled);
    if (Main.methodObjectShadows[index]) {
      Main.methodObjectShadows[index].posX = posX;
      Main.methodObjectShadows[index].posY = posY;
      Main.methodObjectShadows[index].width = width;
      Main.methodObjectShadows[index].aglStrt = aglStrt;
      Main.methodObjectShadows[index].aglEnd = aglEnd;
      Main.methodObjectShadows[index].lineWidth = lineWidth;
      Main.methodObjectShadows[index].color = color;
      Main.methodObjectShadows[index].isFilled = isFilled;
      Main.methodObjectShadows[index].isSolid = isSolid;
      Main.methodObjectShadows[index].isAnim = isAnim;
      Main.methodObjectShadows[index].props = props;
    }
    
  }
  // if (doesExist && Main.isResizing) {
    // Game.methodObjects[index].posX = posX;
    // Game.methodObjects[index].posY = posY;
    // Game.methodObjects[index].width = width;
    // Game.methodObjects[index].aglStrt = aglStrt;
    // Game.methodObjects[index].aglEnd = aglEnd;
    // Game.methodObjects[index].lineWidth = lineWidth;
    // Game.methodObjects[index].color = color;
    // Game.methodObjects[index].isFilled = isFilled;
    // Game.methodObjects[index].isSolid = isSolid;
    // Game.methodObjects[index].isAnim = isAnim;
    // Game.methodObjects[index].props = props;
  // }
  // checking for animations
  if (doesExist && 
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX)
   ) {
     redrawArc(
      Game.methodObjects[index].posX,
      Game.methodObjects[index].posY,
      Game.methodObjects[index].width,
      Game.methodObjects[index].aglStrt,
      Game.methodObjects[index].aglEnd,
      Game.methodObjects[index].lineWidth,
      Game.methodObjects[index].color,
      Game.methodObjects[index].isFilled,
      );
      const shadowArc = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowArc;
      Game.methodObjects[index].isAnim = true;
   }
}
function redrawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled) {
  Main.stage.beginPath();
  if (!lineWidth) {
    Main.stage.lineWidth = '1';
  } else {
    Main.stage.lineWidth = lineWidth;
  }
  Main.stage.arc(posX, posY, width, aglStrt, aglEnd);
  if (isFilled) {
    Main.stage.fillStyle = color;
    Main.stage.fill();
  } else {
    Main.stage.strokeStyle = color;
    Main.stage.stroke();
  }
}
function drawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled, action, isAnim, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId);
  }
  if (!doesExist) {
    let button = {
      posX: posX,
      posY: posY,
      width: width,
      height: height,
      lineWidth: lineWidth,
      btnColor: btnColor,
      txtColor: txtColor,
      font: font,
      msg: msg,
      isFilled: isFilled,
      action: action,
      isBtn: true,
      isAnim: isAnim,
      props: props,
      isDeleted: false,
      methodId: methodId,
    }
    const shadowButton = Object.assign({}, button);
    Game.methodObjects.push(button);
    Main.methodObjectShadows.push(shadowButton);
  }
    if (!doesExist || Main.isResizing) {
    redrawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled);
    if (Main.methodObjectShadows[index]) {
      Main.methodObjectShadows[index].posX = posX;
      Main.methodObjectShadows[index].posY = posY;
      Main.methodObjectShadows[index].width = width;
      Main.methodObjectShadows[index].height = height;
      Main.methodObjectShadows[index].lineWidth = lineWidth;
      Main.methodObjectShadows[index].btnColor = btnColor;
      Main.methodObjectShadows.txtColor = txtColor;
      Main.methodObjectShadows.font = font;
      Main.methodObjectShadows.msg = msg;
      Main.methodObjectShadows.isFilled = isFilled;
      Main.methodObjectShadows.action = action;
      Main.methodObjectShadows.isAnim = isAnim;
      Main.methodObjectShadows.props = props;
    }
    
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = posX;
    Game.methodObjects[index].posY = posY;
    Game.methodObjects[index].width = width;
    Game.methodObjects[index].height = height;
    Game.methodObjects[index].lineWidth = lineWidth;
    Game.methodObjects[index].btnColor = btnColor;
    Game.methodObjects[index].txtColor = txtColor;
    Game.methodObjects[index].font = font;
    Game.methodObjects[index].msg = msg;
    Game.methodObjects[index].isFilled = isFilled;
    Game.methodObjects[index].action = action;
    Game.methodObjects[index].isAnim = isAnim;
    Game.methodObjects[index].props = props;
  }
}

function redrawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled) {
  Main.stage.beginPath();
  if (!lineWidth) {
    Main.stage.lineWidth = '1';
  } else {
    Main.stage.lineWidth = lineWidth;
  }
  Main.stage.rect(posX, posY, width, height);
  if (isFilled) {
    Main.stage.fillStyle = btnColor;
    Main.stage.fill();
  } else {
    Main.stage.strokeStyle = btnColor;
    Main.stage.stroke();
  }
  Main.stage.fillStyle = txtColor;
  Main.stage.font = font;
  Main.stage.textAlign = 'center';
  Main.stage.fillText(msg, (posX + (width * 0.5)), (posY + (height * 0.65)));
}

let audioQ, audioQ_2, audioA, audioA_2, audioR, audioF, audioT, audioG;
let img1, imgQ, imgA, imgR, imgF, imgT, imgG, imgENTER, imgInsrucciones;
let video;
let activeKeys = [];
let pantalla = 0;

function preload() {
  audioQ = loadSound('Media/Q.wav');
  audioQ_2 = loadSound('Media/Q_2.wav');
  audioA = loadSound('Media/A.wav');
  audioA_2 = loadSound('Media/A_2.wav');
  audioR = loadSound('Media/R.wav');
  audioF = loadSound('Media/F.wav');
  audioT = loadSound('Media/T.wav');
  audioG = loadSound('Media/G.wav');

  img1 = loadImage('Media/pod_img_NA.png');
  imgQ = loadImage('Media/Q.png');
  imgA = loadImage('Media/A.png');
  imgR = loadImage('Media/R.png');
  imgF = loadImage('Media/F.png');
  imgT = loadImage('Media/T.png');
  imgG = loadImage('Media/G.png');
  imgENTER = loadImage('Media/ENTER.png');
  imgInsrucciones = loadImage('Media/instrucciones.png');

  video = createVideo('Media/intro.mp4');
}

function setup() {
  createCanvas(500, 540);
  frameRate(10);

  video.play();
  video.hide();

  video.onended(() => {
    pantalla = 2;
  });
}

function intro() {
  background(0);
}

function draw() {
  if (pantalla === 0) {
    //video intro
    intro();
    background(255);
    image(video, 0, 0, 500, 540);
    image(img1, 0, 0, 500, 540);

  } else if (pantalla === 2) {
    //intrucciones
    image(imgInsrucciones, 0, 0, 500, 540);
    image(img1, 0, 0, 500, 540);

  } else {
    //drum pad
    background(0);
    image(img1, 0, 0, 500, 540);

    //filtro
    let volumeQ2 = map(mouseY, 0, height, 1, 0);
    let volumeQ = map(mouseY, 0, height, 0, 1); 
    let volumeA2 = map(mouseY, 0, height, 1, 0);
    let volumeA = map(mouseY, 0, height, 0, 1); 

    volumeQ2 = constrain(volumeQ2, 0, 1);
    volumeQ = constrain(volumeQ, 0, 1);
    volumeA2 = constrain(volumeA2, 0, 1);
    volumeA = constrain(volumeA, 0, 1);

    audioQ.setVolume(volumeQ);
    audioQ_2.setVolume(volumeQ2);
    audioA.setVolume(volumeQ);
    audioA_2.setVolume(volumeQ2);

    activeKeys.forEach(key => {
      switch(key) {
        case 'E':
          push();
          rect(30, 30, 440, 413); 
          drawingContext.clip();
          background(255);
          Sec1(0, 0, 400, 7);
          pop();
          image(imgQ, 0, 0, 500, 540);
          break;

        case 'D':
          push();
          rect(30, 30, 440, 413); 
          drawingContext.clip();
          background(255);
          Sec1(0, 0, 400, 7);
          pop();
          image(imgA, 0, 0, 500, 540);
          break;

        case 'R':
          push();
          rect(30, 30, 440, 413); 
          drawingContext.clip();
          background(0, 0, 255);
          Sec2(0, 0, 400, 6); 
          pop();
          image(imgR, 0, 0, 500, 540);
          break;

        case 'F':
          push();
          rect(30, 30, 440, 413); 
          drawingContext.clip();
          background(0, 0, 255);
          Sec2(0, 0, 400, 6); 
          pop();
          image(imgF, 0, 0, 500, 540);
          break;

        case 'T':
          push();
          rect(30, 30, 440, 413); 
          drawingContext.clip();
          background(0, 0, 255);
          Sec3(0, 0, 400, 7);
          pop();
          image(imgT, 0, 0, 500, 540);
          break;

        case 'G':
          push();
          rect(30, 30, 440, 413); 
          drawingContext.clip();
          background(0, 0, 255);
          Sec3(0, 0, 400, 7);
          pop();
          image(imgG, 0, 0, 500, 540);
          break;
      }
    });
  }
  drawMiniMap();
}

function keyPressed() {
  if (keyCode === ENTER) {
    pantalla = 1;
    image(imgENTER, 0, 0, 500, 540);
  } 

  const upperKey = key.toUpperCase();
  const pairs = { 'E': 'D', 'D': 'E', 'R': 'F', 'F': 'R', 'T': 'G', 'G': 'T' };

  if (!['E', 'D', 'R', 'F', 'T', 'G'].includes(upperKey)) return;

  //para que no se toquen los mismos colores
  const oppositeKey = pairs[upperKey];
  if (activeKeys.includes(oppositeKey)) {
    stopSound(oppositeKey);
    activeKeys = activeKeys.filter(k => k !== oppositeKey);
  }

  if (activeKeys.includes(upperKey)) {
    stopSound(upperKey);
    activeKeys = activeKeys.filter(k => k !== upperKey);
  } else {
    playSound(upperKey);
    activeKeys.push(upperKey);
  }
}

function stopSound(key) {
  switch(key) {
    case 'E':
      audioQ.stop();
      audioQ_2.stop();
      break;
    case 'D':
      audioA.stop();
      audioA_2.stop();
      break;
    case 'R':
      audioR.stop();
      break;
    case 'F':
      audioF.stop();
      break;
    case 'T':
      audioT.stop();
      break;
    case 'G':
      audioG.stop();
      break;
  }
}

function playSound(key) {
  switch(key) {
    case 'E':
      if (!audioQ.isPlaying()) audioQ.play();
      if (!audioQ_2.isPlaying()) audioQ_2.play();
      break;
    case 'D':
      if (!audioA.isPlaying()) audioA.play();
      if (!audioA_2.isPlaying()) audioA_2.play();
      break;
    case 'R':
      if (!audioR.isPlaying()) audioR.play();
      break;
    case 'F':
      if (!audioF.isPlaying()) audioF.play();
      break;
    case 'T':
      if (!audioT.isPlaying()) audioT.play();
      break;
    case 'G':
      if (!audioG.isPlaying()) audioG.play();
      break;
  }
}

function drawMiniMap() {
  push();
  fill(250);
  stroke(0);
  strokeWeight(2);
  rect(420, 465, 50, 50);
  pop();
  
  let miniMouseY = map(mouseY, 0, 540, 465, 465 + 50);
  
  push();
  fill(230, 20, 20);
  noStroke();
  rect(420, miniMouseY, 50, 5);
  pop();
}



//visualesss


function Sec3(x, y, size, level) {
  if (level == 0) {
    fill(0);
    stroke(0, 255, 0);
    strokeWeight(25);
    rect(x, y, size, size);
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (random(1) > 0.6) {
          Sec3(x + i * 150, y + j * 25, 25, level - 1);
        } else {
          fill(0);
          noStroke();
          rect(x + i * 120, y + j * 120, 120, 120);
        }
      }
    }
  }
}

function Sec2(x, y, size, level) {
  if (level == 0) {
    fill(0);
    stroke(255);
    strokeWeight(25);
    rect(x, y, size, size);
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (random(1) > 0.6) {
          Sec2(x + i * 150, y + j * 25, 25, level - 1);
        } else {
          fill(0);
          noStroke();
          rect(x + i * 75, y + j * 75, 75, 75);
        }
      }
    }
  }
}

function Sec1(x, y, size, level) {
  if (level == 0) {
    fill(0);
    stroke(255);
    strokeWeight(25);
    rect(x, y, size, size);
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (random(1) > 0.6) {
          Sec1(x + i * 150, y + j * 25, 25, level - 1);
        } else {
          fill(0);
          noStroke()
          rect(x + i * 120, y + j * 120, 120, 120);
        }
      }
    }
  }
}
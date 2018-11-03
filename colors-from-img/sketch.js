let img;
let pixels = [];
let preSearch = [];
let quality = 50; // точность вычисления, минимум 1, максимум - img.height * img.width :) но самый оптимальное по скорости и точности - 50-60 для средних по размеру фото
let countResults = 20;
let closerToTheDesired; // closer to the desired
let imgPath = 'imgs/4.jpg';
let time = {start: 0, end: 0};

function preload(){
  img = loadImage(imgPath);
  let htmlImg = document.createElement('img');
  htmlImg.src = imgPath;
  htmlImg = document.body.appendChild(htmlImg);
}

function setup(){
  closerToTheDesired = createVector(0, 0, 0);
  // closerToTheDesired = createVector(255, 255, 255);


  noCanvas();
  image(img, 0, 0);
  img.loadPixels();

  time.start = millis();

  // set pixel array
  for(let i=3; i<img.pixels.length; i+=4){
    pixels.push(createVector(img.pixels[i - 3], img.pixels[i - 2], img.pixels[i - 1]));
  }

  // minimization count pixels for high speed
  for(let i=0; i<pixels.length; i+=quality){
    preSearch.push(pixels[i]);
  }

  // go to calculate result
  let result = imgSpectrum(preSearch, countResults, closerToTheDesired);

  // display results
  console.log(result);
  for(let i=0; i<result.length; i++){
    let hxCol = '#' + hex(preSearch[i].x, 2) + hex(preSearch[i].y, 2) + hex(preSearch[i].z, 2); // convert rgb to hex
    let div = document.createElement('div');
    div.style.background = 'rgb(' + preSearch[i].x + ', ' + preSearch[i].y + ', ' + preSearch[i].z + ')';
    div.classList.add('color');
    div.innerHTML = hxCol + '<br>rgb(' + preSearch[i].x + ', ' + preSearch[i].y + ', ' + preSearch[i].z + ')';
    document.body.appendChild(div);
  }
  time.end = millis();

  console.log('Time: '+ (time.end - time.start));
}

function imgSpectrum(pixs, countResult, closerToTheDesired){
  let distVal = 1;
  while(true){
    if(pixs.length <= countResults){
      break;
    }
    for(let i=0; i<pixs.length - 1; i+=5){
      let p = pixs[i];
      let p2 = pixs[i+1];
      if(dist(p.x, p.y, p.z, p2.x, p2.y, p2.z) < distVal){
        pixs.splice(i, 1);
      }
    }
    pixs.sort(function(a, b){
      if(dist(closerToTheDesired.x, closerToTheDesired.y, closerToTheDesired.z, a.x, a.y, a.z) > dist(closerToTheDesired.x, closerToTheDesired.y, closerToTheDesired.z, b.x, b.y, b.z)){
        return -1;
      }else{
        return 1;
      }
    });
    distVal++;
  }

  return pixs;
}

const audio = new Audio(menu[0].src);
const menuLeftButtons = document.querySelectorAll('#menu .left');
const menuRightButtons = document.querySelectorAll('#menu .right');
const playButton = document.getElementById('play');
const playButtonImg = document.querySelector('#play img');
const sladerElement = document.querySelector('.slider');
const slider = interact('.slider');
const timer = document.getElementById("timer");
const title = document.getElementById("title");
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const prevButtonImg = document.querySelector('#prev img');
const nextButtonImg = document.querySelector('#next img');
const defaultTitle = title.innerText;
let autoMotion = true;
let leftButtonSelected = menuLeftButtons[0];
let nextIndex = 0;
let prevIndex = menu.length - 1;



function loadByIndex(index) {
  if (!leftButtonSelected || nextIndex < 0 || !leftButtonSelected.menuItem.selected)
    return;

  leftButtonSelected.parentNode.classList.remove('selected');
  leftButtonSelected.menuItem.selected = false;
  leftButtonSelected = menuLeftButtons[index];
  leftButtonSelected.parentNode.classList.add('selected');
  leftButtonSelected.menuItem.selected = true;

  let continuePlaying = !audio.paused;
  audio.src = menu[index].src;
  title.innerText = leftButtonSelected.menuItem.title;
  if (continuePlaying) 
    audio.play();

  calcNextIndex();
  calcPrevIndex();
}
function setAutoMotion(value) {
  autoMotion = value;
}
function stateInfo() {
  console.clear();
  menu.forEach(function(item) {  
    console.log(item);
  });
  console.log("current index: " + leftButtonSelected.menuItem.index);
  console.log("prev index: " + prevIndex);
  console.log("next index: " + nextIndex);
  console.log("audio.src: " + audio.src);
  console.log("leftButtonSelected: " + leftButtonSelected.menuItem.title + " (" + leftButtonSelected.menuItem.selected + ")");
}
function setTimer () {
  let ms = 1000 * audio.currentTime;
  timer.innerText = new Date(ms).toISOString().substring(14, 19);
}
function toggleMenuLeftButton(e) {
  if (leftButtonSelected === e.target) {
    leftButtonSelected.parentNode.classList.toggle('selected');
    leftButtonSelected.menuItem.selected = !leftButtonSelected.menuItem.selected;
    if (leftButtonSelected.menuItem.selected) {
      playButton.classList.remove('disabled');
      sladerElement.classList.remove('disabled');
      audio.src = leftButtonSelected.menuItem.src;
    } else if (audio.paused) {
      audio.currentTime = 0;
      sladerElement.style.paddingLeft = '0%';
      sladerElement.classList.add('disabled');
      playButton.classList.add('disabled');
    }
  } else {
    let playNext = !audio.paused;
    leftButtonSelected.parentNode.classList.remove('selected');
    leftButtonSelected.menuItem.selected = false;
    leftButtonSelected = e.target;
    leftButtonSelected.parentNode.classList.add('selected');
    leftButtonSelected.menuItem.selected = true;
    playButton.classList.remove('disabled');
    sladerElement.classList.remove('disabled');
    audio.src = leftButtonSelected.menuItem.src;
    sladerElement.style.paddingLeft = '0%';
    title.innerText = leftButtonSelected.menuItem.title;
    if (playNext) audio.play();
  }
  calcNextIndex();
  calcPrevIndex();
  stateInfo();
}
function togglePlay() {
  if (!audio.paused) {
    audio.pause();
    if (!leftButtonSelected.menuItem.selected)
    {
      playButton.classList.add('disabled');
      sladerElement.classList.add('disabled');
      sladerElement.style.paddingLeft = '0%';
      audio.currentTime = 0;
    }
  }
  else if (leftButtonSelected.menuItem.selected)
    audio.play();
  stateInfo();
}
function toggleMenuRightButton(e) {
  e.target.classList.toggle('selected');
  e.target.menuItem.inList = !e.target.menuItem.inList;
  calcNextIndex();
  calcPrevIndex();
}
function calcNextIndex() {
  nextIndex = -1;
  let i = leftButtonSelected.menuItem.index + 1;
  while (i < menu.length)
  {
    if (menu[i].inList) {
      if (leftButtonSelected.menuItem.selected) nextButtonImg.setAttribute('src', 'next.svg');
      nextIndex = i;
      return;
    }
    i++;
  }
  i = 0;
  while (i <= leftButtonSelected.menuItem.index) {
    if (menu[i].inList) {
      nextIndex = i;
      if (leftButtonSelected.menuItem.selected) nextButtonImg.setAttribute('src', 'next.svg');
      return;
    }
    i++;
  }
  nextButtonImg.setAttribute('src', 'next_disabled.svg');
}
function calcPrevIndex() {
  prevIndex = -1;
  let i = leftButtonSelected.menuItem.index - 1;
  while (i > -1)
  {
    if (menu[i].inList) {
      prevIndex = i;
      if (leftButtonSelected.menuItem.selected) prevButtonImg.setAttribute('src', 'prev.svg');
      return;
    }
    i--;
  }
  i = menu.length - 1;
  while (i >= leftButtonSelected.menuItem.index) {
    if (menu[i].inList) {
      prevIndex = i;
      if (leftButtonSelected.menuItem.selected) prevButtonImg.setAttribute('src', 'prev.svg');
      return;
    }
    i--;
  }
  prevButtonImg.setAttribute('src', 'prev_disabled.svg');
}



audio.addEventListener('ended', function() {
  if (!leftButtonSelected.menuItem.selected) {
    playButton.classList.add('disabled');
    sladerElement.classList.add('disabled');
    sladerElement.style.paddingLeft = '0%';
    audio.currentTime = 0;
    return;
  }

  loadByIndex(nextIndex);
  if (nextIndex > -1) audio.play();
});
menuLeftButtons.forEach(function(button) {
  button.menuItem = menu[nextIndex];
  button.menuItem.leftButton = button; 
  button.menuItem.index = nextIndex;
  nextIndex++;
  button.addEventListener('mouseup', function(e) {
    toggleMenuLeftButton(e);
  });
  button.addEventListener('touchstart', function(e) {
    toggleMenuLeftButton(e);
    if (e.cancelable) e.preventDefault();
  });
});
nextIndex = 0;
menuRightButtons.forEach(function(button) {
  button.menuItem = menu[nextIndex++];
  button.addEventListener('mouseup', function(e) {
    toggleMenuRightButton(e);
    stateInfo();
  });
  button.addEventListener('touchstart', function(e) {
    toggleMenuRightButton(e);
    stateInfo();
    if (e.cancelable) e.preventDefault();
  });
});
playButton.addEventListener('mouseup', togglePlay);
playButton.addEventListener('touchend', function(e) { 
  togglePlay();
  e.preventDefault();
});
prevButton.addEventListener('mouseup', function() {
  loadByIndex(prevIndex)
});
prevButton.addEventListener('touchend', function(e) { 
  loadByIndex(prevIndex);
  e.preventDefault();
});
nextButton.addEventListener('mouseup', function() {
  loadByIndex(nextIndex)
});
nextButton.addEventListener('touchend', function(e) { 
  loadByIndex(nextIndex);
  e.preventDefault();
});
sladerElement.addEventListener('mousedown', function() {
  setAutoMotion(false);
});
sladerElement.addEventListener('touchstart', function(e) {
  setAutoMotion(false);
  if (e.cancelable) e.preventDefault();
});
sladerElement.addEventListener('mouseup', function(e) {
  setAutoMotion(true);
  audio.currentTime = parseFloat(sladerElement.style.paddingLeft) / 100 * audio.duration;
  e.target.setAttribute('data-value', '');
});
sladerElement.addEventListener('touchend', function(e) {
  setAutoMotion(true);
  audio.currentTime = parseFloat(sladerElement.style.paddingLeft) / 100 * audio.duration;
  e.target.setAttribute('data-value', '');
  e.preventDefault();
});
slider.draggable({
  origin: 'self',
  modifiers: [
    interact.modifiers.restrict({
      restriction: 'self'
    })
  ],
  listeners: {
    move (event) {
      if (!leftButtonSelected.menuItem.selected && audio.paused)
        return;

      const sliderWidth = interact.getElementRect(event.target).width
      const value = event.pageX / sliderWidth

      event.target.style.paddingLeft = (value * 100) + '%';
      event.target.setAttribute('data-value', new Date(1000 * audio.duration * value).toISOString().substring(14, 19));
    }
  }
});



nextIndex = 1;
sladerElement.style.paddingLeft = '0%';
title.innerText = leftButtonSelected.menuItem.title;
title.classList.add('of-track');
stateInfo();



setInterval(function() {
  setTimer();
  if (audio.paused)
    if (leftButtonSelected.menuItem.selected){
      title.innerText = leftButtonSelected.menuItem.title;
      title.classList.add('of-track');
      if (prevIndex > -1)
        prevButtonImg.setAttribute('src', 'prev.svg');
      else
        prevButtonImg.setAttribute('src', 'prev_disabled.svg');  
      if (nextIndex > -1) 
        nextButtonImg.setAttribute('src', 'next.svg');
      else 
        nextButtonImg.setAttribute('src', 'next_disabled.svg');
      playButtonImg.setAttribute('src', 'play.svg');
    } else {
      title.innerText = defaultTitle;
      title.classList.remove('of-track');
      prevButtonImg.setAttribute('src', 'prev_disabled.svg');
      nextButtonImg.setAttribute('src', 'next_disabled.svg');
      playButtonImg.setAttribute('src', 'play_disabled.svg');
    }
  else {
    playButtonImg.setAttribute('src', 'pause.svg');
    if (!leftButtonSelected.menuItem.selected) {
      prevButtonImg.setAttribute('src', 'prev_disabled.svg');
      nextButtonImg.setAttribute('src', 'next_disabled.svg');
    }
  }
  if (audio.paused || !autoMotion)
    return;
  sladerElement.style.paddingLeft = (audio.currentTime / audio.duration * 100) + '%'; 
  sladerElement.setAttribute('data-value', '');
}, 50);
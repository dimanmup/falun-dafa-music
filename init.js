const menu = [
  { selected : true, src : 'https://media.falundafa.org/media1/media/dafa/exercise/320k/exercise_01.mp3', title: 'Exercise 1', duration : '09:14', inList : true },
  { selected : false, src : 'https://media.falundafa.org/media1/media/dafa/exercise/320k/exercise_02.mp3', title: 'Exercise 2', duration : '29:55', inList : true },
  { selected : false, src : 'https://media.falundafa.org/media1/media/dafa/exercise/320k/exercise_03.mp3', title: 'Exercise 3', duration : '08:49', inList : true  },
  { selected : false, src : 'https://media.falundafa.org/media1/media/dafa/exercise/320k/exercise_04.mp3', title: 'Exercise 4', duration : '12:37', inList : true },
  { selected : false, src : 'https://media.falundafa.org/media1/media/dafa/exercise/320k/exercise_05.mp3', title: 'Exercise 5', duration : '60:03', inList : true },
  { selected : false, src : 'https://media.falundafa.org/media1/media/dafa/music/128k/PuDu.mp3', title: 'PuDu', duration : '36:04', inList : false },
  { selected : false, src : 'https://media.falundafa.org/media1/media/dafa/music/128k/JiShi.mp3', title: 'JiShi', duration : '36:06', inList : false }
];

let menuElement = document.getElementById('menu');
menu.forEach(function(item) {
  menuElement.innerHTML += '<div class="line' + (item.selected ? ' selected' : '') + '"><button class="left">' + item.title + '</button><span class="duration">' + item.duration + '</span><button class="right' + (item.inList ? ' selected' : '') + '">+</button></div>';
});
var mainDiv = document.getElementById('div1');
var buttonstart = document.getElementById('btn-start');
buttonstart.addEventListener('click', function () {
  mainDiv.style.display = 'block';
});

var buttonCancel = document.getElementById('cancelbtn');
buttonCancel.addEventListener('click', function () {
  mainDiv.style.display = 'none';
});

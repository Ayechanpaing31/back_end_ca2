/* //DIT/FT/1B/03
//p2235064
//Aye Chan Paing */


document.addEventListener("DOMContentLoaded", function () {
  var current = null;
  document.querySelector('#email').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
  targets: 'path',
  strokeDashoffset: {
  value: 0,
  duration: 700,
  easing: 'easeOutQuart'
  },
  strokeDasharray: {
  value: '240 1386',
  duration: 700,
  easing: 'easeOutQuart'
  }
  });
  });
  document.querySelector('#password').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
  targets: 'path',
  strokeDashoffset: {
  value: -336,
  duration: 700,
  easing: 'easeOutQuart'
  },
  strokeDasharray: {
  value: '240 1386',
  duration: 700,
  easing: 'easeOutQuart'
  }
  });
  });
  document.querySelector('#submit').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
  targets: 'path',
  strokeDashoffset: {
  value: -730,
  duration: 700,
  easing: 'easeOutQuart'
  },
  strokeDasharray: {
  value: '530 1386',
  duration: 700,
  easing: 'easeOutQuart'
  }
  });
  });
  });
  
  
  
  
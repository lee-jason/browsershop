(function () {
  var socket = io();
  var parser = new UAParser();
  var Main = {
    init: function () {
      $('#ready').on('click', Main.readyUp);
      $('#play').on('click', Main.leadOff);
      $('#audio').trigger('load');
      socket.on('play', Main.startPlaying);
    },
    leadOff: function () {
      socket.emit('playGroup', $('#groupName').val());
    },
    readyUp: function () {
      socket.emit('readyUp', $('#groupName').val());
    },
    startPlaying: function (options) {
      $('body').css('background-color', 'green');
      if (parser.getResult().browser.name !== 'Safari') {
        setTimeout(function () {
          $('#audio').trigger('play');
        }, 300);
      } else {
        $('#audio').trigger('play');
      }
      
      // var timeToPlay = options.timeToPlay;

      // var clock = setInterval(function () {
      //   if (new Date().getTime() >= timeToPlay) {
      //     if (parser.getResult().browser.name !== 'Safari') {
      //       setTimeout(function () {
      //         $('#audio').trigger('play');
      //       }, 300);
      //     } else {
      //       $('#audio').trigger('play');
      //     }
      //     clearInterval(clock);
      //   }
      // }, 10)
      // safari is slow on the trigger buttton so every other browser needs to pause for safari to catch up.
      
    }
  }

  $(document).ready(Main.init);

  window.Main = Main;
})();
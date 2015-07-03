(function () {
  var socket = io();
  var parser = new UAParser();

  var Main = function () {};

  Main.prototype.init = function () {
    var that = this;
    $('#ready').on('click', this.readyUp.bind(that));
    $('#play').on('click', this.leadOff.bind(that));
    $('#audio').trigger('load');
    socket.on('play', that.startPlaying.bind(that));
    socket.on('memberAdded', that.displayMembers.bind(that));
  };

  Main.prototype.leadOff =function () {
    socket.emit('playGroup', $('#groupName').val());
  }

  Main.prototype.readyUp = function () {
    // following is to make chrome preload the damn content?
    $('#audio').trigger('play');
    $('#audio').trigger('pause');
    socket.emit('readyUp', {groupName: $('#groupName').val(), userAgent: navigator.userAgent});
    this.displayBandName($('#groupName').val());
  }

  Main.prototype.startPlaying = function (options) {
    $('body').css('background-color', 'green');
    if (parser.getResult().browser.name !== 'Safari' || 
        parser.getResult().browser.name !== 'Mobile Safari') {
      setTimeout(function () {
        $('#audio').trigger('play');
      }, 300);
    } else {
      $('#audio').trigger('play');
    }

    this._clearMemberList();
    
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

  Main.prototype.displayBandName = function (bandName) {
    $('#bandName').html(bandName);
  }

  Main.prototype.displayMembers = function (members) {
    this._clearMemberList();
    members.forEach(function (memberInfo) {
      $('.memberList').append($('<li>').html(memberInfo.singer + ': ' + memberInfo.browserName));
    });
  }

  Main.prototype._clearMemberList = function () {
    $('.memberList').children().remove();
  }

  var main = new Main();

  $(document).ready(main.init.bind(main));
})();
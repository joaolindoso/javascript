$(".sound-text").click(function() {

    let $this = $(this),
        audio = $this.find('audio')[0],
        playNumber = $this.data();

    // Procura o que tá tocando e o para.
    $(".sound-text").each(function() {
      let tocando = $(this).find('.btnplayaudio.active');
      // Verifico se tá tocando e se não é o mesmo player
      if(tocando.length == 1 && playNumber != $(this).data()) {
        $(this).find('audio')[0].currentTime = 0;
        $(this).find('audio')[0].pause();
        $(this).children('.btnplayaudio').text('PLAY').removeClass('active');
      }
    });

    // Verifica se tá pausado ou ainda não iniciou, caso positivo, aplica o play.
    if(audio.paused) {
      $(this).children('.btnplayaudio').text('PAUSE').addClass('active');
      audio.play();
    } else {
      audio.pause();
      $(this).children('.btnplayaudio').text('PLAY').removeClass('active');
    }

    audio.addEventListener('ended', function() {
      $this.children('.btnplayaudio').text('PLAY').removeClass('active');
    }, false);

  });
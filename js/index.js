(function() {
    function $(id) {
      return document.getElementById(id);
    }
  
    var card = $("card"),
    openB = $("open"),
    closeB = $("close"),
    timer = null;
    var polaroids = document.querySelectorAll('.polaroid .img');
    var labels = document.querySelectorAll('.changelabels .label');
    var currentIndex = 1;

    var audios = [
      new Audio('./img/Jabvmet.mp3'),
      new Audio('./img/Taylorlove.mp3'),
      new Audio('./img/uffteriadaa.mp3'),
      new Audio('./img/akhiyangulab.mp3'),
  ];


  var currentAudio = audios[0];

    for (var i = 1; i < labels.length; i++) {
      labels[i].style.display = 'none';
    }

    function showNextPolaroid() {
      for (var i = 0; i < polaroids.length; ++i) {
        polaroids[i].style.display = 'none';
        labels[i].style.display = 'none';
      }
      polaroids[currentIndex].classList.add('fade-in'); // Add fade-in class to next polaroid
      polaroids[currentIndex].style.display = 'block'; // Show next polaroid
      labels[currentIndex].style.display = 'block'; 
      console.log('currentIndex', currentIndex);
      playAudio(audios[currentIndex]);
      console.log('currentIndexsongafter', currentIndex);
      currentIndex = (currentIndex + 1) % polaroids.length;
      console.log('currentIndexafter', currentIndex);
    }

    function playAudio(audio) {
      if (currentAudio) {
        currentAudio.pause(); // Pause the currently playing audio
      }
      audio.play(); // Play the new audio
      currentAudio = audio; // Update the current audio
    }

    // console.log("wat", open);
    openB.addEventListener("click", function() {
      card.setAttribute("class", "open-half");
      playAudio(audios[0]);
      if (timer) clearTimeout(timer);
      timer = setTimeout(function() {
        card.setAttribute("class", "open-fully");
        timer = null;
      }, 1000);
    });
  
    closeB.addEventListener("click", function() {
      card.setAttribute("class", "close-half");
      if (timer) clearTimerout(timer);
      timer = setTimeout(function() {
        card.setAttribute("class", "");
        timer = null;
      }, 1000);
    });

    $('drop').addEventListener('click', function() {
      showNextPolaroid();
    });
  })();
  
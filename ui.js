
// UI buttons
function enableUiControls(localStream) {
  var t;
  function explode() {
    $('#buttons-container').finish().fadeOut(1000);
  }
  $("#mic-btn").prop("disabled", false);
  $("#video-btn").prop("disabled", false);
  $("#exit-btn").prop("disabled", false);

  $("#mic-btn").click(function () {
    toggleMic(localStream);
    $('#buttons-container').finish();
    clearTimeout(t);
    t = setTimeout(explode, 3000);
  });

  $("#video-btn").click(function () {
    toggleVideo(localStream);
    $('#buttons-container').finish();
    clearTimeout(t);
    t = setTimeout(explode, 3000);
  });

  document.getElementById("full-screen-video").onclick = (function () {
    if ($('#buttons-container').is(":visible")) {
      clearTimeout(t);
      t = setTimeout(explode, 10);
    }
    else {
      $('#buttons-container').fadeIn(200);
      clearTimeout(t);
      t = setTimeout(explode, 3000);
    }
  });

  $("#exit-btn").click(function () {
    console.log("so sad to see you leave the channel");
    leaveChannel();
  });

  // keyboard listeners 
  $(document).keypress(function (e) {
    switch (e.key) {
      case "m":
        console.log("squick toggle the mic");
        toggleMic(localStream);
        break;
      case "v":
        console.log("quick toggle the video");
        toggleVideo(localStream);
        break;
      case "q":
        console.log("so sad to see you quit the channel");
        leaveChannel();
        break;
      default:  // do nothing
    }

    // (for testing) 
    if (e.key === "r") {
      window.history.back(); // quick reset
    }
  });
}

function toggleBtn(btn) {
  btn.toggleClass('btn-dark').toggleClass('btn-danger');
}


function toggleVisibility(elementID, visible) {
  if (visible) {
    $(elementID).attr("style", "display:block");
  } else {
    $(elementID).attr("style", "display:none");
  }
}

function toggleMic(localStream) {
  toggleBtn($("#mic-btn")); // toggle button colors
  toggleBtn($("#mic-dropdown"));
  $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // toggle the mic icon
  if ($("#mic-icon").hasClass('fa-microphone')) {
    localStream.unmuteAudio(); // enable the local mic
    toggleVisibility("#mute-overlay", false); // hide the muted mic icon
  } else {
    localStream.muteAudio(); // mute the local mic
    toggleVisibility("#mute-overlay", true); // show the muted mic icon
  }
}

function toggleVideo(localStream) {
  toggleBtn($("#video-btn")); // toggle button colors
  toggleBtn($("#cam-dropdown"));
  $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // toggle the video icon
  if ($("#video-icon").hasClass('fa-video')) {
    localStream.unmuteVideo(); // enable the local video
    toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
  } else {
    localStream.muteVideo(); // disable the local video
    toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
  }
}


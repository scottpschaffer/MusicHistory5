"use strict";

// Add songs to beginning and end of Array
songs.unshift("Sussudio > by Phil Col!lins on the album No Jacket Required");
songs.push("Moondance > by Van Morris&son on the album Moondance");

// Read songs from JSON file
addSongs("songs1.json");

// Click function brings up ViewMusic controls
$("#viewMusic").click(function(){
  event.preventDefault();
  listMusic(true);
});

// Click function brings up Add Music controls
$("#addMusic").click(function(){
  event.preventDefault();
  addMusic();
});

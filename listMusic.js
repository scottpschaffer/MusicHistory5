"use strict";

// Call to add songs from JSON file parameter
function addSongs(youAreEl){
  $.ajax({
    url: youAreEl,
    success: function(data){
      // If reading from JSON successful, add songs to the List
      addSongsToList(data.songs);
      // Display List of Songs
      listMusic();
    },
    // complete notifies when AJAX finished. Used instead of Promise. This is 
    // there because I put "songs" in both JSON files and this prevents them from
    // calling the second "songs" before first is finished reading. 
    complete: function(){},
    error: function(){
      alert("Problem loading file");
    }
  });    
}

// formats each song and adds it to the array of songs
function addSongsToList(songs0){
  for (let i=0; i<songs0.length; i++){
    let tempSong = songs0[i].song + " - by " + songs0[i].artist + " on the album " + songs0[i].album;
    songs.push(tempSong);
  }

}

// This variable is used for preventing the More button in List View
// from clicking more than once  
let stopMoreButton = true;

function listMusic(){
  // Make addDiv hidden by removing "visible" class and adding "hidden" class
  $("#add1").addClass("hidden").removeClass("visible");
  
  // Make viewDiv visible by adding "visible" class and removing "hidden" class
  $("#view1").addClass("visible").removeClass("hidden");

  // For every song in array, edit to remove stray characters (MH2)
  for (let i=0; i<songs.length; i++){
    // For every character in every song in array
    for (let j=0; j<songs[i].length; j++){
      // If character not a letter or number
      if (!((songs[i][j] >= "a") && (songs[i][j] <= "z") || (songs[i][j] >= "A") && (songs[i][j] <= "Z") || (songs[i][j] >= "0") && (songs[i][j] <= "9"))){
        // If ">" then replace with "-"
        if (songs[i][j] === ">"){
          songs[i] = songs[i].replace(">", "-");
        } else if ((songs[i][j] === " ") || (songs[i][j] === "-")){
          // If " " or "-", then skip
          continue;
        } else if ((songs[i][j] == "&") && (songs[i][j-1] === " ") && (songs[i][j+1] === " ")){
          // If "&" is part of title of Guns & Roses (space before and after) then skip
          continue;
        } else {
          // Otherwise replace extraneous character with Null
          songs[i] = songs[i].replace(songs[i][j], "");
        }
      }
    }
  }

  // Clear out existing text
  $("#view1").html("");
  // For every song
  for (let k=0; k<songs.length; k++){
    // Split song to get title
    let songSplit = songs[k].split("-");
    // Print out Song Title and other info
    $("#view1").append(`<article><header class='songTitle' id='art--${k}'>${songSplit[0]}</header> - ${songSplit[1]}<button class='dButton'>Delete</button></article><br>`);
  }
  // Add More button
  $("#view1").append("<div id='buttonDiv'><button id='more'>More</button></div>");
  
  // When More button clicked, check if clicked already. If not add songs from 2nd JSON file
  $("#more").on("click", function(){
    if (stopMoreButton){
    addSongs("songs2.json");
    // if clicked, then set to false so can't click again
    stopMoreButton = false;
    }
  });

  // Get array of dButton elements
  let delButtons = $(".dButton").toArray();
  for (let l=0; l<delButtons.length; l++){
    // Add Click function to every dButton element
    $(delButtons[l]).on("click", function(e){
      // Get id of Article's Header whose dButton was selected and get #
      let idToRemove = $(this.parentNode.firstChild).attr('id').split("--")[1];
      // Remove selected song from array and discard it
      let discardedVariable1 = songs.splice(idToRemove, 1);
      // remove selected Song from DOM
      $(this.parentNode).remove();
      // Repaint with current array of songs
      listMusic();
    });
  }

}


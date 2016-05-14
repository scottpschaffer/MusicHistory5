"use strict";

// Call to add songs from first JSON file
function addSongs(youAreEl){
  $.ajax({
    url: youAreEl,
    success: function(data){
      console.log("data", data.songs);
      addSongsToList(data.songs);
      listMusic();
    },
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

// This variable x is used for preventing the More button in List View
// from clicking more than once  
let stopMoreButton = true;

function listMusic(){
  // Get element of Add Music div
  // let addDiv = document.getElementById("add1");
  $("#add1").addClass("hidden").removeClass("visible");

  // Make addDiv hidden by adding "hidden" class
  // addDiv.classList.add("hidden");
  // Make addDiv hidden by removing "visible" class
  // addDiv.classList.remove("visible");
  
  // Get element of View List div
  // let viewDiv = document.getElementById("view1");
  $("#view1").addClass("visible").removeClass("hidden");
  // Make viewDiv visible by adding "visible" class
  // viewDiv.classList.add("visible");
  // Make viewDiv visible by removing "hidden" class
  // viewDiv.classList.remove("hidden");



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

  // Get div element to write out songs
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
  
  // Add Event Handler
  // let moreButton = document.getElementById("more");

  // When More button clicked, check if clicked already. If not add songs from 2nd JSON file
  $("#more").on("click", function(){
  // moreButton.addEventListener("click", function(){
    if (stopMoreButton){
    addSongs("songs2.json");
    // if clicked, then set to false so can't click again
    stopMoreButton = false;
    }
  });

  // Get array of dButton elements
  let delButtons = $(".dButton").toArray();
  // console.log("delButtons", delButtons);
  for (let l=0; l<delButtons.length; l++){
    // Add Event Listener to every dButton element
    $(delButtons[l]).on("click", function(e){
      // Get id of Article's Header whose dButton was selected and get #
      // console.log("ddd");
      // console.log("this", this.parentNode.firstChild);
      let idToRemove = $(this.parentNode.firstChild).attr('id').split("--")[1];
      // Remove selected song from array and discard it
      let discardedVariable1 = songs.splice(idToRemove, 1);
      // remove selected Song from DOM
      //this.parentNode.parentNode.removeChild(this.parentNode);
      // console.log("this.parentNode", this.parentNode);
      $(this.parentNode).remove();
      // Repaint with current array of songs
      listMusic();
    });
  }

}

var status_emoji = {
    'online': '😀',
    'offline': '😴',
    'coding': '👨‍💻',
    'researching': '👀',
    'documenting': '📝',
    'meeting': '👥'
}

var acc = document.getElementById("accordion");
acc.addEventListener("click", function() {
  /* Toggle between adding and removing the "active" class,
  to highlight the button that controls the panel */
  this.classList.toggle("active");

  /* Toggle between hiding and showing the active panel */
  var panel = this.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
});

//Loads the team members from db?
function loadMember(){

}

/* Function that adds a member and their status on the UI
 * name: string, input for name of the member
 * status: string, status to set, choose from one of the status in icons json
 */
function addMember(name, status){
    var namelist = document.getElementById("name_list");
    var member_elem = document.createElement("LI");
    member_elem.innerHTML = name;
    member_elem.id = "name_" + name;
    namelist.appendChild(member_elem);

    var statuslist = document.getElementById("status_list");
    var status_elem = document.createElement("LI");
    status_elem.innerHTML = status_emoji[status];
    status_elem.id = "status_" + name;
    statuslist.appendChild(status_elem);
}

/* Function that changes the status of a member
 * name: string, the name 
 */
function onStatusChange(name, status){
  var status_elem = document.getElementById("status_" + name);
  if(status_elem != null){
    status_elem.innerHTML = status_emoji[status];
  }
}

addMember("Alan", 'online');
addMember("Chen", 'offline');
addMember("Swapnil", 'coding');
//setTimeout(function() => {onStatusChange("Chen", 'researching');}, 5000);
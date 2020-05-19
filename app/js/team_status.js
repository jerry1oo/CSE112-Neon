var name_list = document.getElementById('name_list');
var status_list = document.getElementById('status_list');
var member_names = new Array();

var icon_path = './assets/icon/';
var icons = {
  'online': 'status_online.png',
  'offline': 'status_offline.png',
  'away': 'status_away.svg',
  'no_disturb': 'status_no_disturb.svg'
}

//Loads the team members from db?
function loadMember(){

}

function addMember(name, status){
  member_names.push(name);
  let id = member_names.length;
  let nameElem = document.createElement('LI');
  nameElem.id = 'n' + id;
  nameElem.innerHTML = name;
  let statusElem = document.createElement('SPAN');
  statusElem.id = 'i' + id;
  statusElem.className = 'icon';

  statusElem.style.background = "url(" + icon_path + icons[status] + ")";

  name_list.appendChild(nameElem);
  status_list.appendChild(statusElem);
}

function onStatusChange(name, status){
  let id = member_names.indexOf(name)+1;
  var statusElem = document.getElementById('i' + id);
  statusElem.style.background = "url(" + icon_path + icons[status] + ")";
}

addMember("Alan", 'online');
addMember("Chen", 'offline');
addMember("Swapnil", 'no_disturb');
setTimeout(onStatusChange("Chen", 'away'), 5000);
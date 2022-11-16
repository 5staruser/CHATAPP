const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementsByClassName("messageinp");
const messagecontainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");
const append = (message, position) => {
  const messageelement = document.createElement("div");
  messageelement.innerText = message;
  messageelement.classList.add("message");
  messageelement.classList.add(position);
  messagecontainer.append(messageelement);
  if (position == "left") {
    audio.play();
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var message = messageInput.value;
  append(`You : ${message}`, "right");
  socket.emit("send", message);
});
const name = prompt("enter your name to join");
socket.emit("newuser-joined", name);
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});
socket.on("recieve", (data) => {
  append(`${data.name}:${data.message}`, "left");
});
socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});

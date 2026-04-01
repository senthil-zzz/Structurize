// Function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = 'login.html'; // Replace 'login.html' with your actual login page URL
}

if (!isLoggedIn()) {
    redirectToLogin();
}
function logOut() {
    // Logout functionality
    localStorage.removeItem('isLoggedIn');
    redirectToLogin();
}

// Function to get or initialize the total time spent from local storage
function getTotalTimeSpent() {
    var totalTimeSpent = localStorage.getItem('totalTimeSpent');
    return totalTimeSpent ? JSON.parse(totalTimeSpent) : { seconds: 0, lastReset: new Date().toDateString() };
}

// Function to update and save the total time spent in local storage
function updateTotalTimeSpent(seconds) {
    var totalTimeSpent = getTotalTimeSpent();
    totalTimeSpent.seconds += Math.round(seconds); // Round to the nearest whole number
    localStorage.setItem('totalTimeSpent', JSON.stringify(totalTimeSpent));
}

// Function to reset the total time spent if a new day has started
function resetTotalTimeSpentIfNewDay() {
    var totalTimeSpent = getTotalTimeSpent();
    var today = new Date().toDateString();

    if (totalTimeSpent.lastReset !== today) {
        totalTimeSpent.seconds = 0;
        totalTimeSpent.lastReset = today;
        localStorage.setItem('totalTimeSpent', JSON.stringify(totalTimeSpent));
    }
}

// Function to format seconds into minutes and seconds
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(seconds / 3600);
    var remainingSeconds = seconds % 60;
    var remainingMinutes = minutes % 3600;
    return hours + " hours, " + remainingMinutes + " minutes, " + remainingSeconds + " seconds";
}

// Display the total time spent on the website
function displayTotalTimeSpent() {
    var totalTimeSpent = getTotalTimeSpent();
    var formattedTime = formatTime(totalTimeSpent.seconds);
    document.getElementById('timeDisplay').innerText = formattedTime;
}

// Capture entry time
var entryTime = new Date().getTime() / 1000; // Convert milliseconds to seconds


// Calculate and save time spent when the user leaves or performs a specific action
function calculateAndSaveTimeSpent() {
    var exitTime = new Date().getTime() / 1000; // Convert milliseconds to seconds
    var timeSpentInSeconds = exitTime - entryTime;

    // Update total time spent and reset if a new day has started
    resetTotalTimeSpentIfNewDay();
    updateTotalTimeSpent(timeSpentInSeconds);

    console.log("Time Spent: " + timeSpentInSeconds + " seconds");

    // Display the total time spent
    displayTotalTimeSpent();
}

// Attach an event listener for when the user leaves or performs a specific action
window.addEventListener('beforeunload', calculateAndSaveTimeSpent);

// Attach an event listener for visibility changes
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        // Page is not visible, pause tracking
        calculateAndSaveTimeSpent();
    } else {
        // Page is visible again, resume tracking
        entryTime = new Date().getTime() / 1000; // Convert milliseconds to seconds
    }
});

// Display the total time spent when the page loads
displayTotalTimeSpent();

const datef = document.getElementById("dateflip");
const dayf = document.getElementById("dayflip");
const monthf = document.getElementById("monthflip");
const yearf = document.getElementById("yearflip");

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const everyMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const todayf = new Date();
console.log(todayf);

datef.innerHTML =(todayf.getDate()<10?"0":"") + todayf.getDate();
dayf.innerHTML = weekDays[todayf.getDay()];
monthf.innerHTML = everyMonth[todayf.getMonth()];
yearf.innerHTML = todayf.getFullYear();

// Load existing todos from localStorage
window.onload = function () {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todo-list');

    savedTodos.forEach(todo => {
        const todoItem = createTodoElement(todo.text, todo.priority);
        todoList.appendChild(todoItem);
    });
};

function addTodo() {
    const todoText = document.getElementById('new-todo').value;
    const priority = document.getElementById('priority').value;

    if (todoText.trim() !== '') {
        const todoList = document.getElementById('todo-list');
        const todoItem = createTodoElement(todoText, priority);
        todoList.appendChild(todoItem);

        document.getElementById('new-todo').value = '';

        saveTodos(); // Save updated todos
    }
}

function createTodoElement(text, priority) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';

    const priorityIcon = document.createElement('span');
    priorityIcon.className = `priority ${priority}`;
    priorityIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';

    const todoTextElement = document.createElement('span');
    todoTextElement.className = 'todo-text';
    todoTextElement.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.style.background = '#3498db';
    deleteButton.style.border = "none";
    deleteButton.style.height = "25px";
    deleteButton.style.width = "25px";
    deleteButton.style.borderRadius = "50%";
    deleteButton.onclick = function () {
        todoItem.remove();
        saveTodos(); // Save updated todos after deletion
    };

    todoItem.appendChild(priorityIcon);
    todoItem.appendChild(todoTextElement);
    todoItem.appendChild(deleteButton);

    return todoItem;
}

function saveTodos() {
    const todoList = document.getElementById('todo-list').children;
    const todos = [];

    for (let i = 0; i < todoList.length; i++) {
        const text = todoList[i].getElementsByClassName('todo-text')[0].textContent;
        const priority = todoList[i].getElementsByClassName('priority')[0].classList[1];
        todos.push({ text, priority });
    }

    localStorage.setItem('todos', JSON.stringify(todos));
}


//main stuff

window.addEventListener("online", function() {
    console.log("I am connected to the internet")
})
  
window.addEventListener("offline", function() {
    this.alert("No Wi-Fi")
    console.log("Disconnected...so sad!!!")
})

// Simulate a loading delay (e.g., 3 seconds) to hide the loading screen.
window.addEventListener('load', function () {
  setTimeout(function () {
      const loadingScreen = document.querySelector('.loading-screen');
      loadingScreen.style.display = 'none';
  }, 3000); // Adjust the time as needed
});

window.addEventListener("scroll",function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky",window.scrollY > 0);

})

function menuToggle(){
  const toggleMenu = document.querySelector('.d-menu');
  toggleMenu.classList.toggle('active')

}

// Get the modal
var set_modal = document.getElementById('settingsModal');

// Function to open the modal
function openSettings() {
  set_modal.style.display = 'block';
}

// Function to close the modal
function closeSettings() {
  set_modal.style.display = 'none';
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
  if (event.target == set_modal) {
    set_modal.style.display = 'none';
  }
}


var changeFont = function(fontstyle) {
  const timeFont = document.getElementById('time');
  const dateFont = document.getElementById('date')
  console.log(fontstyle.value)
  timeFont.style.fontFamily = fontstyle.value;
  dateFont.style.fontFamily = fontstyle.value;
}

function updateClock() {
  const now = new Date();
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const day = now.toLocaleDateString(undefined, { weekday: 'long' });
  const date = now.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

  const timeString = `${hours}:${minutes}`;
  const dateString = `${day}, ${date}`;

  timeElement.textContent = timeString;
  dateElement.textContent = dateString;
}

setInterval(updateClock, 1000);
updateClock();

// Get the modal
var modal = document.getElementById('myModal');

// Function to open the modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

document.getElementById('uploadBtn').addEventListener('click', function () {
    document.getElementById('imageUpload').click();
 });
 
 document.getElementById('imageUpload').addEventListener('change', function () {
  var fr = new FileReader();
 
  fr.onload = function () {
     document.body.style.background = "url('" + fr.result + "') no-repeat center fixed";
  }
  
  fr.readAsDataURL(this.files[0]);
 });

// Get the elements
const textEditor = document.getElementById('text-editor');
const saveButton = document.getElementById('save-button');

// Load the saved text (if available) from localStorage
if (localStorage.getItem('notepadText')) {
  textEditor.value = localStorage.getItem('notepadText');
}

// Event listener for the Save button
saveButton.addEventListener('click', () => {
  const text = textEditor.value;

  // Save the text to localStorage
  localStorage.setItem('notepadText', text);
  
  // Provide feedback to the user
  alert('Text saved successfully!');
});

let timer;
let isRunning = false;
let seconds1 = 0;
let minutes1 = 0;
let hours1 = 0;

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

function updateDisplay() {
    const h = String(hours1).padStart(2, '0');
    const m = String(minutes1).padStart(2, '0');
    const s = String(seconds1).padStart(2, '0'); 
    timerDisplay.textContent = `${h}:${m}:${s}`;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds1++;
            if (seconds1 === 60) {
                seconds1 = 0;
                minutes1++;
                if (minutes1 === 60) {
                    minutes1 = 0;
                    hours1++;
                }
            }
            updateDisplay();
        }, 1000);
    }
});

stopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    seconds1 = 0;
    minutes1 = 0;
    hours1 = 0;
    updateDisplay();
});

const wrapper = document.querySelector(".w-wrapper"),
inputPart = document.querySelector(".input-area"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-area"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
let api;
inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});
locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c2620d220a59299907db04e0f186da8d`;
    fetchData();
}
function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c2620d220a59299907db04e0f186da8d`;
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}
function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}
function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
            wIcon.src = "weather_svg/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "weather_svg/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "weather_svg/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "weather_svg/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "weather_svg/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "weather_svg/rain.svg";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

document.getElementById('imageup').addEventListener('click', function () {
    document.getElementById('imgupdate').click();
 });

document.getElementById('imgupdate').addEventListener('change', function (event) {
    alert("It uses character recognition which can be buggy or fail to understand what the text is saying. So please do not completely rely on this tool.")
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageSrc = e.target.result;
            Tesseract.recognize(
                imageSrc,
                'eng', // Language code (English in this example)
                { logger: info => console.log(info) } // Optional logger
            ).then(({ data: { text } }) => {
                document.getElementById('output').textContent = text;
            });
        };
        reader.readAsDataURL(file);
    }
});

var elements = document.querySelectorAll('.stuff, .card-1, .card-2, .card-3, .card-4, .card-5, .card-6, .card-7');

document.getElementById("switch").addEventListener("change", function() {
    // Check if switch is checked (dark mode enabled)
    if (this.checked) {
        // Change background color to dark mode
        document.body.style.background = "url(imgs/light/light1.jpg) no-repeat center fixed"; // light mode background color
        // Iterate over the elements and set the attribute for each one
        elements.forEach(function(element) {
            element.style.backgroundColor = "#ffffffe2";
        });
    
    } else {
        // Change background color back to default
        document.body.style.background = "url(imgs/dark/bg.png) no-repeat center fixed"; // light mode background color
        // Iterate over the elements and set the attribute for each one
        elements.forEach(function(element) {
            element.style.backgroundColor = "#000000a5";
        });
    }
});


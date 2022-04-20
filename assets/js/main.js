let landingPage = document.querySelector(".landing-page"); // Select Landing Page Element
let settingsBox = document.querySelector(".settings-box"); // Select Settings Box Element
let gearBtn = document.querySelector(".gear-btn"); // Select Settings Box Btn Element
let gearBtnI = document.querySelector(".gear-btn i"); // Select Settings Box Btn Element
let colorLi = document.querySelectorAll(".color-list li"); // Select List Item Element
let randomBackEl = document.querySelectorAll(".random-backround span"); // Select random backround span Element
let backgorundSelect = document.querySelectorAll(".select-background img"); // Select Select backround img
let mainColor = localStorage.getItem("main-color"); // Save localStorage in varibale
let ourSkills = document.querySelector(".our-skills"); // Select Our Skills Element
let allSkills = document.querySelectorAll(".skill-box .skill-progress span"); // Select Our Skills Span
let ourGallery = document.querySelectorAll(".gallery .images-box img"); // Select Our Img on Gallery
let allBullets = document.querySelectorAll(".nav-bullets .bullet"); // Select All Bullets 
let bulletsSpan = document.querySelectorAll(".bullets-option span"); // Select Show And Hide Span 
let bulletsContainer = document.querySelector(".nav-bullets"); // Select Bullets Parent
let restOptions = document.querySelector(".rest-btn"); // Select The Rest Option Button
let toggleMenu = document.querySelector(".header-area .icon"); // Select Btn Toggle Menu
let menu = document.querySelector(".header-area .links"); // Select Links menu

// Get Array Of background Imgs
let imgArray = ["005.jpg", "004.jpg", "003.jpg", "002.jpg", "001.jpg"];

let backgorundOption = true;

let backgorundInterval;

function randomizeImgs() {
  if (backgorundOption) {
    backgorundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      // change background image every 10s
      landingPage.style.backgroundImage =
        'url("assets/image/' + imgArray[randomNumber] + '")';
    }, 10000);
  }
}

randomizeImgs();

gearBtn.onclick = function () {
  // add class fa-spin to i and when it clicked
  gearBtnI.classList.toggle("fa-spin");
  // add class open and remove it from settings box when it clicked
  settingsBox.classList.toggle("open");
};

// Check If main-color on localStorage not equal Null
if (mainColor != null) {
  // Set The main-color from localStorage
  document.documentElement.style.setProperty("--main-color", mainColor);
  // Remove All Class Active From All List Items
  colorLi.forEach((el) => {
    el.classList.remove("active");
    // Add Active Class to li
    if (el.dataset.color == mainColor) {
      el.classList.add("active");
    }
  });
}

// stop random background img (clearInterval)
function stopRandomBgImg() {
  backgorundOption = false;
  clearInterval(backgorundInterval);
}

// Loop On All List Items
colorLi.forEach((li) => {
  // CLick On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root (main-color)
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set The Select Color To Local Storage
    localStorage.setItem("main-color", e.target.dataset.color);
    
    handleActive(e);
  });
});

// Loop On All Imgs on background select
backgorundSelect.forEach((img) => {
  img.addEventListener("click", function (e) {
    // Remove All Class Active From All Imgs on background select
    landingPage.style.backgroundImage =
      'url("assets/image/' + e.target.dataset.img + '")';

    localStorage.setItem("bg-img", e.target.dataset.img);

    stopRandomBgImg();
    handleActive(e);
  });
});

let bgImg = localStorage.getItem("bg-img");

let bgOption = localStorage.getItem("bg-option");

// Check If backgorund img on localStorage not equal Null
if (bgImg != null) {
  // Set The backgorund img from localStorage
  landingPage.style.backgroundImage = 'url("assets/image/' + bgImg + '")';
  // Remove All Class Active From All backgorund img
  backgorundSelect.forEach((el) => {
    el.classList.remove("active");
    // Add Active Class to backgorund img
    if (el.dataset.img == bgImg) {
      el.classList.add("active");
    }
  });

  stopRandomBgImg();
  randomBackEl.forEach((span) => {
    span.classList.remove("active");
    // Add Active Class to backgorund img
    if (span.dataset.background == bgOption) {
      span.classList.add("active");
    }
  });
}

// Loop On All span on random backgorund
randomBackEl.forEach((span) => {
  //  make a event onclick On Every
  span.addEventListener("click", (e) => {
    // Remove All Class Active From All random backgroud span
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    // Add class Active random backgroud span when clicked
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgorundOption = true;
      randomizeImgs();
      // Set The background option to localStorage
      localStorage.setItem("bg-option", e.target.dataset.background);
    } else {
      stopRandomBgImg();
      localStorage.setItem("bg-option", e.target.dataset.background);
    }
  });
});

if (bgOption === "yes") {
  backgorundOption = true;
  randomizeImgs();
} else {
  backgorundOption = false;
}

window.onscroll = function () {
  // Our Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Our Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let skillsWindowHeight = this.innerHeight;
  // Window Scroll Top
  let skillsWindowScrollTop = this.pageYOffset;

  if (
    skillsWindowScrollTop >
    (skillsOffsetTop + skillsOuterHeight - skillsWindowHeight)
  ) {
    allSkills.forEach(span => {
      span.style.width = span.dataset.progress
    })
  }
};

ourGallery.forEach(e => {
  e.addEventListener("click", function () {
    // create overlay Element
    let overLay = document.createElement("div");
    // Add class To overlay
    overLay.className = "popup-overlay";
    // Append overlay To Body
    document.body.appendChild(overLay);
    // create Popup 
    let popupBox = document.createElement("div");
    // Add class to PopupBox
    popupBox.className = "popup-box";
    // Create Img 
    let popupImage = document.createElement("img");
    // Set Image Src 
    popupImage.src = e.src;
    // Append imge to popupBox 
    popupBox.appendChild(popupImage);
    // Append popupBox To The Body
    document.body.appendChild(popupBox);
    // Create a close button 
    let closeBtn = document.createElement("span");
    // Create Text Node for Close Button
    closeBtn.innerHTML = "X";
    // Add Class Name To Close Button
    closeBtn.className = "close-button";
    // Append Close Button to popup Box
    popupBox.appendChild(closeBtn);

    closeBtn.onclick = function () {
      popupBox.remove();
      overLay.remove();
    }
  });
})


allBullets.forEach(bullet => {
  bullet.addEventListener("click", function (e) {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth"
    })
  })
});


// Handle Active state 
function handleActive (event) {
  // Remove Class Active for All ELements 
  event.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    // Add Class Active to element user clicked
    event.target.classList.add("active");
}

let bulletsStorage = localStorage.getItem("bullets-option")

if (bulletsStorage) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  })
  if (bulletsStorage === "show") {
    bulletsContainer.style.right = "0";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.right = "-60px";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach(span => {
  span.addEventListener("click", function(e) {
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.right = "0";
      localStorage.setItem("bullets-option", e.target.dataset.display);
    } else {
      bulletsContainer.style.right = "-60px";
      localStorage.setItem("bullets-option", e.target.dataset.display);
    }
    handleActive(e);
  })
})

restOptions.onclick = function () {
  localStorage.clear();
  window.location.reload();
}

let span = document.querySelector(".landing-page .container .header-area .icon span:nth-child(2)");
console.log(span)

toggleMenu.onclick = function (e) {
  e.stopPropagation();
  menu.classList.toggle("show-links");
  span.classList.toggle("show-span");
}

document.addEventListener("click", e => {
  if (e.target !== toggleMenu && e.target !== menu) {
    if (menu.classList.contains("show-links")) {
      menu.classList.remove("show-links");
    }
    if (span.classList.contains("show-span")) {
      span.classList.remove("show-span");
    }
  }
})
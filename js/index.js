const burgerBt = document.querySelector('.js-burger-button');
const burgerMenu = document.querySelector('.js-burger-menu');


const animationTop = document.querySelector('.js-burger-top');
const animationMiddle = document.querySelector('.js-burger-middle');
const animationBottom = document.querySelector('.js-burger-bottom');

burgerBt.addEventListener('click', openMenu);
burgerMenu.addEventListener('click', openLink);

function openMenu(e) {
    burgerMenu.classList.toggle('active');
    // animation
    animationTop.classList.toggle('animation-top');
    animationMiddle.classList.toggle('animation-mid');
    animationBottom.classList.toggle('animation-bot');

}

function openLink(e) {
    const target = e.target;
    if (target.nodeName !== "A") return;
    burgerMenu.classList.toggle('active');
    // animation
    animationTop.classList.toggle('animation-top');
    animationMiddle.classList.toggle('animation-mid');
    animationBottom.classList.toggle('animation-bot');

}

$(document).ready(function() {
    $('a[href*=#]').bind("click", function(e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1500);
        e.preventDefault();
    });
    return false;
});

// audio player

const nav = document.querySelector('.js-list-audio-player ');
nav.addEventListener('click', handleNavClick);

function handleNavClick(event) {
    event.preventDefault();
    const target = event.target;
    if (target.parentNode.nodeName === "LI" && target.className !== 'timeline js-timeline') {
        setActiveLink(target.parentNode);
    } else {
        return;
    }
}

function setActiveLink(parent) {
    const pButton = parent.querySelector('.js-pButton');
    const timeline = parent.querySelector('.js-timeline');
    const music = parent.querySelector('.js-music');
    const duration = music.duration;

    pButton.addEventListener('click', play(music, pButton));

    timeline.addEventListener("click", function(event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);

    });
}

function clickPercent(event) {
    const target = event.target;
    const playhead = target.firstElementChild;
    const timelineWidth = target.offsetWidth - playhead.offsetWidth;

    return (event.clientX - getPosition(target)) / timelineWidth;
}

function play(music, pButton) {
    music.addEventListener("timeupdate", timeUpdate);

    const currentActiveLink = nav.querySelector(".active");

    let flag = pButton.classList.contains("active");
    if (flag) {
        pButton.classList.remove("active");
        music.pause();
        pButton.classList.toggle('pause');
    } else {
        pButton.classList.add("active");
        music.play();

        pButton.classList.toggle('pause');
    }


    if (currentActiveLink) {
        currentActiveLink.classList.remove("active");

        const parent = currentActiveLink.parentElement;
        const audio = parent.firstElementChild;

        audio.pause();
        audio.currentTime = 0.0;
        currentActiveLink.classList.remove("pause");
        currentActiveLink.classList.add("play");
    }
}


function timeUpdate(event) {
    const target = event.target;
    const trackCurrentTime = target.currentTime;
    const trackDuration = target.duration;

    const parent = target.parentNode;
    const timeline = parent.querySelector('.js-timeline');
    const playhead = parent.querySelector('.js-playhead ');
    const timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    const playButton = parent.querySelector('.js-pButton');

    const playPercent = timelineWidth * (trackCurrentTime / trackDuration);
    playhead.style.marginLeft = playPercent + "px";
    if (trackCurrentTime === trackDuration) {

        // playButton.classList.toggle('pause');
        playButton.classList.remove("pause");
        playButton.classList.add("play");
        playhead.style.marginLeft = 0 + "px";
        // target.pause();
        // target.currentTime = 0.0;
        playButton.classList.remove("active");
        console.log(playButton);

    }
}

function moveplayhead(event) {
    const timeline = event.target;
    const playhead = timeline.firstElementChild;
    const newMargLeft = event.clientX - getPosition(timeline);
    const timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}

function getPosition(el) {
    return el.getBoundingClientRect().left;
}


// gallary

const img = document.querySelector('.js-image-gallary');
const butNext = document.querySelector('.js-but-next');
const butPrev = document.querySelector('.js-but-prev');
const imageArray = ['./img/gallary/1.jpg', './img/gallary/2.jpg', './img/gallary/3.jpg', './img/gallary/4.jpg'];

butNext.addEventListener("click", nextImage);
butPrev.addEventListener("click", prevImage);
let count = 0;
let min = 0;
let max = imageArray.length - 1;
img.src = imageArray[count];

function nextImage() {
    if (count >= min && count < max) {
        count++;
    } else {
        count = 0;
    }
    img.src = imageArray[count];
}

function prevImage() {
    img.src = imageArray[count];
    if (count > min && count <= max) {
        count--;
    } else {
        count = max;
    }
    img.src = imageArray[count];
}
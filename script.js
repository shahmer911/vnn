// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let currentPage = 1;

// Function to create falling hearts
function createHeartsEffect() {
    const container = document.getElementById('hearts-container');
    const heartSize = 100;
    
    // Create multiple hearts that float up from bottom
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('img');
        heart.src = 'heart.gif';
        heart.classList.add('heart');
        heart.style.width = heartSize + 'px';
        heart.style.height = heartSize + 'px';
        
        // Random horizontal position
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = i * 0.05;
        const randomDrift = (Math.random() - 0.5) * 150;
        
        heart.style.left = randomX + 'px';
        heart.style.setProperty('--drift', randomDrift + 'px');
        heart.style.animationDelay = randomDelay + 's';
        
        // Add slight horizontal drift during animation
        heart.style.animation = `floatUp 4s linear ${randomDelay}s forwards`;
        
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 4000 + randomDelay * 1000);
    }
}


// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Logic to move the NO btn
noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
    canAdvance = true;
    
    // Play background music
    const music = document.getElementById("background-music");
    music.volume = 0.25; // Set volume to 25%
    music.play();
});

// Function to switch pages
function goToNextPage() {
    const currentPageEl = document.getElementById(`page-${currentPage}`);
    currentPageEl.classList.add('slide-out');
    
    setTimeout(() => {
        currentPageEl.style.display = 'none';
        currentPageEl.classList.remove('slide-out');
        currentPage++;
        const nextPageEl = document.getElementById(`page-${currentPage}`);
        if (nextPageEl) {
            nextPageEl.style.display = 'block';
            // Force reflow to restart animation
            void nextPageEl.offsetWidth;
            canAdvance = true;
            
            // Trigger hearts effect on page 3
            if (currentPage === 3) {
                createHeartsEffect();
            }
        }
    }, 600);
}

// Handle clicks anywhere to go to next page
let canAdvance = false;
letter.addEventListener('click', (e) => {
    // Don't advance if clicking buttons on page 1
    if (currentPage === 1 && (e.target.classList.contains('btn') || e.target.closest('.buttons'))) {
        return;
    }
    // Don't advance past page 4 (last page)
    if (currentPage === 4) {
        return;
    }
    // Advance to next page if conditions are met
    if (canAdvance) {
        goToNextPage();
    }
});


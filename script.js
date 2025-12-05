
document.addEventListener('DOMContentLoaded', function() {
    // Add 'Made with love' signature
    const signature = document.createElement('div');
    signature.className = 'signature';
    signature.innerHTML = 'Made with ❤️ by Rijan, for Jharna';
    document.body.appendChild(signature);
    
    // Add scroll reveal for sections
    const revealSections = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    };
    
    // Initial check
    revealSections();
    
    // Check on scroll
    window.addEventListener('scroll', revealSections);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Add a subtle pulse effect on the target section
                targetElement.style.animation = 'pulse 2s ease';
                setTimeout(() => {
                    targetElement.style.animation = '';
                }, 2000);
            }
        });
    });
    // Music Toggle
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = musicToggle.querySelector('i');
    const musicText = musicToggle.querySelector('span');
    let isMusicPlaying = false;
    let hasInteracted = false;

    // Set volume
    bgMusic.volume = 0.3;
    
    // Play music function with better error handling
    const playMusic = () => {
        if (isMusicPlaying) return;
        
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isMusicPlaying = true;
                    musicIcon.className = 'fas fa-volume-up';
                    musicText.textContent = 'Music: ON';
                    hasInteracted = true;
                })
                .catch(error => {
                    console.log("Playback failed:", error);
                    musicText.textContent = "Click to enable music";
                });
        }
    };

    // Toggle music on button click
    musicToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isMusicPlaying) {
            bgMusic.pause();
            musicIcon.className = 'fas fa-volume-mute';
            musicText.textContent = 'Music: OFF';
            document.getElementById('nowPlaying').classList.remove('show');
        } else {
            playMusic();
            document.getElementById('nowPlaying').classList.add('show');
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Try to start music on first user interaction
    const startMusicOnInteraction = () => {
        if (!hasInteracted) {
            hasInteracted = true;
            playMusic();
            document.removeEventListener('click', startMusicOnInteraction);
            document.removeEventListener('keydown', startMusicOnInteraction);
        }
    };
    
    // Add interaction listeners
    const startInteractionHandler = () => {
        startMusicOnInteraction();
        document.getElementById('nowPlaying').classList.add('show');
    };
    
    document.addEventListener('click', startInteractionHandler, { once: true });
    document.addEventListener('keydown', startInteractionHandler, { once: true });

    // Create floating hearts with romantic theme
    function createHearts() {
        const container = document.getElementById('floatingHeartsContainer');
        if (!container) return;

        const heartIcons = ['❤️', '💖', '💕', '💓', '💗', '💘', 'R', 'J', '♥'];
        const colors = [
            'rgba(255, 182, 193, 0.9)',  // Light Pink
            'rgba(255, 143, 171, 0.9)',  // Pink
            'rgba(255, 107, 158, 0.9)',  // Dark Pink
            'rgba(255, 192, 203, 0.9)',  // Pastel Pink
            'rgba(255, 209, 220, 0.9)'   // Lightest Pink
        ];
        
        // Add subtle background hearts
        for (let i = 0; i < 3; i++) {
            const bgHeart = document.createElement('div');
            bgHeart.className = 'bg-heart';
            bgHeart.style.left = `${Math.random() * 100}%`;
            bgHeart.style.top = `${Math.random() * 100}%`;
            bgHeart.style.opacity = Math.random() * 0.1 + 0.05;
            bgHeart.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`;
            bgHeart.textContent = ['R', 'J', '♥'][i % 3];
            container.appendChild(bgHeart);
        }

        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            
            // Random properties
            const size = Math.random() * 30 + 15; // 15px to 45px
            const startX = Math.random() * 100;   // Random horizontal position
            const duration = 8 + Math.random() * 10; // 8-18 seconds
            const delay = Math.random() * 5;      // Stagger the animation start
            const opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
            const color = colors[Math.floor(Math.random() * colors.length)];
            const icon = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            
            // Apply styles
            heart.innerHTML = icon;
            heart.style.left = `${startX}%`;
            heart.style.fontSize = `${size}px`;
            heart.style.opacity = opacity;
            heart.style.color = color;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            
            // Random slight horizontal movement
            const drift = (Math.random() - 0.5) * 20; // -10px to 10px
            heart.style.setProperty('--drift', `${drift}px`);
            
            container.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                if (heart.parentNode === container) {
                    container.removeChild(heart);
                }
            }, (duration + delay) * 1000);
        }

        // Create initial hearts
        for (let i = 0; i < 10; i++) {
            setTimeout(createHeart, i * 300); // Stagger the creation
        }

        // Continue creating hearts
        setInterval(createHeart, 1000); // New heart every second
    }

    // Initialize timeline
    function initTimeline() {
        const timelineContainer = document.querySelector('.timeline-container');
        
        // Timeline data with your special moments
        const timelineData = [
            {
                date: 'June 27, 2021',
                title: 'The Day We Met',
                description: 'At exactly 8:59 PM, our beautiful journey began. That moment changed everything.'
            },
            {
                date: 'November 12, 2006',
                title: 'Your Birthday',
                description: 'The day the world became brighter with your arrival. Celebrating you today and always.'
            },
            {
                date: 'Special Moments',
                title: 'Our Memories Together',
                description: 'Every moment with you is a treasure. Looking forward to creating countless more memories together.'
            },
            {
                date: 'Today',
                title: 'Celebrating Us',
                description: 'Every day with you is a gift. Here\'s to many more years of love and happiness together.'
            }
        ];

        // Create timeline items
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
            
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });

        // Animate timeline items on scroll
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => observer.observe(item));
    }

    // Initialize gallery
    function initGallery() {
        const galleryContainer = document.querySelector('.gallery-container');
        
        // Personal gallery images (1.jpg to 26.jpg)
        const galleryData = [];
        for (let i = 1; i <= 26; i++) {
            galleryData.push({
                src: `${i}.jpg`,
                alt: `Our Special Moment ${i}`
            });
        }
        
        // Create gallery items
        galleryData.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.alt}">
                <div class="gallery-caption">${item.alt}</div>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Initialize message cards
    function initMessages() {
        const messageContainer = document.querySelector('.message-container');
        
        // Sample messages - add your own heartfelt messages
        const messages = [
            "You make every day brighter just by being in it.",
            "Your smile is my favorite thing in the world.",
            "I'm so grateful to have you in my life.",
            "You're more beautiful than you'll ever know.",
            "My love for you grows stronger every day.",
            "You're my favorite person in the entire world.",
            "Thank you for being you.",
            "I fall in love with you more every day."
        ];
        
        // Create message cards
        messages.forEach((message, index) => {
            if (index === 0) return; // Skip the first one as it's already in HTML
            
            const messageCard = document.createElement('div');
            messageCard.className = 'message-card';
            messageCard.dataset.message = message;
            
            messageCard.innerHTML = `
                <div class="message-content">
                    <i class="fas fa-heart"></i>
                    <p>Click to reveal a message</p>
                </div>
            `;
            
            messageContainer.appendChild(messageCard);
        });
        
        // Add click event to message cards
        const messageCards = document.querySelectorAll('.message-card');
        messageCards.forEach(card => {
            card.addEventListener('click', function() {
                const message = this.dataset.message;
                this.innerHTML = `
                    <div class="message-content">
                        <i class="fas fa-heart"></i>
                        <p>${message}</p>
                    </div>
                `;
                this.classList.add('revealed');
                
                // Small confetti effect when revealing a message
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff6b9e', '#ff8fab', '#ffd166']
                });
            });
        });
    }

    // Initialize countdown
    function initCountdown() {
        // Set the date we're counting down to (November 12, 2006)
        const now = new Date();
        const currentYear = now.getFullYear();
        let birthday = new Date(currentYear, 10, 12); // Month is 0-indexed (10 = November)
        
        // If birthday has already passed this year, set it to next year
        if (now > birthday) {
            birthday = new Date(currentYear + 1, 10, 12);
        }
        
        // Set to midnight
        birthday.setHours(0, 0, 0, 0);
        
        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = birthday - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
            
            // If the countdown is finished
            if (distance < 0) {
                clearInterval(countdown);
                document.getElementById('countdown').innerHTML = `
                    <h2>Happy Birthday, My Love! 🎉</h2>
                    <p>Wishing you the most wonderful day filled with love and happiness!</p>
                `;
            }
        }, 1000);
    }

    // Initialize heart catcher game
    function initHeartCatcher() {
        const gameContainer = document.getElementById('heart-catcher');
        const basket = document.getElementById('basket');
        const scoreElement = document.getElementById('score');
        
        let score = 0;
        let isGameRunning = false;
        let gameInterval;
        let basketX = gameContainer.offsetWidth / 2 - basket.offsetWidth / 2;
        
        // Position basket
        basket.style.left = basketX + 'px';
        
        // Move basket with mouse
        gameContainer.addEventListener('mousemove', (e) => {
            if (!isGameRunning) return;
            
            const containerRect = gameContainer.getBoundingClientRect();
            let newX = e.clientX - containerRect.left - basket.offsetWidth / 2;
            
            // Keep basket within container bounds
            newX = Math.max(0, Math.min(newX, containerRect.width - basket.offsetWidth));
            
            basket.style.left = newX + 'px';
            basketX = newX;
        });
        
        // Touch support for mobile
        gameContainer.addEventListener('touchmove', (e) => {
            if (!isGameRunning) return;
            e.preventDefault();
            
            const containerRect = gameContainer.getBoundingClientRect();
            let newX = e.touches[0].clientX - containerRect.left - basket.offsetWidth / 2;
            
            // Keep basket within container bounds
            newX = Math.max(0, Math.min(newX, containerRect.width - basket.offsetWidth));
            
            basket.style.left = newX + 'px';
            basketX = newX;
        }, { passive: false });
        
        // Create falling hearts
        function createHeart() {
            if (!isGameRunning) return;
            
            const heart = document.createElement('div');
            heart.className = 'heart-emoji';
            heart.innerHTML = '❤️';
            
            const size = Math.random() * 30 + 20; // Random size between 20-50px
            const posX = Math.random() * (gameContainer.offsetWidth - size);
            const duration = Math.random() * 3 + 2; // Random duration between 2-5s
            
            heart.style.left = posX + 'px';
            heart.style.fontSize = size + 'px';
            heart.style.animationDuration = duration + 's';
            
            gameContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode === gameContainer) {
                    gameContainer.removeChild(heart);
                }
            }, duration * 1000);
            
            // Check for collision
            const checkCollision = setInterval(() => {
                if (!heart.parentNode) {
                    clearInterval(checkCollision);
                    return;
                }
                
                const heartRect = heart.getBoundingClientRect();
                const basketRect = basket.getBoundingClientRect();
                
                if (
                    heartRect.bottom >= basketRect.top &&
                    heartRect.top <= basketRect.bottom &&
                    heartRect.right >= basketRect.left &&
                    heartRect.left <= basketRect.right
                ) {
                    // Collision detected!
                    heart.remove();
                    clearInterval(checkCollision);
                    
                    // Increase score
                    score += 10;
                    scoreElement.textContent = `Score: ${score}`;
                    
                    // Small confetti effect
                    confetti({
                        particleCount: 20,
                        spread: 50,
                        origin: { y: 0.8 },
                        colors: ['#ff6b9e']
                    });
                }
            }, 20);
        }
        
        // Start game when clicking the game container
        gameContainer.addEventListener('click', () => {
            if (!isGameRunning) {
                isGameRunning = true;
                score = 0;
                scoreElement.textContent = 'Score: 0';
                gameInterval = setInterval(createHeart, 800); // Create a new heart every 800ms
                
                // Auto-stop game after 30 seconds
                setTimeout(() => {
                    isGameRunning = false;
                    clearInterval(gameInterval);
                    
                    // Show final score with confetti
                    setTimeout(() => {
                        scoreElement.textContent = `Final Score: ${score}`;
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#ff6b9e', '#ff8fab', '#ffd166']
                        });
                    }, 1000);
                }, 30000);
            }
        });
    }

    // Initialize surprise button
    function initSurprise() {
        const surpriseBtn = document.getElementById('surpriseBtn');
        
        surpriseBtn.addEventListener('click', () => {
            // Create a grand confetti effect
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }
            
            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                
                const particleCount = 50 * (timeLeft / duration);
                
                // Since particles fall down, start a bit higher than random
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#ff6b9e', '#ff8fab', '#ffd166', '#ff6b6b', '#ff9e7d']
                });
                
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#ff6b9e', '#ff8fab', '#ffd166', '#ff6b6b', '#ff9e7d']
                });
            }, 250);
            
            // Show a sweet message
            const surpriseContent = document.querySelector('.surprise-content');
            surpriseContent.innerHTML = `
                <h2>I Love You! ❤️</h2>
                <p>Thank you for being the most amazing person in my life.</p>
                <p>Happy Birthday, my love!</p>
                <button id="replayBtn" class="cta-button">Watch Again</button>
            `;
            
            // Add event listener to the new button
            document.getElementById('replayBtn').addEventListener('click', () => {
                location.reload();
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to explore button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Initialize all components
    createHearts();
    initTimeline();
    initGallery();
    initMessages();
    initCountdown();
    initHeartCatcher();
    initSurprise();
    
    // Add a small delay before showing the first animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
// Architectural Editorial Interactivity for MN (MY NIVAS)

const leadModal = document.getElementById('leadModal');
const demoForm = document.getElementById('demoForm');
const successMessage = document.getElementById('successMessage');
const mainNav = document.getElementById('mainNav');
const horizontalScroll = document.querySelector('.horizontal-scroll-container');
const horizontalTrack = document.querySelector('.horizontal-track');
const scrollProgress = document.getElementById('scrollProgress');

let lastScrollY = window.scrollY;

// Modal Logic: Elite Slide Transition
function toggleModal(show) {
    const modalInner = leadModal.querySelector('.relative.bg-base-cream');
    if (show) {
        leadModal.classList.remove('pointer-events-none');
        leadModal.classList.add('opacity-100');
        modalInner.classList.remove('translate-x-full');
        modalInner.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    } else {
        modalInner.classList.add('translate-x-full');
        modalInner.classList.remove('translate-x-0');
        setTimeout(() => {
            leadModal.classList.add('pointer-events-none');
            leadModal.classList.remove('opacity-100');
            document.body.style.overflow = '';
            
            // Graceful reset
            successMessage.classList.add('hidden');
            demoForm.classList.remove('hidden');
            demoForm.reset();
        }, 700);
    }
}

window.toggleModal = toggleModal;

// Close on escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleModal(false);
});

// Editorial Form Submission
demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = demoForm.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'TRANSMITTING SIGNAL...';
    
    // Aesthetic delay for "Architectural" pace
    setTimeout(() => {
        demoForm.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        setTimeout(() => {
            toggleModal(false);
            btn.disabled = false;
            btn.innerText = 'Transmit Signal';
        }, 3000);
    }, 2000);
});

// Staggered Scroll Reveal: Architectural Pace
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-fade-up');
                entry.target.style.opacity = '1';
                revealObserver.unobserve(entry.target);
            }, index * 150);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Target sections and editorial elements
document.querySelectorAll('section, h1, .label-bold, .editorial-card, h2').forEach((el) => {
    el.style.opacity = '0'; // Initial state
    revealObserver.observe(el);
});

// Subtle Hero Drifting Logic
const heroImage = document.querySelector('header img');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrolled * 0.15}px) scale(${1 + scrolled * 0.0002})`;
        
        // Navbar Hide/Show
        if (scrolled > lastScrollY && scrolled > 100) {
            mainNav.style.transform = 'translateY(-100%)';
        } else {
            mainNav.style.transform = 'translateY(0)';
        }
        lastScrollY = scrolled;

        // Horizontal Scroll Narrative Logic
        if (horizontalScroll && horizontalTrack) {
            const rect = horizontalScroll.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // If the section is currently in view (sticky)
            if (rect.top <= 0 && rect.bottom >= viewHeight) {
                const totalScrollableHeight = rect.height - viewHeight;
                const progress = Math.abs(rect.top) / totalScrollableHeight;
                
                // Calculate horizontal translation
                const trackWidth = horizontalTrack.scrollWidth;
                const viewWidth = window.innerWidth;
                const maxTranslate = trackWidth - viewWidth;
                
                const translateX = progress * maxTranslate;
                horizontalTrack.style.transform = `translateX(-${translateX}px)`;
                
                // Update Progress bar
                if (scrollProgress) {
                    scrollProgress.style.width = `${progress * 100}%`;
                }
            }
        }

        // Atmospheric Echo Parallax - REMOVED for Quiet Authority
        
        // Quiet Authority / Modernist Reveal
        document.querySelectorAll('.scroll-reveal-line, .scroll-reveal-whisper, .scroll-reveal-tension').forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.9) {
                el.classList.add('active');
            }
        });
    });
}

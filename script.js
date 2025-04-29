// تنشيط القائمة المتنقلة للهواتف
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// تغيير شريط التنقل عند التمرير
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// تنعيم التمرير للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// تحميل الصفحة
window.addEventListener('load', function() {
    // يمكنك إضافة تأثيرات ظهور عند تحميل الصفحة هنا
    document.body.classList.add('loaded');
});

// تنشيط القائمة المتنقلة للهواتف
document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
});

// تغيير شريط التنقل عند التمرير
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // إضافة تأثير الظهور التدريجي للأقسام
    animateSections();
});

// تنعيم التمرير للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        
        // إغلاق القائمة إذا كانت مفتوحة (للموبايل)
        if (document.querySelector('.nav-links').classList.contains('active')) {
            document.querySelector('.menu-toggle').classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// تحميل الصفحة
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // تأثير كتابة النص في قسم Hero
    const heroTitle = document.querySelector('.hero-content h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 100);
    
    // تهيئة معرض الأعمال
    initPortfolio();
});

// تأثير الظهور التدريجي للأقسام
function animateSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// معرض الأعمال مع Lightbox
function initPortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const imgSrc = this.querySelector('img').src;
                const title = this.querySelector('h3').textContent;
                
                // إنشاء Lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close">&times;</span>
                        <img src="${imgSrc}" alt="${title}">
                        <h3>${title}</h3>
                        <a href="#contact" class="btn">تواصل معي</a>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                // إغلاق Lightbox
                lightbox.querySelector('.close').addEventListener('click', () => {
                    lightbox.remove();
                });
                
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        lightbox.remove();
                    }
                });
            }
        });
    });
}

// نموذج الاتصال مع التحقق
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        if (!name || !email || !message) {
            alert('الرجاء ملء جميع الحقول');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('الرجاء إدخال بريد إلكتروني صحيح');
            return;
        }
        
        // هنا يمكنك إضافة كود إرسال النموذج
        alert('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.');
        this.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// زر العودة إلى الأعلى
const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// تأثير تحميل أشرطة المهارات عند ظهور القسم
function animateSkills() {
    const skillsSection = document.querySelector('.skills-section');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

window.addEventListener('load', animateSkills);


// زر تبديل الوضع الليلي
const toggleBtn = document.querySelector('.theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});


// في ملف script.js
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

window.addEventListener('load', setActiveNavLink);

// في ملف script.js
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-box, .portfolio-item, .about-content, .contact-info');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

window.addEventListener('load', animateOnScroll);

// تأثير عد الإحصائيات
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-count');
                const count = +entry.target.textContent;
                const increment = target / 100;
                
                if (count < target) {
                    entry.target.textContent = Math.ceil(count + increment);
                    setTimeout(animateStats, 10);
                } else {
                    entry.target.textContent = target;
                }
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => {
        observer.observe(item);
    });
}

window.addEventListener('load', animateStats);



// تسجيل Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}



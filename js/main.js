document.addEventListener('DOMContentLoaded', function() {
    // AOS 初始化
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });

    // 粒子背景初始化
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4f46e5"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4f46e5",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // 主題切換功能
    const themeToggle = document.querySelector('.theme-toggle');
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';
    
    // 檢查本地儲存的主題設定
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
    });
    
    // 移動導航欄控制
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        menuToggle.innerHTML = isOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });
    
    // 點擊導航連結時收起菜單
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // 滾動功能:導航欄顏色變化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 平滑滾動功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 郵件模態窗口控制
    const modal = document.getElementById("email-modal");
    const emailBtn = document.getElementById("email-btn");
    const closeBtn = document.querySelector(".close-modal");
    const contactForm = document.getElementById("contact-form");
    const modalContent = document.querySelector(".modal-content");
    
    // 打開模態窗口
    emailBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // 防止背景滾動
    });
    
    // 關閉模態窗口
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // 恢復背景滾動
    });
    
    // 只在點擊模態窗口背景時關閉，而非滑鼠移動
    modal.addEventListener("mousedown", function(e) {
        // 只有當點擊區域為模態窗口背景(不是內容區)才關閉
        if (e.target === modal && !modalContent.contains(e.target)) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    // 防止在模態窗口內點擊時關閉
    modalContent.addEventListener("click", function(e) {
        e.stopPropagation(); // 阻止事件冒泡
    });
    
    // 處理表單提交
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        
        // 創建mailto鏈接
        const mailtoLink = `mailto:jaydenchao@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`來自: ${name} (${email})\n\n${message}`)}`;
        
        // 打開郵件客戶端
        window.open(mailtoLink, "_blank");
        
        // 關閉模態窗口
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        
        // 清除表單
        contactForm.reset();
    });
    
    // 打字效果
    const typingText = document.querySelector('.typing-text');
    if(typingText) {
        const phrases = ["軟體開發者", "程式設計師", "技術愛好者", "前端開發者", "全端工程師"];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let isPaused = false;
        let typingSpeed = 100;
        
        function typeWriter() {
            const currentText = phrases[currentPhrase];
            
            if (isDeleting) {
                // 刪除文字
                typingText.textContent = currentText.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50;
            } else {
                // 輸入文字
                typingText.textContent = currentText.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100;
            }
            
            // 完成輸入當前短語
            if (!isDeleting && currentChar === currentText.length) {
                isDeleting = true;
                isPaused = true;
                typingSpeed = 1500; // 完成後暫停
            }
            
            // 完成刪除當前短語
            if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                isPaused = false;
            }
            
            // 繼續打字動畫
            setTimeout(typeWriter, typingSpeed);
        }
        
        // 開始打字效果
        setTimeout(typeWriter, 500);
    }
});
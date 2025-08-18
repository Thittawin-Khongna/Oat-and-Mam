    // ...existing code...
    // Set the date we're counting down to
    const countDownDate = new Date("Nov 3, 2025 09:00:00").getTime();

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display result
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
    // ...existing code...
    const track = document.querySelector(".carousel-track");
    let slides = Array.from(track.children);
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".carousel-dots");

    const visible = 1; // เปลี่ยนจำนวนรูปที่โชว์เป็น 1
    let total = slides.length;
    let index = visible; // เริ่มที่ index 1

    // ✅ Clone รูปหน้า-หลัง
    const cloneFirst = slides.slice(0, visible).map(slide => slide.cloneNode(true));
    const cloneLast = slides.slice(-visible).map(slide => slide.cloneNode(true));

    cloneFirst.forEach(clone => track.appendChild(clone));
    cloneLast.forEach(clone => track.insertBefore(clone, slides[0]));

    slides = Array.from(track.children);

    // ✅ สร้าง dot ตามจำนวนรูปจริง (ไม่รวม clone)
    for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
    }
    const dots = Array.from(document.querySelectorAll(".dot"));

    // กำหนดตำแหน่งเริ่มต้น
    track.style.transform = `translateX(-${index * (100 / visible)}%)`;

    function updateDots() {
    let activeIndex = (index - visible + total) % total;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[activeIndex].classList.add("active");
    }

    function moveTo(newIndex) {
    index = newIndex;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * (100 / visible)}%)`;
    updateDots();
    }

    // ✅ Loop transition
    track.addEventListener("transitionend", () => {
    if (index >= slides.length - visible) {
        index = visible;
        track.style.transition = "none";
        track.style.transform = `translateX(-${index * (100 / visible)}%)`;
    }
    if (index < visible) {
        index = slides.length - visible * 2;
        track.style.transition = "none";
        track.style.transform = `translateX(-${index * (100 / visible)}%)`;
    }
    });

    // ปุ่ม Next / Prev
    nextBtn.addEventListener("click", () => moveTo(index + 1));
    prevBtn.addEventListener("click", () => moveTo(index - 1));

    // ✅ คลิก dot เลื่อนตำแหน่ง
    dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        moveTo(i + visible);
    });
    });

    // Auto Play
    setInterval(() => {
    moveTo(index + 1);
    }, 5000);

    document.addEventListener("DOMContentLoaded", function() {
        const fadeElements = document.querySelectorAll('.fade-in');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    });
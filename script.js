/* =====================================================
   DAMAR PERSONAL WEBSITE
   ADVANCED JAVASCRIPT
===================================================== */


/* =====================================================
   1. LOADING SCREEN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-loaded");

    setTimeout(() => {
        const loader = document.querySelector(".loader");

        if (loader) {
            loader.classList.add("hide");
        }
    }, 900);

});


/* =====================================================
   2. FOTO PROFIL
===================================================== */

const photoInput =
    document.getElementById("photoInput");

const profileImage =
    document.getElementById("profileImage");

const placeholder =
    document.getElementById("photoPlaceholder");


function loadProfilePhoto() {

    const savedPhoto =
        localStorage.getItem("damarProfilePhoto");

    if (savedPhoto && profileImage) {

        profileImage.src = savedPhoto;

        profileImage.style.display = "block";

        if (placeholder) {
            placeholder.style.display = "none";
        }

    }

}


loadProfilePhoto();


if (photoInput) {

    photoInput.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) return;


            /* Batasi ukuran foto */

            if (file.size > 5 * 1024 * 1024) {

                showToast(
                    "Foto terlalu besar. Maksimal 5MB."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function (event) {

                const imageData =
                    event.target.result;


                profileImage.src =
                    imageData;

                profileImage.style.display =
                    "block";


                if (placeholder) {
                    placeholder.style.display =
                        "none";
                }


                localStorage.setItem(
                    "damarProfilePhoto",
                    imageData
                );


                showToast(
                    "📸 Foto berhasil disimpan!"
                );

            };


            reader.readAsDataURL(file);

        }
    );

}


/* =====================================================
   3. SMOOTH SCROLL
===================================================== */

function scrollToSection(id) {

    const element =
        document.getElementById(id);

    if (!element) return;


    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   4. SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section, .glass-card, .info-card, .code-card, .project-card"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =====================================================
   5. SKILL BAR ANIMATION
===================================================== */

const skillBars =
    document.querySelectorAll(".bar div");


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const width =
                        entry.target.style.width;

                    entry.target.style.width =
                        "0%";


                    setTimeout(() => {

                        entry.target.style.width =
                            width;

                    }, 150);


                    skillObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.4
        }
    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =====================================================
   6. RIPPLE EFFECT
===================================================== */

document.addEventListener(
    "pointerdown",
    function (event) {

        const ripple =
            document.createElement("span");


        ripple.className =
            "click-ripple";


        ripple.style.left =
            event.clientX + "px";

        ripple.style.top =
            event.clientY + "px";


        document.body.appendChild(
            ripple
        );


        setTimeout(() => {

            ripple.remove();

        }, 650);

    }
);


/* =====================================================
   7. CARD PRESS EFFECT
===================================================== */

document.querySelectorAll(
    ".click-effect, .neon-button, .code-card, .project-card"
).forEach(element => {

    element.addEventListener(
        "pointerdown",
        () => {

            element.classList.add(
                "pressed"
            );

        }
    );


    element.addEventListener(
        "pointerup",
        () => {

            element.classList.remove(
                "pressed"
            );

        }
    );


    element.addEventListener(
        "pointercancel",
        () => {

            element.classList.remove(
                "pressed"
            );

        }
    );

});


/* =====================================================
   8. TOAST NOTIFICATION
===================================================== */

function showToast(message) {

    let toast =
        document.querySelector(".toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "toast-show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "toast-show"
            );

        }, 2500);

}


/* =====================================================
   9. PROJECT MESSAGE
===================================================== */

function showMessage() {

    showToast(
        "🚀 GACOR BOS QU!"
    );

}


/* =====================================================
   10. TYPING EFFECT
===================================================== */

const typingElement =
    document.querySelector(".small-title");


if (typingElement) {

    const originalText =
        typingElement.textContent.trim();


    let typingIndex = 0;

    typingElement.textContent = "";


    function typeText() {

        if (
            typingIndex <
            originalText.length
        ) {

            typingElement.textContent +=
                originalText.charAt(
                    typingIndex
                );

            typingIndex++;

            setTimeout(
                typeText,
                70
            );

        }

    }


    setTimeout(
        typeText,
        500
    );

}


/* =====================================================
   11. BACK TO TOP
===================================================== */

const topButton =
    document.createElement("button");


topButton.className =
    "back-top";

topButton.innerHTML =
    "↑";


topButton.setAttribute(
    "aria-label",
    "Kembali ke atas"
);


document.body.appendChild(
    topButton
);


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            topButton.classList.add(
                "active"
            );

        } else {

            topButton.classList.remove(
                "active"
            );

        }

    }
);


topButton.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   12. NAVBAR ACTIVE
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);


/* =====================================================
   13. NEON PARTICLES
===================================================== */

const particleContainer =
    document.createElement("div");


particleContainer.className =
    "particles";


document.body.appendChild(
    particleContainer
);


const particleCount =
    window.innerWidth < 600
        ? 18
        : 35;


for (
    let i = 0;
    i < particleCount;
    i++
) {

    const particle =
        document.createElement("span");


    particle.className =
        "particle";


    const size =
        Math.random() * 4 + 1;


    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        Math.random() * 100 + "%";


    particle.style.animationDuration =
        Math.random() * 8 + 5 + "s";


    particle.style.animationDelay =
        Math.random() * 5 + "s";


    particleContainer.appendChild(
        particle
    );

}


/* =====================================================
   14. TOUCH NEON
===================================================== */

document.addEventListener(
    "pointermove",
    function (event) {

        if (
            window.innerWidth < 700
        ) return;


        document.documentElement.style.setProperty(
            "--mouse-x",
            event.clientX + "px"
        );


        document.documentElement.style.setProperty(
            "--mouse-y",
            event.clientY + "px"
        );

    }
);


/* =====================================================
   15. 3D CARD EFFECT
===================================================== */

if (window.innerWidth > 700) {

    document.querySelectorAll(
        ".info-card, .code-card, .project-card"
    ).forEach(card => {

        card.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) /
                    18;


                const rotateY =
                    (centerX - x) /
                    18;


                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =====================================================
   16. ONLINE STATUS
===================================================== */

window.addEventListener(
    "online",
    () => {

        showToast(
            "🟢 Kamu kembali online!"
        );

    }
);


window.addEventListener(
    "offline",
    () => {

        showToast(
            "🔴 Kamu sedang offline."
        );

    }
);


/* =====================================================
   17. KEYBOARD SHORTCUT
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Home"
        ) {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }
);
document.addEventListener("DOMContentLoaded", () => {
    // Handle loading screen
    const loadingScreen = document.querySelector(".loading-screen")

    // Function to hide loading screen
    const hideLoadingScreen = () => {
        loadingScreen.classList.add("hidden")
    }

    // Hide loading screen when page is fully loaded

    // Fallback: Hide loading screen after 2.5 seconds if load event doesn't fire
    setTimeout(hideLoadingScreen, 2500)

    // Import AOS library
    const AOS = window.AOS

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: "ease",
        once: true,
        offset: 100,
    })

    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenuClose = document.querySelector(".mobile-menu-close")
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active")
        document.body.style.overflow = "hidden"
    })

    mobileMenuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        document.body.style.overflow = ""
    })

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active")
            document.body.style.overflow = ""
        })
    })

    // Sticky header
    const header = document.querySelector(".header")
    let scrollPosition = window.scrollY

    window.addEventListener("scroll", () => {
        scrollPosition = window.scrollY

        if (scrollPosition > 50) {
            header.style.background = "rgba(0, 0, 0, 0.9)"
            header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)"
        } else {
            header.style.background = "rgba(0, 0, 0, 0.8)"
            header.style.boxShadow = "none"
        }
    })

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")

    function setActiveLink() {
        let current = ""

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100
            const sectionHeight = section.offsetHeight

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id")
            }
        })

        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active")
            }
        })
    }

    window.addEventListener("scroll", setActiveLink)
    window.addEventListener("load", setActiveLink)

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            if (targetId === "#") return

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                const headerHeight = document.querySelector(".header").offsetHeight
                const targetPosition = targetElement.offsetTop - headerHeight

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                })
            }
        })
    })

    // Portfolio item hover effect for touch devices
    const portfolioItems = document.querySelectorAll(".portfolio-item")

    portfolioItems.forEach((item) => {
        item.addEventListener("touchstart", function () {
            portfolioItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.querySelector(".portfolio-overlay").style.opacity = "0"
                }
            })

            const overlay = this.querySelector(".portfolio-overlay")
            overlay.style.opacity = overlay.style.opacity === "1" ? "0" : "1"
        })
    })

    // Parallax effect for blobs
    window.addEventListener("mousemove", (e) => {
        const blobs = document.querySelectorAll(".blob")
        const mouseX = e.clientX / window.innerWidth
        const mouseY = e.clientY / window.innerHeight

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20
            const x = (mouseX - 0.5) * speed
            const y = (mouseY - 0.5) * speed

            blob.style.transform = `translate(${x}px, ${y}px) scale(1)`
        })
    })

    // Initialize AOS on thank-you page
    if (window.location.pathname.includes("thank-you")) {
        AOS.init({
            duration: 800,
            easing: "ease",
            once: false,
            offset: 100,
        })

        // Set current year in footer for thank-you page
        if (document.getElementById("current-year")) {
            document.getElementById("current-year").textContent = new Date().getFullYear()
        }
    }
})

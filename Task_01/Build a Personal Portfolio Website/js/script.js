const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    let isAutoScrolling = true; // Flag to toggle auto-scrolling
    let maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    let scrollAmount = 0;

    // Function to auto-scroll the slider
    const autoScroll = () => {
        if (isAutoScrolling) {
            scrollAmount += 2; // Adjust speed of scrolling here
            if (scrollAmount >= maxScrollLeft) {
                scrollAmount = 0; // Reset to start when reaching the end
            }
            imageList.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    let autoScrollInterval = setInterval(autoScroll, 20); // Adjust the interval to control smoothness

    // Handle manual scrolling with scrollbar thumb
    scrollbarThumb.addEventListener("mousedown", (e) => {
        isAutoScrolling = false; // Stop auto-scrolling on manual interaction
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            isAutoScrolling = true; // Resume auto-scrolling after interaction
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Handle button click (previous/next) functionality
    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            isAutoScrolling = false; // Stop auto-scrolling on manual interaction
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });

            // Allow auto-scrolling to resume after a short delay
            setTimeout(() => {
                isAutoScrolling = true;
            }, 3000); // Delay before resuming auto-scroll (3 seconds)
        });
    });

    // Update visibility of the slide buttons
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    // Update the scrollbar thumb position based on image list scroll position
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Resize handler for responsiveness
    const handleResize = () => {
        maxScrollLeft = imageList.scrollWidth - imageList.clientWidth; // Recalculate the max scroll distance
        updateScrollThumbPosition(); // Update thumb position on resize
        handleSlideButtons(); // Update button visibility
    };

    window.addEventListener("resize", handleResize);

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    // Initial setup
    handleResize();
    handleSlideButtons();
    updateScrollThumbPosition();
};

window.addEventListener("load", initSlider);

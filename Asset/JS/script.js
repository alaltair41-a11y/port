const container = document.getElementById("compareBox");
const handle = document.getElementById("sliderHandle");
const afterImage = container.querySelector(".after");

let dragging = false;

// DESKTOP (mouse)
container.addEventListener("mousedown", () => dragging = true);
container.addEventListener("touchstart", () => dragging = true);
window.addEventListener("mouseup", () => dragging = false);

container.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    moveSlider(e.clientX);
});

// 📱 MOBILE (touch)
handle.addEventListener("touchstart", () => dragging = true);
window.addEventListener("touchend", () => dragging = false);

container.addEventListener("touchmove", (e) => {
    if (!dragging) return;

    let touch = e.touches[0];
    moveSlider(touch.clientX);
});


// 🔥 CORE FUNCTION (shared)
function moveSlider(clientX){
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;

    x = Math.max(0, Math.min(x, rect.width));

    const percent = (x / rect.width) * 100;

    handle.style.left = percent + "%";
    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
}


const container = document.getElementById("compareBox");
const handle = document.getElementById("sliderHandle");
const afterImage = container.querySelector(".after");

let dragging = false;

handle.addEventListener("mousedown", () => dragging = true);
window.addEventListener("mouseup", () => dragging = false);

container.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left;

    x = Math.max(0, Math.min(x, rect.width));

    const percent = (x / rect.width) * 100;

    handle.style.left = percent + "%";
    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
});


const toggle = document.getElementById("darkToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
document.querySelectorAll(".project-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    e.preventDefault(); // stop instant navigation
    this.classList.add("clicked");

    setTimeout(() => {
      window.open(href, "_blank");
      this.classList.remove("clicked");
    }, 120); // 👈 small delay so animation is visible
  });
});

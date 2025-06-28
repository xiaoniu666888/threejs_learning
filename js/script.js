document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider")
  const slides = document.querySelectorAll(".slide")
  const prevButton = document.querySelector("#prev")
  const nextButton = document.querySelector("#next")
  let currentIndex = 0
  let sliderInterval
  const sliderDurantion = 3000

  function initSlider() {
    updateSlider()
    startAutoSlider()
    slider.parentElement.addEventListener("mouseenter", pauseAutoSlider)
    slider.parentElement.addEventListener("mouseleave", startAutoSlider)
  }
  function updateSlider() {
    console.log(currentIndex)
    slider.style.transform = `translateX(-${currentIndex * 100}%)`
  }
  function nextSlider() {
    currentIndex = (currentIndex + 1) % slides.length
    updateSlider()
    document.dispatchEvent(new CustomEvent('slideChanged', { 
        detail: { index: currentIndex } 
    }));
  }
  function prevSlider() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    updateSlider()
     document.dispatchEvent(new CustomEvent('slideChanged', {
        detail: { index: currentIndex }
    }));
  }
  function startAutoSlider() {
    sliderInterval = setInterval(nextSlider, sliderDurantion)
  }
  function pauseAutoSlider() {
    clearInterval(sliderInterval)
  }
  nextButton.addEventListener("click", function () {
    pauseAutoSlider()
    nextSlider()
    startAutoSlider()
  })
  prevButton.addEventListener("click", function () {
    pauseAutoSlider()
    prevSlider()
    startAutoSlider()
  })
  initSlider()
})

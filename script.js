
const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    productCards.forEach((card) => {
      const matches =
        selectedCategory === "todos" ||
        card.dataset.category === selectedCategory;

      card.hidden = !matches;
    });
  });
});

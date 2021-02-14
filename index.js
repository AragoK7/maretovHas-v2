console.log("blin");

const doc = document;
const mainContainer = doc.querySelector(".big-container");
const allSections = doc.querySelectorAll(".article-container");
const [nap, dor, ruc, vec, dez] = ["nap", "dor", "ruc", "vec", "dez"];

const defaultArticles = [
  {
    articleType: dor,
    articleName: "articleName",
    articlePrice: 255.99,
  },
  {
    articleType: ruc,
    articleName: "articleName",
    articlePrice: 255.99,
  },
  {
    articleType: vec,
    articleName: "articleName",
    articlePrice: 255.99,
  },
  {
    articleType: nap,
    articleName: "arwerwerwerewrme",
    articlePrice: 255.99,
  },
  {
    articleType: dor,
    articleName: "articleName",
    articlePrice: 255.99,
  },
  {
    articleType: dez,
    articleName: "articleName",
    articlePrice: 255.99,
  },
];
const AllArticles = [...defaultArticles];

// IIFE za dodeljivanje eventova
(function () {
  // Adds event to clicks on <main> element
  mainContainer.addEventListener("click", function (e) {
    // Selektujemo trenutno izabrani tip obroka
    const selected = e.target.closest(".big-container__section");
    // Making sure user clicked on one of the sections
    if (!selected) return;
    // Kontejner artikala odabranog tipa
    const selectedSection = doc.querySelector(
      `.article-container--${selected.dataset.val}`
    );
    toggleDisplayClasses(selected, selectedSection);
  });

  // Funkcija za skidanje klasa sa svih naslova
  // i 'togglovanje' klase na trenutno pritisnutom naslovu
  const toggleDisplayClasses = function (selected, selectedSection) {
    console.log(selected);
    allSections.forEach((sec) => {
      if (sec !== selectedSection) sec.classList.remove("section__display--on");
      console.log(sec, selected);
    });
    // kreira html koji ce biti prikazan
    if (!selectedSection.classList.contains("section__display--on")) {
      displayArticles(selected.dataset.val);
    }
    selectedSection.classList.toggle("section__display--on");
  };

  const displayArticles = function (type) {
    const arrayofType = getArticlesOfType(type);
    let articlesAll = "";
    arrayofType.forEach((article) => (articlesAll += generateHTML(article)));
    doc.querySelector(`.article-container--${type}`).innerHTML = articlesAll;
    const allArticles = doc.querySelectorAll("section article");
    displayArticlesAnimate(allArticles);
  };

  const getArticlesOfType = function (type) {
    const arrayOfType = [];
    AllArticles.forEach(
      (art) => art.articleType === type && arrayOfType.push(art)
    );
    return arrayOfType;
  };

  const generateHTML = function (objekatArtikal) {
    return `<article class="artikal--${objekatArtikal.articleType}">
    <span>${objekatArtikal.articleName}</span>
    <span>${objekatArtikal.articlePrice}</span>
    </article>`;
  };
  const displayArticlesAnimate = function (articlesArray) {
    articlesArray.forEach((article, i) => {
      i % 2 === 0
        ? article.classList.add("animation--fade-in--left")
        : article.classList.add("animation--fade-in--right");
    });
    //   articlesArray[0].classList.add("animation--fade-in--left");
    //   articlesArray[2].classList.add("animation--fade-in--right");
  };
})();

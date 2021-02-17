console.log("Blin, it started the script");

// IIFE za dodeljivanje eventova
(function () {
  const doc = document;

  const allSections = doc.querySelectorAll(".article-container");

  const btnSubmit = doc.querySelector(".submit--modal");
  const btnRemoveOne = doc.querySelector(".remove-one--modal");
  const btnRemoveAll = doc.querySelector(".remove-all--modal");
  const [nap, dor, ruc, vec, dez] = ["nap", "dor", "ruc", "vec", "dez"];
  let allArticles = [];
  let userAddedArticles =
    JSON.parse(localStorage.getItem("userAddedArticles")) || [];

  function updateAllArticles() {
    allArticles = [...userAddedArticles];
  }
  updateAllArticles();

  const createNewObject = function (nAT, naN, nAP, userGenerated = false) {
    let newObj = Object.create(null);
    // tip artikla
    newObj.articleType = nAT;
    // ime artikla
    newObj.articleName = naN;
    // cena artikla
    newObj.articlePrice = nAP;
    newObj.userGenerate = userGenerated;
    allArticles.push(newObj);
    if (userGenerated) userAddedArticles.push(newObj);
    updateLocalStorage(userAddedArticles);
    allSections.forEach((sec) => {
      sec.innerHTML = "";
      sec.classList.remove("section__display--on");
    });
  };

  // Dinamically setting background color of 'main div'
  const allMainDivs = doc.querySelectorAll("main div");
  allMainDivs.forEach((div, i) => {
    i % 2 === 0
      ? (div.style.backgroundColor = "rgb(8, 64, 96)")
      : (div.style.backgroundColor = "rgb(16, 96, 96)");
  });
  /////////////////////////////////
  /////////////////////////////////
  // ADDING EVENT LISTENERS

  // Adds event to clicks on <main> element
  const mainContainer = doc.querySelector(".big-container");
  const modalOverlay = doc.querySelector(".modal--overlay");
  const noContentSpanArray = mainContainer.querySelectorAll(`.no-content`);

  mainContainer.addEventListener("click", function (e) {
    // hides all no content texts
    noContentSpanArray.forEach((el) => el.classList.add("hidden"));

    // Selektujemo trenutno izabrani tip obroka
    let selectedDiv = e.target.closest(".big-container__section");

    const removeDisplayAll = function () {
      allSections.forEach((sec) => {
        sec.innerHTML = "";
        sec.classList.remove("section__display--on");
      });
    };

    // Making sure user clicked on one of the sections
    if (!selectedDiv) {
      selectedDiv = e.target.closest(".big-container__create-has");
      const selectedSection = doc.querySelector(
        `.article-container--${selectedDiv.dataset.val}`
      );
      if (!selectedDiv) {
        removeDisplayAll();
        return;
      }
      removeDisplayAll();
      modalOverlay.classList.remove("modal--hidden");

      return;
    }
    const selectedSection = doc.querySelector(
      `.article-container--${selectedDiv.dataset.val}`
    );
    allSections.forEach((sec) => {
      if (sec !== selectedSection) {
        sec.innerHTML = "";
        sec.classList.remove("section__display--on");
      }
    });

    toggleDisplayClasses(selectedDiv, selectedSection);
  });

  const clearModal = function () {
    modalOverlay.querySelector(".input--type").value = "nap";
    modalOverlay.querySelector(".input--name").value = "";
    modalOverlay.querySelector(".input--price").value = "";
    modalOverlay.querySelector(".input--remove-one").value = "";
  };

  // Event listener for closing modal screen
  modalOverlay.addEventListener("click", function (e) {
    if (e.target.closest(".close--modal") || !e.target.closest(".modal")) {
      modalOverlay.classList.add("modal--hidden");
      clearModal();
    }
  });

  // Event listener for submiting new recipe
  btnSubmit.addEventListener("click", function () {
    const artType = modalOverlay.querySelector(".input--type").value;
    const artName = modalOverlay.querySelector(".input--name").value;
    const artPrice = modalOverlay.querySelector(".input--price").value;
    if (!artName || !artPrice) clearModal();
    else {
      createNewObject(artType, artName, Number(artPrice), true);
      clearModal();
    }
    modalOverlay.classList.add("modal--hidden");
  });

  btnRemoveOne.addEventListener("click", function () {
    const imeObroka = modalOverlay.querySelector(".input--remove-one").value;
    let indexOf;
    indexOf = userAddedArticles.indexOf(
      userAddedArticles.find((art) => art.articleName === imeObroka)
    );
    if (indexOf === -1) {
      clearModal();
      modalOverlay.classList.add("modal--hidden");
    }
    updateAllArticles();
    updateLocalStorage(userAddedArticles);
    clearModal();
    modalOverlay.classList.add("modal--hidden");
  });
  const updateLocalStorage = function (array) {
    localStorage.setItem("userAddedArticles", JSON.stringify(array));
  };

  btnRemoveAll.addEventListener("click", function () {
    userAddedArticles = [];
    updateAllArticles();
    updateLocalStorage(userAddedArticles);

    clearModal();
    modalOverlay.classList.add("modal--hidden");
  });

  // Funkcija za skidanje klasa sa svih naslova
  // i 'togglovanje' klase na trenutno pritisnutom naslovu
  const toggleDisplayClasses = function (selectedDiv, selectedSection) {
    // kreira html koji ce biti prikazan
    if (!selectedSection.classList.contains("section__display--on")) {
      displayArticles(selectedDiv.dataset.val);
    } else selectedSection.innerHTML = "";
    selectedSection.classList.toggle("section__display--on");
  };

  const displayArticles = function (type) {
    const arrayofType = getArticlesOfType(type);
    if (arrayofType.length === 0) {
      mainContainer
        .querySelector(`.hidden--${type}`)
        .classList.remove("hidden");
      return;
    }
    let articlesAllHTML = "";
    arrayofType.forEach(
      (article) => (articlesAllHTML += generateHTML(article))
    );
    doc.querySelector(
      `.article-container--${type}`
    ).innerHTML = articlesAllHTML;
    const allArticles = doc.querySelectorAll("section article");
    displayArticlesAnimate(allArticles);
  };

  const getArticlesOfType = function (type) {
    const arrayOfType = [];
    allArticles.forEach(
      (art) => art.articleType === type && arrayOfType.push(art)
    );

    return arrayOfType;
  };

  const generateHTML = function (objekatArtikal) {
    return `<article class="artikal--${objekatArtikal.articleType}">
    <span class="item1">${objekatArtikal.articleName}</span>
    <span class="filler">.........................................................................................................................................................................................................</span>
    <span class="item2">${objekatArtikal.articlePrice.toFixed(2)}</span>
    </article>`;
  };
  const displayArticlesAnimate = function (articlesArray) {
    articlesArray.forEach((article) => {
      article
        .querySelector(".item1")
        .classList.add("animation--fade-in--right");
      article.querySelector(".item2").classList.add("animation--fade-in--left");
      article
        .querySelector(".filler")
        .classList.add("animation--fade-in--bottom");
    });
  };
})();

// localStorage.clear();
console.log("Blin, it's the end of the script");

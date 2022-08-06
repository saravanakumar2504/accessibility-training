(function () {
  let burger = document.querySelector(".burger");
  let menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

(function () {
  setInterval(function () {
    const date = new Date();
    document.getElementById(
      "ariaLive"
    ).innerHTML = `Thanks for spending 1 more minute in my portal, Time now is ${date.toLocaleTimeString()}`;
  }, 60000);
})();

(function () {
  const TABLIST = document.querySelector(".tablist");
  const TABS = [...TABLIST.querySelectorAll(".tab")];
  const TABPANELS = [...document.querySelectorAll(".tabpanel")];

  const showActivePanel = (element) => {
    const selectedId = element.id;
    TABPANELS.forEach((e) => {
      e.style.display = "none";
    });
    const activePanel = document.querySelector(
      `[aria-labelledby="#${selectedId}"]`
    );
    activePanel.removeAttribute("tabindex", "-1");
    activePanel.style.display = "block";
  };

  const setSelectedTab = (element) => {
    const selectedId = element.id;
    TABS.forEach((e) => {
      const id = e.getAttribute("id");
      if (id === selectedId) {
        e.removeAttribute("tabindex", "0");
        e.setAttribute("aria-selected", "true");
        e.focus();
        e.classList.add("is-active");
      } else {
        e.setAttribute("tabindex", "-1");
        e.setAttribute("aria-selected", "false");
        e.classList.remove("is-active");
      }
    });
  };

  const createArrowNavigation = () => {
    const firstTab = TABS[0];
    const lastTab = TABS[TABS.length - 1];

    TABS.forEach((element) => {
      element.addEventListener("keydown", function (e) {
        if ((e.keyCode || e.which) === 38 || (e.keyCode || e.which) === 37) {
          if (element == firstTab) {
            e.preventDefault();
            lastTab.focus();
          } else {
            e.preventDefault();
            const focusableElement = TABS.indexOf(element) - 1;
            TABS[focusableElement].focus();
          }
        } else if (
          (e.keyCode || e.which) === 40 ||
          (e.keyCode || e.which) === 39
        ) {
          if (element == lastTab) {
            e.preventDefault();
            firstTab.focus();
          } else {
            e.preventDefault();
            const focusableElement = TABS.indexOf(element) + 1;
            TABS[focusableElement].focus();
          }
        }
      });
    });
  };

  const handleClick = () => {
    TABS.forEach((element) => {
      element.addEventListener("click", function () {
        setSelectedTab(element);
        showActivePanel(element);
      });
    });
  };
  handleClick();
  createArrowNavigation();
})();

(function () {
  const menuItems = document.querySelectorAll(".navbar-item.has-submenu");
  menuItems.forEach((item) => {
    if (item.children) {
      item.addEventListener("click", menuItemHandler);
    }
  });
})();

function menuItemHandler(e) {
  const current = e.currentTarget;
  if (current?.children[0]?.getAttribute("aria-expanded") === "false") {
    current.querySelector(".fas").classList.remove("fa-angle-down");
    current.querySelector(".fas").classList.add("fa-angle-up");
    current.children[1].style.display = "block";
    (current.children[1]?.children[0]).focus();
    current.children[0].setAttribute("aria-expanded", true);
    if (current.children[0].classList.contains("skip"))
      current?.children[0].classList.remove("visually-hidden");
  } else {
    current.querySelector(".fas").classList.remove("fa-angle-up");
    current.querySelector(".fas").classList.add("fa-angle-down");
    current.children[1].style.display = "none";
    current.children[0].setAttribute("aria-expanded", false);
  }
  document.querySelectorAll(".sub-menu").forEach((item) => {
    const validChildren = Object.values(item.children).filter(
      (ch) => ch.role !== "separator"
    );

    let menuItemFocus = 0;

    item.addEventListener("keydown", (e) => {
      e.preventDefault();
      validChildren[menuItemFocus].setAttribute("tabindex", 0);
      if (e.keyCode === 40) {
        menuItemFocus++;
        if (menuItemFocus >= validChildren.length) {
          //down arrow
          menuItemFocus = 0;
        }
        validChildren[menuItemFocus].setAttribute("tabindex", -1);
        validChildren[menuItemFocus].focus();
      } else if (e.keyCode === 38) {
        menuItemFocus--;
        if (menuItemFocus < 0) {
          // up arrow
          menuItemFocus = validChildren.length - 1;
        }

        validChildren[menuItemFocus].setAttribute("tabindex", -1);
        validChildren[menuItemFocus].focus();
      } else if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        validChildren[menuItemFocus].firstElementChild.click(); // enter and space to enter submenu
        validChildren[menuItemFocus].focus();
        if (current.children[0].classList.contains("skip"))
          current?.children[0].classList.add("visually-hidden");
      } else if (e.keyCode === 27) {
        e.preventDefault();
        current.children[1].style.display = "none"; // escape
        current.children[0].setAttribute("aria-expanded", false);
        if (current.children[0].classList.contains("skip"))
          current?.children[0].classList.add("visually-hidden");
      }
    });
  });
}

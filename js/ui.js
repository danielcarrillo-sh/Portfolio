export function buildUI(i18n) {
  buildPageTitle(i18n);
  buildHeader(i18n);
  buildNav(i18n);
  buildSections(i18n);
  buildSkills(i18n);
  buildStack(i18n);
  buildContact(i18n);
}

function buildPageTitle(i18n) {
  const title = document.getElementById("page-title");
  title.textContent = `${i18n.header.title} - ${i18n.header.subtitle}`;
}

function buildHeader(i18n) {
  const titleEl = document.getElementById("site-title");
  const subtitleEl = document.getElementById("site-subtitle");

  titleEl.textContent = i18n.header.title;
  titleEl.style.whiteSpace = "pre";
  subtitleEl.textContent = i18n.header.subtitle;
}

function buildNav(i18n) {
  document.querySelectorAll("[data-nav]").forEach(el => {
    const key = el.dataset.nav;
    if (i18n.nav[key]) {
      el.textContent = i18n.nav[key];
    }
  });
}

function buildSections(i18n) {
  document.querySelectorAll("[data-section]").forEach(el => {
    const key = el.dataset.section;
    if (i18n.sections[key]) {
      el.textContent = i18n.sections[key];
    }
  });
}

function buildSkills(i18n) {
  const container = document.getElementById("skills-cards");
  container.textContent = "";

  i18n.skills.forEach(skill => {
    const card = document.createElement("div");
    card.className = "card surface";

    const title = document.createElement("h3");
    title.textContent = skill.title;

    const list = document.createElement("ul");

    skill.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    card.appendChild(title);
    card.appendChild(list);
    container.appendChild(card);
  });
}

function buildStack(i18n) {
  const container = document.getElementById("stack-list");
  container.textContent = "";

  i18n.stack.forEach(item => {
    const wrapper = document.createElement("div");
    wrapper.className = "stack-item surface";

    const img = document.createElement("img");
    img.src = `stack-icons/${item.icon}`;
    img.alt = item.name;

    const label = document.createElement("span");
    label.textContent = item.name;

    wrapper.appendChild(img);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
}

function buildContact(i18n) {
  document.querySelectorAll("[data-contact]").forEach(el => {
    const key = el.dataset.contact;
    if (i18n.contact[key]) {
      el.textContent = i18n.contact[key];
    }
  });
}


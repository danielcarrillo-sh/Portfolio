export function buildBlogPost(data) {

  buildHeader(data);
  buildPageTitle(data);
  buildContent(data);

}



function buildHeader(data) {

  if (!data.header) return;

  const titleEl = document.getElementById("site-title");
  const subtitleEl = document.getElementById("site-subtitle");

  if (titleEl) {
    titleEl.textContent = data.header.title;
    titleEl.style.whiteSpace = "pre";
  }

  if (subtitleEl) {
    subtitleEl.textContent = data.header.subtitle;
  }

}



function buildPageTitle(data) {

  const title = document.getElementById("page-title");

  if (!title) return;

  const pageTitle = data.main?.pageTitle || "";

  title.textContent = `Daniel Carrillo - ${pageTitle}`;

}



function buildContent(data) {

  const container = document.getElementById("blog-content");
  if (!container) return;

  container.textContent = "";

  const main = data.main;
  if (!main) return;

  const title = document.createElement("h2");
  title.textContent = main.pageTitle;
  container.appendChild(title);

  main.content.forEach(block => {

    if (block.type === "text") {

      const p = document.createElement("p");
      p.className = "page-text";
      p.textContent = block.value;

      container.appendChild(p);

    }

    if (block.type === "command") {

      const pre = document.createElement("pre");
      pre.className = "command";
      pre.textContent = block.value;

      container.appendChild(pre);

    }

  });

}

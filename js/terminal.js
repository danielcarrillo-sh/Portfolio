export function initTerminals(i18n) {
  terminalCat("about-term", ["cat about.txt", "uptime"], [i18n.terminal.about, i18n.terminal.uptime], 500, i18n);
  terminalCat("projects-term", ["ls -l /projects"], [lsProjects(i18n)], 3000, i18n);
}

function terminalCat(id, commands, outputs, delay = 2000, i18n) {
  if (commands.length !== outputs.length) {
    console.warn(`Command/output length mismatch for terminal "${id}"`);
    return;
  }

  const el = document.getElementById(id);
  el.textContent = "";

  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor";
  cursorSpan.textContent = "|";

  const promptSpan = () => {
    const span = document.createElement("span");
    span.className = "prompt";
    span.textContent = i18n.terminal.prompt;
    return span;
  };

  let cmdIndex = 0;

  const typeCommand = (cmd) => {
    let charIndex = 0;

    const typeChar = () => {
      const cursor = el.querySelector(".cursor");
      if (charIndex < cmd.length) {
        cursor.remove();
        const span = document.createElement("span");
        span.className = "command";
        span.textContent = cmd[charIndex];
        el.appendChild(span);
        el.appendChild(cursorSpan);
        charIndex++;
        setTimeout(typeChar, 60);
      } else {
        cursor.remove();
        const outputSpan = document.createElement("span");
        outputSpan.className = "output";
        outputSpan.innerHTML = outputs[cmdIndex].replace(/\n/g, "<br>");
        el.appendChild(document.createElement("br"));
        el.appendChild(outputSpan);
        el.appendChild(document.createElement("br"));

        cmdIndex++;
        if (cmdIndex < commands.length) {
          el.appendChild(promptSpan());
          el.appendChild(cursorSpan);
          setTimeout(() => typeCommand(commands[cmdIndex]), 600);
        } else {
          el.appendChild(promptSpan());
          el.appendChild(cursorSpan);
        }
      }
    };

    typeChar();
  };

  el.appendChild(promptSpan());
  el.appendChild(cursorSpan);
  setTimeout(() => typeCommand(commands[cmdIndex]), delay);
}

function lsProjects(i18n) {
  return i18n.terminal.projects
    .map(p => {
      const permissions = "lrwxrwxrwx";
      const owner = "daniel";
      const group = "daniel";
      const size = "1234";
      const date = new Date().toDateString().slice(4);
      const name = p.fileName;
      const link = `<a href="${p.href}" target="_blank" rel="noopener noreferrer">${p.linkName}</a>`;
      return `${permissions} ${owner} ${group} ${size} ${date} ${name} -> ${link}`;
    })
    .join("\n");
}


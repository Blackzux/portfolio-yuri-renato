(() => {
  const root = document.getElementById("root");

  const showError = (message) => {
    if (!root) return;
    root.innerHTML = `
      <main style="min-height:100vh;display:grid;place-items:center;padding:32px;background:#171b21;color:#f4f4f2;font-family:Arial,sans-serif">
        <section style="max-width:620px">
          <p style="color:#00efd4;text-transform:uppercase;letter-spacing:.12em">Portfólio Yuri Renato</p>
          <h1 style="font-size:clamp(2rem,6vw,4rem);margin:.25em 0">Não foi possível abrir o catálogo.</h1>
          <p style="line-height:1.6;color:#dfe1e2">${message}</p>
        </section>
      </main>`;
  };

  const loadApplication = async () => {
    try {
      const response = await fetch(new URL("data/projects.json", document.baseURI), { cache: "no-store" });
      if (!response.ok) throw new Error(`O catálogo respondeu com o código ${response.status}.`);

      const projects = await response.json();
      if (!Array.isArray(projects) || projects.length === 0) throw new Error("O catálogo está vazio.");
      window.PORTFOLIO_PROJECTS = projects;

      const script = document.createElement("script");
      script.src = new URL("app.js", document.baseURI).href;
      script.async = false;
      script.onerror = () => showError("O arquivo principal do site não foi carregado. Confira se app.js está publicado.");
      document.body.appendChild(script);
    } catch (error) {
      console.error(error);
      showError("Abra o site por um servidor local ou pelo endereço publicado no GitHub Pages. Confira também se data/projects.json está presente.");
    }
  };

  loadApplication();
})();

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const popupFechado = localStorage.getItem("popupFechado");

  if (!popupFechado) {
    setTimeout(() => {
      popup.style.display = "flex";
    }, 2000);
  }

  const botaoFechar = popup.querySelector("button");
  botaoFechar.addEventListener("click", () => {
    popup.style.display = "none";
    localStorage.setItem("popupFechado", "true");
  });

  // Formulário de contato
  const form = document.getElementById("form-contato");
  const resposta = document.getElementById("resposta-formulario");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        resposta.textContent = "Obrigado! Sua mensagem foi enviada com sucesso. ✅";
        resposta.style.color = "#00ff88";
        form.reset();
      } else {
        resposta.textContent = "Ocorreu um erro ao enviar. Tente novamente. ❌";
        resposta.style.color = "#ff3366";
      }

      setTimeout(() => {
        resposta.textContent = "";
      }, 6000);
    } catch (error) {
      resposta.textContent = "Erro de conexão. Verifique sua internet.";
      resposta.style.color = "#ff3366";
    }
  });

  // Botão voltar ao topo
  const botaoTopo = document.getElementById("btn-topo");

  window.addEventListener("scroll", () => {
    botaoTopo.style.display = window.scrollY > 200 ? "block" : "none";
  });

  botaoTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Efeito de revelar ao rolar
  const elementosRevelar = document.querySelectorAll('.reveal');

  function revelarAoRolar() {
    const windowHeight = window.innerHeight;
    const pontoRevelar = 100;

    elementosRevelar.forEach((elemento) => {
      const topElemento = elemento.getBoundingClientRect().top;

      if (topElemento < windowHeight - pontoRevelar) {
        elemento.classList.add('ativo');
      }
    });
  }

  window.addEventListener('scroll', revelarAoRolar);
  revelarAoRolar(); // chamada inicial
});

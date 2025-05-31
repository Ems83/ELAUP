// 📩 Formulário de Contato
document.getElementById('formContato')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  this.reset();
});

// ✨ Animação ao rolar a página
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('active');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// 🎞️ Swiper (carrossel)
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

  const airtableBase = "appOYuxq91Okzr6CP";
  const airtableTable = encodeURIComponent("Table 1"); // fica "Table%201"
  const airtableToken = "patI0u3B11vWE1jUG";

  const airtableUrl = `https://api.airtable.com/v0/${airtableBase}/${airtableTable}`;

  const headers = {
    "Authorization": `Bearer ${airtableToken}`,
    "Content-Type": "application/json"
  };

  const form = document.getElementById('form-historia');
  const lista = document.getElementById('lista-historias');

  // Função para enviar a história
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;

   fetch('http://localhost:3000/historias', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    Nome: nome,
    História: mensagem
  })
})
.then(res => res.json())
.then(data => {
  alert("História enviada com sucesso!");
  form.reset();
  adicionarHistoriaNaTela({
    fields: { Nome: nome, História: mensagem },
    createdTime: new Date().toISOString()
  });
})
.catch(err => {
  console.error("Erro ao enviar:", err);
  alert("Erro ao enviar. Tente novamente.");
});


  // Função para listar as histórias
  function carregarHistorias() {
    fetch(airtableUrl, { headers: headers })
      .then(res => res.json())
      .then(data => {
        lista.innerHTML = '';
        data.records.reverse().forEach(record => {
          adicionarHistoriaNaTela(record);
        });
      })
      .catch(err => {
        console.error("Erro ao carregar histórias:", err);
      });
  }

  // ✅ Função para adicionar uma história na tela
  function adicionarHistoriaNaTela(record) {
    const div = document.createElement('div');
    div.classList.add('post');
    div.innerHTML = `
      <h3>${record.fields.Nome}</h3>
      <p>${record.fields.História}</p>
      <small>${new Date(record.createdTime).toLocaleString()}</small>
    `;
    lista.prepend(div);
  }

  // Carregar todas as histórias ao iniciar
  carregarHistorias();

});

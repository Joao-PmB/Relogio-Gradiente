const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");
const fusohorarios = document.getElementById("timezones");

let relogio;

const local = () => {
  if (relogio) clearInterval(relogio);

  function atualizarRelogioLocal() {
    let dataHoje = new Date();
    let hr = String(dataHoje.getHours()).padStart(2, "0");
    let min = String(dataHoje.getMinutes()).padStart(2, "0");
    let sec = String(dataHoje.getSeconds()).padStart(2, "0");

    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = sec;
  }

  atualizarRelogioLocal();

  relogio = setInterval(atualizarRelogioLocal, 1000);
};

async function getHorario(timezoneSelecionado) {
  if (relogio) clearInterval(relogio);

  horas.textContent = "--";
  minutos.textContent = "--";
  segundos.textContent = "--";

  const url = `https://world-time-api3.p.rapidapi.com/timezone/${timezoneSelecionado}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": CONFIG.API_KEY,
      "x-rapidapi-host": CONFIG.HOST,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    let horaBase = new Date(result.datetime);

    function atualizarRelogioAPI() {
      if (!horaBase) return;

      const tempo = horaBase.toLocaleTimeString("pt-BR", {
        timeZone: timezoneSelecionado,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const [hr, min, sec] = tempo.split(":");
      horas.textContent = hr;
      minutos.textContent = min;
      segundos.textContent = sec;

      horaBase.setSeconds(horaBase.getSeconds() + 1);
    }

    atualizarRelogioAPI();

    relogio = setInterval(atualizarRelogioAPI, 1000);
  } catch (error) {
    console.error(error);
    horas.textContent = "ER";
    minutos.textContent = "RO";
    segundos.textContent = "!!";
  }
}

fusohorarios.addEventListener("change", (e) => {
  const novoTimezone = e.target.value;
  if (novoTimezone === "meuLocal") {
    local();
  } else {
    getHorario(novoTimezone);
  }
});

if (fusohorarios.value === "meuLocal") {
  local();
} else if (fusohorarios.value) {
  getHorario(fusohorarios.value);
}
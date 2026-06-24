const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

(async function getHorario() {
  const url = "https://world-time-api3.p.rapidapi.com/timezone/Brazil/East";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": CONFIG.API_KEY,
      "x-rapidapi-host": "world-time-api3.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    horaBase = new Date(result.datetime);

    const relogio = setInterval(function time() {
      if (!horaBase) return;

      horaBase.setSeconds(horaBase.getSeconds() + 1);

      let hr = horaBase.getHours();
      let min = horaBase.getMinutes();
      let sec = horaBase.getSeconds();

      if (hr < 10) hr = "0" + hr;
      if (min < 10) min = "0" + min;
      if (sec < 10) sec = "0" + sec;

      horas.textContent = hr;
      minutos.textContent = min;
      segundos.textContent = sec;
    }, 1000);

  } catch (error) {
    console.error(error);
  }
})();
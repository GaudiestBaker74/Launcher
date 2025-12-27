const games = window.steamAPI.getGames();
const container = document.getElementById("games");

games.forEach(game => {
  const card = document.createElement("div");
  card.className = "game";

  card.innerHTML = `
    <span>${game.name}</span>
  `;

  card.onclick = () => {
    window.location.href = `steam://rungameid/${game.appid}`;
  };

  container.appendChild(card);
});

(() => {
  const cards = [...document.querySelectorAll("[data-feeder]")];
  const search = document.querySelector("#feeder-search");
  const count = document.querySelector("#feed-count");
  const empty = document.querySelector("#no-results");
  const searchControl = document.querySelector("#feed-search");

  if (search && count && empty && searchControl) {
    searchControl.hidden = false;
    const filter = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      for (const card of cards) {
        card.hidden = !card.textContent.toLowerCase().includes(query);
        if (!card.hidden) visible++;
      }
      count.textContent = query
        ? `${visible} of ${cards.length} networks`
        : `${cards.length} networks`;
      empty.hidden = visible !== 0;
    };
    search.addEventListener("input", filter);
    filter();
  }

  const ratesLink = document.querySelector("[data-opensky-rates]");
  if (ratesLink) {
    const updateRatesLink = () => {
      const end = Math.floor(Date.now() / 1000);
      const url = new URL("https://opensky-network.org/api/stats/msg-rates");
      url.searchParams.set("begin", String(end - 30 * 60));
      url.searchParams.set("end", String(end));
      url.searchParams.set("serials", "-1407983889");
      ratesLink.href = url.href;
    };
    updateRatesLink();
    ratesLink.hidden = false;
    for (const event of ["click", "pointerdown", "focus", "contextmenu"]) {
      ratesLink.addEventListener(event, updateRatesLink);
    }
  }
})();

(() => {
  const backendByHost = {
    "kvm-proxmox.home.williamvdg.me": "http://192.168.68.132",
    "kvm-william.home.williamvdg.me": "http://192.168.68.126",
    "kvm-daniela.home.williamvdg.me": "http://192.168.68.116",
    "openwebui.home.williamvdg.me": "http://192.168.68.146:3000",
    "homeassistant.home.williamvdg.me": "http://192.168.68.107:8123",
    "plex.home.williamvdg.me": "http://192.168.68.149:32400",
    "tautulli.home.williamvdg.me": "http://192.168.68.146:8181",
    "immich-gp.home.williamvdg.me": "http://192.168.68.129:2283",
    "immich-icd.home.williamvdg.me": "http://192.168.68.124:2283",
    "immich-power-gp.home.williamvdg.me": "http://192.168.68.129:8001",
    "immich-power-icd.home.williamvdg.me": "http://192.168.68.124:8001",
    "dawarich.home.williamvdg.me": "http://192.168.68.129:3000",
    "kiwix.home.williamvdg.me": "http://192.168.68.113:1112",
    "send2ereader.home.williamvdg.me": "http://192.168.68.122:3001",
    "pairdrop.home.williamvdg.me": "http://192.168.68.122:4321",
    "miniqr.home.williamvdg.me": "http://192.168.68.113:1234",
    "ytdlp.home.williamvdg.me": "http://192.168.68.113:3033",
    "pocket-tts.home.williamvdg.me": "http://192.168.68.146:1234",
    "bentopdf.home.williamvdg.me": "http://192.168.68.113:3004",
    "convert.home.williamvdg.me": "http://192.168.68.113:8090",
    "drawio.home.williamvdg.me": "http://192.168.68.113:8089",
    "libretranslate.home.williamvdg.me": "http://192.168.68.146:5000",
    "sparky.home.williamvdg.me": "http://192.168.68.156:3004",
    "sure.home.williamvdg.me": "http://192.168.68.121:3000",
    "lubelogger.home.williamvdg.me": "http://192.168.68.121:8080",
    "trek.home.williamvdg.me": "http://192.168.68.122:3069",
    "manyfold.home.williamvdg.me": "http://192.168.68.140:3215",
    "spoolman.home.williamvdg.me": "http://192.168.68.140:7912",
    "openclaw.home.williamvdg.me": "http://192.168.68.143:18789",
    "airtrail.home.williamvdg.me": "http://192.168.68.122:3000",
    "flightjar.home.williamvdg.me": "http://192.168.68.137:1234",
    "skyaware.home.williamvdg.me": "http://192.168.68.137:8080",
    "tar1090.home.williamvdg.me": "http://192.168.68.137:8504",
    "gitea.home.williamvdg.me": "http://192.168.68.110:3000",
    "coder.home.williamvdg.me": "http://192.168.68.110:2348",
    "opengist.home.williamvdg.me": "http://192.168.68.110:6157",
    "jupyter.home.williamvdg.me": "http://192.168.68.110",
    "vaultwarden.home.williamvdg.me": "https://192.168.68.125:8000",
    "2fa.home.williamvdg.me": "http://192.168.68.103",
    "cameras.home.williamvdg.me": "http://192.168.68.139",
    "uptime2.home.williamvdg.me": "http://192.168.68.136:3001",
    "openmediavault.home.williamvdg.me": "http://192.168.68.118",
    "prometheus.home.williamvdg.me": "http://192.168.68.152:9090",
    "grafana.home.williamvdg.me": "http://192.168.68.153:3000",
  };

  const toggle = document.querySelector("#link-mode-toggle");
  const label = document.querySelector("#link-mode-label");
  const links = [...document.querySelectorAll("a[href]")].map((link) => {
    const proxyHref = link.getAttribute("href");
    const proxyUrl = new URL(proxyHref, window.location.href);
    return {
      link,
      proxyHref,
      backend: backendByHost[proxyUrl.hostname],
      path: proxyUrl.pathname,
      search: proxyUrl.search,
      hash: proxyUrl.hash,
    };
  });

  const readSavedMode = () => {
    try {
      return localStorage.getItem("intranet-link-mode") === "ip";
    } catch {
      return false;
    }
  };

  let useIpAddresses = readSavedMode();

  const updateLinks = () => {
    for (const entry of links) {
      if (!entry.backend) continue;
      if (!useIpAddresses) {
        entry.link.setAttribute("href", entry.proxyHref);
        continue;
      }

      const directUrl = new URL(entry.backend);
      directUrl.pathname = entry.path;
      directUrl.search = entry.search;
      directUrl.hash = entry.hash;
      entry.link.setAttribute("href", directUrl.href);
    }

    toggle.setAttribute("aria-pressed", String(useIpAddresses));
    toggle.textContent = useIpAddresses
      ? "Switch to HTTPS URLs"
      : "Switch to IP addresses";
    label.textContent = useIpAddresses
      ? "Known service links use IP addresses"
      : "Service links use HTTPS";
  };

  toggle.addEventListener("click", () => {
    useIpAddresses = !useIpAddresses;
    try {
      localStorage.setItem("intranet-link-mode", useIpAddresses ? "ip" : "https");
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
    updateLinks();
  });

  updateLinks();
})();

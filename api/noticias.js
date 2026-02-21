export default async function handler(req, res) {
  try {
    const r = await fetch("https://hispano-ao.com/api/noticias");
    const data = await r.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: "Error al obtener noticias" });
  }
}

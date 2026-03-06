// api/noticias.js
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { url } = req.query;
    // Si no mandas URL por parámetro, puedes poner la de tu canal por defecto aquí:
    const targetUrl = url || "https://discord.com/api/v10/channels/1479373626884227082/messages";

    // TAMBIÉN BUSCA DISCORD_TOKEN EN VERCEL
    const token = process.env.DISCORD_TOKEN;

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error en el oráculo de noticias' });
    }
}

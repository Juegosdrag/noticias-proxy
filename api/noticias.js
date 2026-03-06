// noticias.js (o proxy.js) dentro de la carpeta api/

export default async function handler(req, res) {
    // 1. Configuramos los permisos para que tu web de AODrag pueda leer los datos
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Cogemos la URL de Discord que enviamos desde la web
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Falta la URL de Discord' });
    }

    // 3. Usamos la llave (Token) que guardaste en Vercel
    const token = process.env.DISCORD_TOKEN;

    if (!token) {
        return res.status(500).json({ error: 'Falta la variable DISCORD_TOKEN en Vercel' });
    }

    try {
        // 4. Hacemos la petición real a Discord usando tu Bot
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        
        // 5. Enviamos los mensajes de vuelta a tu pergamino
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error de conexión con el Oráculo' });
    }
}

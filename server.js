const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🔗 Telegram Bot Config
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// ✅ Data Simulasi (ganti dengan data asli dari API tracker)
const whaleData = {
    time: new Date().toLocaleString(),
    token: "PEPE",
    ca: "3XoYxZAbcDefGiHjKlMn...",
    dex: "Raydium",
    swap: "120 SOL > 500M PEPE",
    liquidity: "$250,000",
    owner: "15%",
    burn: "5%",
    status: "SAFE"
};

// 🔥 Function untuk kirim ke Telegram
async function sendToTelegram(data) {
    const message = `
✅ *WHALE BUY DETECTED* ✅
🕒 Time: *${data.time}*
🔹 Token: *${data.token}*
🔗 CA: \`${data.ca}\`
🟩 DEX: ${data.dex}
💸 Swap: ${data.swap}
💧 Liquidity: ${data.liquidity}
👑 Owner: ${data.owner}
🔥 Burn: ${data.burn}
🚦 Status: *${data.status}*
    `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const res = await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        console.log('✅ Message sent to Telegram:', res.data);
    } catch (error) {
        console.error('❌ Failed to send message:', error.response ? error.response.data : error.message);
    }
}

// ✅ Root Endpoint Status
app.get('/', (req, res) => {
    res.send('✅ Whale Tracker is Running...');
});

// ✅ Endpoint Test kirim ke Telegram
app.get('/test', async (req, res) => {
    await sendToTelegram(whaleData);
    res.send('✅ Test message sent to Telegram!');
});

// ✅ Run Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

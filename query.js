const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { query, data } = req.body;

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Data: ${JSON.stringify(data)}\nQuery: ${query}`,
        max_tokens: 150,
      });

      res.status(200).json({ response: response.data.choices[0].text });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao consultar a API da OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};

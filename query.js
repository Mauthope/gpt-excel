const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { query, data } = req.body;
  const prompt = `Responda a seguinte consulta baseada nos dados do Excel: ${query}\n\n${JSON.stringify(data)}`;

  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sk - proj - uqNtPd91tKlIRwQ02M3oT3BlbkFJCfIZdLgEWVNTAfInnStK
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 150
    })
  });

  const result = await response.json();
  res.status(200).json({ response: result.choices[0].text.trim() });
};

export default async function handler(req, res) {
  const { msg } = req.body;

  // Use a Promise to wait for the setTimeout to complete
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Send the response after the delay
  res.status(200).json({ name: 'John Doe', msg: msg });
}

export default function handler(req, res) {
  res.status(200).json({
    message: "JavaScript handler works!",
    timestamp: new Date().toISOString()
  });
}

export default function handler(_req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'mkgp-dev public backend.' });
}
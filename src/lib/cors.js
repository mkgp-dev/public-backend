export function corsModify(res) {
    const source = process.env.CLIENT_URL;
    if (source) {
        res.setHeader('Access-Control-Allow-Origin', source);
        res.setHeader('Vary', 'Origin');
    }

    res.setHeader('Access-Get-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
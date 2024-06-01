export async function GET(req: Request) {
    const authorization = req.headers.get('authorization')
    console.log(authorization);
    return await fetch('http://localhost:8000/api/logout', {
        method: 'GET',
    });
}
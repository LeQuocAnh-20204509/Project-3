
export async function POST(req: Request) {
    const formData = await req.formData();
    return await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: formData,
    });
}

export async function POST(req: Request) {
    const formData = await req.formData();
    return await fetch(process.env.BACKEND_API_ENDPOINT + '/api/login', {
        method: 'POST',
        body: formData,
    });
}
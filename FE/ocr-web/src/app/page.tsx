import LoginAccount from "@/components/login-form";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export default function Home() {

    const auth_token = cookies().get('auth_token');
    if (!auth_token) {
        redirect('/login');
    }
    return (
        <>
            home page
        </>
    );
}

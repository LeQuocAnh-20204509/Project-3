import React from 'react';
import LoginAccount from "@/components/login-form";
import {signIn} from "@/auth";

const Page = () => {
    return (
        <div className={'h-screen flex justify-center items-center'}>
                <LoginAccount/>

        </div>
    );
};

export default Page;
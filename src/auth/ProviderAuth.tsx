import {useState} from "react";

export default function ProviderAuth() {
    const [user, setUser] = useState("");

    const signin = (cb: any) => {
        return fakeAuth.signin(() => {
            setUser('user');
            cb();
        });
    };

    const signout = (cb: any) => {
        return fakeAuth.signout(() => {
            setUser("");
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}

const fakeAuth = {
    isAuthenticated: false,
    signin(cb: any) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: any) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};
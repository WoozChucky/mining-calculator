import {useHistory, useLocation} from "react-router-dom";
import ProviderAuth from "../auth/ProviderAuth";

export default function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let auth = ProviderAuth();

    let { from } : any = location.state || { from: { pathname: "/" } };
    let login = () => {
        auth.signin(() => {
            history.replace(from);
        });
    };

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    );
}
import {Redirect, Route} from "react-router-dom";
import ProviderAuth from "../auth/ProviderAuth";

// @ts-ignore
export default function PrivateRoute({ children, ...rest}) {

    const auth = ProviderAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
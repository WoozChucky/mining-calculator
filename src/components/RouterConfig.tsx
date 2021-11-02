import {Route} from "react-router-dom";
import HomePage from "../pages/HomePage";
import CalculatorPage from "../pages/CalculatorPage";
import LoginPage from "../pages/LoginPage";
import NoMatchPage from "../pages/NoMatchPage";

export const AppRoutes : AppRoute[] = [
    {
        path: '/',
        component: HomePage,
        exact: true
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/calculator',
        component: CalculatorPage,
        routes: [
            {
                path: '/calculator/test',
                component: LoginPage,
            }
        ]
    },
    {
        path: '*',
        component: NoMatchPage
    }
];

export function RouteWithSubRoutes(route: AppRoute) {
    return (
        <Route
            exact={route.exact}
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export interface AppRoute {
    path: string;
    component: any;
    exact?: boolean | undefined;
    routes?: AppRoute[];
}
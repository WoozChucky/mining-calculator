import React from "react";
import {Link, Switch} from "react-router-dom";
import CoinbaseClient from "../adapters/http/CoinbaseClient";
import {AppRoute, RouteWithSubRoutes} from "../components/RouterConfig";
import {Currency} from "../model/Currency";
import EthermineClient from "../adapters/http/EthermineClient";

interface IProps {
    routes?: AppRoute[]
    currency?: Currency
}

interface IState {
    price?: number;
    hashrate?: number;
    currency?: Currency
}

export default class CalculatorPage extends React.Component<IProps, IState> {

    private readonly coinbase: CoinbaseClient = new CoinbaseClient();
    private readonly etherchain: EthermineClient = new EthermineClient();

    constructor(props: IProps) {
        super(props);
        this.state = {
            price: 0,
            hashrate: 0,
            currency: 'EUR'
        };
    }

    render() {

        return (
            <div>
                <h2>1 ETH - {this.state.price} {this.state.currency}</h2>
                <h3>Network Hashrate - {Number(this.state.hashrate! / 1000000000000).toFixed(2)} TH/s</h3>
                <ul>
                    <li>
                        <Link to="/calculator/test">Bus</Link>
                    </li>
                    <li>
                        <Link to="/calculator/cart">Cart</Link>
                    </li>
                </ul>

                <Switch>
                    {this.props.routes!.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>

            </div>
        );
    }

    async componentDidMount() {
        console.log('componentDidMount');

        const price = await this.coinbase.getEthereumPrice("EUR");
        const rate = await this.etherchain.getCurrentHashrate();

        this.setState(
            {
                price: price,
                hashrate: rate
            }
        );
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log('componentDidCatch');
    }
}
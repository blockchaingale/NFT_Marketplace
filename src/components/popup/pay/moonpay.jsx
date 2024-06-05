import { MoonPayBuyWidget } from '@moonpay/moonpay-react';

const Moonpay = () => {
    return (
        <MoonPayBuyWidget
            variant="overlay"
            onLogin={() => console.log('Customer logged in to MoonPay!')}
            baseCurrencyCode="usd"
            quoteCurrencyCode="matic"
            quoteCurrencyAmount="50"
        />
    );
}

export default Moonpay;

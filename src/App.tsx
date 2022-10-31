import React, { useEffect, useState } from "react";
import "./App.css";
import Row from "./components/Row";
import { setCurrencyOptions } from "./features/currencySlice";
import { useDispatch } from "react-redux";
import moment from "moment";

function App() {
  const dispatch = useDispatch();
  const [fromCurrency, setFromCurrency] = useState<string>("gbp");
  const [toCurrency, setToCurrency] = useState<string>("eur");
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [amount, setAmount] = useState<string>("1");
  const [amountFromCurrency, setAmountFromCurrency] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const BASE_URL = `http://www.floatrates.com/daily/${fromCurrency}.json`;

  let fromAmount: string, toAmount: string;

  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = (Number(amount) * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (Number(amount) / exchangeRate).toFixed(2);
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setLastUpdated(data[toCurrency].date);

        dispatch(setCurrencyOptions([fromCurrency, ...Object.keys(data)]));

        setExchangeRate(data[toCurrency].rate);
      });
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setAmountFromCurrency(true);
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setAmountFromCurrency(false);
  };

  return (
    <div className="App">
      <h2>Currency Converter</h2>
      <div>
        <h4>
          {fromAmount} {fromCurrency.toUpperCase()} equals {toAmount}{" "}
          {toCurrency.toUpperCase()}
        </h4>
        <p>{moment(lastUpdated).format("LLL")}</p>
      </div>
      <Row
        selectedCurrency={fromCurrency}
        handleOnChange={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        amountOnChange={handleFromAmountChange}
      />
      <br />
      <Row
        selectedCurrency={toCurrency}
        handleOnChange={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        amountOnChange={handleToAmountChange}
      />
    </div>
  );
}

export default App;

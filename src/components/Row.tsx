import React, { ChangeEventHandler } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type Props = {
  selectedCurrency: string;
  amount: string;
  handleOnChange: ChangeEventHandler<HTMLSelectElement>;
  amountOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Row({
  selectedCurrency,
  handleOnChange,
  amount,
  amountOnChange,
}: Props) {
  const currency = useSelector(
    (state: RootState) => state.currency.currencyOptions
  );

  return (
    <div>
      <input type="number" value={amount} onChange={amountOnChange} />
      <select
        defaultValue={selectedCurrency}
        value={selectedCurrency}
        onChange={handleOnChange}
      >
        {currency
          .slice()
          .sort()
          .map((country: string) => (
            <option key={country} value={country}>
              {country.toUpperCase()}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Row;

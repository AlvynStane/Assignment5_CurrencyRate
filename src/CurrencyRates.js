import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const CurrencyRates = () => {
  const [rates, setRates] = useState([]);
  const API_KEY = '5a7cf25eeb284305b8320e02b9415874';
  const BASE_CURRENCY = 'USD';
  
  useEffect(() => {
      const currencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];
      const fetchRates = async () => {
          try {
        const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&base=${BASE_CURRENCY}`);
        const fetchedRates = response.data.rates;

        const currencyData = currencies.map(currency => {
            const exchangeRate = fetchedRates[currency];
            return {
                currency,
                weBuy: parseFloat((exchangeRate * 1.05).toFixed(4)),
                exchangeRate: parseFloat(exchangeRate).toFixed(6),
                weSell: parseFloat((exchangeRate * 0.95).toFixed(4)),
            };
        });

        setRates(currencyData);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    };

    fetchRates();
  }, [API_KEY]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(rate => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy}</td>
              <td>{rate.exchangeRate}</td>
              <td>{rate.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rates are based from 1 USD</p>
      <p>This application uses API from https://currencyfreaks.com.</p>
    </div>
  );
};

export default CurrencyRates;
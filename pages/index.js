import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [cryptoNameInput, setCryptoNameInput] = useState('');
  const [currencyInput, setCurrencyInput] = useState('');

  useEffect(() => { return undefined; }); // This is a hack to get rid of the warning

  const addPriceHandler = async (e, cryptoName, currency) => {
    e.preventDefault(); // Prevents the page from refreshing

    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=${currency}`);
      const price = response.data[cryptoName][currency];
      setData([...data, { cryptoName, currency, price }]);// 
    } catch (error) {
      console.log(error);
      alert('Something went wrong. Make sure to enter a valid crypto name and currency.');
    }

    setCryptoNameInput('');// Clear the input field after the user submits 
    setCurrencyInput('');// Clear the input fields after the user submits
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Prices</title>
        <meta name="description" content="Crypto Prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className={styles['input-container']}>
        <input type="text" name="cryptoName" placeholder="Enter a crypto name" value={cryptoNameInput} onChange={(e) => setCryptoNameInput(e.target.value)} />
        <input type="text" name="currency" placeholder="Enter a currency" value={currencyInput} onChange={(e) => setCurrencyInput(e.target.value)} />
        <button type="submit" onClick={(e) => addPriceHandler(e, cryptoNameInput, currencyInput)}>Add Price</button>
      </form>

      {
        data.map((cryptoObject, index) => {
          console.log(index);
          return (
            <div className={styles['currency-container']} key={index}>
              <h2 className={styles.spacing}>{cryptoObject.cryptoName}</h2>
              <h3 className={styles.spacing}>{cryptoObject.price}</h3>
              <h3>{cryptoObject.currency}</h3>
            </div>
          );
        })
      }
    </div>
  );


}







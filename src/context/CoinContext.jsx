import { createContext, useEffect, useState } from "react";
import { getCryptos } from "../services/crypto.service";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);

    const fetchAllCoin = async () => {
        try {
            const response = await getCryptos();
            setAllCoin(response.data.cryptos);  
        } catch (error) {
            console.error("Erreur lors de la récupération des cryptomonnaies:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchAllCoin();
        }, 10000);

        return () => clearInterval(intervalId); 
    }, []); 

    const contextValue = {
        allCoin
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;

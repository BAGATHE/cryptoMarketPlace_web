import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';

const ReactChart = ({ initialPrice = 100, interval = 10000,cryptoName = 'Bitcoin' }) => {
  const [data, setData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(initialPrice); // État pour le prix actuel
  const [currentDate, setCurrentDate] = useState(new Date()); // État pour la date actuelle

  // Fonction pour générer un nouveau prix aléatoire
  const generateNewPrice = (currentPrice) => {
    const percentageChange = Math.random() * 10 - 5; // Variation entre -5% et +5%
    const newPrice = currentPrice + (currentPrice * percentageChange) / 100;
    return Math.max(newPrice, 0); // Empêche un prix négatif
  };

  useEffect(() => {
    const startTime = new Date(); // Heure de début
    setData([{ time: startTime, price: initialPrice }]);

    const updateInterval = setInterval(() => {
      setData((prevData) => {
        const lastPrice = prevData[prevData.length - 1]?.price || initialPrice;
        const newPrice = generateNewPrice(lastPrice);
        const currentTime = new Date();

          // Met à jour le prix actuel et la date
          setCurrentPrice(newPrice);
          setCurrentDate(currentTime);

        const updatedData = [...prevData, { time: currentTime, price: newPrice }];
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000); // 60 minutes en arrière

        // Supprime les données plus vieilles que 60 minutes
        return updatedData.filter((entry) => entry.time >= oneHourAgo);
      });
    }, interval);

    return () => clearInterval(updateInterval); // Nettoyage à la désinstallation du composant
  }, [initialPrice, interval]);

  // Configuration du graphique
  const config = {
    data,
    xField: 'time',
    yField: 'price',
    style:{
        fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
    },
    xAxis: {
      type: 'time',
      tickCount: 12, // Divise l'axe en intervalles de 5 minutes
      label: {
        formatter: (value) => new Date(value).toLocaleTimeString(),
      },
    },
    yAxis: {
      label: {
        formatter: (value) => `$${parseFloat(value).toFixed(2)}`, // Formatage en dollars
      },
    },
    areaStyle: {
      fill: 'l(270) 0:#e6f7ff 1:#1890ff', // Dégradé bleu
    },
    line: {
      style: {
        stroke: '#1890ff',
        strokeWidth: 2,
      },
    },
    smooth: true, // Ligne lissée
  };

  return (
    <div>
      <h2>Graphique des Cours en Temps Réel
        <br />   
    <span style={{color:'crimson'}}> 
         {cryptoName} - Prix Actuel : ${currentPrice.toFixed(2)} - Date : {currentDate.toLocaleString()}
    </span>
      </h2>
      <Area {...config} />
    </div>
  );
};

export default ReactChart;

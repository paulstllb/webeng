import React, { useState, useEffect } from 'react';
import styles from './RSS.module.css';

type NewsItem = {
  title: string;
  firstSentence: string;
  shareURL: string;
  teaserImage: {
    alttext: string;
    copyright: string;
    imageVariants: {
      [variant: string]: string;
    };
    type: string;
  };
};

type NewsAPIResponse = {
  articles: {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
  }[];
};


//Tagesschau Fetch
function RSSFeed() {
  const [tagesschauItems, setTagesschauItems] = useState<NewsItem[]>([]);
  const [newsAPIItems, setNewsAPIItems] = useState<NewsAPIResponse['articles']>([]);

  useEffect(() => {
    const fetchTagesschauFeed = async () => {
      try {
        const response = await fetch(
          'https://www.tagesschau.de/api2/news/?regions=1&ressort=inland'
        );
        const data = await response.json();
        
        setTagesschauItems(data.news);
      } catch (error) {
        console.error('Fehler beim Abrufen des Tagesschau-Feeds:', error);
      }
    };

    fetchTagesschauFeed();
  }, []);


  //News API Fetch
  useEffect(() => {
    const fetchNewsAPI = async () => {
      try {
        //API KEy sollte im BAckend sein konnte wegen mangelnder Zeit nicht mehr implemntiert werdeb
        const apiKey = '99eda33ee1c640fc97286eaefa2d06c6';
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setNewsAPIItems(data.articles);
      } catch (error) {
        console.error('Fehler beim Abrufen der NewsAPI:', error);
      }
    };

    fetchNewsAPI();
  }, []);

  // nur die Top 10 Nachrichten von jeder API
  const displayedTagesschauItems = tagesschauItems.slice(0, 10);
  const displayedNewsAPIItems = newsAPIItems.slice(0, 10);

  const openURL = (url: string) => {
    window.open(url, '_blank');
  };


  //Anzeigen der Wetter Daten
  return (
    <div>
      <div className={`${styles['news-container']} ${styles['tagesschau-container']}`}>
        <h2>Tagesschau</h2>
        {displayedTagesschauItems.map((item, index) => (
          <div className={styles['news-item']} key={index} onClick={() => openURL(item.shareURL)}>
            <div
              className={styles['news-image']}
              style={{
                backgroundImage: `url(${item.teaserImage.imageVariants['1x1-840']})`,
              }}
            />
            <h3 className={styles['news-title']}>{item.title}</h3>
            <p className={styles['news-first-sentence']}>{item.firstSentence}</p>
          </div>
        ))}
      </div>

      <div className={styles['news-container']}>
        <h2>NewsAPI</h2>
        {displayedNewsAPIItems.map((item, index) => (
          <div
            className={styles['news-item']}
            key={index}
            onClick={() => openURL(item.url)}
          >
            <div
              className={styles['news-image']}
              style={{ backgroundImage: `url(${item.urlToImage}})`  }}
            />
           
            <h3 className={styles['news-title']}>{item.title}</h3>
            <p className={styles['news-first-sentence']}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RSSFeed;

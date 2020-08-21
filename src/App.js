import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alanKey = '';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true}) : number;
                  const article = articles[parsedNumber - 1];

                  if (parsedNumber > 20) {
                    alanBtn().playText('Please try that again.');
                  } else if(article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                  }

                  window.open(articles[number].url, '_blank');
                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://cdn.dribbble.com/users/32512/screenshots/4787574/light_ai_design_by_gleb.gif" className={classes.alanLogo} alt="alan logo"></img>

            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;

import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alanKey = '';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles(); 
    
    useEffect(() => {
        alanBtn({
            key: alanKey,  
            onCommand: ({ command, articles }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                }
            }
        })
    }, [])
    
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://cdn.dribbble.com/users/32512/screenshots/4787574/light_ai_design_by_gleb.gif" className={classes.alanLogo} alt="alan logo"></img>

            </div>
            <NewsCards articles={newsArticles} />
        </div>
    )
}

export default App;
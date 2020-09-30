import express from 'express';
import { launchCrawlerCluster, runTranslation } from '../crawler/crawler';
import { TranslatedText } from '../crawler/types';
import { PORT } from './consts';

const app = express();

(async () => {
  const translationCrawlerCluster = await launchCrawlerCluster();
  
  //Catches requests made to localhost:3000/search
  app.get('/translate', async (request, response) => {
    if (typeof request.query.text === 'string') {
      const translatedText: TranslatedText = await runTranslation(translationCrawlerCluster, request.query.text); 
      response.send(translatedText);
    } else {
      response.send('error')
    }
  });

  app.get('/', (req: any, res: any) => res.send('Papago proxy'));
  
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
})();

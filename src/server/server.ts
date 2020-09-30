import express from 'express';
import cors from 'cors';
import { launchCrawlerCluster, runTranslation } from '../crawler/crawler';
import { TranslatedText } from '../crawler/types';
import { PORT } from './consts';

const app = express();
app.use(cors());

(async () => {
  const translationCrawlerCluster = await launchCrawlerCluster();
  
  //Catches requests made to localhost:3000/search
  app.get('/translate', async ({ query: { text, wait_for_msecs }}, response) => {
    console.log(`incoming: ${text}`)
    if (
      typeof text === 'string' && 
      text.trim().length > 0
    ) {
      const translatedText: TranslatedText = await runTranslation(translationCrawlerCluster, text, {
        waitForMSecs: wait_for_msecs === undefined ? undefined : Number(wait_for_msecs),
      });
      response.status(200).send({
        text: translatedText,
      })
    } else {
      response.status(500).send({
        text: 'error'
      });
    }
  });

  app.get('/', (req: any, res: any) => res.send('Papago proxy server'));
  
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
})();

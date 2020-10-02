import { NowRequest, NowResponse } from '@vercel/node'
import { launchCrawler, runTranslationOnPage } from '../crawler/crawler';
import { TranslatedText } from '../crawler/types';

export default async (request: NowRequest, response: NowResponse) => {
  const { text, wait_for_msecs } = request.query;
  const browser = await launchCrawler();
  const page = await browser.newPage();
  if (
    typeof text === 'string' && 
    text.trim().length > 0 
  ) {
    const translatedText: TranslatedText = await runTranslationOnPage(page, text, {
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
}

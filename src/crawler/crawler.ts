import { Cluster } from 'puppeteer-cluster';
import { Consts } from './constants';
import { IncomingText, TaskFunctionArguments, TranslatedText, TranslationCrawlerCluster } from './types';
import { waitForNetworkIdle } from './util';

export const launchCrawlerCluster: () => Promise<TranslationCrawlerCluster> = async () => 
  Cluster.launch({
    puppeteerOptions: {
      headless: false,
      defaultViewport: null, 
    },
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: Consts.CONFIG.MAX_CONCURRENCY,
  });

export const runTranslation = async (cluster: TranslationCrawlerCluster, incomingText: IncomingText) => {
  await cluster.task(async ({ page, data: incomingText }: TaskFunctionArguments<IncomingText>) => {
    await page.goto(Consts.URLs.PAPAGO, { waitUntil : ['load', 'domcontentloaded']});
    await page.waitForSelector(Consts.IDs.INCOMING_TEXT_INPUT_ID);
    await page.type(Consts.IDs.INCOMING_TEXT_INPUT_ID, incomingText);
    await waitForNetworkIdle(page, 500, 0);
    const translatedText: TranslatedText | null = await page.$eval(Consts.IDs.TRANSLATED_TEXT_ID, el => el.textContent);

    return translatedText === null ? Consts.ERROR_TEXT_NOT_FOUND : translatedText;
  });

  const translatedText = await cluster.execute(incomingText);
  
  await cluster.idle();

  return translatedText;
}  

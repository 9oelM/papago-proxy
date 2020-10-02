import { LaunchOptions } from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';
import { Consts } from './constants';
import { runTranslationOnPage } from './crawler';
import { IncomingText, TaskFunctionArguments, TranslationCrawlerCluster, TranslationOptions } from './types';

export const launchCrawlerCluster: (launchOptions?: LaunchOptions) => Promise<TranslationCrawlerCluster> = async (launchOptions) => 
  Cluster.launch({
    puppeteerOptions: {
      headless: false,
      defaultViewport: null, 
      ...launchOptions,
    },
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: Consts.CONFIG.MAX_CONCURRENCY,
  });

export const runTranslation = async (cluster: TranslationCrawlerCluster, incomingText: IncomingText, options?: TranslationOptions) => {
  await cluster.task(async ({ page, data: incomingText }: TaskFunctionArguments<IncomingText>) => runTranslationOnPage(page, incomingText, options));

  const translatedText = await cluster.execute(incomingText);
  
  await cluster.idle();

  return translatedText;
}

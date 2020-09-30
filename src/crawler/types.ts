import { Page } from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';

export type IncomingText = string
export type TranslatedText = string

export type TranslationCrawlerCluster = Cluster<IncomingText, TranslatedText>

export interface TaskFunctionArguments<JobData> {
  page: Page;
  data: JobData;
  worker: {
      id: number;
  };
}
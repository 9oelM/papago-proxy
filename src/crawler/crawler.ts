import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import { Consts } from './constants';
import { IncomingText, InputElement, TranslatedText, TranslationOptions } from './types';
import { waitForNetworkIdle } from './util';

export const launchCrawler = async () =>
  puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

export const runTranslationOnPage = async (page: puppeteer.Page, incomingText: IncomingText, options?: TranslationOptions) => {
  await page.goto(Consts.URLs.PAPAGO, { waitUntil : ['load', 'domcontentloaded']});
  await page.waitForSelector(Consts.IDs.INCOMING_TEXT_INPUT_ID);
  await page.$eval(Consts.IDs.INCOMING_TEXT_INPUT_ID, (el: InputElement, incomingTextInsideEval) => {
    el.value = incomingTextInsideEval
  }, incomingText);
  await page.type(Consts.IDs.INCOMING_TEXT_INPUT_ID, Consts.ENTER);
  await waitForNetworkIdle(
    page, 
    options?.waitForMSecs !== undefined ? options.waitForMSecs : Consts.DEFAULT_WAIT_MSECS, 
    0,
  );
  const translatedText: TranslatedText | null = await page.$eval(Consts.IDs.TRANSLATED_TEXT_ID, el => el.textContent);
  return translatedText === null || translatedText.trim() === '' ? Consts.ERROR_TEXT_NOT_FOUND : translatedText;
}

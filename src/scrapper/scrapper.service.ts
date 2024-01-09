import { Injectable } from '@nestjs/common';
// import * as puppeteer from 'puppeteer-core';
// import chrome from 'chrome-aws-lambda';
import { ScrapperData } from './interface/scrapper.interface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ScrapperService {
  private chrome;
  private puppeteer;
  private options = {};
  constructor(private config: ConfigService) {}
  async getDataProducstByPuppeteer(
    productSearch: string,
  ): Promise<ScrapperData> {
    this.setConfiguration();
    let data = null;

    const browser = await this.puppeteer.launch(this.options);
    const page = await browser.newPage();
    await page.goto(`${this.config.get('URLSCRAPPER')}${productSearch}`);

    const content = await page.$$('li.ui-search-layout__item');
    if (!content || content.length !== 0) {
      const post = content[0];

      const title = await post.$eval('h2', (h2) => h2.textContent || '');
      const price = await post.$eval(
        'span.andes-money-amount__fraction',
        (span) => span.textContent || '',
      );
      const postLink = await post.$eval(
        'a',
        (a) => a.getAttribute('href') || '',
      );
      let imgLink = '';

      try {
        imgLink = await post.$eval(
          'img',
          (img) => img.getAttribute('data-src') || '',
        );
      } catch {
        imgLink = await post.$eval(
          'img',
          (img) => img.getAttribute('src') || '',
        );
      }

      data = {
        title,
        price: price.replace('.', '').replace(',', '.'),
        postLink,
        imgLink,
      };
    }

    await browser.close();
    return data;
  }

  private async setConfiguration(): Promise<void> {
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION === 'true') {
      console.log('lalala', process.env.AWS_LAMBDA_FUNCTION_VERSION);
      this.chrome = require('chrome-aws-lambda');
      this.puppeteer = require('puppeteer-core');
      this.options = {
        args: [
          ...this.chrome.args,
          '--hide-scrollbars',
          '--disable-web-security',
        ],
        defaultViewport: this.chrome.defaultViewport,
        executablePath: await this.chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      };
    } else {
      this.puppeteer = require('puppeteer');
    }
  }
}

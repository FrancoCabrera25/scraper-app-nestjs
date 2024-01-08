import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ScrapperData } from './interface/scrapper.interface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ScrapperService {
  constructor(private config: ConfigService) {}
  async getDataProducstByPuppeteer(
    productSearch: string,
  ): Promise<ScrapperData> {
    let data = null;
    const browser = await puppeteer.launch({
      headless: 'new',
    });
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
}

import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

const productsSearch = [
  'dulce-de-leche-clásico-la-serenísima-400',
  'leche-entera-larga-vida-x-1-l-tregar',
  'Arroz Oro Parboil Gallo X1 Kg',
  'Fideos Tallarín Don Vicente 500g',
  'Azucar Ledesma Clásica Paquete De 1 Kilo',
  'Cafe instantaneo sustentable Arlistán mediano',
  'Yerba Mate Playadito Suave 500grs.',
  'Harina De Trigo ultra refinada 0000 Pureza 1 Kg todos los usos',
  'Sal Fina Celusal - Salero 500 Grs. Libre De Gluten Sin Tacc',
  'Aceite de girasol Lira botella900 ml',
  'Gaseosa Coca-cola Sabor Original 2,25 Lt',
  'Cerveza Quilmes Lata 473ml Clasica Pack X6',
  'Dulce De Batata en lata 700 g',
];
@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer() {
    const data: any[] = [];
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();

    for (const title of productsSearch) {
      await page.goto(
        `https://listado.mercadolibre.com.ar/supermercado/${title}`,
      );

      const content = await page.$$('li.ui-search-layout__item');
      if (!content || content.length !== 0) {
        console.log('\nTerminó el scraping.');
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

        const postData = {
          title,
          price,
          postLink,
          imgLink,
        };

        data.push(postData);
      }
    }

    await browser.close();
    return data;
  }
}

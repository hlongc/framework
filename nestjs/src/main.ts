// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// const bootstrap = async () => {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3344);
// };

// bootstrap();
import axios from 'axios';
import * as cheerio from 'cheerio';
import xlsx from 'node-xlsx';
import * as fs from 'fs';
axios
  .get('http://quotes.money.163.com/f10/zycwzb_600519.html#01c01')
  .then(async (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    let index = -1;
    $('.limit_sale .td_1').each(function (i) {
      if ($(this).text().includes('扣除非经常性损益后')) {
        index = i;
      }
    });
    const header = [];
    const data = [];
    $('.limit_sale.scr_table tr').each(function (i) {
      if (i === 0) {
        $(this)
          .find('th')
          .each(function () {
            header.push($(this).text());
          });
      }
      if (i === index + 1) {
        // 左边少一个表头，所以+1
        $(this)
          .find('td')
          .each(function () {
            data.push($(this).text());
          });
      }
    });
    const conf = {
      name: '',
      cols: [],
      rows: [],
    };
    conf.name = 'maotai'; //表格名
    //决定列名和类型
    conf.cols = header.map((caption) => ({ caption, type: 'string' }));
    conf.rows = data; //填充数据
    const config = [
      {
        name: '茅台',
        data: [header, data],
      },
    ];
    const buffer = xlsx.build(config);
    fs.writeFile('maotai.xlsx', buffer, (err) => {
      if (err) throw err;
    });
  });

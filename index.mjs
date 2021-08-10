import fetch from 'node-fetch';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const scraping = async ( page ) => {
  const reqUrl = 'https://www.green-japan.com/search_key/01?key=s3md1a97wye41k2o8y8i&keyword=&page=' + page
  const wanted = '.job-offer-icon'
  const title = '.card-info__detail-area__box__title'
  const info1 = '.card-info__detail-area__box__sub-title>span:nth-child(1)'
  const info2 = '.card-info__detail-area__box__sub-title>span:nth-child(2)'
  const info3 = '.card-info__detail-area__box__sub-title>span:nth-child(3)'

  const res = await fetch( reqUrl )
  const html = await res.text()
  const dom = new JSDOM( html )
  const document = dom.window.document
  const nodes = document.querySelectorAll( `${wanted},${title},${info1},${info2},${info3}` )
  const tokyoWeathers = Array.from(nodes, td => td.textContent.trim());    
  return tokyoWeathers
}

(async () => {
  const MAX_PAGE = 40
  for( let i=1; i<MAX_PAGE; i++) {
    console.log( `PAGE:${i}` )
    let result = await scraping( i )
    console.log( result )
  }
})()
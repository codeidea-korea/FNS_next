const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const axios = require('axios');
// import fs from 'fs';
// import axios from 'axios';
// import {SitemapStream, streamToPromise} from 'sitemap';

// 사이트 URL 설정
const baseUrl = 'https://www.fashionandstyle.com';
// const sitemapPath = 'C:/Users/codeidea/IdeaProjects/FNS_react/sitemap.xml';
// const sitemapPath = '/home/fns_renew/www/sitemap.xml';
const sitemapPath = '/home/fasweb/fas_web/public/sitemap.xml';

async function getUrlsAPI() {
    const response = await axios.get('https://api.fashionandstyle.com/api/v1/sitemap/list', {
        headers: {
            'system-key': '23009A6381E37EE7F041E0FE5483D33652201022A00D14AC3A454F6665548142'
        }
    });

    return response.data.data; // API 응답에서 URL 목록 추출
}

async function generateSitemap() {
    const sitemapData = await getUrlsAPI();
    const now = new Date();

    const sitemapArr = [
         { 'url' : '','lastmod' : now }
        ,{ 'url' : '/','lastmod' : now }
        // ,{ 'url' : '/index.html','lastmod' : now }
        ,{ 'url' : '/home/10001','lastmod' : now }
        ,{ 'url' : '/home/10002','lastmod' : now }
        ,{ 'url' : '/home/10003','lastmod' : now }
        ,{ 'url' : '/foryou','lastmod' : now }
        ,{ 'url' : '/mypage','lastmod' : now }
        ,{ 'url' : '/service','lastmod' : now }
        ,{ 'url' : '/privacy','lastmod' : now }
        ,{ 'url' : '/protection','lastmod' : now }
    ];

    sitemapData.forEach(data => {
        sitemapArr.push(
            { 'url' : data?.url,'lastmod' : now }
        );
    });

    // 사이트맵 스트림 생성
    const sitemap = new SitemapStream({hostname: baseUrl});

    // URL 목록을 스트림에 추가
    sitemapArr.forEach(arrData => sitemap.write(arrData));

    sitemap.end();

    // 사이트맵 XML을 지정된 위치에 저장
    const xmlString = (await streamToPromise(sitemap)).toString();
    fs.writeFileSync(sitemapPath, xmlString);
}

generateSitemap().then(() => console.log('Sitemap generated!')).catch(err => console.error(err));
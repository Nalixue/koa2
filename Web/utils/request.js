import mockList from './mockList';

export default async function request(url) {
    // 如果未开启 mock 直接返回
    // if(!__IS_MOCK__) return await fetch(url).then(i => i.json())
    const res = mockList.filter(item => item.url === url);
    return res[0].data || (await fetch(url).then(i => i.json()));
}
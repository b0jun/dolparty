/* eslint-disable no-await-in-loop */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function batchPromises<T>(items: T[], batchSize: number, fn: (item: T) => Promise<any>) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(fn));
  }
}

async function main() {
  const contestants = [
    { number: 1, name: '박시진', difficulty: 'D1', gender: 'Men' },
    { number: 2, name: '박철우', difficulty: 'D1', gender: 'Men' },
    { number: 3, name: '김우영', difficulty: 'D1', gender: 'Men' },
    { number: 4, name: '이장성', difficulty: 'D1', gender: 'Men' },
    { number: 5, name: '성영기', difficulty: 'D1', gender: 'Men' },
    { number: 6, name: '김현', difficulty: 'D1', gender: 'Men' },
    { number: 7, name: '이호준', difficulty: 'D1', gender: 'Men' },
    { number: 8, name: '최원철', difficulty: 'D1', gender: 'Men' },
    { number: 9, name: '이원석', difficulty: 'D1', gender: 'Men' },
    { number: 10, name: '김세정', difficulty: 'D1', gender: 'Men' },
    { number: 11, name: '목정민', difficulty: 'D1', gender: 'Men' },
    { number: 12, name: '윤대식', difficulty: 'D1', gender: 'Men' },
    { number: 13, name: '김대언', difficulty: 'D1', gender: 'Men' },
    { number: 14, name: '장성욱', difficulty: 'D1', gender: 'Men' },
    { number: 15, name: '최민건', difficulty: 'D2', gender: 'Men' },
    { number: 16, name: '박부기', difficulty: 'D2', gender: 'Men' },
    { number: 17, name: '주현호', difficulty: 'D2', gender: 'Men' },
    { number: 18, name: '곽민수', difficulty: 'D2', gender: 'Men' },
    { number: 19, name: '송현수', difficulty: 'D2', gender: 'Men' },
    { number: 20, name: '정세원', difficulty: 'D2', gender: 'Men' },
    { number: 21, name: '박우영', difficulty: 'D2', gender: 'Men' },
    { number: 22, name: '이태웅', difficulty: 'D2', gender: 'Men' },
    { number: 23, name: '박형준', difficulty: 'D2', gender: 'Men' },
    { number: 24, name: '최영학', difficulty: 'D2', gender: 'Men' },
    { number: 25, name: '허세민', difficulty: 'D2', gender: 'Men' },
    { number: 26, name: '방삼혁', difficulty: 'D2', gender: 'Men' },
    { number: 27, name: '장태규', difficulty: 'D2', gender: 'Men' },
    { number: 28, name: '최형진', difficulty: 'D2', gender: 'Men' },
    { number: 29, name: '박재현', difficulty: 'D2', gender: 'Men' },
    { number: 30, name: '이승제', difficulty: 'D2', gender: 'Men' },
    { number: 31, name: '박시우', difficulty: 'D2', gender: 'Men' },
    { number: 32, name: '김민준', difficulty: 'D2', gender: 'Men' },
    { number: 33, name: '이건우', difficulty: 'D2', gender: 'Men' },
    { number: 34, name: '김태영', difficulty: 'D2', gender: 'Men' },
    { number: 35, name: '제현구', difficulty: 'D2', gender: 'Men' },
    { number: 36, name: '박류식', difficulty: 'D2', gender: 'Men' },
    { number: 37, name: '박창현', difficulty: 'D2', gender: 'Men' },
    { number: 38, name: '이상화', difficulty: 'D2', gender: 'Men' },
    { number: 39, name: '이영현', difficulty: 'D2', gender: 'Men' },
    { number: 40, name: '하다경', difficulty: 'D2', gender: 'Men' },
    { number: 41, name: '성재영', difficulty: 'D2', gender: 'Men' },
    { number: 42, name: '조혜진', difficulty: 'D2', gender: 'Men' },
    { number: 43, name: '최연주', difficulty: 'D2', gender: 'Men' },
    { number: 44, name: '임경륜', difficulty: 'D2', gender: 'Men' },
    { number: 45, name: '오재희', difficulty: 'D2', gender: 'Men' },
    { number: 46, name: '고동오', difficulty: 'D2', gender: 'Men' },
    { number: 47, name: '양동빈', difficulty: 'D2', gender: 'Men' },
    { number: 48, name: '채예준', difficulty: 'D2', gender: 'Men' },
    { number: 49, name: '김민성', difficulty: 'D2', gender: 'Men' },
    { number: 50, name: '최일해', difficulty: 'D2', gender: 'Men' },
    { number: 51, name: '김용한', difficulty: 'D3', gender: 'Men' },
    { number: 52, name: '강도엽', difficulty: 'D3', gender: 'Men' },
    { number: 53, name: '김도균', difficulty: 'D3', gender: 'Men' },
    { number: 54, name: '이호중', difficulty: 'D3', gender: 'Men' },
    { number: 55, name: '정찬영', difficulty: 'D3', gender: 'Men' },
    { number: 56, name: '박성현', difficulty: 'D3', gender: 'Men' },
    { number: 57, name: '배철민', difficulty: 'D3', gender: 'Men' },
    { number: 58, name: '박지원', difficulty: 'D3', gender: 'Men' },
    { number: 59, name: '김현수', difficulty: 'D3', gender: 'Men' },
    { number: 60, name: '성제욱', difficulty: 'D3', gender: 'Men' },
    { number: 61, name: '조재빈', difficulty: 'D3', gender: 'Men' },
    { number: 62, name: '이종연', difficulty: 'D3', gender: 'Men' },
    { number: 63, name: '김기용', difficulty: 'D3', gender: 'Men' },
    { number: 64, name: '서인재', difficulty: 'D3', gender: 'Men' },
    { number: 65, name: '백지원', difficulty: 'D3', gender: 'Men' },
    { number: 66, name: '강승훈', difficulty: 'D3', gender: 'Men' },
    { number: 67, name: '남치현', difficulty: 'D3', gender: 'Men' },
    { number: 68, name: '고동규', difficulty: 'D3', gender: 'Men' },
    { number: 69, name: '김수완', difficulty: 'D3', gender: 'Men' },
    { number: 70, name: '한성현', difficulty: 'D3', gender: 'Men' },
    { number: 71, name: '변진호', difficulty: 'D3', gender: 'Men' },
    { number: 72, name: '정국환', difficulty: 'D3', gender: 'Men' },
    { number: 73, name: '류재상', difficulty: 'D3', gender: 'Men' },
    { number: 74, name: '김태훈', difficulty: 'D3', gender: 'Men' },
    { number: 75, name: '김동현', difficulty: 'D3', gender: 'Men' },
    { number: 76, name: '윤원근', difficulty: 'D3', gender: 'Men' },
    { number: 77, name: '이지현', difficulty: 'D3', gender: 'Men' },
    { number: 78, name: '김효빈', difficulty: 'D3', gender: 'Men' },
    { number: 79, name: '남수민', difficulty: 'D3', gender: 'Women' },
    { number: 80, name: '정주현', difficulty: 'D3', gender: 'Women' },
    { number: 81, name: '예하진', difficulty: 'D3', gender: 'Women' },
    { number: 82, name: '이주희', difficulty: 'D3', gender: 'Women' },
    { number: 83, name: '이영광', difficulty: 'D3', gender: 'Women' },
    { number: 84, name: '윤원준', difficulty: 'D4', gender: 'Men' },
    { number: 85, name: '김태윤', difficulty: 'D4', gender: 'Men' },
    { number: 86, name: '강성원', difficulty: 'D4', gender: 'Men' },
    { number: 87, name: '김지광', difficulty: 'D4', gender: 'Men' },
    { number: 88, name: '김범식', difficulty: 'D4', gender: 'Men' },
    { number: 89, name: '이승호', difficulty: 'D4', gender: 'Men' },
    { number: 90, name: '박일선', difficulty: 'D4', gender: 'Men' },
    { number: 91, name: '이현일', difficulty: 'D4', gender: 'Men' },
    { number: 92, name: '강부현', difficulty: 'D4', gender: 'Men' },
    { number: 93, name: '김종섭', difficulty: 'D4', gender: 'Men' },
    { number: 94, name: '박상현', difficulty: 'D4', gender: 'Men' },
    { number: 95, name: '박주환', difficulty: 'D4', gender: 'Men' },
    { number: 96, name: '천기범', difficulty: 'D4', gender: 'Men' },
    { number: 97, name: '김태현', difficulty: 'D4', gender: 'Men' },
    { number: 98, name: '김지호', difficulty: 'D4', gender: 'Men' },
    { number: 99, name: '주한승', difficulty: 'D4', gender: 'Men' },
    { number: 100, name: '박세현', difficulty: 'D4', gender: 'Men' },
    { number: 101, name: '이민균', difficulty: 'D4', gender: 'Men' },
    { number: 102, name: '유근배', difficulty: 'D4', gender: 'Men' },
    { number: 103, name: '하석현', difficulty: 'D4', gender: 'Men' },
    { number: 104, name: '윤이헌', difficulty: 'D4', gender: 'Men' },
    { number: 105, name: '이예슬', difficulty: 'D4', gender: 'Women' },
    { number: 106, name: '박주빈', difficulty: 'D4', gender: 'Women' },
    { number: 107, name: '김주은', difficulty: 'D4', gender: 'Women' },
    { number: 108, name: '하문경', difficulty: 'D4', gender: 'Women' },
    { number: 109, name: '민초록', difficulty: 'D4', gender: 'Women' },
    { number: 110, name: '전희윤', difficulty: 'D4', gender: 'Women' },
    { number: 111, name: '김완선', difficulty: 'D4', gender: 'Women' },
    { number: 112, name: '박아현', difficulty: 'D4', gender: 'Women' },
    { number: 113, name: '김향선', difficulty: 'D4', gender: 'Women' },
    { number: 114, name: '차지은', difficulty: 'D4', gender: 'Women' },
    { number: 115, name: '전가을', difficulty: 'D4', gender: 'Women' },
    { number: 116, name: '문지원', difficulty: 'D4', gender: 'Women' },
    { number: 117, name: '조민아', difficulty: 'D4', gender: 'Women' },
    { number: 118, name: '길혜경', difficulty: 'D4', gender: 'Women' },
    { number: 119, name: '김한별', difficulty: 'D4', gender: 'Women' },
    { number: 120, name: '홍주영', difficulty: 'D4', gender: 'Women' },
    { number: 121, name: '이유미', difficulty: 'D4', gender: 'Women' },
    { number: 122, name: '김혜숙', difficulty: 'D4', gender: 'Women' },
    { number: 123, name: '김형은', difficulty: 'D4', gender: 'Women' },
  ];
  await batchPromises(contestants, 10, async contestant => {
    await prisma.contestant.upsert({
      where: { number: contestant.number },
      update: {},
      create: {
        number: contestant.number,
        name: contestant.name,
        difficulty: contestant.difficulty as 'D1' | 'D2' | 'D3' | 'D4' | 'D5',
        gender: contestant.gender as 'Men' | 'Women',
      },
    });
  });
  // const response = await Promise.all(
  //   contestants.map(contestant =>
  //     prisma.contestant.upsert({
  //       where: { number: contestant.number },
  //       update: {},
  //       create: {
  //         number: contestant.number,
  //         name: contestant.name,
  //         difficulty: contestant.difficulty as 'D1' | 'D2' | 'D3' | 'D4' | 'D5',
  //         gender: contestant.gender as 'Men' | 'Women',
  //       },
  //     }),
  //   ),
  // );

  // console.log(response);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

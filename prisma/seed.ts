/* eslint-disable no-await-in-loop */
import { Difficulty, Gender, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// async function batchPromises<T>(items: T[], batchSize: number, fn: (item: T) => Promise<any>) {
//   for (let i = 0; i < items.length; i += batchSize) {
//     const batch = items.slice(i, i + batchSize);
//     await Promise.all(batch.map(fn));
//   }
// }

async function main() {
  const contestants = [
    { number: '001', name: '박시진', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '002', name: '박철우', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '003', name: '김우영', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '004', name: '이장성', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '005', name: '성영기', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '006', name: '김현', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '007', name: '이호준', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '008', name: '최원철', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '009', name: '이원석', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '010', name: '김세정', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '011', name: '목정민', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '012', name: '윤대식', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '013', name: '김대언', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '014', name: '장성욱', difficulty: Difficulty.D1, gender: Gender.Men },
    { number: '015', name: '최민건', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '016', name: '박부기', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '017', name: '주현호', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '018', name: '곽민수', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '019', name: '송현수', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '020', name: '정세원', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '021', name: '박우영', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '022', name: '이태웅', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '023', name: '박형준', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '024', name: '최영학', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '025', name: '허세민', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '026', name: '방삼혁', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '027', name: '장태규', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '028', name: '최형진', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '029', name: '박재현', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '030', name: '이승제', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '031', name: '박시우', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '032', name: '김민준', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '033', name: '이건우', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '034', name: '김태영', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '035', name: '제현구', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '036', name: '박류식', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '037', name: '박창현', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '038', name: '이상화', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '039', name: '이영현', difficulty: Difficulty.D2, gender: Gender.Men },
    { number: '040', name: '조혜진', difficulty: Difficulty.D2, gender: Gender.Women },
    { number: '041', name: '최연주', difficulty: Difficulty.D2, gender: Gender.Women },
    { number: '042', name: '임경륜', difficulty: Difficulty.D2, gender: Gender.Women },
    { number: '043', name: '하다경', difficulty: Difficulty.D2, gender: Gender.Women },
    { number: '044', name: '성재영', difficulty: Difficulty.D2, gender: Gender.Women },
    { number: '045', name: '오재희', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '046', name: '고승오', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '047', name: '양동빈', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '048', name: '채예준', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '049', name: '김민성', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '050', name: '최일해', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '051', name: '김용한', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '052', name: '강도엽', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '053', name: '김도균', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '054', name: '이호중', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '055', name: '정찬영', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '056', name: '이지현', difficulty: Difficulty.D3, gender: Gender.Women },
    { number: '057', name: '박성현', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '058', name: '배철민', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '059', name: '김현수', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '060', name: '성제욱', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '061', name: '조재빈', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '062', name: '이종연', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '063', name: '김기용', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '064', name: '서인재', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '065', name: '강승훈', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '066', name: '백지원', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '067', name: '박지원', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '068', name: '남치현', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '069', name: '고동규', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '070', name: '김수완', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '071', name: '한성현', difficulty: Difficulty.D2, gender: Gender.Men }, // D3 -> D2
    { number: '072', name: '변진호', difficulty: Difficulty.D2, gender: Gender.Men }, // D3 -> D2
    { number: '073', name: '정국환', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '074', name: '류재상', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '075', name: '김태훈', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '076', name: '김동현', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '077', name: '윤원근', difficulty: Difficulty.D3, gender: Gender.Men },
    { number: '078', name: '이주희', difficulty: Difficulty.D3, gender: Gender.Women },
    { number: '079', name: '이영광', difficulty: Difficulty.D3, gender: Gender.Women },
    { number: '080', name: '예하진', difficulty: Difficulty.D3, gender: Gender.Women },
    { number: '081', name: '남수민', difficulty: Difficulty.D3, gender: Gender.Women },
    { number: '082', name: '정주현', difficulty: Difficulty.D3, gender: Gender.Women },
    { number: '083', name: '김효빈', difficulty: Difficulty.D3, gender: Gender.Women },
    { number: '084', name: '윤원준', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '085', name: '김태윤', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '086', name: '강성원', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '087', name: '김지광', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '088', name: '김범식', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '089', name: '이승호', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '090', name: '박일선', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '091', name: '이예슬', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '092', name: '박주빈', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '093', name: '김주은', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '094', name: '두경태', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '095', name: '서예진', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '096', name: '전희윤', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '097', name: '김완선', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '098', name: '이현일', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '099', name: '강부현', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '100', name: '김종섭', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '101', name: '박상현', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '102', name: '박주환', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '103', name: '천기범', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '104', name: '김태현', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '105', name: '주한승', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '106', name: '박세현', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '107', name: '이민균', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '108', name: '김지호', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '109', name: '유근배', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '110', name: '하석현', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '111', name: '윤이헌', difficulty: Difficulty.D4, gender: Gender.Men },
    { number: '112', name: '박아현', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '113', name: '김향선', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '114', name: '차지은', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '115', name: '전가을', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '116', name: '문지원', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '117', name: '조민아', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '118', name: '박준서', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '119', name: '김한별', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '120', name: '김아인', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '121', name: '이유미', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '122', name: '김혜숙', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '123', name: '김형은', difficulty: Difficulty.D4, gender: Gender.Women },
    { number: '124', name: '김별', difficulty: Difficulty.D4, gender: Gender.Women },
  ];

  const problems = [
    { name: '1', difficulties: [Difficulty.D4] },
    { name: '2', difficulties: [Difficulty.D4] },
    { name: '3', difficulties: [Difficulty.D4] },
    { name: '4', difficulties: [Difficulty.D4] },
    { name: '5', difficulties: [Difficulty.D4] },
    { name: '6', difficulties: [Difficulty.D4] },
    { name: '7', difficulties: [Difficulty.D4] },
    { name: '8', difficulties: [Difficulty.D3, Difficulty.D4] },
    { name: '9', difficulties: [Difficulty.D3, Difficulty.D4] },
    { name: '10', difficulties: [Difficulty.D3, Difficulty.D4] },
    { name: '11', difficulties: [Difficulty.D3] },
    { name: '12', difficulties: [Difficulty.D3] },
    { name: '13', difficulties: [Difficulty.D3] },
    { name: '14', difficulties: [Difficulty.D3] },
    { name: '15', difficulties: [Difficulty.D2, Difficulty.D3] },
    { name: '16', difficulties: [Difficulty.D2, Difficulty.D3] },
    { name: '17', difficulties: [Difficulty.D2, Difficulty.D3] },
    { name: '18', difficulties: [Difficulty.D2] },
    { name: '19', difficulties: [Difficulty.D2] },
    { name: '20', difficulties: [Difficulty.D2] },
    { name: '21', difficulties: [Difficulty.D2] },
    { name: '22', difficulties: [Difficulty.D1, Difficulty.D2] },
    { name: '23', difficulties: [Difficulty.D1, Difficulty.D2] },
    { name: '24', difficulties: [Difficulty.D1, Difficulty.D2] },
    { name: '25', difficulties: [Difficulty.D1] },
    { name: '26', difficulties: [Difficulty.D1] },
    { name: '27', difficulties: [Difficulty.D1] },
    { name: '28', difficulties: [Difficulty.D1] },
    { name: '29', difficulties: [Difficulty.D1] },
    { name: '30', difficulties: [Difficulty.D1] },
    { name: '31', difficulties: [Difficulty.D1] },
  ];
  // await batchPromises(contestants, 10, async contestant => {
  //   await prisma.contestant.upsert({
  //     where: { number: contestant.number },
  //     update: {},
  //     create: {
  //       number: contestant.number,
  //       name: contestant.name,
  //       difficulty: contestant.difficulty as Difficulty,
  //       gender: contestant.gender as Gender,
  //     },
  //   });
  // });

  for (const contestant of contestants) {
    await prisma.contestant.create({
      data: contestant,
    });
  }

  for (const problem of problems) {
    await prisma.problem.create({
      data: {
        name: problem.name,
        difficulties: problem.difficulties,
      },
    });
  }
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

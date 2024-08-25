'use client';

import { useRef } from 'react';

const Score = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const scrollToSection = (sectionRef: any) => {
    const offset = 50; // 원하는 여유 공간
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };
  return (
    <div className="w-full bg-black/80">
      <div className="text-center text-[36px] text-white">돌잔치 스코어보드</div>
      <div className="p-2">
        <ul className="sticky top-0 z-10 mx-auto flex h-[50px] w-[1110px] bg-red-300">
          <li className="flex-1">
            <button
              type="button"
              onClick={() => scrollToSection(section1Ref)}
              className="flex h-[50px] w-full items-center justify-center bg-white"
            >
              D-1
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              onClick={() => scrollToSection(section2Ref)}
              className="flex h-[50px] w-full items-center justify-center bg-white"
            >
              D-2
            </button>
          </li>
          <li className="flex w-[100px] flex-1 items-center justify-center bg-white">D-3</li>
          <li className="flex w-[100px] flex-1 items-center justify-center bg-white">D-4</li>
          <li className="flex w-[100px] flex-1 items-center justify-center bg-white">D-5</li>
        </ul>
        <div className="flex flex-col gap-[16px]">
          <table ref={section1Ref} className="mx-auto table-fixed bg-[#C9CCD5] shadow-md">
            <thead className="sticky top-[50px]">
              <tr className="bg-[#393E46] text-[#F9F7F7]">
                <th className="px-2 text-left text-[14px]" colSpan={2}>
                  Div. <span className="text-[20px]">D-1</span>
                </th>
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th colSpan={2} className="text-center">
                  Attempts
                </th>
              </tr>
              <tr className="bg-[#393E46] text-[#F9F7F7]">
                <th className="w-[50px] px-2 py-2">Rank</th>
                <th className="w-[200px] px-2 py-2 text-left">name</th>
                <th className="w-[35px] px-1">1</th>
                <th className="w-[35px] px-1">2</th>
                <th className="w-[35px] px-1">3</th>
                <th className="w-[35px] px-1">4</th>
                <th className="w-[35px] px-1">5</th>
                <th className="w-[35px] px-1">6</th>
                <th className="w-[35px] px-1">7</th>
                <th className="w-[35px] px-1">8</th>
                <th className="w-[35px] px-1">9</th>
                <th className="w-[35px] px-1">10</th>
                <th className="w-[60px] px-2">TOP</th>
                <th className="w-[60px] px-2">ZONE</th>
                <th className="w-[60px] px-2">TOP</th>
                <th className="w-[60px] px-2">ZONE</th>
              </tr>
            </thead>
            <tbody>
              {new Array(20).fill(0).map((_, index) => (
                <tr key={index}>
                  <td className="px-2 py-2 text-center font-black">{index + 1}</td>
                  <td className="px-2 py-2">
                    <div>
                      <p className="text-[14px] font-bold">아무개</p>
                      <p className="flex items-center gap-[4px] text-[12px] font-semibold">
                        1 <span className="h-[3px] w-[3px] rounded bg-black" /> 아무개클라이밍
                      </p>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F9ED69]">
                        3
                      </div>
                      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F9ED69]">
                        2
                      </div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F9ED69]">
                        2
                      </div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center font-black">3</td>
                  <td className="px-2 py-2 text-center font-black">4</td>
                  <td className="px-2 py-2 text-center font-black">3</td>
                  <td className="px-2 py-2 text-center font-black">10</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table ref={section2Ref} className="mx-auto table-fixed bg-[#C9CCD5] shadow-md">
            <thead className="sticky top-[50px]">
              <tr className="bg-[#393E46] text-[#F9F7F7]">
                <th className="px-2 text-left text-[14px]" colSpan={2}>
                  Div. <span className="text-[20px]">D-2</span>
                </th>
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th colSpan={2} className="text-center">
                  Attempts
                </th>
              </tr>
              <tr className="bg-[#393E46] text-[#F9F7F7]">
                <th className="w-[50px] px-2 py-2">Rank</th>
                <th className="w-[200px] px-2 py-2 text-left">name</th>
                <th className="w-[35px] px-1">1</th>
                <th className="w-[35px] px-1">2</th>
                <th className="w-[35px] px-1">3</th>
                <th className="w-[35px] px-1">4</th>
                <th className="w-[35px] px-1">5</th>
                <th className="w-[35px] px-1">6</th>
                <th className="w-[35px] px-1">7</th>
                <th className="w-[35px] px-1">8</th>
                <th className="w-[35px] px-1">9</th>
                <th className="w-[35px] px-1">10</th>
                <th className="w-[60px] px-2">TOP</th>
                <th className="w-[60px] px-2">ZONE</th>
                <th className="w-[60px] px-2">TOP</th>
                <th className="w-[60px] px-2">ZONE</th>
              </tr>
            </thead>
            <tbody>
              {new Array(20).fill(0).map((_, index) => (
                <tr key={index}>
                  <td className="px-2 py-2 text-center font-black">{index + 1}</td>
                  <td className="px-2 py-2">
                    <div>
                      <p className="text-[14px] font-bold">아무개</p>
                      <p className="flex items-center gap-[4px] text-[12px] font-semibold">
                        1 <span className="h-[3px] w-[3px] rounded bg-black" /> 아무개클라이밍
                      </p>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F9ED69]">
                        3
                      </div>
                      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F9ED69]">
                        2
                      </div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F9ED69]">
                        2
                      </div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                      <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#222831]"></div>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center font-black">3</td>
                  <td className="px-2 py-2 text-center font-black">4</td>
                  <td className="px-2 py-2 text-center font-black">3</td>
                  <td className="px-2 py-2 text-center font-black">10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Score;

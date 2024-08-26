'use client';

import { useRef } from 'react';

import TShirtWithNumber from './TShirtWithNumber';

import { TshirtIcon } from '@/svg';

const Score = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const scrollToSection = (sectionRef: any) => {
    // const offset = 50; // 원하는 여유 공간
    // const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
    // window.scrollTo({ top, behavior: 'smooth' });
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="w-full bg-black/80">
      <div className="mx-auto w-[1110px]">
        <div className="text-center text-[36px] text-white">돌잔치 - Live Score</div>
        <div className="flex gap-[16px] p-2">
          <div className="flex flex-col gap-[16px]">
            <table ref={section1Ref} className="mx-auto table-fixed rounded-xl bg-[#202020] text-[#FEFEFE] shadow-md">
              <thead className="sticky top-[0px] z-[9999]">
                <tr className="bg-[#4D4D4D] text-[#F9F7F7]">
                  <th className="px-2 text-left text-[14px]" colSpan={2}>
                    Div. <span className="text-[20px]">D-1</span>{' '}
                    <span className="rounded bg-[#3F72AF] px-[2px] py-[1px]">Men</span>
                  </th>
                  <th colSpan={10} className="text-left">
                    Problems
                  </th>
                  <th />
                  <th />
                  <th colSpan={2} className="text-center text-[#a0a0a0]">
                    Attempts
                  </th>
                </tr>
                <tr className="bg-[#4D4D4D] text-[#F9F7F7]">
                  <th className="w-[50px] px-2 py-2">Rank</th>
                  <th className="w-[200px] px-2 py-2 text-left">name</th>
                  {new Array(10).fill(0).map((_, index) => (
                    <th key={index + 1}>{index + 1}</th>
                  ))}
                  <th className="w-[60px] px-2">TOP</th>
                  <th className="w-[60px] px-2">ZONE</th>
                  <th className="w-[60px] px-2 text-[#a0a0a0]">TOP</th>
                  <th className="w-[60px] px-2 text-[#a0a0a0]">ZONE</th>
                </tr>
              </thead>
              <tbody>
                {new Array(20).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 text-center text-[22px] font-black">{index + 1}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-[6px]">
                        <TShirtWithNumber backNumber={123} />
                        아무개
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F4CD5F]">
                          3
                        </div>
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F4CD5F]">
                          2
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F4CD5F]">
                          2
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-2 py-2 text-center font-black">3</td>
                    <td className="px-2 py-2 text-center font-black">4</td>
                    <td className="px-2 py-2 text-center font-black text-[#909090]">3</td>
                    <td className="px-2 py-2 text-center font-black text-[#909090]">10</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table ref={section2Ref} className="mx-auto table-fixed rounded-xl bg-[#202020] text-[#FEFEFE] shadow-md">
              <thead className="sticky top-[0px] z-[9999]">
                <tr className="bg-[#4D4D4D] text-[#F9F7F7]">
                  <th className="px-2 text-left text-[14px]" colSpan={2}>
                    Div. <span className="text-[20px]">D-1</span>{' '}
                    <span className="rounded bg-[#FF2E63] px-[2px] py-[1px]">Women</span>
                  </th>
                  <th colSpan={10} className="text-left">
                    Problems
                  </th>
                  <th />
                  <th />
                  <th colSpan={2} className="text-center text-[#a0a0a0]">
                    Attempts
                  </th>
                </tr>
                <tr className="bg-[#4D4D4D] text-[#F9F7F7]">
                  <th className="w-[50px] px-2 py-2">Rank</th>
                  <th className="w-[200px] px-2 py-2 text-left">name</th>
                  {new Array(10).fill(0).map((_, index) => (
                    <th key={index + 1}>{index + 1}</th>
                  ))}
                  <th className="w-[60px] px-2">TOP</th>
                  <th className="w-[60px] px-2">ZONE</th>
                  <th className="w-[60px] px-2 text-[#a0a0a0]">TOP</th>
                  <th className="w-[60px] px-2 text-[#a0a0a0]">ZONE</th>
                </tr>
              </thead>
              <tbody>
                {new Array(20).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 text-center text-[22px] font-black">{index + 1}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-[6px]">
                        <TShirtWithNumber backNumber={123} />
                        아무개
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F4CD5F]">
                          3
                        </div>
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F4CD5F]">
                          2
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-[#F4CD5F]">
                          2
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-[#202020]">
                      <div className="flex flex-col items-center gap-[2px]">
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                        <div className="bg-[#F9ED flex h-[30px] w-[30px] items-center justify-center rounded-[2px] bg-black" />
                      </div>
                    </td>
                    <td className="px-2 py-2 text-center font-black">3</td>
                    <td className="px-2 py-2 text-center font-black">4</td>
                    <td className="px-2 py-2 text-center font-black text-[#909090]">3</td>
                    <td className="px-2 py-2 text-center font-black text-[#909090]">10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="sticky top-[10px] flex h-full w-[150px] flex-col border border-white">
            <li className="">
              <button
                type="button"
                onClick={() => scrollToSection(section1Ref)}
                className="h-[50px] w-full px-2 text-left text-[14px] font-bold text-[#FEFEFE]"
              >
                <span>Div. </span>
                <span className="text-[20px]">D-1 </span>
                <span className="rounded bg-[#3F72AF] px-[2px] py-[1px]">Men</span>
              </button>
            </li>
            <li className="">
              <button
                type="button"
                onClick={() => scrollToSection(section2Ref)}
                className="h-[50px] w-full px-2 text-left text-[14px] font-bold text-[#FEFEFE]"
              >
                <span>Div. </span>
                <span className="text-[20px]">D-1 </span>
                <span className="rounded bg-[#FF2E63] px-[2px] py-[1px]">Women</span>
              </button>
            </li>
            <li className="">
              <button
                type="button"
                onClick={() => scrollToSection(section2Ref)}
                className="h-[50px] w-full px-2 text-left text-[14px] font-bold text-[#FEFEFE]"
              >
                <span>Div. </span>
                <span className="text-[20px]">D-2 </span>
                <span className="rounded bg-[#3F72AF] px-[2px] py-[1px]">Men</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Score;

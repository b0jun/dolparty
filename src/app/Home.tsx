'use client';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Home() {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const difficultyList = ['all', 'd1', 'd2', 'd3', 'd4'];
	const currentType = searchParams.get('type') || 'all';

	return (
		<main className="flex flex-col min-h-full bg-backdrop bg-no-repeat bg-center bg-cover min-w-[576px]">
			<section className="flex-1 flex">
				<article className="mx-auto my-[24px] w-[576px] px-[16px]">
					<div className="text-center mb-[24px]">
						<p className="text-[56px] font-bold">1st, 돌잔치</p>
						<p className="text-[#181411] font-medium">9월 7일 토요일 대회 참가자 현황</p>
					</div>
					<div className="flex justify-between items-center mb-3">
						<ul className="flex rounded-lg shadow-sm">
							{difficultyList.map((item) => (
								<li key={item} className="group">
									<Link
										href={{
											pathname,
											...(item !== 'all' && {
												query: {
													type: item,
												},
											}),
										}}
										replace
										className={cn(
											'h-[35px] w-[45px] text-[14px] flex justify-center items-center gap-x-2 -ms-px group-first:rounded-s-lg group-first:ms-0 group-last:rounded-e-lg focus:z-10 border border-gray-200 bg-white/70 hover:bg-gray-50 focus:outline-none',
											{ ['!bg-white !font-semibold']: currentType === item }
										)}
									>
										{item === 'all' ? '전체' : item.toUpperCase()}
									</Link>
								</li>
							))}
						</ul>
						<div>
							<Link
								href="/score"
								className="bg-gray-500/30 hover:bg-gray-500/50 transition-all text-[14px] font-medium rounded-lg px-2 flex h-[35px] items-center"
							>
								실시간 점수 조회
							</Link>
						</div>
					</div>
					<table className="w-full text-md mx-auto bg-white/50 shadow-md rounded-lg mb-4 table-fixed">
						<thead>
							<tr className="sticky top-0 bg-white">
								<th className="px-2 py-2 w-[50px] rounded-tl-lg">번호</th>
								<th className="px-4 py-2 w-[150px] text-left">이름</th>
								<th className="px-4 py-2 w-[150px] text-left">소속</th>
								<th className="px-4 py-2 w-[80px]">라운드</th>
								<th className="px-2 py-2 w-[50px] rounded-tr-lg">구분</th>
							</tr>
						</thead>
						<tbody className="text-[12px] font-semibold divide-y divide-black/20">
							{new Array(30).fill(0).map((_, index) => (
								<tr key={index}>
									<td className="px-2 py-2 text-center text-black/60">{100 + index + 1}</td>
									<td className="px-4 py-2 text-left truncate">
										아무개{index === 2 ? 'Long Long Long Name' : ''}
									</td>
									<td className="px-4 py-2 text-left truncate">
										아무개클라이밍 {index === 2 ? 'Long Long Long Name' : ''}
									</td>
									<td className="px-4 py-2 text-center">D1</td>
									<td className="px-2 py-2 text-center">남자부</td>
								</tr>
							))}
						</tbody>
					</table>
				</article>
			</section>
		</main>
	);
}

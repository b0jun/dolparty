export default function Home() {
	return (
		<main className="flex flex-col min-h-full">
			<div className="flex-1 flex justify-center bg-backdrop bg-no-repeat bg-cover">
				<div className="relative w-[1110px]">
					<div className="text-center mb-[24px]">
						<p className="text-[56px] font-bold">1st, 돌잔치</p>
						<p className="text-[#181411] font-medium">9월 7일 토요일 대회 참가자 현황</p>
					</div>
					{/* <div className="flex justify-end sticky top-0">
						<button type="button">스코어</button>
						<button type="button">라운드 정보</button>
					</div> */}
					<table className="w-[512px] text-md mx-auto bg-white/50 shadow-md rounded-lg mb-4 table-fixed">
						<thead>
							<tr className="sticky top-0 bg-white">
								{/* <tr className=""> */}
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
									<td className="px-2 py-2 text-center">{100 + index + 1}</td>
									<td className="px-4 py-2 text-left truncate">
										이창헌{index === 2 ? 'Long Long Long Name' : ''}
									</td>
									<td className="px-4 py-2 text-left truncate">
										돌멩이클라이밍 {index === 2 ? 'Long Long Long Name' : ''}
									</td>
									<td className="px-4 py-2 text-center">D1 / 1</td>
									<td className="px-2 py-2 text-center">남자부</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}

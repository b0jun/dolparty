export default function Home() {
	return (
		<main className="flex flex-col min-h-full bg-backdrop bg-no-repeat bg-center bg-cover min-w-[576px]">
			<section className="flex-1 flex">
				<article className="mx-auto my-[24px] w-[576px] px-[16px]">
					<div className="text-center mb-[24px]">
						<p className="text-[56px] font-bold">1st, 돌잔치</p>
						<p className="text-[#181411] font-medium">9월 7일 토요일 대회 참가자 현황</p>
					</div>
					<div className="flex justify-end p-2">
						<select className="p-1 rounded-lg outline-none border border-black/30">
							<option>라운드</option>
							<option>D1/1</option>
							<option>D2/1</option>
							<option>D3/1</option>
							<option>D4/1</option>
							<option>D1/2</option>
							<option>D2/2</option>
							<option>D3/2</option>
							<option>D4/2</option>
						</select>
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
									<td className="px-2 py-2 text-center">{100 + index + 1}</td>
									<td className="px-4 py-2 text-left truncate">
										아무개{index === 2 ? 'Long Long Long Name' : ''}
									</td>
									<td className="px-4 py-2 text-left truncate">
										아무개클라이밍 {index === 2 ? 'Long Long Long Name' : ''}
									</td>
									<td className="px-4 py-2 text-center">D1 / 1</td>
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

const Score = () => {
	return (
		<div className="bg-black/30 w-[1024px]">
			<table className="table-fixed w-[600px]">
				<thead>
					<tr>
						<th className="px-2 py-2 w-[60px]">Rank</th>
						<th>name</th>
						<th>1</th>
						<th>2</th>
						<th>3</th>
					</tr>
				</thead>
			</table>
			<tbody>
				<tr>
					<td className="px-2 py-2">1</td>
					<td>
						<div>
							<p className="font-bold text-[14px]">아무개</p>
							<p className="flex items-center gap-[2px] text-[12px] font-medium">
								1 <span className="w-[3px] h-[3px] bg-black rounded" /> 아무개클라이밍
							</p>
						</div>
					</td>
					<td>
						{/* <div className="flex flex-col">
							<div className="items-center justify-center flex w-[30px] h-[30px] border">3</div>
							<div className="items-center justify-center flex w-[30px] h-[30px] border-b border-x">
								2
							</div>
						</div> */}
					</td>
					<td>1</td>
					<td>2</td>
				</tr>
			</tbody>
		</div>
	);
};

export default Score;

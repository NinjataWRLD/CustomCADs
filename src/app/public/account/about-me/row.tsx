interface RowProps {
	fields: { label: string; value?: string }[];
}
const Row = ({ fields }: RowProps) => (
	<div className='flex justify-around'>
		{fields.map((f) => (
			<div key={f.label} className='flex items-center'>
				<h2>{f.label}</h2>
				<p className='flex justify-center items-center font-bold text-[1.4rem] ml-5 title-text-shadow'>
					{f.value}
				</p>
			</div>
		))}
	</div>
);

export default Row;

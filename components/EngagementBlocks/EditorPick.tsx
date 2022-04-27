import EditorPickCard from "@components/Cards/EditorPickCard";
import React from "react";



const EditorPick = ({ data }) => {
	return (
		<>
			{data.map((item) => {
				return (
					item?.room && (
						<EditorPickCard data={item} key={item?._id}/>
					)
				);
			})}
		</>
	);
};


export default React.memo(EditorPick);

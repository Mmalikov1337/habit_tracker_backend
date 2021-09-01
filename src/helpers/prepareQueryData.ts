export default function prepareQueryData(query: any) {
	if (query["limit"] && query["offset"]) {
		const paginationData = {
			limit: ~~query["limit"],
			offset: ~~query["offset"],
		};
		delete query["limit"];
		delete query["offset"];
		return { filterData: query, paginationData };
	}
	return { filterData: query };
}

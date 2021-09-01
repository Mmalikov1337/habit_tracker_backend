import ServerError from "../errors/ServerError";

export default function getQueryString(
	tableName: string,
	userId: number,
	id?: number,
	filterString?: string,
	filterValues?: any[],
	paginationString?: string,
	paginationValues?: any[]
): [string, any] {
	let queryString: string = `SELECT * FROM ${tableName} WHERE user_id=? `;

	let queryOptions = [userId];

	if (id) {
		queryString += "AND id=?";
		queryOptions.push(id);
	}
	if (filterString && filterValues) {
		if (filterValues.length === 0) {
			console.log("filterValues", filterValues);
			throw ServerError.serverError(`filterValues is empty.`);
		}
		queryString += filterString;
		queryOptions.push(...filterValues);
	}
	if (paginationString && paginationValues) {
		if (paginationValues.length === 0) {
			console.log("paginationValues", paginationValues);
			throw ServerError.serverError(`paginationValues is empty.`);
		}
		queryString += paginationString;
		queryOptions.push(...paginationValues);
	}
	console.log("[queryString, queryOptions]", queryString, queryOptions);
	
	return [queryString, queryOptions];
}

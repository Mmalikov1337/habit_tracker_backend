import getFilterString from "./getFilterString";
import isEmpty from "./isEmpty";

export default function createFilterString(filters: any) {
	if (isEmpty(filters)) return;
	return "AND " + Object.keys(filters).map(getFilterString).join(" AND "); // Формирование строки для фильтрации
}

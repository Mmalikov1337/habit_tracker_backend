import getFilterValue from "./getFilterValue";
import isEmpty from "./isEmpty";

export default function createFilterValue(filters: any) {
	if (isEmpty(filters)) return;
	return Object.entries(filters).map((it) => getFilterValue(it[0], it[1])); //аргументы для фильтрации
}

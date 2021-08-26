import { FilterFields } from "../types/queries";
export default function getFilterString(key: string) {
	switch (key as FilterFields) {
		case "date_of_create":
			return `date_of_create=?`;
		case "date_of_create_lte":
			return `date_of_create<?`;
		case "date_of_create_gte":
			return `date_of_create>?`;
		case "is_healfully":
			return `is_healfully=?`;
		default:
			return "";
	}
}
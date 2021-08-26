import { FilterFields } from "./../types/queries";
export default function getFilter(key: string) {
	switch (key as FilterFields) {
		case "date_of_create":
			return `date_of_create=?`;
		case "date_of_create_lte":
			return `date_of_create<?`;
		case "date_of_create_gte":
			return `date_of_create>?`;
		default:
			return "";
	}
}

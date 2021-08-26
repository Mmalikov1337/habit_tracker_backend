import { FilterFields } from "../types/queries";
export default function getFilterValue(key: string, value: any) {
	switch (key as FilterFields) {
		case "date_of_create":
			return value;
		case "date_of_create_lte":
			return value;
		case "date_of_create_gte":
			return value;
		case "is_healfully":
			return value === "true"
		default:
			return "";
	}
}

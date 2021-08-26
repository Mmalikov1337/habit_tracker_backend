import { Request } from "express";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";

interface RequestExtended extends Request {
	userDataVerified: TokenPayloadDTO;
}

export default RequestExtended;

import { JWTPayload } from "jose";

export interface SessionPayload extends JWTPayload {
  email: string;
  userid: string;
}

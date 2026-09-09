import { UserAddressDocument } from "../models/user-address.model";
import { UserDocument, UserModel } from "../models/user.model";
import { BadRequestException, UnauthorizedException } from "../utils/app-error";
import { signAccessToken } from "../utils/jwt";
import { findDefaultAddress } from "./address.service";
import { findUserByEmail, findUserByEmailWithPassword } from "./user.service";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type AuthResult = {
  user: UserDocument;
  accessToken: string;
  /** Lets the client route to the address step instead of the home feed. */
  hasAddress: boolean;
  /** Rendered straight into the home header, so no extra request on launch. */
  defaultAddress: UserAddressDocument | null;
};

const issueToken = (user: UserDocument) =>
  signAccessToken({ role: user.role, userId: user._id.toString() });

export const registerUser = async (input: RegisterInput): Promise<AuthResult> => {
  const existing = await findUserByEmail(input.email);

  if (existing) {
    throw new BadRequestException("An account with this email already exists");
  }

  // Only ever a customer here; drivers and admins are created in the backoffice.
  const user = await UserModel.create({
    email: input.email.toLowerCase(),
    name: input.name,
    password: input.password,
    phone: input.phone,
    role: "customer",
  });

  // A brand new account cannot have an address yet.
  return { accessToken: issueToken(user), defaultAddress: null, hasAddress: false, user };
};

export const loginUser = async (input: LoginInput): Promise<AuthResult> => {
  const user = await findUserByEmailWithPassword(input.email);

  // One message for "no such user" and "wrong password" so accounts cannot be enumerated.
  const invalidCredentials = new UnauthorizedException("Invalid email or password");

  if (!user) throw invalidCredentials;

  const passwordMatches = await user.comparePassword(input.password);

  if (!passwordMatches) throw invalidCredentials;
  if (!user.isActive) throw new UnauthorizedException("This account has been deactivated");

  const defaultAddress = await findDefaultAddress(user._id.toString());

  return {
    accessToken: issueToken(user),
    defaultAddress,
    hasAddress: defaultAddress !== null,
    user,
  };
};

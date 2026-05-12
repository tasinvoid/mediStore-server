import { fromNodeHeaders } from "better-auth/node";
import { UserStatus } from "@prisma/client";
import { auth } from "../lib/auth.js";
export const authMiddleware = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await auth.api.getSession({
                headers: fromNodeHeaders(req.headers),
            });
            if (!session) {
                console.log("session not found!");
                return res.status(400).send({ message: "session not found" });
            }
            if (!session.user.emailVerified) {
                console.log("Email not verified");
                return res.status(400).send({ message: "Email is not verified" });
            }
            if (session.user.status === UserStatus.BANNED) {
                return res.status(400).send({ message: "This User Is BANNED" });
            }
            req.user = {
                name: session.user.name,
                email: session.user.email,
                roles: session.user.roles,
                emailVerified: session.user.emailVerified,
                status: session.user.status,
                id: session.user.id,
            };
            if (roles && !roles.includes(session.user.roles)) {
                return res.status(403).send({ message: "unauthorized" });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
//# sourceMappingURL=authMiddleware.js.map
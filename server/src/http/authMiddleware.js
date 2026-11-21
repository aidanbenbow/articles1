
import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_B7ADNmSRu",
    tokenUse: "access",
    clientId: "5o125c1dsme7mn55oenkkf3re5"
});

export async function requireAuth(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Authentication required"
            });
        }

        const token = authorization.slice(7);

        const payload = await verifier.verify(token);

        req.user = {
            id: payload.sub,
            username: payload.username
        };

        next();

    } catch (error) {
        console.error("Authentication failed:", error.message);

        res.status(401).json({
            error: "Invalid or expired authentication token"
        });
    }
}

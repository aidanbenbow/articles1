
import { requireAuth } from "../http/authMiddleware.js";
import { getCognitoUserAttributes } from "../http/cognitoUserService.js";

export function registerUserHandlers(app, userService) {

    app.get("/api/users/me", requireAuth, async (req, res) => {
        try {
         const attributes = await getCognitoUserAttributes(req.user.accessToken);
         
          const displayName =
                attributes.name ||
                attributes.given_name ||
                attributes.preferred_username ||
                "Learner";
              
            const profile = await userService.getOrCreateProfile(req.user.id, {
                    displayName,
                    email: attributes.email
                });

            res.json(profile);

        } catch (error) {
            console.error("Failed to retrieve learner profile:", error);

            res.status(500).json({
                error: "Failed to retrieve learner profile"
            });
        }
    });
}

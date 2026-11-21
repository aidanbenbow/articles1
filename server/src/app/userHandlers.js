
import { requireAuth } from "../http/authMiddleware.js";

export function registerUserHandlers(app, userService) {

    app.get("/api/users/me", requireAuth, async (req, res) => {
        try {
            const profile = await userService.getOrCreateProfile(req.user.id);

            res.json(profile);

        } catch (error) {
            console.error("Failed to retrieve learner profile:", error);

            res.status(500).json({
                error: "Failed to retrieve learner profile"
            });
        }
    });
}

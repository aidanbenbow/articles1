
const XP_PER_LEVEL = 500;

function getPlayerInitials(user) {
    const name =
        user?.displayName ||
        user?.name ||
        user?.username ||
        user?.email ||
        "Learner";

    const parts = String(name)
        .trim()
        .split(/[\s@._-]+/)
        .filter(Boolean);

    if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return (parts[0] || "L").slice(0, 2).toUpperCase();
}

function formatLearningTime(seconds = 0) {
    const totalMinutes = Math.floor(Number(seconds || 0) / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min`;
    return `${hours} hr ${minutes} min`;
}

export const Player_Profile_LAYOUT = {
    screen: 'playerProfile',

    nodes: ({
        appState = {},
        playerStats = {},
        weeklyLeaderboard = { players: [] },
        playerProgress = []
    } = {}) => {

        const user = appState.user || {};

        const totalXP = Number(playerStats.totalXP || 0);
        const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
        const currentLevelXP = totalXP % XP_PER_LEVEL;
        const xpRemaining = XP_PER_LEVEL - currentLevelXP;
        const levelProgress = (currentLevelXP / XP_PER_LEVEL) * 100;

        const completedLessons =
            Number(playerStats.completedLessons || 0);

        const inProgressLessons =
            Number(playerStats.inProgressLessons || 0);

        const learningTime =
            formatLearningTime(playerStats.totalActiveTime || 0);

        const achievements = playerStats.achievements || [];

        const players = weeklyLeaderboard?.players || [];

        const userRank = players.find(
            player => player.userId === user.id
        )?.rank;

        return [

            // PROFILE HEADER
            {
                id: 'profile-header',
                type: 'card',
                owner: 'playerProfile',
                layout: 'content',
                children: [
                    {
                        id: 'profile-avatar',
                        type: 'text',
                        typography: 'title',
                        color: 'primary',
                        value: getPlayerInitials(user)
                    },
                    {
                        id: 'profile-name',
                        type: 'text',
                        typography: 'title',
                        color: 'heading',
                        value: user.displayName ||
                            user.name ||
                            user.email ||
                            'Learner'
                    },
                    {
                        id: 'profile-level',
                        type: 'text',
                        typography: 'body',
                        color: 'text',
                        value: `⭐ Level ${level}`
                    },
                    {
                        id: 'profile-xp',
                        type: 'text',
                        typography: 'body',
                        color: 'text',
                        value: `${totalXP} Total XP`
                    },
                    {
                        id: 'profile-level-progress',
                        type: 'progress',
                        value: levelProgress
                    },
                    {
                        id: 'profile-xp-remaining',
                        type: 'text',
                        typography: 'body',
                        color: 'muted',
                        value: `${xpRemaining} XP to reach Level ${level + 1}`
                    }
                ]
            },

            // LEARNING STATISTICS
            {
                id: 'profile-statistics',
                type: 'card',
                owner: 'playerProfile',
                layout: 'content',
                children: [
                    {
                        id: 'statistics-title',
                        type: 'text',
                        typography: 'title',
                        color: 'heading',
                        value: '📊 Learning Statistics'
                    },
                    {
                        id: 'statistics-completed',
                        type: 'text',
                        typography: 'body',
                        color: 'text',
                        value: `✅ Completed Lessons: ${completedLessons}`
                    },
                    {
                        id: 'statistics-progress',
                        type: 'text',
                        typography: 'body',
                        color: 'text',
                        value: `📚 In Progress: ${inProgressLessons}`
                    },
                    {
                        id: 'statistics-time',
                        type: 'text',
                        typography: 'body',
                        color: 'text',
                        value: `⏱ Learning Time: ${learningTime}`
                    }
                ]
            },

            // ACHIEVEMENTS
            {
                id: 'profile-achievements',
                type: 'card',
                owner: 'playerProfile',
                layout: 'content',
                children: [
                    {
                        id: 'achievements-title',
                        type: 'text',
                        typography: 'title',
                        color: 'heading',
                        value: '🏆 Achievements'
                    },

                    ...(achievements.length
                        ? achievements.map(achievement => ({
                            id: `achievement-${achievement.id}`,
                            type: 'text',
                            typography: 'body',
                            color: achievement.unlocked
                                ? 'text'
                                : 'muted',
                            value: `${achievement.unlocked ? '🏅' : '🔒'} ${achievement.title} — ${achievement.description}`
                        }))
                        : [{
                            id: 'achievements-empty',
                            type: 'text',
                            typography: 'body',
                            color: 'muted',
                            value: 'Complete lessons to unlock achievements!'
                        }]
                    )
                ]
            },

            // WEEKLY LEADERBOARD
            {
                id: 'profile-weekly-leaderboard',
                type: 'card',
                owner: 'playerProfile',
                layout: 'content',
                children: [
                    {
                        id: 'profile-weekly-title',
                        type: 'text',
                        typography: 'title',
                        color: 'heading',
                        value: '🏅 Weekly Leaderboard'
                    },
                    {
                        id: 'profile-weekly-rank',
                        type: 'text',
                        typography: 'body',
                        color: 'text',
                        value: userRank
                            ? `Your weekly position: #${userRank}`
                            : 'You have not been ranked this week yet.'
                    },
                    {
                        id: 'profile-weekly-week',
                        type: 'text',
                        typography: 'body',
                        color: 'muted',
                        value: `Week ${weeklyLeaderboard?.weekKey || ''}`
                    }
                ]
            },

            // NAVIGATION
            {
                id: 'profile-navigation',
                type: 'card',
                owner: 'playerProfile',
                layout: 'content',
                children: [
                    {
                        id: 'profile-continue',
                        type: 'button',
                        action: 'browseLessons',
                        text: 'Continue Learning',
                        width: 200
                    },
                    {
                        id: 'profile-analytics',
                        type: 'button',
                        action: 'openAnalytics',
                        text: 'View Analytics',
                        width: 200
                    },
                    {
                        id: 'profile-home',
                        type: 'button',
                        action: 'goHome',
                        text: 'Back to Home',
                        width: 200
                    }
                ]
            }
        ];
    }
};

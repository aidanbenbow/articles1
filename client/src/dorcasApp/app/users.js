export const users = [
    {
        id: 'aidan',
        name: 'Aidan',
        avatar: 'aidan.png',
        score: 0,
        lessonsCompleted: 0,
        completedLessons: [],
        progress: {
            currentLessonId: 'lesson-3'
        }
    },
    {
        id: 'bob',
        name: 'Bob',
        avatar: 'bob.png',
        score: 0,
        lessonsCompleted: 0,
        completedLessons: [],
        progress: {
            currentLessonId: 'lesson-7'
        }
    }
]

export function updateUser(userId, updates) {
  const user = users.find(user => user.id === userId);

  if (!user) {
    throw new Error(`User "${userId}" not found`);
  }

  Object.assign(user, updates);

  return user;
}
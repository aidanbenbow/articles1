export const users = [
    {
        id: 'aidan',
        name: 'Aidan',
        avatar: 'aidan.png',
        score: 0,
        lessonsCompleted: 0,
        completedLessons: [],
         lessonAttempts: [],
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
            lessonAttempts: [],
        progress: {
            currentLessonId: 'lesson-7'
        }
    }
]

export function createUser(name) {
    const cleanName = name.trim();

    if (!cleanName) {
        throw new Error("Please enter your name");
    }

    const user = {
        id: `user-${Date.now()}`,
        name: cleanName,
        avatar: null,
        score: 0,
        lessonsCompleted: 0,
        completedLessons: [],
        lessonAttempts: [],
        progress: {
            currentLessonId: null
        }
    };

    users.push(user);
console.log('[createUser] Users:', users.map(u => u.id));
    return user;
}

export function updateUser(userId, updates) {
  const user = users.find(user => user.id === userId);

  if (!user) {
    throw new Error(`User "${userId}" not found`);
  }

  Object.assign(user, updates);

  return user;
}
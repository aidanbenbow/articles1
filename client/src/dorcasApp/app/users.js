export const defaultUsers = [
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

function loadUsers() {
    const savedUsers = localStorage.getItem('users')

    if(savedUsers) {
        try {
            return JSON.parse(savedUsers)
        } catch (error) {
            console.error('Failed to parse saved users:', error)
        }
    }
    localStorage.setItem('users', JSON.stringify(defaultUsers))
    return [...defaultUsers]
}

export const users = loadUsers()

export function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users))
}


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
    saveUsers();
    return user;
}

export function updateUser(userId, updates) {
    console.log('Updating user:', userId, updates);
    console.log('Current users:', users);
  const user = users.find(user => user.id === userId);

  if (!user) {
    throw new Error(`User "${userId}" not found`);
  }

  Object.assign(user, updates);
saveUsers();
  return user;
}


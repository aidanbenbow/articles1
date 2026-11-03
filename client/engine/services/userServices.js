
export class UserService {
constructor(users) {
        this.users = users
    }
    getUser(userId) {
         console.log('[UserService] Looking for:', userId);
    console.log('[UserService] Available users:', this.users.map(u => u.id));

        const user = this.users.find(user => user.id === userId)

        if (!user) {
            throw new Error(`User "${userId}" not found`)
        }

        return user
    }
completeLesson(userId, lessonId, points) {
    const user = this.getUser(userId)
    if(user.completedLessons.includes(lessonId)) {
        return user
    }
 user.completedLessons.push(lessonId)
    user.score += points
    user.lessonsCompleted += 1

    return user
}
}
import { users } from '../../src/dorcasApp/app/users.js'

export class UserService {

    getUser(userId) {
        const user = users.find(user => user.id === userId)

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
console.log(`User "${userId}" completed lesson "${lessonId}" and earned ${points} points. Total score: ${user.score}, Lessons completed: ${user.lessonsCompleted}`)
    return user
}
}
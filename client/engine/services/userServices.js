

export class UserService {
constructor(users, saveUsers) {
        this.users = users
        this.saveUsers = saveUsers
    }
    getUser(userId) {
        const user = this.users.find(user => user.id === userId)

        if (!user) { throw new Error(`User "${userId}" not found`) }

        return user
    }
completeLesson(userId, data) {
    const user = this.getUser(userId)

    const {  lessonId, score, duration, attemptId, completedAt = new Date().toISOString()} = data

    if( attemptId && user.lessonAttempts.some(attempt => attempt.attemptId === attemptId)) {return user}

    const lessonAttempts = [
        ...user.lessonAttempts,
        { attemptId, lessonId, score, duration, completedAt }
    ]
let completedLessons = [...user.completedLessons]
    let lessonsCompleted = user.lessonsCompleted
    let totalScore = user.score
    if( !user.completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId)
        lessonsCompleted += 1
        totalScore += score
    } 
    Object.assign(user, {
    lessonAttempts,
    completedLessons,
    lessonsCompleted,
    score: totalScore
})

this.saveUsers()

return user
}
getLessonAttempts(lessonId) {
    return this.users.flatMap(user => (user.lessonAttempts??[]).filter(attempt => attempt.lessonId === lessonId))
}
getLessonStatistics(lessonId) {

    const attempts = this.getLessonAttempts(lessonId)

    if(!attempts.length) {
        return {
            attempts: 0,
            averageScore: null,
            averageDuration: null
        }
    }

    const averageScore = attempts.reduce((total,attempt)=> total + attempt.score, 0) / attempts.length
         
    const validDurations =attempts.filter(attempt=>Number.isFinite(attempt.duration)&&attempt.duration>0)

    const averageDuration = validDurations.length?validDurations.reduce((total,attempt)=> total + attempt.duration, 0) / validDurations.length:null

    return {
        attempts: attempts.length,
        averageScore: Math.round(averageScore),
        averageDuration: averageDuration === null ? null : Math.round(averageDuration)
    }
}
}

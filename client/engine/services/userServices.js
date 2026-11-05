
export class UserService {
constructor(users) {
        this.users = users
    }
    getUser(userId) {
        const user = this.users.find(user => user.id === userId)

        if (!user) { throw new Error(`User "${userId}" not found`) }

        return user
    }
completeLesson(userId, data) {
    const user = this.getUser(userId)
    const {  lessonId, score, duration, attemptId, completedAt = new Date().toISOString()} = data

    if( attemptId && !user.lessonAttempts.some(attempt => attempt.attemptId === attemptId)) {return user}

    user.lessonAttempts.push({ attemptId, lessonId, score, duration, completedAt })

    if( !user.completedLessons.includes(lessonId)) {
        user.completedLessons.push(lessonId)
        user.lessonsCompleted += 1
        user.score += score
    } 
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

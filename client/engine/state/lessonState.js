import { createActivityState } from "./stateFactory.js"

export class LessonState {
    constructor(lesson={}) {
        this.articleId = lesson.id || lesson.articleId || null
        this.title = lesson.title
        this.sections = lesson.sections || []
       
        this.description = lesson.description || ''
        this.difficulty = lesson.difficulty || 'medium'
this.duration = lesson.duration || 0
        this.currentSectionIndex = 0
     
        this.quizScore = null
       
         this.activities = Object.fromEntries(
            this.sections.map(section => [
                section.id,
                createActivityState(section)
            ])
        )
            this.surveyTotal = lesson.surveyTotal
            this.lessonTotal = lesson.lessonTotal
  this.quizTotal = lesson.quizTotal
    
        this.phase = 'not-started'
        this.currentSectionId =
            this.sections[0]?.id ?? null
        this.completedSections = []
         this.startedAt = new Date().toISOString()
        this.completed = false
        this.activeTimeSeconds = 0
this.activeSessionStartedAt = null
    }
    getScoreTotal(){
this.score = Object.values(this.activities).reduce((total, activity) => {
            
            return total+(activity.getScore ? activity.getScore() : 0)
        }, 0)
        return this.score
    }
    getCurrentSectionState() {
    if (!this.currentSectionId) {
        return null
    }

    return this.activities[this.currentSectionId] ?? null
}
    start(){
        this.phase = 'intro'
    }
    startPhase() {
        this.phase = 'active'
        this.startedAt = new Date().toISOString();
        this.startActiveSession()
    }
    startActiveSession() {
    if (this.activeSessionStartedAt) return

    this.activeSessionStartedAt = Date.now()
}

stopActiveSession() {
    if (!this.activeSessionStartedAt) return

    const elapsedSeconds = Math.floor(
        (Date.now() - this.activeSessionStartedAt) / 1000
    )

    this.activeTimeSeconds += Math.max(0, elapsedSeconds)
    this.activeSessionStartedAt = null
}
    end() {
        this.stopActiveSession()
        this.completed = true;
    this.completedAt = new Date().toISOString();
    this.phase = "results";
    }
    getDuration() {
    if (!this.startedAt || !this.completedAt) return 0;

    const start = new Date(this.startedAt).getTime();
    const end = new Date(this.completedAt).getTime();

    return Math.max(0, Math.floor((end - start) / 1000));
}

getResults() {
    return {
        lessonId: this.articleId,
        title: this.title,
        score: this.getScoreTotal(),
        completedSections: this.getCompletedCount(),
        totalSections: this.sections.length,
        progress: this.getProgress(),
        duration: this.getDuration(),
        completed: this.completed,
        completedAt: this.completedAt
    };
}
   setCurrentSection(sectionId) {
    this.currentSectionId = sectionId
        this.currentSectionIndex =
            this.sections.findIndex(
                section => section.id === sectionId
            )
}
     completeSection(sectionId) {
        if (  !this.completedSections.includes(sectionId) ) {
            this.completedSections.push(sectionId)
        }
    }
 isSectionComplete(sectionId) {
        return this.completedSections.includes(sectionId)
    }

    getCompletedCount() {
    return this.completedSections.length
}

 getSectionState(sectionId) {
    if(this.isSectionComplete(sectionId)) {
        return 'completed'
    }
    if(this.currentSectionId === sectionId) {
        return 'current'
    }
    return 'locked'
}
getSectionstate(sectionId) {
    return this.activities[sectionId] ?? null
}
getCurrentSection() {
    return this.sections.find(
        s => s.id === this.currentSectionId
    ) ?? null
}
    getProgress() {
        if (!this.sections.length)  return 0
       const completedCount = this.sections.filter(section =>
        this.completedSections.includes(section.id)
    ).length

    return Math.round(
        (completedCount / this.sections.length) * 100
    )
    }
   advanceSection() {
    const current =  this.getCurrentSection()
    if (!current)return false

    if (!this.canUnlockNextSection())     return false
    
    this.completeSection(current.id)

    const next =this.getNextSection()
      
    if (!next) {
         
        this.currentSectionId = null
        this.currentSectionIndex = this.sections.length
        this.end()
       
        return true
    }

    this.currentSectionIndex++

    this.currentSectionId = next.id
 
    return true
}
canUnlockNextSection() {
    const activity =
        this.activities[this.currentSectionId]
    return activity?.isComplete() ?? false
}
     getNextSection() {
        const nextIndex =  this.currentSectionIndex + 1
        return (   this.sections[nextIndex] || null )
    }
    hasNextSection() {
    return this.getNextSection() !== null
}

isLastSection() {
     if (!this.currentSectionId) {
        return false
    }

    return ( this.currentSectionIndex === this.sections.length - 1 )
}
restoreProgress(progress) {
    if (!progress) return

    this.completedSections = [
        ...(progress.completedActivityIds ?? [])
    ]

    this.currentSectionId =
        progress.currentActivityId ??
        this.sections[0]?.id ??
        null

    this.currentSectionIndex = this.sections.findIndex(
        section => section.id === this.currentSectionId
    )

    if (this.currentSectionIndex < 0) {
        this.currentSectionIndex = 0
        this.currentSectionId = this.sections[0]?.id ?? null
    }

    this.quizScore = progress.quizScore ?? 0
    this.startedAt = progress.startedAt ?? this.startedAt
    this.completedAt = progress.completedAt ?? null
    this.activeTimeSeconds = progress.activeTimeSeconds ?? 0

    this.completed = progress.status === 'completed'

    for (const [sectionId, activity] of Object.entries(this.activities)) {

        activity.completed =
    activity.type === 'lesson' ||
    this.completedSections.includes(sectionId)

        if (activity.type === 'quiz') {
            activity.restoreAnswers?.(
                progress.quizAnswers?.[sectionId] ?? {}
            )
        }

        if (activity.type === 'survey') {
            const saved = progress.surveyResponses?.[sectionId]

            if (saved) {
                if (saved.response !== undefined) {
                    activity.restoreResponse(saved.response, saved.results)
                } else {
                    activity.restoreResponse(saved)
                }
            }
        }

        if (activity.type === 'ordering') {
            activity.restoreState?.(
                progress.orderingAnswers?.[sectionId] ?? {}
            )
        }

        if (activity.type === 'dragdrop') {
            activity.restoreState?.(
                progress.orderingAnswers?.[sectionId] ?? {}
            )
        }
    }

    if (this.completed) {
        this.phase = 'results'
    } else if (progress.status === 'in_progress') {
        this.phase = 'active'
    } else {
        this.phase = 'intro'
    }
}
}
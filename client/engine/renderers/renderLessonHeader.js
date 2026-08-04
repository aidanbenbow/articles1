export function renderLessonHeader(
    ctx,
    lesson,
    viewport
){

    if(!lesson) return


    ctx.fillStyle = '#ffffff'

    ctx.fillRect(
        20,
        20,
        viewport.width - 40,
        60
    )


    ctx.fillStyle = '#000'
    ctx.font = 'bold 18px Arial'


    ctx.fillText(
        `Score: ${lesson.quizScore}/${lesson.quizTotal}`,
        40,
        55
    )


    ctx.fillText(
        `Progress: ${lesson.getProgress()}%`,
        250,
        55
    )

}
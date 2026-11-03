export function renderLessonResults(ctx, node, viewport, context) {
    const results = node.results;

    if (!results) return;

    const x = node.x + node.padding;
    let y = node.worldY + node.padding;

    ctx.save();

    ctx.fillStyle = '#222';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Lesson completed!', x, y + 24);

    y += 65;

    ctx.font = '16px sans-serif';

    ctx.fillText(`Score: ${results.score}`, x, y);
    y += 30;

    ctx.fillText(
        `Sections completed: ${results.completedSections}/${results.totalSections}`,
        x,
        y
    );
    y += 30;

    ctx.fillText(
        `Progress: ${Math.round(results.progress)}%`,
        x,
        y
    );
    y += 30;

    ctx.fillText(
        `Duration: ${results.duration} seconds`,
        x,
        y
    );

    ctx.restore();
}
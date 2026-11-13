

 
// export function getWrappedLines(ctx, text, maxWidth) {
//     const normalizedText =
//         Array.isArray(text)
//             ? text.join(' • ')
//             : text == null
//                 ? ''
//                 : typeof text === 'string'
//                     ? text
//                     : String(text)

//     if (!normalizedText.trim()) {
//         return []
//     }

//     if (!Number.isFinite(maxWidth) || maxWidth <= 0) {
//         return [normalizedText]
//     }

//     const words = normalizedText.split(/\s+/)
//     const lines = []

//     let line = ''

//     for (let n = 0; n < words.length; n++) {

//         const testLine = line + words[n] + ' '
//         const testWidth = ctx.measureText(testLine).width

//         if (testWidth > maxWidth && n > 0) {
//             lines.push(line.trim())
//             line = words[n] + ' '
//         } else {
//             line = testLine
//         }
//     }

//     if (line) {
//         lines.push(line.trim())
//     }

//     return lines
// }
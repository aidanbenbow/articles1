export function normalize(value){
    return String(value).trim().toLowerCase().replace(/\s+/g, ' ')
}

export function getInitials(text) {
    return text.
split(' ')
.filter(Boolean)
.map(word => word[0])
.join('')
}

export function matchesOrderedPrefix(text, normalizedQuery) {
    const normalizedText = normalize(text)
    const initials = getInitials(normalizedText)
    return normalizedText.startsWith(normalizedQuery) || initials.startsWith(normalizedQuery.replace(/\s+/g, ''))
}
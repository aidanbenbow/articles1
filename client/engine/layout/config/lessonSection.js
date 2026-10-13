

export const LESSON_SECTION_LAYOUT = {
    id: "lesson-content",
    type: "collection",
    source: ({ section }) => section.blocks ?? [],
    layout: {
        mode: "vertical",
        gap: 12,
    },
    item: {
        type: ({ item }) =>
            item.type === "heading" ? "heading" : "paragraph",
        kind: "lessonSection",
        sectionType: "lesson",
        text: ({ item }) => item.text,
        value: ({ item }) => item.text,
        typography: ({ item }) =>
            item.type === "heading" ? "heading" : "body",
        value: ({ item }) => item.text,
    },
}
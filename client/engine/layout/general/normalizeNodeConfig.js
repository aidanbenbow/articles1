export function normalizeNodeConfig(config = {}) {
    if (!config || typeof config !== 'object') {
        return config
    }

    const normalized = { ...config }

    normalized.id ??= config.nodeId ?? null
    normalized.type ??= config.nodeType ?? 'card'
    normalized.kind ??= config.sectionKind ?? null
    normalized.visible ??= config.isVisible ?? null

    if (normalized.props == null) {
        normalized.props = {}
    }

    if (normalized.data == null) {
        normalized.data = {}
    }

    const legacyValue = config.value ?? config.text ?? config.label
    if (legacyValue !== undefined && normalized.data.value == null) {
        normalized.data.value = legacyValue
    }
    if (normalized.value == null && normalized.data.value != null) {
        normalized.value = normalized.data.value
    }
    if (normalized.text == null && normalized.data.text != null) {
        normalized.text = normalized.data.text
    }
    if (normalized.label == null && normalized.data.label != null) {
        normalized.label = normalized.data.label
    }

    normalized.layout ??= {}

    if (normalized.padding != null && normalized.layout.padding == null) {
        normalized.layout.padding = normalized.padding
    }

    if (normalized.children == null && normalized.nodes != null) {
        normalized.children = normalized.nodes
    }

    if (normalized.children != null && normalized.nodes == null) {
        normalized.nodes = normalized.children
    }

    if (normalized.item != null && normalized.source != null && normalized.data.items == null) {
        normalized.data.items = normalized.source
    }

    return normalized
}

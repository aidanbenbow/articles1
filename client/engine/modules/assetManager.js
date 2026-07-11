export class AssetManager {

    constructor(engine) {
        this.engine = engine
        this.images = new Map()
    }


    contextExports() {
        return {
            getAssetManager: () => this
        }
    }


    loadImage(url) {

        if (!this.images.has(url)) {

            const img = new Image()

            img.crossOrigin = "anonymous"

            img.onload = () => {
                console.log(`Image loaded: ${url}`)
                this.engine.emit('assetLoaded', url)
            }

            img.onerror = (error) => {
                console.error(`Failed to load image: ${url}`, error)
            }

            img.src = url

            this.images.set(url, img)
        }

        return this.images.get(url)
    }


    attach() {
        console.log("AssetManager attached")
    }


    detach() {
        this.images.clear()
    }
}
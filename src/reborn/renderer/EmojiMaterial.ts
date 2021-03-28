import {CanvasMaterial} from "./CanvasMaterial";

export class EmojiMaterial extends CanvasMaterial {

    constructor(emoji: string) {
        super(100, 70, (ctx: CanvasRenderingContext2D) => {
            ctx.fillText(emoji,50,37);
        })
    }
}
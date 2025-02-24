class CustomizeCadEvent extends Event {
	color?: string;
	texture: string;

	constructor(texture: string, color?: string) {
		super('customize-cad');
		this.texture = texture;
		this.color = color;
	}
}

export default CustomizeCadEvent;

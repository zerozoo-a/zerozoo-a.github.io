export class WebGPUInstance {
	wgls: string[] | undefined;
	canvasRef: string | undefined;
	canvas: HTMLCanvasElement | null | undefined;
	adapter: GPUAdapter | null = null;
	context: GPUCanvasContext | null = null;
	device: GPUDevice | null = null;
	isInitialized: boolean = false;

	async init(canvasRef: string) {
		try {
			const canvas = document.getElementById(canvasRef) as
				| HTMLCanvasElement
				| null
				| undefined;

			if (!canvas) throw Error("canvas is required");
			this.canvas = canvas;

			const adapter = await navigator.gpu.requestAdapter();
			if (!adapter) throw Error("navigator gpu");
			this.adapter = adapter;

			const device = await adapter.requestDevice();
			this.device = device;

			const context = canvas.getContext("webgpu");
			this.context = context;

			if (!canvas || !context || !device)
				throw Error("canvas, context, device is required");
		} catch (error) {
			console.error(error);
			const node = document?.createElement("div");
			node.innerText = `${error}`;
			node.id = canvasRef;
			this.canvas?.parentElement?.replaceChild(node, this.canvas);

			this.canvas = this.adapter = this.context = this.device = null;
		} finally {
			this.isInitialized = true;
		}
	}
}

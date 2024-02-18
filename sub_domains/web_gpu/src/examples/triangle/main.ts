import { WebGPUInstance } from "../../web_gpu_instance";

const renderTriangle = async function () {
	const format = "bgra8unorm";
	const canvasId = "triangle";
	const vertexShaderCode = `
        @vertex
        fn main(@builtin(vertex_index) VertexIndex : u32) -> @builtin(position) vec4<f32> {
            var positions = array<vec2<f32>, 3>(
                vec2<f32>(0.0, 0.5),
                vec2<f32>(-0.5, -0.5),
                vec2<f32>(0.5, -0.5)
            );
            let position = positions[VertexIndex];
            return vec4<f32>(position, 0.0, 1.0);
        }`;

	const fragmentShaderCode = `
        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>(0.0, 0.1, 0.8, 1.0); // RGBA: Green
        }`;

	const webGpu = new WebGPUInstance();
	await webGpu.init(canvasId);
	if (!(webGpu.device && webGpu.context && webGpu.canvas && webGpu.adapter))
		return;

	/** context setting */
	webGpu.context.configure({
		device: webGpu.device,
		format: format,
	});

	/** set rendering pipeline */
	const pipeline = await webGpu.device.createRenderPipelineAsync({
		vertex: {
			module: webGpu.device.createShaderModule({
				code: vertexShaderCode,
			}),
			entryPoint: "main",
		},
		fragment: {
			module: webGpu.device.createShaderModule({
				code: fragmentShaderCode,
			}),
			entryPoint: "main",
			targets: [{ format }],
		},
		primitive: {
			topology: "triangle-list",
		},
		layout: "auto",
	});

	/** command encoder 생성 */
	const commandEncoder: GPUCommandEncoder =
		webGpu.device.createCommandEncoder();
	/** GPURenderPassEncoder */
	const passEncoder: GPURenderPassEncoder = commandEncoder.beginRenderPass({
		colorAttachments: [
			{
				view: webGpu.context.getCurrentTexture().createView(),
				clearValue: { r: 0, g: 0, b: 0, a: 1 },
				loadOp: "clear",
				storeOp: "store",
			},
		],
	});
	passEncoder.setPipeline(pipeline); // pipeline을 설정
	passEncoder.draw(3, 1, 0, 0); // 세 개의 꼭짓점으로 삼각형 그리기
	passEncoder.end(); // render pass 작성을 종료합니다.

	webGpu.device.queue.submit([commandEncoder.finish()]);
};

(async function () {
	await renderTriangle();
})();

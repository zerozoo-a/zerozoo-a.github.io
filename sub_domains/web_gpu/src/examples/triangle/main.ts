async function main(wgls: string[]) {
	/** 필수 object들에 대한 init */
	const { canvas, context, device } = await init();
	if (!(canvas || context || device))
		throw Error("canvas, context, device is required");

	/** 캔버스의 컨텍스트 구성 */
	const format = "bgra8unorm";
	context.configure({
		device,
		format,
	});

	/** 컨텍스트의 텍스쳐 구성 */
	const textureView: GPUTextureView = context.getCurrentTexture().createView();
	/** 렌더 패스 설정을 정의합니다. 여기서는 색상 버퍼를 지우고 저장하는 방법을 지정합니다. */
	const renderPassDescriptor: GPURenderPassDescriptor = {
		colorAttachments: [
			{
				view: textureView,
				clearValue: { r: 0, g: 0, b: 0, a: 1 },
				loadOp: "clear",
				storeOp: "store",
			},
		],
	};

	/** vertex, fragment shader를 module을 생성합니다.*/
	const [vertexShaderModule, fragmentShaderModule] = createShaderModules(
		wgls,
		device
	);

	/** rendering pipeline을 생성하며, shader와 rendering 설정을 포함합니다. */
	const pipeline = device.createRenderPipeline({
		vertex: {
			module: vertexShaderModule,
			entryPoint: "main",
		},
		fragment: {
			module: fragmentShaderModule,
			entryPoint: "main",
			targets: [
				{
					format,
				},
			],
		},
		primitive: {
			topology: "triangle-list",
		},
		layout: "auto",
	});
	/** GPU에 명령을 전달하기 위한 encoder를 생성합니다. */
	const commandEncoder = device.createCommandEncoder();

	const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
	passEncoder.setPipeline(pipeline); // pipeline을 설정
	passEncoder.draw(3, 1, 0, 0); // 세 개의 꼭짓점으로 삼각형 그리기
	passEncoder.end(); // render pass 작성을 종료합니다.
	device.queue.submit([commandEncoder.finish()]); // gpu의 queue에 작업을 밀어넣습니다.
}

async function init() {
	try {
		const canvas = document.getElementById("canvas") as
			| HTMLCanvasElement
			| null
			| undefined;
		if (!canvas) throw Error("canvas is required");

		const adapter = await navigator.gpu.requestAdapter();
		if (!adapter) throw Error("navigator gpu");

		const device = await adapter.requestDevice();
		const context = canvas.getContext("webgpu");

		if (!canvas || !context || !device)
			throw Error("canvas, context, device is required");

		return {
			canvas,
			device,
			context,
		};
	} catch (e) {
		console.error(e);
		return {
			canvas: null,
			device: null,
			context: null,
		};
	}
}

function createShaderModules(
	wgls: string[],
	device: GPUDevice,
	map?: (value: string, index: number, array: string[]) => GPUShaderModule
): GPUShaderModule[] {
	return map
		? wgls.map(map)
		: wgls.map((wgl) => device.createShaderModule({ code: wgl }));
}

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
            return vec4<f32>(0.0, 1.0, 0.0, 1.0); // RGBA: Green
        }`;

window.onload = () => main([vertexShaderCode, fragmentShaderCode]);

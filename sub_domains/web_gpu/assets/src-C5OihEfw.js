import{W as d}from"./web_gpu_instance-D-KTR6md.js";const s=async function(){const t="bgra8unorm",r="triangle",o=`
        @vertex
        fn main(@builtin(vertex_index) VertexIndex : u32) -> @builtin(position) vec4<f32> {
            var positions = array<vec2<f32>, 3>(
                vec2<f32>(0.0, 0.5),
                vec2<f32>(-0.5, -0.5),
                vec2<f32>(0.5, -0.5)
            );
            let position = positions[VertexIndex];
            return vec4<f32>(position, 0.0, 1.0);
        }`,a=`
        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>(0.0, 0.1, 0.8, 1.0); // RGBA: Green
        }`,e=new d;if(await e.init(r),!(e.device&&e.context&&e.canvas&&e.adapter))return;e.context.configure({device:e.device,format:t});const c=await e.device.createRenderPipelineAsync({vertex:{module:e.device.createShaderModule({code:o}),entryPoint:"main"},fragment:{module:e.device.createShaderModule({code:a}),entryPoint:"main",targets:[{format:t}]},primitive:{topology:"triangle-list"},layout:"auto"}),i=e.device.createCommandEncoder(),n=i.beginRenderPass({colorAttachments:[{view:e.context.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]});n.setPipeline(c),n.draw(3,1,0,0),n.end(),e.device.queue.submit([i.finish()])};(async function(){await s()})();

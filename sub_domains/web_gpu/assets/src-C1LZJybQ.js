import"./modulepreload-polyfill-B5Qt9EMX.js";async function v(e){const{canvas:n,context:r,device:t}=await l();if(!(n||r||t))throw Error("canvas, context, device is required");const a="bgra8unorm";r.configure({device:t,format:a});const c={colorAttachments:[{view:r.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]},[s,d]=f(e,t),u=t.createRenderPipeline({vertex:{module:s,entryPoint:"main"},fragment:{module:d,entryPoint:"main",targets:[{format:a}]},primitive:{topology:"triangle-list"},layout:"auto"}),i=t.createCommandEncoder(),o=i.beginRenderPass(c);o.setPipeline(u),o.draw(3,1,0,0),o.end(),t.queue.submit([i.finish()])}async function l(){try{const e=document.getElementById("canvas");if(!e)throw Error("canvas is required");const n=await navigator.gpu.requestAdapter();if(!n)throw Error("navigator gpu");const r=await n.requestDevice(),t=e.getContext("webgpu");if(!e||!t||!r)throw Error("canvas, context, device is required");return{canvas:e,device:r,context:t}}catch(e){return console.error(e),{canvas:null,device:null,context:null}}}function f(e,n,r){return r?e.map(r):e.map(t=>n.createShaderModule({code:t}))}const m=`
        @vertex
        fn main(@builtin(vertex_index) VertexIndex : u32) -> @builtin(position) vec4<f32> {
            var positions = array<vec2<f32>, 3>(
                vec2<f32>(0.0, 0.5),
                vec2<f32>(-0.5, -0.5),
                vec2<f32>(0.5, -0.5)
            );
            let position = positions[VertexIndex];
            return vec4<f32>(position, 0.0, 1.0);
        }`,p=`
        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>(0.0, 1.0, 0.0, 1.0); // RGBA: Green
        }`;window.onload=()=>v([m,p]);

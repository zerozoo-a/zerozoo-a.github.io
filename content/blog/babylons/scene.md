---
title: babylon.js 알아보기
date: 2024-02-04 19:07:27
coverURL: 
---
<br />
<br />
<br />

## Scene

```js
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Black;

    const alpha =  Math.PI/4;
    const beta = Math.PI/3;
    const radius = 8;
    const target = new BABYLON.Vector3(0, 0, 0);

    const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.x = 0.5;
    box.position.y = 1;

    return scene;
};

const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
});
```

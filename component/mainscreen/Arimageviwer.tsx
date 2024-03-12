import React, { useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import { GLView } from "expo-gl";
import { Camera, CameraType } from "expo-camera";
import { Asset } from "expo-asset";

export default function Arimageviwer({ route }) {
  const { productUrl } = route.params;
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (Platform.OS === "web") {
        // On web, camera permissions are not required
        setPermission(true);
      } else {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermission(status === "granted");
      }
    };

    getCameraPermission();
  }, []);

  if (permission === null) {
    // Permission request is still pending
    return <View />;
  }

  if (!permission) {
    // Permission denied, you may want to display an error message
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Camera permission denied</Text>
      </View>
    );
  }
  const onContextCreate = async (gl) => {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(1, 1, 1, 1); // Set background color to white

    // Create vertex shader (shape & position)
    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(
      vert,
      `
      attribute vec2 position;
      varying vec2 texCoord;
  
      void main(void) {
        gl_Position = vec4(position, 0.0, 1.0);
        texCoord = (position + 1.0) / 2.0; // Normalize to [0, 1]
      }
    `
    );
    gl.compileShader(vert);

    // Create fragment shader (texture)
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(
      frag,
      `
      precision mediump float;
      uniform sampler2D texture;
      varying vec2 texCoord;
  
      void main(void) {
        gl_FragColor = texture2D(texture, texCoord);
      }
    `
    );
    gl.compileShader(frag);

    // Link together into a program
    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create a buffer with the vertex positions
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttrib = gl.getAttribLocation(program, "position");
    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttrib);

    // Load the image using Expo.Asset.fromModule
    const imageAsset = Asset.fromModule(productUrl);
    await imageAsset.downloadAsync();
    const texture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      imageAsset
    );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);

    // Render
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Use TRIANGLE_STRIP to cover the whole viewport

    gl.flush();
    gl.endFrameEXP();
  };



  return (
    <View style={{ flex: 1 }}>
      <Camera
        type={type}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <GLView
          style={{ width: 250, height: 250, margin: "auto" }}
          onContextCreate={onContextCreate}
        />
      </Camera>
    </View>
  );
}

// import React, { useState, useRef, useEffect } from "react";
// import { View } from "react-native";
// import { GLView } from "expo-gl";
// import { Camera, CameraType } from "expo-camera";
// import ExpoTHREE, { THREE } from "expo-three";

// export default function ArImageViewer() {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera type={type} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <GLView
//           style={{ width: 200, height: 200, margin: "auto" }}
//           onContextCreate={onContextCreate}
//         />
//       </Camera>
//     </View>
//   );
// }

// async function onContextCreate(gl) {
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
//   const renderer = new ExpoTHREE.Renderer({ gl });
//   renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

//   // Load the image texture
//   const textureLoader = new THREE.TextureLoader();
//   const texture = textureLoader.load(require('../../assets/product_img_1.png'));

//   // Create a plane with the image texture
//   const geometry = new THREE.PlaneGeometry(2, 2); // Adjust the size as needed
//   const material = new THREE.MeshBasicMaterial({ map: texture });
//   const plane = new THREE.Mesh(geometry, material);
//   scene.add(plane);

//   camera.position.z = 5;

//   const animate = () => {
//     requestAnimationFrame(animate);

//     // Rotate the plane or perform other animations here
//     plane.rotation.x += 0.01;
//     plane.rotation.y += 0.01;

//     renderer.render(scene, camera);
//     gl.endFrameEXP();
//   };

//   animate();
// }

// App.js
import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";

function Arimageviwer(props) {
  const renderer = useRef(null);
  const [imageVisible, setImageVisible] = useState(false);

  const toggleImage = () => {
    setImageVisible(!imageVisible);
  };

  const renderImage = () => {
    if (!renderer.current || !imageVisible) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const geometry = new THREE.BoxGeometry(1, 1, 0.1);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(require("../../assets/single_product.png")); // Image URL

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.z = -3;

    scene.add(cube);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.current.render(scene, camera);
    };

    animate();
  };

  const _onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    renderer.current = new Renderer({ gl });
    renderer.current.setSize(width, height);

    renderImage();
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back}>
        <GLView style={styles.glView} onContextCreate={_onContextCreate} />
      </Camera>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={toggleImage}>
          <Text style={styles.buttonText}>
            {imageVisible ? "Hide Image" : "Show Image"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 10,
  },
});

export default Arimageviwer;

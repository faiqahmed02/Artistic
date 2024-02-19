import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';

const Arimageviewer = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);
  const renderer = useRef(null);
  const scene = useRef(null);
  const cube = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleImage = () => {
    setImageVisible(!imageVisible);
  };

  const renderImage = () => {
    if (!renderer.current || !imageVisible) return;
  
    scene.current = new THREE.Scene();
  
    const geometry = new THREE.BoxGeometry(1, 1, 0.1);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://via.placeholder.com/512'); // Image URL
  
    const material = new THREE.MeshBasicMaterial({ map: texture });
    cube.current = new THREE.Mesh(geometry, material);
  
    // Adjust position to be in the center and in front of the camera
    cube.current.position.set(0, 0, -2);
  
    scene.current.add(cube.current);
  };

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    renderer.current = new Renderer({ gl });
    renderer.current.setSize(width, height);

    renderImage();
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);

    if (renderer.current && scene.current && cube.current) {
      cube.current.rotation.x += 0.01;
      cube.current.rotation.y += 0.01;

      renderer.current.render(scene.current, cameraRef);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <GLView style={styles.glView} onContextCreate={onContextCreate} />
      </Camera>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={toggleImage}>
          <Text style={styles.buttonText}>{imageVisible ? 'Hide Image' : 'Show Image'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
});

export default Arimageviewer;

// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';

// const AddHomeForm = ({ onAddHome }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     bedrooms: 0,
//     bathrooms: 0,
//     square_feet: 0,
//     price: '',
//     year_built: 0,
//     image_url: '',
//     zillow_link: '',
//     agent_id: 0,
//     bio: ''
//   });

//   const [error, setError] = useState(null);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a POST request to your server
//       const response = await fetch('/api/homes/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError('You must login to create a listing');
//         } else {
//           throw new Error('Failed to add home');
//         }
//       } else {
//         setError(null);
//         // Assuming onAddHome is a function to update the UI with the new home data
//         onAddHome(await response.json());

//         // Optional: Clear the form after submission
//         setFormData({
//           name: '',
//           address: '',
//           bedrooms: 0,
//           bathrooms: 0,
//           square_feet: 0,
//           price: '',
//           year_built: 0,
//           image_url: '',
//           zillow_link: '',
//           agent_id: 0,
//           bio: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error adding home:', error);
//       // Handle other errors, e.g., show a generic error message to the user
//     }
//   };

//   return (
//     <Container maxWidth="md" style={{marginTop:'5%'}}>
//       <form onSubmit={handleSubmit}>
//       {error && (
//           <Box mt={2} color="red">
//             {error}
//             </Box>
//       )}
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Bedrooms"
//               type="number"
//               name="bedrooms"
//               value={formData.bedrooms}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Bathrooms"
//               type="number"
//               name="bathrooms"
//               value={formData.bathrooms}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Square Feet"
//               type="number"
//               name="square_feet"
//               value={formData.square_feet}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Year Built"
//               type="number"
//               name="year_built"
//               value={formData.year_built}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Image URL"
//               name="image_url"
//               value={formData.image_url}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Zillow Link"
//               name="zillow_link"
//               value={formData.zillow_link}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Agent ID"
//               type="number"
//               name="agent_id"
//               value={formData.agent_id}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               label="Bio"
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//             />
//           </Grid>
//         </Grid>
//         <Box mt={2}>
//           <Button variant="contained" color="primary" type="submit">
//             Submit Listing Request
//           </Button>
//         </Box>
//       </form>
//     </Container>
//   );
// };

// export default AddHomeForm;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const Sphere = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Create sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: "#FDB813",
      roughness: 0.4,
    });

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Mesh is the combination of geometry and material
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Light
    const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
    light.position.set(0, 10, 10);
    scene.add(light);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);
    renderer.render(scene, camera);

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    // Resize
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.updateProjectionMatrix();
      camera.aspect = sizes.width / sizes.height;
      renderer.setSize(sizes.width, sizes.height);
    });

    const loop = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };

    loop();

    // Timeline animations
    const tl = gsap.timeline({ default: { duration: 1 } });
    tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
    tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

    // Mouse Animation Color - only want to change color when clicked
    let mouseDown = false;
    let rgb = [];
    window.addEventListener("mousedown", () => (mouseDown = true));
    window.addEventListener("mouseup", () => (mouseDown = false));

    window.addEventListener("mousemove", (e) => {
      if (mouseDown) {
        rgb = [
          Math.round((e.pageX / sizes.width) * 255),
          Math.round((e.pageY / sizes.height) * 255),
          150,
        ];

        // Animate
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        });
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", () => {});
      window.removeEventListener("mousedown", () => {});
      window.removeEventListener("mouseup", () => {});
      window.removeEventListener("mousemove", () => {});
    };
  }, []); // Empty dependency array ensures that useEffect runs only once

  return <canvas ref={canvasRef} className="webgl" />;
};

export default Sphere;


import React from 'react';
import * as THREE from 'three';
import '../App.css';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
class ThreeComponent extends React.Component {

    componentDidMount() {
        var threeWrapper = document.querySelector(".three_wrapper");
        threeWrapper.appendChild(this.renderer.domElement);
        this.scene.add(this.cube);
        this.scene.add(this.light);
        this.scene.add(this.light2)
        this.scene.add(this.ambientLight);        
        this.camera.position.z = 5;
        this.animate();
    }

    constructor(props) {
        super(props)
        this.scene = new THREE.Scene();
        //this.camera 0 new PerspectiveCamera(1,)
        this.camera = new THREE.PerspectiveCamera(40,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.light = new THREE.PointLight(0xffffff, .6);
        this.light2 = new THREE.PointLight(0xffffff, .4);

        this.light.position.set(10, 10, 10);
        this.light2.position.set(-10,-10,-10)
        this.ambientLight = new THREE.AmbientLight(0xbbbbbb);


        this.textureLoader = new THREE.TextureLoader();

        this.topTexture = this.textureLoader.load('../img/top.png');
        this.frontTexture = this.textureLoader.load('../img/front.png');
        this.leftTexture = this.textureLoader.load('../img/left.png');
        this.backTexture = this.textureLoader.load('../img/back.png');
        this.rightTexture = this.textureLoader.load('../../img/right.png');
        this.bottomTexture = this.textureLoader.load('../../img/bottom.png');

        // Use the linear filter for the textures to avoid blurriness
        this.frontTexture.minFilter
            = this.leftTexture.minFilter
            = this.backTexture.minFilter
            = this.rightTexture.minFilter
        this.topTexture.minFilter
            = this.bottomTexture.minFilter
            = THREE.LinearFilter;


        // Create the materials

        this.bookCover = new THREE.MeshLambertMaterial({ map: this.frontTexture });
        this.bookSpine = new THREE.MeshLambertMaterial({ map: this.leftTexture });
        this.bookBack = new THREE.MeshLambertMaterial({ map: this.backTexture });
        this.bookPages = new THREE.MeshLambertMaterial({ map: this.rightTexture });
        this.bookPagesTop = new THREE.MeshLambertMaterial({ map: this.topTexture });
        this.bookPagesBottom = new THREE.MeshLambertMaterial({ map: this.bottomTexture });


        this.materials = [
            this.bookPages,          // Right side
            this.bookSpine,          // Left side
            this.bookPagesTop, // Top side
            this.bookPagesBottom, // Bottom side
            this.bookCover,          // Front side
            this.bookBack            // Back side
        ];


      
        this.renderer = new THREE.WebGL1Renderer({ alpha: true });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.geometry = new THREE.BoxGeometry(1.8,1,2,2,1,1);
        //  this.geometry = new THREE.BoxGeometry(this.boxW,this.boxH,this.boxD)
         this.cube = new THREE.Mesh(this.geometry, this.materials);
        // this.cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 3, 4, 4, 1), materials)



         this.controls = new OrbitControls(this.camera, this.renderer.domElement);
         this.controls.enableDamping = true;
         this.controls.dampingFactor = 0.25;
         this.controls.enablePan = false;
         this.controls.enableZoom = false;



    }






    animate = () => {
        requestAnimationFrame(this.animate)

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
       
    }
    render() {
        return (

            <div id='document-body-01' className="three_wrapper">
            </div >

        )
    }

}


export default ThreeComponent
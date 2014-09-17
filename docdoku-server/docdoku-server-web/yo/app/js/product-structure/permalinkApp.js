/*global define,requestAnimationFrame*/
'use strict';

// Global Namespace for the application
var App = {
    SceneOptions: {
        zoomSpeed: 1.2,
        rotateSpeed: 1.0,
        panSpeed: 0.3,
        cameraNear: 10,
        cameraFar: 10000,
        defaultCameraPosition: {x: 0, y: 50, z: 200}
    }
};

define(function () {

    function PermalinkApp(filename, width, height) {

        var container = $("#container");
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, container.width() / container.height(), App.SceneOptions.cameraNear, App.SceneOptions.cameraFar);
        var control;
        var renderer = new THREE.WebGLRenderer({alpha: true});
        var texturePath = filename.substring(0, filename.lastIndexOf('/'));
        var extension = filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();

        camera.position.copy(App.SceneOptions.defaultCameraPosition);
        addLightsToCamera(camera);
        renderer.setSize(width, height);
        container.append(renderer.domElement);
        scene.add(camera);
        scene.updateMatrixWorld();
        control = new THREE.TrackballControls(camera, container[0]);

        function centerOn(mesh) {
            var boundingBox = mesh.geometry.boundingBox;
            var cog = new THREE.Vector3().copy(boundingBox.center()).applyMatrix4(mesh.matrix);
            var size = boundingBox.size();
            var radius = Math.max(size.x, size.y, size.z);
            var dir = new THREE.Vector3().copy(cog).sub(camera.position).normalize();
            var distance = radius ? radius * 2 : 1000;
            distance = distance < App.SceneOptions.cameraNear ? App.SceneOptions.cameraNear + 100 : distance;
            var endCamPos = new THREE.Vector3().copy(cog).sub(dir.multiplyScalar(distance));
            camera.position.copy(endCamPos);
        }

        function render() {
            scene.updateMatrixWorld();
            renderer.render(scene, camera);
        }

        function animate() {
            requestAnimationFrame(animate, null);
            control.update();
            render();
        }

        function addLightsToCamera(camera) {
            var dirLight = new THREE.DirectionalLight(0xffffff);
            dirLight.position.set(200, 200, 1000).normalize();
            camera.add(dirLight);
            camera.add(dirLight.target);
        }

        function getMeshGeometries(collada, geometries) {
            if (collada) {
                _.each(collada.children, function (child) {
                    if (child instanceof THREE.Mesh && child.geometry) {
                        geometries.push(child.geometry);
                    }
                    getMeshGeometries(child, geometries);
                });
            }
        }

        function onParseSuccess(geometry, material) {
            THREE.GeometryUtils.center(geometry);
            var mesh = new THREE.Mesh(geometry, material || new THREE.MeshPhongMaterial({ transparent: true, color: new THREE.Color(0xbbbbbb) }));
            scene.add(mesh);
            centerOn(mesh);
        }

        switch (extension) {

            case 'dae':

                var colladaLoader = new THREE.ColladaLoader();

                colladaLoader.load(filename, function (collada) {

                    var geometries = [], combined = new THREE.Geometry();
                    getMeshGeometries(collada.scene, geometries);

                    // Merge all sub meshes into one
                    _.each(geometries, function (geometry) {
                        THREE.GeometryUtils.merge(combined, geometry);
                    });

                    combined.dynamic = false;
                    combined.mergeVertices();

                    combined.computeBoundingSphere();

                    onParseSuccess(combined, null);

                });

                break;

            case 'stl':

                var stlLoader = new THREE.STLLoader();

                stlLoader.addEventListener('load', function (stl) {
                    var geometry = stl.content;
                    onParseSuccess(geometry, null);
                });

                stlLoader.load(filename);

                break;

            case 'js':
            case 'json':

                var binaryLoader = new THREE.BinaryLoader();

                binaryLoader.load(filename, function (geometry, materials) {
                    var _material = new THREE.MeshPhongMaterial({color: materials[0].color, overdraw: true });
                    geometry.dynamic = false;
                    onParseSuccess(geometry, _material);
                }, texturePath);

                break;

            default:
                break;

        }


        control.addEventListener('change', function () {
            render();
        });

        animate();


    }

    return PermalinkApp;
});
// 在THREEjs中，渲染一个3d世界的必要因素是场景（scene）、相机（camera）、渲染器（this.renderer）。渲染出一个3d世界后，可以往里面增加各种各样的物体、光源等，形成一个3d世界。

import * as THREE from 'three';
import { useEventListener } from '@vueuse/core';
import { throttle } from '@/utils/decorate';
import { ReactiveVariable } from 'vue/macros';

const sceneUrlList = [
  'https://qhyxpicoss.kujiale.com/r/2019/07/01/L3D137S8ENDIADDWAYUI5L7GLUF3P3WS888_3000x4000.jpg?x-oss-process=image/resize,m_fill,w_1600,h_920/format,webp',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dead58f03a61a8012049ef124133.jpg%403000w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636353181&t=8986b8074d4093d2fdc187ee5f562bd0'
];

export default class VrRoom {
  sceneUrl: string = sceneUrlList[Math.round(Math.random())];
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  isUserInteracting = true;
  onPointerDownPointerX = 0;
  onPointerDownPointerY = 0;
  lon = 0;
  onPointerDownLon = 0;
  lat = 0;
  onPointerDownLat = 0;
  phi = 0;
  theta = 0;
  target = '';
  refs: HTMLElement | undefined;
  throttleTime = 0;
  constructor(target: string, refs?: ReactiveVariable<HTMLElement>) {
    this.target = target;
    this.refs = refs;
    this.init();
  }
  init() {
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(this.sceneUrl, texture => {
      texture.mapping = THREE.UVMapping;

      this.initImg(texture);
      this.render();
    });
  }
  initImg(texture: THREE.Texture) {
    let container;
    // 容器宽度、高度
    const containerWidth = this.refs?.offsetWidth || window.innerWidth;
    const containerHeight = this.refs?.offsetHeight || window.innerHeight;
    if (!this.target) {
      throw new Error(`target is not existed: ${this.target}`);
    } else {
      container = document.querySelector<HTMLElement>(this.target);
    }
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(containerWidth, containerHeight);

    if (container?.childNodes?.length) {
      const childs = container?.childNodes;
      container.removeChild(childs[0]);
      container.appendChild(this.renderer.domElement);
    } else {
      container?.appendChild(this.renderer.domElement);
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 1, 1000);

    const geometry = new THREE.SphereBufferGeometry(500, 32, 16);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.geometry.scale(-1, 1, 1);
    this.scene.add(mesh);
    useEventListener(container, 'mousedown', this.onDocumentMouseDown.bind(this));
    useEventListener(container, 'mousemove', this.onDocumentMouseMove.bind(this));
    useEventListener(container, 'mouseup', this.onDocumentMouseUp.bind(this));
    useEventListener(container, 'mousewheel', this.onDocumentMouseWheel.bind(this));

    useEventListener(container, 'touchstart', this.onDocumentTouchStart.bind(this));
    useEventListener(container, 'touchmove', this.onDocumentTouchMove.bind(this));
  }

  @throttle()
  onDocumentMouseDown(event: { preventDefault: () => void; clientX: number; clientY: number }) {
    event.preventDefault();

    this.isUserInteracting = true;

    this.onPointerDownPointerX = event.clientX;
    this.onPointerDownPointerY = event.clientY;

    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;
  }

  @throttle()
  onDocumentMouseMove(event: { clientX: number; clientY: number }) {
    if (this.isUserInteracting) {
      this.lon = (this.onPointerDownPointerX - event.clientX) * 0.1 + this.onPointerDownLon;
      this.lat = (event.clientY - this.onPointerDownPointerY) * 0.1 + this.onPointerDownLat;
      this.render();
    }
  }

  @throttle()
  onDocumentMouseUp() {
    this.isUserInteracting = false;
    this.render();
  }

  @throttle()
  onDocumentMouseWheel(event: any) {
    this.camera.fov -= event.wheelDeltaY * 0.05;
    this.camera.updateProjectionMatrix();
    event = event || window.event;
    if (event?.stopPropagation) {
      // 这是取消冒泡
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
    if (event?.preventDefault) {
      // 这是取消默认行为
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    this.render();
  }

  @throttle()
  onDocumentTouchStart(event: any) {
    if (event?.touches?.length === 1) {
      event.preventDefault();

      this.onPointerDownPointerX = event.touches[0].pageX;
      this.onPointerDownPointerY = event.touches[0].pageY;

      this.onPointerDownLon = this.lon;
      this.onPointerDownLat = this.lat;
    }
  }

  @throttle()
  onDocumentTouchMove(event: any) {
    if (event?.touches?.length === 1) {
      event.preventDefault();
      this.lon =
        (this.onPointerDownPointerX - event.touches[0].pageX) * 0.1 + this.onPointerDownLon;
      this.lat =
        (event.touches[0].pageY - this.onPointerDownPointerY) * 0.1 + this.onPointerDownLat;

      this.render();
    }
  }

  render() {
    this.lon += 0.15;
    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);
    this.camera.position.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.position.y = 100 * Math.cos(this.phi);
    this.camera.position.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }
}

import * as THREE from 'three';

export class SpaceScene {
  readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  private readonly ship: THREE.Group;
  private readonly clock = new THREE.Clock();
  private frame = 0;
  constructor(host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0.2, 8);
    this.scene.add(new THREE.AmbientLight(0x456080, 1.2));
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.05, 32, 16), new THREE.MeshBasicMaterial({ color: 0xffc46b }));
    sun.position.set(-3.7, 1.25, -2); this.scene.add(sun);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 16), new THREE.MeshBasicMaterial({ color: 0xffa13d, transparent: true, opacity: 0.12 }));
    halo.position.copy(sun.position); this.scene.add(halo);
    this.scene.add(this.createStars());
    this.ship = new THREE.Group();
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.9, 4), new THREE.MeshStandardMaterial({ color: 0xd6f2ed, emissive: 0x173943, metalness: 0.5, roughness: 0.4 }));
    body.rotation.x = -Math.PI / 2; this.ship.add(body);
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.06, 0.25), new THREE.MeshBasicMaterial({ color: 0x6ee7d8 })); this.ship.add(fin);
    this.ship.position.set(0, -0.35, 1.4); this.ship.rotation.z = 0.08; this.scene.add(this.ship);
    this.resize(); window.addEventListener('resize', this.resize);
    this.render();
  }
  private createStars(): THREE.Points { const count = 900; const positions = new Float32Array(count * 3); for (let i = 0; i < count * 3; i += 3) { positions[i] = (Math.random() - 0.5) * 35; positions[i + 1] = (Math.random() - 0.5) * 20; positions[i + 2] = -Math.random() * 24; } const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(positions, 3)); return new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xb8d9e5, size: 0.035, transparent: true, opacity: 0.8 })); }
  private resize = (): void => { const { clientWidth: width, clientHeight: height } = this.renderer.domElement.parentElement ?? { clientWidth: window.innerWidth, clientHeight: window.innerHeight }; this.camera.aspect = width / Math.max(height, 1); this.camera.updateProjectionMatrix(); this.renderer.setSize(width, height, false); };
  private render = (): void => { this.frame = requestAnimationFrame(this.render); const elapsed = this.clock.getElapsedTime(); this.ship.position.y = -0.35 + Math.sin(elapsed * 1.2) * 0.035; this.ship.rotation.z = 0.08 + Math.sin(elapsed * 0.7) * 0.012; this.renderer.render(this.scene, this.camera); };
  dispose(): void { cancelAnimationFrame(this.frame); window.removeEventListener('resize', this.resize); this.renderer.dispose(); }
}

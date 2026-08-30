uniform float uTimer;
void main() {
    vec3 newPosition = position;
    newPosition.z = sin(length(position.xy +uTimer));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
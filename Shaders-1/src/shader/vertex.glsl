uniform float uTimer;
void main() {
    vec3 newPosition = position;
    float dist = length(position.xy);
    newPosition.z = sin(position.x+uTimer+dist);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
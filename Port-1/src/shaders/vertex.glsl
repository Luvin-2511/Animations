uniform float uTimer;
uniform float uVelocity;
uniform float uHover;
uniform vec2 uRippleOrigin;
float frequency = 4.0;
float amplitude = 0.1;
float speed = 2.0;

void main() {
    vec3 newPosition = position;
    float dist = distance(position.xy, uRippleOrigin);
    float ripple = sin(dist * frequency + uTimer * speed) * amplitude;
    newPosition.z += ripple * uHover;
    newPosition.x += position.y * uVelocity * 20.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
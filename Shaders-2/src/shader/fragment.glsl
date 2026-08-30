uniform float uTimer;
void main() {
    gl_FragColor = vec4(sin(uTimer), 0.0, 1.0, 1.0);
}
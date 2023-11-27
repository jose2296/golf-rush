import { DoubleSide, Shape as ThreeShape } from 'three';

const Truss1 = () => {
    const x = -5, y = -10;

    const heartShape = new ThreeShape();

    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7,x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    return (
        <mesh scale={[.1, .1, .1]}>
            <shapeGeometry args={[heartShape]} />
            <meshStandardMaterial color='orange' side={DoubleSide} />
        </mesh>
    );
};

export default Truss1;

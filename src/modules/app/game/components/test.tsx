import { Extrude } from '@react-three/drei';
import { DoubleSide, Shape as ThreeShape } from 'three';
import { RigidBody } from '@react-three/rapier';

const Truss1 = () => {
    // const x = -5, y = -10;

    // const heartShape = new ThreeShape();
    
    // heartShape.moveTo(x + 5, y + 5);
    // heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    // heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7,x - 6, y + 7);
    // heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    // heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    // heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    // heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const x = 0;
    const y = 0;
    const heartShape = new ThreeShape();
    heartShape.moveTo(x, y);
    heartShape.lineTo(x+ 5, y);
    heartShape.lineTo(x + 5, y - 5);
    heartShape.lineTo(x + 10, y - 5);
    heartShape.lineTo(x + 10, y);
    heartShape.lineTo(x + 50, y);
    heartShape.lineTo(x + 50, y - 15);
    heartShape.lineTo(x - 50, y - 15);
    heartShape.lineTo(x - 50, y);
    heartShape.lineTo(x, y);
    
    // heartShape.bezierCurveTo(x, y, x, y, x, y);
    // heartShape.bezierCurveTo(x + 5, y, x + 5, y, x + 5, y);
    // heartShape.bezierCurveTo(x + 5, y, x + 5, y - 5, x, y);

    return (
        <RigidBody name='shape' type='fixed' colliders='trimesh' ccd={true} friction={2}>
            <Extrude position={[0,0,-5]} args={[heartShape, { depth: 20 }]}>
                {/* <shapeGeometry args={[heartShape]} /> */}
                <meshStandardMaterial color='red' side={DoubleSide} />
            </Extrude>   
        </RigidBody>

        // <mesh scale={[.1, .1, .1]}>
        //     <shapeGeometry args={[heartShape]} />
        //     <meshStandardMaterial color='orange' side={DoubleSide} />
        // </mesh>
    );
};

export default Truss1;

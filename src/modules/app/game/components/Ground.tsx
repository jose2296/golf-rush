import { Box, Extrude } from '@react-three/drei';
import { RigidBody, interactionGroups } from '@react-three/rapier';
import { DoubleSide, Shape as ThreeShape } from 'three';

const Ground = () => {
    const groundSize = {
        width: 50,
        height: 6,
        depth: 5,
    };
    const groundColor = 'red';
    const collisionGroups = interactionGroups(0, [1, 0]);

    const x = 0;
    const y = 0;
    const heartShape = new ThreeShape();
    heartShape.moveTo(x, y);
    heartShape.lineTo(x + 5, y);
    heartShape.lineTo(x + 5, y - 5);
    heartShape.lineTo(x + 10, y - 5);
    heartShape.lineTo(x + 10, y);
    heartShape.lineTo(x + 50, y);
    heartShape.lineTo(x + 50, y - 15);
    heartShape.lineTo(x - 50, y - 15);
    heartShape.lineTo(x - 50, y);
    heartShape.lineTo(x, y);

    return (
        <group>
            <RigidBody collisionGroups={collisionGroups} name='shape' type='fixed' colliders='trimesh' ccd={true} friction={2}>
                <Extrude position={[0,0,-groundSize.depth / 2]} args={[heartShape, { depth: groundSize.depth }]}>
                    {/* <shapeGeometry args={[heartShape]} /> */}
                    <meshStandardMaterial color={groundColor} side={DoubleSide} />
                </Extrude>
            </RigidBody>

            {/* <RigidBody name='ground' type='fixed' ccd={true} friction={2}>
                <Box args={[groundSize.width, groundSize.height, groundSize.depth]} position={[0, -groundSize.height / 2, 0]}>
                    <meshStandardMaterial color={groundColor} />
                </Box>
            </RigidBody> */}

            <RigidBody collisionGroups={collisionGroups} name='ground' type='fixed' ccd={true} friction={2}>
                <Box args={[groundSize.height, groundSize.width, groundSize.depth]} position={[groundSize.width / 2 + groundSize.height / 2, groundSize.width / 2, 0]}>
                    <meshStandardMaterial color={groundColor} />
                </Box>
            </RigidBody>

            <RigidBody collisionGroups={collisionGroups} name='ground' type='fixed' ccd={true} friction={2}>
                <Box args={[groundSize.height, groundSize.width, groundSize.depth]} position={[-groundSize.width / 2 - groundSize.height / 2, groundSize.width / 2, 0]}>
                    <meshStandardMaterial color={groundColor} />
                </Box>
            </RigidBody>

            <RigidBody collisionGroups={collisionGroups} name='ground' type='fixed' ccd={true} friction={2}>
                <Box args={[groundSize.width, groundSize.width * 2, groundSize.depth]} position={[0, 0, -groundSize.depth]}>
                    <meshStandardMaterial transparent opacity={0} />
                </Box>
            </RigidBody>

            {/* Front transparent ground */}
            <RigidBody collisionGroups={collisionGroups} name='ground' type='fixed' ccd={true} friction={2}>
                <Box args={[groundSize.width, groundSize.width * 2, groundSize.depth]} position={[0, 0, groundSize.depth]}>
                    <meshStandardMaterial transparent opacity={0} />
                </Box>
            </RigidBody>
        </group>
    );
};

export default Ground;

import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const Ground = () => {
    const groundSize = {
        width: 50,
        height: 6,
        depth: 2
    };

    return (
        <group>
            <RigidBody name='ground' type='fixed' ccd={true} friction={2}>
                <Box args={[groundSize.width, groundSize.height, groundSize.depth]} position={[0, -groundSize.height / 2, 0]}>
                    <meshStandardMaterial color={'red'} />
                </Box>
            </RigidBody>

            <RigidBody name='ground' type='fixed' ccd={true} friction={2}>
                <Box args={[groundSize.height, groundSize.width, groundSize.depth]} position={[groundSize.width / 2 + groundSize.height / 2, groundSize.width / 2, 0]}>
                    <meshStandardMaterial color={'red'} />
                </Box>
            </RigidBody>

            <RigidBody name='ground' type='fixed' ccd={true} friction={2}>
                <Box args={[groundSize.height, groundSize.width, groundSize.depth]} position={[-groundSize.width / 2 - groundSize.height / 2, groundSize.width / 2, 0]}>
                    <meshStandardMaterial color={'red'} />
                </Box>
            </RigidBody>
        </group>
    );
};

export default Ground;

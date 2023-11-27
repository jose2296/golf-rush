import { Line, Sphere, Trail, useKeyboardControls } from '@react-three/drei';
import { MeshProps, useFrame } from '@react-three/fiber';
import { CollisionEnterPayload, CollisionExitPayload, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { ReactElement, forwardRef, useRef, useState } from 'react';
import { Mesh, PlaneGeometry, Shape, ShapeGeometry, SphereGeometry, Vector2, Vector3 } from 'three';
import { Controls } from '../game';

type RoundedRectGeometryProps = MeshProps & { width: number, height: number, borderRadius?: number, children: ReactElement }


function TrailScene() {
    const group = useRef<Mesh>(null!);
    const sphere = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // group.current.rotation.z = t;

        sphere.current.position.x = Math.sin(t * 2) * 2;
        sphere.current.position.z = Math.cos(t * 2) * 2;
    });

    return (
        <>
            <group ref={group}>
                <Trail
                    width={1}
                    length={4}
                    color={'#F8D628'}
                    attenuation={(t: number) => {
                        return t * t;
                    }}
                >
                    <Sphere ref={sphere} args={[0.1, 32, 32]} position-y={3}>
                        <meshNormalMaterial />
                    </Sphere>
                </Trail>
            </group>

            <axesHelper />
        </>
    );
}







const RoundedRectGeometry = forwardRef<Mesh, RoundedRectGeometryProps>(({ width, height, borderRadius = height / 2, children, ...props }, ref) => {
    const shape = new Shape([new Vector2(5,0)]);
    shape.moveTo(0, 0);
    shape.lineTo(width - borderRadius, 0);
    shape.quadraticCurveTo(width, 0, width, borderRadius);
    shape.lineTo(width, height - borderRadius);
    shape.quadraticCurveTo(width, height, width - borderRadius, height);
    shape.lineTo(0, height);
    shape.lineTo(0, 0);

    return (
        <mesh geometry={new ShapeGeometry(shape)} ref={ref} {...props}>
            {children}
        </mesh>
    );
});

type a = MeshProps & { isPlayer?: boolean, type?: 'fixed' | 'dynamic', color?: string }

const Ball = ({ isPlayer, type = 'dynamic', color = '#dd3beb', ...props }: a) => {
    const [, get] = isPlayer ? useKeyboardControls() : [];
    const MOVEMENT_SPEED = 0.1;
    const vel = new Vector3();
    const ball = useRef<RapierRigidBody>(null);
    const sphereBall = useRef<Mesh<SphereGeometry>>(null);
    const inTheAir = useRef(false);
    const planeRef = useRef<Mesh<PlaneGeometry>>(null);
    const planeRef2 = useRef<Mesh<PlaneGeometry>>(null);
    const maxPower = 100;
    const maxPlaneWidth = 8;
    const lineWidth = 5;

    const a = useRef();

    const power = useRef<number>(0);
    const isCharing = useRef<boolean>(false);
    const lineRef = useRef(null);
    const [linePoints, setLinePoints] = useState<any>([[0, 2, 0], [Math.cos(0 * Math.PI / 180) * lineWidth + 0, Math.sin(0 * Math.PI / 180) * lineWidth + 2, 0]]);
    const [ballDirectionDegrees, setBallDirectionDegrees] = useState<number>(45);

    const [planeWidth, setPlaneWidth] = useState<number>(0);

    useFrame(() => {
        const curVel = ball.current?.linvel();

        if (isPlayer && get) {
            if (get()[Controls.forward]) {
                vel.z -= MOVEMENT_SPEED;
            }

            if (get()[Controls.back]) {
                vel.z += MOVEMENT_SPEED;
            }

            if (get()[Controls.left]) {
                setBallDirectionDegrees(ballDirectionDegrees + 2);
                vel.x -= MOVEMENT_SPEED;
            }

            if (get()[Controls.right]) {
                setBallDirectionDegrees(ballDirectionDegrees - 2);
                vel.x += MOVEMENT_SPEED;
            }

            if (curVel) {
                vel.y = curVel.y;
                vel.x = curVel.x;
            }
            ball.current?.setLinvel(vel, true);

            if (ball.current && planeRef.current && lineRef.current) {
                const {x, y} = ball.current.worldCom();
                planeRef.current?.position.set(x - maxPlaneWidth / 2, y - 4 , 2);
                planeRef2.current?.position.set(x - maxPlaneWidth / 2, y - 3.9 , 2.001);

                const points = [[x, y, 0], [Math.cos(ballDirectionDegrees * Math.PI / 180) * lineWidth + x, Math.sin(ballDirectionDegrees * Math.PI / 180) * lineWidth + y, 0]];
                // lineRef.current.geometry.setFromPoints(points);
                // lineRef.current.geometry.verticesNeedUpdate = true;

                setLinePoints(points);
            }

            // Hit handler when press space key and release it
            if (get()[Controls.jump]) {
                power.current = power.current < maxPower ? power.current + 1 : power.current;
                isCharing.current = true;

                if (ball.current && planeRef2.current && planeRef.current) {
                    const powerPercentage = power.current * 100 / maxPower;
                    const barPowerWidth = powerPercentage * (maxPlaneWidth - 0.2) / 100;
                    setPlaneWidth(barPowerWidth);

                    planeRef2.current.position.x = planeRef2.current.position.x + 0.1;

                }
            } else {
                if (isCharing.current) {
                    console.log('HIT!!');

                    const impulseX = Math.cos(ballDirectionDegrees * Math.PI / 180) * power.current * 5;
                    const impulseY = Math.sin(ballDirectionDegrees * Math.PI / 180) * power.current * 5;

                    ball.current?.applyImpulse({x: impulseX, y: impulseY, z: 0}, true);

                    power.current = 0;
                    setPlaneWidth(0);
                    isCharing.current = false;
                }
            }
        }
    });


    const onCollisionEnter = ({ other }: CollisionEnterPayload) => {
        if (other.rigidBodyObject?.name === 'ground') {
            inTheAir.current = false;
        }
    };
    const onCollisionExit = ({ other }: CollisionExitPayload) => {
        if (other.rigidBodyObject?.name === 'ground') {
            inTheAir.current = true;
        }
    };

    return (
        <>
            <RigidBody ref={ball} type={type} restitution={1} friction={20} ccd={true} colliders={'ball'} onCollisionEnter={onCollisionEnter} onCollisionExit={onCollisionExit}>
                <Trail
                    width={2}
                    length={6}
                    color={color}
                    attenuation={(t: number) => {
                        return t * 10;
                    }}
                >
                    <Sphere visible={true} ref={sphereBall} {...props} args={[2]}>
                        <meshStandardMaterial color={color} />
                    </Sphere>
                </Trail>
            </RigidBody>


            {isPlayer &&
                <>
                    <RoundedRectGeometry ref={planeRef} visible={isCharing.current} width={maxPlaneWidth} height={1.2}>
                        <meshStandardMaterial color={'black'} />
                    </RoundedRectGeometry>

                    <RoundedRectGeometry ref={planeRef2} visible={isCharing.current} width={planeWidth} height={1}>
                        <meshStandardMaterial color={color} />
                    </RoundedRectGeometry>

                    <Line ref={lineRef} points={linePoints} lineWidth={5} color={color}>
                        <lineBasicMaterial color={color} />
                    </Line>
                </>
            }
        </>
    );
};

export default Ball;

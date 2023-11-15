const Pencil = ({ fill = '202020', stroke }: { fill?: string; stroke?: string }) => (
    <svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg' aria-labelledby='title' aria-describedby='desc' role='img'>
        <path d='M10.239 42.86L45.812 7.328l10.848 10.86L21.086 53.72z' fill={fill} stroke={stroke} data-name='layer1'></path>
        <path fill={fill} stroke={stroke} d='M59.492 15.358l2.259-2.258A7.674 7.674 0 1 0 50.9 2.248L48.639 4.5z' data-name='layer2'></path>
        <path d='M7.851 46.135L-.073 64.024 17.816 56.1l-9.965-9.965z' fill={fill} stroke={stroke} data-name='layer1'></path>
    </svg>
);

export default Pencil;

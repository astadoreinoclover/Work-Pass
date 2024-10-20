import Svg, { Path } from 'react-native-svg';

const EmailIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24">
        <Path d="M12 13.293l-6.293-6.293L4.707 6 12 13.293 19.293 6l-1.414-1.414z" fill="#4CAF50" />
        <Path d="M2 4h20v16H2z" fill="none" />
        <Path d="M22 4H2v16h20V4zm-1 1v14H3V5h18z" fill="#4CAF50" />
    </Svg>
);

export default EmailIcon
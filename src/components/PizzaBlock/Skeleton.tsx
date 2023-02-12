import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="140" r="120" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="30" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="90" />
    <rect x="0" y="425" rx="5" ry="5" width="110" height="40" />
    <rect x="150" y="415" rx="30" ry="30" width="130" height="60" />
  </ContentLoader>
);

export default Skeleton;

import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader
    speed={1}
    width={941}
    height={140}
    viewBox="0 0 941 140"
    backgroundColor="#6b6b6b"
    foregroundColor="#fff"
    {...props}
  >
    <rect x="779" y="15" rx="3" ry="3" width="90" height="18" />
    <rect x="779" y="37" rx="3" ry="3" width="90" height="10" />
    <rect x="0" y="15" rx="3" ry="3" width="410" height="18" />
    <rect x="0" y="40" rx="3" ry="3" width="30" height="10" />
    <rect x="40" y="40" rx="3" ry="3" width="30" height="10" />
    <rect x="80" y="40" rx="3" ry="3" width="30" height="10" />
    <rect x="0" y="60" rx="3" ry="3" width="678" height="6" />
    <rect x="0" y="75" rx="3" ry="3" width="530" height="6" />
    <rect x="0" y="90" rx="3" ry="3" width="678" height="6" />
    <rect x="0" y="105" rx="3" ry="3" width="530" height="6" />
    <circle cx="903" cy="30" r="26" />
  </ContentLoader>
);

export default MyLoader;

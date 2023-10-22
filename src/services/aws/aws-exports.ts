const awsConfig = {
  aws_project_region: "eu-west-2",
  Auth: {
    region: "eu-west-2",
    userPoolId: process.env.REACT_APP_USER_POOL_ID!,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID!,
  },
};

export default awsConfig;

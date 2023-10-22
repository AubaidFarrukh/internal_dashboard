import { FC, ReactNode } from "react";
import { Amplify } from "aws-amplify";
import awsConfig from "../services/aws/aws-exports";

interface AmplifyClientProps {
  children: ReactNode;
}

export const AmplifyClient: FC<AmplifyClientProps> = ({ children }) => {
  Amplify.configure(awsConfig);

  return <>{children}</>;
};

export default AmplifyClient;

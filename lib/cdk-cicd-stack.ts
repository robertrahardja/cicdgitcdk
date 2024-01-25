import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, "CdkCicdPipeline", {
      pipelineName: "CdkCicdPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("robertrahardja/cicdgitcdk", "main", {
          authentication: cdk.SecretValue.secretsManager("github-token"),
          // branch: 'main',
        }),
        commands: [
          "pwd",
          "cat README.md",
          "ls -al",
          // "cd cdk-cicd",
          "npm ci",
          // 'npm run build',
          "npx cdk synth",
        ],
      }),
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkCicdQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

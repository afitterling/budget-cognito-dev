
import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
import { fileURLToPath as topLevelFileUrlToPath, URL as topLevelURL } from "url"
const __filename = topLevelFileUrlToPath(import.meta.url)
const __dirname = topLevelFileUrlToPath(new topLevelURL(".", import.meta.url))

var __defProp = Object.defineProperty;
var __export = (target, all47) => {
  for (var name in all47)
    __defProp(target, name, { get: all47[name], enumerable: true });
};

// <define:$app>
var define_app_default = { name: "budget-dev", stage: "alexanderfitterling", removal: "remove", providers: { aws: { defaultTags: { tags: { "sst:app": "budget-dev", "sst:stage": "alexanderfitterling" } }, region: "eu-central-1" } }, home: "aws", version: "", protect: false, backend: "", removalPolicy: "" };

// <define:$cli>
var define_cli_default = { command: "remove", dev: false, paths: { home: "/Users/alexanderfitterling/Library/Application Support/sst", platform: "/Users/alexanderfitterling/dev/auth-pools/budget-cognito-dev/.sst/platform", root: "/Users/alexanderfitterling/dev/auth-pools/budget-cognito-dev", work: "/Users/alexanderfitterling/dev/auth-pools/budget-cognito-dev/.sst" }, state: { version: { MyIdentityPool: 1, MyIdentityPoolLinkRef: 1, MyUserPool: 1, MyUserPoolLinkRef: 1, MyUserPoolTriggerpreSignUp: 1, Web: 1, WebLinkRef: 1 } } };

// .sst/platform/src/shim/run.js
import * as util from "@pulumi/pulumi";

// .sst/platform/src/components/link.ts
import {
  runtime as runtime2,
  output as output4,
  all as all3,
  ComponentResource as ComponentResource2
} from "@pulumi/pulumi";

// .sst/platform/src/components/error.ts
var VisibleError = class extends Error {
  constructor(...message) {
    super(message.join("\n"));
  }
};

// .sst/platform/src/components/linkable.ts
import { output as output3 } from "@pulumi/pulumi";

// .sst/platform/src/components/component.ts
import {
  ComponentResource,
  runtime,
  output as output2,
  asset as pulumiAsset,
  all as all2
} from "@pulumi/pulumi";

// .sst/platform/src/components/naming.ts
import crypto from "crypto";
function logicalName(name) {
  name = name.replace(/[^a-zA-Z0-9]/g, "");
  return name.charAt(0).toUpperCase() + name.slice(1);
}
function physicalName(max, name, suffix = "") {
  const main = prefixName(max - 9 - suffix.length, name);
  const random = hashStringToPrettyString(
    crypto.randomBytes(8).toString("hex"),
    8
  );
  return `${main}-${random}${suffix}`;
}
function prefixName(max, name) {
  name = name.replace(/[^a-zA-Z0-9]/g, "");
  const stageLen = define_app_default.stage.length;
  const nameLen = name.length;
  const strategy = nameLen + 1 >= max ? "name" : nameLen + stageLen + 2 >= max ? "stage+name" : "app+stage+name";
  if (strategy === "name") return `${name.substring(0, max)}`;
  if (strategy === "stage+name")
    return `${define_app_default.stage.substring(0, max - nameLen - 1)}-${name}`;
  return `${define_app_default.name.substring(0, max - stageLen - nameLen - 2)}-${define_app_default.stage}-${name}`;
}
function hashNumberToPrettyString(number, length) {
  const charLength = PRETTY_CHARS.length;
  let hash = "";
  while (number > 0) {
    hash = PRETTY_CHARS[number % charLength] + hash;
    number = Math.floor(number / charLength);
  }
  hash = hash.slice(0, length);
  while (hash.length < length) {
    hash = "s" + hash;
  }
  return hash;
}
function hashStringToPrettyString(str, length) {
  const hash = crypto.createHash("sha256");
  hash.update(str);
  const num = Number("0x" + hash.digest("hex").substring(0, 16));
  return hashNumberToPrettyString(num, length);
}
var PRETTY_CHARS = "abcdefhkmnorstuvwxz";

// .sst/platform/src/components/component.ts
var outputId = "Calling [toString] on an [Output<T>] is not supported.\n\nTo get the value of an Output<T> as an Output<string> consider either:\n1: o.apply(v => `prefix${v}suffix`)\n2: pulumi.interpolate `prefix${v}suffix`\n\nSee https://www.pulumi.com/docs/concepts/inputs-outputs for more details.\nThis function may throw in a future version of @pulumi/pulumi.";
function transform(transform2, name, args, opts) {
  if (typeof transform2 === "function") {
    transform2(args, opts, name);
    return [name, args, opts];
  }
  return [name, { ...args, ...transform2 }, opts];
}
var Component = class extends ComponentResource {
  componentType;
  componentName;
  constructor(type, name, args, opts) {
    const transforms = ComponentTransforms.get(type) ?? [];
    for (const transform2 of transforms) {
      transform2({ name, props: args, opts });
    }
    super(type, name, args, {
      transformations: [
        // Ensure logical and physical names are prefixed
        (args2) => {
          if (name.includes(" "))
            throw new Error(
              `Invalid component name "${name}" (${args2.type}). Component names cannot contain spaces.`
            );
          if (args2.type !== type && // @ts-expect-error
          !args2.name.startsWith(args2.opts.parent.__name)) {
            throw new Error(
              `In "${name}" component, the logical name of "${args2.name}" (${args2.type}) is not prefixed with parent's name ${// @ts-expect-error
              args2.opts.parent.__name}`
            );
          }
          if (args2.type.startsWith("sst:")) return;
          if ([
            // resources manually named
            "aws:cloudwatch/logGroup:LogGroup",
            "aws:ecs/service:Service",
            "aws:ecs/taskDefinition:TaskDefinition",
            "aws:lb/targetGroup:TargetGroup",
            "aws:servicediscovery/privateDnsNamespace:PrivateDnsNamespace",
            "aws:servicediscovery/service:Service",
            // resources not prefixed
            "pulumi-nodejs:dynamic:Resource",
            "random:index/randomId:RandomId",
            "random:index/randomPassword:RandomPassword",
            "command:local:Command",
            "tls:index/privateKey:PrivateKey",
            "aws:acm/certificate:Certificate",
            "aws:acm/certificateValidation:CertificateValidation",
            "aws:apigateway/basePathMapping:BasePathMapping",
            "aws:apigateway/deployment:Deployment",
            "aws:apigateway/domainName:DomainName",
            "aws:apigateway/integration:Integration",
            "aws:apigateway/integrationResponse:IntegrationResponse",
            "aws:apigateway/method:Method",
            "aws:apigateway/methodResponse:MethodResponse",
            "aws:apigateway/resource:Resource",
            "aws:apigateway/response:Response",
            "aws:apigateway/stage:Stage",
            "aws:apigateway/usagePlanKey:UsagePlanKey",
            "aws:apigatewayv2/apiMapping:ApiMapping",
            "aws:apigatewayv2/domainName:DomainName",
            "aws:apigatewayv2/integration:Integration",
            "aws:apigatewayv2/route:Route",
            "aws:apigatewayv2/stage:Stage",
            "aws:appautoscaling/target:Target",
            "aws:appsync/dataSource:DataSource",
            "aws:appsync/domainName:DomainName",
            "aws:appsync/domainNameApiAssociation:DomainNameApiAssociation",
            "aws:appsync/function:Function",
            "aws:appsync/resolver:Resolver",
            "aws:ec2/routeTableAssociation:RouteTableAssociation",
            "aws:ecs/clusterCapacityProviders:ClusterCapacityProviders",
            "aws:efs/fileSystem:FileSystem",
            "aws:efs/mountTarget:MountTarget",
            "aws:efs/accessPoint:AccessPoint",
            "aws:iam/accessKey:AccessKey",
            "aws:iam/instanceProfile:InstanceProfile",
            "aws:iam/policy:Policy",
            "aws:iam/userPolicy:UserPolicy",
            "aws:cloudfront/cachePolicy:CachePolicy",
            "aws:cloudfront/distribution:Distribution",
            "aws:cognito/identityPoolRoleAttachment:IdentityPoolRoleAttachment",
            "aws:cognito/identityProvider:IdentityProvider",
            "aws:cognito/userPoolClient:UserPoolClient",
            "aws:lambda/eventSourceMapping:EventSourceMapping",
            "aws:lambda/functionEventInvokeConfig:FunctionEventInvokeConfig",
            "aws:lambda/functionUrl:FunctionUrl",
            "aws:lambda/invocation:Invocation",
            "aws:lambda/permission:Permission",
            "aws:lambda/provisionedConcurrencyConfig:ProvisionedConcurrencyConfig",
            "aws:lb/listener:Listener",
            "aws:lb/listenerRule:ListenerRule",
            "aws:opensearch/domainPolicy:DomainPolicy",
            "aws:rds/proxyDefaultTargetGroup:ProxyDefaultTargetGroup",
            "aws:rds/proxyTarget:ProxyTarget",
            "aws:route53/record:Record",
            "aws:s3/bucketCorsConfigurationV2:BucketCorsConfigurationV2",
            "aws:s3/bucketNotification:BucketNotification",
            "aws:s3/bucketObject:BucketObject",
            "aws:s3/bucketObjectv2:BucketObjectv2",
            "aws:s3/bucketPolicy:BucketPolicy",
            "aws:s3/bucketPublicAccessBlock:BucketPublicAccessBlock",
            "aws:s3/bucketVersioningV2:BucketVersioningV2",
            "aws:s3/bucketWebsiteConfigurationV2:BucketWebsiteConfigurationV2",
            "aws:secretsmanager/secretVersion:SecretVersion",
            "aws:ses/domainIdentityVerification:DomainIdentityVerification",
            "aws:sesv2/configurationSetEventDestination:ConfigurationSetEventDestination",
            "aws:sesv2/emailIdentity:EmailIdentity",
            "aws:sns/topicPolicy:TopicPolicy",
            "aws:sns/topicSubscription:TopicSubscription",
            "aws:sqs/queuePolicy:QueuePolicy",
            "aws:ssm/parameter:Parameter",
            "cloudflare:index/dnsRecord:DnsRecord",
            "cloudflare:index/workersCronTrigger:WorkersCronTrigger",
            "cloudflare:index/workersCustomDomain:WorkersCustomDomain",
            "docker-build:index:Image",
            "vercel:index/dnsRecord:DnsRecord"
          ].includes(args2.type))
            return;
          const namingRules = {
            "aws:apigateway/apiKey:ApiKey": ["name", 1024],
            "aws:apigateway/authorizer:Authorizer": ["name", 128],
            "aws:apigateway/restApi:RestApi": ["name", 128],
            "aws:apigateway/usagePlan:UsagePlan": ["name", 65536],
            // no length limit
            "aws:apigatewayv2/api:Api": ["name", 128],
            "aws:apigatewayv2/authorizer:Authorizer": ["name", 128],
            "aws:apigatewayv2/vpcLink:VpcLink": ["name", 128],
            "aws:appautoscaling/policy:Policy": ["name", 255],
            "aws:appsync/graphQLApi:GraphQLApi": ["name", 65536],
            "aws:cloudwatch/eventBus:EventBus": ["name", 256],
            "aws:cloudwatch/eventTarget:EventTarget": ["targetId", 64],
            "aws:cloudwatch/eventRule:EventRule": ["name", 64],
            "aws:cloudfront/function:Function": ["name", 64],
            "aws:cloudfront/keyValueStore:KeyValueStore": ["name", 64],
            "aws:cognito/identityPool:IdentityPool": ["identityPoolName", 128],
            "aws:cognito/userPool:UserPool": ["name", 128],
            "aws:dynamodb/table:Table": ["name", 255],
            "aws:ec2/keyPair:KeyPair": ["keyName", 255],
            "aws:ec2/eip:Eip": ["tags", 255],
            "aws:ec2/instance:Instance": ["tags", 255],
            "aws:ec2/internetGateway:InternetGateway": ["tags", 255],
            "aws:ec2/natGateway:NatGateway": ["tags", 255],
            "aws:ec2/routeTable:RouteTable": ["tags", 255],
            "aws:ec2/securityGroup:SecurityGroup": ["tags", 255],
            "aws:ec2/defaultSecurityGroup:DefaultSecurityGroup": ["tags", 255],
            "aws:ec2/subnet:Subnet": ["tags", 255],
            "aws:ec2/vpc:Vpc": ["tags", 255],
            "aws:ecs/cluster:Cluster": ["name", 255],
            "aws:elasticache/parameterGroup:ParameterGroup": [
              "name",
              255,
              { lower: true }
            ],
            "aws:elasticache/replicationGroup:ReplicationGroup": [
              "replicationGroupId",
              40,
              { lower: true }
            ],
            "aws:elasticache/subnetGroup:SubnetGroup": [
              "name",
              255,
              { lower: true }
            ],
            "aws:iam/role:Role": ["name", 64],
            "aws:iam/user:User": ["name", 64],
            "aws:iot/authorizer:Authorizer": ["name", 128],
            "aws:iot/topicRule:TopicRule": [
              "name",
              128,
              { replace: (name2) => name2.replaceAll("-", "_") }
            ],
            "aws:kinesis/stream:Stream": ["name", 255],
            // AWS Load Balancer name allows 32 chars, but an 8 char suffix
            // ie. "-1234567" is automatically added
            "aws:lb/loadBalancer:LoadBalancer": ["name", 24],
            "aws:lambda/function:Function": ["name", 64],
            "aws:opensearch/domain:Domain": ["domainName", 28, { lower: true }],
            "aws:rds/cluster:Cluster": [
              "clusterIdentifier",
              63,
              { lower: true }
            ],
            "aws:rds/clusterInstance:ClusterInstance": [
              "identifier",
              63,
              { lower: true }
            ],
            "aws:rds/instance:Instance": ["identifier", 63, { lower: true }],
            "aws:rds/proxy:Proxy": ["name", 60, { lower: true }],
            "aws:rds/clusterParameterGroup:ClusterParameterGroup": [
              "name",
              255,
              { lower: true }
            ],
            "aws:rds/parameterGroup:ParameterGroup": [
              "name",
              255,
              { lower: true }
            ],
            "aws:rds/subnetGroup:SubnetGroup": ["name", 255, { lower: true }],
            "aws:s3/bucketV2:BucketV2": ["bucket", 63, { lower: true }],
            "aws:secretsmanager/secret:Secret": ["name", 512],
            "aws:sesv2/configurationSet:ConfigurationSet": [
              "configurationSetName",
              64,
              { lower: true }
            ],
            "aws:sfn/stateMachine:StateMachine": ["name", 80],
            "aws:sns/topic:Topic": [
              "name",
              256,
              {
                suffix: () => output2(args2.props.fifoTopic).apply(
                  (fifo) => fifo ? ".fifo" : ""
                )
              }
            ],
            "aws:sqs/queue:Queue": [
              "name",
              80,
              {
                suffix: () => output2(args2.props.fifoQueue).apply(
                  (fifo) => fifo ? ".fifo" : ""
                )
              }
            ],
            "cloudflare:index/d1Database:D1Database": [
              "name",
              64,
              { lower: true }
            ],
            "cloudflare:index/r2Bucket:R2Bucket": ["name", 64, { lower: true }],
            "cloudflare:index/workersScript:WorkersScript": [
              "scriptName",
              64,
              { lower: true }
            ],
            "cloudflare:index/queue:Queue": ["queueName", 64, { lower: true }],
            "cloudflare:index/workersKvNamespace:WorkersKvNamespace": [
              "title",
              64,
              { lower: true }
            ]
          };
          const rule = namingRules[args2.type];
          if (!rule)
            throw new VisibleError(
              `In "${name}" component, the physical name of "${args2.name}" (${args2.type}) is not prefixed`
            );
          const nameField = rule[0];
          const length = rule[1];
          const options = rule[2];
          if (args2.props[nameField] && args2.props[nameField] !== "") return;
          if (nameField === "tags") {
            return {
              props: {
                ...args2.props,
                tags: {
                  // @ts-expect-error
                  ...args2.tags,
                  Name: prefixName(length, args2.name)
                }
              },
              opts: args2.opts
            };
          }
          const suffix = options?.suffix ? options.suffix() : output2("");
          return {
            props: {
              ...args2.props,
              [nameField]: suffix.apply((suffix2) => {
                let v = options?.lower ? physicalName(length, args2.name, suffix2).toLowerCase() : physicalName(length, args2.name, suffix2);
                if (options?.replace) v = options.replace(v);
                return v;
              })
            },
            opts: {
              ...args2.opts,
              ignoreChanges: [...args2.opts.ignoreChanges ?? [], nameField]
            }
          };
        },
        // Set child resources `retainOnDelete` if set on component
        (args2) => ({
          props: args2.props,
          opts: {
            ...args2.opts,
            retainOnDelete: args2.opts.retainOnDelete ?? opts?.retainOnDelete
          }
        }),
        ...opts?.transformations ?? []
      ],
      ...opts
    });
    this.componentType = type;
    this.componentName = name;
  }
  /** @internal */
  registerVersion(input) {
    const oldVersion = input.old;
    const newVersion = input.new ?? 1;
    if (oldVersion) {
      const className = this.componentType.replaceAll(":", ".");
      if (input.forceUpgrade && input.forceUpgrade !== `v${newVersion}`) {
        throw new VisibleError(
          [
            `The value of "forceUpgrade" does not match the version of "${className}" component.`,
            `Set "forceUpgrade" to "v${newVersion}" to upgrade to the new version.`
          ].join("\n")
        );
      }
      if (oldVersion < newVersion && !input.forceUpgrade) {
        throw new VisibleError(input.message ?? "");
      }
      if (oldVersion > newVersion) {
        throw new VisibleError(
          [
            `It seems you are trying to use an older version of "${className}".`,
            `You need to recreate this component to rollback - https://sst.dev/docs/components/#versioning`
          ].join("\n")
        );
      }
    }
    if (newVersion > 1) {
      new Version(this.componentName, newVersion, { parent: this });
    }
  }
};
var ComponentTransforms = /* @__PURE__ */ new Map();
var Version = class extends ComponentResource {
  constructor(target, version, opts) {
    super("sst:sst:Version", target + "Version", {}, opts);
    this.registerOutputs({ target, version });
  }
};
function parseComponentVersion(version) {
  const [major, minor] = version.split(".");
  return { major: parseInt(major), minor: parseInt(minor) };
}

// .sst/platform/src/components/linkable.ts
var Linkable = class extends Component {
  _name;
  _definition;
  static wrappedResources = /* @__PURE__ */ new Set();
  constructor(name, definition) {
    super("sst:sst:Linkable", name, definition, {});
    this._name = name;
    this._definition = definition;
  }
  get name() {
    return output3(this._name);
  }
  get properties() {
    return this._definition.properties;
  }
  /** @internal */
  getSSTLink() {
    return this._definition;
  }
  /**
   * Wrap any resource class to make it linkable. Behind the scenes this modifies the
   * prototype of the given class.
   *
   * :::tip
   * Use `Linkable.wrap` to make any resource linkable.
   * :::
   *
   * @param cls The resource class to wrap.
   * @param cb A callback that returns the definition for the linkable resource.
   *
   * @example
   *
   * Here we are wrapping the [`aws.dynamodb.Table`](https://www.pulumi.com/registry/packages/aws/api-docs/dynamodb/table/)
   * class to make it linkable.
   *
   * ```ts title="sst.config.ts"
   * Linkable.wrap(aws.dynamodb.Table, (table) => ({
   *   properties: { tableName: table.name },
   *   include: [
   *     sst.aws.permission({
   *       actions: ["dynamodb:*"],
   *       resources: [table.arn]
   *     })
   *   ]
   * }));
   * ```
   *
   * It's defining the properties that we want made accessible at runtime and the permissions
   * that the linked resource should have.
   *
   * Now you can link any `aws.dynamodb.Table` instances in your app just like any other SST
   * component.
   *
   * ```ts title="sst.config.ts" {7}
   * const table = new aws.dynamodb.Table("MyTable", {
   *   attributes: [{ name: "id", type: "S" }],
   *   hashKey: "id",
   * });
   *
   * new sst.aws.Nextjs("MyWeb", {
   *   link: [table]
   * });
   * ```
   *
   * Since this applies to any resource, you can also use it to wrap SST components and modify
   * how they are linked.
   *
   * ```ts title="sst.config.ts" "sst.aws.Bucket"
   * sst.Linkable.wrap(sst.aws.Bucket, (bucket) => ({
   *   properties: { name: bucket.name },
   *   include: [
   *     sst.aws.permission({
   *       actions: ["s3:GetObject"],
   *       resources: [bucket.arn]
   *     })
   *   ]
   * }));
   * ```
   *
   * This overrides the built-in link and lets you create your own.
   *
   * :::tip
   * You can modify the permissions granted by a linked resource.
   * :::
   *
   * In the above example, we're modifying the permissions to access a linked `sst.aws.Bucket`
   * in our app.
   */
  static wrap(cls, cb) {
    this.wrappedResources.add(cls.__pulumiType);
    cls.prototype.getSSTLink = function() {
      return cb(this);
    };
  }
};
function env(env2) {
  return {
    type: "environment",
    env: env2
  };
}

// .sst/platform/src/components/link.ts
var Link;
((Link2) => {
  class Ref extends ComponentResource2 {
    constructor(target, type, properties, include) {
      super(
        "sst:sst:LinkRef",
        target + "LinkRef",
        {
          properties,
          include
        },
        {}
      );
      this.registerOutputs({
        target,
        include,
        properties: {
          type: type.replaceAll(":", "."),
          ...properties
        }
      });
    }
  }
  Link2.Ref = Ref;
  function reset() {
    const links = /* @__PURE__ */ new Set();
    runtime2.registerStackTransformation((args) => {
      const isLinkable2 = args.type.startsWith("sst:") || Linkable.wrappedResources.has(args.type);
      if (isLinkable2 && !args.opts.parent) {
        const lcname = args.name.toLowerCase();
        if (lcname === "app") {
          throw new VisibleError(
            `Component name "${args.name}" is reserved. Please choose a different name for your "${args.type}" component.`
          );
        }
        if (links.has(lcname)) {
          throw new VisibleError(`Component name ${args.name} is not unique.`);
        }
        links.add(lcname);
      }
      return {
        opts: args.opts,
        props: args.props
      };
    });
    runtime2.registerStackTransformation((args) => {
      const resource = args.resource;
      process.nextTick(() => {
        if (Link2.isLinkable(resource) && !args.opts.parent) {
          try {
            const link = resource.getSSTLink();
            new Ref(args.name, args.type, link.properties, link.include);
          } catch (e) {
          }
        }
      });
      return {
        opts: args.opts,
        props: args.props
      };
    });
  }
  Link2.reset = reset;
  function isLinkable(obj) {
    return "getSSTLink" in obj;
  }
  Link2.isLinkable = isLinkable;
  function build(links) {
    return links.map((link) => {
      if (!link)
        throw new VisibleError(
          "An undefined link was passed into a `link` array."
        );
      return link;
    }).filter((l) => isLinkable(l)).map((l) => {
      const link = l.getSSTLink();
      return all3([l.urn, link]).apply(([urn, link2]) => ({
        name: urn.split("::").at(-1),
        properties: {
          ...link2.properties,
          type: urn.split("::").at(-2)
        }
      }));
    });
  }
  Link2.build = build;
  function getProperties(links) {
    const linkProperties = output4(links ?? []).apply(
      (links2) => links2.map((link) => {
        if (!link)
          throw new VisibleError(
            "An undefined link was passed into a `link` array."
          );
        return link;
      }).filter((l) => isLinkable(l)).map((l) => ({
        urn: l.urn,
        properties: l.getSSTLink().properties
      }))
    );
    return output4(linkProperties).apply(
      (e) => Object.fromEntries(
        e.map(({ urn, properties }) => {
          const name = urn.split("::").at(-1);
          const data = {
            ...properties,
            type: urn.split("::").at(-2)
          };
          return [name, data];
        })
      )
    );
  }
  Link2.getProperties = getProperties;
  function propertiesToEnv(properties) {
    return output4(properties).apply((properties2) => {
      const env2 = Object.fromEntries(
        Object.entries(properties2).map(([key, value]) => {
          return [`SST_RESOURCE_${key}`, JSON.stringify(value)];
        })
      );
      env2["SST_RESOURCE_App"] = JSON.stringify({
        name: define_app_default.name,
        stage: define_app_default.stage
      });
      return env2;
    });
  }
  Link2.propertiesToEnv = propertiesToEnv;
  function getInclude(type, input) {
    if (!input) return output4([]);
    return output4(input).apply((links) => {
      return links.filter(isLinkable).flatMap((l) => {
        const link = l.getSSTLink();
        return (link.include || []).filter((i) => i.type === type);
      });
    });
  }
  Link2.getInclude = getInclude;
  function linkable4(obj, cb) {
    console.warn("sst.linkable is deprecated. Use sst.Linkable.wrap instead.");
    obj.prototype.getSSTLink = function() {
      return cb(this);
    };
  }
  Link2.linkable = linkable4;
})(Link || (Link = {}));

// .sst/platform/src/config.ts
function $config(input) {
  return input;
}

// .sst/platform/src/shim/run.js
var $secrets = JSON.parse(process.env.SST_SECRETS || "{}");
var { output, apply, all, interpolate, concat, jsonParse, jsonStringify } = util;
var linkable = Link.makeLinkable;

// .sst/platform/src/auto/run.ts
import {
  runtime as runtime3,
  output as output5
} from "@pulumi/pulumi";
async function run(program) {
  process.chdir(define_cli_default.paths.root);
  addTransformationToRetainResourcesOnDelete();
  addTransformationToAddTags();
  addTransformationToCheckBucketsHaveMultiplePolicies();
  Link.reset();
  const outputs = await program() || {};
  outputs._protect = define_app_default.protect;
  return outputs;
}
function addTransformationToRetainResourcesOnDelete() {
  runtime3.registerStackTransformation((args) => {
    if (define_app_default.removal === "retain-all" || define_app_default.removal === "retain" && [
      "aws:dynamodb/table:Table",
      "aws:rds/instance:Instance",
      "aws:s3/bucket:Bucket",
      "aws:s3/bucketV2:BucketV2",
      "planetscale:index/database:Database",
      "planetscale:index/branch:Branch"
    ].includes(args.type)) {
      args.opts.retainOnDelete = args.opts.retainOnDelete ?? true;
      return args;
    }
    return void 0;
  });
}
function addTransformationToAddTags() {
  runtime3.registerStackTransformation((args) => {
    if ("import" in args.opts && args.opts.import) {
      if (!args.opts.ignoreChanges) args.opts.ignoreChanges = [];
      args.opts.ignoreChanges.push("tags");
      args.opts.ignoreChanges.push("tagsAll");
    }
    return args;
  });
}
function addTransformationToCheckBucketsHaveMultiplePolicies() {
  const bucketsWithPolicy = {};
  runtime3.registerStackTransformation((args) => {
    if (args.type !== "aws:s3/bucketPolicy:BucketPolicy") return;
    output5(args.props.bucket).apply((bucket) => {
      if (bucketsWithPolicy[bucket])
        throw new VisibleError(
          `Cannot add bucket policy "${args.name}" to the AWS S3 Bucket "${bucket}". The bucket already has a policy attached "${bucketsWithPolicy[bucket]}".`
        );
      bucketsWithPolicy[bucket] = args.name;
    });
    return void 0;
  });
}

// sst.config.ts
import * as aws2 from "@pulumi/aws";

// .sst/platform/src/components/aws/index.ts
var aws_exports = {};
__export(aws_exports, {
  Analog: () => Analog,
  ApiGatewayV1: () => ApiGatewayV1,
  ApiGatewayV2: () => ApiGatewayV2,
  ApiGatewayWebSocket: () => ApiGatewayWebSocket,
  AppSync: () => AppSync,
  Astro: () => Astro,
  Aurora: () => Aurora,
  Auth: () => Auth2,
  Bucket: () => Bucket,
  Bus: () => Bus,
  CF_BLOCK_CLOUDFRONT_URL_INJECTION: () => CF_BLOCK_CLOUDFRONT_URL_INJECTION,
  CF_ROUTER_INJECTION: () => CF_ROUTER_INJECTION,
  Cdn: () => Cdn,
  Cluster: () => Cluster2,
  CognitoIdentityPool: () => CognitoIdentityPool,
  CognitoUserPool: () => CognitoUserPool,
  Cron: () => Cron,
  DnsValidatedCertificate: () => DnsValidatedCertificate,
  Dynamo: () => Dynamo,
  Efs: () => Efs,
  Email: () => Email,
  Function: () => Function,
  KinesisStream: () => KinesisStream,
  Mysql: () => Mysql,
  Nextjs: () => Nextjs,
  Nuxt: () => Nuxt,
  OpenControl: () => OpenControl,
  OpenSearch: () => OpenSearch,
  Postgres: () => Postgres2,
  Queue: () => Queue,
  React: () => React,
  Realtime: () => Realtime,
  Redis: () => Redis2,
  Remix: () => Remix,
  Router: () => Router,
  Service: () => Service,
  SnsTopic: () => SnsTopic,
  SolidStart: () => SolidStart,
  StaticSite: () => StaticSite,
  StepFunctions: () => StepFunctions,
  SvelteKit: () => SvelteKit,
  TanStackStart: () => TanStackStart,
  Task: () => Task,
  Vector: () => Vector,
  Vpc: () => Vpc2,
  dns: () => dns,
  iamEdit: () => iamEdit,
  linkable: () => linkable2,
  normalizeRouteArgs: () => normalizeRouteArgs,
  permission: () => permission
});

// .sst/platform/src/components/aws/analog.ts
import fs4 from "fs";
import path6 from "path";

// .sst/platform/src/components/aws/ssr-site.ts
import path5 from "path";
import fs3 from "fs";
import { globSync } from "glob";
import crypto5 from "crypto";
import {
  output as output29,
  all as all21,
  interpolate as interpolate10
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/cdn.ts
import {
  output as output26,
  interpolate as interpolate9,
  all as all17
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/dns-validated-certificate.ts
import { all as all4 } from "@pulumi/pulumi";
import { acm } from "@pulumi/aws";
var DnsValidatedCertificate = class extends Component {
  certificateValidation;
  constructor(name, args, opts) {
    super(__pulumiType, name, args, opts);
    const parent = this;
    const { domainName, alternativeNames, dns: dns2 } = args;
    const certificate = createCertificate();
    const records = createDnsRecords();
    this.certificateValidation = validateCertificate();
    function createCertificate() {
      return new acm.Certificate(
        `${name}Certificate`,
        {
          domainName,
          validationMethod: "DNS",
          subjectAlternativeNames: alternativeNames ?? []
        },
        { parent }
      );
    }
    function createDnsRecords() {
      return all4([dns2, domainName, certificate.domainValidationOptions]).apply(
        ([dns3, domainName2, options]) => {
          const records2 = [];
          options = options.filter((option) => {
            const key = option.resourceRecordType + option.resourceRecordName;
            if (records2.includes(key)) return false;
            records2.push(key);
            return true;
          });
          const caaRecords = dns3.provider === "aws" ? void 0 : dns3.createCaa(name, domainName2, { parent });
          return options.map(
            (option) => dns3.createRecord(
              name,
              {
                type: option.resourceRecordType,
                name: option.resourceRecordName,
                value: option.resourceRecordValue
              },
              { parent, dependsOn: caaRecords ? [...caaRecords] : [] }
            )
          );
        }
      );
    }
    function validateCertificate() {
      return new acm.CertificateValidation(
        `${name}Validation`,
        {
          certificateArn: certificate.arn
        },
        { parent, dependsOn: records }
      );
    }
  }
  get arn() {
    return this.certificateValidation.certificateArn;
  }
};
var __pulumiType = "sst:aws:Certificate";
DnsValidatedCertificate.__pulumiType = __pulumiType;

// .sst/platform/src/components/aws/https-redirect.ts
import { all as all16, output as output24 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/bucket.ts
import {
  output as output23,
  interpolate as interpolate8,
  all as all15
} from "@pulumi/pulumi";

// .sst/platform/src/components/duration.ts
function toSeconds(duration) {
  const [count, unit] = duration.split(" ");
  const countNum = parseInt(count);
  const unitLower = unit.toLowerCase();
  if (unitLower.startsWith("second")) {
    return countNum;
  } else if (unitLower.startsWith("minute")) {
    return countNum * 60;
  } else if (unitLower.startsWith("hour")) {
    return countNum * 3600;
  } else if (unitLower.startsWith("day")) {
    return countNum * 86400;
  }
  throw new Error(`Invalid duration ${duration}`);
}

// .sst/platform/src/components/aws/helpers/arn.ts
function parseFunctionArn(arn) {
  const functionName = arn.split(":")[6];
  if (!arn.startsWith("arn:") || !functionName)
    throw new VisibleError(
      `The provided ARN "${arn}" is not a Lambda function ARN.`
    );
  return { functionName };
}
function parseBucketArn(arn) {
  const bucketName = arn.split(":")[5];
  if (!arn.startsWith("arn:") || !bucketName)
    throw new VisibleError(
      `The provided ARN "${arn}" is not an S3 bucket ARN.`
    );
  return { bucketName };
}
function parseTopicArn(arn) {
  const topicName = arn.split(":")[5];
  if (!arn.startsWith("arn:") || !topicName)
    throw new VisibleError(
      `The provided ARN "${arn}" is not an SNS Topic ARN.`
    );
  return { topicName };
}
function parseQueueArn(arn) {
  const [arnStr, , , region, accountId, queueName] = arn.split(":");
  if (arnStr !== "arn" || !queueName)
    throw new VisibleError(
      `The provided ARN "${arn}" is not an SQS Queue ARN.`
    );
  return {
    queueName,
    queueUrl: `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`
  };
}
function parseDynamoArn(arn) {
  const tableName = arn.split("/")[1];
  if (!arn.startsWith("arn:") || !tableName)
    throw new VisibleError(
      `The provided ARN "${arn}" is not a DynamoDB table ARN.`
    );
  return { tableName };
}
function parseDynamoStreamArn(streamArn) {
  const parts = streamArn.split(":");
  const tableName = parts[5]?.split("/")[1];
  if (parts[0] !== "arn" || parts[2] !== "dynamodb" || !tableName)
    throw new VisibleError(
      `The provided ARN "${streamArn}" is not a DynamoDB stream ARN.`
    );
  return { tableName };
}
function parseKinesisStreamArn(streamArn) {
  const parts = streamArn.split(":");
  const streamName = parts[5]?.split("/")[1];
  if (parts[0] !== "arn" || parts[2] !== "kinesis" || !streamName)
    throw new VisibleError(
      `The provided ARN "${streamArn}" is not a Kinesis stream ARN.`
    );
  return { streamName };
}
function parseEventBusArn(arn) {
  const busName = arn.split("/")[1];
  if (!arn.startsWith("arn:") || !busName)
    throw new VisibleError(
      `The provided ARN "${arn}" is not a EventBridge event bus ARN.`
    );
  return { busName };
}
function parseRoleArn(arn) {
  const roleName = arn.split("/")[1];
  if (!arn.startsWith("arn:") || !roleName)
    throw new VisibleError(`The provided ARN "${arn}" is not an IAM role ARN.`);
  return { roleName };
}

// .sst/platform/src/components/aws/bucket-lambda-subscriber.ts
import {
  interpolate as interpolate5,
  output as output13
} from "@pulumi/pulumi";
import { lambda as lambda2, s3 as s32 } from "@pulumi/aws";

// .sst/platform/src/components/aws/helpers/function-builder.ts
import {
  all as all12,
  output as output12
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/function.ts
import fs from "fs";
import path from "path";
import crypto4 from "crypto";
import archiver from "archiver";
import { glob } from "glob";
import {
  all as all11,
  asset,
  interpolate as interpolate4,
  output as output11,
  secret,
  unsecret
} from "@pulumi/pulumi";

// .sst/platform/src/components/rpc/rpc.ts
import http from "http";
var rpc;
((rpc2) => {
  class MethodNotFoundError extends Error {
    constructor(method) {
      super(`Method "${method}" not found`);
      this.method = method;
    }
  }
  rpc2.MethodNotFoundError = MethodNotFoundError;
  async function call(method, args) {
    return new Promise((resolve, reject) => {
      const url = new URL(process.env.SST_SERVER + "/rpc");
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      };
      const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Failed to call RPC: ${data}`));
            return;
          }
          try {
            const json = JSON.parse(data);
            if (json.error) {
              if (json.error.startsWith("rpc: can't find")) {
                reject(new MethodNotFoundError(method));
                return;
              }
              reject(new Error(json.error));
              return;
            }
            resolve(json.result);
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        });
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.setTimeout(0);
      const body = JSON.stringify({
        jsonrpc: "1.0",
        method,
        params: [args]
      });
      req.write(body);
      req.end();
    });
  }
  rpc2.call = call;
  class Provider2 {
    constructor(type) {
      this.type = type;
    }
    name(action) {
      return "Resource." + this.type + "." + action;
    }
    async create(inputs) {
      return call(this.name("Create"), inputs);
    }
    async delete(id, outs) {
      return call(this.name("Delete"), { id, outs }).catch((ex) => {
        if (ex instanceof MethodNotFoundError) return;
        throw ex;
      });
    }
    async update(id, olds, news) {
      return call(this.name("Update"), { id, olds, news }).catch((ex) => {
        if (ex instanceof MethodNotFoundError)
          return {
            id
          };
        throw ex;
      });
    }
    async read(id, props) {
      return call(this.name("Read"), { id, props }).catch((ex) => {
        if (ex instanceof MethodNotFoundError) return { id, props };
        throw ex;
      });
    }
    async diff(id, olds, news) {
      return call(this.name("Diff"), { id, olds, news }).catch((ex) => {
        if (ex instanceof MethodNotFoundError) return { id, olds, news };
        throw ex;
      });
    }
  }
  rpc2.Provider = Provider2;
})(rpc || (rpc = {}));

// .sst/platform/src/components/aws/helpers/bootstrap.ts
var bootstrap = {
  forRegion(region) {
    return rpc.call("Provider.Aws.Bootstrap", { region });
  }
};

// .sst/platform/src/components/size.ts
function toMBs(size) {
  const [count, unit] = size.split(" ");
  const countNum = parseFloat(count);
  if (unit === "MB") {
    return countNum;
  } else if (unit === "GB") {
    return countNum * 1024;
  } else if (unit === "TB") {
    return countNum * 1024 * 1024;
  }
  throw new Error(`Invalid size ${size}`);
}
function toGBs(size) {
  const [count, unit] = size.split(" ");
  const countNum = parseFloat(count);
  if (unit === "MB") {
    return countNum / 1024;
  } else if (unit === "GB") {
    return countNum;
  } else if (unit === "TB") {
    return countNum * 1024;
  }
  throw new Error(`Invalid size ${size}`);
}

// .sst/platform/src/components/aws/logging.ts
var RETENTION = {
  "1 day": 1,
  "3 days": 3,
  "5 days": 5,
  "1 week": 7,
  "2 weeks": 14,
  "1 month": 30,
  "2 months": 60,
  "3 months": 90,
  "4 months": 120,
  "5 months": 150,
  "6 months": 180,
  "1 year": 365,
  "13 months": 400,
  "18 months": 545,
  "2 years": 731,
  "3 years": 1096,
  "5 years": 1827,
  "6 years": 2192,
  "7 years": 2557,
  "8 years": 2922,
  "9 years": 3288,
  "10 years": 3653,
  forever: 0
};

// .sst/platform/src/components/aws/function.ts
import {
  cloudwatch,
  ecr,
  getCallerIdentityOutput,
  getPartitionOutput as getPartitionOutput2,
  getRegionOutput,
  iam as iam2,
  lambda,
  s3
} from "@pulumi/aws";

// .sst/platform/src/components/aws/permission.ts
function permission(input) {
  return {
    type: "aws.permission",
    ...input
  };
}

// .sst/platform/src/components/aws/vpc.ts
import {
  all as all6,
  interpolate as interpolate2,
  output as output7
} from "@pulumi/pulumi";
import {
  ec2 as ec22,
  getAvailabilityZonesOutput as getAvailabilityZonesOutput2,
  getPartitionOutput,
  iam,
  route53,
  servicediscovery,
  ssm
} from "@pulumi/aws";

// .sst/platform/src/components/aws/vpc-v1.ts
import { all as all5, output as output6 } from "@pulumi/pulumi";
import { ec2, getAvailabilityZonesOutput } from "@pulumi/aws";
var Vpc = class _Vpc extends Component {
  vpc;
  internetGateway;
  securityGroup;
  natGateways;
  elasticIps;
  _publicSubnets;
  _privateSubnets;
  publicRouteTables;
  privateRouteTables;
  constructor(name, args, opts) {
    super(__pulumiType2, name, args, opts);
    if (args && "ref" in args) {
      const ref = args;
      this.vpc = ref.vpc;
      this.internetGateway = ref.internetGateway;
      this.securityGroup = ref.securityGroup;
      this._publicSubnets = output6(ref.publicSubnets);
      this._privateSubnets = output6(ref.privateSubnets);
      this.publicRouteTables = output6(ref.publicRouteTables);
      this.privateRouteTables = output6(ref.privateRouteTables);
      this.natGateways = output6(ref.natGateways);
      this.elasticIps = ref.elasticIps;
      return;
    }
    const parent = this;
    const zones = normalizeAz();
    const vpc = createVpc();
    const internetGateway = createInternetGateway();
    const securityGroup = createSecurityGroup();
    const { publicSubnets, publicRouteTables } = createPublicSubnets();
    const { elasticIps, natGateways } = createNatGateways();
    const { privateSubnets, privateRouteTables } = createPrivateSubnets();
    this.vpc = vpc;
    this.internetGateway = internetGateway;
    this.securityGroup = securityGroup;
    this.natGateways = natGateways;
    this.elasticIps = elasticIps;
    this._publicSubnets = publicSubnets;
    this._privateSubnets = privateSubnets;
    this.publicRouteTables = publicRouteTables;
    this.privateRouteTables = privateRouteTables;
    function normalizeAz() {
      const zones2 = getAvailabilityZonesOutput({
        state: "available"
      });
      return all5([zones2, args?.az ?? 2]).apply(
        ([zones3, az]) => Array(az).fill(0).map((_, i) => zones3.names[i])
      );
    }
    function createVpc() {
      return new ec2.Vpc(
        ...transform(
          args?.transform?.vpc,
          `${name}Vpc`,
          {
            cidrBlock: "10.0.0.0/16",
            enableDnsSupport: true,
            enableDnsHostnames: true
          },
          { parent }
        )
      );
    }
    function createInternetGateway() {
      return new ec2.InternetGateway(
        ...transform(
          args?.transform?.internetGateway,
          `${name}InternetGateway`,
          {
            vpcId: vpc.id
          },
          { parent }
        )
      );
    }
    function createSecurityGroup() {
      return new ec2.SecurityGroup(
        ...transform(
          args?.transform?.securityGroup,
          `${name}SecurityGroup`,
          {
            vpcId: vpc.id,
            egress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"]
              }
            ],
            ingress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"]
              }
            ]
          },
          { parent }
        )
      );
    }
    function createNatGateways() {
      const ret = publicSubnets.apply(
        (subnets) => subnets.map((subnet, i) => {
          const elasticIp = new ec2.Eip(
            ...transform(
              args?.transform?.elasticIp,
              `${name}ElasticIp${i + 1}`,
              {
                vpc: true
              },
              { parent }
            )
          );
          const natGateway = new ec2.NatGateway(
            ...transform(
              args?.transform?.natGateway,
              `${name}NatGateway${i + 1}`,
              {
                subnetId: subnet.id,
                allocationId: elasticIp.id
              },
              { parent }
            )
          );
          return { elasticIp, natGateway };
        })
      );
      return {
        elasticIps: ret.apply((ret2) => ret2.map((r) => r.elasticIp)),
        natGateways: ret.apply((ret2) => ret2.map((r) => r.natGateway))
      };
    }
    function createPublicSubnets() {
      const ret = zones.apply(
        (zones2) => zones2.map((zone, i) => {
          const subnet = new ec2.Subnet(
            ...transform(
              args?.transform?.publicSubnet,
              `${name}PublicSubnet${i + 1}`,
              {
                vpcId: vpc.id,
                cidrBlock: `10.0.${i + 1}.0/24`,
                availabilityZone: zone,
                mapPublicIpOnLaunch: true
              },
              { parent }
            )
          );
          const routeTable = new ec2.RouteTable(
            ...transform(
              args?.transform?.publicRouteTable,
              `${name}PublicRouteTable${i + 1}`,
              {
                vpcId: vpc.id,
                routes: [
                  {
                    cidrBlock: "0.0.0.0/0",
                    gatewayId: internetGateway.id
                  }
                ]
              },
              { parent }
            )
          );
          new ec2.RouteTableAssociation(
            `${name}PublicRouteTableAssociation${i + 1}`,
            {
              subnetId: subnet.id,
              routeTableId: routeTable.id
            },
            { parent }
          );
          return { subnet, routeTable };
        })
      );
      return {
        publicSubnets: ret.apply((ret2) => ret2.map((r) => r.subnet)),
        publicRouteTables: ret.apply((ret2) => ret2.map((r) => r.routeTable))
      };
    }
    function createPrivateSubnets() {
      const ret = zones.apply(
        (zones2) => zones2.map((zone, i) => {
          const subnet = new ec2.Subnet(
            ...transform(
              args?.transform?.privateSubnet,
              `${name}PrivateSubnet${i + 1}`,
              {
                vpcId: vpc.id,
                cidrBlock: `10.0.${zones2.length + i + 1}.0/24`,
                availabilityZone: zone
              },
              { parent }
            )
          );
          const routeTable = new ec2.RouteTable(
            ...transform(
              args?.transform?.privateRouteTable,
              `${name}PrivateRouteTable${i + 1}`,
              {
                vpcId: vpc.id,
                routes: [
                  {
                    cidrBlock: "0.0.0.0/0",
                    natGatewayId: natGateways[i].id
                  }
                ]
              },
              { parent }
            )
          );
          new ec2.RouteTableAssociation(
            `${name}PrivateRouteTableAssociation${i + 1}`,
            {
              subnetId: subnet.id,
              routeTableId: routeTable.id
            },
            { parent }
          );
          return { subnet, routeTable };
        })
      );
      return {
        privateSubnets: ret.apply((ret2) => ret2.map((r) => r.subnet)),
        privateRouteTables: ret.apply((ret2) => ret2.map((r) => r.routeTable))
      };
    }
  }
  /**
   * The VPC ID.
   */
  get id() {
    return this.vpc.id;
  }
  /**
   * A list of public subnet IDs in the VPC.
   */
  get publicSubnets() {
    return this._publicSubnets.apply(
      (subnets) => subnets.map((subnet) => subnet.id)
    );
  }
  /**
   * A list of private subnet IDs in the VPC.
   */
  get privateSubnets() {
    return this._privateSubnets.apply(
      (subnets) => subnets.map((subnet) => subnet.id)
    );
  }
  /**
   * A list of VPC security group IDs.
   */
  get securityGroups() {
    return [this.securityGroup.id];
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon EC2 VPC.
       */
      vpc: this.vpc,
      /**
       * The Amazon EC2 Internet Gateway.
       */
      internetGateway: this.internetGateway,
      /**
       * The Amazon EC2 Security Group.
       */
      securityGroup: this.securityGroup,
      /**
       * The Amazon EC2 NAT Gateway.
       */
      natGateways: this.natGateways,
      /**
       * The Amazon EC2 Elastic IP.
       */
      elasticIps: this.elasticIps,
      /**
       * The Amazon EC2 public subnet.
       */
      publicSubnets: this._publicSubnets,
      /**
       * The Amazon EC2 private subnet.
       */
      privateSubnets: this._privateSubnets,
      /**
       * The Amazon EC2 route table for the public subnet.
       */
      publicRouteTables: this.publicRouteTables,
      /**
       * The Amazon EC2 route table for the private subnet.
       */
      privateRouteTables: this.privateRouteTables
    };
  }
  /**
   * Reference an existing VPC with the given ID. This is useful when you
   * create a VPC in one stage and want to share it in another stage. It avoids having to
   * create a new VPC in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share VPCs across stages.
   * :::
   *
   * @param name The name of the component.
   * @param vpcID The ID of the existing VPC.
   *
   * @example
   * Imagine you create a VPC in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new VPC, you want to share the VPC from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const vpc = $app.stage === "frank"
   *   ? sst.aws.Vpc.v1.get("MyVPC", "vpc-0be8fa4de860618bb")
   *   : new sst.aws.Vpc.v1("MyVPC");
   * ```
   *
   * Here `vpc-0be8fa4de860618bb` is the ID of the VPC created in the `dev` stage.
   * You can find this by outputting the VPC ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   vpc: vpc.id
   * };
   * ```
   */
  static get(name, vpcID) {
    const vpc = ec2.Vpc.get(`${name}Vpc`, vpcID);
    const internetGateway = ec2.InternetGateway.get(
      `${name}InstanceGateway`,
      ec2.getInternetGatewayOutput({
        filters: [{ name: "attachment.vpc-id", values: [vpc.id] }]
      }).internetGatewayId
    );
    const securityGroup = ec2.SecurityGroup.get(
      `${name}SecurityGroup`,
      ec2.getSecurityGroupsOutput({
        filters: [
          { name: "group-name", values: ["*SecurityGroup*"] },
          { name: "vpc-id", values: [vpc.id] }
        ]
      }).ids.apply((ids) => {
        if (!ids.length)
          throw new Error(`Security group not found in VPC ${vpcID}`);
        return ids[0];
      })
    );
    const privateSubnets = ec2.getSubnetsOutput({
      filters: [
        { name: "vpc-id", values: [vpc.id] },
        { name: "tag:Name", values: ["*Private*"] }
      ]
    }).ids.apply(
      (ids) => ids.map((id, i) => ec2.Subnet.get(`${name}PrivateSubnet${i + 1}`, id))
    );
    const privateRouteTables = privateSubnets.apply(
      (subnets) => subnets.map(
        (subnet, i) => ec2.RouteTable.get(
          `${name}PrivateRouteTable${i + 1}`,
          ec2.getRouteTableOutput({ subnetId: subnet.id }).routeTableId
        )
      )
    );
    const publicSubnets = ec2.getSubnetsOutput({
      filters: [
        { name: "vpc-id", values: [vpc.id] },
        { name: "tag:Name", values: ["*Public*"] }
      ]
    }).ids.apply(
      (ids) => ids.map((id, i) => ec2.Subnet.get(`${name}PublicSubnet${i + 1}`, id))
    );
    const publicRouteTables = publicSubnets.apply(
      (subnets) => subnets.map(
        (subnet, i) => ec2.RouteTable.get(
          `${name}PublicRouteTable${i + 1}`,
          ec2.getRouteTableOutput({ subnetId: subnet.id }).routeTableId
        )
      )
    );
    const natGateways = publicSubnets.apply(
      (subnets) => subnets.map(
        (subnet, i) => ec2.NatGateway.get(
          `${name}NatGateway${i + 1}`,
          ec2.getNatGatewayOutput({ subnetId: subnet.id }).id
        )
      )
    );
    const elasticIps = natGateways.apply(
      (nats) => nats.map(
        (nat, i) => ec2.Eip.get(
          `${name}ElasticIp${i + 1}`,
          nat.allocationId
        )
      )
    );
    return new _Vpc(name, {
      ref: true,
      vpc,
      internetGateway,
      securityGroup,
      privateSubnets,
      privateRouteTables,
      publicSubnets,
      publicRouteTables,
      natGateways,
      elasticIps
    });
  }
};
var __pulumiType2 = "sst:aws:Vpc";
Vpc.__pulumiType = __pulumiType2;

// .sst/platform/src/components/aws/vpc.ts
import { PrivateKey } from "@pulumi/tls";
var Vpc2 = class _Vpc extends Component {
  vpc;
  internetGateway;
  securityGroup;
  natGateways;
  natInstances;
  elasticIps;
  _publicSubnets;
  _privateSubnets;
  publicRouteTables;
  privateRouteTables;
  bastionInstance;
  cloudmapNamespace;
  privateKeyValue;
  static v1 = Vpc;
  constructor(name, args = {}, opts) {
    super(__pulumiType3, name, args, opts);
    const _version = 2;
    const _refVersion = 2;
    const self = this;
    if (args && "ref" in args) {
      const ref = reference();
      this.vpc = ref.vpc;
      this.internetGateway = ref.internetGateway;
      this.securityGroup = ref.securityGroup;
      this._publicSubnets = output7(ref.publicSubnets);
      this._privateSubnets = output7(ref.privateSubnets);
      this.publicRouteTables = output7(ref.publicRouteTables);
      this.privateRouteTables = output7(ref.privateRouteTables);
      this.natGateways = output7(ref.natGateways);
      this.natInstances = output7(ref.natInstances);
      this.elasticIps = ref.elasticIps;
      this.bastionInstance = ref.bastionInstance;
      this.cloudmapNamespace = ref.cloudmapNamespace;
      this.privateKeyValue = output7(ref.privateKeyValue);
      registerOutputs();
      return;
    }
    registerVersion();
    const zones = normalizeAz();
    const nat = normalizeNat();
    const partition = getPartitionOutput({}, opts).partition;
    const vpc = createVpc();
    const { keyPair, privateKeyValue } = createKeyPair();
    const internetGateway = createInternetGateway();
    const securityGroup = createSecurityGroup();
    const { publicSubnets, publicRouteTables } = createPublicSubnets();
    const elasticIps = createElasticIps();
    const natGateways = createNatGateways();
    const natInstances = createNatInstances();
    const { privateSubnets, privateRouteTables } = createPrivateSubnets();
    const bastionInstance = createBastion();
    const cloudmapNamespace = createCloudmapNamespace();
    this.vpc = vpc;
    this.internetGateway = internetGateway;
    this.securityGroup = securityGroup;
    this.natGateways = natGateways;
    this.natInstances = natInstances;
    this.elasticIps = elasticIps;
    this._publicSubnets = publicSubnets;
    this._privateSubnets = privateSubnets;
    this.publicRouteTables = publicRouteTables;
    this.privateRouteTables = privateRouteTables;
    this.bastionInstance = output7(bastionInstance);
    this.cloudmapNamespace = cloudmapNamespace;
    this.privateKeyValue = output7(privateKeyValue);
    registerOutputs();
    function reference() {
      const ref = args;
      const vpc2 = ec22.Vpc.get(`${name}Vpc`, ref.vpcId, void 0, {
        parent: self
      });
      const vpcId = vpc2.tags.apply((tags) => {
        registerVersion(
          tags?.["sst:component-version"] ? parseInt(tags["sst:component-version"]) : void 0
        );
        if (tags?.["sst:ref-version"] !== _refVersion.toString()) {
          throw new VisibleError(
            [
              `There have been some minor changes to the "Vpc" component that's being referenced by "${name}".
`,
              `To update, you'll need to redeploy the stage where the VPC was created. And then redeploy this stage.`
            ].join("\n")
          );
        }
        return output7(ref.vpcId);
      });
      const internetGateway2 = ec22.InternetGateway.get(
        `${name}InstanceGateway`,
        ec22.getInternetGatewayOutput(
          {
            filters: [{ name: "attachment.vpc-id", values: [vpcId] }]
          },
          { parent: self }
        ).internetGatewayId,
        void 0,
        { parent: self }
      );
      const securityGroup2 = ec22.SecurityGroup.get(
        `${name}SecurityGroup`,
        ec22.getSecurityGroupsOutput(
          {
            filters: [
              { name: "group-name", values: ["default"] },
              { name: "vpc-id", values: [vpcId] }
            ]
          },
          { parent: self }
        ).ids.apply((ids) => {
          if (!ids.length) {
            throw new VisibleError(
              `Security group not found in VPC ${vpcId}`
            );
          }
          return ids[0];
        }),
        void 0,
        { parent: self }
      );
      const privateSubnets2 = ec22.getSubnetsOutput(
        {
          filters: [
            { name: "vpc-id", values: [vpcId] },
            { name: "tag:Name", values: ["*Private*"] }
          ]
        },
        { parent: self }
      ).ids.apply(
        (ids) => ids.map(
          (id, i) => ec22.Subnet.get(`${name}PrivateSubnet${i + 1}`, id, void 0, {
            parent: self
          })
        )
      );
      const privateRouteTables2 = privateSubnets2.apply(
        (subnets) => subnets.map(
          (subnet, i) => ec22.RouteTable.get(
            `${name}PrivateRouteTable${i + 1}`,
            ec22.getRouteTableOutput({ subnetId: subnet.id }, { parent: self }).routeTableId,
            void 0,
            { parent: self }
          )
        )
      );
      const publicSubnets2 = ec22.getSubnetsOutput(
        {
          filters: [
            { name: "vpc-id", values: [vpcId] },
            { name: "tag:Name", values: ["*Public*"] }
          ]
        },
        { parent: self }
      ).ids.apply(
        (ids) => ids.map(
          (id, i) => ec22.Subnet.get(`${name}PublicSubnet${i + 1}`, id, void 0, {
            parent: self
          })
        )
      );
      const publicRouteTables2 = publicSubnets2.apply(
        (subnets) => subnets.map(
          (subnet, i) => ec22.RouteTable.get(
            `${name}PublicRouteTable${i + 1}`,
            ec22.getRouteTableOutput({ subnetId: subnet.id }, { parent: self }).routeTableId,
            void 0,
            { parent: self }
          )
        )
      );
      const natGateways2 = publicSubnets2.apply((subnets) => {
        const natGatewayIds = subnets.map(
          (subnet, i) => ec22.getNatGatewaysOutput(
            {
              filters: [
                { name: "subnet-id", values: [subnet.id] },
                { name: "state", values: ["available"] }
              ]
            },
            { parent: self }
          ).ids.apply((ids) => ids[0])
        );
        return output7(natGatewayIds).apply(
          (ids) => ids.filter((id) => id).map(
            (id, i) => ec22.NatGateway.get(`${name}NatGateway${i + 1}`, id, void 0, {
              parent: self
            })
          )
        );
      });
      const elasticIps2 = natGateways2.apply(
        (nats) => nats.map(
          (nat2, i) => ec22.Eip.get(
            `${name}ElasticIp${i + 1}`,
            nat2.allocationId,
            void 0,
            { parent: self }
          )
        )
      );
      const natInstances2 = ec22.getInstancesOutput(
        {
          filters: [
            { name: "tag:sst:is-nat", values: ["true"] },
            { name: "vpc-id", values: [vpcId] }
          ]
        },
        { parent: self }
      ).ids.apply(
        (ids) => ids.map(
          (id, i) => ec22.Instance.get(`${name}NatInstance${i + 1}`, id, void 0, {
            parent: self
          })
        )
      );
      const bastionInstance2 = ec22.getInstancesOutput(
        {
          filters: [
            { name: "tag:sst:is-bastion", values: ["true"] },
            { name: "vpc-id", values: [vpcId] }
          ]
        },
        { parent: self }
      ).ids.apply(
        (ids) => ids.length ? ec22.Instance.get(`${name}BastionInstance`, ids[0], void 0, {
          parent: self
        }) : void 0
      );
      const zone = output7(vpcId).apply(
        (vpcId2) => route53.getZone(
          {
            name: "sst",
            privateZone: true,
            vpcId: vpcId2
          },
          { parent: self }
        )
      );
      const namespaceId = zone.linkedServiceDescription.apply((description) => {
        const match = description.match(/:namespace\/(ns-[a-z1-9]*)/)?.[1];
        if (!match) {
          throw new VisibleError(
            `Cloud Map namespace not found for VPC ${vpcId}`
          );
        }
        return match;
      });
      const cloudmapNamespace2 = servicediscovery.PrivateDnsNamespace.get(
        `${name}CloudmapNamespace`,
        namespaceId,
        { vpc: vpcId },
        { parent: self }
      );
      const privateKeyValue2 = bastionInstance2.apply((v) => {
        if (!v) return;
        const param = ssm.Parameter.get(
          `${name}PrivateKeyValue`,
          interpolate2`/sst/vpc/${vpcId}/private-key-value`,
          void 0,
          { parent: self }
        );
        return param.value;
      });
      return {
        vpc: vpc2,
        internetGateway: internetGateway2,
        securityGroup: securityGroup2,
        publicSubnets: publicSubnets2,
        publicRouteTables: publicRouteTables2,
        privateSubnets: privateSubnets2,
        privateRouteTables: privateRouteTables2,
        natGateways: natGateways2,
        natInstances: natInstances2,
        elasticIps: elasticIps2,
        bastionInstance: bastionInstance2,
        cloudmapNamespace: cloudmapNamespace2,
        privateKeyValue: privateKeyValue2
      };
    }
    function registerVersion(overrideVersion) {
      self.registerVersion({
        new: _version,
        old: overrideVersion ?? define_cli_default.state.version[name],
        message: [
          `There is a new version of "Vpc" that has breaking changes.`,
          ``,
          `To continue using the previous version, rename "Vpc" to "Vpc.v${define_cli_default.state.version[name]}". Or recreate this component to update - https://sst.dev/docs/components/#versioning`
        ].join("\n")
      });
    }
    function registerOutputs() {
      self.registerOutputs({
        _tunnel: all6([
          self.bastionInstance,
          self.privateKeyValue,
          self._privateSubnets,
          self._publicSubnets
        ]).apply(
          ([bastion, privateKeyValue2, privateSubnets2, publicSubnets2]) => {
            if (!bastion) return;
            return {
              ip: bastion.publicIp,
              username: "ec2-user",
              privateKey: privateKeyValue2,
              subnets: [...privateSubnets2, ...publicSubnets2].map(
                (s) => s.cidrBlock
              )
            };
          }
        )
      });
    }
    function normalizeAz() {
      return output7(args.az).apply((az) => {
        if (Array.isArray(az)) return output7(az);
        const zones2 = getAvailabilityZonesOutput2(
          {
            state: "available"
          },
          { parent: self }
        );
        return all6([zones2, args.az ?? 2]).apply(
          ([zones3, az2]) => Array(az2).fill(0).map((_, i) => zones3.names[i])
        );
      });
    }
    function normalizeNat() {
      return all6([args.nat, zones]).apply(([nat2, zones2]) => {
        if (nat2 === "managed") {
          return { type: "managed" };
        }
        if (nat2 === "ec2") {
          return {
            type: "ec2",
            ec2: { instance: "t4g.nano", ami: void 0 }
          };
        }
        if (nat2) {
          if (nat2.ec2 && nat2.type === "managed")
            throw new VisibleError(
              `"nat.type" cannot be "managed" when "nat.ec2" is specified`
            );
          if (!nat2.type)
            throw new VisibleError(
              `Missing "nat.type" for the "${name}" VPC. It is required when "nat.ec2" is not specified`
            );
          if (nat2.ip && nat2.ip.length !== zones2.length)
            throw new VisibleError(
              `The number of Elastic IP allocation IDs must match the number of AZs.`
            );
          return nat2.ec2 || nat2.type === "ec2" ? {
            type: "ec2",
            ip: nat2.ip,
            ec2: nat2.ec2 ?? { instance: "t4g.nano" }
          } : {
            type: "managed",
            ip: nat2.ip
          };
        }
        return void 0;
      });
    }
    function createVpc() {
      return new ec22.Vpc(
        ...transform(
          args.transform?.vpc,
          `${name}Vpc`,
          {
            cidrBlock: "10.0.0.0/16",
            enableDnsSupport: true,
            enableDnsHostnames: true,
            tags: {
              Name: `${define_app_default.name}-${define_app_default.stage}-${name} VPC`,
              "sst:component-version": _version.toString(),
              "sst:ref-version": _refVersion.toString()
            }
          },
          { parent: self }
        )
      );
    }
    function createKeyPair() {
      const ret = output7(args.bastion).apply((bastion) => {
        if (!bastion) return {};
        const tlsPrivateKey = new PrivateKey(
          `${name}TlsPrivateKey`,
          {
            algorithm: "RSA",
            rsaBits: 4096
          },
          { parent: self }
        );
        new ssm.Parameter(
          `${name}PrivateKeyValue`,
          {
            name: interpolate2`/sst/vpc/${vpc.id}/private-key-value`,
            description: "Bastion host private key",
            type: ssm.ParameterType.SecureString,
            value: tlsPrivateKey.privateKeyOpenssh
          },
          { parent: self }
        );
        const keyPair2 = new ec22.KeyPair(
          `${name}KeyPair`,
          {
            publicKey: tlsPrivateKey.publicKeyOpenssh
          },
          { parent: self }
        );
        return { keyPair: keyPair2, privateKeyValue: tlsPrivateKey.privateKeyOpenssh };
      });
      return {
        keyPair: output7(ret.keyPair),
        privateKeyValue: output7(ret.privateKeyValue)
      };
    }
    function createInternetGateway() {
      return new ec22.InternetGateway(
        ...transform(
          args.transform?.internetGateway,
          `${name}InternetGateway`,
          {
            vpcId: vpc.id
          },
          { parent: self }
        )
      );
    }
    function createSecurityGroup() {
      return new ec22.DefaultSecurityGroup(
        ...transform(
          args.transform?.securityGroup,
          `${name}SecurityGroup`,
          {
            description: "Managed by SST",
            vpcId: vpc.id,
            egress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"]
              }
            ],
            ingress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                // Restricts inbound traffic to only within the VPC
                cidrBlocks: [vpc.cidrBlock]
              }
            ]
          },
          { parent: self }
        )
      );
    }
    function createElasticIps() {
      return all6([nat, publicSubnets]).apply(([nat2, subnets]) => {
        if (!nat2) return [];
        if (nat2?.ip) return [];
        return subnets.map(
          (_, i) => new ec22.Eip(
            ...transform(
              args.transform?.elasticIp,
              `${name}ElasticIp${i + 1}`,
              {
                vpc: true
              },
              { parent: self }
            )
          )
        );
      });
    }
    function createNatGateways() {
      return all6([nat, publicSubnets, elasticIps]).apply(
        ([nat2, subnets, elasticIps2]) => {
          if (nat2?.type !== "managed") return [];
          return subnets.map(
            (subnet, i) => new ec22.NatGateway(
              ...transform(
                args.transform?.natGateway,
                `${name}NatGateway${i + 1}`,
                {
                  subnetId: subnet.id,
                  allocationId: elasticIps2[i]?.id ?? nat2.ip[i]
                },
                { parent: self }
              )
            )
          );
        }
      );
    }
    function createNatInstances() {
      return nat.apply((nat2) => {
        if (nat2?.type !== "ec2") return output7([]);
        const sg = new ec22.SecurityGroup(
          ...transform(
            args.transform?.natSecurityGroup,
            `${name}NatInstanceSecurityGroup`,
            {
              vpcId: vpc.id,
              ingress: [
                {
                  protocol: "-1",
                  fromPort: 0,
                  toPort: 0,
                  cidrBlocks: ["0.0.0.0/0"]
                }
              ],
              egress: [
                {
                  protocol: "-1",
                  fromPort: 0,
                  toPort: 0,
                  cidrBlocks: ["0.0.0.0/0"]
                }
              ]
            },
            { parent: self }
          )
        );
        const role = new iam.Role(
          `${name}NatInstanceRole`,
          {
            assumeRolePolicy: iam.getPolicyDocumentOutput({
              statements: [
                {
                  actions: ["sts:AssumeRole"],
                  principals: [
                    {
                      type: "Service",
                      identifiers: ["ec2.amazonaws.com"]
                    }
                  ]
                }
              ]
            }).json,
            managedPolicyArns: [
              interpolate2`arn:${partition}:iam::aws:policy/AmazonSSMManagedInstanceCore`
            ]
          },
          { parent: self }
        );
        const instanceProfile = new iam.InstanceProfile(
          `${name}NatInstanceProfile`,
          { role: role.name },
          { parent: self }
        );
        const ami = nat2.ec2.ami ?? ec22.getAmiOutput(
          {
            owners: ["568608671756"],
            // AWS account ID for fck-nat AMI
            filters: [
              {
                name: "name",
                // The AMI has the SSM agent pre-installed
                values: ["fck-nat-al2023-*"]
              },
              {
                name: "architecture",
                values: ["arm64"]
              }
            ],
            mostRecent: true
          },
          { parent: self }
        ).id;
        return all6([
          zones,
          publicSubnets,
          elasticIps,
          keyPair,
          args.bastion
        ]).apply(
          ([zones2, publicSubnets2, elasticIps2, keyPair2, bastion]) => zones2.map((_, i) => {
            const instance = new ec22.Instance(
              ...transform(
                args.transform?.natInstance,
                `${name}NatInstance${i + 1}`,
                {
                  instanceType: nat2.ec2.instance,
                  ami,
                  subnetId: publicSubnets2[i].id,
                  vpcSecurityGroupIds: [sg.id],
                  iamInstanceProfile: instanceProfile.name,
                  sourceDestCheck: false,
                  keyName: keyPair2?.keyName,
                  tags: {
                    Name: `${name} NAT Instance`,
                    "sst:is-nat": "true",
                    ...bastion && i === 0 ? { "sst:is-bastion": "true" } : {}
                  }
                },
                { parent: self }
              )
            );
            new ec22.EipAssociation(`${name}NatInstanceEipAssociation${i + 1}`, {
              instanceId: instance.id,
              allocationId: elasticIps2[i]?.id ?? nat2.ip[i]
            });
            return instance;
          })
        );
      });
    }
    function createPublicSubnets() {
      const ret = zones.apply(
        (zones2) => zones2.map((zone, i) => {
          const subnet = new ec22.Subnet(
            ...transform(
              args.transform?.publicSubnet,
              `${name}PublicSubnet${i + 1}`,
              {
                vpcId: vpc.id,
                cidrBlock: `10.0.${8 * i}.0/22`,
                availabilityZone: zone,
                mapPublicIpOnLaunch: true
              },
              { parent: self }
            )
          );
          const routeTable = new ec22.RouteTable(
            ...transform(
              args.transform?.publicRouteTable,
              `${name}PublicRouteTable${i + 1}`,
              {
                vpcId: vpc.id,
                routes: [
                  {
                    cidrBlock: "0.0.0.0/0",
                    gatewayId: internetGateway.id
                  }
                ]
              },
              { parent: self }
            )
          );
          new ec22.RouteTableAssociation(
            `${name}PublicRouteTableAssociation${i + 1}`,
            {
              subnetId: subnet.id,
              routeTableId: routeTable.id
            },
            { parent: self }
          );
          return { subnet, routeTable };
        })
      );
      return {
        publicSubnets: ret.apply((ret2) => ret2.map((r) => r.subnet)),
        publicRouteTables: ret.apply((ret2) => ret2.map((r) => r.routeTable))
      };
    }
    function createPrivateSubnets() {
      const ret = zones.apply(
        (zones2) => zones2.map((zone, i) => {
          const subnet = new ec22.Subnet(
            ...transform(
              args.transform?.privateSubnet,
              `${name}PrivateSubnet${i + 1}`,
              {
                vpcId: vpc.id,
                cidrBlock: `10.0.${8 * i + 4}.0/22`,
                availabilityZone: zone
              },
              { parent: self }
            )
          );
          const routeTable = new ec22.RouteTable(
            ...transform(
              args.transform?.privateRouteTable,
              `${name}PrivateRouteTable${i + 1}`,
              {
                vpcId: vpc.id,
                routes: all6([natGateways, natInstances]).apply(
                  ([natGateways2, natInstances2]) => [
                    ...natGateways2[i] ? [
                      {
                        cidrBlock: "0.0.0.0/0",
                        natGatewayId: natGateways2[i].id
                      }
                    ] : [],
                    ...natInstances2[i] ? [
                      {
                        cidrBlock: "0.0.0.0/0",
                        networkInterfaceId: natInstances2[i].primaryNetworkInterfaceId
                      }
                    ] : []
                  ]
                )
              },
              { parent: self }
            )
          );
          new ec22.RouteTableAssociation(
            `${name}PrivateRouteTableAssociation${i + 1}`,
            {
              subnetId: subnet.id,
              routeTableId: routeTable.id
            },
            { parent: self }
          );
          return { subnet, routeTable };
        })
      );
      return {
        privateSubnets: ret.apply((ret2) => ret2.map((r) => r.subnet)),
        privateRouteTables: ret.apply((ret2) => ret2.map((r) => r.routeTable))
      };
    }
    function createBastion() {
      return all6([args.bastion, natInstances, keyPair]).apply(
        ([bastion, natInstances2, keyPair2]) => {
          if (!bastion) return void 0;
          if (natInstances2.length) return natInstances2[0];
          const sg = new ec22.SecurityGroup(
            ...transform(
              args.transform?.bastionSecurityGroup,
              `${name}BastionSecurityGroup`,
              {
                vpcId: vpc.id,
                ingress: [
                  {
                    protocol: "tcp",
                    fromPort: 22,
                    toPort: 22,
                    cidrBlocks: ["0.0.0.0/0"]
                  }
                ],
                egress: [
                  {
                    protocol: "-1",
                    fromPort: 0,
                    toPort: 0,
                    cidrBlocks: ["0.0.0.0/0"]
                  }
                ]
              },
              { parent: self }
            )
          );
          const role = new iam.Role(
            `${name}BastionRole`,
            {
              assumeRolePolicy: iam.getPolicyDocumentOutput({
                statements: [
                  {
                    actions: ["sts:AssumeRole"],
                    principals: [
                      {
                        type: "Service",
                        identifiers: ["ec2.amazonaws.com"]
                      }
                    ]
                  }
                ]
              }).json,
              managedPolicyArns: [
                interpolate2`arn:${partition}:iam::aws:policy/AmazonSSMManagedInstanceCore`
              ]
            },
            { parent: self }
          );
          const instanceProfile = new iam.InstanceProfile(
            `${name}BastionProfile`,
            { role: role.name },
            { parent: self }
          );
          const ami = ec22.getAmiOutput(
            {
              owners: ["amazon"],
              filters: [
                {
                  name: "name",
                  // The AMI has the SSM agent pre-installed
                  values: ["al2023-ami-20*"]
                },
                {
                  name: "architecture",
                  values: ["arm64"]
                }
              ],
              mostRecent: true
            },
            { parent: self }
          );
          return new ec22.Instance(
            ...transform(
              args.transform?.bastionInstance,
              `${name}BastionInstance`,
              {
                instanceType: "t4g.nano",
                ami: ami.id,
                subnetId: publicSubnets.apply((v) => v[0].id),
                vpcSecurityGroupIds: [sg.id],
                iamInstanceProfile: instanceProfile.name,
                keyName: keyPair2?.keyName,
                tags: {
                  "sst:is-bastion": "true"
                }
              },
              { parent: self }
            )
          );
        }
      );
    }
    function createCloudmapNamespace() {
      return new servicediscovery.PrivateDnsNamespace(
        `${name}CloudmapNamespace`,
        {
          name: "sst",
          vpc: vpc.id
        },
        { parent: self }
      );
    }
  }
  /**
   * The VPC ID.
   */
  get id() {
    return this.vpc.id;
  }
  /**
   * A list of public subnet IDs in the VPC.
   */
  get publicSubnets() {
    return this._publicSubnets.apply(
      (subnets) => subnets.map((subnet) => subnet.id)
    );
  }
  /**
   * A list of private subnet IDs in the VPC.
   */
  get privateSubnets() {
    return this._privateSubnets.apply(
      (subnets) => subnets.map((subnet) => subnet.id)
    );
  }
  /**
   * A list of VPC security group IDs.
   */
  get securityGroups() {
    return output7(this.securityGroup).apply((v) => [v.id]);
  }
  /**
   * The bastion instance ID.
   */
  get bastion() {
    return this.bastionInstance.apply((v) => {
      if (!v) {
        throw new VisibleError(
          `VPC bastion is not enabled. Enable it with "bastion: true".`
        );
      }
      return v.id;
    });
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon EC2 VPC.
       */
      vpc: this.vpc,
      /**
       * The Amazon EC2 Internet Gateway.
       */
      internetGateway: this.internetGateway,
      /**
       * The Amazon EC2 Security Group.
       */
      securityGroup: this.securityGroup,
      /**
       * The Amazon EC2 NAT Gateway.
       */
      natGateways: this.natGateways,
      /**
       * The Amazon EC2 NAT instances.
       */
      natInstances: this.natInstances,
      /**
       * The Amazon EC2 Elastic IP.
       */
      elasticIps: this.elasticIps,
      /**
       * The Amazon EC2 public subnet.
       */
      publicSubnets: this._publicSubnets,
      /**
       * The Amazon EC2 private subnet.
       */
      privateSubnets: this._privateSubnets,
      /**
       * The Amazon EC2 route table for the public subnet.
       */
      publicRouteTables: this.publicRouteTables,
      /**
       * The Amazon EC2 route table for the private subnet.
       */
      privateRouteTables: this.privateRouteTables,
      /**
       * The Amazon EC2 bastion instance.
       */
      bastionInstance: this.bastionInstance,
      /**
       * The AWS Cloudmap namespace.
       */
      cloudmapNamespace: this.cloudmapNamespace
    };
  }
  /**
   * Reference an existing VPC with the given ID. This is useful when you
   * create a VPC in one stage and want to share it in another stage. It avoids having to
   * create a new VPC in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share VPCs across stages.
   * :::
   *
   * @param name The name of the component.
   * @param vpcId The ID of the existing VPC.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a VPC in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new VPC, you want to share the VPC from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const vpc = $app.stage === "frank"
   *   ? sst.aws.Vpc.get("MyVPC", "vpc-0be8fa4de860618bb")
   *   : new sst.aws.Vpc("MyVPC");
   * ```
   *
   * Here `vpc-0be8fa4de860618bb` is the ID of the VPC created in the `dev` stage.
   * You can find this by outputting the VPC ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   vpc: vpc.id
   * };
   * ```
   */
  static get(name, vpcId, opts) {
    return new _Vpc(
      name,
      {
        ref: true,
        vpcId
      },
      opts
    );
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        bastion: this.bastionInstance.apply((v) => v?.id)
      }
    };
  }
};
var __pulumiType3 = "sst:aws:Vpc";
Vpc2.__pulumiType = __pulumiType3;

// .sst/platform/src/components/aws/function.ts
import { Image } from "@pulumi/docker-build";
import { RandomBytes } from "@pulumi/random";

// .sst/platform/src/util/lazy.ts
function lazy(callback) {
  let loaded = false;
  let result2;
  return () => {
    if (!loaded) {
      loaded = true;
      result2 = callback();
    }
    return result2;
  };
}

// .sst/platform/src/components/aws/efs.ts
import { all as all7, output as output8 } from "@pulumi/pulumi";
import { ec2 as ec23, efs } from "@pulumi/aws";
var Efs = class _Efs extends Component {
  _fileSystem;
  _accessPoint;
  constructor(name, args, opts) {
    super(__pulumiType4, name, args, opts);
    if (args && "ref" in args) {
      const ref = args;
      this._fileSystem = output8(ref.fileSystem);
      this._accessPoint = output8(ref.accessPoint);
      return;
    }
    const parent = this;
    const vpc = normalizeVpc();
    const throughput = output8(args.throughput ?? "elastic");
    const performance = output8(args.performance ?? "general-purpose");
    const fileSystem = createFileSystem();
    const securityGroup = createSecurityGroup();
    const mountTargets = createMountTargets();
    const accessPoint = createAccessPoint();
    const waited = mountTargets.apply(
      (targets) => all7(targets.map((target) => target.urn)).apply(() => ({
        fileSystem,
        accessPoint
      }))
    );
    this._fileSystem = waited.fileSystem;
    this._accessPoint = waited.accessPoint;
    function normalizeVpc() {
      if (args.vpc instanceof Vpc2) {
        return output8({
          id: args.vpc.id,
          subnets: args.vpc.privateSubnets,
          cidrBlock: args.vpc.nodes.vpc.cidrBlock
        });
      }
      return output8(args.vpc).apply((vpc2) => {
        if (!vpc2.id)
          throw new VisibleError(
            `Missing "vpc.id" for the "${name}" EFS component. The VPC id is required to create the security group for the EFS mount targets.`
          );
        const vpcRef = ec23.Vpc.get(`${name}Vpc`, vpc2.id, void 0, {
          parent
        });
        return {
          id: vpc2.id,
          subnets: vpc2.subnets,
          cidrBlock: vpcRef.cidrBlock
        };
      });
    }
    function createFileSystem() {
      return new efs.FileSystem(
        ...transform(
          args.transform?.fileSystem,
          `${name}FileSystem`,
          {
            performanceMode: performance.apply(
              (v) => v === "general-purpose" ? "generalPurpose" : "maxIO"
            ),
            throughputMode: throughput,
            encrypted: true
          },
          { parent }
        )
      );
    }
    function createSecurityGroup() {
      return new ec23.SecurityGroup(
        ...transform(
          args.transform?.securityGroup,
          `${name}SecurityGroup`,
          {
            description: "Managed by SST",
            vpcId: vpc.id,
            egress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"]
              }
            ],
            ingress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                // Restricts inbound traffic to only within the VPC
                cidrBlocks: [vpc.cidrBlock]
              }
            ]
          },
          { parent }
        )
      );
    }
    function createMountTargets() {
      return vpc.subnets.apply(
        (subnets) => subnets.map(
          (subnet) => new efs.MountTarget(
            `${name}MountTarget${subnet}`,
            {
              fileSystemId: fileSystem.id,
              subnetId: subnet,
              securityGroups: [securityGroup.id]
            },
            { parent }
          )
        )
      );
    }
    function createAccessPoint() {
      return new efs.AccessPoint(
        ...transform(
          args.transform?.accessPoint,
          `${name}AccessPoint`,
          {
            fileSystemId: fileSystem.id,
            posixUser: {
              uid: 0,
              gid: 0
            },
            rootDirectory: {
              path: "/"
            }
          },
          { parent }
        )
      );
    }
  }
  /**
   * The ID of the EFS file system.
   */
  get id() {
    return this._fileSystem.id;
  }
  /**
   * The ID of the EFS access point.
   */
  get accessPoint() {
    return this._accessPoint.id;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon EFS file system.
       */
      fileSystem: this._fileSystem,
      /**
       * The Amazon EFS access point.
       */
      accessPoint: this._accessPoint
    };
  }
  /**
   * Reference an existing EFS file system with the given file system ID. This is useful when
   * you create a EFS file system in one stage and want to share it in another. It avoids
   * having to create a new EFS file system in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share EFS file systems across stages.
   * :::
   *
   * @param name The name of the component.
   * @param fileSystemID The ID of the existing EFS file system.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a EFS file system in the `dev` stage. And in your personal stage
   * `frank`, instead of creating a new file system, you want to share the same file system
   * from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const efs = $app.stage === "frank"
   *   ? sst.aws.Efs.get("MyEfs", "app-dev-myefs")
   *   : new sst.aws.Efs("MyEfs", { vpc });
   * ```
   *
   * Here `app-dev-myefs` is the ID of the file system created in the `dev` stage.
   * You can find this by outputting the file system ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   id: efs.id
   * };
   * ```
   */
  static get(name, fileSystemID, opts) {
    const fileSystem = efs.FileSystem.get(
      `${name}FileSystem`,
      fileSystemID,
      void 0,
      opts
    );
    const accessPointId = efs.getAccessPointsOutput({ fileSystemId: fileSystem.id }, opts).apply((accessPoints) => accessPoints.ids[0]);
    const accessPoint = efs.AccessPoint.get(
      `${name}AccessPoint`,
      accessPointId,
      void 0,
      opts
    );
    return new _Efs(name, {
      ref: true,
      fileSystem,
      accessPoint
    });
  }
};
var __pulumiType4 = "sst:aws:Efs";
Efs.__pulumiType = __pulumiType4;

// .sst/platform/src/components/aws/providers/function-environment-update.ts
import { dynamic } from "@pulumi/pulumi";
var FunctionEnvironmentUpdate = class extends dynamic.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.FunctionEnvironmentUpdate"),
      `${name}.sst.aws.FunctionEnvironmentUpdate`,
      args,
      opts
    );
  }
};

// .sst/platform/src/util/warn.ts
var alreadyWarned = /* @__PURE__ */ new Set();
function warnOnce(message) {
  if (alreadyWarned.has(message)) return;
  alreadyWarned.add(message);
  console.warn(message);
}

// .sst/platform/src/components/aws/router.ts
import {
  all as all10,
  interpolate as interpolate3,
  output as output10
} from "@pulumi/pulumi";
import crypto3 from "crypto";
import { cloudfront } from "@pulumi/aws";

// .sst/platform/src/components/aws/providers/origin-access-control.ts
import { dynamic as dynamic2 } from "@pulumi/pulumi";
var OriginAccessControl = class extends dynamic2.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.OriginAccessControl"),
      `${name}.sst.aws.OriginAccessControl`,
      args,
      opts
    );
  }
};

// .sst/platform/src/components/aws/router-url-route.ts
import { all as all8 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/router-base-route.ts
import crypto2 from "crypto";
import { jsonStringify as jsonStringify2 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/providers/kv-routes-update.ts
import { dynamic as dynamic3 } from "@pulumi/pulumi";
var KvRoutesUpdate = class extends dynamic3.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.KvRoutesUpdate"),
      `${name}.sst.aws.KvRoutesUpdate`,
      args,
      opts
    );
  }
};

// .sst/platform/src/components/aws/providers/kv-keys.ts
import { dynamic as dynamic4 } from "@pulumi/pulumi";
var KvKeys = class extends dynamic4.Resource {
  constructor(name, args, opts) {
    super(new rpc.Provider("Aws.KvKeys"), `${name}.sst.aws.KvKeys`, args, opts);
  }
};

// .sst/platform/src/components/aws/router-base-route.ts
function parsePattern(pattern) {
  const [host, ...path20] = pattern.split("/");
  return {
    host: host.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*"),
    // Replace * with .*
    path: "/" + path20.join("/")
  };
}
function buildKvNamespace(name) {
  return crypto2.createHash("md5").update(`${define_app_default.name}-${define_app_default.stage}-${name}`).digest("hex").substring(0, 4);
}
function createKvRouteData(name, args, parent, routeNs, data) {
  new KvKeys(
    `${name}RouteKey`,
    {
      store: args.store,
      namespace: routeNs,
      entries: {
        metadata: jsonStringify2(data)
      },
      purge: false
    },
    { parent }
  );
}
function updateKvRoutes(name, args, parent, routeType, routeNs, pattern) {
  return new KvRoutesUpdate(
    `${name}RoutesUpdate`,
    {
      store: args.store,
      namespace: args.routerNamespace,
      key: "routes",
      entry: [routeType, routeNs, pattern.host, pattern.path].join(",")
    },
    { parent }
  );
}

// .sst/platform/src/components/aws/router-url-route.ts
var RouterUrlRoute = class extends Component {
  constructor(name, args, opts) {
    super(__pulumiType5, name, args, opts);
    const self = this;
    all8([args.url, args.pattern, args.routeArgs]).apply(
      ([url, pattern, routeArgs]) => {
        const u = new URL(url);
        const host = u.host;
        const protocol = u.protocol.slice(0, -1);
        const patternData = parsePattern(pattern);
        const namespace = buildKvNamespace(name);
        createKvRouteData(name, args, self, namespace, {
          host,
          rewrite: routeArgs?.rewrite,
          origin: {
            protocol: protocol === "https" ? void 0 : protocol,
            connectionAttempts: routeArgs?.connectionAttempts,
            timeouts: (() => {
              const timeouts = [
                "connectionTimeout",
                "readTimeout",
                "keepAliveTimeout"
              ].flatMap((k) => {
                const value = routeArgs?.[k];
                return value ? [[k, toSeconds(value)]] : [];
              });
              return timeouts.length ? Object.fromEntries(timeouts) : void 0;
            })()
          }
        });
        updateKvRoutes(name, args, self, "url", namespace, patternData);
      }
    );
  }
};
var __pulumiType5 = "sst:aws:RouterUrlRoute";
RouterUrlRoute.__pulumiType = __pulumiType5;

// .sst/platform/src/components/aws/router-bucket-route.ts
import { all as all9, output as output9 } from "@pulumi/pulumi";
var RouterBucketRoute = class extends Component {
  constructor(name, args, opts) {
    super(__pulumiType6, name, args, opts);
    const self = this;
    all9([args.pattern, args.routeArgs]).apply(([pattern, routeArgs]) => {
      const patternData = parsePattern(pattern);
      const namespace = buildKvNamespace(name);
      createKvRouteData(name, args, self, namespace, {
        domain: output9(args.bucket).nodes.bucket.bucketRegionalDomainName,
        rewrite: routeArgs?.rewrite,
        origin: {
          connectionAttempts: routeArgs?.connectionAttempts,
          timeouts: {
            connectionTimeout: routeArgs?.connectionTimeout && toSeconds(routeArgs?.connectionTimeout)
          }
        }
      });
      updateKvRoutes(name, args, self, "bucket", namespace, patternData);
    });
  }
};
var __pulumiType6 = "sst:aws:RouterBucketRoute";
RouterBucketRoute.__pulumiType = __pulumiType6;

// .sst/platform/src/components/aws/router.ts
var Router = class _Router extends Component {
  constructorName;
  constructorOpts;
  cdn;
  kvStoreArn;
  kvNamespace;
  hasInlineRoutes;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType7, name, args, opts);
    const _refVersion = 2;
    const self = this;
    this.constructorName = name;
    this.constructorOpts = opts;
    if (args && "ref" in args) {
      const ref = reference();
      this.cdn = output10(ref.cdn);
      this.kvStoreArn = ref.kvStoreArn;
      this.kvNamespace = ref.kvNamespace;
      this.hasInlineRoutes = ref.hasInlineRoutes;
      registerOutputs();
      return;
    }
    const hasInlineRoutes = args.routes !== void 0;
    let cdn, kvStoreArn, kvNamespace;
    if (hasInlineRoutes) {
      cdn = handleInlineRoutes();
    } else {
      const r = handleLazyRoutes();
      cdn = output10(r.distribution);
      kvStoreArn = r.kvStoreArn;
      kvNamespace = output10(r.kvNamespace);
    }
    this.cdn = cdn;
    this.kvStoreArn = kvStoreArn;
    this.kvNamespace = kvNamespace;
    this.hasInlineRoutes = output10(hasInlineRoutes);
    registerOutputs();
    function reference() {
      const ref = args;
      const cdn2 = Cdn.get(`${name}Cdn`, ref.distributionID, { parent: self });
      const tags = cdn2.nodes.distribution.tags.apply((tags2) => {
        if (tags2?.["sst:ref:version"] !== _refVersion.toString()) {
          throw new VisibleError(
            [
              `There have been some minor changes to the "Router" component that's being referenced by "${name}".
`,
              `To update, you'll need to redeploy the stage where the Router was created. And then redeploy this stage.`
            ].join("\n")
          );
        }
        return {
          kvStoreArn: tags2?.["sst:ref:kv"],
          kvNamespace: tags2?.["sst:ref:kv-namespace"],
          hasInlineRoutes: tags2?.["sst:ref:kv"] === void 0
        };
      });
      return {
        cdn: cdn2,
        kvStoreArn: tags.kvStoreArn,
        kvNamespace: tags.kvNamespace,
        hasInlineRoutes: tags.hasInlineRoutes
      };
    }
    function registerOutputs() {
      self.registerOutputs({
        _hint: args._skipHint ? void 0 : self.url
      });
    }
    function handleInlineRoutes() {
      let defaultCachePolicy;
      let defaultCfFunction;
      let defaultOac;
      const routes = normalizeRoutes();
      const cdn2 = createCdn();
      return cdn2;
      function normalizeRoutes() {
        return output10(args.routes).apply((routes2) => {
          const normalizedRoutes = Object.fromEntries(
            Object.entries(routes2).map(([path20, route]) => {
              if (!path20.startsWith("/"))
                throw new Error(
                  `In "${name}" Router, the route path "${path20}" must start with a "/"`
                );
              route = typeof route === "string" ? { url: route } : route;
              const hasUrl = "url" in route ? 1 : 0;
              const hasBucket = "bucket" in route ? 1 : 0;
              if (hasUrl + hasBucket !== 1)
                throw new Error(
                  `In "${name}" Router, the route path "${path20}" can only have one of url or bucket`
                );
              return [path20, route];
            })
          );
          normalizedRoutes["/*"] = normalizedRoutes["/*"] ?? {
            url: "https://do-not-exist.sst.dev"
          };
          return normalizedRoutes;
        });
      }
      function createCfRequestDefaultFunction() {
        defaultCfFunction = defaultCfFunction ?? new cloudfront.Function(
          `${name}CloudfrontFunction`,
          {
            runtime: "cloudfront-js-2.0",
            code: [
              `async function handler(event) {`,
              `  event.request.headers["x-forwarded-host"] = event.request.headers.host;`,
              `  return event.request;`,
              `}`
            ].join("\n")
          },
          { parent: self }
        );
        return defaultCfFunction;
      }
      function createCfRequestFunction(path20, config, rewrite, injectHostHeader) {
        return new cloudfront.Function(
          `${name}CloudfrontFunction${hashStringToPrettyString(path20, 8)}`,
          {
            runtime: "cloudfront-js-2.0",
            keyValueStoreAssociations: config?.kvStore ? [config.kvStore] : config?.kvStores ?? [],
            code: `
async function handler(event) {
  ${injectHostHeader ? `event.request.headers["x-forwarded-host"] = event.request.headers.host;` : ""}
  ${rewrite ? `
const re = new RegExp("${rewrite.regex}");
event.request.uri = event.request.uri.replace(re, "${rewrite.to}");` : ""}
  ${config?.injection ?? ""}
  return event.request;
}`
          },
          { parent: self }
        );
      }
      function createCfResponseFunction(path20, config) {
        return new cloudfront.Function(
          `${name}CloudfrontFunctionResponse${hashStringToPrettyString(
            path20,
            8
          )}`,
          {
            runtime: "cloudfront-js-2.0",
            keyValueStoreAssociations: config.kvStore ? [config.kvStore] : config.kvStores ?? [],
            code: `
async function handler(event) {
  ${config.injection ?? ""}
  return event.response;
}`
          },
          { parent: self }
        );
      }
      function createOriginAccessControl() {
        defaultOac = defaultOac ?? new OriginAccessControl(
          `${name}S3AccessControl`,
          { name: physicalName(64, name) },
          { parent: self, ignoreChanges: ["name"] }
        );
        return defaultOac;
      }
      function createCachePolicy() {
        defaultCachePolicy = defaultCachePolicy ?? new cloudfront.CachePolicy(
          ...transform(
            args.transform?.cachePolicy,
            `${name}CachePolicy`,
            {
              comment: `${name} router cache policy`,
              defaultTtl: 0,
              maxTtl: 31536e3,
              // 1 year
              minTtl: 0,
              parametersInCacheKeyAndForwardedToOrigin: {
                cookiesConfig: {
                  cookieBehavior: "none"
                },
                headersConfig: {
                  headerBehavior: "none"
                },
                queryStringsConfig: {
                  queryStringBehavior: "all"
                },
                enableAcceptEncodingBrotli: true,
                enableAcceptEncodingGzip: true
              }
            },
            { parent: self }
          )
        );
        return defaultCachePolicy;
      }
      function createCdn() {
        return routes.apply((routes2) => {
          const distributionData = Object.entries(routes2).map(
            ([path20, route]) => {
              if ("url" in route) {
                return {
                  origin: {
                    originId: path20,
                    domainName: new URL(route.url).host,
                    customOriginConfig: {
                      httpPort: 80,
                      httpsPort: 443,
                      originProtocolPolicy: "https-only",
                      originReadTimeout: 20,
                      originSslProtocols: ["TLSv1.2"]
                    }
                  },
                  behavior: {
                    pathPattern: path20,
                    targetOriginId: path20,
                    functionAssociations: [
                      {
                        eventType: "viewer-request",
                        functionArn: route.edge?.viewerRequest || route.rewrite ? createCfRequestFunction(
                          path20,
                          route.edge?.viewerRequest,
                          route.rewrite,
                          true
                        ).arn : createCfRequestDefaultFunction().arn
                      },
                      ...route.edge?.viewerResponse ? [
                        {
                          eventType: "viewer-response",
                          functionArn: createCfResponseFunction(
                            path20,
                            route.edge.viewerResponse
                          ).arn
                        }
                      ] : []
                    ],
                    viewerProtocolPolicy: "redirect-to-https",
                    allowedMethods: [
                      "DELETE",
                      "GET",
                      "HEAD",
                      "OPTIONS",
                      "PATCH",
                      "POST",
                      "PUT"
                    ],
                    cachedMethods: ["GET", "HEAD"],
                    defaultTtl: 0,
                    compress: true,
                    cachePolicyId: route.cachePolicy ?? createCachePolicy().id,
                    // CloudFront's Managed-AllViewerExceptHostHeader policy
                    originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
                  }
                };
              } else if ("bucket" in route) {
                return {
                  origin: {
                    originId: path20,
                    domainName: route.bucket instanceof Bucket ? route.bucket.nodes.bucket.bucketRegionalDomainName : route.bucket,
                    originPath: "",
                    originAccessControlId: createOriginAccessControl().id
                  },
                  behavior: {
                    pathPattern: path20,
                    targetOriginId: path20,
                    functionAssociations: [
                      ...route.edge?.viewerRequest || route.rewrite ? [
                        {
                          eventType: "viewer-request",
                          functionArn: route.edge?.viewerRequest || route.rewrite ? createCfRequestFunction(
                            path20,
                            route.edge?.viewerRequest,
                            route.rewrite,
                            false
                          ).arn : createCfRequestDefaultFunction().arn
                        }
                      ] : [],
                      ...route.edge?.viewerResponse ? [
                        {
                          eventType: "viewer-response",
                          functionArn: createCfResponseFunction(
                            path20,
                            route.edge.viewerResponse
                          ).arn
                        }
                      ] : []
                    ],
                    viewerProtocolPolicy: "redirect-to-https",
                    allowedMethods: ["GET", "HEAD", "OPTIONS"],
                    cachedMethods: ["GET", "HEAD"],
                    compress: true,
                    // CloudFront's managed CachingOptimized policy
                    cachePolicyId: route.cachePolicy ?? "658327ea-f89d-4fab-a63d-7e88639e58f6"
                  }
                };
              }
              throw new Error("Invalid route type");
            }
          );
          return new Cdn(
            ...transform(
              args.transform?.cdn,
              `${name}Cdn`,
              {
                comment: `${name} router`,
                origins: distributionData.map((d) => d.origin),
                defaultCacheBehavior: {
                  ...distributionData.find(
                    (d) => d.behavior.pathPattern === "/*"
                  ).behavior,
                  // @ts-expect-error
                  pathPattern: void 0
                },
                orderedCacheBehaviors: distributionData.filter((d) => d.behavior.pathPattern !== "/*").map((d) => d.behavior),
                domain: args.domain,
                wait: true
              },
              { parent: self }
            )
          );
        });
      }
    }
    function handleLazyRoutes() {
      const kvNamespace2 = buildRequestKvNamespace();
      const kvStoreArn2 = createRequestKvStore();
      const requestFunction = createRequestFunction();
      const responseFunction = createResponseFunction();
      const cachePolicyId = createCachePolicy().id;
      const distribution = createDistribution();
      return { kvNamespace: kvNamespace2, kvStoreArn: kvStoreArn2, distribution };
      function buildRequestKvNamespace() {
        return crypto3.createHash("md5").update(`${define_app_default.name}-${define_app_default.stage}-${name}`).digest("hex").substring(0, 4);
      }
      function createRequestKvStore() {
        return output10(args.edge).apply((edge) => {
          const viewerRequest = edge?.viewerRequest;
          const userKvStore = viewerRequest?.kvStore;
          if (userKvStore) return output10(userKvStore);
          return new cloudfront.KeyValueStore(
            `${name}KvStore`,
            {},
            { parent: self }
          ).arn;
        });
      }
      function createCachePolicy() {
        return new cloudfront.CachePolicy(
          ...transform(
            args.transform?.cachePolicy,
            `${name}ServerCachePolicy`,
            {
              comment: "SST server response cache policy",
              defaultTtl: 0,
              maxTtl: 31536e3,
              // 1 year
              minTtl: 0,
              parametersInCacheKeyAndForwardedToOrigin: {
                cookiesConfig: {
                  cookieBehavior: "none"
                },
                headersConfig: {
                  headerBehavior: "whitelist",
                  headers: {
                    items: ["x-open-next-cache-key"]
                  }
                },
                queryStringsConfig: {
                  queryStringBehavior: "all"
                },
                enableAcceptEncodingBrotli: true,
                enableAcceptEncodingGzip: true
              }
            },
            { parent: self }
          )
        );
      }
      function createRequestFunction() {
        return output10(args.edge).apply((edge) => {
          const userInjection = edge?.viewerRequest?.injection ?? "";
          const blockCloudfrontUrlInjection = args.domain ? CF_BLOCK_CLOUDFRONT_URL_INJECTION : "";
          return new cloudfront.Function(
            `${name}CloudfrontFunctionRequest`,
            {
              runtime: "cloudfront-js-2.0",
              keyValueStoreAssociations: kvStoreArn2 ? [kvStoreArn2] : [],
              code: interpolate3`
import cf from "cloudfront";
async function handler(event) {
  ${userInjection}
  ${blockCloudfrontUrlInjection}
  ${CF_ROUTER_INJECTION}

  const routerNS = "${kvNamespace2}";

  async function getRoutes() {
    let routes = [];
    try {
      const v = await cf.kvs().get(routerNS + ":routes");
      routes = JSON.parse(v);

      // handle chunked routes
      if (routes.parts) {
        const chunkPromises = [];
        for (let i = 0; i < routes.parts; i++) {
          chunkPromises.push(cf.kvs().get(routerNS + ":routes:" + i));
        }
        const chunks = await Promise.all(chunkPromises);
        routes = JSON.parse(chunks.join(""));
      }
    } catch (e) {}
    return routes;
  }

  async function matchRoute(routes) {
    const requestHost = event.request.headers.host.value;
    const requestHostWithEscapedDots = requestHost.replace(/\\./g, "\\\\.");
    const requestHostRegexPattern = "^" + requestHost + "$";
    let match;
    routes.forEach(r => {
      ${/*
                Route format: [type, routeNamespace, hostRegex, pathPrefix]
                - First sort by host pattern (longest first)
                - Then sort by path prefix (longest first)
              */
              ""}
      var parts = r.split(",");
      const type = parts[0];
      const routeNs = parts[1];
      const host = parts[2];
      const hostLength = host.length;
      const path = parts[3];
      const pathLength = path.length;

      // Do not consider if the current match is a better winner
      if (match && (
          hostLength < match.hostLength
          || (hostLength === match.hostLength && pathLength < match.pathLength)
      )) return;

      const hostMatches = host === ""
        || host === requestHostWithEscapedDots
        || (host.includes("*") && new RegExp(host).test(requestHostRegexPattern));
      if (!hostMatches) return;

      const pathMatches = event.request.uri.startsWith(path);
      if (!pathMatches) return;

      match = {
        type,
        routeNs,
        host,
        hostLength,
        path,
        pathLength,
      };
    });

    // Load metadata
    if (match) {
      try {
        const type = match.type;
        const routeNs = match.routeNs;
        const v = await cf.kvs().get(routeNs + ":metadata");
        return { type, routeNs, metadata: JSON.parse(v) };
      } catch (e) {}
    }
  }

  // Look up the route
  const routes = await getRoutes();
  const route = await matchRoute(routes);
  if (!route) return event.request;
  if (route.metadata.rewrite) {
    const rw = route.metadata.rewrite;
    event.request.uri = event.request.uri.replace(new RegExp(rw.regex), rw.to);
  }
  if (route.type === "url") setUrlOrigin(route.metadata.host, route.metadata.origin);
  if (route.type === "bucket") setS3Origin(route.metadata.domain, route.metadata.origin);
  if (route.type === "site") await routeSite(route.routeNs, route.metadata);
  return event.request;
}`
            },
            { parent: self }
          );
        });
      }
      function createResponseFunction() {
        return output10(args.edge).apply((edge) => {
          const userConfig = edge?.viewerResponse;
          const userInjection = userConfig?.injection;
          const kvStoreArn3 = userConfig?.kvStore;
          if (!userInjection) return;
          return new cloudfront.Function(
            `${name}CloudfrontFunctionResponse`,
            {
              runtime: "cloudfront-js-2.0",
              keyValueStoreAssociations: kvStoreArn3 ? [kvStoreArn3] : [],
              code: `
import cf from "cloudfront";
async function handler(event) {
  ${userInjection}
  return event.response;
}`
            },
            { parent: self }
          );
        });
      }
      function createDistribution() {
        return new Cdn(
          ...transform(
            args.transform?.cdn,
            `${name}Cdn`,
            {
              comment: `${name} app`,
              domain: args.domain,
              origins: [
                {
                  originId: "default",
                  domainName: "placeholder.sst.dev",
                  customOriginConfig: {
                    httpPort: 80,
                    httpsPort: 443,
                    originProtocolPolicy: "http-only",
                    originReadTimeout: 20,
                    originSslProtocols: ["TLSv1.2"]
                  }
                }
              ],
              defaultCacheBehavior: {
                targetOriginId: "default",
                viewerProtocolPolicy: "redirect-to-https",
                allowedMethods: [
                  "DELETE",
                  "GET",
                  "HEAD",
                  "OPTIONS",
                  "PATCH",
                  "POST",
                  "PUT"
                ],
                cachedMethods: ["GET", "HEAD"],
                compress: true,
                cachePolicyId,
                // CloudFront's Managed-AllViewerExceptHostHeader policy
                originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac",
                functionAssociations: all10([
                  requestFunction,
                  responseFunction
                ]).apply(([reqFn, resFn]) => [
                  { eventType: "viewer-request", functionArn: reqFn.arn },
                  ...resFn ? [{ eventType: "viewer-response", functionArn: resFn.arn }] : []
                ])
              },
              tags: {
                "sst:ref:kv": kvStoreArn2,
                "sst:ref:kv-namespace": kvNamespace2,
                "sst:ref:version": _refVersion.toString()
              }
            },
            { parent: self }
          )
        );
      }
    }
  }
  /**
   * The ID of the Router distribution.
   */
  get distributionID() {
    return this.cdn.nodes.distribution.id;
  }
  /**
   * The URL of the Router.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return all10([this.cdn.domainUrl, this.cdn.url]).apply(
      ([domainUrl, url]) => domainUrl ?? url
    );
  }
  /** @internal */
  get _kvStoreArn() {
    return this.kvStoreArn;
  }
  /** @internal */
  get _kvNamespace() {
    return this.kvNamespace;
  }
  /** @internal */
  get _hasInlineRoutes() {
    return this.hasInlineRoutes;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon CloudFront CDN resource.
       */
      cdn: this.cdn
    };
  }
  /**
   * Add a route to a destination URL.
   *
   * @param pattern The path prefix to match for this route.
   * @param url The destination URL to route matching requests to.
   * @param args Configure the route.
   *
   * @example
   *
   * You can match a route based on:
   *
   * - A path prefix like `/api`
   * - A domain pattern like `api.example.com`
   * - A combined pattern like `dev.example.com/api`
   *
   * For example, to match a path prefix.
   *
   * ```ts title="sst.config.ts"
   * router.route("/api", "https://api.example.com");
   * ```
   *
   * Or match a domain.
   *
   * ```ts title="sst.config.ts"
   * router.route("api.myapp.com/", "https://api.example.com");
   * ```
   *
   * Or a combined pattern.
   *
   * ```ts title="sst.config.ts"
   * router.route("dev.myapp.com/api", "https://api.example.com");
   * ```
   *
   * You can also rewrite the request path.
   *
   * ```ts title="sst.config.ts"
   * router.route("/api", "https://api.example.com", {
   *   rewrite: {
   *     regex: "^/api/(.*)$",
   *     to: "/$1"
   *   }
   * });
   * ```
   *
   * Here something like `/api/users/profile` will be routed to
   * `https://api.example.com/users/profile`.
   */
  route(pattern, url, args) {
    all10([pattern, args, this.hasInlineRoutes]).apply(
      ([pattern2, args2, hasInlineRoutes]) => {
        if (hasInlineRoutes)
          throw new VisibleError(
            "Cannot use both `routes` and `.route()` function to add routes."
          );
        new RouterUrlRoute(
          `${this.constructorName}Route${pattern2}`,
          {
            store: this.kvStoreArn,
            routerNamespace: this.kvNamespace,
            pattern: pattern2,
            url,
            routeArgs: args2
          },
          { provider: this.constructorOpts.provider }
        );
      }
    );
  }
  /**
   * Add a route to an S3 bucket.
   *
   * @param pattern The path prefix to match for this route.
   * @param bucket The S3 bucket to route matching requests to.
   * @param args Configure the route.
   *
   * @example
   *
   * Let's say you have an S3 bucket that gives CloudFront `access`.
   *
   * ```ts title="sst.config.ts" {2}
   * const bucket = new sst.aws.Bucket("MyBucket", {
   *   access: "cloudfront"
   * });
   * ```
   *
   * You can match a pattern and route to it based on:
   *
   * - A path prefix like `/api`
   * - A domain pattern like `api.example.com`
   * - A combined pattern like `dev.example.com/api`
   *
   * For example, to match a path prefix.
   *
   * ```ts title="sst.config.ts"
   * router.routeBucket("/files", bucket);
   * ```
   *
   * Or match a domain.
   *
   * ```ts title="sst.config.ts"
   * router.routeBucket("files.example.com", bucket);
   * ```
   *
   * Or a combined pattern.
   *
   * ```ts title="sst.config.ts"
   * router.routeBucket("dev.example.com/files", bucket);
   * ```
   *
   * You can also rewrite the request path.
   *
   * ```ts title="sst.config.ts"
   * router.routeBucket("/files", bucket, {
   *   rewrite: {
   *     regex: "^/files/(.*)$",
   *     to: "/$1"
   *   }
   * });
   * ```
   *
   * Here something like `/files/logo.png` will be routed to
   * `/logo.png`.
   */
  routeBucket(pattern, bucket, args) {
    all10([pattern, args, this.hasInlineRoutes]).apply(
      ([pattern2, args2, hasInlineRoutes]) => {
        if (hasInlineRoutes)
          throw new VisibleError(
            "Cannot use both `routes` and `.routeBucket()` function to add routes."
          );
        new RouterBucketRoute(
          `${this.constructorName}Route${pattern2}`,
          {
            store: this.kvStoreArn,
            routerNamespace: this.kvNamespace,
            pattern: pattern2,
            bucket,
            routeArgs: args2
          },
          { provider: this.constructorOpts.provider }
        );
      }
    );
  }
  /**
   * Add a route to a frontend or static site.
   *
   * @param pattern The path prefix to match for this route.
   * @param site The frontend or static site to route matching requests to.
   *
   * @deprecated The `routeSite` function has been deprecated. Set the `route` on the
   * site components to route the site through this Router.
   */
  routeSite(pattern, site) {
    throw new VisibleError(
      `The "routeSite" function has been deprecated. Configure the new "route" prop on the site component to route the site through this Router.`
    );
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url
      }
    };
  }
  /**
   * Reference an existing Router with the given Router distribution ID.
   *
   * @param name The name of the component.
   * @param distributionID The ID of the existing Router distribution.
   * @param opts? Resource options.
   *
   * This is useful when you create a Router in one stage and want to share it in
   * another. It avoids having to create a new Router in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share a Router across stages.
   * :::
   *
   * @example
   * Let's say you create a Router in the `dev` stage. And in your personal stage
   * `frank`, you want to share the same Router.
   *
   * ```ts title="sst.config.ts"
   * const router = $app.stage === "frank"
   *   ? sst.aws.Router.get("MyRouter", "E2IDLMESRN6V62")
   *   : new sst.aws.Router("MyRouter");
   * ```
   *
   * Here `E2IDLMESRN6V62` is the ID of the Router distribution created in the
   * `dev` stage. You can find this by outputting the distribution ID in the `dev`
   * stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   router: router.distributionID
   * };
   * ```
   *
   * Learn more about [how to configure a router for your app](/docs/configure-a-router).
   */
  static get(name, distributionID, opts) {
    return new _Router(
      name,
      {
        ref: true,
        distributionID
      },
      opts
    );
  }
};
var __pulumiType7 = "sst:aws:Router";
Router.__pulumiType = __pulumiType7;
var CF_BLOCK_CLOUDFRONT_URL_INJECTION = `
if (event.request.headers.host.value.includes('cloudfront.net')) {
  return {
    statusCode: 403,
    statusDescription: 'Forbidden',
    body: {
      encoding: "text",
      data: '<html><head><title>403 Forbidden</title></head><body><center><h1>403 Forbidden</h1></center></body></html>'
    }
  };
}`;
var CF_ROUTER_INJECTION = `
async function routeSite(kvNamespace, metadata) {
  const baselessUri = metadata.base
    ? event.request.uri.replace(metadata.base, "")
    : event.request.uri;

  // Route to S3 files
  try {
    // check using baselessUri b/c files are stored in the root
    const u = decodeURIComponent(baselessUri);
    const postfixes = u.endsWith("/")
      ? ["index.html"]
      : ["", ".html", "/index.html"];
    const v = await Promise.any(postfixes.map(p => cf.kvs().get(kvNamespace + ":" + u + p).then(v => p)));
    // files are stored in a subdirectory, add it to the request uri
    event.request.uri = metadata.s3.dir + event.request.uri + v;
    setS3Origin(metadata.s3.domain);
    return;
  } catch (e) {}

  // Route to S3 routes
  if (metadata.s3 && metadata.s3.routes) {
    for (var i=0, l=metadata.s3.routes.length; i<l; i++) {
      const route = metadata.s3.routes[i];
      if (baselessUri.startsWith(route)) {
        event.request.uri = metadata.s3.dir + event.request.uri;
        // uri ends with /, ie. /usage/ -> /usage/index.html
        if (event.request.uri.endsWith("/")) {
          event.request.uri += "index.html";
        }
        // uri ends with non-file, ie. /usage -> /usage/index.html
        else if (!event.request.uri.split("/").pop().includes(".")) {
          event.request.uri += "/index.html";
        }
        setS3Origin(metadata.s3.domain);
        return;
      }
    }
  }

  // Route to S3 custom 404 (no servers)
  if (metadata.custom404) {
    event.request.uri = metadata.s3.dir + (metadata.base ? metadata.base : "") + metadata.custom404;
    setS3Origin(metadata.s3.domain);
    return;
  }

  // Route to image optimizer
  if (metadata.image && baselessUri.startsWith(metadata.image.route)) {
    setUrlOrigin(metadata.image.host);
    return;
  }

  // Route to servers
  if (metadata.servers){
    event.request.headers["x-forwarded-host"] = event.request.headers.host;
    ${// Note: In SvelteKit, form action requests contain "/" in request query string
//  ie. POST request with query string "?/action"
//  CloudFront does not allow query string with "/". It needs to be encoded.
""}
    for (var key in event.request.querystring) {
      if (key.includes("/")) {
        event.request.querystring[encodeURIComponent(key)] = event.request.querystring[key];
        delete event.request.querystring[key];
      }
    }
    setNextjsGeoHeaders();
    setNextjsCacheKey();
    setUrlOrigin(findNearestServer(metadata.servers), metadata.origin);
  }

  function setNextjsGeoHeaders() {
    ${// Inject the CloudFront viewer country, region, latitude, and longitude headers into
// the request headers for OpenNext to use them for OpenNext to use them
""}
    if(event.request.headers["cloudfront-viewer-city"]) {
      event.request.headers["x-open-next-city"] = event.request.headers["cloudfront-viewer-city"];
    }
    if(event.request.headers["cloudfront-viewer-country"]) {
      event.request.headers["x-open-next-country"] = event.request.headers["cloudfront-viewer-country"];
    }
    if(event.request.headers["cloudfront-viewer-region"]) {
      event.request.headers["x-open-next-region"] = event.request.headers["cloudfront-viewer-region"];
    }
    if(event.request.headers["cloudfront-viewer-latitude"]) {
      event.request.headers["x-open-next-latitude"] = event.request.headers["cloudfront-viewer-latitude"];
    }
    if(event.request.headers["cloudfront-viewer-longitude"]) {
      event.request.headers["x-open-next-longitude"] = event.request.headers["cloudfront-viewer-longitude"];
    }
  }

  function setNextjsCacheKey() {
    ${// This function is used to improve cache hit ratio by setting the cache key
// based on the request headers and the path. `next/image` only needs the
// accept header, and this header is not useful for the rest of the query
""}
    var cacheKey = "";
    if (event.request.uri.startsWith("/_next/image")) {
      cacheKey = getHeader("accept");
    } else {
      cacheKey =
        getHeader("rsc") +
        getHeader("next-router-prefetch") +
        getHeader("next-router-state-tree") +
        getHeader("next-url") +
        getHeader("x-prerender-revalidate");
    }
    if (event.request.cookies["__prerender_bypass"]) {
      cacheKey += event.request.cookies["__prerender_bypass"]
        ? event.request.cookies["__prerender_bypass"].value
        : "";
    }
    var crypto = require("crypto");
    var hashedKey = crypto.createHash("md5").update(cacheKey).digest("hex");
    event.request.headers["x-open-next-cache-key"] = { value: hashedKey };
  }

  function getHeader(key) {
    var header = event.request.headers[key];
    if (header) {
      if (header.multiValue) {
        return header.multiValue.map((header) => header.value).join(",");
      }
      if (header.value) {
        return header.value;
      }
    }
    return "";
  }

  function findNearestServer(servers) {
    if (servers.length === 1) return servers[0][0];

    const h = event.request.headers;
    const lat = h["cloudfront-viewer-latitude"] && h["cloudfront-viewer-latitude"].value;
    const lon = h["cloudfront-viewer-longitude"] && h["cloudfront-viewer-longitude"].value;
    if (!lat || !lon) return servers[0][0];

    return servers
      .map((s) => ({
        distance: haversineDistance(lat, lon, s[1], s[2]),
        host: s[0],
      }))
      .sort((a, b) => a.distance - b.distance)[0]
      .host;
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = angle => angle * Math.PI / 180;
    const radLat1 = toRad(lat1);
    const radLat2 = toRad(lat2);
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}

function setUrlOrigin(urlHost, override) {
  event.request.headers["x-forwarded-host"] = event.request.headers.host;
  const origin = {
    domainName: urlHost,
    customOriginConfig: {
      port: 443,
      protocol: "https",
      sslProtocols: ["TLSv1.2"],
    },
    originAccessControlConfig: {
      enabled: false,
    }
  };
  override = override ?? {};
  if (override.protocol === "http") {
    delete origin.customOriginConfig;
  }
  if (override.connectionAttempts) {
    origin.connectionAttempts = override.connectionAttempts;
  }
  if (override.timeouts) {
    origin.timeouts = override.timeouts;
  }
  cf.updateRequestOrigin(origin);
}

function setS3Origin(s3Domain, override) {
  delete event.request.headers["Cookies"];
  delete event.request.headers["cookies"];
  delete event.request.cookies;

  const origin = {
    domainName: s3Domain,
    originAccessControlConfig: {
      enabled: true,
      signingBehavior: "always",
      signingProtocol: "sigv4",
      originType: "s3",
    }
  };
  override = override ?? {};
  if (override.connectionAttempts) {
    origin.connectionAttempts = override.connectionAttempts;
  }
  if (override.timeouts) {
    origin.timeouts = override.timeouts;
  }
  cf.updateRequestOrigin(origin);
}`;
function normalizeRouteArgs(route, routeDeprecated) {
  if (!route && !routeDeprecated) return void 0;
  return all10([route, routeDeprecated]).apply(([route2, routeDeprecated2]) => {
    const v = route2 ? route2 : { ...routeDeprecated2, instance: routeDeprecated2.router };
    return v.instance._hasInlineRoutes.apply((hasInlineRoutes) => {
      if (hasInlineRoutes)
        throw new VisibleError(
          "Cannot route the site using the provided router. The Router component uses inline routes which has been deprecated."
        );
      const pathPrefix = v.path ? "/" + v.path.replace(/^\//, "").replace(/\/$/, "") : void 0;
      return {
        hostPattern: v.domain ? v.domain.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") : void 0,
        pathPrefix,
        routerDistributionId: v.instance.nodes.cdn.nodes.distribution.id,
        routerUrl: v.instance.url.apply(
          (url) => (v.domain ? `https://${v.domain}` : url) + (pathPrefix ?? "")
        ),
        routerKvNamespace: v.instance._kvNamespace,
        routerKvStoreArn: v.instance._kvStoreArn
      };
    });
  });
}

// .sst/platform/src/components/aws/function.ts
var Function = class _Function extends Component {
  constructorName;
  function;
  role;
  logGroup;
  urlEndpoint;
  eventInvokeConfig;
  static encryptionKey = lazy(
    () => new RandomBytes("LambdaEncryptionKey", {
      length: 32
    })
  );
  static appsync = lazy(
    () => rpc.call("Provider.Aws.Appsync", {})
  );
  constructor(name, args, opts) {
    super(__pulumiType8, name, args, opts);
    this.constructorName = name;
    const parent = this;
    const dev = normalizeDev();
    const isContainer = all11([args.python, dev]).apply(
      ([python, dev2]) => !dev2 && (python?.container ?? false)
    );
    const partition = getPartitionOutput2({}, opts).partition;
    const region = getRegionOutput({}, opts).name;
    const bootstrapData = region.apply((region2) => bootstrap.forRegion(region2));
    const injections = normalizeInjections();
    const runtime5 = output11(args.runtime ?? "nodejs20.x");
    const timeout = normalizeTimeout();
    const memory = normalizeMemory2();
    const storage = output11(args.storage).apply((v) => v ?? "512 MB");
    const architecture = output11(args.architecture).apply((v) => v ?? "x86_64");
    const environment = normalizeEnvironment();
    const streaming = normalizeStreaming();
    const logging = normalizeLogging();
    const volume = normalizeVolume();
    const url = normalizeUrl();
    const copyFiles = normalizeCopyFiles();
    const policies = output11(args.policies ?? []);
    const vpc = normalizeVpc();
    const linkData = buildLinkData();
    const linkPermissions = buildLinkPermissions();
    const { bundle, handler: handler0, sourcemaps } = buildHandler();
    const { handler, wrapper } = buildHandlerWrapper();
    const role = createRole();
    const imageAsset = createImageAsset();
    const logGroup = createLogGroup();
    const zipAsset = createZipAsset();
    const fn = createFunction();
    const urlEndpoint = createUrl();
    createProvisioned();
    const eventInvokeConfig = createEventInvokeConfig();
    const links = linkData.apply((input) => input.map((item) => item.name));
    this.function = fn;
    this.role = role;
    this.logGroup = logGroup;
    this.urlEndpoint = urlEndpoint;
    this.eventInvokeConfig = eventInvokeConfig;
    const buildInput = output11({
      functionID: name,
      handler: args.handler,
      bundle: args.bundle,
      logGroup: logGroup.apply((l) => l?.name),
      encryptionKey: _Function.encryptionKey().base64,
      runtime: runtime5,
      links: output11(linkData).apply(
        (input) => Object.fromEntries(input.map((item) => [item.name, item.properties]))
      ),
      copyFiles,
      properties: output11({ nodejs: args.nodejs, python: args.python }).apply(
        (val) => ({
          ...val.nodejs || val.python,
          architecture
        })
      ),
      dev
    });
    buildInput.apply(async (input) => {
      if (!input.dev) return;
      await rpc.call("Runtime.AddTarget", input);
    });
    this.registerOutputs({
      _live: unsecret(
        output11(dev).apply((dev2) => {
          if (!dev2) return void 0;
          return all11([
            name,
            links,
            args.handler,
            args.bundle,
            args.runtime,
            args.nodejs,
            copyFiles
          ]).apply(
            ([name2, links2, handler2, bundle2, runtime6, nodejs, copyFiles2]) => {
              return {
                functionID: name2,
                links: links2,
                handler: handler2,
                bundle: bundle2,
                runtime: runtime6 || "nodejs20.x",
                copyFiles: copyFiles2,
                properties: nodejs
              };
            }
          );
        })
      ),
      _metadata: {
        handler: args.handler,
        internal: args._skipMetadata,
        dev
      },
      _hint: args._skipHint ? void 0 : urlEndpoint
    });
    function normalizeDev() {
      return all11([args.dev, args.live]).apply(
        ([d, l]) => false
      );
    }
    function normalizeInjections() {
      return output11(args.injections).apply((injections2) => injections2 ?? []);
    }
    function normalizeTimeout() {
      return output11(args.timeout).apply((timeout2) => timeout2 ?? "20 seconds");
    }
    function normalizeMemory2() {
      return output11(args.memory).apply((memory2) => memory2 ?? "1024 MB");
    }
    function normalizeEnvironment() {
      return all11([
        args.environment,
        dev,
        bootstrapData,
        _Function.encryptionKey().base64,
        args.link
      ]).apply(async ([environment2, dev2, bootstrap2, key, link]) => {
        const result2 = environment2 ?? {};
        result2.SST_RESOURCE_App = JSON.stringify({
          name: define_app_default.name,
          stage: define_app_default.stage
        });
        for (const linkable4 of link || []) {
          if (!Link.isLinkable(linkable4)) continue;
          const def = linkable4.getSSTLink();
          for (const item of def.include || []) {
            if (item.type === "environment") Object.assign(result2, item.env);
          }
        }
        result2.SST_KEY = key;
        result2.SST_KEY_FILE = "resource.enc";
        if (dev2) {
          const appsync5 = await _Function.appsync();
          result2.SST_REGION = process.env.SST_AWS_REGION;
          result2.SST_APPSYNC_HTTP = appsync5.http;
          result2.SST_APPSYNC_REALTIME = appsync5.realtime;
          result2.SST_FUNCTION_ID = name;
          result2.SST_APP = define_app_default.name;
          result2.SST_STAGE = define_app_default.stage;
          result2.SST_ASSET_BUCKET = bootstrap2.asset;
          if (process.env.SST_FUNCTION_TIMEOUT) {
            result2.SST_FUNCTION_TIMEOUT = process.env.SST_FUNCTION_TIMEOUT;
          }
        }
        return result2;
      });
    }
    function normalizeStreaming() {
      return output11(args.streaming).apply((streaming2) => streaming2 ?? false);
    }
    function normalizeLogging() {
      return output11(args.logging).apply((logging2) => {
        if (logging2 === false) return void 0;
        if (logging2?.retention && logging2?.logGroup) {
          throw new VisibleError(
            `Cannot set both "logging.retention" and "logging.logGroup"`
          );
        }
        return {
          logGroup: logging2?.logGroup,
          retention: logging2?.retention ?? "1 month",
          format: logging2?.format ?? "text"
        };
      });
    }
    function normalizeVolume() {
      if (!args.volume) return;
      return output11(args.volume).apply((volume2) => ({
        efs: volume2.efs instanceof Efs ? volume2.efs.nodes.accessPoint.arn : output11(volume2.efs),
        path: volume2.path ?? "/mnt/efs"
      }));
    }
    function normalizeUrl() {
      return output11(args.url).apply((url2) => {
        if (url2 === false || url2 === void 0) return;
        if (url2 === true) {
          url2 = {};
        }
        const defaultAuthorization = "none";
        const authorization = url2.authorization ?? defaultAuthorization;
        const defaultCors = {
          allowHeaders: ["*"],
          allowMethods: ["*"],
          allowOrigins: ["*"]
        };
        const cors = url2.cors === false ? void 0 : url2.cors === true || url2.cors === void 0 ? defaultCors : {
          ...defaultCors,
          ...url2.cors,
          maxAge: url2.cors.maxAge && toSeconds(url2.cors.maxAge)
        };
        return {
          authorization,
          cors,
          route: normalizeRouteArgs(url2.router, url2.route)
        };
      });
    }
    function normalizeCopyFiles() {
      return output11(args.copyFiles ?? []).apply(
        (copyFiles2) => Promise.all(
          copyFiles2.map(async (entry) => {
            const from = path.join(define_cli_default.paths.root, entry.from);
            const to = entry.to || entry.from;
            if (path.isAbsolute(to)) {
              throw new VisibleError(
                `Copy destination path "${to}" must be relative`
              );
            }
            const stats = await fs.promises.stat(from);
            const isDir = stats.isDirectory();
            return { from, to, isDir };
          })
        )
      );
    }
    function normalizeVpc() {
      if (!args.vpc) return;
      if (args.vpc instanceof Vpc2) {
        const result2 = {
          privateSubnets: args.vpc.privateSubnets,
          securityGroups: args.vpc.securityGroups
        };
        return all11([
          args.vpc.id,
          args.vpc.nodes.natGateways,
          args.vpc.nodes.natInstances
        ]).apply(([id, natGateways, natInstances]) => {
          if (natGateways.length === 0 && natInstances.length === 0) {
            warnOnce(
              `
Warning: One or more functions are deployed in the "${id}" VPC, which does not have a NAT gateway. As a result, these functions cannot access the internet. If your functions need internet access, enable it by setting the "nat" prop on the "Vpc" component.
`
            );
          }
          return result2;
        });
      }
      return output11(args.vpc).apply((vpc2) => {
        if (vpc2.subnets) {
          throw new VisibleError(
            `The "vpc.subnets" property has been renamed to "vpc.privateSubnets". Update your code to use "vpc.privateSubnets" instead.`
          );
        }
        return vpc2;
      });
    }
    function buildLinkData() {
      return output11(args.link || []).apply((links2) => Link.build(links2));
    }
    function buildLinkPermissions() {
      return Link.getInclude("aws.permission", args.link);
    }
    function buildHandler() {
      return all11([runtime5, dev, isContainer]).apply(
        async ([runtime6, dev2, isContainer2]) => {
          if (dev2) {
            return {
              handler: "bootstrap",
              bundle: path.join(define_cli_default.paths.platform, "dist", "bridge")
            };
          }
          const buildResult = buildInput.apply(async (input) => {
            const result2 = await rpc.call("Runtime.Build", { ...input, isContainer: isContainer2 });
            if (result2.errors.length > 0) {
              throw new Error(result2.errors.join("\n"));
            }
            if (args.hook?.postbuild) await args.hook.postbuild(result2.out);
            return result2;
          });
          return {
            handler: buildResult.handler,
            bundle: buildResult.out,
            sourcemaps: buildResult.sourcemaps
          };
        }
      );
    }
    function buildHandlerWrapper() {
      const ret = all11([
        dev,
        bundle,
        handler0,
        linkData,
        streaming,
        injections,
        runtime5
      ]).apply(
        async ([
          dev2,
          bundle2,
          handler2,
          linkData2,
          streaming2,
          injections2,
          runtime6
        ]) => {
          if (dev2) return { handler: handler2 };
          if (!runtime6.startsWith("nodejs")) {
            return { handler: handler2 };
          }
          const hasUserInjections = injections2.length > 0;
          if (!hasUserInjections) return { handler: handler2 };
          const parsed = path.posix.parse(handler2);
          const handlerDir = parsed.dir;
          const oldHandlerFileName = parsed.name;
          const oldHandlerFunction = parsed.ext.replace(/^\./, "");
          const newHandlerFileName = "server-index";
          const newHandlerFunction = "handler";
          const newHandlerFileExt = [".js", ".mjs", ".cjs"].find(
            (ext) => fs.existsSync(
              path.join(bundle2, handlerDir, oldHandlerFileName + ext)
            )
          );
          if (!newHandlerFileExt) {
            throw new VisibleError(
              `Could not find handler file "${handler2}" for function "${name}"`
            );
          }
          const split = injections2.reduce(
            (acc, item) => {
              if (item.startsWith("outer:")) {
                acc.outer.push(item.substring("outer:".length));
                return acc;
              }
              acc.inner.push(item);
              return acc;
            },
            { outer: [], inner: [] }
          );
          return {
            handler: path.posix.join(
              handlerDir,
              `${newHandlerFileName}.${newHandlerFunction}`
            ),
            wrapper: {
              name: path.posix.join(handlerDir, `${newHandlerFileName}.mjs`),
              content: streaming2 ? [
                ...split.outer,
                `export const ${newHandlerFunction} = awslambda.streamifyResponse(async (event, responseStream, context) => {`,
                ...split.inner,
                `  const { ${oldHandlerFunction}: rawHandler} = await import("./${oldHandlerFileName}${newHandlerFileExt}");`,
                `  return rawHandler(event, responseStream, context);`,
                `});`
              ].join("\n") : [
                ...split.outer,
                `export const ${newHandlerFunction} = async (event, context) => {`,
                ...split.inner,
                `  const { ${oldHandlerFunction}: rawHandler} = await import("./${oldHandlerFileName}${newHandlerFileExt}");`,
                `  return rawHandler(event, context);`,
                `};`
              ].join("\n")
            }
          };
        }
      );
      return {
        handler: ret.handler,
        wrapper: ret.wrapper
      };
    }
    function createRole() {
      if (args.role) {
        return iam2.Role.get(
          `${name}Role`,
          output11(args.role).apply(parseRoleArn).roleName,
          {},
          { parent }
        );
      }
      const policy = all11([args.permissions || [], linkPermissions, dev]).apply(
        ([argsPermissions, linkPermissions2, dev2]) => iam2.getPolicyDocumentOutput({
          statements: [
            ...argsPermissions,
            ...linkPermissions2,
            ...dev2 ? [
              {
                effect: "allow",
                actions: ["appsync:*"],
                resources: ["*"]
              },
              {
                effect: "allow",
                actions: ["s3:*"],
                resources: [
                  interpolate4`arn:${partition}:s3:::${bootstrapData.asset}`,
                  interpolate4`arn:${partition}:s3:::${bootstrapData.asset}/*`
                ]
              }
            ] : []
          ].map((item) => ({
            effect: (() => {
              const effect = item.effect ?? "allow";
              return effect.charAt(0).toUpperCase() + effect.slice(1);
            })(),
            actions: item.actions,
            resources: item.resources
          }))
        })
      );
      return new iam2.Role(
        ...transform(
          args.transform?.role,
          `${name}Role`,
          {
            assumeRolePolicy: !dev ? iam2.assumeRolePolicyForPrincipal({
              Service: "lambda.amazonaws.com"
            }) : iam2.getPolicyDocumentOutput({
              statements: [
                {
                  actions: ["sts:AssumeRole"],
                  principals: [
                    {
                      type: "Service",
                      identifiers: ["lambda.amazonaws.com"]
                    },
                    {
                      type: "AWS",
                      identifiers: [
                        interpolate4`arn:${partition}:iam::${getCallerIdentityOutput({}, opts).accountId}:root`
                      ]
                    }
                  ]
                }
              ]
            }).json,
            // if there are no statements, do not add an inline policy.
            // adding an inline policy with no statements will cause an error.
            inlinePolicies: policy.apply(
              ({ statements }) => statements ? [{ name: "inline", policy: policy.json }] : []
            ),
            managedPolicyArns: all11([logging, policies]).apply(
              ([logging2, policies2]) => [
                ...policies2,
                ...logging2 ? [
                  interpolate4`arn:${partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole`
                ] : [],
                ...vpc ? [
                  interpolate4`arn:${partition}:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole`
                ] : []
              ]
            )
          },
          { parent }
        )
      );
    }
    function createImageAsset() {
      return all11([isContainer, dev, bundle]).apply(
        ([
          isContainer2,
          dev2,
          bundle2
          // We need the bundle to be resolved because of implicit dockerfiles even though we don't use it here
        ]) => {
          if (!isContainer2 || dev2) return;
          const authToken = ecr.getAuthorizationTokenOutput({
            registryId: bootstrapData.assetEcrRegistryId
          });
          return new Image(
            `${name}Image`,
            {
              tags: [interpolate`${bootstrapData.assetEcrUrl}:latest`],
              context: {
                location: path.join(
                  define_cli_default.paths.work,
                  "artifacts",
                  `${name}-src`
                )
              },
              cacheFrom: [
                {
                  registry: {
                    ref: interpolate`${bootstrapData.assetEcrUrl}:${name}-cache`
                  }
                }
              ],
              cacheTo: [
                {
                  registry: {
                    ref: interpolate`${bootstrapData.assetEcrUrl}:${name}-cache`,
                    imageManifest: true,
                    ociMediaTypes: true,
                    mode: "max"
                  }
                }
              ],
              platforms: [
                architecture.apply(
                  (v) => v === "arm64" ? "linux/arm64" : "linux/amd64"
                )
              ],
              push: true,
              registries: [
                authToken.apply((authToken2) => ({
                  address: authToken2.proxyEndpoint,
                  username: authToken2.userName,
                  password: secret(authToken2.password)
                }))
              ]
            },
            { parent }
          );
        }
      );
    }
    function createZipAsset() {
      return all11([
        bundle,
        wrapper,
        sourcemaps,
        copyFiles,
        isContainer,
        logGroup.apply((l) => l?.arn),
        dev
      ]).apply(
        async ([
          bundle2,
          wrapper2,
          sourcemaps2,
          copyFiles2,
          isContainer2,
          logGroupArn,
          dev2
        ]) => {
          if (isContainer2) return;
          const zipPath = path.resolve(
            define_cli_default.paths.work,
            "artifacts",
            name,
            "code.zip"
          );
          await fs.promises.mkdir(path.dirname(zipPath), {
            recursive: true
          });
          await new Promise(async (resolve, reject) => {
            const ws = fs.createWriteStream(zipPath);
            const archive = archiver("zip", {
              // Ensure deterministic zip file hashes
              // https://github.com/archiverjs/node-archiver/issues/397#issuecomment-554327338
              statConcurrency: 1
            });
            archive.on("warning", reject);
            archive.on("error", reject);
            ws.once("close", () => {
              resolve(zipPath);
            });
            archive.pipe(ws);
            const files = [];
            for (const item of [
              {
                from: bundle2,
                to: ".",
                isDir: true
              },
              ...!dev2 ? copyFiles2 : []
            ]) {
              if (!item.isDir) {
                files.push({
                  from: item.from,
                  to: item.to
                });
              }
              const found = await glob("**", {
                cwd: item.from,
                dot: true,
                ignore: sourcemaps2?.map((item2) => path.relative(bundle2, item2)) || []
              });
              files.push(
                ...found.map((file) => ({
                  from: path.join(item.from, file),
                  to: path.join(item.to, file)
                }))
              );
            }
            files.sort((a, b) => a.to.localeCompare(b.to));
            for (const file of files) {
              archive.file(file.from, {
                name: file.to,
                date: /* @__PURE__ */ new Date(0)
              });
            }
            if (wrapper2) {
              archive.append(wrapper2.content, {
                name: wrapper2.name,
                date: /* @__PURE__ */ new Date(0)
              });
            }
            await archive.finalize();
          });
          const hash = crypto4.createHash("sha256");
          hash.update(await fs.promises.readFile(zipPath, "utf-8"));
          const hashValue = hash.digest("hex");
          const assetBucket = region.apply(
            (region2) => bootstrap.forRegion(region2).then((d) => d.asset)
          );
          if (logGroupArn && sourcemaps2) {
            let index = 0;
            for (const file of sourcemaps2) {
              new s3.BucketObjectv2(
                `${name}Sourcemap${index}`,
                {
                  key: interpolate4`sourcemap/${logGroupArn}/${hashValue}.${path.basename(
                    file
                  )}`,
                  bucket: assetBucket,
                  source: new asset.FileAsset(file)
                },
                { parent, retainOnDelete: true }
              );
              index++;
            }
          }
          return new s3.BucketObjectv2(
            `${name}Code`,
            {
              key: interpolate4`assets/${name}-code-${hashValue}.zip`,
              bucket: assetBucket,
              source: new asset.FileArchive(zipPath)
            },
            { parent }
          );
        }
      );
    }
    function createLogGroup() {
      return logging.apply((logging2) => {
        if (!logging2) return;
        if (logging2.logGroup) return;
        return new cloudwatch.LogGroup(
          ...transform(
            args.transform?.logGroup,
            `${name}LogGroup`,
            {
              name: interpolate4`/aws/lambda/${args.name ?? physicalName(64, `${name}Function`)}`,
              retentionInDays: RETENTION[logging2.retention]
            },
            { parent, ignoreChanges: ["name"] }
          )
        );
      });
    }
    function createFunction() {
      return all11([
        logging,
        logGroup,
        isContainer,
        imageAsset,
        zipAsset,
        args.concurrency,
        dev
      ]).apply(
        ([
          logging2,
          logGroup2,
          isContainer2,
          imageAsset2,
          zipAsset2,
          concurrency,
          dev2
        ]) => {
          handler.allResources = () => Promise.resolve(/* @__PURE__ */ new Set());
          const transformed = transform(
            args.transform?.function,
            `${name}Function`,
            {
              name: args.name,
              description: args.description ?? "",
              role: args.role ?? role.arn,
              timeout: timeout.apply((timeout2) => toSeconds(timeout2)),
              memorySize: memory.apply((memory2) => toMBs(memory2)),
              ephemeralStorage: { size: storage.apply((v) => toMBs(v)) },
              environment: {
                variables: environment
              },
              architectures: [architecture],
              loggingConfig: logging2 && {
                logFormat: logging2.format === "json" ? "JSON" : "Text",
                logGroup: logging2.logGroup ?? logGroup2.name
              },
              vpcConfig: vpc && {
                securityGroupIds: vpc.securityGroups,
                subnetIds: vpc.privateSubnets
              },
              fileSystemConfig: volume && {
                arn: volume.efs,
                localMountPath: volume.path
              },
              layers: args.layers,
              tags: args.tags,
              publish: output11(args.versioning).apply((v) => v ?? false),
              reservedConcurrentExecutions: concurrency?.reserved,
              ...isContainer2 ? {
                packageType: "Image",
                imageUri: imageAsset2.ref.apply(
                  (ref) => ref?.replace(":latest", "")
                ),
                imageConfig: {
                  commands: [
                    all11([handler, runtime5]).apply(([handler2, runtime6]) => {
                      if (isContainer2 && runtime6.includes("python")) {
                        return handler2.replace(/\.\//g, "").replace(/\//g, ".");
                      }
                      return handler2;
                    })
                  ]
                }
              } : {
                packageType: "Zip",
                s3Bucket: zipAsset2.bucket,
                s3Key: zipAsset2.key,
                handler: unsecret(handler),
                runtime: runtime5.apply(
                  (v) => v === "go" || v === "rust" ? "provided.al2023" : v
                )
              }
            },
            { parent }
          );
          return new lambda.Function(
            transformed[0],
            {
              ...transformed[1],
              ...dev2 ? {
                description: transformed[1].description ? output11(transformed[1].description).apply(
                  (v) => `${v.substring(0, 240)} (live)`
                ) : "live",
                runtime: "provided.al2023",
                architectures: ["x86_64"]
              } : {}
            },
            transformed[2]
          );
        }
      );
    }
    function createUrl() {
      return url.apply((url2) => {
        if (url2 === void 0) return output11(void 0);
        const fnUrl = new lambda.FunctionUrl(
          `${name}Url`,
          {
            functionName: fn.name,
            authorizationType: url2.authorization === "iam" ? "AWS_IAM" : "NONE",
            invokeMode: streaming.apply(
              (streaming2) => streaming2 ? "RESPONSE_STREAM" : "BUFFERED"
            ),
            cors: url2.cors
          },
          { parent }
        );
        if (!url2.route) return fnUrl.functionUrl;
        const routeNamespace = crypto4.createHash("md5").update(`${define_app_default.name}-${define_app_default.stage}-${name}`).digest("hex").substring(0, 4);
        new KvKeys(
          `${name}RouteKey`,
          {
            store: url2.route.routerKvStoreArn,
            namespace: routeNamespace,
            entries: fnUrl.functionUrl.apply((fnUrl2) => ({
              metadata: JSON.stringify({
                host: new URL(fnUrl2).host
              })
            })),
            purge: false
          },
          { parent }
        );
        new KvRoutesUpdate(
          `${name}RoutesUpdate`,
          {
            store: url2.route.routerKvStoreArn,
            namespace: url2.route.routerKvNamespace,
            key: "routes",
            entry: url2.route.apply(
              (route) => ["url", routeNamespace, route.hostPattern, route.pathPrefix].join(
                ","
              )
            )
          },
          { parent }
        );
        return url2.route.routerUrl;
      });
    }
    function createProvisioned() {
      return all11([args.concurrency, fn.publish]).apply(
        ([concurrency, publish]) => {
          if (!concurrency?.provisioned || concurrency.provisioned === 0) {
            return;
          }
          if (publish !== true) {
            throw new VisibleError(
              `Provisioned concurrency requires function versioning. Set "versioning: true" to enable function versioning.`
            );
          }
          return new lambda.ProvisionedConcurrencyConfig(
            `${name}Provisioned`,
            {
              functionName: fn.name,
              qualifier: fn.version,
              provisionedConcurrentExecutions: concurrency.provisioned
            },
            { parent }
          );
        }
      );
    }
    function createEventInvokeConfig() {
      if (args.retries === void 0) {
        return void 0;
      }
      return new lambda.FunctionEventInvokeConfig(
        ...transform(
          args.transform?.eventInvokeConfig,
          `${name}EventInvokeConfig`,
          {
            functionName: fn.name,
            maximumRetryAttempts: args.retries
          },
          { parent }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The IAM Role the function will use.
       */
      role: this.role,
      /**
       * The AWS Lambda function.
       */
      function: this.function,
      /**
       * The CloudWatch Log Group the function logs are stored.
       */
      logGroup: this.logGroup,
      /**
       * The Function Event Invoke Config resource if retries are configured.
       */
      eventInvokeConfig: this.eventInvokeConfig
    };
  }
  /**
   * The Lambda function URL if `url` is enabled.
   */
  get url() {
    return this.urlEndpoint.apply((url) => {
      if (!url) {
        throw new VisibleError(
          `Function URL is not enabled. Enable it with "url: true".`
        );
      }
      return url;
    });
  }
  /**
   * The name of the Lambda function.
   */
  get name() {
    return this.function.name;
  }
  /**
   * The ARN of the Lambda function.
   */
  get arn() {
    return this.function.arn;
  }
  /**
   * Add environment variables lazily to the function after the function is created.
   *
   * This is useful for adding environment variables that are only available after the
   * function is created, like the function URL.
   *
   * @param environment The environment variables to add to the function.
   *
   * @example
   * Add the function URL as an environment variable.
   *
   * ```ts title="sst.config.ts"
   * const fn = new sst.aws.Function("MyFunction", {
   *   handler: "src/handler.handler",
   *   url: true,
   * });
   *
   * fn.addEnvironment({
   *   URL: fn.url,
   * });
   * ```
   */
  addEnvironment(environment) {
    return new FunctionEnvironmentUpdate(
      `${this.constructorName}EnvironmentUpdate`,
      {
        functionName: this.name,
        environment,
        region: getRegionOutput(void 0, { parent: this }).name
      },
      { parent: this }
    );
  }
  /** @internal */
  static fromDefinition(name, definition, override, argsTransform, opts) {
    return output11(definition).apply((definition2) => {
      if (typeof definition2 === "string") {
        return new _Function(
          ...transform(
            argsTransform,
            name,
            { handler: definition2, ...override },
            opts || {}
          )
        );
      } else if (definition2.handler) {
        return new _Function(
          ...transform(
            argsTransform,
            name,
            {
              ...definition2,
              ...override,
              permissions: all11([
                definition2.permissions,
                override?.permissions
              ]).apply(([permissions, overridePermissions]) => [
                ...permissions ?? [],
                ...overridePermissions ?? []
              ])
            },
            opts || {}
          )
        );
      }
      throw new Error(`Invalid function definition for the "${name}" Function`);
    });
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        name: this.name,
        url: this.urlEndpoint
      },
      include: [
        permission({
          actions: ["lambda:InvokeFunction"],
          resources: [this.function.arn]
        })
      ]
    };
  }
};
var __pulumiType8 = "sst:aws:Function";
Function.__pulumiType = __pulumiType8;

// .sst/platform/src/components/aws/helpers/function-builder.ts
function functionBuilder(name, definition, defaultArgs, argsTransform, opts) {
  return output12(definition).apply((definition2) => {
    if (typeof definition2 === "string") {
      if (definition2.startsWith("arn:")) {
        const parts = definition2.split(":");
        return {
          getFunction: () => {
            throw new VisibleError(
              "Cannot access the created function because it is referenced as an ARN."
            );
          },
          arn: output12(definition2),
          invokeArn: output12(
            `arn:${parts[1]}:apigateway:${parts[3]}:lambda:path/2015-03-31/functions/${definition2}/invocations`
          )
        };
      }
      const fn = new Function(
        ...transform(
          argsTransform,
          name,
          { handler: definition2, ...defaultArgs },
          opts || {}
        )
      );
      return {
        getFunction: () => fn,
        arn: fn.arn,
        invokeArn: fn.nodes.function.invokeArn
      };
    } else if (definition2.handler) {
      const fn = new Function(
        ...transform(
          argsTransform,
          name,
          {
            ...defaultArgs,
            ...definition2,
            link: all12([defaultArgs?.link, definition2.link]).apply(
              ([defaultLink, link]) => [
                ...defaultLink ?? [],
                ...link ?? []
              ]
            ),
            environment: all12([
              defaultArgs?.environment,
              definition2.environment
            ]).apply(([defaultEnvironment, environment]) => ({
              ...defaultEnvironment ?? {},
              ...environment ?? {}
            })),
            permissions: all12([
              defaultArgs?.permissions,
              definition2.permissions
            ]).apply(([defaultPermissions, permissions]) => [
              ...defaultPermissions ?? [],
              ...permissions ?? []
            ])
          },
          opts || {}
        )
      );
      return {
        getFunction: () => fn,
        arn: fn.arn,
        invokeArn: fn.nodes.function.invokeArn
      };
    }
    throw new Error(`Invalid function definition for the "${name}" Function`);
  });
}

// .sst/platform/src/components/aws/bucket-lambda-subscriber.ts
var BucketLambdaSubscriber = class extends Component {
  fn;
  permission;
  notification;
  constructor(name, args, opts) {
    super(__pulumiType9, name, args, opts);
    const self = this;
    const bucket = output13(args.bucket);
    const events = args.events ? output13(args.events) : output13([
      "s3:ObjectCreated:*",
      "s3:ObjectRemoved:*",
      "s3:ObjectRestore:*",
      "s3:ReducedRedundancyLostObject",
      "s3:Replication:*",
      "s3:LifecycleExpiration:*",
      "s3:LifecycleTransition",
      "s3:IntelligentTiering",
      "s3:ObjectTagging:*",
      "s3:ObjectAcl:Put"
    ]);
    const fn = createFunction();
    const permission2 = createPermission();
    const notification = createNotification();
    this.fn = fn;
    this.permission = permission2;
    this.notification = notification;
    function createFunction() {
      return functionBuilder(
        `${name}Function`,
        args.subscriber,
        {
          description: events.apply(
            (events2) => events2.length < 5 ? `Subscribed to ${name} on ${events2.join(", ")}` : `Subscribed to ${name} on ${events2.slice(0, 3).join(", ")}, and ${events2.length - 3} more events`
          )
        },
        void 0,
        { parent: self }
      );
    }
    function createPermission() {
      return new lambda2.Permission(
        `${name}Permission`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn,
          principal: "s3.amazonaws.com",
          sourceArn: bucket.arn
        },
        { parent: self }
      );
    }
    function createNotification() {
      return new s32.BucketNotification(
        ...transform(
          args.transform?.notification,
          `${name}Notification`,
          {
            bucket: bucket.name,
            lambdaFunctions: [
              {
                id: interpolate5`Notification${args.subscriberId}`,
                lambdaFunctionArn: fn.arn,
                events,
                filterPrefix: args.filterPrefix,
                filterSuffix: args.filterSuffix
              }
            ]
          },
          { parent: self, dependsOn: [permission2] }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function that'll be notified.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda permission.
       */
      permission: this.permission,
      /**
       * The S3 bucket notification.
       */
      notification: this.notification
    };
  }
};
var __pulumiType9 = "sst:aws:BucketLambdaSubscriber";
BucketLambdaSubscriber.__pulumiType = __pulumiType9;

// .sst/platform/src/components/aws/bucket.ts
import { iam as iam6, s3 as s36 } from "@pulumi/aws";

// .sst/platform/src/components/aws/bucket-queue-subscriber.ts
import {
  interpolate as interpolate6,
  output as output16
} from "@pulumi/pulumi";
import { s3 as s33 } from "@pulumi/aws";

// .sst/platform/src/components/aws/queue.ts
import {
  output as output15,
  jsonStringify as jsonStringify3
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/queue-lambda-subscriber.ts
import {
  output as output14
} from "@pulumi/pulumi";
import { lambda as lambda3 } from "@pulumi/aws";
var QueueLambdaSubscriber = class extends Component {
  fn;
  eventSourceMapping;
  constructor(name, args, opts) {
    super(__pulumiType10, name, args, opts);
    const self = this;
    const queue = output14(args.queue);
    const fn = createFunction();
    const eventSourceMapping = createEventSourceMapping();
    this.fn = fn;
    this.eventSourceMapping = eventSourceMapping;
    function createFunction() {
      return functionBuilder(
        `${name}Function`,
        args.subscriber,
        {
          description: `Subscribed to ${name}`,
          permissions: [
            {
              actions: [
                "sqs:ChangeMessageVisibility",
                "sqs:DeleteMessage",
                "sqs:GetQueueAttributes",
                "sqs:GetQueueUrl",
                "sqs:ReceiveMessage"
              ],
              resources: [queue.arn]
            }
          ]
        },
        void 0,
        { parent: self }
      );
    }
    function createEventSourceMapping() {
      return new lambda3.EventSourceMapping(
        ...transform(
          args.transform?.eventSourceMapping,
          `${name}EventSourceMapping`,
          {
            functionResponseTypes: output14(args.batch).apply(
              (batch) => batch?.partialResponses ? ["ReportBatchItemFailures"] : []
            ),
            batchSize: output14(args.batch).apply((batch) => batch?.size ?? 10),
            maximumBatchingWindowInSeconds: output14(args.batch).apply(
              (batch) => batch?.window ? toSeconds(batch.window) : 0
            ),
            eventSourceArn: queue.arn,
            functionName: fn.arn.apply(
              (arn) => parseFunctionArn(arn).functionName
            ),
            filterCriteria: args.filters && {
              filters: output14(args.filters).apply(
                (filters) => filters.map((filter) => ({
                  pattern: JSON.stringify(filter)
                }))
              )
            }
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function that'll be notified.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda event source mapping.
       */
      eventSourceMapping: this.eventSourceMapping
    };
  }
};
var __pulumiType10 = "sst:aws:QueueLambdaSubscriber";
QueueLambdaSubscriber.__pulumiType = __pulumiType10;

// .sst/platform/src/components/aws/queue.ts
import { iam as iam3, sqs } from "@pulumi/aws";
var Queue = class _Queue extends Component {
  constructorName;
  constructorOpts;
  queue;
  isSubscribed = false;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType11, name, args, opts);
    const self = this;
    this.constructorName = name;
    this.constructorOpts = opts;
    if (args && "ref" in args) {
      const ref = reference();
      this.queue = ref.queue;
      return;
    }
    const fifo = normalizeFifo();
    const dlq = normalizeDlq();
    const visibilityTimeout = output15(args?.visibilityTimeout ?? "30 seconds");
    const delay = output15(args?.delay ?? "0 seconds");
    this.queue = createQueue();
    function reference() {
      const ref = args;
      const queue = sqs.Queue.get(`${name}Queue`, ref.queueUrl, void 0, {
        parent: self
      });
      return { queue };
    }
    function normalizeFifo() {
      return output15(args?.fifo).apply((v) => {
        if (!v) return false;
        if (v === true)
          return {
            contentBasedDeduplication: false
          };
        return {
          contentBasedDeduplication: v.contentBasedDeduplication ?? false
        };
      });
    }
    function normalizeDlq() {
      if (args?.dlq === void 0) return;
      return output15(args?.dlq).apply(
        (v) => typeof v === "string" ? { queue: v, retry: 3 } : v
      );
    }
    function createQueue() {
      return new sqs.Queue(
        ...transform(
          args?.transform?.queue,
          `${name}Queue`,
          {
            fifoQueue: fifo.apply((v) => v !== false),
            contentBasedDeduplication: fifo.apply(
              (v) => v === false ? false : v.contentBasedDeduplication
            ),
            visibilityTimeoutSeconds: visibilityTimeout.apply(
              (v) => toSeconds(v)
            ),
            delaySeconds: delay.apply((v) => toSeconds(v)),
            redrivePolicy: dlq && jsonStringify3({
              deadLetterTargetArn: dlq.queue,
              maxReceiveCount: dlq.retry
            })
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The ARN of the SQS Queue.
   */
  get arn() {
    return this.queue.arn;
  }
  /**
   * The SQS Queue URL.
   */
  get url() {
    return this.queue.url;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon SQS Queue.
       */
      queue: this.queue
    };
  }
  /**
   * Subscribe to this queue.
   *
   * @param subscriber The function that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * ```js title="sst.config.ts"
   * queue.subscribe("src/subscriber.handler");
   * ```
   *
   * Add a filter to the subscription.
   *
   * ```js title="sst.config.ts"
   * queue.subscribe("src/subscriber.handler", {
   *   filters: [
   *     {
   *       body: {
   *         RequestCode: ["BBBB"]
   *       }
   *     }
   *   ]
   * });
   * ```
   *
   * Customize the subscriber function.
   *
   * ```js title="sst.config.ts"
   * queue.subscribe({
   *   handler: "src/subscriber.handler",
   *   timeout: "60 seconds"
   * });
   * ```
   *
   * Or pass in the ARN of an existing Lambda function.
   *
   * ```js title="sst.config.ts"
   * queue.subscribe("arn:aws:lambda:us-east-1:123456789012:function:my-function");
   * ```
   */
  subscribe(subscriber, args, opts) {
    if (this.isSubscribed)
      throw new VisibleError(
        `Cannot subscribe to the "${this.constructorName}" queue multiple times. An SQS Queue can only have one subscriber.`
      );
    this.isSubscribed = true;
    return _Queue._subscribeFunction(
      this.constructorName,
      this.arn,
      subscriber,
      args,
      { ...opts, provider: this.constructorOpts.provider }
    );
  }
  /**
   * Subscribe to an SQS Queue that was not created in your app.
   *
   * @param queueArn The ARN of the SQS Queue to subscribe to.
   * @param subscriber The function that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have an existing SQS Queue with the following ARN.
   *
   * ```js title="sst.config.ts"
   * const queueArn = "arn:aws:sqs:us-east-1:123456789012:MyQueue";
   * ```
   *
   * You can subscribe to it by passing in the ARN.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Queue.subscribe(queueArn, "src/subscriber.handler");
   * ```
   *
   * Add a filter to the subscription.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Queue.subscribe(queueArn, "src/subscriber.handler", {
   *   filters: [
   *     {
   *       body: {
   *         RequestCode: ["BBBB"]
   *       }
   *     }
   *   ]
   * });
   * ```
   *
   * Customize the subscriber function.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Queue.subscribe(queueArn, {
   *   handler: "src/subscriber.handler",
   *   timeout: "60 seconds"
   * });
   * ```
   */
  static subscribe(queueArn, subscriber, args, opts) {
    return output15(queueArn).apply(
      (queueArn2) => this._subscribeFunction(
        logicalName(parseQueueArn(queueArn2).queueName),
        queueArn2,
        subscriber,
        args,
        opts
      )
    );
  }
  static _subscribeFunction(name, queueArn, subscriber, args = {}, opts) {
    return output15(queueArn).apply((queueArn2) => {
      const suffix = logicalName(hashStringToPrettyString(queueArn2, 6));
      return new QueueLambdaSubscriber(
        `${name}Subscriber${suffix}`,
        {
          queue: { arn: queueArn2 },
          subscriber,
          ...args
        },
        opts
      );
    });
  }
  /**
   * Reference an existing SQS Queue with its queue URL. This is useful when you create a
   * queue in one stage and want to share it in another stage. It avoids having to create
   * a new queue in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share SQS queues across stages.
   * :::
   *
   * @param name The name of the component.
   * @param queueUrl The URL of the existing SQS Queue.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a queue in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new queue, you want to share the queue from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const queue = $app.stage === "frank"
   *   ? sst.aws.Queue.get("MyQueue", "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue")
   *   : new sst.aws.Queue("MyQueue");
   * ```
   *
   * Here `https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue` is the URL of the queue
   * created in the `dev` stage. You can find this by outputting the queue URL in the `dev`
   * stage.
   *
   * ```ts title="sst.config.ts"
   * return queue.url;
   * ```
   */
  static get(name, queueUrl, opts) {
    return new _Queue(
      name,
      {
        ref: true,
        queueUrl
      },
      opts
    );
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url
      },
      include: [
        permission({
          actions: ["sqs:*"],
          resources: [this.arn]
        })
      ]
    };
  }
  /** @internal */
  static createPolicy(name, arn, opts) {
    return new sqs.QueuePolicy(
      name,
      {
        queueUrl: arn.apply((arn2) => parseQueueArn(arn2).queueUrl),
        policy: iam3.getPolicyDocumentOutput({
          statements: [
            {
              actions: ["sqs:SendMessage"],
              resources: [arn],
              principals: [
                {
                  type: "Service",
                  identifiers: [
                    "sns.amazonaws.com",
                    "s3.amazonaws.com",
                    "events.amazonaws.com"
                  ]
                }
              ]
            }
          ]
        }).json
      },
      {
        retainOnDelete: true,
        ...opts
      }
    );
  }
};
var __pulumiType11 = "sst:aws:Queue";
Queue.__pulumiType = __pulumiType11;

// .sst/platform/src/components/aws/bucket-queue-subscriber.ts
var BucketQueueSubscriber = class extends Component {
  policy;
  notification;
  constructor(name, args, opts) {
    super(__pulumiType12, name, args, opts);
    const self = this;
    const queueArn = output16(args.queue);
    const bucket = output16(args.bucket);
    const events = args.events ? output16(args.events) : output16([
      "s3:ObjectCreated:*",
      "s3:ObjectRemoved:*",
      "s3:ObjectRestore:*",
      "s3:ReducedRedundancyLostObject",
      "s3:Replication:*",
      "s3:LifecycleExpiration:*",
      "s3:LifecycleTransition",
      "s3:IntelligentTiering",
      "s3:ObjectTagging:*",
      "s3:ObjectAcl:Put"
    ]);
    const policy = createPolicy();
    const notification = createNotification();
    this.policy = policy;
    this.notification = notification;
    function createPolicy() {
      return Queue.createPolicy(`${name}Policy`, queueArn);
    }
    function createNotification() {
      return new s33.BucketNotification(
        ...transform(
          args.transform?.notification,
          `${name}Notification`,
          {
            bucket: bucket.name,
            queues: [
              {
                id: interpolate6`Notification${args.subscriberId}`,
                queueArn,
                events,
                filterPrefix: args.filterPrefix,
                filterSuffix: args.filterSuffix
              }
            ]
          },
          { parent: self, dependsOn: [policy] }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The SQS Queue policy.
       */
      policy: this.policy,
      /**
       * The S3 Bucket notification.
       */
      notification: this.notification
    };
  }
};
var __pulumiType12 = "sst:aws:BucketQueueSubscriber";
BucketQueueSubscriber.__pulumiType = __pulumiType12;

// .sst/platform/src/components/aws/bucket-topic-subscriber.ts
import {
  interpolate as interpolate7,
  output as output17
} from "@pulumi/pulumi";
import { iam as iam4, s3 as s34, sns } from "@pulumi/aws";
var BucketTopicSubscriber = class extends Component {
  policy;
  notification;
  constructor(name, args, opts) {
    super(__pulumiType13, name, args, opts);
    const self = this;
    const topicArn = output17(args.topic);
    const bucket = output17(args.bucket);
    const events = args.events ? output17(args.events) : output17([
      "s3:ObjectCreated:*",
      "s3:ObjectRemoved:*",
      "s3:ObjectRestore:*",
      "s3:ReducedRedundancyLostObject",
      "s3:Replication:*",
      "s3:LifecycleExpiration:*",
      "s3:LifecycleTransition",
      "s3:IntelligentTiering",
      "s3:ObjectTagging:*",
      "s3:ObjectAcl:Put"
    ]);
    const policy = createPolicy();
    const notification = createNotification();
    this.policy = policy;
    this.notification = notification;
    function createPolicy() {
      return new sns.TopicPolicy(`${name}Policy`, {
        arn: topicArn,
        policy: iam4.getPolicyDocumentOutput({
          statements: [
            {
              actions: ["sns:Publish"],
              resources: [topicArn],
              principals: [
                {
                  type: "Service",
                  identifiers: ["s3.amazonaws.com"]
                }
              ],
              conditions: [
                {
                  test: "ArnEquals",
                  variable: "aws:SourceArn",
                  values: [bucket.arn]
                }
              ]
            }
          ]
        }).json
      });
    }
    function createNotification() {
      return new s34.BucketNotification(
        ...transform(
          args.transform?.notification,
          `${name}Notification`,
          {
            bucket: bucket.name,
            topics: [
              {
                id: interpolate7`Notification${args.subscriberId}`,
                topicArn,
                events,
                filterPrefix: args.filterPrefix,
                filterSuffix: args.filterSuffix
              }
            ]
          },
          { parent: self, dependsOn: [policy] }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The SNS Topic policy.
       */
      policy: this.policy,
      /**
       * The S3 Bucket notification.
       */
      notification: this.notification
    };
  }
};
var __pulumiType13 = "sst:aws:BucketTopicSubscriber";
BucketTopicSubscriber.__pulumiType = __pulumiType13;

// .sst/platform/src/components/aws/bucket-notification.ts
import {
  output as output22
} from "@pulumi/pulumi";
import { iam as iam5, lambda as lambda6, s3 as s35, sns as sns5 } from "@pulumi/aws";

// .sst/platform/src/components/aws/sns-topic.ts
import { all as all14, output as output21 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/sns-topic-lambda-subscriber.ts
import {
  jsonStringify as jsonStringify4,
  output as output18
} from "@pulumi/pulumi";
import { lambda as lambda5, sns as sns2 } from "@pulumi/aws";
var SnsTopicLambdaSubscriber = class extends Component {
  fn;
  permission;
  subscription;
  constructor(name, args, opts) {
    super(__pulumiType14, name, args, opts);
    const self = this;
    const topic = output18(args.topic);
    const fn = createFunction();
    const permission2 = createPermission();
    const subscription = createSubscription();
    this.fn = fn;
    this.permission = permission2;
    this.subscription = subscription;
    function createFunction() {
      return functionBuilder(
        `${name}Function`,
        args.subscriber,
        {
          description: `Subscribed to ${name}`
        },
        void 0,
        { parent: self }
      );
    }
    function createPermission() {
      return new lambda5.Permission(
        `${name}Permission`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn,
          principal: "sns.amazonaws.com",
          sourceArn: topic.arn
        },
        { parent: self }
      );
    }
    function createSubscription() {
      return new sns2.TopicSubscription(
        ...transform(
          args?.transform?.subscription,
          `${name}Subscription`,
          {
            topic: topic.arn,
            protocol: "lambda",
            endpoint: fn.arn,
            filterPolicy: args.filter && jsonStringify4(args.filter)
          },
          { parent: self, dependsOn: [permission2] }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function that'll be notified.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda permission.
       */
      permission: this.permission,
      /**
       * The SNS Topic subscription.
       */
      subscription: this.subscription
    };
  }
};
var __pulumiType14 = "sst:aws:SnsTopicLambdaSubscriber";
SnsTopicLambdaSubscriber.__pulumiType = __pulumiType14;

// .sst/platform/src/components/aws/sns-topic-queue-subscriber.ts
import {
  jsonStringify as jsonStringify5,
  output as output19
} from "@pulumi/pulumi";
import { sns as sns3 } from "@pulumi/aws";
var SnsTopicQueueSubscriber = class extends Component {
  policy;
  subscription;
  constructor(name, args, opts) {
    super(__pulumiType15, name, args, opts);
    const self = this;
    const topic = output19(args.topic);
    const queueArn = output19(args.queue).apply(
      (queue) => queue instanceof Queue ? queue.arn : output19(queue)
    );
    const policy = createPolicy();
    const subscription = createSubscription();
    this.policy = policy;
    this.subscription = subscription;
    function createPolicy() {
      return Queue.createPolicy(`${name}Policy`, queueArn, {
        parent: args.disableParent ? void 0 : self
      });
    }
    function createSubscription() {
      return new sns3.TopicSubscription(
        ...transform(
          args?.transform?.subscription,
          `${name}Subscription`,
          {
            topic: topic.arn,
            protocol: "sqs",
            endpoint: queueArn,
            filterPolicy: args.filter && jsonStringify5(args.filter)
          },
          { parent: args.disableParent ? void 0 : self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The SQS Queue policy.
       */
      policy: this.policy,
      /**
       * The SNS Topic subscription.
       */
      subscription: this.subscription
    };
  }
};
var __pulumiType15 = "sst:aws:SnsTopicQueueSubscriber";
SnsTopicQueueSubscriber.__pulumiType = __pulumiType15;

// .sst/platform/src/components/aws/sns-topic.ts
import { sns as sns4 } from "@pulumi/aws";

// .sst/platform/src/components/aws/helpers/subscriber.ts
import { output as output20 } from "@pulumi/pulumi";
function isFunctionSubscriber(subscriber) {
  if (!subscriber) return output20(false);
  return output20(subscriber).apply(
    (subscriber2) => typeof subscriber2 === "string" || typeof subscriber2.handler === "string"
  );
}
function isQueueSubscriber(subscriber) {
  if (!subscriber) return output20(false);
  return output20(subscriber).apply(
    (subscriber2) => typeof subscriber2 === "string" || subscriber2 instanceof Queue
  );
}

// .sst/platform/src/components/aws/sns-topic.ts
var SnsTopic = class _SnsTopic extends Component {
  constructorName;
  constructorOpts;
  topic;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType16, name, args, opts);
    const self = this;
    this.constructorName = name;
    this.constructorOpts = opts;
    if (args && "ref" in args) {
      const ref = reference();
      this.topic = ref.topic;
      return;
    }
    const fifo = normalizeFifo();
    this.topic = createTopic();
    function reference() {
      const ref = args;
      const topic = sns4.Topic.get(`${name}Topic`, ref.topicArn, void 0, {
        parent: self
      });
      return { topic };
    }
    function normalizeFifo() {
      return output21(args.fifo).apply((v) => v ?? false);
    }
    function createTopic() {
      return new sns4.Topic(
        ...transform(
          args.transform?.topic,
          `${name}Topic`,
          {
            fifoTopic: fifo
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The ARN of the SNS Topic.
   */
  get arn() {
    return this.topic.arn;
  }
  /**
   * The name of the SNS Topic.
   */
  get name() {
    return this.topic.name;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon SNS Topic.
       */
      topic: this.topic
    };
  }
  subscribe(nameOrSubscriber, subscriberOrArgs, args) {
    return isFunctionSubscriber(subscriberOrArgs).apply(
      (v) => v ? _SnsTopic._subscribeFunction(
        nameOrSubscriber,
        // name
        this.constructorName,
        this.arn,
        subscriberOrArgs,
        // subscriber
        args,
        { provider: this.constructorOpts.provider }
      ) : _SnsTopic._subscribeFunctionV1(
        this.constructorName,
        this.arn,
        nameOrSubscriber,
        // subscriber
        subscriberOrArgs,
        // args
        { provider: this.constructorOpts.provider }
      )
    );
  }
  static subscribe(nameOrTopicArn, topicArnOrSubscriber, subscriberOrArgs, args) {
    return isFunctionSubscriber(subscriberOrArgs).apply(
      (v) => v ? output21(topicArnOrSubscriber).apply(
        (topicArn) => this._subscribeFunction(
          nameOrTopicArn,
          // name
          logicalName(parseTopicArn(topicArn).topicName),
          topicArn,
          subscriberOrArgs,
          // subscriber
          args
        )
      ) : output21(nameOrTopicArn).apply(
        (topicArn) => this._subscribeFunctionV1(
          logicalName(parseTopicArn(topicArn).topicName),
          topicArn,
          topicArnOrSubscriber,
          // subscriber
          subscriberOrArgs
          // args
        )
      )
    );
  }
  static _subscribeFunction(subscriberName, name, topicArn, subscriber, args = {}, opts = {}) {
    return output21(args).apply(
      (args2) => new SnsTopicLambdaSubscriber(
        `${name}Subscriber${subscriberName}`,
        {
          topic: { arn: topicArn },
          subscriber,
          ...args2
        },
        opts
      )
    );
  }
  static _subscribeFunctionV1(name, topicArn, subscriber, args = {}, opts = {}) {
    return all14([subscriber, args]).apply(([subscriber2, args2]) => {
      const suffix = logicalName(
        hashStringToPrettyString(
          [
            typeof topicArn === "string" ? topicArn : outputId,
            JSON.stringify(args2.filter ?? {}),
            typeof subscriber2 === "string" ? subscriber2 : subscriber2.handler
          ].join(""),
          6
        )
      );
      return new SnsTopicLambdaSubscriber(
        `${name}Subscriber${suffix}`,
        {
          topic: { arn: topicArn },
          subscriber: subscriber2,
          ...args2
        },
        opts
      );
    });
  }
  subscribeQueue(nameOrQueue, queueOrArgs, args) {
    return isQueueSubscriber(queueOrArgs).apply(
      (v) => v ? _SnsTopic._subscribeQueue(
        nameOrQueue,
        // name
        this.constructorName,
        this.arn,
        queueOrArgs,
        // queue
        args
      ) : _SnsTopic._subscribeQueueV1(
        this.constructorName,
        this.arn,
        nameOrQueue,
        // queue
        queueOrArgs
        // args
      )
    );
  }
  static subscribeQueue(nameOrTopicArn, topicArnOrQueue, queueOrArgs, args) {
    return isQueueSubscriber(queueOrArgs).apply(
      (v) => v ? output21(topicArnOrQueue).apply(
        (topicArn) => this._subscribeQueue(
          nameOrTopicArn,
          // name
          logicalName(parseTopicArn(topicArn).topicName),
          topicArn,
          queueOrArgs,
          // queue
          args
        )
      ) : output21(nameOrTopicArn).apply(
        (topicArn) => this._subscribeQueueV1(
          logicalName(parseTopicArn(topicArn).topicName),
          topicArn,
          topicArnOrQueue,
          // queue
          queueOrArgs
          // args
        )
      )
    );
  }
  static _subscribeQueue(subscriberName, name, topicArn, queue, args = {}) {
    return output21(args).apply(
      (args2) => new SnsTopicQueueSubscriber(`${name}Subscriber${subscriberName}`, {
        topic: { arn: topicArn },
        queue,
        ...args2
      })
    );
  }
  static _subscribeQueueV1(name, topicArn, queueArn, args = {}) {
    return all14([queueArn, args]).apply(([queueArn2, args2]) => {
      const suffix = logicalName(
        hashStringToPrettyString(
          [
            typeof topicArn === "string" ? topicArn : outputId,
            JSON.stringify(args2.filter ?? {}),
            queueArn2
          ].join(""),
          6
        )
      );
      return new SnsTopicQueueSubscriber(`${name}Subscriber${suffix}`, {
        topic: { arn: topicArn },
        queue: queueArn2,
        disableParent: true,
        ...args2
      });
    });
  }
  /**
   * Reference an existing SNS topic with its topic ARN. This is useful when you create a
   * topic in one stage and want to share it in another stage. It avoids having to create
   * a new topic in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share SNS topics across stages.
   * :::
   *
   * @param name The name of the component.
   * @param topicArn The ARN of the existing SNS Topic.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a topic in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new topic, you want to share the topic from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const topic = $app.stage === "frank"
   *   ? sst.aws.SnsTopic.get("MyTopic", "arn:aws:sns:us-east-1:123456789012:MyTopic")
   *   : new sst.aws.SnsTopic("MyTopic");
   * ```
   *
   * Here `arn:aws:sns:us-east-1:123456789012:MyTopic` is the ARN of the topic created in
   * the `dev` stage. You can find this by outputting the topic ARN in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return topic.arn;
   * ```
   */
  static get(name, topicArn, opts) {
    return new _SnsTopic(
      name,
      {
        ref: true,
        topicArn
      },
      opts
    );
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        arn: this.arn
      },
      include: [
        permission({
          actions: ["sns:*"],
          resources: [this.arn]
        })
      ]
    };
  }
};
var __pulumiType16 = "sst:aws:SnsTopic";
SnsTopic.__pulumiType = __pulumiType16;

// .sst/platform/src/components/aws/bucket-notification.ts
var BucketNotification = class extends Component {
  functionBuilders;
  notification;
  constructor(name, args, opts) {
    super(__pulumiType17, name, args, opts);
    const self = this;
    const bucket = output22(args.bucket);
    const notifications = normalizeNotifications();
    const { config, functionBuilders } = createNotificationsConfig();
    const notification = createNotification();
    this.functionBuilders = functionBuilders;
    this.notification = notification;
    function normalizeNotifications() {
      return output22(args.notifications).apply(
        (notifications2) => notifications2.map((n) => {
          const count = (n.function ? 1 : 0) + (n.queue ? 1 : 0) + (n.topic ? 1 : 0);
          if (count === 0)
            throw new VisibleError(
              `At least one of function, queue, or topic is required for the "${n.name}" bucket notification.`
            );
          if (count > 1)
            throw new VisibleError(
              `Only one of function, queue, or topic is allowed for the "${n.name}" bucket notification.`
            );
          return {
            ...n,
            events: n.events ?? [
              "s3:ObjectCreated:*",
              "s3:ObjectRemoved:*",
              "s3:ObjectRestore:*",
              "s3:ReducedRedundancyLostObject",
              "s3:Replication:*",
              "s3:LifecycleExpiration:*",
              "s3:LifecycleTransition",
              "s3:IntelligentTiering",
              "s3:ObjectTagging:*",
              "s3:ObjectAcl:Put"
            ]
          };
        })
      );
    }
    function createNotificationsConfig() {
      return notifications.apply((notifications2) => {
        const config2 = notifications2.map((n) => {
          if (n.function) {
            const fn = functionBuilder(
              `${name}Notification${n.name}`,
              n.function,
              {
                description: n.events.length < 5 ? `Notified by ${name} on ${n.events.join(", ")}` : `Notified by ${name} on ${n.events.slice(0, 3).join(", ")}, and ${n.events.length - 3} more events`
              },
              void 0,
              { parent: self }
            );
            const permission2 = new lambda6.Permission(
              `${name}Notification${n.name}Permission`,
              {
                action: "lambda:InvokeFunction",
                function: fn.arn,
                principal: "s3.amazonaws.com",
                sourceArn: bucket.arn
              },
              { parent: self }
            );
            return { args: n, functionBuilder: fn, dependsOn: permission2 };
          }
          if (n.topic) {
            const arn = n.topic instanceof SnsTopic ? n.topic.arn : output22(n.topic);
            const policy = new sns5.TopicPolicy(
              `${name}Notification${n.name}Policy`,
              {
                arn,
                policy: iam5.getPolicyDocumentOutput({
                  statements: [
                    {
                      actions: ["sns:Publish"],
                      resources: [arn],
                      principals: [
                        {
                          type: "Service",
                          identifiers: ["s3.amazonaws.com"]
                        }
                      ],
                      conditions: [
                        {
                          test: "ArnEquals",
                          variable: "aws:SourceArn",
                          values: [bucket.arn]
                        }
                      ]
                    }
                  ]
                }).json
              },
              { parent: self }
            );
            return { args: n, topicArn: arn, dependsOn: policy };
          }
          if (n.queue) {
            const arn = n.queue instanceof Queue ? n.queue.arn : output22(n.queue);
            const policy = Queue.createPolicy(
              `${name}Notification${n.name}Policy`,
              arn,
              { parent: self }
            );
            return { args: n, queueArn: arn, dependsOn: policy };
          }
        });
        return {
          config: config2,
          functionBuilders: config2.filter((c) => c.functionBuilder).map((c) => c.functionBuilder)
        };
      });
    }
    function createNotification() {
      return new s35.BucketNotification(
        ...transform(
          args.transform?.notification,
          `${name}Notification`,
          {
            bucket: bucket.name,
            lambdaFunctions: config.apply(
              (config2) => config2.filter((c) => c.functionBuilder).map((c) => ({
                id: c.args.name,
                lambdaFunctionArn: c.functionBuilder.arn,
                events: c.args.events,
                filterPrefix: c.args.filterPrefix,
                filterSuffix: c.args.filterSuffix
              }))
            ),
            queues: config.apply(
              (config2) => config2.filter((c) => c.queueArn).map((c) => ({
                id: c.args.name,
                queueArn: c.queueArn,
                events: c.args.events,
                filterPrefix: c.args.filterPrefix,
                filterSuffix: c.args.filterSuffix
              }))
            ),
            topics: config.apply(
              (config2) => config2.filter((c) => c.topicArn).map((c) => ({
                id: c.args.name,
                topicArn: c.topicArn,
                events: c.args.events,
                filterPrefix: c.args.filterPrefix,
                filterSuffix: c.args.filterSuffix
              }))
            )
          },
          {
            parent: self,
            dependsOn: config.apply(
              (config2) => config2.map((c) => c.dependsOn)
            )
          }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The functions that will be notified.
       */
      get functions() {
        return output22(self.functionBuilders).apply(
          (functionBuilders) => functionBuilders.map((builder) => builder.getFunction())
        );
      },
      /**
       * The notification resource that's created.
       */
      notification: this.notification
    };
  }
};
var __pulumiType17 = "sst:aws:BucketNotification";
BucketNotification.__pulumiType = __pulumiType17;

// .sst/platform/src/components/aws/bucket.ts
var Bucket = class _Bucket extends Component {
  constructorName;
  constructorOpts;
  isSubscribed = false;
  bucket;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType18, name, args, opts);
    this.constructorName = name;
    this.constructorOpts = opts;
    if (args && "ref" in args) {
      const ref = args;
      this.bucket = output23(ref.bucket);
      return;
    }
    const parent = this;
    const access = normalizeAccess();
    const enforceHttps = output23(args.enforceHttps ?? true);
    const policyArgs = normalizePolicy();
    const bucket = createBucket();
    createVersioning();
    const publicAccessBlock = createPublicAccess();
    const policy = createBucketPolicy();
    createCorsRule();
    this.bucket = policy.urn.apply(() => bucket);
    function normalizeAccess() {
      return all15([args.public, args.access]).apply(
        ([pub, access2]) => pub === true ? "public" : access2
      );
    }
    function normalizePolicy() {
      return output23(args.policy ?? []).apply(
        (policy2) => policy2.map((p) => ({
          ...p,
          effect: p.effect && p.effect.charAt(0).toUpperCase() + p.effect.slice(1),
          principals: p.principals === "*" ? [{ type: "*", identifiers: ["*"] }] : p.principals.map((i) => ({
            ...i,
            type: {
              aws: "AWS",
              service: "Service",
              federated: "Federated",
              canonical: "Canonical"
            }[i.type]
          })),
          paths: p.paths ? p.paths.map((path20) => path20.replace(/^\//, "")) : ["", "*"]
        }))
      );
    }
    function createBucket() {
      return new s36.BucketV2(
        ...transform(
          args.transform?.bucket,
          `${name}Bucket`,
          {
            forceDestroy: true
          },
          { parent }
        )
      );
    }
    function createVersioning() {
      return output23(args.versioning).apply((versioning) => {
        if (!versioning) return;
        return new s36.BucketVersioningV2(
          ...transform(
            args.transform?.versioning,
            `${name}Versioning`,
            {
              bucket: bucket.bucket,
              versioningConfiguration: {
                status: "Enabled"
              }
            },
            { parent }
          )
        );
      });
    }
    function createPublicAccess() {
      if (args.transform?.publicAccessBlock === false) return;
      return new s36.BucketPublicAccessBlock(
        ...transform(
          args.transform?.publicAccessBlock,
          `${name}PublicAccessBlock`,
          {
            bucket: bucket.bucket,
            blockPublicAcls: true,
            blockPublicPolicy: access.apply((v) => v !== "public"),
            ignorePublicAcls: true,
            restrictPublicBuckets: access.apply((v) => v !== "public")
          },
          { parent }
        )
      );
    }
    function createBucketPolicy() {
      return all15([access, enforceHttps, policyArgs]).apply(
        ([access2, enforceHttps2, policyArgs2]) => {
          const statements = [];
          if (access2) {
            statements.push({
              principals: [
                access2 === "public" ? { type: "*", identifiers: ["*"] } : {
                  type: "Service",
                  identifiers: ["cloudfront.amazonaws.com"]
                }
              ],
              actions: ["s3:GetObject"],
              resources: [interpolate8`${bucket.arn}/*`]
            });
          }
          if (enforceHttps2) {
            statements.push({
              effect: "Deny",
              principals: [{ type: "*", identifiers: ["*"] }],
              actions: ["s3:*"],
              resources: [bucket.arn, interpolate8`${bucket.arn}/*`],
              conditions: [
                {
                  test: "Bool",
                  variable: "aws:SecureTransport",
                  values: ["false"]
                }
              ]
            });
          }
          statements.push(
            ...policyArgs2.map((policy2) => ({
              effect: policy2.effect,
              principals: policy2.principals,
              actions: policy2.actions,
              conditions: policy2.conditions,
              resources: policy2.paths.map(
                (path20) => path20 === "" ? bucket.arn : interpolate8`${bucket.arn}/${path20}`
              )
            }))
          );
          return new s36.BucketPolicy(
            ...transform(
              args.transform?.policy,
              `${name}Policy`,
              {
                bucket: bucket.bucket,
                policy: iam6.getPolicyDocumentOutput({ statements }).json
              },
              {
                parent,
                dependsOn: publicAccessBlock
              }
            )
          );
        }
      );
    }
    function createCorsRule() {
      return output23(args.cors).apply((cors) => {
        if (cors === false) return;
        return new s36.BucketCorsConfigurationV2(
          ...transform(
            args.transform?.cors,
            `${name}Cors`,
            {
              bucket: bucket.bucket,
              corsRules: [
                {
                  allowedHeaders: cors?.allowHeaders ?? ["*"],
                  allowedMethods: cors?.allowMethods ?? [
                    "DELETE",
                    "GET",
                    "HEAD",
                    "POST",
                    "PUT"
                  ],
                  allowedOrigins: cors?.allowOrigins ?? ["*"],
                  exposeHeaders: cors?.exposeHeaders,
                  maxAgeSeconds: toSeconds(cors?.maxAge ?? "0 seconds")
                }
              ]
            },
            { parent }
          )
        );
      });
    }
  }
  /**
   * The generated name of the S3 Bucket.
   */
  get name() {
    return this.bucket.bucket;
  }
  /**
   * The domain name of the bucket. Has the format `${bucketName}.s3.amazonaws.com`.
   */
  get domain() {
    return this.bucket.bucketDomainName;
  }
  /**
   * The ARN of the S3 Bucket.
   */
  get arn() {
    return this.bucket.arn;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon S3 bucket.
       */
      bucket: this.bucket
    };
  }
  /**
   * Reference an existing bucket with the given bucket name. This is useful when you
   * create a bucket in one stage and want to share it in another stage. It avoids having to
   * create a new bucket in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share buckets across stages.
   * :::
   *
   * @param name The name of the component.
   * @param bucketName The name of the existing S3 Bucket.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a bucket in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new bucket, you want to share the bucket from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const bucket = $app.stage === "frank"
   *   ? sst.aws.Bucket.get("MyBucket", "app-dev-mybucket-12345678")
   *   : new sst.aws.Bucket("MyBucket");
   * ```
   *
   * Here `app-dev-mybucket-12345678` is the auto-generated bucket name for the bucket created
   * in the `dev` stage. You can find this by outputting the bucket name in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   bucket: bucket.name
   * };
   * ```
   */
  static get(name, bucketName, opts) {
    return new _Bucket(name, {
      ref: true,
      bucket: s36.BucketV2.get(`${name}Bucket`, bucketName, void 0, opts)
    });
  }
  /**
   * Subscribe to event notifications from this bucket. You can subscribe to these
   * notifications with a function, a queue, or a topic.
   *
   * @param args The config for the event notifications.
   *
   * @example
   *
   * For exmaple, to notify a function:
   *
   * ```js title="sst.config.ts" {5}
   * bucket.notify({
   *   notifications: [
   *     {
   *       name: "MySubscriber",
   *       function: "src/subscriber.handler"
   *     }
   *   ]
   * });
   * ```
   *
   * Or let's say you have a queue.
   *
   * ```js title="sst.config.ts"
   * const myQueue = new sst.aws.Queue("MyQueue");
   * ```
   *
   * You can notify it by passing in the queue.
   *
   * ```js title="sst.config.ts" {5}
   * bucket.notify({
   *   notifications: [
   *     {
   *       name: "MySubscriber",
   *       queue: myQueue
   *     }
   *   ]
   * });
   * ```
   *
   * Or let's say you have a topic.
   *
   * ```js title="sst.config.ts"
   * const myTopic = new sst.aws.SnsTopic("MyTopic");
   * ```
   *
   * You can notify it by passing in the topic.
   *
   * ```js title="sst.config.ts" {5}
   * bucket.notify({
   *   notifications: [
   *     {
   *       name: "MySubscriber",
   *       topic: myTopic
   *     }
   *   ]
   * });
   * ```
   *
   * You can also set it to only send notifications for specific S3 events.
   *
   * ```js {6}
   * bucket.notify({
   *   notifications: [
   *     {
   *       name: "MySubscriber",
   *       function: "src/subscriber.handler",
   *       events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   *     }
   *   ]
   * });
   * ```
   *
   * And you can add filters to be only notified from specific files in the bucket.
   *
   * ```js {6}
   * bucket.notify({
   *   notifications: [
   *     {
   *       name: "MySubscriber",
   *       function: "src/subscriber.handler",
   *       filterPrefix: "images/"
   *     }
   *   ]
   * });
   * ```
   */
  notify(args) {
    if (this.isSubscribed) {
      throw new VisibleError(
        `Cannot call "notify" on the "${this.constructorName}" bucket multiple times. Calling it again will override previous notifications.`
      );
    }
    this.isSubscribed = true;
    const name = this.constructorName;
    const opts = this.constructorOpts;
    return new BucketNotification(
      `${name}Notifications`,
      {
        bucket: { name: this.bucket.bucket, arn: this.bucket.arn },
        ...args
      },
      opts
    );
  }
  /**
   * Subscribe to events from this bucket.
   *
   * @deprecated The `notify` function is now the recommended way to subscribe to events
   * from this bucket. It allows you to configure multiple subscribers at once. To migrate,
   * remove the current subscriber, deploy the changes, and then add the subscriber
   * back using the new `notify` function.
   *
   * @param subscriber The function that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * ```js title="sst.config.ts"
   * bucket.subscribe("src/subscriber.handler");
   * ```
   *
   * Subscribe to specific S3 events. The `link` ensures the subscriber can access the bucket.
   *
   * ```js title="sst.config.ts" "link: [bucket]"
   * bucket.subscribe({
   *   handler: "src/subscriber.handler",
   *   link: [bucket]
   * }, {
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   *
   * Subscribe to specific S3 events from a specific folder.
   *
   * ```js title="sst.config.ts" {2}
   * bucket.subscribe("src/subscriber.handler", {
   *   filterPrefix: "images/",
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   *
   * Customize the subscriber function.
   *
   * ```js title="sst.config.ts"
   * bucket.subscribe({
   *   handler: "src/subscriber.handler",
   *   timeout: "60 seconds",
   * });
   * ```
   *
   * Or pass in the ARN of an existing Lambda function.
   *
   * ```js title="sst.config.ts"
   * bucket.subscribe("arn:aws:lambda:us-east-1:123456789012:function:my-function");
   * ```
   */
  subscribe(subscriber, args) {
    this.ensureNotSubscribed();
    return _Bucket._subscribeFunction(
      this.constructorName,
      this.bucket.bucket,
      this.bucket.arn,
      subscriber,
      args,
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Subscribe to events of an S3 bucket that was not created in your app.
   *
   * @deprecated The `notify` function is now the recommended way to subscribe to events
   * from this bucket. It allows you to configure multiple subscribers at once. To migrate,
   * remove the current subscriber, deploy the changes, and then add the subscriber
   * back using the new `notify` function.
   *
   * @param bucketArn The ARN of the S3 bucket to subscribe to.
   * @param subscriber The function that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have an existing S3 bucket with the following ARN.
   *
   * ```js title="sst.config.ts"
   * const bucketArn = "arn:aws:s3:::my-bucket";
   * ```
   *
   * You can subscribe to it by passing in the ARN.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bucket.subscribe(bucketArn, "src/subscriber.handler");
   * ```
   *
   * Subscribe to specific S3 events.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bucket.subscribe(bucketArn, "src/subscriber.handler", {
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   *
   * Subscribe to specific S3 events from a specific folder.
   *
   * ```js title="sst.config.ts" {2}
   * sst.aws.Bucket.subscribe(bucketArn, "src/subscriber.handler", {
   *   filterPrefix: "images/",
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   *
   * Customize the subscriber function.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bucket.subscribe(bucketArn, {
   *   handler: "src/subscriber.handler",
   *   timeout: "60 seconds",
   * });
   * ```
   */
  static subscribe(bucketArn, subscriber, args) {
    return output23(bucketArn).apply((bucketArn2) => {
      const bucketName = parseBucketArn(bucketArn2).bucketName;
      return this._subscribeFunction(
        bucketName,
        bucketName,
        bucketArn2,
        subscriber,
        args
      );
    });
  }
  static _subscribeFunction(name, bucketName, bucketArn, subscriber, args = {}, opts = {}) {
    return all15([bucketArn, subscriber, args]).apply(
      ([bucketArn2, subscriber2, args2]) => {
        const subscriberId = this.buildSubscriberId(
          bucketArn2,
          typeof subscriber2 === "string" ? subscriber2 : subscriber2.handler
        );
        return new BucketLambdaSubscriber(
          `${name}Subscriber${subscriberId}`,
          {
            bucket: { name: bucketName, arn: bucketArn2 },
            subscriber: subscriber2,
            subscriberId,
            ...args2
          },
          opts
        );
      }
    );
  }
  /**
   * Subscribe to events from this bucket with an SQS Queue.
   *
   * @deprecated The `notify` function is now the recommended way to subscribe to events
   * from this bucket. It allows you to configure multiple subscribers at once. To migrate,
   * remove the current subscriber, deploy the changes, and then add the subscriber
   * back using the new `notify` function.
   *
   * @param queueArn The ARN of the queue that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have a queue.
   *
   * ```js title="sst.config.ts"
   * const queue = new sst.aws.Queue("MyQueue");
   * ```
   *
   * You can subscribe to this bucket with it.
   *
   * ```js title="sst.config.ts"
   * bucket.subscribe(queue.arn);
   * ```
   *
   * Subscribe to specific S3 events.
   *
   * ```js title="sst.config.ts"
   * bucket.subscribe(queue.arn, {
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   *
   * Subscribe to specific S3 events from a specific folder.
   *
   * ```js title="sst.config.ts" {2}
   * bucket.subscribe(queue.arn, {
   *   filterPrefix: "images/",
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   */
  subscribeQueue(queueArn, args = {}) {
    this.ensureNotSubscribed();
    return _Bucket._subscribeQueue(
      this.constructorName,
      this.bucket.bucket,
      this.arn,
      queueArn,
      args,
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Subscribe to events of an S3 bucket that was not created in your app with an SQS Queue.
   *
   * @deprecated The `notify` function is now the recommended way to subscribe to events
   * from this bucket. It allows you to configure multiple subscribers at once. To migrate,
   * remove the current subscriber, deploy the changes, and then add the subscriber
   * back using the new `notify` function.
   *
   * @param bucketArn The ARN of the S3 bucket to subscribe to.
   * @param queueArn The ARN of the queue that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have an existing S3 bucket and SQS queue with the following ARNs.
   *
   * ```js title="sst.config.ts"
   * const bucketArn = "arn:aws:s3:::my-bucket";
   * const queueArn = "arn:aws:sqs:us-east-1:123456789012:MyQueue";
   * ```
   *
   * You can subscribe to the bucket with the queue.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bucket.subscribeQueue(bucketArn, queueArn);
   * ```
   *
   * Subscribe to specific S3 events.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bucket.subscribeQueue(bucketArn, queueArn, {
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   *
   * Subscribe to specific S3 events from a specific folder.
   *
   * ```js title="sst.config.ts" {2}
   * sst.aws.Bucket.subscribeQueue(bucketArn, queueArn, {
   *   filterPrefix: "images/",
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   */
  static subscribeQueue(bucketArn, queueArn, args) {
    return output23(bucketArn).apply((bucketArn2) => {
      const bucketName = parseBucketArn(bucketArn2).bucketName;
      return this._subscribeQueue(
        bucketName,
        bucketName,
        bucketArn2,
        queueArn,
        args
      );
    });
  }
  static _subscribeQueue(name, bucketName, bucketArn, queueArn, args = {}, opts = {}) {
    return all15([bucketArn, queueArn, args]).apply(
      ([bucketArn2, queueArn2, args2]) => {
        const subscriberId = this.buildSubscriberId(bucketArn2, queueArn2);
        return new BucketQueueSubscriber(
          `${name}Subscriber${subscriberId}`,
          {
            bucket: { name: bucketName, arn: bucketArn2 },
            queue: queueArn2,
            subscriberId,
            ...args2
          },
          opts
        );
      }
    );
  }
  /**
   * Subscribe to events from this bucket with an SNS Topic.
   *
   * @deprecated The `notify` function is now the recommended way to subscribe to events
   * from this bucket. It allows you to configure multiple subscribers at once. To migrate,
   * remove the current subscriber, deploy the changes, and then add the subscriber
   * back using the new `notify` function.
   *
   * @param topicArn The ARN of the topic that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have a topic.
   *
   * ```js title="sst.config.ts"
   * const topic = new sst.aws.SnsTopic("MyTopic");
   * ```
   *
   * You can subscribe to this bucket with it.
   *
   * ```js title="sst.config.ts"
   * bucket.subscribe(topic.arn);
   * ```
   *
   * Subscribe to specific S3 events.
   *
   * ```js title="sst.config.ts"
   * bucket.subscribe(topic.arn, {
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   *
   * Subscribe to specific S3 events from a specific folder.
   *
   * ```js title="sst.config.ts" {2}
   * bucket.subscribe(topic.arn, {
   *   filterPrefix: "images/",
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   */
  subscribeTopic(topicArn, args = {}) {
    this.ensureNotSubscribed();
    return _Bucket._subscribeTopic(
      this.constructorName,
      this.bucket.bucket,
      this.arn,
      topicArn,
      args,
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Subscribe to events of an S3 bucket that was not created in your app with an SNS Topic.
   *
   * @deprecated The `notify` function is now the recommended way to subscribe to events
   * from this bucket. It allows you to configure multiple subscribers at once. To migrate,
   * remove the current subscriber, deploy the changes, and then add the subscriber
   * back using the new `notify` function.
   *
   * @param bucketArn The ARN of the S3 bucket to subscribe to.
   * @param topicArn The ARN of the topic that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have an existing S3 bucket and SNS topic with the following ARNs.
   *
   * ```js title="sst.config.ts"
   * const bucketArn = "arn:aws:s3:::my-bucket";
   * const topicArn = "arn:aws:sns:us-east-1:123456789012:MyTopic";
   * ```
   *
   * You can subscribe to the bucket with the topic.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bucket.subscribe(bucketArn, topicArn);
   * ```
   *
   * Subscribe to specific S3 events.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bucket.subscribe(bucketArn, topicArn, {
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   *
   * Subscribe to specific S3 events from a specific folder.
   *
   * ```js title="sst.config.ts" {2}
   * sst.aws.Bucket.subscribe(bucketArn, topicArn, {
   *   filterPrefix: "images/",
   *   events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
   * });
   * ```
   */
  static subscribeTopic(bucketArn, topicArn, args) {
    return output23(bucketArn).apply((bucketArn2) => {
      const bucketName = parseBucketArn(bucketArn2).bucketName;
      return this._subscribeTopic(
        bucketName,
        bucketName,
        bucketArn2,
        topicArn,
        args
      );
    });
  }
  static _subscribeTopic(name, bucketName, bucketArn, topicArn, args = {}, opts = {}) {
    return all15([bucketArn, topicArn, args]).apply(
      ([bucketArn2, topicArn2, args2]) => {
        const subscriberId = this.buildSubscriberId(bucketArn2, topicArn2);
        return new BucketTopicSubscriber(
          `${name}Subscriber${subscriberId}`,
          {
            bucket: { name: bucketName, arn: bucketArn2 },
            topic: topicArn2,
            subscriberId,
            ...args2
          },
          opts
        );
      }
    );
  }
  static buildSubscriberId(bucketArn, _discriminator) {
    return logicalName(
      hashStringToPrettyString(
        [
          bucketArn
          // Temporarily only allowing one subscriber per bucket because of the
          // AWS/Terraform issue that appending/removing a notification deletes
          // all existing notifications.
          //
          // A solution would be to implement a dynamic provider. On create,
          // get existing notifications then append. And on delete, get existing
          // notifications then remove from the list.
          //
          // https://github.com/hashicorp/terraform-provider-aws/issues/501
          //
          // Commenting out the lines below to ensure the id never changes.
          // Because on id change, the removal of notification happens after
          // the creation of notification. And the newly created notification
          // gets removed.
          //...events,
          //args.filterPrefix ?? "",
          //args.filterSuffix ?? "",
          //discriminator,
        ].join(""),
        6
      )
    );
  }
  ensureNotSubscribed() {
    if (this.isSubscribed)
      throw new VisibleError(
        `Cannot subscribe to the "${this.constructorName}" bucket multiple times. An S3 bucket can only have one subscriber.`
      );
    this.isSubscribed = true;
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        name: this.name
      },
      include: [
        permission({
          actions: ["s3:*"],
          resources: [this.arn, interpolate8`${this.arn}/*`]
        })
      ]
    };
  }
};
var __pulumiType18 = "sst:aws:Bucket";
Bucket.__pulumiType = __pulumiType18;

// .sst/platform/src/components/aws/helpers/provider.ts
import { runtime as runtime4 } from "@pulumi/pulumi";
import { Provider } from "@pulumi/aws";
var useProviderCache = lazy(() => /* @__PURE__ */ new Map());
var useProvider = (region) => {
  const cache = useProviderCache();
  const existing = cache.get(region);
  if (existing) return existing;
  const config = runtime4.allConfig();
  for (const key in config) {
    const value = config[key];
    delete config[key];
    const [prefix, real] = key.split(":");
    if (prefix !== "aws") continue;
    try {
      config[real] = JSON.parse(value);
    } catch (e) {
      config[real] = value;
    }
  }
  const provider = new Provider(`AwsProvider.sst.${region}`, {
    ...config,
    region
  });
  cache.set(region, provider);
  return provider;
};

// .sst/platform/src/components/aws/https-redirect.ts
import { cloudfront as cloudfront2, s3 as s37 } from "@pulumi/aws";
var HttpsRedirect = class extends Component {
  constructor(name, args, opts) {
    super(__pulumiType19, name, args, opts);
    const parent = this;
    validateArgs();
    const certificateArn = createSsl();
    const bucket = createBucket();
    const bucketWebsite = createBucketWebsite();
    const distribution = createDistribution();
    createDnsRecords();
    function validateArgs() {
      if (!args.dns && !args.cert)
        throw new Error(
          `Need to provide a validated certificate via "cert" when DNS is disabled`
        );
    }
    function createSsl() {
      if (args.cert) return args.cert;
      return new DnsValidatedCertificate(
        `${name}Ssl`,
        {
          domainName: output24(args.sourceDomains).apply((domains) => domains[0]),
          alternativeNames: output24(args.sourceDomains).apply(
            (domains) => domains.slice(1)
          ),
          dns: args.dns
        },
        { parent, provider: useProvider("us-east-1") }
      ).arn;
    }
    function createBucket() {
      return new Bucket(`${name}Bucket`, {}, { parent });
    }
    function createBucketWebsite() {
      return new s37.BucketWebsiteConfigurationV2(
        `${name}BucketWebsite`,
        {
          bucket: bucket.name,
          redirectAllRequestsTo: {
            hostName: args.targetDomain,
            protocol: "https"
          }
        },
        { parent }
      );
    }
    function createDistribution() {
      return new cloudfront2.Distribution(
        `${name}Distribution`,
        {
          enabled: true,
          waitForDeployment: false,
          aliases: args.sourceDomains,
          restrictions: {
            geoRestriction: {
              restrictionType: "none"
            }
          },
          comment: all16([args.targetDomain, args.sourceDomains]).apply(
            ([targetDomain, sourceDomains]) => {
              const comment = `Redirect to ${targetDomain} from ${sourceDomains.join(
                ", "
              )}`;
              return comment.length > 128 ? comment.slice(0, 125) + "..." : comment;
            }
          ),
          priceClass: "PriceClass_All",
          viewerCertificate: {
            acmCertificateArn: certificateArn,
            sslSupportMethod: "sni-only"
          },
          defaultCacheBehavior: {
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            targetOriginId: "s3Origin",
            viewerProtocolPolicy: "redirect-to-https",
            cachedMethods: ["GET", "HEAD"],
            forwardedValues: {
              cookies: { forward: "none" },
              queryString: false
            },
            functionAssociations: [
              {
                eventType: "viewer-request",
                functionArn: new cloudfront2.Function(
                  `${name}CloudfrontFunctionRequest`,
                  {
                    runtime: "cloudfront-js-2.0",
                    code: `
import cf from "cloudfront";
async function handler(event) {
  ${CF_BLOCK_CLOUDFRONT_URL_INJECTION}
  return event.request;
}`
                  }
                ).arn
              }
            ]
          },
          origins: [
            {
              originId: "s3Origin",
              domainName: bucketWebsite.websiteEndpoint,
              customOriginConfig: {
                httpPort: 80,
                httpsPort: 443,
                originProtocolPolicy: "http-only",
                originSslProtocols: ["TLSv1.2"]
              }
            }
          ]
        },
        { parent }
      );
    }
    function createDnsRecords() {
      if (!args.dns) return;
      all16([args.dns, args.sourceDomains]).apply(([dns2, sourceDomains]) => {
        for (const recordName of sourceDomains) {
          dns2.createAlias(
            name,
            {
              name: recordName,
              aliasName: distribution.domainName,
              aliasZone: distribution.hostedZoneId
            },
            { parent }
          );
        }
      });
    }
  }
};
var __pulumiType19 = "sst:aws:HttpsRedirect";
HttpsRedirect.__pulumiType = __pulumiType19;

// .sst/platform/src/components/aws/providers/distribution-deployment-waiter.ts
import { dynamic as dynamic5 } from "@pulumi/pulumi";
var DistributionDeploymentWaiter = class extends dynamic5.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.DistributionDeploymentWaiter"),
      `${name}.sst.aws.DistributionDeploymentWaiter`,
      args,
      opts
    );
  }
};

// .sst/platform/src/components/aws/providers/hosted-zone-lookup.ts
import { dynamic as dynamic6 } from "@pulumi/pulumi";
var HostedZoneLookup = class extends dynamic6.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.HostedZoneLookup"),
      `${name}.sst.aws.HostedZoneLookup`,
      { ...args, zoneId: void 0 },
      opts
    );
  }
};

// .sst/platform/src/components/aws/dns.ts
import { output as output25 } from "@pulumi/pulumi";
import { route53 as route532 } from "@pulumi/aws";
function dns(args = {}) {
  return {
    provider: "aws",
    createAlias,
    createCaa,
    createRecord
  };
  function createAlias(namePrefix, record, opts) {
    return ["A", "AAAA"].map(
      (type) => _createRecord(
        namePrefix,
        {
          type,
          name: record.name,
          aliases: [
            {
              name: record.aliasName,
              zoneId: record.aliasZone,
              evaluateTargetHealth: true
            }
          ]
        },
        opts
      )
    );
  }
  function createCaa(namePrefix, recordName, opts) {
    return void 0;
  }
  function createRecord(namePrefix, record, opts) {
    return _createRecord(
      namePrefix,
      {
        type: record.type,
        name: record.name,
        ttl: 60,
        records: [record.value]
      },
      opts
    );
  }
  function _createRecord(namePrefix, partial, opts) {
    return output25(partial).apply((partial2) => {
      const nameSuffix = logicalName(partial2.name);
      const zoneId = lookupZone();
      const dnsRecord = createRecord2();
      return dnsRecord;
      function lookupZone() {
        if (args.zone) {
          return output25(args.zone).apply(async (zoneId2) => {
            const zone = await route532.getZone({ zoneId: zoneId2 });
            if (!partial2.name.replace(/\.$/, "").endsWith(zone.name)) {
              throw new VisibleError(
                `The DNS record "${partial2.name}" cannot be created because the domain name does not match the hosted zone "${zone.name}" (${zoneId2}).`
              );
            }
            return zoneId2;
          });
        }
        return new HostedZoneLookup(
          `${namePrefix}${partial2.type}ZoneLookup${nameSuffix}`,
          {
            domain: output25(partial2.name).apply(
              (name) => name.replace(/\.$/, "")
            )
          },
          opts
        ).zoneId;
      }
      function createRecord2() {
        return new route532.Record(
          ...transform(
            args.transform?.record,
            `${namePrefix}${partial2.type}Record${nameSuffix}`,
            {
              zoneId,
              allowOverwrite: args.override,
              ...partial2
            },
            opts
          )
        );
      }
    });
  }
}

// .sst/platform/src/components/aws/cdn.ts
import { cloudfront as cloudfront3 } from "@pulumi/aws";
var Cdn = class _Cdn extends Component {
  distribution;
  _domainUrl;
  constructor(name, args, opts) {
    super(pulumiType, name, args, opts);
    const parent = this;
    if (args && "ref" in args) {
      const ref = reference();
      this.distribution = output26(ref.distribution);
      this._domainUrl = ref.distribution.aliases.apply(
        (aliases) => aliases?.length ? `https://${aliases[0]}` : void 0
      );
      return;
    }
    const domain = normalizeDomain();
    const certificateArn = createSsl();
    const distribution = createDistribution();
    const waiter = createDistributionDeploymentWaiter();
    createDnsRecords();
    createRedirects();
    this.distribution = waiter.isDone.apply(() => distribution);
    this._domainUrl = domain?.name ? interpolate9`https://${domain.name}` : output26(void 0);
    function reference() {
      const ref = args;
      const distribution2 = cloudfront3.Distribution.get(
        `${name}Distribution`,
        ref.distributionID,
        void 0,
        { parent }
      );
      return { distribution: distribution2 };
    }
    function normalizeDomain() {
      if (!args.domain) return;
      return output26(args.domain).apply((domain2) => {
        const norm = typeof domain2 === "string" ? { name: domain2 } : domain2;
        if (!norm.name) throw new Error(`Missing "name" for domain.`);
        if (norm.dns === false && !norm.cert)
          throw new Error(
            `Need to provide a validated certificate via "cert" when DNS is disabled`
          );
        return {
          name: norm.name,
          aliases: norm.aliases ?? [],
          redirects: norm.redirects ?? [],
          dns: norm.dns === false ? void 0 : norm.dns ?? dns(),
          cert: norm.cert
        };
      });
    }
    function createSsl() {
      if (!domain) return output26(void 0);
      return domain.cert.apply((cert) => {
        if (cert) return domain.cert;
        return new DnsValidatedCertificate(
          `${name}Ssl`,
          {
            domainName: domain.name,
            alternativeNames: domain.aliases,
            dns: domain.dns.apply((dns2) => dns2)
          },
          { parent, provider: useProvider("us-east-1") }
        ).arn;
      });
    }
    function createDistribution() {
      return new cloudfront3.Distribution(
        ...transform(
          args.transform?.distribution,
          `${name}Distribution`,
          {
            comment: args.comment,
            enabled: true,
            origins: args.origins,
            originGroups: args.originGroups,
            defaultCacheBehavior: args.defaultCacheBehavior,
            orderedCacheBehaviors: args.orderedCacheBehaviors,
            defaultRootObject: args.defaultRootObject,
            customErrorResponses: args.customErrorResponses,
            restrictions: {
              geoRestriction: {
                restrictionType: "none"
              }
            },
            aliases: domain ? output26(domain).apply((domain2) => [
              domain2.name,
              ...domain2.aliases
            ]) : [],
            viewerCertificate: certificateArn.apply(
              (arn) => arn ? {
                acmCertificateArn: arn,
                sslSupportMethod: "sni-only",
                minimumProtocolVersion: "TLSv1.2_2021"
              } : {
                cloudfrontDefaultCertificate: true
              }
            ),
            waitForDeployment: false,
            tags: args.tags
          },
          { parent }
        )
      );
    }
    function createDistributionDeploymentWaiter() {
      return output26(args.wait).apply((wait) => {
        return new DistributionDeploymentWaiter(
          `${name}Waiter`,
          {
            distributionId: distribution.id,
            etag: distribution.etag,
            wait: wait ?? true
          },
          { parent, ignoreChanges: wait ? void 0 : ["*"] }
        );
      });
    }
    function createDnsRecords() {
      if (!domain) return;
      domain.apply((domain2) => {
        if (!domain2.dns) return;
        const existing = [];
        for (const [i, recordName] of [
          domain2.name,
          ...domain2.aliases
        ].entries()) {
          const key = logicalName(recordName);
          const namePrefix = existing.includes(key) ? `${name}${i}` : name;
          existing.push(key);
          domain2.dns.createAlias(
            namePrefix,
            {
              name: recordName,
              aliasName: distribution.domainName,
              aliasZone: distribution.hostedZoneId
            },
            { parent }
          );
        }
      });
    }
    function createRedirects() {
      if (!domain) return;
      all17([domain.cert, domain.redirects, domain.dns]).apply(
        ([cert, redirects, dns2]) => {
          if (!redirects.length) return;
          new HttpsRedirect(
            `${name}Redirect`,
            {
              sourceDomains: redirects,
              targetDomain: domain.name,
              cert: cert ? domain.cert.apply((cert2) => cert2) : void 0,
              dns: dns2 ? domain.dns.apply((dns3) => dns3) : void 0
            },
            { parent }
          );
        }
      );
    }
  }
  /**
   * The CloudFront URL of the distribution.
   */
  get url() {
    return interpolate9`https://${this.distribution.domainName}`;
  }
  /**
   * If the custom domain is enabled, this is the URL of the distribution with the
   * custom domain.
   */
  get domainUrl() {
    return this._domainUrl;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon CloudFront distribution.
       */
      distribution: this.distribution
    };
  }
  /**
   * Reference an existing CDN with the given distribution ID. This is useful when
   * you create a Router in one stage and want to share it in another. It avoids having to
   * create a new Router in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share Routers across stages.
   * :::
   *
   * @param name The name of the component.
   * @param distributionID The id of the existing CDN distribution.
   * @param opts? Resource options.
   */
  static get(name, distributionID, opts) {
    return new _Cdn(
      name,
      {
        ref: true,
        distributionID
      },
      opts
    );
  }
};
var pulumiType = "sst:aws:CDN";
Cdn.__pulumiType = pulumiType;

// .sst/platform/src/components/aws/providers/bucket-files.ts
import { dynamic as dynamic7 } from "@pulumi/pulumi";
var BucketFiles = class extends dynamic7.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.BucketFiles"),
      `${name}.sst.aws.BucketFiles`,
      args,
      opts
    );
  }
};

// .sst/platform/src/components/aws/cron.ts
import { all as all18, output as output27 } from "@pulumi/pulumi";
import { cloudwatch as cloudwatch2, iam as iam7, lambda as lambda7 } from "@pulumi/aws";
var Cron = class extends Component {
  name;
  fn;
  rule;
  target;
  constructor(name, args, opts) {
    super(__pulumiType20, name, args, opts);
    const parent = this;
    const fnArgs = normalizeFunction();
    const event = output27(args.event || {});
    normalizeTargets();
    const enabled = output27(args.enabled ?? true);
    const rule = createRule2();
    const fn = createFunction();
    const role = createRole();
    const target = createTarget();
    this.name = name;
    this.fn = fn;
    this.rule = rule;
    this.target = target;
    function normalizeFunction() {
      if (args.job && args.function)
        throw new VisibleError(
          `You cannot provide both "job" and "function" in the "${name}" Cron component. The "job" property has been deprecated. Use "function" instead.`
        );
      const input = args.function ?? args.job;
      return input ? output27(input) : void 0;
    }
    function normalizeTargets() {
      if (fnArgs && args.task)
        throw new VisibleError(
          `You cannot provide both a function and a task in the "${name}" Cron component.`
        );
    }
    function createRule2() {
      return new cloudwatch2.EventRule(
        ...transform(
          args.transform?.rule,
          `${name}Rule`,
          {
            scheduleExpression: args.schedule,
            state: enabled.apply((v) => v ? "ENABLED" : "DISABLED")
          },
          { parent }
        )
      );
    }
    function createFunction() {
      if (!fnArgs) return;
      const fn2 = fnArgs.apply(
        (fnArgs2) => functionBuilder(`${name}Handler`, fnArgs2, {}, void 0, {
          parent
        })
      );
      new lambda7.Permission(
        `${name}Permission`,
        {
          action: "lambda:InvokeFunction",
          function: fn2.arn,
          principal: "events.amazonaws.com",
          sourceArn: rule.arn
        },
        { parent }
      );
      return fn2;
    }
    function createRole() {
      if (!args.task) return;
      return new iam7.Role(
        `${name}TargetRole`,
        {
          assumeRolePolicy: iam7.assumeRolePolicyForPrincipal({
            Service: "events.amazonaws.com"
          }),
          inlinePolicies: [
            {
              name: "inline",
              policy: iam7.getPolicyDocumentOutput({
                statements: [
                  {
                    actions: ["ecs:RunTask"],
                    resources: [args.task.nodes.taskDefinition.arn]
                  },
                  {
                    actions: ["iam:PassRole"],
                    resources: [
                      args.task.nodes.executionRole.arn,
                      args.task.nodes.taskRole.arn
                    ]
                  }
                ]
              }).json
            }
          ]
        },
        { parent }
      );
    }
    function createTarget() {
      return new cloudwatch2.EventTarget(
        ...transform(
          args.transform?.target,
          `${name}Target`,
          fn ? {
            arn: fn.arn,
            rule: rule.name,
            input: event.apply((event2) => JSON.stringify(event2))
          } : {
            arn: args.task.cluster,
            rule: rule.name,
            ecsTarget: {
              launchType: "FARGATE",
              taskDefinitionArn: args.task.nodes.taskDefinition.arn,
              networkConfiguration: {
                subnets: args.task.subnets,
                securityGroups: args.task.securityGroups,
                assignPublicIp: args.task.assignPublicIp
              }
            },
            roleArn: role.arn,
            input: all18([event, args.task.containers]).apply(
              ([event2, containers]) => {
                return JSON.stringify({
                  containerOverrides: containers.map((name2) => ({
                    name: name2,
                    environment: [
                      {
                        name: "SST_EVENT",
                        value: JSON.stringify(event2)
                      }
                    ]
                  }))
                });
              }
            )
          },
          { parent }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The AWS Lambda Function that'll be invoked when the cron job runs.
       * @deprecated Use `nodes.function` instead.
       */
      get job() {
        if (!self.fn)
          throw new VisibleError(
            `No function created for the "${self.name}" cron job.`
          );
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The AWS Lambda Function that'll be invoked when the cron job runs.
       */
      get function() {
        if (!self.fn)
          throw new VisibleError(
            `No function created for the "${self.name}" cron job.`
          );
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The EventBridge Rule resource.
       */
      rule: this.rule,
      /**
       * The EventBridge Target resource.
       */
      target: this.target
    };
  }
};
var __pulumiType20 = "sst:aws:Cron";
Cron.__pulumiType = __pulumiType20;

// .sst/platform/src/components/base/base-site.ts
import path2 from "path";
function getContentType(filename, textEncoding) {
  const ext = filename.endsWith(".well-known/site-association-json") || filename.endsWith(".well-known/apple-app-site-association") ? ".json" : path2.extname(filename);
  const extensions = {
    [".txt"]: { mime: "text/plain", isText: true },
    [".htm"]: { mime: "text/html", isText: true },
    [".html"]: { mime: "text/html", isText: true },
    [".xhtml"]: { mime: "application/xhtml+xml", isText: true },
    [".css"]: { mime: "text/css", isText: true },
    [".js"]: { mime: "text/javascript", isText: true },
    [".mjs"]: { mime: "text/javascript", isText: true },
    [".apng"]: { mime: "image/apng", isText: false },
    [".avif"]: { mime: "image/avif", isText: false },
    [".gif"]: { mime: "image/gif", isText: false },
    [".jpeg"]: { mime: "image/jpeg", isText: false },
    [".jpg"]: { mime: "image/jpeg", isText: false },
    [".png"]: { mime: "image/png", isText: false },
    [".svg"]: { mime: "image/svg+xml", isText: true },
    [".bmp"]: { mime: "image/bmp", isText: false },
    [".tiff"]: { mime: "image/tiff", isText: false },
    [".webp"]: { mime: "image/webp", isText: false },
    [".ico"]: { mime: "image/vnd.microsoft.icon", isText: false },
    [".eot"]: { mime: "application/vnd.ms-fontobject", isText: false },
    [".ttf"]: { mime: "font/ttf", isText: false },
    [".otf"]: { mime: "font/otf", isText: false },
    [".woff"]: { mime: "font/woff", isText: false },
    [".woff2"]: { mime: "font/woff2", isText: false },
    [".json"]: { mime: "application/json", isText: true },
    [".jsonld"]: { mime: "application/ld+json", isText: true },
    [".xml"]: { mime: "application/xml", isText: true },
    [".pdf"]: { mime: "application/pdf", isText: false },
    [".zip"]: { mime: "application/zip", isText: false },
    [".wasm"]: { mime: "application/wasm", isText: false },
    [".webmanifest"]: { mime: "application/manifest+json", isText: true }
  };
  const extensionData = extensions[ext];
  const mime = extensionData?.mime ?? "application/octet-stream";
  const charset = extensionData?.isText && textEncoding !== "none" ? `;charset=${textEncoding}` : "";
  return `${mime}${charset}`;
}

// .sst/platform/src/components/base/base-ssr-site.ts
import path3 from "path";
import fs2 from "fs";
import { all as all20, output as output28 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/helpers/site-builder.ts
import { all as all19 } from "@pulumi/pulumi";

// .sst/platform/src/util/semaphore.ts
var Semaphore = class {
  constructor(max) {
    this.max = max;
    this.current = 0;
    this.queue = [];
  }
  current;
  queue;
  async acquire(name) {
    if (this.current < this.max) {
      this.current++;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.queue.push(resolve);
    });
  }
  release() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next?.();
      return;
    }
    this.current--;
  }
};

// .sst/platform/src/components/aws/helpers/site-builder.ts
import { local } from "@pulumi/command";
var limiter = new Semaphore(
  parseInt(process.env.SST_BUILD_CONCURRENCY_SITE || "1")
);
function siteBuilder(name, args, opts) {
  return all19([args]).apply(async ([args2]) => {
    await limiter.acquire(name);
    let waitOn;
    const command = new local.Command(name, args2, opts);
    waitOn = command.urn;
    if (define_cli_default.command === "diff") {
      waitOn = local.runOutput(
        {
          command: args2.create,
          dir: args2.dir,
          environment: args2.environment
        },
        opts
      ).stdout;
    }
    return waitOn.apply(() => {
      limiter.release();
      return command;
    });
  });
}

// .sst/platform/src/components/base/base-ssr-site.ts
function buildApp(parent, name, args, sitePath, buildCommand) {
  return all20([
    sitePath,
    buildCommand ?? args.buildCommand,
    args.link,
    args.environment
  ]).apply(([sitePath2, userCommand, links, environment]) => {
    const cmd = resolveBuildCommand();
    const result2 = runBuild();
    return result2.id.apply(() => sitePath2);
    function resolveBuildCommand() {
      if (userCommand) return userCommand;
      if (!userCommand) {
        if (!fs2.existsSync(path3.join(sitePath2, "package.json"))) {
          throw new VisibleError(`No package.json found at "${sitePath2}".`);
        }
        const packageJson = JSON.parse(
          fs2.readFileSync(path3.join(sitePath2, "package.json")).toString()
        );
        if (!packageJson.scripts || !packageJson.scripts.build) {
          throw new VisibleError(
            `No "build" script found within package.json in "${sitePath2}".`
          );
        }
      }
      if (fs2.existsSync(path3.join(sitePath2, "yarn.lock")) || fs2.existsSync(path3.join(define_cli_default.paths.root, "yarn.lock")))
        return "yarn run build";
      if (fs2.existsSync(path3.join(sitePath2, "pnpm-lock.yaml")) || fs2.existsSync(path3.join(define_cli_default.paths.root, "pnpm-lock.yaml")))
        return "pnpm run build";
      if (fs2.existsSync(path3.join(sitePath2, "bun.lockb")) || fs2.existsSync(path3.join(define_cli_default.paths.root, "bun.lockb")) || fs2.existsSync(path3.join(sitePath2, "bun.lock")) || fs2.existsSync(path3.join(define_cli_default.paths.root, "bun.lock")))
        return "bun run build";
      return "npm run build";
    }
    function runBuild() {
      const linkData = Link.build(links || []);
      const linkEnvs = output28(linkData).apply((linkData2) => {
        const envs = {
          SST_RESOURCE_App: JSON.stringify({
            name: define_app_default.name,
            stage: define_app_default.stage
          })
        };
        for (const datum of linkData2) {
          envs[`SST_RESOURCE_${datum.name}`] = JSON.stringify(datum.properties);
        }
        return envs;
      });
      return siteBuilder(
        `${name}Builder`,
        {
          create: cmd,
          update: cmd,
          dir: path3.join(define_cli_default.paths.root, sitePath2),
          environment: linkEnvs.apply((linkEnvs2) => ({
            SST: "1",
            ...process.env,
            ...environment,
            ...linkEnvs2
          })),
          triggers: [Date.now().toString()]
        },
        {
          parent,
          ignoreChanges: process.env.SKIP ? ["*"] : void 0
        }
      );
    }
  });
}

// .sst/platform/src/components/aws/ssr-site.ts
import { cloudfront as cloudfront4, getRegionOutput as getRegionOutput2, lambda as lambda8, Region as Region2 } from "@pulumi/aws";

// .sst/platform/src/components/aws/linkable.ts
var URL_UNAVAILABLE = "http://url-unavailable-in-dev.mode";
function linkable2(obj, cb) {
  throw new VisibleError(
    [
      "sst.aws.linkable is deprecated. Use sst.Linkable.wrap instead.",
      "sst.Linkable.wrap(MyResource, (resource) => ({",
      "  properties: { ... },",
      "  with: [",
      '    sst.aws.permission({ actions: ["foo:*"], resources: [resource.arn] })',
      "  ]",
      "}))"
    ].join("\n")
  );
}

// .sst/platform/src/components/aws/providers/distribution-invalidation.ts
import { dynamic as dynamic8 } from "@pulumi/pulumi";
var DistributionInvalidation = class extends dynamic8.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.DistributionInvalidation"),
      `${name}.sst.aws.DistributionInvalidation`,
      args,
      opts
    );
  }
};

// .sst/platform/src/components/aws/helpers/quota.ts
import { servicequotas } from "@pulumi/aws";
var QUOTA_CODE = {
  "cloudfront-response-timeout": ["cloudfront", "L-AECE9FA7"]
};
var quotas = {};
var CONSOLE_URL = "https://console.aws.amazon.com/support/home#/case/create?issueType=service-limit-increase";
function getQuota(name) {
  if (quotas[name]) return quotas[name];
  const quota = servicequotas.getServiceQuotaOutput(
    {
      serviceCode: QUOTA_CODE[name][0],
      quotaCode: QUOTA_CODE[name][1]
    },
    {
      provider: useProvider("us-east-1")
    }
  );
  quotas[name] = quota.value;
  return quota.value;
}

// .sst/platform/src/components/path.ts
import path4 from "path";
function toPosix(p) {
  return p.split(path4.sep).join(path4.posix.sep);
}

// .sst/platform/src/components/aws/ssr-site.ts
var supportedRegions = {
  "af-south-1": { lat: -33.9249, lon: 18.4241 },
  // Cape Town, South Africa
  "ap-east-1": { lat: 22.3193, lon: 114.1694 },
  // Hong Kong
  "ap-northeast-1": { lat: 35.6895, lon: 139.6917 },
  // Tokyo, Japan
  "ap-northeast-2": { lat: 37.5665, lon: 126.978 },
  // Seoul, South Korea
  "ap-northeast-3": { lat: 34.6937, lon: 135.5023 },
  // Osaka, Japan
  "ap-southeast-1": { lat: 1.3521, lon: 103.8198 },
  // Singapore
  "ap-southeast-2": { lat: -33.8688, lon: 151.2093 },
  // Sydney, Australia
  "ap-southeast-3": { lat: -6.2088, lon: 106.8456 },
  // Jakarta, Indonesia
  "ap-southeast-4": { lat: -37.8136, lon: 144.9631 },
  // Melbourne, Australia
  "ap-southeast-5": { lat: 3.139, lon: 101.6869 },
  // Kuala Lumpur, Malaysia
  "ap-southeast-7": { lat: 13.7563, lon: 100.5018 },
  // Bangkok, Thailand
  "ap-south-1": { lat: 19.076, lon: 72.8777 },
  // Mumbai, India
  "ap-south-2": { lat: 17.385, lon: 78.4867 },
  // Hyderabad, India
  "ca-central-1": { lat: 45.5017, lon: -73.5673 },
  // Montreal, Canada
  "ca-west-1": { lat: 51.0447, lon: -114.0719 },
  // Calgary, Canada
  "cn-north-1": { lat: 39.9042, lon: 116.4074 },
  // Beijing, China
  "cn-northwest-1": { lat: 38.4872, lon: 106.2309 },
  // Yinchuan, Ningxia
  "eu-central-1": { lat: 50.1109, lon: 8.6821 },
  // Frankfurt, Germany
  "eu-central-2": { lat: 47.3769, lon: 8.5417 },
  // Zurich, Switzerland
  "eu-north-1": { lat: 59.3293, lon: 18.0686 },
  // Stockholm, Sweden
  "eu-south-1": { lat: 45.4642, lon: 9.19 },
  // Milan, Italy
  "eu-south-2": { lat: 40.4168, lon: -3.7038 },
  // Madrid, Spain
  "eu-west-1": { lat: 53.3498, lon: -6.2603 },
  // Dublin, Ireland
  "eu-west-2": { lat: 51.5074, lon: -0.1278 },
  // London, UK
  "eu-west-3": { lat: 48.8566, lon: 2.3522 },
  // Paris, France
  "il-central-1": { lat: 32.0853, lon: 34.7818 },
  // Tel Aviv, Israel
  "me-central-1": { lat: 25.2048, lon: 55.2708 },
  // Dubai, UAE
  "me-south-1": { lat: 26.0667, lon: 50.5577 },
  // Manama, Bahrain
  "mx-central-1": { lat: 19.4326, lon: -99.1332 },
  // Mexico City, Mexico
  "sa-east-1": { lat: -23.5505, lon: -46.6333 },
  // São Paulo, Brazil
  "us-east-1": { lat: 39.0438, lon: -77.4874 },
  // Ashburn, VA
  "us-east-2": { lat: 39.9612, lon: -82.9988 },
  // Columbus, OH
  "us-gov-east-1": { lat: 38.9696, lon: -77.3861 },
  // Herndon, VA
  "us-gov-west-1": { lat: 34.0522, lon: -118.2437 },
  // Los Angeles, CA
  "us-west-1": { lat: 37.7749, lon: -122.4194 },
  // San Francisco, CA
  "us-west-2": { lat: 45.5122, lon: -122.6587 }
  // Portland, OR
};
var SsrSite = class extends Component {
  cdn;
  bucket;
  server;
  devUrl;
  prodUrl;
  constructor(type, name, args = {}, opts = {}) {
    super(type, name, args, opts);
    const self = this;
    validateDeprecatedProps();
    const regions = normalizeRegions();
    const route = normalizeRoute();
    const edge = normalizeEdge();
    const serverTimeout = normalizeServerTimeout();
    const buildCommand = this.normalizeBuildCommand(args);
    const sitePath = regions.apply(() => normalizeSitePath());
    const dev = normalizeDev();
    const purge = output29(args.assets).apply((assets) => assets?.purge ?? false);
    if (dev.enabled) {
      const server2 = createDevServer();
      this.devUrl = dev.url;
      this.registerOutputs({
        _metadata: {
          mode: "placeholder",
          path: sitePath,
          server: server2.arn
        },
        _dev: {
          ...dev.outputs,
          aws: { role: server2.nodes.role.arn }
        }
      });
      return;
    }
    const outputPath = buildApp(
      self,
      name,
      args,
      sitePath,
      buildCommand ?? void 0
    );
    const bucket = createS3Bucket();
    const plan = validatePlan(
      this.buildPlan(outputPath, name, args, { bucket })
    );
    const timeout = all21([serverTimeout, plan.server]).apply(
      ([argsTimeout, plan2]) => argsTimeout ?? plan2?.timeout ?? "20 seconds"
    );
    const servers = createServers();
    const imageOptimizer = createImageOptimizer();
    const assetsUploaded = uploadAssets();
    const kvNamespace = buildKvNamespace2();
    let distribution;
    let distributionId;
    let kvStoreArn;
    let invalidationDependsOn = [];
    let prodUrl;
    if (route) {
      kvStoreArn = route.routerKvStoreArn;
      distributionId = route.routerDistributionId;
      invalidationDependsOn = [updateRouterKvRoutes()];
      prodUrl = route.routerUrl;
    } else {
      kvStoreArn = createRequestKvStore();
      distribution = createDistribution();
      distributionId = distribution.nodes.distribution.id;
      prodUrl = distribution.domainUrl.apply(
        (domainUrl) => output29(domainUrl ?? distribution.url)
      );
    }
    function createCachePolicy() {
      return new cloudfront4.CachePolicy(
        `${name}ServerCachePolicy`,
        {
          comment: "SST server response cache policy",
          defaultTtl: 0,
          maxTtl: 31536e3,
          // 1 year
          minTtl: 0,
          parametersInCacheKeyAndForwardedToOrigin: {
            cookiesConfig: {
              cookieBehavior: "none"
            },
            headersConfig: {
              headerBehavior: "whitelist",
              headers: {
                items: ["x-open-next-cache-key"]
              }
            },
            queryStringsConfig: {
              queryStringBehavior: "all"
            },
            enableAcceptEncodingBrotli: true,
            enableAcceptEncodingGzip: true
          }
        },
        { parent: self }
      );
    }
    function createRequestKvStore() {
      return edge.apply((edge2) => {
        const viewerRequest = edge2?.viewerRequest;
        if (viewerRequest?.kvStore) return output29(viewerRequest?.kvStore);
        return new cloudfront4.KeyValueStore(
          `${name}KvStore`,
          {},
          { parent: self }
        ).arn;
      });
    }
    function createRequestFunction() {
      return edge.apply((edge2) => {
        const userInjection = edge2?.viewerRequest?.injection ?? "";
        const blockCloudfrontUrlInjection = args.domain ? CF_BLOCK_CLOUDFRONT_URL_INJECTION : "";
        return new cloudfront4.Function(
          `${name}CloudfrontFunctionRequest`,
          {
            runtime: "cloudfront-js-2.0",
            keyValueStoreAssociations: kvStoreArn ? [kvStoreArn] : [],
            code: interpolate10`
import cf from "cloudfront";
async function handler(event) {
  ${userInjection}
  ${blockCloudfrontUrlInjection}
  ${CF_ROUTER_INJECTION}

  const kvNamespace = "${kvNamespace}";

  // Load metadata
  let metadata;
  try {
    const v = await cf.kvs().get(kvNamespace + ":metadata");
    metadata = JSON.parse(v);
  } catch (e) {}

  await routeSite(kvNamespace, metadata);
  return event.request;
}`
          },
          { parent: self }
        );
      });
    }
    function createResponseFunction() {
      return edge.apply((edge2) => {
        const userConfig = edge2?.viewerResponse;
        const userInjection = userConfig?.injection;
        const kvStoreArn2 = userConfig?.kvStore;
        if (!userInjection) return;
        return new cloudfront4.Function(
          `${name}CloudfrontFunctionResponse`,
          {
            runtime: "cloudfront-js-2.0",
            keyValueStoreAssociations: kvStoreArn2 ? [kvStoreArn2] : [],
            code: `
import cf from "cloudfront";
async function handler(event) {
  ${userInjection}
  return event.response;
}`
          },
          { parent: self }
        );
      });
    }
    function createDistribution() {
      return new Cdn(
        ...transform(
          args.transform?.cdn,
          `${name}Cdn`,
          {
            comment: `${name} app`,
            domain: args.domain,
            origins: [
              {
                originId: "default",
                domainName: "placeholder.sst.dev",
                customOriginConfig: {
                  httpPort: 80,
                  httpsPort: 443,
                  originProtocolPolicy: "http-only",
                  originReadTimeout: 20,
                  originSslProtocols: ["TLSv1.2"]
                }
              }
            ],
            defaultCacheBehavior: {
              targetOriginId: "default",
              viewerProtocolPolicy: "redirect-to-https",
              allowedMethods: [
                "DELETE",
                "GET",
                "HEAD",
                "OPTIONS",
                "PATCH",
                "POST",
                "PUT"
              ],
              cachedMethods: ["GET", "HEAD"],
              compress: true,
              cachePolicyId: args.cachePolicy ?? createCachePolicy().id,
              // CloudFront's Managed-AllViewerExceptHostHeader policy
              originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac",
              functionAssociations: all21([
                createRequestFunction(),
                createResponseFunction()
              ]).apply(([reqFn, resFn]) => [
                { eventType: "viewer-request", functionArn: reqFn.arn },
                ...resFn ? [{ eventType: "viewer-response", functionArn: resFn.arn }] : []
              ])
            }
          },
          { parent: self }
        )
      );
    }
    const kvUpdated = createKvEntries();
    createInvalidation();
    const server = servers.apply((servers2) => servers2[0]?.server);
    this.bucket = bucket;
    this.cdn = distribution;
    this.server = server;
    this.prodUrl = prodUrl;
    this.registerOutputs({
      _hint: this.url,
      _metadata: {
        mode: "deployed",
        path: sitePath,
        url: this.url,
        edge: false,
        server: server.arn
      },
      _dev: {
        ...dev.outputs,
        aws: { role: server.nodes.role.arn }
      }
    });
    function validateDeprecatedProps() {
      if (args.cdn !== void 0)
        throw new VisibleError(
          `"cdn" prop is deprecated. Use the "route.router" prop instead to use an existing "Router" component to serve your site.`
        );
    }
    function normalizeDev() {
      const enabled = false;
      const devArgs = args.dev || {};
      return {
        enabled,
        url: output29(devArgs.url ?? URL_UNAVAILABLE),
        outputs: {
          title: devArgs.title,
          command: output29(devArgs.command ?? "npm run dev"),
          autostart: output29(devArgs.autostart ?? true),
          directory: output29(devArgs.directory ?? sitePath),
          environment: args.environment,
          links: output29(args.link || []).apply(Link.build).apply((links) => links.map((link) => link.name))
        }
      };
    }
    function normalizeSitePath() {
      return output29(args.path).apply((sitePath2) => {
        if (!sitePath2) return ".";
        if (!fs3.existsSync(sitePath2)) {
          throw new VisibleError(
            `Site directory not found at "${path5.resolve(
              sitePath2
            )}". Please check the path setting in your configuration.`
          );
        }
        return sitePath2;
      });
    }
    function normalizeRegions() {
      return output29(
        args.regions ?? [getRegionOutput2(void 0, { parent: self }).name]
      ).apply((regions2) => {
        if (regions2.length === 0)
          throw new VisibleError(
            "No deployment regions specified. Please specify at least one region in the 'regions' property."
          );
        return regions2.map((region) => {
          if ([
            "ap-south-2",
            "ap-southeast-4",
            "ap-southeast-5",
            "ca-west-1",
            "eu-south-2",
            "eu-central-2",
            "il-central-1",
            "me-central-1"
          ].includes(region))
            throw new VisibleError(
              `Region ${region} is not supported by this component. Please select a different AWS region.`
            );
          if (!Object.values(Region2).includes(region))
            throw new VisibleError(
              `Invalid AWS region: "${region}". Please specify a valid AWS region.`
            );
          return region;
        });
      });
    }
    function normalizeRoute() {
      const route2 = normalizeRouteArgs(args.router, args.route);
      if (route2) {
        if (args.domain)
          throw new VisibleError(
            `Cannot provide both "domain" and "route". Use the "domain" prop on the "Router" component when serving your site through a Router.`
          );
        if (args.edge)
          throw new VisibleError(
            `Cannot provide both "edge" and "route". Use the "edge" prop on the "Router" component when serving your site through a Router.`
          );
      }
      return route2;
    }
    function normalizeEdge() {
      return output29([args.edge, args.server?.edge]).apply(
        ([edge2, serverEdge]) => {
          if (serverEdge)
            throw new VisibleError(
              `The "server.edge" prop is deprecated. Use the "edge" prop on the top level instead.`
            );
          if (!edge2) return edge2;
          return edge2;
        }
      );
    }
    function normalizeServerTimeout() {
      return output29(args.server?.timeout).apply((v) => {
        if (!v) return v;
        const seconds = toSeconds(v);
        if (seconds > 60) {
          getQuota("cloudfront-response-timeout").apply((quota) => {
            if (seconds > quota)
              throw new VisibleError(
                `Server timeout for "${name}" is longer than the allowed CloudFront response timeout of ${quota} seconds. You can contact AWS Support to increase the timeout - ${CONSOLE_URL}`
              );
          });
        }
        return v;
      });
    }
    function createDevServer() {
      return new Function(
        ...transform(
          args.transform?.server,
          `${name}DevServer`,
          {
            description: `${name} dev server`,
            runtime: "nodejs20.x",
            timeout: "20 seconds",
            memory: "128 MB",
            bundle: path5.join(
              define_cli_default.paths.platform,
              "functions",
              "empty-function"
            ),
            handler: "index.handler",
            environment: args.environment,
            permissions: args.permissions,
            link: args.link,
            dev: false
          },
          { parent: self }
        )
      );
    }
    function validatePlan(plan2) {
      return all21([plan2, route]).apply(([plan3, route2]) => {
        if (plan3.base) {
          plan3.base = !plan3.base.startsWith("/") ? `/${plan3.base}` : plan3.base;
          plan3.base = plan3.base.replace(/\/$/, "");
        }
        if (route2?.pathPrefix && route2.pathPrefix !== "/") {
          if (!plan3.base)
            throw new VisibleError(
              `No base path found for site. You must configure the base path to match the route path prefix "${route2.pathPrefix}".`
            );
          if (!plan3.base.startsWith(route2.pathPrefix))
            throw new VisibleError(
              `The site base path "${plan3.base}" must start with the route path prefix "${route2.pathPrefix}".`
            );
        }
        plan3.assets.forEach((copy) => {
          copy.to = copy.to.replace(/^\/|\/$/g, "");
        });
        if (plan3.isrCache) {
          plan3.isrCache.to = plan3.isrCache.to.replace(/^\/|\/$/g, "");
        }
        return plan3;
      });
    }
    function createS3Bucket() {
      return new Bucket(
        ...transform(
          args.transform?.assets,
          `${name}Assets`,
          { access: "cloudfront" },
          { parent: self, retainOnDelete: false }
        )
      );
    }
    function createServers() {
      return all21([regions, plan.server]).apply(([regions2, planServer]) => {
        if (!planServer) return [];
        return regions2.map((region) => {
          const provider = useProvider(region);
          const server2 = new Function(
            ...transform(
              args.transform?.server,
              `${name}Server${logicalName(region)}`,
              {
                ...planServer,
                description: planServer.description ?? `${name} server`,
                runtime: output29(args.server?.runtime).apply(
                  (v) => v ?? planServer.runtime ?? "nodejs20.x"
                ),
                timeout,
                memory: output29(args.server?.memory).apply(
                  (v) => v ?? planServer.memory ?? "1024 MB"
                ),
                architecture: output29(args.server?.architecture).apply(
                  (v) => v ?? planServer.architecture ?? "x86_64"
                ),
                vpc: args.vpc,
                nodejs: {
                  format: "esm",
                  install: args.server?.install,
                  loader: args.server?.loader,
                  ...planServer.nodejs
                },
                environment: output29(args.environment).apply((environment) => ({
                  ...environment,
                  ...planServer.environment
                })),
                permissions: output29(args.permissions).apply((permissions) => [
                  {
                    actions: ["cloudfront:CreateInvalidation"],
                    resources: ["*"]
                  },
                  ...permissions ?? [],
                  ...planServer.permissions ?? []
                ]),
                injections: [
                  ...args.warm ? [useServerWarmingInjection(planServer.streaming)] : [],
                  ...planServer.injections || []
                ],
                link: output29(args.link).apply((link) => [
                  ...planServer.link ?? [],
                  ...link ?? []
                ]),
                layers: output29(args.server?.layers).apply((layers) => [
                  ...planServer.layers ?? [],
                  ...layers ?? []
                ]),
                url: true,
                dev: false,
                _skipHint: true
              },
              { provider, parent: self }
            )
          );
          if (args.warm) {
            const cron = new Cron(
              `${name}Warmer${logicalName(region)}`,
              {
                schedule: "rate(5 minutes)",
                job: {
                  description: `${name} warmer`,
                  bundle: path5.join(define_cli_default.paths.platform, "dist", "ssr-warmer"),
                  runtime: "nodejs20.x",
                  handler: "index.handler",
                  timeout: "900 seconds",
                  memory: "128 MB",
                  dev: false,
                  environment: {
                    FUNCTION_NAME: server2.nodes.function.name,
                    CONCURRENCY: output29(args.warm).apply(
                      (warm) => warm.toString()
                    )
                  },
                  link: [server2],
                  _skipMetadata: true
                },
                transform: {
                  target: (args2) => {
                    args2.retryPolicy = {
                      maximumRetryAttempts: 0,
                      maximumEventAgeInSeconds: 60
                    };
                  }
                }
              },
              { provider, parent: self }
            );
            new lambda8.Invocation(
              `${name}Prewarm${logicalName(region)}`,
              {
                functionName: cron.nodes.job.name,
                triggers: {
                  version: Date.now().toString()
                },
                input: JSON.stringify({})
              },
              { provider, parent: self }
            );
          }
          return { region, server: server2 };
        });
      });
    }
    function createImageOptimizer() {
      return output29(plan.imageOptimizer).apply((imageOptimizer2) => {
        if (!imageOptimizer2) return;
        return new Function(
          `${name}ImageOptimizer`,
          {
            timeout: "25 seconds",
            logging: {
              retention: "3 days"
            },
            permissions: [
              {
                actions: ["s3:GetObject"],
                resources: [interpolate10`${bucket.arn}/*`]
              }
            ],
            ...imageOptimizer2.function,
            url: true,
            dev: false,
            _skipMetadata: true,
            _skipHint: true
          },
          { parent: self }
        );
      });
    }
    function useServerWarmingInjection(streaming) {
      return [
        `if (event.type === "warmer") {`,
        `  const p = new Promise((resolve) => {`,
        `    setTimeout(() => {`,
        `      resolve({ serverId: "server-" + Math.random().toString(36).slice(2, 8) });`,
        `    }, event.delay);`,
        `  });`,
        ...streaming ? [
          `  const response = await p;`,
          `  responseStream.write(JSON.stringify(response));`,
          `  responseStream.end();`,
          `  return;`
        ] : [`  return p;`],
        `}`
      ].join("\n");
    }
    function uploadAssets() {
      return all21([args.assets, route, plan, outputPath]).apply(
        async ([assets, route2, plan2, outputPath2]) => {
          const versionedFilesTTL = 31536e3;
          const nonVersionedFilesTTL = 86400;
          const bucketFiles = [];
          for (const copy of [
            ...plan2.assets,
            ...plan2.isrCache ? [{ ...plan2.isrCache, versionedSubDir: void 0 }] : []
          ]) {
            const fileOptions = [
              // unversioned files
              {
                files: "**",
                ignore: copy.versionedSubDir ? toPosix(path5.join(copy.versionedSubDir, "**")) : void 0,
                cacheControl: assets?.nonVersionedFilesCacheHeader ?? `public,max-age=0,s-maxage=${nonVersionedFilesTTL},stale-while-revalidate=${nonVersionedFilesTTL}`
              },
              // versioned files
              ...copy.versionedSubDir ? [
                {
                  files: toPosix(path5.join(copy.versionedSubDir, "**")),
                  cacheControl: assets?.versionedFilesCacheHeader ?? `public,max-age=${versionedFilesTTL},immutable`
                }
              ] : [],
              ...assets?.fileOptions ?? []
            ];
            const filesUploaded = [];
            for (const fileOption of fileOptions.reverse()) {
              const files = globSync(fileOption.files, {
                cwd: path5.resolve(outputPath2, copy.from),
                nodir: true,
                dot: true,
                ignore: fileOption.ignore
              }).filter((file) => !filesUploaded.includes(file));
              bucketFiles.push(
                ...await Promise.all(
                  files.map(async (file) => {
                    const source = path5.resolve(outputPath2, copy.from, file);
                    const content = await fs3.promises.readFile(source, "utf-8");
                    const hash = crypto5.createHash("sha256").update(content).digest("hex");
                    return {
                      source,
                      key: toPosix(
                        path5.join(
                          copy.to,
                          route2?.pathPrefix?.replace(/^\//, "") ?? "",
                          file
                        )
                      ),
                      hash,
                      cacheControl: fileOption.cacheControl,
                      contentType: fileOption.contentType ?? getContentType(file, "UTF-8")
                    };
                  })
                )
              );
              filesUploaded.push(...files);
            }
          }
          return new BucketFiles(
            `${name}AssetFiles`,
            {
              bucketName: bucket.name,
              files: bucketFiles,
              purge,
              region: getRegionOutput2(void 0, { parent: self }).name
            },
            { parent: self }
          );
        }
      );
    }
    function buildKvNamespace2() {
      return crypto5.createHash("md5").update(`${define_app_default.name}-${define_app_default.stage}-${name}`).digest("hex").substring(0, 4);
    }
    function createKvEntries() {
      const entries = all21([
        servers,
        imageOptimizer,
        outputPath,
        plan,
        bucket.nodes.bucket.bucketRegionalDomainName,
        timeout
      ]).apply(
        ([servers2, imageOptimizer2, outputPath2, plan2, bucketDomain, timeout2]) => all21([
          servers2.map((s) => ({ region: s.region, url: s.server.url })),
          imageOptimizer2?.url
        ]).apply(([servers3, imageOptimizerUrl]) => {
          const kvEntries = {};
          const dirs = [];
          const expandDirs = [".well-known"];
          plan2.assets.forEach((copy) => {
            const processDir = (childPath = "", level = 0) => {
              const currentPath = path5.join(outputPath2, copy.from, childPath);
              fs3.readdirSync(currentPath, { withFileTypes: true }).forEach(
                (item) => {
                  if (item.isFile()) {
                    kvEntries[toPosix(path5.join("/", childPath, item.name))] = "s3";
                    return;
                  }
                  if (level === 0 && (expandDirs.includes(item.name) || item.name === copy.deepRoute)) {
                    processDir(path5.join(childPath, item.name), level + 1);
                    return;
                  }
                  dirs.push(toPosix(path5.join("/", childPath, item.name)));
                }
              );
            };
            processDir();
          });
          kvEntries["metadata"] = JSON.stringify({
            base: plan2.base,
            custom404: plan2.custom404,
            s3: {
              domain: bucketDomain,
              dir: plan2.assets[0].to ? "/" + plan2.assets[0].to : "",
              routes: dirs
            },
            image: imageOptimizerUrl ? {
              host: new URL(imageOptimizerUrl).host,
              route: plan2.imageOptimizer.prefix
            } : void 0,
            servers: servers3.map((s) => [
              new URL(s.url).host,
              supportedRegions[s.region].lat,
              supportedRegions[s.region].lon
            ]),
            origin: {
              timeouts: {
                readTimeout: toSeconds(timeout2)
              }
            }
          });
          return kvEntries;
        })
      );
      return new KvKeys(
        `${name}KvKeys`,
        {
          store: kvStoreArn,
          namespace: kvNamespace,
          entries,
          purge
        },
        { parent: self }
      );
    }
    function updateRouterKvRoutes() {
      return new KvRoutesUpdate(
        `${name}RoutesUpdate`,
        {
          store: route.routerKvStoreArn,
          namespace: route.routerKvNamespace,
          key: "routes",
          entry: route.apply(
            (route2) => ["site", kvNamespace, route2.hostPattern, route2.pathPrefix].join(
              ","
            )
          )
        },
        { parent: self }
      );
    }
    function createInvalidation() {
      all21([args.invalidation, outputPath, plan]).apply(
        ([invalidationRaw, outputPath2, plan2]) => {
          if (invalidationRaw === false) return;
          const invalidation = {
            wait: false,
            paths: "all",
            ...invalidationRaw
          };
          const s3Origin = plan2.assets;
          const cachedS3Files = s3Origin.filter((file) => file.cached);
          if (cachedS3Files.length === 0) return;
          const invalidationPaths = [];
          if (invalidation.paths === "all") {
            invalidationPaths.push("/*");
          } else if (invalidation.paths === "versioned") {
            cachedS3Files.forEach((item) => {
              if (!item.versionedSubDir) return;
              invalidationPaths.push(
                toPosix(path5.join("/", item.to, item.versionedSubDir, "*"))
              );
            });
          } else {
            invalidationPaths.push(...invalidation?.paths || []);
          }
          if (invalidationPaths.length === 0) return;
          let invalidationBuildId;
          if (plan2.buildId) {
            invalidationBuildId = plan2.buildId;
          } else {
            const hash = crypto5.createHash("md5");
            cachedS3Files.forEach((item) => {
              if (item.versionedSubDir) {
                globSync("**", {
                  dot: true,
                  nodir: true,
                  follow: true,
                  cwd: path5.resolve(
                    outputPath2,
                    item.from,
                    item.versionedSubDir
                  )
                }).forEach((filePath) => hash.update(filePath));
              }
              if (invalidation.paths !== "versioned") {
                globSync("**", {
                  ignore: item.versionedSubDir ? [toPosix(path5.join(item.versionedSubDir, "**"))] : void 0,
                  dot: true,
                  nodir: true,
                  follow: true,
                  cwd: path5.resolve(outputPath2, item.from)
                }).forEach(
                  (filePath) => hash.update(
                    fs3.readFileSync(
                      path5.resolve(outputPath2, item.from, filePath),
                      "utf-8"
                    )
                  )
                );
              }
            });
            invalidationBuildId = hash.digest("hex");
          }
          new DistributionInvalidation(
            `${name}Invalidation`,
            {
              distributionId,
              paths: invalidationPaths,
              version: invalidationBuildId,
              wait: invalidation.wait
            },
            {
              parent: self,
              dependsOn: [assetsUploaded, kvUpdated, ...invalidationDependsOn]
            }
          );
        }
      );
    }
  }
  /**
   * The URL of the Astro site.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return all21([this.prodUrl, this.devUrl]).apply(
      ([prodUrl, devUrl]) => prodUrl ?? devUrl
    );
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The AWS Lambda server function that renders the site.
       */
      server: this.server,
      /**
       * The Amazon S3 Bucket that stores the assets.
       */
      assets: this.bucket,
      /**
       * The Amazon CloudFront CDN that serves the site.
       */
      cdn: this.cdn
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url
      }
    };
  }
};

// .sst/platform/src/components/aws/analog.ts
var Analog = class extends SsrSite {
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType21, name, args, opts);
  }
  normalizeBuildCommand() {
  }
  buildPlan(outputPath) {
    return outputPath.apply((outputPath2) => {
      const nitro = JSON.parse(
        fs4.readFileSync(
          path6.join(outputPath2, "dist", "analog", "nitro.json"),
          "utf-8"
        )
      );
      if (!["aws-lambda"].includes(nitro.preset)) {
        throw new VisibleError(
          `Analog's vite.config.ts must be configured to use the "aws-lambda" preset. It is currently set to "${nitro.preset}".`
        );
      }
      const basepath = fs4.readFileSync(path6.join(outputPath2, "vite.config.ts"), "utf-8").match(/base: ['"](.*)['"]/)?.[1];
      return {
        base: basepath,
        server: {
          description: "Server handler for Analog",
          handler: "index.handler",
          bundle: path6.join(outputPath2, "dist", "analog", "server")
        },
        assets: [
          {
            from: path6.join("dist", "analog", "public"),
            to: "",
            cached: true
          }
        ]
      };
    });
  }
  /**
   * The URL of the Analog app.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
};
var __pulumiType21 = "sst:aws:Analog";
Analog.__pulumiType = __pulumiType21;

// .sst/platform/src/components/aws/apigatewayv1.ts
import {
  all as all22,
  interpolate as interpolate15,
  output as output35
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/apigatewayv1-lambda-route.ts
import {
  interpolate as interpolate12,
  output as output31
} from "@pulumi/pulumi";
import { apigateway as apigateway2, lambda as lambda9 } from "@pulumi/aws";

// .sst/platform/src/components/aws/apigatewayv1-base-route.ts
import { output as output30 } from "@pulumi/pulumi";
import { apigateway } from "@pulumi/aws";
function createMethod(name, args, parent) {
  const { api, method, resourceId, auth, apiKey } = args;
  const authArgs = output30(auth).apply((auth2) => {
    if (!auth2) return { authorization: "NONE" };
    if (auth2.iam) return { authorization: "AWS_IAM" };
    if (auth2.custom)
      return { authorization: "CUSTOM", authorizerId: auth2.custom };
    if (auth2.cognito)
      return {
        authorization: "COGNITO_USER_POOLS",
        authorizerId: auth2.cognito.authorizer,
        authorizationScopes: auth2.cognito.scopes
      };
    return { authorization: "NONE" };
  });
  return authArgs.apply(
    (authArgs2) => new apigateway.Method(
      ...transform(
        args.transform?.method,
        `${name}Method`,
        {
          restApi: output30(api).id,
          resourceId,
          httpMethod: method,
          authorization: authArgs2.authorization,
          authorizerId: authArgs2.authorizerId,
          authorizationScopes: authArgs2.authorizationScopes,
          apiKeyRequired: apiKey
        },
        { parent }
      )
    )
  );
}

// .sst/platform/src/components/aws/apigatewayv1-lambda-route.ts
var ApiGatewayV1LambdaRoute = class extends Component {
  fn;
  permission;
  method;
  integration;
  constructor(name, args, opts) {
    super(__pulumiType22, name, args, opts);
    const self = this;
    const api = output31(args.api);
    const method = createMethod(name, args, self);
    const fn = createFunction();
    const permission2 = createPermission();
    const integration = createIntegration();
    this.fn = fn;
    this.permission = permission2;
    this.method = method;
    this.integration = integration;
    function createFunction() {
      const { method: method2, path: path20 } = args;
      return functionBuilder(
        `${name}Handler`,
        args.handler,
        {
          description: interpolate12`${api.name} route ${method2} ${path20}`
        },
        args.handlerTransform,
        { parent: self }
      );
    }
    function createPermission() {
      return new lambda9.Permission(
        `${name}Permissions`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn,
          principal: "apigateway.amazonaws.com",
          sourceArn: interpolate12`${api.executionArn}/*`
        },
        { parent: self }
      );
    }
    function createIntegration() {
      return new apigateway2.Integration(
        ...transform(
          args.transform?.integration,
          `${name}Integration`,
          {
            restApi: api.id,
            resourceId: args.resourceId,
            httpMethod: method.httpMethod,
            integrationHttpMethod: "POST",
            type: "AWS_PROXY",
            uri: fn.invokeArn
          },
          { parent: self, dependsOn: [permission2] }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda permission.
       */
      permission: this.permission,
      /**
       * The API Gateway REST API integration.
       */
      integration: this.integration,
      /**
       * The API Gateway REST API method.
       */
      method: this.method
    };
  }
};
var __pulumiType22 = "sst:aws:ApiGatewayV1LambdaRoute";
ApiGatewayV1LambdaRoute.__pulumiType = __pulumiType22;

// .sst/platform/src/components/aws/apigatewayv1-authorizer.ts
import {
  interpolate as interpolate13,
  output as output32
} from "@pulumi/pulumi";
import { apigateway as apigateway3, lambda as lambda10 } from "@pulumi/aws";
var ApiGatewayV1Authorizer = class extends Component {
  authorizer;
  fn;
  constructor(name, args, opts = {}) {
    super(__pulumiType23, name, args, opts);
    const self = this;
    const api = output32(args.api);
    validateSingleAuthorizer();
    const type = getType();
    const fn = createFunction();
    const authorizer = createAuthorizer();
    createPermission();
    this.fn = fn;
    this.authorizer = authorizer;
    function validateSingleAuthorizer() {
      const authorizers = [
        args.requestFunction,
        args.tokenFunction,
        args.userPools
      ].filter((e) => e);
      if (authorizers.length === 0)
        throw new VisibleError(
          `Please provide one of "requestFunction", "tokenFunction", or "userPools" for the ${args.name} authorizer.`
        );
      if (authorizers.length > 1) {
        throw new VisibleError(
          `Please provide only one of "requestFunction", "tokenFunction", or "userPools" for the ${args.name} authorizer.`
        );
      }
    }
    function getType() {
      if (args.tokenFunction) return "TOKEN";
      if (args.requestFunction) return "REQUEST";
      if (args.userPools) return "COGNITO_USER_POOLS";
    }
    function createFunction() {
      const fn2 = args.tokenFunction ?? args.requestFunction;
      if (!fn2) return;
      return functionBuilder(
        `${name}Handler`,
        fn2,
        {
          description: interpolate13`${api.name} authorizer`
        },
        void 0,
        { parent: self }
      );
    }
    function createPermission() {
      if (!fn) return;
      return new lambda10.Permission(
        `${name}Permission`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn,
          principal: "apigateway.amazonaws.com",
          sourceArn: interpolate13`${api.executionArn}/authorizers/${authorizer.id}`
        },
        { parent: self }
      );
    }
    function createAuthorizer() {
      return new apigateway3.Authorizer(
        ...transform(
          args.transform?.authorizer,
          `${name}Authorizer`,
          {
            restApi: api.id,
            type,
            name: args.name,
            providerArns: args.userPools,
            authorizerUri: fn?.invokeArn,
            authorizerResultTtlInSeconds: args.ttl,
            identitySource: args.identitySource
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The ID of the authorizer.
   */
  get id() {
    return this.authorizer.id;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The API Gateway Authorizer.
       */
      authorizer: this.authorizer,
      /**
       * The Lambda function used by the authorizer.
       */
      get function() {
        if (!self.fn)
          throw new VisibleError(
            "Cannot access `nodes.function` because the data source does not use a Lambda function."
          );
        return self.fn.apply((fn) => fn.getFunction());
      }
    };
  }
};
var __pulumiType23 = "sst:aws:ApiGatewayV1Authorizer";
ApiGatewayV1Authorizer.__pulumiType = __pulumiType23;

// .sst/platform/src/components/aws/helpers/apigateway-account.ts
import { getPartitionOutput as getPartitionOutput3, apigateway as apigateway4, iam as iam8 } from "@pulumi/aws";
import {
  jsonStringify as jsonStringify6,
  interpolate as interpolate14
} from "@pulumi/pulumi";
function setupApiGatewayAccount(namePrefix, opts) {
  const account = apigateway4.Account.get(
    `${namePrefix}APIGatewayAccount`,
    "APIGatewayAccount",
    void 0,
    { provider: opts.provider }
  );
  return account.cloudwatchRoleArn.apply((arn) => {
    if (arn) return account;
    const partition = getPartitionOutput3(void 0, opts).partition;
    const role = new iam8.Role(
      `APIGatewayPushToCloudWatchLogsRole`,
      {
        assumeRolePolicy: jsonStringify6({
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Principal: {
                Service: "apigateway.amazonaws.com"
              },
              Action: "sts:AssumeRole"
            }
          ]
        }),
        managedPolicyArns: [
          interpolate14`arn:${partition}:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs`
        ]
      },
      { retainOnDelete: true, provider: opts.provider }
    );
    return new apigateway4.Account(
      `${namePrefix}APIGatewayAccountSetup`,
      {
        cloudwatchRoleArn: role.arn
      },
      { provider: opts.provider }
    );
  });
}

// .sst/platform/src/components/aws/apigatewayv1.ts
import { apigateway as apigateway8, cloudwatch as cloudwatch3, getRegionOutput as getRegionOutput3 } from "@pulumi/aws";

// .sst/platform/src/components/aws/apigatewayv1-integration-route.ts
import {
  output as output33
} from "@pulumi/pulumi";
import { apigateway as apigateway5 } from "@pulumi/aws";
var ApiGatewayV1IntegrationRoute = class extends Component {
  method;
  integration;
  constructor(name, args, opts) {
    super(__pulumiType24, name, args, opts);
    const self = this;
    const api = output33(args.api);
    const method = createMethod(name, args, self);
    const integration = createIntegration();
    this.method = method;
    this.integration = integration;
    function createIntegration() {
      return new apigateway5.Integration(
        ...transform(
          args.transform?.integration,
          `${name}Integration`,
          {
            restApi: api.id,
            resourceId: args.resourceId,
            httpMethod: method.httpMethod,
            ...args.integration,
            type: output33(args.integration.type).apply(
              (v) => v.toUpperCase().replaceAll("-", "_")
            ),
            passthroughBehavior: args.integration.passthroughBehavior && output33(args.integration.passthroughBehavior).apply(
              (v) => v.toUpperCase().replaceAll("-", "_")
            )
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The API Gateway REST API integration.
       */
      integration: this.integration,
      /**
       * The API Gateway REST API method.
       */
      method: this.method
    };
  }
};
var __pulumiType24 = "sst:aws:ApiGatewayV1IntegrationRoute";
ApiGatewayV1IntegrationRoute.__pulumiType = __pulumiType24;

// .sst/platform/src/components/aws/apigatewayv1-usage-plan.ts
import { apigateway as apigateway7 } from "@pulumi/aws";
import { output as output34 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/apigatewayv1-api-key.ts
import { apigateway as apigateway6 } from "@pulumi/aws";
var ApiGatewayV1ApiKey = class extends Component {
  key;
  constructor(name, args, opts = {}) {
    super(__pulumiType25, name, args, opts);
    const self = this;
    this.key = new apigateway6.ApiKey(
      `${name}ApiKey`,
      {
        value: args.value
      },
      { parent: self }
    );
    new apigateway6.UsagePlanKey(
      `${name}UsagePlanKey`,
      {
        keyId: this.key.id,
        keyType: "API_KEY",
        usagePlanId: args.usagePlanId
      },
      { parent: self }
    );
  }
  /**
   * The API key value.
   */
  get value() {
    return this.key.value;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The API Gateway API Key.
       */
      apiKey: this.key
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        value: this.value
      }
    };
  }
};
var __pulumiType25 = "sst:aws:ApiGatewayV1ApiKey";
ApiGatewayV1ApiKey.__pulumiType = __pulumiType25;

// .sst/platform/src/components/aws/apigatewayv1-usage-plan.ts
var ApiGatewayV1UsagePlan = class extends Component {
  constructorArgs;
  constructorOpts;
  plan;
  constructor(name, args, opts = {}) {
    super(__pulumiType26, name, args, opts);
    const self = this;
    this.plan = new apigateway7.UsagePlan(
      `${name}UsagePlan`,
      {
        apiStages: [{ apiId: args.apiId, stage: args.apiStage }],
        quotaSettings: args.quota && output34(args.quota).apply((quota) => ({
          limit: quota.limit,
          period: quota.period.toUpperCase(),
          offset: quota.offset
        })),
        throttleSettings: args.throttle && output34(args.throttle).apply((throttle) => ({
          burstLimit: throttle.burst,
          rateLimit: throttle.rate
        }))
      },
      { parent: self }
    );
    this.constructorArgs = args;
    this.constructorOpts = opts;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The API Gateway Usage Plan.
       */
      usagePlan: this.plan
    };
  }
  /**
   * Add an API key to the API Gateway usage plan.
   *
   * @param name The name of the API key.
   * @param args Configure the API key.
   * @example
   * ```js title="sst.config.ts"
   * plan.addApiKey("MyKey", {
   *   value: "d41d8cd98f00b204e9800998ecf8427e",
   * });
   * ```
   */
  addApiKey(name, args) {
    return new ApiGatewayV1ApiKey(
      name,
      {
        apiId: this.constructorArgs.apiId,
        usagePlanId: this.plan.id,
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
};
var __pulumiType26 = "sst:aws:ApiGatewayV1UsagePlan";
ApiGatewayV1UsagePlan.__pulumiType = __pulumiType26;

// .sst/platform/src/components/aws/apigatewayv1.ts
var ApiGatewayV1 = class extends Component {
  constructorName;
  constructorArgs;
  constructorOpts;
  api;
  apigDomain;
  apiMapping;
  region;
  resources = {};
  routes = [];
  stage;
  logGroup;
  endpointType;
  deployed = false;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType27, name, args, opts);
    const parent = this;
    const region = normalizeRegion();
    const endpoint = normalizeEndpoint();
    const apigAccount = setupApiGatewayAccount(name, opts);
    const api = createApi();
    this.resources["/"] = api.rootResourceId;
    this.constructorName = name;
    this.constructorArgs = args;
    this.constructorOpts = opts;
    this.api = api;
    this.region = region;
    this.endpointType = endpoint.types;
    function normalizeRegion() {
      return getRegionOutput3(void 0, { parent }).name;
    }
    function normalizeEndpoint() {
      return output35(args.endpoint).apply((endpoint2) => {
        if (!endpoint2) return { types: "EDGE" };
        if (endpoint2.type === "private" && !endpoint2.vpcEndpointIds)
          throw new VisibleError(
            "Please provide the VPC endpoint IDs for the private endpoint."
          );
        return endpoint2.type === "regional" ? { types: "REGIONAL" } : endpoint2.type === "private" ? {
          types: "PRIVATE",
          vpcEndpointIds: endpoint2.vpcEndpointIds
        } : { types: "EDGE" };
      });
    }
    function createApi() {
      return new apigateway8.RestApi(
        ...transform(
          args.transform?.api,
          `${name}Api`,
          {
            endpointConfiguration: endpoint
          },
          { parent, dependsOn: apigAccount }
        )
      );
    }
  }
  /**
   * The URL of the API.
   */
  get url() {
    return this.apigDomain && this.apiMapping ? all22([this.apigDomain.domainName, this.apiMapping.basePath]).apply(
      ([domain, key]) => key ? `https://${domain}/${key}/` : `https://${domain}`
    ) : interpolate15`https://${this.api.id}.execute-api.${this.region}.amazonaws.com/${define_app_default.stage}/`;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Amazon API Gateway REST API
       */
      api: this.api,
      /**
       * The Amazon API Gateway REST API stage
       */
      stage: this.stage,
      /**
       * The CloudWatch LogGroup for the access logs.
       */
      logGroup: this.logGroup,
      /**
       * The API Gateway REST API domain name.
       */
      get domainName() {
        if (!self.deployed)
          throw new VisibleError(
            `"nodes.domainName" is not available before the "${self.constructorName}" API is deployed.`
          );
        if (!self.apigDomain)
          throw new VisibleError(
            `"nodes.domainName" is not available when domain is not configured for the "${self.constructorName}" API.`
          );
        return self.apigDomain;
      }
    };
  }
  /**
   * Add a route to the API Gateway REST API. The route is a combination of an HTTP method and a path, `{METHOD} /{path}`.
   *
   * A method could be one of `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`, or `ANY`. Here `ANY` matches any HTTP method.
   *
   * The path can be a combination of
   * - Literal segments, `/notes`, `/notes/new`, etc.
   * - Parameter segments, `/notes/{noteId}`, `/notes/{noteId}/attachments/{attachmentId}`, etc.
   * - Greedy segments, `/{proxy+}`, `/notes/{proxy+}`,  etc. The `{proxy+}` segment is a greedy segment that matches all child paths. It needs to be at the end of the path.
   *
   * :::tip
   * The `{proxy+}` is a greedy segment, it matches all its child paths.
   * :::
   *
   * When a request comes in, the API Gateway will look for the most specific match.
   *
   * :::note
   * You cannot have duplicate routes.
   * :::
   *
   * @param route The path for the route.
   * @param handler The function that'll be invoked.
   * @param args Configure the route.
   *
   * @example
   * Add a simple route.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "src/get.handler");
   * ```
   *
   * Match any HTTP method.
   *
   * ```js title="sst.config.ts"
   * api.route("ANY /", "src/route.handler");
   * ```
   *
   * Add a default or fallback route. Here for every request other than `GET /hi`,
   * the `default.handler` function will be invoked.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /hi", "src/get.handler");
   *
   * api.route("ANY /", "src/default.handler");
   * api.route("ANY /{proxy+}", "src/default.handler");
   * ```
   *
   * The `/{proxy+}` matches any path that starts with `/`, so if you want a
   * fallback route for the root `/` path, you need to add a `ANY /` route as well.
   *
   * Add a parameterized route.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /notes/{id}", "src/get.handler");
   * ```
   *
   * Add a greedy route.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /notes/{proxy+}", "src/greedy.handler");
   * ```
   *
   * Enable auth for a route.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "src/get.handler")
   * api.route("POST /", "src/post.handler", {
   *   auth: {
   *     iam: true
   *   }
   * });
   * ```
   *
   * Customize the route handler.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", {
   *   handler: "src/get.handler",
   *   memory: "2048 MB"
   * });
   * ```
   *
   * Or pass in the ARN of an existing Lambda function.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "arn:aws:lambda:us-east-1:123456789012:function:my-function");
   * ```
   */
  route(route, handler, args = {}) {
    const { method, path: path20 } = this.parseRoute(route);
    this.createResource(path20);
    const transformed = transform(
      this.constructorArgs.transform?.route?.args,
      this.buildRouteId(method, path20),
      args,
      { provider: this.constructorOpts.provider }
    );
    const apigRoute = new ApiGatewayV1LambdaRoute(
      transformed[0],
      {
        api: {
          name: this.constructorName,
          id: this.api.id,
          executionArn: this.api.executionArn
        },
        method,
        path: path20,
        resourceId: this.resources[path20],
        handler,
        handlerTransform: this.constructorArgs.transform?.route?.handler,
        ...transformed[1]
      },
      transformed[2]
    );
    this.routes.push(apigRoute);
    return apigRoute;
  }
  /**
   * Add a custom integration to the API Gateway REST API. [Learn more about
   * integrations](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-integration-settings.html).
   *
   * @param route The path for the route.
   * @param integration The integration configuration.
   * @param args Configure the route.
   *
   * @example
   * Add a route to trigger a Step Function state machine execution.
   *
   * ```js title="sst.config.ts"
   * api.routeIntegration("POST /run-my-state-machine", {
   *   type: "aws",
   *   uri: "arn:aws:apigateway:us-east-1:states:startExecution",
   *   credentials: "arn:aws:iam::123456789012:role/apigateway-execution-role",
   *   integrationHttpMethod: "POST",
   *   requestTemplates: {
   *     "application/json": JSON.stringify({
   *       input: "$input.json('$')",
   *       stateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:MyStateMachine"
   *     })
   *   },
   *   passthroughBehavior: "when-no-match"
   * });
   * ```
   */
  routeIntegration(route, integration, args = {}) {
    const { method, path: path20 } = this.parseRoute(route);
    this.createResource(path20);
    const transformed = transform(
      this.constructorArgs.transform?.route?.args,
      this.buildRouteId(method, path20),
      args,
      { provider: this.constructorOpts.provider }
    );
    const apigRoute = new ApiGatewayV1IntegrationRoute(
      transformed[0],
      {
        api: {
          name: this.constructorName,
          id: this.api.id,
          executionArn: this.api.executionArn
        },
        method,
        path: path20,
        resourceId: this.resources[path20],
        integration,
        ...transformed[1]
      },
      transformed[2]
    );
    this.routes.push(apigRoute);
    return apigRoute;
  }
  parseRoute(route) {
    const parts = route.split(" ");
    if (parts.length !== 2) {
      throw new VisibleError(
        `Invalid route ${route}. A route must be in the format "METHOD /path".`
      );
    }
    const [methodRaw, path20] = route.split(" ");
    const method = methodRaw.toUpperCase();
    if (![
      "ANY",
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT"
    ].includes(method))
      throw new VisibleError(`Invalid method ${methodRaw} in route ${route}`);
    if (!path20.startsWith("/"))
      throw new VisibleError(
        `Invalid path ${path20} in route ${route}. Path must start with "/".`
      );
    return { method, path: path20 };
  }
  buildRouteId(method, path20) {
    const suffix = logicalName(
      hashStringToPrettyString([outputId, method, path20].join(""), 6)
    );
    return `${this.constructorName}Route${suffix}`;
  }
  createResource(path20) {
    const pathParts = path20.replace(/^\//, "").split("/");
    for (let i = 0, l = pathParts.length; i < l; i++) {
      const parentPath = "/" + pathParts.slice(0, i).join("/");
      const subPath = "/" + pathParts.slice(0, i + 1).join("/");
      if (!this.resources[subPath]) {
        const suffix = logicalName(
          hashStringToPrettyString([this.api.id, subPath].join(""), 6)
        );
        const resource = new apigateway8.Resource(
          `${this.constructorName}Resource${suffix}`,
          {
            restApi: this.api.id,
            parentId: parentPath === "/" ? this.api.rootResourceId : this.resources[parentPath],
            pathPart: pathParts[i]
          },
          { parent: this }
        );
        this.resources[subPath] = resource.id;
      }
    }
  }
  /**
   * Add an authorizer to the API Gateway REST API.
   *
   * @param args Configure the authorizer.
   * @example
   * For example, add a Lambda token authorizer.
   *
   * ```js title="sst.config.ts"
   * api.addAuthorizer({
   *   name: "myAuthorizer",
   *   tokenFunction: "src/authorizer.index"
   * });
   * ```
   *
   * Add a Lambda REQUEST authorizer.
   *
   * ```js title="sst.config.ts"
   * api.addAuthorizer({
   *   name: "myAuthorizer",
   *   requestFunction: "src/authorizer.index"
   * });
   * ```
   *
   * Add a Cognito User Pool authorizer.
   *
   * ```js title="sst.config.ts"
   * const userPool = new aws.cognito.UserPool();
   *
   * api.addAuthorizer({
   *   name: "myAuthorizer",
   *   userPools: [userPool.arn]
   * });
   * ```
   *
   * You can also customize the authorizer.
   *
   * ```js title="sst.config.ts"
   * api.addAuthorizer({
   *   name: "myAuthorizer",
   *   tokenFunction: "src/authorizer.index",
   *   ttl: 30
   * });
   * ```
   */
  addAuthorizer(args) {
    const self = this;
    const selfName = this.constructorName;
    const nameSuffix = logicalName(args.name);
    return new ApiGatewayV1Authorizer(
      `${selfName}Authorizer${nameSuffix}`,
      {
        api: {
          id: self.api.id,
          name: selfName,
          executionArn: self.api.executionArn
        },
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Add a usage plan to the API Gateway REST API.
   *
   * @param name The name of the usage plan.
   * @param args Configure the usage plan.
   * @example
   *
   * To add a usage plan to an API, you need to enable the API key for a route, and
   * then deploy the API.
   *
   * ```ts title="sst.config.ts" {4}
   * const api = new sst.aws.ApiGatewayV1("MyApi");
   *
   * api.route("GET /", "src/get.handler", {
   *   apiKey: true
   * });
   *
   * api.deploy();
   * ```
   *
   * Then define your usage plan.
   *
   * ```js title="sst.config.ts"
   * const plan = api.addUsagePlan("MyPlan", {
   *   throttle: {
   *     rate: 100,
   *     burst: 200
   *   },
   *   quota: {
   *     limit: 1000,
   *     period: "month",
   *     offset: 0
   *   }
   * });
   * ```
   *
   * And create the API key for the plan.
   *
   * ```js title="sst.config.ts"
   * const key = plan.addApiKey("MyKey");
   * ```
   *
   * You can now link the API and API key to other resources, like a function.
   *
   * ```ts title="sst.config.ts"
   * new sst.aws.Function("MyFunction", {
   *   handler: "src/lambda.handler",
   *   link: [api, key]
   * });
   * ```
   *
   * Once linked, include the key in the `x-api-key` header with your requests.
   *
   * ```ts title="src/lambda.ts"
   * import { Resource } from "sst";
   *
   * await fetch(Resource.MyApi.url, {
   *   headers: {
   *     "x-api-key": Resource.MyKey.value
   *   }
   * });
   * ```
   */
  addUsagePlan(name, args) {
    if (!this.stage)
      throw new VisibleError(
        `Cannot add a usage plan to the "${this.constructorName}" API before it's deployed. Make sure to call deploy() to deploy the API first.`
      );
    return new ApiGatewayV1UsagePlan(
      name,
      {
        apiId: this.api.id,
        apiStage: this.stage.stageName,
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Creates a deployment for the API Gateway REST API.
   *
   * :::caution
   * Your routes won't be added if `deploy` isn't called.
   * :::
   *
   * Your routes won't be added if this isn't called after you've added them. This
   * is due to a quirk in the way API Gateway V1 is created internally.
   */
  deploy() {
    const name = this.constructorName;
    const args = this.constructorArgs;
    const parent = this;
    const api = this.api;
    const routes = this.routes;
    const region = this.region;
    const endpointType = this.endpointType;
    const accessLog = normalizeAccessLog();
    const domain = normalizeDomain();
    const corsRoutes = createCorsRoutes();
    const corsResponses = createCorsResponses();
    const deployment = createDeployment();
    const logGroup = createLogGroup();
    const stage = createStage();
    const certificateArn = createSsl();
    const apigDomain = createDomainName();
    createDnsRecords();
    const apiMapping = createDomainMapping();
    this.deployed = true;
    this.logGroup = logGroup;
    this.stage = stage;
    this.apigDomain = apigDomain;
    this.apiMapping = apiMapping;
    this.registerOutputs({
      _hint: this.url
    });
    function normalizeAccessLog() {
      return output35(args.accessLog).apply((accessLog2) => ({
        ...accessLog2,
        retention: accessLog2?.retention ?? "1 month"
      }));
    }
    function normalizeDomain() {
      if (!args.domain) return;
      return output35(args.domain).apply((domain2) => {
        if (typeof domain2 !== "string") {
          if (domain2.name && domain2.nameId)
            throw new VisibleError(
              `Cannot configure both domain "name" and "nameId" for the "${name}" API.`
            );
          if (!domain2.name && !domain2.nameId)
            throw new VisibleError(
              `Either domain "name" or "nameId" is required for the "${name}" API.`
            );
          if (domain2.dns === false && !domain2.cert)
            throw new VisibleError(
              `Domain "cert" is required when "dns" is disabled for the "${name}" API.`
            );
        }
        const norm = typeof domain2 === "string" ? { name: domain2 } : domain2;
        return {
          name: norm.name,
          nameId: norm.nameId,
          path: norm.path,
          dns: norm.dns === false ? void 0 : norm.dns ?? dns(),
          cert: norm.cert
        };
      });
    }
    function createCorsRoutes() {
      const resourceIds = routes.map(
        (route) => route.nodes.integration.resourceId
      );
      return all22([args.cors, resourceIds]).apply(([cors, resourceIds2]) => {
        if (cors === false) return [];
        const uniqueResourceIds = [...new Set(resourceIds2)];
        return uniqueResourceIds.map((resourceId) => {
          const method = new apigateway8.Method(
            `${name}CorsMethod${resourceId}`,
            {
              restApi: api.id,
              resourceId,
              httpMethod: "OPTIONS",
              authorization: "NONE"
            },
            { parent }
          );
          const methodResponse = new apigateway8.MethodResponse(
            `${name}CorsMethodResponse${resourceId}`,
            {
              restApi: api.id,
              resourceId,
              httpMethod: method.httpMethod,
              statusCode: "204",
              responseParameters: {
                "method.response.header.Access-Control-Allow-Headers": true,
                "method.response.header.Access-Control-Allow-Methods": true,
                "method.response.header.Access-Control-Allow-Origin": true
              }
            },
            { parent }
          );
          const integration = new apigateway8.Integration(
            `${name}CorsIntegration${resourceId}`,
            {
              restApi: api.id,
              resourceId,
              httpMethod: method.httpMethod,
              type: "MOCK",
              requestTemplates: {
                "application/json": "{ statusCode: 200 }"
              }
            },
            { parent }
          );
          const integrationResponse = new apigateway8.IntegrationResponse(
            `${name}CorsIntegrationResponse${resourceId}`,
            {
              restApi: api.id,
              resourceId,
              httpMethod: method.httpMethod,
              statusCode: methodResponse.statusCode,
              responseParameters: {
                "method.response.header.Access-Control-Allow-Headers": "'*'",
                "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,GET,PUT,POST,DELETE,PATCH,HEAD'",
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            { parent, dependsOn: [integration] }
          );
          return { method, methodResponse, integration, integrationResponse };
        });
      });
    }
    function createCorsResponses() {
      return output35(args.cors).apply((cors) => {
        if (cors === false) return [];
        return ["4XX", "5XX"].map(
          (type) => new apigateway8.Response(
            `${name}Cors${type}Response`,
            {
              restApiId: api.id,
              responseType: `DEFAULT_${type}`,
              responseParameters: {
                "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
                "gatewayresponse.header.Access-Control-Allow-Headers": "'*'"
              },
              responseTemplates: {
                "application/json": '{"message":$context.error.messageString}'
              }
            },
            { parent }
          )
        );
      });
    }
    function createDeployment() {
      const resources = all22([corsRoutes, corsResponses]).apply(
        ([corsRoutes2, corsResponses2]) => [
          api,
          corsRoutes2.map((v) => Object.values(v)),
          corsResponses2,
          routes.map((route) => [
            route.nodes.integration,
            route.nodes.method
          ])
        ].flat(3)
      );
      const resourcesSanitized = all22([resources]).apply(
        ([resources2]) => resources2.map(
          (resource) => Object.fromEntries(
            Object.entries(resource).filter(
              ([k, v]) => !k.startsWith("_") && typeof v !== "function"
            )
          )
        )
      );
      return new apigateway8.Deployment(
        ...transform(
          args.transform?.deployment,
          `${name}Deployment`,
          {
            restApi: api.id,
            triggers: all22([resourcesSanitized]).apply(
              ([resources2]) => Object.fromEntries(
                resources2.map((resource) => [
                  resource.urn,
                  JSON.stringify(resource)
                ])
              )
            )
          },
          { parent }
        )
      );
    }
    function createLogGroup() {
      return new cloudwatch3.LogGroup(
        ...transform(
          args.transform?.accessLog,
          `${name}AccessLog`,
          {
            name: `/aws/vendedlogs/apis/${physicalName(64, name)}`,
            retentionInDays: accessLog.apply(
              (accessLog2) => RETENTION[accessLog2.retention]
            )
          },
          { parent, ignoreChanges: ["name"] }
        )
      );
    }
    function createStage() {
      return new apigateway8.Stage(
        ...transform(
          args.transform?.stage,
          `${name}Stage`,
          {
            restApi: api.id,
            stageName: define_app_default.stage,
            deployment: deployment.id,
            accessLogSettings: {
              destinationArn: logGroup.arn,
              format: JSON.stringify({
                // request info
                requestTime: `"$context.requestTime"`,
                requestId: `"$context.requestId"`,
                httpMethod: `"$context.httpMethod"`,
                path: `"$context.path"`,
                resourcePath: `"$context.resourcePath"`,
                status: `$context.status`,
                // integer value, do not wrap in quotes
                responseLatency: `$context.responseLatency`,
                // integer value, do not wrap in quotes
                xrayTraceId: `"$context.xrayTraceId"`,
                // integration info
                functionResponseStatus: `"$context.integration.status"`,
                integrationRequestId: `"$context.integration.requestId"`,
                integrationLatency: `"$context.integration.latency"`,
                integrationServiceStatus: `"$context.integration.integrationStatus"`,
                // caller info
                ip: `"$context.identity.sourceIp"`,
                userAgent: `"$context.identity.userAgent"`,
                principalId: `"$context.authorizer.principalId"`
              })
            }
          },
          { parent }
        )
      );
    }
    function createSsl() {
      if (!domain) return;
      return all22([domain, endpointType, region]).apply(
        ([domain2, endpointType2, region2]) => {
          if (domain2.cert) return output35(domain2.cert);
          if (domain2.nameId) return output35(void 0);
          return new DnsValidatedCertificate(
            `${name}Ssl`,
            {
              domainName: domain2.name,
              dns: domain2.dns
            },
            {
              parent,
              provider: endpointType2 === "EDGE" && region2 !== "us-east-1" ? useProvider("us-east-1") : void 0
            }
          ).arn;
        }
      );
    }
    function createDomainName() {
      if (!domain || !certificateArn) return;
      return all22([domain, endpointType]).apply(
        ([domain2, endpointType2]) => domain2.nameId ? apigateway8.DomainName.get(
          `${name}DomainName`,
          domain2.nameId,
          {},
          { parent }
        ) : new apigateway8.DomainName(
          ...transform(
            args.transform?.domainName,
            `${name}DomainName`,
            {
              domainName: domain2?.name,
              endpointConfiguration: { types: endpointType2 },
              ...endpointType2 === "REGIONAL" ? {
                regionalCertificateArn: certificateArn
              } : { certificateArn }
            },
            { parent }
          )
        )
      );
    }
    function createDnsRecords() {
      if (!domain || !apigDomain) return;
      domain.apply((domain2) => {
        if (!domain2.dns) return;
        if (domain2.nameId) return;
        domain2.dns.createAlias(
          name,
          {
            name: domain2.name,
            aliasName: endpointType.apply(
              (v) => v === "EDGE" ? apigDomain.cloudfrontDomainName : apigDomain.regionalDomainName
            ),
            aliasZone: endpointType.apply(
              (v) => v === "EDGE" ? apigDomain.cloudfrontZoneId : apigDomain.regionalZoneId
            )
          },
          { parent }
        );
      });
    }
    function createDomainMapping() {
      if (!domain || !apigDomain) return;
      return domain.path?.apply(
        (path20) => new apigateway8.BasePathMapping(
          `${name}DomainMapping`,
          {
            restApi: api.id,
            domainName: apigDomain.id,
            stageName: stage.stageName,
            basePath: path20
          },
          { parent }
        )
      );
    }
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url
      }
    };
  }
};
var __pulumiType27 = "sst:aws:ApiGatewayV1";
ApiGatewayV1.__pulumiType = __pulumiType27;

// .sst/platform/src/components/aws/apigatewayv2.ts
import { all as all23, output as output41 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/apigatewayv2-lambda-route.ts
import {
  interpolate as interpolate17,
  output as output37
} from "@pulumi/pulumi";
import { apigatewayv2 as apigatewayv22, lambda as lambda11 } from "@pulumi/aws";

// .sst/platform/src/components/aws/apigatewayv2-base-route.ts
import { interpolate as interpolate16, output as output36 } from "@pulumi/pulumi";
import { apigatewayv2 } from "@pulumi/aws";
function createApiRoute(name, args, integrationId, parent) {
  const authArgs = output36(args.auth).apply((auth) => {
    if (!auth) return { authorizationType: "NONE" };
    if (auth.iam) return { authorizationType: "AWS_IAM" };
    if (auth.lambda)
      return {
        authorizationType: "CUSTOM",
        authorizerId: auth.lambda
      };
    if (auth.jwt)
      return {
        authorizationType: "JWT",
        authorizationScopes: auth.jwt.scopes,
        authorizerId: auth.jwt.authorizer
      };
    return { authorizationType: "NONE" };
  });
  return authArgs.apply(
    (authArgs2) => new apigatewayv2.Route(
      ...transform(
        args.transform?.route,
        `${name}Route`,
        {
          apiId: output36(args.api).id,
          routeKey: args.route,
          target: interpolate16`integrations/${integrationId}`,
          ...authArgs2
        },
        { parent }
      )
    )
  );
}

// .sst/platform/src/components/aws/apigatewayv2-lambda-route.ts
var ApiGatewayV2LambdaRoute = class extends Component {
  fn;
  permission;
  apiRoute;
  integration;
  constructor(name, args, opts) {
    super(__pulumiType28, name, args, opts);
    const self = this;
    const api = output37(args.api);
    const route = output37(args.route);
    const fn = createFunction();
    const permission2 = createPermission();
    const integration = createIntegration();
    const apiRoute = createApiRoute(name, args, integration.id, self);
    this.fn = fn;
    this.permission = permission2;
    this.apiRoute = apiRoute;
    this.integration = integration;
    function createFunction() {
      return functionBuilder(
        `${name}Handler`,
        args.handler,
        {
          description: interpolate17`${api.name} route ${route}`,
          link: args.handlerLink
        },
        args.handlerTransform,
        { parent: self }
      );
    }
    function createPermission() {
      return new lambda11.Permission(
        `${name}Permissions`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn,
          principal: "apigateway.amazonaws.com",
          sourceArn: interpolate17`${api.executionArn}/*`
        },
        { parent: self }
      );
    }
    function createIntegration() {
      return new apigatewayv22.Integration(
        ...transform(
          args.transform?.integration,
          `${name}Integration`,
          {
            apiId: api.id,
            integrationType: "AWS_PROXY",
            integrationUri: fn.arn,
            payloadFormatVersion: "2.0"
          },
          { parent: self, dependsOn: [permission2] }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda permission.
       */
      permission: this.permission,
      /**
       * The API Gateway HTTP API route.
       */
      route: this.apiRoute,
      /**
       * The API Gateway HTTP API integration.
       */
      integration: this.integration
    };
  }
};
var __pulumiType28 = "sst:aws:ApiGatewayV2LambdaRoute";
ApiGatewayV2LambdaRoute.__pulumiType = __pulumiType28;

// .sst/platform/src/components/aws/apigatewayv2-authorizer.ts
import {
  interpolate as interpolate18,
  output as output38
} from "@pulumi/pulumi";
import { apigatewayv2 as apigatewayv23, lambda as lambda12 } from "@pulumi/aws";
var ApiGatewayV2Authorizer = class extends Component {
  authorizer;
  constructor(name, args, opts) {
    super(__pulumiType29, name, args, opts);
    const self = this;
    const api = output38(args.api);
    const lamb = args.lambda && output38(args.lambda);
    const jwt = args.jwt && output38(args.jwt);
    validateSingleAuthorizer();
    const fn = createFunction();
    const authorizer = createAuthorizer();
    createPermission();
    this.authorizer = authorizer;
    function validateSingleAuthorizer() {
      const authorizers = [lamb, jwt].filter((e) => e);
      if (authorizers.length === 0)
        throw new VisibleError(
          `Please provide one of "lambda" or "jwt" for the ${args.name} authorizer.`
        );
      if (authorizers.length > 1)
        throw new VisibleError(
          `Please provide only one of "lambda" or "jwt" for the ${args.name} authorizer.`
        );
    }
    function createFunction() {
      if (!lamb) return;
      return functionBuilder(
        `${name}Handler`,
        lamb.function,
        {
          description: interpolate18`${api.name} authorizer`
        },
        void 0,
        { parent: self }
      );
    }
    function createAuthorizer() {
      const defaultIdentitySource = args.type === "http" ? "$request.header.Authorization" : "route.request.header.Authorization";
      return new apigatewayv23.Authorizer(
        ...transform(
          args.transform?.authorizer,
          `${name}Authorizer`,
          {
            apiId: api.id,
            ...lamb ? {
              authorizerType: "REQUEST",
              identitySources: lamb.apply(
                (lamb2) => lamb2.identitySources ?? [defaultIdentitySource]
              ),
              authorizerUri: fn.invokeArn,
              ...args.type === "http" ? {
                authorizerResultTtlInSeconds: lamb.apply(
                  (lamb2) => toSeconds(lamb2.ttl ?? "0 seconds")
                ),
                authorizerPayloadFormatVersion: lamb.apply(
                  (lamb2) => lamb2.payload ?? "2.0"
                ),
                enableSimpleResponses: lamb.apply(
                  (lamb2) => (lamb2.response ?? "simple") === "simple"
                )
              } : {}
            } : {
              authorizerType: "JWT",
              identitySources: [
                jwt.apply(
                  (jwt2) => jwt2.identitySource ?? defaultIdentitySource
                )
              ],
              jwtConfiguration: jwt.apply((jwt2) => ({
                audiences: jwt2.audiences,
                issuer: jwt2.issuer
              }))
            }
          },
          { parent: self }
        )
      );
    }
    function createPermission() {
      if (!fn) return;
      return new lambda12.Permission(
        `${name}Permission`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn,
          principal: "apigateway.amazonaws.com",
          sourceArn: interpolate18`${api.executionArn}/authorizers/${authorizer.id}`
        },
        { parent: self }
      );
    }
  }
  /**
   * The ID of the authorizer.
   */
  get id() {
    return this.authorizer.id;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The API Gateway V2 authorizer.
       */
      authorizer: this.authorizer
    };
  }
};
var __pulumiType29 = "sst:aws:ApiGatewayV2Authorizer";
ApiGatewayV2Authorizer.__pulumiType = __pulumiType29;

// .sst/platform/src/components/aws/apigatewayv2.ts
import { apigatewayv2 as apigatewayv26, cloudwatch as cloudwatch4 } from "@pulumi/aws";

// .sst/platform/src/components/aws/apigatewayv2-url-route.ts
import {
  output as output39
} from "@pulumi/pulumi";
import { apigatewayv2 as apigatewayv24 } from "@pulumi/aws";
var ApiGatewayV2UrlRoute = class extends Component {
  apiRoute;
  integration;
  constructor(name, args, opts) {
    super(__pulumiType30, name, args, opts);
    const self = this;
    const api = output39(args.api);
    const integration = createIntegration();
    const apiRoute = createApiRoute(name, args, integration.id, self);
    this.apiRoute = apiRoute;
    this.integration = integration;
    function createIntegration() {
      return new apigatewayv24.Integration(
        ...transform(
          args.transform?.integration,
          `${name}Integration`,
          {
            apiId: api.id,
            integrationType: "HTTP_PROXY",
            integrationUri: args.url,
            integrationMethod: "ANY"
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The API Gateway HTTP API route.
       */
      route: this.apiRoute,
      /**
       * The API Gateway HTTP API integration.
       */
      integration: this.integration
    };
  }
};
var __pulumiType30 = "sst:aws:ApiGatewayV2UrlRoute";
ApiGatewayV2UrlRoute.__pulumiType = __pulumiType30;

// .sst/platform/src/components/aws/apigatewayv2-private-route.ts
import {
  output as output40
} from "@pulumi/pulumi";
import { apigatewayv2 as apigatewayv25 } from "@pulumi/aws";
var ApiGatewayV2PrivateRoute = class extends Component {
  apiRoute;
  integration;
  constructor(name, args, opts) {
    super(__pulumiType31, name, args, opts);
    const self = this;
    const api = output40(args.api);
    const integration = createIntegration();
    const apiRoute = createApiRoute(name, args, integration.id, self);
    this.apiRoute = apiRoute;
    this.integration = integration;
    function createIntegration() {
      return new apigatewayv25.Integration(
        ...transform(
          args.transform?.integration,
          `${name}Integration`,
          {
            apiId: api.id,
            connectionId: args.vpcLink,
            connectionType: "VPC_LINK",
            integrationType: "HTTP_PROXY",
            integrationUri: args.arn,
            integrationMethod: "ANY"
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The API Gateway HTTP API route.
       */
      route: this.apiRoute,
      /**
       * The API Gateway HTTP API integration.
       */
      integration: this.integration
    };
  }
};
var __pulumiType31 = "sst:aws:ApiGatewayV2PrivateRoute";
ApiGatewayV2PrivateRoute.__pulumiType = __pulumiType31;

// .sst/platform/src/components/aws/apigatewayv2.ts
var ApiGatewayV2 = class extends Component {
  constructorName;
  constructorArgs;
  constructorOpts;
  api;
  apigDomain;
  apiMapping;
  logGroup;
  vpcLink;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType32, name, args, opts);
    const parent = this;
    const accessLog = normalizeAccessLog();
    const domain = normalizeDomain();
    const cors = normalizeCors();
    const vpc = normalizeVpc();
    const vpcLink = createVpcLink();
    const api = createApi();
    const logGroup = createLogGroup();
    const stage = createStage();
    const certificateArn = createSsl();
    const apigDomain = createDomainName();
    createDnsRecords();
    const apiMapping = createDomainMapping();
    this.constructorName = name;
    this.constructorArgs = args;
    this.constructorOpts = opts;
    this.api = api;
    this.apigDomain = apigDomain;
    this.apiMapping = apiMapping;
    this.logGroup = logGroup;
    this.vpcLink = vpcLink;
    this.registerOutputs({
      _hint: this.url
    });
    function normalizeAccessLog() {
      return output41(args.accessLog).apply((accessLog2) => ({
        ...accessLog2,
        retention: accessLog2?.retention ?? "1 month"
      }));
    }
    function normalizeDomain() {
      if (!args.domain) return;
      return output41(args.domain).apply((domain2) => {
        if (typeof domain2 !== "string") {
          if (domain2.name && domain2.nameId)
            throw new VisibleError(
              `Cannot configure both domain "name" and "nameId" for the "${name}" API.`
            );
          if (!domain2.name && !domain2.nameId)
            throw new VisibleError(
              `Either domain "name" or "nameId" is required for the "${name}" API.`
            );
          if (domain2.dns === false && !domain2.cert)
            throw new VisibleError(
              `Domain "cert" is required when "dns" is disabled for the "${name}" API.`
            );
        }
        const norm = typeof domain2 === "string" ? { name: domain2 } : domain2;
        return {
          name: norm.name,
          nameId: norm.nameId,
          path: norm.path,
          dns: norm.dns === false ? void 0 : norm.dns ?? dns(),
          cert: norm.cert
        };
      });
    }
    function normalizeCors() {
      return output41(args.cors).apply((cors2) => {
        if (cors2 === false) return {};
        const defaultCors = {
          allowHeaders: ["*"],
          allowMethods: ["*"],
          allowOrigins: ["*"]
        };
        return cors2 === true || cors2 === void 0 ? defaultCors : {
          ...defaultCors,
          ...cors2,
          maxAge: cors2.maxAge && toSeconds(cors2.maxAge)
        };
      });
    }
    function normalizeVpc() {
      if (!args.vpc) return;
      if (args.vpc instanceof Vpc2) {
        return {
          subnets: args.vpc.publicSubnets,
          securityGroups: args.vpc.securityGroups
        };
      }
      return output41(args.vpc);
    }
    function createVpcLink() {
      if (!vpc) return;
      return new apigatewayv26.VpcLink(
        ...transform(
          args.transform?.vpcLink,
          `${name}VpcLink`,
          {
            securityGroupIds: vpc.securityGroups,
            subnetIds: vpc.subnets
          },
          { parent }
        )
      );
    }
    function createApi() {
      return new apigatewayv26.Api(
        ...transform(
          args.transform?.api,
          `${name}Api`,
          {
            protocolType: "HTTP",
            corsConfiguration: cors
          },
          { parent }
        )
      );
    }
    function createLogGroup() {
      return new cloudwatch4.LogGroup(
        ...transform(
          args.transform?.logGroup,
          `${name}AccessLog`,
          {
            name: `/aws/vendedlogs/apis/${physicalName(64, name)}`,
            retentionInDays: accessLog.apply(
              (accessLog2) => RETENTION[accessLog2.retention]
            )
          },
          { parent, ignoreChanges: ["name"] }
        )
      );
    }
    function createStage() {
      return new apigatewayv26.Stage(
        ...transform(
          args.transform?.stage,
          `${name}Stage`,
          {
            apiId: api.id,
            autoDeploy: true,
            name: "$default",
            accessLogSettings: {
              destinationArn: logGroup.arn,
              format: JSON.stringify({
                // request info
                requestTime: `"$context.requestTime"`,
                requestId: `"$context.requestId"`,
                httpMethod: `"$context.httpMethod"`,
                path: `"$context.path"`,
                routeKey: `"$context.routeKey"`,
                status: `$context.status`,
                // integer value, do not wrap in quotes
                responseLatency: `$context.responseLatency`,
                // integer value, do not wrap in quotes
                // integration info
                integrationRequestId: `"$context.integration.requestId"`,
                integrationStatus: `"$context.integration.status"`,
                integrationLatency: `"$context.integration.latency"`,
                integrationServiceStatus: `"$context.integration.integrationStatus"`,
                // caller info
                ip: `"$context.identity.sourceIp"`,
                userAgent: `"$context.identity.userAgent"`
                //cognitoIdentityId:`"$context.identity.cognitoIdentityId"`, // not supported in us-west-2 region
              })
            }
          },
          { parent }
        )
      );
    }
    function createSsl() {
      if (!domain) return output41(void 0);
      return domain.apply((domain2) => {
        if (domain2.cert) return output41(domain2.cert);
        if (domain2.nameId) return output41(void 0);
        return new DnsValidatedCertificate(
          `${name}Ssl`,
          {
            domainName: domain2.name,
            dns: domain2.dns
          },
          { parent }
        ).arn;
      });
    }
    function createDomainName() {
      if (!domain || !certificateArn) return;
      return output41(domain).apply((domain2) => {
        return domain2.nameId ? apigatewayv26.DomainName.get(
          `${name}DomainName`,
          domain2.nameId,
          {},
          { parent }
        ) : new apigatewayv26.DomainName(
          ...transform(
            args.transform?.domainName,
            `${name}DomainName`,
            {
              domainName: domain2.name,
              domainNameConfiguration: certificateArn.apply(
                (certificateArn2) => ({
                  certificateArn: certificateArn2,
                  endpointType: "REGIONAL",
                  securityPolicy: "TLS_1_2"
                })
              )
            },
            { parent }
          )
        );
      });
    }
    function createDnsRecords() {
      if (!domain || !apigDomain) return;
      domain.apply((domain2) => {
        if (!domain2.dns) return;
        if (domain2.nameId) return;
        domain2.dns.createAlias(
          name,
          {
            name: domain2.name,
            aliasName: apigDomain.domainNameConfiguration.targetDomainName,
            aliasZone: apigDomain.domainNameConfiguration.hostedZoneId
          },
          { parent }
        );
      });
    }
    function createDomainMapping() {
      if (!domain || !apigDomain) return;
      return domain.path?.apply(
        (path20) => new apigatewayv26.ApiMapping(
          `${name}DomainMapping`,
          {
            apiId: api.id,
            domainName: apigDomain.id,
            stage: stage.name,
            apiMappingKey: path20
          },
          { parent }
        )
      );
    }
  }
  /**
   * The URL of the API.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated API Gateway URL.
   */
  get url() {
    return this.apigDomain && this.apiMapping ? all23([this.apigDomain.domainName, this.apiMapping.apiMappingKey]).apply(
      ([domain, key]) => key ? `https://${domain}/${key}/` : `https://${domain}`
    ) : this.api.apiEndpoint;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Amazon API Gateway HTTP API.
       */
      api: this.api,
      /**
       * The API Gateway HTTP API domain name.
       */
      get domainName() {
        if (!self.apigDomain)
          throw new VisibleError(
            `"nodes.domainName" is not available when domain is not configured for the "${self.constructorName}" API.`
          );
        return self.apigDomain;
      },
      /**
       * The CloudWatch LogGroup for the access logs.
       */
      logGroup: this.logGroup,
      /**
       * The API Gateway HTTP API VPC link.
       */
      vpcLink: this.vpcLink
    };
  }
  /**
   * Add a route to the API Gateway HTTP API. The route is a combination of
   * - An HTTP method and a path, `{METHOD} /{path}`.
   * - Or a `$default` route.
   *
   * :::tip
   * The `$default` route is a default or catch-all route. It'll match if no other route matches.
   * :::
   *
   * A method could be one of `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`, or `ANY`. Here `ANY` matches any HTTP method.
   *
   * The path can be a combination of
   * - Literal segments, `/notes`, `/notes/new`, etc.
   * - Parameter segments, `/notes/{noteId}`, `/notes/{noteId}/attachments/{attachmentId}`, etc.
   * - Greedy segments, `/{proxy+}`, `/notes/{proxy+}`,  etc. The `{proxy+}` segment is a greedy segment that matches all child paths. It needs to be at the end of the path.
   *
   * :::tip
   * The `{proxy+}` is a greedy segment, it matches all its child paths.
   * :::
   *
   * The `$default` is a reserved keyword for the default route. It'll be matched
   * if no other route matches. When a request comes in, the API Gateway will look
   * for the most specific match. If no route matches, the `$default` route will
   * be invoked.
   *
   * :::note
   * You cannot have duplicate routes.
   * :::
   *
   * @param rawRoute The path for the route.
   * @param handler The function that'll be invoked.
   * @param args Configure the route.
   *
   * @example
   * Add a simple route.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "src/get.handler");
   * ```
   *
   * Match any HTTP method.
   *
   * ```js title="sst.config.ts"
   * api.route("ANY /", "src/route.handler");
   * ```
   *
   * Add a default or fallback route. Here for every request other than `GET /`,
   * the `$default` route will be invoked.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "src/get.handler");
   *
   * api.route("$default", "src/default.handler");
   * ```
   *
   * Add a parameterized route.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /notes/{id}", "src/get.handler");
   * ```
   *
   * Add a greedy route.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /notes/{proxy+}", "src/greedy.handler");
   * ```
   *
   * Enable auth for a route.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "src/get.handler")
   * api.route("POST /", "src/post.handler", {
   *   auth: {
   *     iam: true
   *   }
   * });
   * ```
   *
   * Customize the route handler.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", {
   *   handler: "src/get.handler",
   *   memory: "2048 MB"
   * });
   * ```
   *
   * Or pass in the ARN of an existing Lambda function.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "arn:aws:lambda:us-east-1:123456789012:function:my-function");
   * ```
   */
  route(rawRoute, handler, args = {}) {
    const route = this.parseRoute(rawRoute);
    const transformed = transform(
      this.constructorArgs.transform?.route?.args,
      this.buildRouteId(route),
      args,
      { provider: this.constructorOpts.provider }
    );
    return new ApiGatewayV2LambdaRoute(
      transformed[0],
      {
        api: {
          name: this.constructorName,
          id: this.api.id,
          executionArn: this.api.executionArn
        },
        route,
        handler,
        handlerLink: this.constructorArgs.link,
        handlerTransform: this.constructorArgs.transform?.route?.handler,
        ...transformed[1]
      },
      transformed[2]
    );
  }
  /**
   * Add a URL route to the API Gateway HTTP API.
   *
   * @param rawRoute The path for the route.
   * @param url The URL to forward to.
   * @param args Configure the route.
   *
   * @example
   * Add a simple route.
   *
   * ```js title="sst.config.ts"
   * api.routeUrl("GET /", "https://google.com");
   * ```
   *
   * Enable auth for a route.
   *
   * ```js title="sst.config.ts"
   * api.routeUrl("POST /", "https://google.com", {
   *   auth: {
   *     iam: true
   *   }
   * });
   * ```
   */
  routeUrl(rawRoute, url, args = {}) {
    const route = this.parseRoute(rawRoute);
    const transformed = transform(
      this.constructorArgs.transform?.route?.args,
      this.buildRouteId(route),
      args,
      { provider: this.constructorOpts.provider }
    );
    return new ApiGatewayV2UrlRoute(
      transformed[0],
      {
        api: {
          name: this.constructorName,
          id: this.api.id,
          executionArn: this.api.executionArn
        },
        route,
        url,
        ...transformed[1]
      },
      transformed[2]
    );
  }
  /**
   * Adds a private route to the API Gateway HTTP API.
   *
   * To add private routes, you need to have a VPC link. Make sure to pass in a `vpc`.
   * Learn more about [adding private routes](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-private.html).
   *
   * :::tip
   * You need to pass `vpc` to add a private route.
   * :::
   *
   * A couple of things to note:
   *
   * 1. Your API Gateway HTTP API also needs to be in the **same VPC** as the service.
   *
   * 2. You also need to verify that your VPC's [**availability zones support VPC link**](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vpc-links.html#http-api-vpc-link-availability).
   *
   * 3. Run `aws ec2 describe-availability-zones` to get a list of AZs for your
   *    account.
   *
   * 4. Only list the AZ ID's that support VPC link.
   *    ```ts title="sst.config.ts" {4}
   *    vpc: {
   *      az: ["eu-west-3a", "eu-west-3c"]
   *    }
   *    ```
   *    If the VPC picks an AZ automatically that doesn't support VPC link, you'll get
   *    the following error:
   *    ```
   *    operation error ApiGatewayV2: BadRequestException: Subnet is in Availability
   *    Zone 'euw3-az2' where service is not available
   *    ```
   *
   * @param rawRoute The path for the route.
   * @param arn The ARN of the AWS Load Balancer or Cloud Map service.
   * @param args Configure the route.
   *
   * @example
   * Here are a few examples using the private route. Add a route to Application Load Balancer.
   *
   * ```js title="sst.config.ts"
   * const loadBalancerArn = "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188";
   * api.routePrivate("GET /", loadBalancerArn);
   * ```
   *
   * Add a route to AWS Cloud Map service.
   *
   * ```js title="sst.config.ts"
   * const serviceArn = "arn:aws:servicediscovery:us-east-2:123456789012:service/srv-id?stage=prod&deployment=green_deployment";
   * api.routePrivate("GET /", serviceArn);
   * ```
   *
   * Enable IAM authentication for a route.
   *
   * ```js title="sst.config.ts"
   * api.routePrivate("GET /", serviceArn, {
   *   auth: {
   *     iam: true
   *   }
   * });
   * ```
   */
  routePrivate(rawRoute, arn, args = {}) {
    if (!this.vpcLink)
      throw new VisibleError(
        `To add private routes, you need to have a VPC link. Configure "vpc" for the "${this.constructorName}" API to create a VPC link.`
      );
    const route = this.parseRoute(rawRoute);
    const transformed = transform(
      this.constructorArgs.transform?.route?.args,
      this.buildRouteId(route),
      args,
      { provider: this.constructorOpts.provider }
    );
    return new ApiGatewayV2PrivateRoute(
      transformed[0],
      {
        api: {
          name: this.constructorName,
          id: this.api.id,
          executionArn: this.api.executionArn
        },
        route,
        vpcLink: this.vpcLink.id,
        arn,
        ...transformed[1]
      },
      transformed[2]
    );
  }
  parseRoute(rawRoute) {
    if (rawRoute.toLowerCase() === "$default") return "$default";
    const parts = rawRoute.split(" ");
    if (parts.length !== 2) {
      throw new VisibleError(
        `Invalid route ${rawRoute}. A route must be in the format "METHOD /path".`
      );
    }
    const [methodRaw, path20] = rawRoute.split(" ");
    const method = methodRaw.toUpperCase();
    if (![
      "ANY",
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT"
    ].includes(method))
      throw new VisibleError(
        `Invalid method ${methodRaw} in route ${rawRoute}`
      );
    if (!path20.startsWith("/"))
      throw new VisibleError(
        `Invalid path ${path20} in route ${rawRoute}. Path must start with "/".`
      );
    return `${method} ${path20}`;
  }
  buildRouteId(route) {
    const suffix = logicalName(
      hashStringToPrettyString([outputId, route].join(""), 6)
    );
    return `${this.constructorName}Route${suffix}`;
  }
  /**
   * Add an authorizer to the API Gateway HTTP API.
   *
   * @param args Configure the authorizer.
   * @example
   * Add a Lambda authorizer.
   *
   * ```js title="sst.config.ts"
   * api.addAuthorizer({
   *   name: "myAuthorizer",
   *   lambda: {
   *     function: "src/authorizer.index"
   *   }
   * });
   * ```
   *
   * Add a JWT authorizer.
   *
   * ```js title="sst.config.ts"
   * const authorizer = api.addAuthorizer({
   *   name: "myAuthorizer",
   *   jwt: {
   *     issuer: "https://issuer.com/",
   *     audiences: ["https://api.example.com"],
   *     identitySource: "$request.header.AccessToken"
   *   }
   * });
   * ```
   *
   * Add a Cognito UserPool as a JWT authorizer.
   *
   * ```js title="sst.config.ts"
   * const pool = new sst.aws.CognitoUserPool("MyUserPool");
   * const poolClient = userPool.addClient("Web");
   *
   * const authorizer = api.addAuthorizer({
   *   name: "myCognitoAuthorizer",
   *   jwt: {
   *     issuer: $interpolate`https://cognito-idp.${aws.getRegionOutput().name}.amazonaws.com/${pool.id}`,
   *     audiences: [poolClient.id]
   *   }
   * });
   * ```
   *
   * Now you can use the authorizer in your routes.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "src/get.handler", {
   *   auth: {
   *     jwt: {
   *       authorizer: authorizer.id
   *     }
   *   }
   * });
   * ```
   */
  addAuthorizer(args) {
    const self = this;
    const selfName = this.constructorName;
    const nameSuffix = logicalName(args.name);
    return new ApiGatewayV2Authorizer(
      `${selfName}Authorizer${nameSuffix}`,
      {
        api: {
          id: self.api.id,
          name: selfName,
          executionArn: this.api.executionArn
        },
        type: "http",
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url
      }
    };
  }
};
var __pulumiType32 = "sst:aws:ApiGatewayV2";
ApiGatewayV2.__pulumiType = __pulumiType32;

// .sst/platform/src/components/aws/apigateway-websocket.ts
import {
  all as all25,
  interpolate as interpolate21,
  output as output43
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/apigateway-websocket-route.ts
import {
  all as all24,
  interpolate as interpolate20,
  output as output42
} from "@pulumi/pulumi";
import { apigatewayv2 as apigatewayv27, lambda as lambda13 } from "@pulumi/aws";
var ApiGatewayWebSocketRoute = class extends Component {
  fn;
  permission;
  apiRoute;
  integration;
  constructor(name, args, opts) {
    super(__pulumiType33, name, args, opts);
    const self = this;
    const api = output42(args.api);
    const route = output42(args.route);
    const fn = createFunction();
    const permission2 = createPermission();
    const integration = createIntegration();
    const apiRoute = createApiRoute2();
    this.fn = fn;
    this.permission = permission2;
    this.apiRoute = apiRoute;
    this.integration = integration;
    function createFunction() {
      return functionBuilder(
        `${name}Handler`,
        args.handler,
        {
          description: interpolate20`${api.name} route ${route}`
        },
        args.handlerTransform,
        { parent: self }
      );
    }
    function createPermission() {
      return new lambda13.Permission(
        `${name}Permissions`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn,
          principal: "apigateway.amazonaws.com",
          sourceArn: interpolate20`${api.executionArn}/*`
        },
        { parent: self }
      );
    }
    function createIntegration() {
      return new apigatewayv27.Integration(
        ...transform(
          args.transform?.integration,
          `${name}Integration`,
          {
            apiId: api.id,
            integrationType: "AWS_PROXY",
            integrationUri: fn.arn.apply((arn) => {
              const [, partition, , region] = arn.split(":");
              return `arn:${partition}:apigateway:${region}:lambda:path/2015-03-31/functions/${arn}/invocations`;
            })
          },
          { parent: self, dependsOn: [permission2] }
        )
      );
    }
    function createApiRoute2() {
      const authArgs = all24([args.route, args.auth]).apply(([route2, auth]) => {
        if (route2 !== "$connect") return { authorizationType: "NONE" };
        if (!auth) return { authorizationType: "NONE" };
        if (auth.iam) return { authorizationType: "AWS_IAM" };
        if (auth.lambda)
          return {
            authorizationType: "CUSTOM",
            authorizerId: auth.lambda
          };
        if (auth.jwt)
          return {
            authorizationType: "JWT",
            authorizationScopes: auth.jwt.scopes,
            authorizerId: auth.jwt.authorizer
          };
        return { authorizationType: "NONE" };
      });
      return authArgs.apply(
        (authArgs2) => new apigatewayv27.Route(
          ...transform(
            args.transform?.route,
            `${name}Route`,
            {
              apiId: api.id,
              routeKey: route,
              target: interpolate20`integrations/${integration.id}`,
              ...authArgs2
            },
            { parent: self }
          )
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda permission.
       */
      permission: this.permission,
      /**
       * The API Gateway HTTP API route.
       */
      route: this.apiRoute,
      /**
       * The API Gateway HTTP API integration.
       */
      integration: this.integration
    };
  }
};
var __pulumiType33 = "sst:aws:ApiGatewayWebSocketRoute";
ApiGatewayWebSocketRoute.__pulumiType = __pulumiType33;

// .sst/platform/src/components/aws/apigateway-websocket.ts
import { apigatewayv2 as apigatewayv28, cloudwatch as cloudwatch5 } from "@pulumi/aws";
var ApiGatewayWebSocket = class extends Component {
  constructorName;
  constructorArgs;
  constructorOpts;
  api;
  stage;
  apigDomain;
  apiMapping;
  logGroup;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType34, name, args, opts);
    const parent = this;
    const accessLog = normalizeAccessLog();
    const domain = normalizeDomain();
    const apigAccount = setupApiGatewayAccount(name, opts);
    const api = createApi();
    const logGroup = createLogGroup();
    const stage = createStage();
    const certificateArn = createSsl();
    const apigDomain = createDomainName();
    createDnsRecords();
    const apiMapping = createDomainMapping();
    this.constructorName = name;
    this.constructorArgs = args;
    this.constructorOpts = opts;
    this.api = api;
    this.stage = stage;
    this.apigDomain = apigDomain;
    this.apiMapping = apiMapping;
    this.logGroup = logGroup;
    this.registerOutputs({
      _hint: this.url
    });
    function normalizeAccessLog() {
      return output43(args.accessLog).apply((accessLog2) => ({
        ...accessLog2,
        retention: accessLog2?.retention ?? "1 month"
      }));
    }
    function normalizeDomain() {
      if (!args.domain) return;
      return output43(args.domain).apply((domain2) => {
        if (typeof domain2 !== "string") {
          if (domain2.name && domain2.nameId)
            throw new VisibleError(
              `Cannot configure both domain "name" and "nameId" for the "${name}" API.`
            );
          if (!domain2.name && !domain2.nameId)
            throw new VisibleError(
              `Either domain "name" or "nameId" is required for the "${name}" API.`
            );
          if (domain2.dns === false && !domain2.cert)
            throw new VisibleError(
              `Domain "cert" is required when "dns" is disabled for the "${name}" API.`
            );
        }
        const norm = typeof domain2 === "string" ? { name: domain2 } : domain2;
        return {
          name: norm.name,
          nameId: norm.nameId,
          path: norm.path,
          dns: norm.dns === false ? void 0 : norm.dns ?? dns(),
          cert: norm.cert
        };
      });
    }
    function createApi() {
      return new apigatewayv28.Api(
        ...transform(
          args.transform?.api,
          `${name}Api`,
          {
            protocolType: "WEBSOCKET",
            routeSelectionExpression: "$request.body.action"
          },
          { parent }
        )
      );
    }
    function createLogGroup() {
      return new cloudwatch5.LogGroup(
        ...transform(
          args.transform?.accessLog,
          `${name}AccessLog`,
          {
            name: `/aws/vendedlogs/apis/${physicalName(64, name)}`,
            retentionInDays: accessLog.apply(
              (accessLog2) => RETENTION[accessLog2.retention]
            )
          },
          { parent, ignoreChanges: ["name"] }
        )
      );
    }
    function createStage() {
      return new apigatewayv28.Stage(
        ...transform(
          args.transform?.stage,
          `${name}Stage`,
          {
            apiId: api.id,
            autoDeploy: true,
            name: "$default",
            accessLogSettings: {
              destinationArn: logGroup.arn,
              format: JSON.stringify({
                // request info
                requestTime: `"$context.requestTime"`,
                requestId: `"$context.requestId"`,
                eventType: `"$context.eventType"`,
                routeKey: `"$context.routeKey"`,
                status: `$context.status`,
                // integer value, do not wrap in quotes
                // integration info
                integrationRequestId: `"$context.awsEndpointRequestId"`,
                integrationStatus: `"$context.integrationStatus"`,
                integrationLatency: `"$context.integrationLatency"`,
                integrationServiceStatus: `"$context.integration.integrationStatus"`,
                // caller info
                ip: `"$context.identity.sourceIp"`,
                userAgent: `"$context.identity.userAgent"`,
                //cognitoIdentityId:`"$context.identity.cognitoIdentityId"`, // not supported in us-west-2 region
                connectedAt: `"$context.connectedAt"`,
                connectionId: `"$context.connectionId"`
              })
            }
          },
          { parent, dependsOn: apigAccount }
        )
      );
    }
    function createSsl() {
      if (!domain) return output43(void 0);
      return domain.apply((domain2) => {
        if (domain2.cert) return output43(domain2.cert);
        if (domain2.nameId) return output43(void 0);
        return new DnsValidatedCertificate(
          `${name}Ssl`,
          {
            domainName: domain2.name,
            dns: domain2.dns
          },
          { parent }
        ).arn;
      });
    }
    function createDomainName() {
      if (!domain || !certificateArn) return;
      return all25([domain, certificateArn]).apply(([domain2, certificateArn2]) => {
        return domain2.nameId ? apigatewayv28.DomainName.get(
          `${name}DomainName`,
          domain2.nameId,
          {},
          { parent }
        ) : new apigatewayv28.DomainName(
          ...transform(
            args.transform?.domainName,
            `${name}DomainName`,
            {
              domainName: domain2.name,
              domainNameConfiguration: {
                certificateArn: certificateArn2,
                endpointType: "REGIONAL",
                securityPolicy: "TLS_1_2"
              }
            },
            { parent }
          )
        );
      });
    }
    function createDnsRecords() {
      if (!domain || !apigDomain) return;
      domain.apply((domain2) => {
        if (!domain2.dns) return;
        if (domain2.nameId) return;
        domain2.dns.createAlias(
          name,
          {
            name: domain2.name,
            aliasName: apigDomain.domainNameConfiguration.targetDomainName,
            aliasZone: apigDomain.domainNameConfiguration.hostedZoneId
          },
          { parent }
        );
      });
    }
    function createDomainMapping() {
      if (!domain || !apigDomain) return;
      return domain.path?.apply(
        (path20) => new apigatewayv28.ApiMapping(
          `${name}DomainMapping`,
          {
            apiId: api.id,
            domainName: apigDomain.id,
            stage: "$default",
            apiMappingKey: path20
          },
          { parent }
        )
      );
    }
  }
  /**
   * The URL of the API.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated API Gateway URL.
   */
  get url() {
    return this.apigDomain && this.apiMapping ? all25([this.apigDomain.domainName, this.apiMapping.apiMappingKey]).apply(
      ([domain, key]) => key ? `wss://${domain}/${key}/` : `wss://${domain}`
    ) : interpolate21`${this.api.apiEndpoint}/${this.stage.name}`;
  }
  /**
   * The management endpoint for the API used by the API Gateway Management API client.
   * This is useful for sending messages to connected clients.
   *
   * @example
   * ```js
   * import { Resource } from "sst";
   * import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi";
   *
   * const client = new ApiGatewayManagementApiClient({
   *   endpoint: Resource.MyApi.managementEndpoint,
   * });
   * ```
   */
  get managementEndpoint() {
    return this.api.apiEndpoint.apply(
      (endpoint) => interpolate21`${endpoint.replace("wss", "https")}/${this.stage.name}`
    );
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Amazon API Gateway V2 API.
       */
      api: this.api,
      /**
       * The API Gateway HTTP API domain name.
       */
      get domainName() {
        if (!self.apigDomain)
          throw new VisibleError(
            `"nodes.domainName" is not available when domain is not configured for the "${self.constructorName}" API.`
          );
        return self.apigDomain;
      },
      /**
       * The CloudWatch LogGroup for the access logs.
       */
      logGroup: this.logGroup
    };
  }
  /**
   * Add a route to the API Gateway WebSocket API.
   *
   * There are three predefined routes:
   * - `$connect`: When the client connects to the API.
   * - `$disconnect`: When the client or the server disconnects from the API.
   * - `$default`: The default or catch-all route.
   *
   * In addition, you can create custom routes. When a request comes in, the API Gateway
   * will look for the specific route defined by the user. If no route matches, the `$default`
   * route will be invoked.
   *
   * @param route The path for the route.
   * @param handler The function that'll be invoked.
   * @param args Configure the route.
   *
   * @example
   * Add a simple route.
   *
   * ```js title="sst.config.ts"
   * api.route("sendMessage", "src/sendMessage.handler");
   * ```
   *
   * Add a predefined route.
   *
   * ```js title="sst.config.ts"
   * api.route("$default", "src/default.handler");
   * ```
   *
   * Enable auth for a route.
   *
   * ```js title="sst.config.ts"
   * api.route("sendMessage", "src/sendMessage.handler", {
   *   auth: {
   *     iam: true
   *   }
   * });
   * ```
   *
   * Customize the route handler.
   *
   * ```js title="sst.config.ts"
   * api.route("sendMessage", {
   *   handler: "src/sendMessage.handler",
   *   memory: "2048 MB"
   * });
   * ```
   *
   * Or pass in the ARN of an existing Lambda function.
   *
   * ```js title="sst.config.ts"
   * api.route("sendMessage", "arn:aws:lambda:us-east-1:123456789012:function:my-function");
   * ```
   */
  route(route, handler, args = {}) {
    const prefix = this.constructorName;
    const suffix = logicalName(
      ["$connect", "$disconnect", "$default"].includes(route) ? route : hashStringToPrettyString(`${outputId}${route}`, 6)
    );
    const transformed = transform(
      this.constructorArgs.transform?.route?.args,
      `${prefix}Route${suffix}`,
      args,
      { provider: this.constructorOpts.provider }
    );
    return new ApiGatewayWebSocketRoute(
      transformed[0],
      {
        api: {
          name: prefix,
          id: this.api.id,
          executionArn: this.api.executionArn
        },
        route,
        handler,
        handlerTransform: this.constructorArgs.transform?.route?.handler,
        ...transformed[1]
      },
      transformed[2]
    );
  }
  /**
   * Add an authorizer to the API Gateway WebSocket API.
   *
   * @param name The name of the authorizer.
   * @param args Configure the authorizer.
   *
   * @example
   * Add a Lambda authorizer.
   *
   * ```js title="sst.config.ts"
   * api.addAuthorizer({
   *   name: "myAuthorizer",
   *   lambda: {
   *     function: "src/authorizer.index"
   *   }
   * });
   * ```
   *
   * Add a JWT authorizer.
   *
   * ```js title="sst.config.ts"
   * const authorizer = api.addAuthorizer({
   *   name: "myAuthorizer",
   *   jwt: {
   *     issuer: "https://issuer.com/",
   *     audiences: ["https://api.example.com"],
   *     identitySource: "$request.header.AccessToken"
   *   }
   * });
   * ```
   *
   * Add a Cognito UserPool as a JWT authorizer.
   *
   * ```js title="sst.config.ts"
   * const pool = new sst.aws.CognitoUserPool("MyUserPool");
   * const poolClient = userPool.addClient("Web");
   *
   * const authorizer = api.addAuthorizer({
   *   name: "myCognitoAuthorizer",
   *   jwt: {
   *     issuer: $interpolate`https://cognito-idp.${aws.getRegionOutput().name}.amazonaws.com/${pool.id}`,
   *     audiences: [poolClient.id]
   *   }
   * });
   * ```
   *
   * Now you can use the authorizer in your routes.
   *
   * ```js title="sst.config.ts"
   * api.route("GET /", "src/get.handler", {
   *   auth: {
   *     jwt: {
   *       authorizer: authorizer.id
   *     }
   *   }
   * });
   * ```
   */
  addAuthorizer(name, args) {
    const self = this;
    const constructorName = this.constructorName;
    return new ApiGatewayV2Authorizer(
      `${constructorName}Authorizer${name}`,
      {
        api: {
          id: self.api.id,
          name: constructorName,
          executionArn: this.api.executionArn
        },
        type: "websocket",
        name,
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url,
        managementEndpoint: this.managementEndpoint
      },
      include: [
        permission({
          actions: ["execute-api:ManageConnections"],
          resources: [interpolate21`${this.api.executionArn}/*/*/@connections/*`]
        })
      ]
    };
  }
};
var __pulumiType34 = "sst:aws:ApiGatewayWebSocket";
ApiGatewayWebSocket.__pulumiType = __pulumiType34;

// .sst/platform/src/components/aws/app-sync.ts
import fs5 from "fs/promises";
import { interpolate as interpolate22, output as output46 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/app-sync-data-source.ts
import {
  output as output44
} from "@pulumi/pulumi";
import { appsync, iam as iam9 } from "@pulumi/aws";
var AppSyncDataSource = class extends Component {
  dataSource;
  lambda;
  serviceRole;
  constructor(name, args, opts) {
    super(__pulumiType35, name, args, opts);
    const self = this;
    const apiId = output44(args.apiId);
    validateSingleDataSource();
    const type = getType();
    const lambda22 = createFunction();
    const serviceRole = createServiceRole();
    const dataSource = createDataSource();
    this.dataSource = dataSource;
    this.lambda = lambda22;
    this.serviceRole = serviceRole;
    function validateSingleDataSource() {
      const sources = [
        args.lambda,
        args.dynamodb,
        args.elasticSearch,
        args.eventBridge,
        args.http,
        args.openSearch,
        args.rds
      ].filter((source) => source);
      if (sources.length > 1) {
        throw new Error(
          `Expected only one data source, but found ${sources.length}.`
        );
      }
    }
    function getType() {
      if (args.lambda) return "AWS_LAMBDA";
      if (args.dynamodb) return "AMAZON_DYNAMODB";
      if (args.elasticSearch) return "AMAZON_ELASTICSEARCH";
      if (args.eventBridge) return "AMAZON_EVENTBRIDGE";
      if (args.http) return "HTTP";
      if (args.openSearch) return "AMAZON_OPENSEARCH_SERVICE";
      if (args.rds) return "RELATIONAL_DATABASE";
      return "NONE";
    }
    function createFunction() {
      if (!args.lambda) return;
      return functionBuilder(`${name}Function`, args.lambda, {
        description: `${args.apiComponentName} data source`
      });
    }
    function createServiceRole() {
      if (!lambda22 && !args.dynamodb && !args.elasticSearch && !args.eventBridge && !args.openSearch)
        return;
      return new iam9.Role(
        ...transform(
          args.transform?.serviceRole,
          `${name}ServiceRole`,
          {
            assumeRolePolicy: iam9.getPolicyDocumentOutput({
              statements: [
                {
                  actions: ["sts:AssumeRole"],
                  principals: [
                    {
                      type: "Service",
                      identifiers: ["appsync.amazonaws.com"]
                    }
                  ]
                }
              ]
            }).json,
            inlinePolicies: [
              {
                name: "inline",
                policy: iam9.getPolicyDocumentOutput({
                  statements: [
                    ...lambda22 ? [{ actions: ["lambda:*"], resources: [lambda22.arn] }] : [],
                    ...args.dynamodb ? [
                      {
                        actions: ["dynamodb:*"],
                        resources: [args.dynamodb]
                      }
                    ] : [],
                    ...args.elasticSearch ? [
                      {
                        actions: ["es:*"],
                        resources: [args.elasticSearch]
                      }
                    ] : [],
                    ...args.eventBridge ? [
                      {
                        actions: ["events:*"],
                        resources: [args.eventBridge]
                      }
                    ] : [],
                    ...args.openSearch ? [
                      {
                        actions: ["opensearch:*"],
                        resources: [args.openSearch]
                      }
                    ] : []
                  ]
                }).json
              }
            ]
          },
          { parent: self }
        )
      );
    }
    function createDataSource() {
      return new appsync.DataSource(
        ...transform(
          args.transform?.dataSource,
          `${name}DataSource`,
          {
            apiId,
            type,
            name: args.name,
            serviceRoleArn: serviceRole?.arn,
            lambdaConfig: lambda22 ? { functionArn: lambda22.arn } : void 0,
            dynamodbConfig: args.dynamodb ? {
              tableName: output44(args.dynamodb).apply(
                (arn) => parseDynamoArn(arn).tableName
              )
            } : void 0,
            elasticsearchConfig: args.elasticSearch ? { endpoint: args.elasticSearch } : void 0,
            eventBridgeConfig: args.eventBridge ? { eventBusArn: args.eventBridge } : void 0,
            httpConfig: args.http ? { endpoint: args.http } : void 0,
            opensearchserviceConfig: args.openSearch ? { endpoint: args.openSearch } : void 0,
            relationalDatabaseConfig: args.rds ? {
              httpEndpointConfig: {
                dbClusterIdentifier: output44(args.rds).cluster,
                awsSecretStoreArn: output44(args.rds).credentials
              }
            } : void 0
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The name of the data source.
   */
  get name() {
    return this.dataSource.name;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Amazon AppSync DataSource.
       */
      dataSource: this.dataSource,
      /**
       * The Lambda function used by the data source.
       */
      get function() {
        if (!self.lambda)
          throw new VisibleError(
            "Cannot access `nodes.function` because the data source does not use a Lambda function."
          );
        return self.lambda.apply((fn) => fn.getFunction());
      },
      /**
       * The DataSource service's IAM role.
       */
      get serviceRole() {
        if (!self.serviceRole)
          throw new VisibleError(
            "Cannot access `nodes.serviceRole` because the data source does not have a service role."
          );
        return self.serviceRole;
      }
    };
  }
};
var __pulumiType35 = "sst:aws:AppSyncDataSource";
AppSyncDataSource.__pulumiType = __pulumiType35;

// .sst/platform/src/components/aws/app-sync-resolver.ts
import { output as output45 } from "@pulumi/pulumi";
import { appsync as appsync2 } from "@pulumi/aws";
var AppSyncResolver = class extends Component {
  resolver;
  constructor(name, args, opts) {
    super(__pulumiType36, name, args, opts);
    const self = this;
    const kind = normalizeKind();
    const resolver = createResolver();
    this.resolver = resolver;
    function normalizeKind() {
      return output45(args.kind ?? "unit").apply((kind2) => {
        if (kind2 === "unit" && args.functions)
          throw new VisibleError(
            "The `functions` property is not supported for `unit` resolvers."
          );
        if (kind2 === "pipeline" && args.dataSource)
          throw new VisibleError(
            "The `dataSource` property is not supported for `pipeline` resolvers."
          );
        return kind2;
      });
    }
    function createResolver() {
      return new appsync2.Resolver(
        ...transform(
          args.transform?.resolver,
          `${name}Resolver`,
          {
            apiId: args.apiId,
            kind: kind.apply((kind2) => kind2.toUpperCase()),
            type: args.type,
            field: args.field,
            dataSource: args.dataSource,
            requestTemplate: args.requestTemplate,
            responseTemplate: args.responseTemplate,
            code: args.code,
            runtime: args.code ? {
              name: "APPSYNC_JS",
              runtimeVersion: "1.0.0"
            } : void 0,
            pipelineConfig: args.functions ? { functions: args.functions } : void 0
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon AppSync Resolver.
       */
      resolver: this.resolver
    };
  }
};
var __pulumiType36 = "sst:aws:AppSyncResolver";
AppSyncResolver.__pulumiType = __pulumiType36;

// .sst/platform/src/components/aws/app-sync-function.ts
import { appsync as appsync3 } from "@pulumi/aws";
var AppSyncFunction = class extends Component {
  fn;
  constructor(name, args, opts) {
    super(__pulumiType37, name, args, opts);
    const self = this;
    const fn = createFunction();
    this.fn = fn;
    function createFunction() {
      return new appsync3.Function(
        ...transform(
          args.transform?.function,
          `${name}Function`,
          {
            apiId: args.apiId,
            name: args.name,
            dataSource: args.dataSource,
            requestMappingTemplate: args.requestMappingTemplate,
            responseMappingTemplate: args.responseMappingTemplate,
            code: args.code,
            runtime: args.code ? {
              name: "APPSYNC_JS",
              runtimeVersion: "1.0.0"
            } : void 0
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon AppSync Function.
       */
      function: this.fn
    };
  }
};
var __pulumiType37 = "sst:aws:AppSyncFunction";
AppSyncFunction.__pulumiType = __pulumiType37;

// .sst/platform/src/components/aws/app-sync.ts
import { appsync as appsync4 } from "@pulumi/aws";
var AppSync = class extends Component {
  constructorName;
  constructorOpts;
  api;
  domainName;
  constructor(name, args, opts = {}) {
    super(__pulumiType38, name, args, opts);
    const parent = this;
    const domain = normalizeDomain();
    const schema = loadSchema();
    const api = createGraphQLApi();
    const certificateArn = createSsl();
    const domainName = createDomainName();
    createDnsRecords();
    this.constructorName = name;
    this.constructorOpts = opts;
    this.api = api;
    this.domainName = domainName;
    this.registerOutputs({ _hint: this.url });
    function normalizeDomain() {
      if (!args.domain) return;
      output46(args.domain).apply((domain2) => {
        if (typeof domain2 === "string") return;
        if (!domain2.name) throw new Error(`Missing "name" for domain.`);
        if (domain2.dns === false && !domain2.cert)
          throw new Error(
            `Need to provide a validated certificate via "cert" when DNS is disabled`
          );
      });
      return output46(args.domain).apply((domain2) => {
        const norm = typeof domain2 === "string" ? { name: domain2 } : domain2;
        return {
          name: norm.name,
          dns: norm.dns === false ? void 0 : norm.dns ?? dns(),
          cert: norm.cert
        };
      });
    }
    function loadSchema() {
      return output46(args.schema).apply(
        async (schema2) => fs5.readFile(schema2, { encoding: "utf-8" })
      );
    }
    function createGraphQLApi() {
      return new appsync4.GraphQLApi(
        ...transform(
          args.transform?.api,
          `${name}Api`,
          {
            schema,
            authenticationType: "API_KEY"
          },
          { parent }
        )
      );
    }
    function createSsl() {
      if (!domain) return;
      return domain.apply((domain2) => {
        if (domain2.cert) return output46(domain2.cert);
        return new DnsValidatedCertificate(
          `${name}Ssl`,
          {
            domainName: domain2.name,
            dns: domain2.dns
          },
          { parent, provider: useProvider("us-east-1") }
        ).arn;
      });
    }
    function createDomainName() {
      if (!domain || !certificateArn) return;
      const domainName2 = new appsync4.DomainName(
        ...transform(
          args.transform?.domainName,
          `${name}DomainName`,
          {
            domainName: domain?.name,
            certificateArn
          },
          { parent }
        )
      );
      new appsync4.DomainNameApiAssociation(`${name}DomainAssociation`, {
        apiId: api.id,
        domainName: domainName2.domainName
      });
      return domainName2;
    }
    function createDnsRecords() {
      if (!domain || !domainName) return;
      domain.apply((domain2) => {
        if (!domain2.dns) return;
        domain2.dns.createAlias(
          name,
          {
            name: domain2.name,
            aliasName: domainName.appsyncDomainName,
            aliasZone: domainName.hostedZoneId
          },
          { parent }
        );
      });
    }
  }
  /**
   * The GraphQL API ID.
   */
  get id() {
    return this.api.id;
  }
  /**
   * The URL of the GraphQL API.
   */
  get url() {
    return this.domainName ? interpolate22`https://${this.domainName.domainName}/graphql` : this.api.uris["GRAPHQL"];
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon AppSync GraphQL API.
       */
      api: this.api
    };
  }
  /**
   * Add a data source to this AppSync API.
   *
   * @param args Configure the data source.
   *
   * @example
   *
   * Add a Lambda function as a data source.
   *
   * ```js title="sst.config.ts"
   * api.addDataSource({
   *   name: "lambdaDS",
   *   lambda: "src/lambda.handler"
   * });
   * ```
   *
   * Customize the Lambda function.
   *
   * ```js title="sst.config.ts"
   * api.addDataSource({
   *   name: "lambdaDS",
   *   lambda: {
   *     handler: "src/lambda.handler",
   *     timeout: "60 seconds"
   *   }
   * });
   * ```
   *
   * Add a data source with an existing Lambda function.
   *
   * ```js title="sst.config.ts"
   * api.addDataSource({
   *   name: "lambdaDS",
   *   lambda: "arn:aws:lambda:us-east-1:123456789012:function:my-function"
   * })
   * ```
   *
   * Add a DynamoDB table as a data source.
   *
   * ```js title="sst.config.ts"
   * api.addDataSource({
   *   name: "dynamoDS",
   *   dynamodb: "arn:aws:dynamodb:us-east-1:123456789012:table/my-table"
   * })
   * ```
   */
  addDataSource(args) {
    const self = this;
    const selfName = this.constructorName;
    const nameSuffix = logicalName(args.name);
    return new AppSyncDataSource(
      `${selfName}DataSource${nameSuffix}`,
      {
        apiId: self.api.id,
        apiComponentName: selfName,
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Add a function to this AppSync API.
   *
   * @param args Configure the function.
   *
   * @example
   *
   * Add a function using a Lambda data source.
   *
   * ```js title="sst.config.ts"
   * api.addFunction({
   *   name: "myFunction",
   *   dataSource: "lambdaDS",
   * });
   * ```
   *
   * Add a function using a DynamoDB data source.
   *
   * ```js title="sst.config.ts"
   * api.addResolver("Query user", {
   *   name: "myFunction",
   *   dataSource: "dynamoDS",
   *   requestTemplate: `{
   *     "version": "2017-02-28",
   *     "operation": "Scan",
   *   }`,
   *   responseTemplate: `{
   *     "users": $utils.toJson($context.result.items)
   *   }`,
   * });
   * ```
   */
  addFunction(args) {
    const self = this;
    const selfName = this.constructorName;
    const nameSuffix = logicalName(args.name);
    return new AppSyncFunction(
      `${selfName}Function${nameSuffix}`,
      {
        apiId: self.api.id,
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Add a resolver to this AppSync API.
   *
   * @param operation The type and name of the operation.
   * @param args Configure the resolver.
   *
   * @example
   *
   * Add a resolver using a Lambda data source.
   *
   * ```js title="sst.config.ts"
   * api.addResolver("Query user", {
   *   dataSource: "lambdaDS",
   * });
   * ```
   *
   * Add a resolver using a DynamoDB data source.
   *
   * ```js title="sst.config.ts"
   * api.addResolver("Query user", {
   *   dataSource: "dynamoDS",
   *   requestTemplate: `{
   *     "version": "2017-02-28",
   *     "operation": "Scan",
   *   }`,
   *   responseTemplate: `{
   *     "users": $utils.toJson($context.result.items)
   *   }`,
   * });
   * ```
   *
   * Add a pipeline resolver.
   *
   * ```js title="sst.config.ts"
   * api.addResolver("Query user", {
   *   functions: [
   *     "MyFunction1",
   *     "MyFunction2"
   *   ]
   *   code: `
   *     export function request(ctx) {
   *       return {};
   *     }
   *     export function response(ctx) {
   *       return ctx.result;
   *     }
   *   `,
   * });
   * ```
   */
  addResolver(operation, args) {
    const self = this;
    const selfName = this.constructorName;
    const parts = operation.trim().split(/\s+/);
    if (parts.length !== 2)
      throw new VisibleError(`Invalid resolver ${operation}`);
    const [type, field] = parts;
    const nameSuffix = `${logicalName(type)}${logicalName(field)}`;
    return new AppSyncResolver(
      `${selfName}Resolver${nameSuffix}`,
      {
        apiId: self.api.id,
        type,
        field,
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url
      }
    };
  }
};
var __pulumiType38 = "sst:aws:AppSync";
AppSync.__pulumiType = __pulumiType38;

// .sst/platform/src/components/aws/astro.ts
import fs6 from "fs";
import path7 from "path";

// .sst/platform/src/util/compare-semver.ts
function compareSemver(v1, v2) {
  if (v1 === "latest") return 1;
  if (/^[^\d]/.test(v1)) {
    v1 = v1.substring(1);
  }
  if (/^[^\d]/.test(v2)) {
    v2 = v2.substring(1);
  }
  const [major1, minor1, patch1] = v1.split(".").map(Number);
  const [major2, minor2, patch2] = v2.split(".").map(Number);
  if (major1 !== major2) return major1 - major2;
  if (minor1 !== minor2) return minor1 - minor2;
  return patch1 - patch2;
}
function isALteB(a, b) {
  return compareSemver(a, b) <= 0;
}
function isALtB(a, b) {
  return compareSemver(a, b) < 0;
}

// .sst/platform/src/components/aws/astro.ts
var Astro = class extends SsrSite {
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType39, name, args, opts);
  }
  normalizeBuildCommand() {
  }
  buildPlan(outputPath) {
    return outputPath.apply((outputPath2) => {
      const BUILD_META_FILE_NAME = "sst.buildMeta.json";
      const filePath = path7.join(outputPath2, "dist", BUILD_META_FILE_NAME);
      if (!fs6.existsSync(filePath)) {
        throw new VisibleError(
          `Build metadata file not found at "${filePath}". Update your "astro-sst" adapter and rebuild your Astro site.`
        );
      }
      const buildMeta = JSON.parse(fs6.readFileSync(filePath, "utf-8"));
      const serverOutputPath = path7.join(outputPath2, "dist", "server");
      if (buildMeta.pluginVersion === void 0 || isALtB(buildMeta.pluginVersion, "3.1.2")) {
        throw new VisibleError(
          `Incompatible "astro-sst" adapter version detected. The Astro component requires "astro-sst" adapter version 3.1.2 or later.`
        );
      }
      const isStatic = buildMeta.outputMode === "static";
      const base = buildMeta.base === "/" ? void 0 : buildMeta.base;
      return {
        base,
        server: isStatic ? void 0 : {
          handler: path7.join(serverOutputPath, "entry.handler"),
          nodejs: { install: ["sharp"] },
          streaming: buildMeta.responseMode === "stream",
          copyFiles: fs6.existsSync(path7.join(serverOutputPath, "404.html")) ? [
            {
              from: path7.join(serverOutputPath, "404.html"),
              to: "404.html"
            }
          ] : []
        },
        assets: [
          {
            from: buildMeta.clientBuildOutputDir,
            to: "",
            cached: true,
            versionedSubDir: buildMeta.clientBuildVersionedSubDir
          }
        ],
        custom404: isStatic && fs6.existsSync(
          path7.join(outputPath2, buildMeta.clientBuildOutputDir, "404.html")
        ) ? "/404.html" : void 0
      };
    });
  }
  /**
   * The URL of the Astro site.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
};
var __pulumiType39 = "sst:aws:Astro";
Astro.__pulumiType = __pulumiType39;

// .sst/platform/src/components/aws/aurora.ts
import {
  all as all26,
  interpolate as interpolate23,
  jsonStringify as jsonStringify7,
  output as output48
} from "@pulumi/pulumi";
import { iam as iam11, rds, secretsmanager } from "@pulumi/aws";
import { RandomPassword } from "@pulumi/random";

// .sst/platform/src/components/experimental/dev-command.ts
import { output as output47 } from "@pulumi/pulumi";
var DevCommand = class extends Component {
  constructor(name, args, opts) {
    super(__pulumiType40, name, args, opts);
    this.registerOutputs({
      _dev: {
        links: output47(args.link || []).apply(Link.build).apply((links) => links.map((link) => link.name)),
        environment: args.environment,
        title: args.dev?.title,
        directory: args.dev?.directory,
        autostart: args.dev?.autostart !== false,
        command: args.dev?.command,
        aws: {
          role: args.aws?.role
        }
      }
    });
  }
};
var __pulumiType40 = "sst:sst:DevCommand";
DevCommand.__pulumiType = __pulumiType40;

// .sst/platform/src/components/aws/providers/rds-role-lookup.ts
import { dynamic as dynamic9 } from "@pulumi/pulumi";
var RdsRoleLookup = class extends dynamic9.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.RdsRoleLookup"),
      `${name}.sst.aws.RdsRoleLookup`,
      args,
      opts
    );
  }
};

// .sst/platform/src/components/aws/aurora.ts
function parseACU(acu) {
  const result2 = parseFloat(acu.split(" ")[0]);
  return result2;
}
var Aurora = class _Aurora extends Component {
  cluster;
  instance;
  secret;
  _password;
  proxy;
  dev;
  constructor(name, args, opts) {
    super(__pulumiType41, name, args, opts);
    const self = this;
    if (args && "ref" in args) {
      const ref = reference();
      this.cluster = ref.cluster;
      this.instance = ref.instance;
      this._password = ref.password;
      this.proxy = output48(ref.proxy);
      this.secret = ref.secret;
      return;
    }
    const engine = output48(args.engine);
    const version = all26([args.version, engine]).apply(
      ([version2, engine2]) => version2 ?? { postgres: "16.4", mysql: "3.08.0" }[engine2]
    );
    const username = all26([args.username, engine]).apply(
      ([username2, engine2]) => username2 ?? { postgres: "postgres", mysql: "root" }[engine2]
    );
    const dbName = output48(args.database).apply(
      (name2) => name2 ?? define_app_default.name.replaceAll("-", "_")
    );
    const dataApi = output48(args.dataApi).apply((v) => v ?? false);
    const scaling = normalizeScaling();
    const replicas = normalizeReplicas();
    const vpc = normalizeVpc();
    const dev = registerDev();
    if (dev?.enabled) {
      this.dev = dev;
      return;
    }
    const password = createPassword();
    const secret5 = createSecret();
    const subnetGroup = createSubnetGroup();
    const instanceParameterGroup = createInstanceParameterGroup();
    const clusterParameterGroup = createClusterParameterGroup();
    const proxy = createProxy();
    const cluster = createCluster();
    const instance = createInstances();
    createProxyTarget();
    this.cluster = cluster;
    this.instance = instance;
    this.secret = secret5;
    this._password = password;
    this.proxy = proxy;
    function reference() {
      const ref = args;
      const cluster2 = rds.Cluster.get(`${name}Cluster`, ref.id, void 0, {
        parent: self
      });
      const instance2 = rds.ClusterInstance.get(
        `${name}Instance`,
        rds.getInstancesOutput(
          {
            filters: [
              {
                name: "db-cluster-id",
                values: [cluster2.id]
              }
            ]
          },
          { parent: self }
        ).instanceIdentifiers.apply((ids) => {
          if (!ids.length) {
            throw new VisibleError(
              `Database instance not found in cluster ${cluster2.id}`
            );
          }
          return ids[0];
        }),
        void 0,
        { parent: self }
      );
      const secretId = cluster2.tags.apply((tags) => tags?.["sst:ref:password"]).apply((passwordTag) => {
        if (!passwordTag)
          throw new VisibleError(
            `Failed to get password for Postgres ${name}.`
          );
        return passwordTag;
      });
      const secret6 = secretsmanager.Secret.get(
        `${name}ProxySecret`,
        secretId,
        void 0,
        { parent: self }
      );
      const secretVersion = secretsmanager.getSecretVersionOutput(
        { secretId },
        { parent: self }
      );
      const password2 = jsonParse(secretVersion.secretString).apply(
        (v) => v.password
      );
      const proxy2 = cluster2.tags.apply((tags) => tags?.["sst:ref:proxy"]).apply(
        (proxyTag) => proxyTag ? rds.Proxy.get(`${name}Proxy`, proxyTag, void 0, {
          parent: self
        }) : void 0
      );
      return { cluster: cluster2, instance: instance2, proxy: proxy2, password: password2, secret: secret6 };
    }
    function normalizeScaling() {
      return output48(args.scaling).apply((scaling2) => {
        const max = scaling2?.max ?? "4 ACU";
        const min = scaling2?.min ?? "0 ACU";
        const isAutoPauseEnabled = parseACU(min) === 0;
        if (scaling2?.pauseAfter && !isAutoPauseEnabled) {
          throw new VisibleError(
            `Cannot configure "pauseAfter" when the minimum ACU is not 0 for the "${name}" Aurora database.`
          );
        }
        return {
          max,
          min,
          pauseAfter: isAutoPauseEnabled ? scaling2?.pauseAfter ?? "5 minutes" : void 0
        };
      });
    }
    function normalizeReplicas() {
      return output48(args.replicas ?? 0).apply((replicas2) => {
        if (replicas2 > 15) {
          throw new VisibleError(
            `Cannot create more than 15 read-only replicas for the "${name}" Aurora database.`
          );
        }
        return replicas2;
      });
    }
    function normalizeVpc() {
      if (args.vpc instanceof Vpc2) {
        return {
          subnets: args.vpc.privateSubnets,
          securityGroups: args.vpc.securityGroups
        };
      }
      return output48(args.vpc);
    }
    function registerDev() {
      if (!args.dev) return void 0;
      if (false) {
        throw new VisibleError(
          `You must provide the password to connect to your locally running database either by setting the "dev.password" or by setting the top-level "password" property.`
        );
      }
      const dev2 = {
        enabled: false,
        host: output48(args.dev.host ?? "localhost"),
        port: all26([args.dev.port, engine]).apply(
          ([port, engine2]) => port ?? { postgres: 5432, mysql: 3306 }[engine2]
        ),
        username: args.dev.username ? output48(args.dev.username) : username,
        password: output48(args.dev.password ?? args.password ?? ""),
        database: args.dev.database ? output48(args.dev.database) : dbName
      };
      new DevCommand(`${name}Dev`, {
        dev: {
          title: name,
          autostart: true,
          command: `sst print-and-not-quit`
        },
        environment: {
          SST_DEV_COMMAND_MESSAGE: interpolate23`Make sure your local database is using:

  username: "${dev2.username}"
  password: "${dev2.password}"
  database: "${dev2.database}"

Listening on "${dev2.host}:${dev2.port}"...`
        }
      });
      return dev2;
    }
    function createPassword() {
      return args.password ? output48(args.password) : new RandomPassword(
        `${name}Password`,
        {
          length: 32,
          special: false
        },
        { parent: self }
      ).result;
    }
    function createSecret() {
      const secret6 = new secretsmanager.Secret(
        `${name}ProxySecret`,
        {
          recoveryWindowInDays: 0
        },
        { parent: self }
      );
      new secretsmanager.SecretVersion(
        `${name}ProxySecretVersion`,
        {
          secretId: secret6.id,
          secretString: jsonStringify7({ username, password })
        },
        { parent: self }
      );
      return secret6;
    }
    function createSubnetGroup() {
      return new rds.SubnetGroup(
        ...transform(
          args.transform?.subnetGroup,
          `${name}SubnetGroup`,
          {
            subnetIds: vpc.subnets
          },
          { parent: self }
        )
      );
    }
    function createInstanceParameterGroup() {
      return new rds.ParameterGroup(
        ...transform(
          args.transform?.instanceParameterGroup,
          `${name}ParameterGroup`,
          {
            family: all26([engine, version]).apply(([engine2, version2]) => {
              if (engine2 === "postgres")
                return `aurora-postgresql${version2.split(".")[0]}`;
              return version2.startsWith("2") ? `aurora-mysql5.7` : `aurora-mysql8.0`;
            }),
            parameters: []
          },
          { parent: self }
        )
      );
    }
    function createClusterParameterGroup() {
      return new rds.ClusterParameterGroup(
        ...transform(
          args.transform?.clusterParameterGroup,
          `${name}ClusterParameterGroup`,
          {
            family: all26([engine, version]).apply(([engine2, version2]) => {
              if (engine2 === "postgres")
                return `aurora-postgresql${version2.split(".")[0]}`;
              return version2.startsWith("2") ? `aurora-mysql5.7` : `aurora-mysql8.0`;
            }),
            parameters: []
          },
          { parent: self }
        )
      );
    }
    function createCluster() {
      return new rds.Cluster(
        ...transform(
          args.transform?.cluster,
          `${name}Cluster`,
          {
            engine: engine.apply(
              (engine2) => engine2 === "postgres" ? rds.EngineType.AuroraPostgresql : rds.EngineType.AuroraMysql
            ),
            engineMode: "provisioned",
            engineVersion: all26([engine, version]).apply(([engine2, version2]) => {
              if (engine2 === "postgres") return version2;
              return version2.startsWith("2") ? `5.7.mysql_aurora.${version2}` : `8.0.mysql_aurora.${version2}`;
            }),
            databaseName: dbName,
            masterUsername: username,
            masterPassword: password,
            dbClusterParameterGroupName: clusterParameterGroup.name,
            dbInstanceParameterGroupName: instanceParameterGroup.name,
            serverlessv2ScalingConfiguration: scaling.apply((scaling2) => ({
              maxCapacity: parseACU(scaling2.max),
              minCapacity: parseACU(scaling2.min),
              secondsUntilAutoPause: scaling2.pauseAfter ? toSeconds(scaling2.pauseAfter) : void 0
            })),
            skipFinalSnapshot: true,
            storageEncrypted: true,
            enableHttpEndpoint: dataApi,
            dbSubnetGroupName: subnetGroup?.name,
            vpcSecurityGroupIds: vpc.securityGroups,
            tags: proxy.apply((proxy2) => ({
              "sst:ref:password": secret5.id,
              ...proxy2 ? { "sst:ref:proxy": proxy2.id } : {}
            }))
          },
          { parent: self }
        )
      );
    }
    function createInstances() {
      const props = {
        clusterIdentifier: cluster.id,
        instanceClass: "db.serverless",
        engine: cluster.engine.apply((v) => v),
        engineVersion: cluster.engineVersion,
        dbSubnetGroupName: cluster.dbSubnetGroupName,
        dbParameterGroupName: instanceParameterGroup.name
      };
      const instance2 = new rds.ClusterInstance(
        ...transform(args.transform?.instance, `${name}Instance`, props, {
          parent: self
        })
      );
      replicas.apply((replicas2) => {
        for (let i = 0; i < replicas2; i++) {
          new rds.ClusterInstance(
            ...transform(
              args.transform?.instance,
              `${name}Replica${i}`,
              {
                ...props,
                promotionTier: 15
              },
              { parent: self }
            )
          );
        }
      });
      return instance2;
    }
    function createProxy() {
      return all26([args.proxy]).apply(([proxy2]) => {
        if (!proxy2) return;
        const credentials = proxy2 === true ? [] : proxy2.credentials ?? [];
        const secrets = credentials.map((credential) => {
          const secret6 = new secretsmanager.Secret(
            `${name}ProxySecret${credential.username}`,
            {
              recoveryWindowInDays: 0
            },
            { parent: self }
          );
          new secretsmanager.SecretVersion(
            `${name}ProxySecretVersion${credential.username}`,
            {
              secretId: secret6.id,
              secretString: jsonStringify7({
                username: credential.username,
                password: credential.password
              })
            },
            { parent: self }
          );
          return secret6;
        });
        const role = new iam11.Role(
          `${name}ProxyRole`,
          {
            assumeRolePolicy: iam11.assumeRolePolicyForPrincipal({
              Service: "rds.amazonaws.com"
            }),
            inlinePolicies: [
              {
                name: "inline",
                policy: iam11.getPolicyDocumentOutput({
                  statements: [
                    {
                      actions: ["secretsmanager:GetSecretValue"],
                      resources: [secret5.arn, ...secrets.map((s) => s.arn)]
                    }
                  ]
                }).json
              }
            ]
          },
          { parent: self }
        );
        const lookup = new RdsRoleLookup(
          `${name}ProxyRoleLookup`,
          { name: "AWSServiceRoleForRDS" },
          { parent: self }
        );
        return new rds.Proxy(
          ...transform(
            args.transform?.proxy,
            `${name}Proxy`,
            {
              engineFamily: engine.apply(
                (engine2) => engine2 === "postgres" ? "POSTGRESQL" : "MYSQL"
              ),
              auths: [
                {
                  authScheme: "SECRETS",
                  iamAuth: "DISABLED",
                  secretArn: secret5.arn
                },
                ...secrets.map((s) => ({
                  authScheme: "SECRETS",
                  iamAuth: "DISABLED",
                  secretArn: s.arn
                }))
              ],
              roleArn: role.arn,
              vpcSubnetIds: vpc.subnets
            },
            { parent: self, dependsOn: [lookup] }
          )
        );
      });
    }
    function createProxyTarget() {
      proxy.apply((proxy2) => {
        if (!proxy2) return;
        const targetGroup = new rds.ProxyDefaultTargetGroup(
          `${name}ProxyTargetGroup`,
          {
            dbProxyName: proxy2.name
          },
          { parent: self }
        );
        new rds.ProxyTarget(
          `${name}ProxyTarget`,
          {
            dbProxyName: proxy2.name,
            targetGroupName: targetGroup.name,
            dbClusterIdentifier: cluster.clusterIdentifier
          },
          { parent: self }
        );
      });
    }
  }
  /**
   * The ID of the RDS Cluster.
   */
  get id() {
    if (this.dev?.enabled) return output48("placeholder");
    return this.cluster.id;
  }
  /**
   * The ARN of the RDS Cluster.
   */
  get clusterArn() {
    if (this.dev?.enabled) return output48("placeholder");
    return this.cluster.arn;
  }
  /**
   * The ARN of the master user secret.
   */
  get secretArn() {
    if (this.dev?.enabled) return output48("placeholder");
    return this.secret.arn;
  }
  /** The username of the master user. */
  get username() {
    if (this.dev?.enabled) return this.dev.username;
    return this.cluster.masterUsername;
  }
  /** The password of the master user. */
  get password() {
    if (this.dev?.enabled) return this.dev.password;
    return this._password;
  }
  /**
   * The name of the database.
   */
  get database() {
    if (this.dev?.enabled) return this.dev.database;
    return this.cluster.databaseName;
  }
  /**
   * The port of the database.
   */
  get port() {
    if (this.dev?.enabled) return this.dev.port;
    return this.instance.port;
  }
  /**
   * The host of the database.
   */
  get host() {
    if (this.dev?.enabled) return this.dev.host;
    return all26([this.cluster.endpoint, this.proxy]).apply(
      ([endpoint, proxy]) => proxy?.endpoint ?? output48(endpoint.split(":")[0])
    );
  }
  /**
   * The reader endpoint of the database.
   */
  get reader() {
    if (this.dev?.enabled) return this.dev.host;
    return all26([this.cluster.readerEndpoint, this.proxy]).apply(
      ([endpoint, proxy]) => {
        if (proxy) {
          throw new VisibleError(
            "Reader endpoint is not currently supported for RDS Proxy. Please contact us on Discord or open a GitHub issue."
          );
        }
        return output48(endpoint.split(":")[0]);
      }
    );
  }
  get nodes() {
    return {
      cluster: this.cluster,
      instance: this.instance
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        clusterArn: this.clusterArn,
        secretArn: this.secretArn,
        database: this.database,
        username: this.username,
        password: this.password,
        port: this.port,
        host: this.host,
        reader: this.dev?.enabled ? this.dev.host : all26([this.cluster.readerEndpoint, this.proxy]).apply(
          ([endpoint, proxy]) => {
            if (proxy) return output48(void 0);
            return output48(endpoint.split(":")[0]);
          }
        )
      },
      include: this.dev?.enabled ? [] : [
        permission({
          actions: ["secretsmanager:GetSecretValue"],
          resources: [this.secretArn]
        }),
        permission({
          actions: [
            "rds-data:BatchExecuteStatement",
            "rds-data:BeginTransaction",
            "rds-data:CommitTransaction",
            "rds-data:ExecuteStatement",
            "rds-data:RollbackTransaction"
          ],
          resources: [this.clusterArn]
        })
      ]
    };
  }
  /**
   * Reference an existing Aurora cluster with its RDS cluster ID. This is useful when you
   * create a Aurora cluster in one stage and want to share it in another. It avoids having to
   * create a new Aurora cluster in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share Aurora clusters across stages.
   * :::
   *
   * @param name The name of the component.
   * @param id The ID of the existing Aurora cluster.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a cluster in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new cluster, you want to share the same cluster from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const database = $app.stage === "frank"
   *   ? sst.aws.Aurora.get("MyDatabase", "app-dev-mydatabase")
   *   : new sst.aws.Aurora("MyDatabase");
   * ```
   *
   * Here `app-dev-mydatabase` is the ID of the cluster created in the `dev` stage.
   * You can find this by outputting the cluster ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return database.id;
   * ```
   */
  static get(name, id, opts) {
    return new _Aurora(
      name,
      {
        ref: true,
        id
      },
      opts
    );
  }
};
var __pulumiType41 = "sst:aws:Aurora";
Aurora.__pulumiType = __pulumiType41;

// .sst/platform/src/components/aws/auth.ts
import {
  jsonStringify as jsonStringify8
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/auth-v1.ts
import {
  output as output49,
  secret as secret2
} from "@pulumi/pulumi";
import { PrivateKey as PrivateKey2 } from "@pulumi/tls";
var Auth = class extends Component {
  _key;
  _authenticator;
  constructor(name, args, opts) {
    super(__pulumiType42, name, args, opts);
    this._key = new PrivateKey2(`${name}Keypair`, {
      algorithm: "RSA"
    });
    this._authenticator = output49(args.authenticator).apply((args2) => {
      return new Function(`${name}Authenticator`, {
        url: true,
        ...args2,
        environment: {
          ...args2.environment,
          AUTH_PRIVATE_KEY: secret2(this.key.privateKeyPemPkcs8),
          AUTH_PUBLIC_KEY: secret2(this.key.publicKeyPem)
        },
        _skipHint: true
      });
    });
  }
  get key() {
    return this._key;
  }
  get authenticator() {
    return this._authenticator;
  }
  get url() {
    return this._authenticator.url;
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        publicKey: secret2(this.key.publicKeyPem)
      }
    };
  }
};
var __pulumiType42 = "sst:aws:Auth";
Auth.__pulumiType = __pulumiType42;

// .sst/platform/src/components/aws/auth.ts
var Auth2 = class extends Component {
  _table;
  _issuer;
  _router;
  static v1 = Auth;
  constructor(name, args, opts) {
    super(__pulumiType43, name, args, opts);
    const _version = 2;
    const self = this;
    self.registerVersion({
      new: _version,
      old: define_cli_default.state.version[name],
      message: [
        `There is a new version of "Auth" that has breaking changes.`,
        ``,
        `What changed:`,
        `  - The latest version is now powered by OpenAuth - https://openauth.js.org`,
        ``,
        `To upgrade:`,
        `  - Set \`forceUpgrade: "v${_version}"\` on the "Auth" component. Learn more https://sst.dev/docs/component/aws/auth#forceupgrade`,
        ``,
        `To continue using v${define_cli_default.state.version[name]}:`,
        `  - Rename "Auth" to "Auth.v${define_cli_default.state.version[name]}". Learn more about versioning - https://sst.dev/docs/components/#versioning`
      ].join("\n"),
      forceUpgrade: args.forceUpgrade
    });
    const table = createTable();
    const issuer = createIssuer();
    const router = createRouter();
    this._table = table;
    this._issuer = issuer;
    this._router = router;
    registerOutputs();
    function registerOutputs() {
      self.registerOutputs({
        _hint: self.url
      });
    }
    function createTable() {
      return new Dynamo(
        `${name}Storage`,
        {
          fields: { pk: "string", sk: "string" },
          primaryIndex: { hashKey: "pk", rangeKey: "sk" },
          ttl: "expiry"
        },
        { parent: self }
      );
    }
    function createIssuer() {
      const fn = args.authorizer || args.issuer;
      if (!fn) throw new Error("Auth: issuer field must be set");
      return functionBuilder(
        `${name}Issuer`,
        fn,
        {
          link: [table],
          environment: {
            OPENAUTH_STORAGE: jsonStringify8({
              type: "dynamo",
              options: { table: table.name }
            })
          },
          _skipHint: true
        },
        (args2) => {
          args2.url = {
            cors: false
          };
        },
        { parent: self }
      ).apply((v) => v.getFunction());
    }
    function createRouter() {
      if (!args.domain) return;
      const router2 = new Router(
        `${name}Router`,
        {
          domain: args.domain,
          _skipHint: true
        },
        { parent: self }
      );
      router2.route("/", issuer.url);
      return router2;
    }
  }
  /**
   * The URL of the Auth component.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated function URL for the issuer.
   */
  get url() {
    return this._router?.url ?? this._issuer.url.apply((v) => v.slice(0, -1));
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The DynamoDB component.
       */
      table: this._table,
      /**
       * The Function component for the issuer.
       */
      issuer: this._issuer,
      /**
       * @deprecated Use `issuer` instead.
       * The Function component for the issuer.
       */
      authorizer: this._issuer,
      /**
       * The Router component for the custom domain.
       */
      router: this._router
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url
      },
      include: [
        env({
          OPENAUTH_ISSUER: this.url
        })
      ]
    };
  }
};
var __pulumiType43 = "sst:aws:Auth";
Auth2.__pulumiType = __pulumiType43;

// .sst/platform/src/components/aws/bus.ts
import { output as output53 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/bus-lambda-subscriber.ts
import {
  interpolate as interpolate24,
  output as output51
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/bus-base-subscriber.ts
import { output as output50 } from "@pulumi/pulumi";
import { cloudwatch as cloudwatch6 } from "@pulumi/aws";
function createRule(name, eventBusName, args, parent) {
  return new cloudwatch6.EventRule(
    ...transform(
      args?.transform?.rule,
      `${name}Rule`,
      {
        eventBusName,
        eventPattern: args.pattern ? output50(args.pattern).apply(
          (pattern) => JSON.stringify({
            "detail-type": pattern.detailType,
            source: pattern.source,
            detail: pattern.detail
          })
        ) : JSON.stringify({
          source: [{ prefix: "" }]
        })
      },
      { parent }
    )
  );
}

// .sst/platform/src/components/aws/bus-lambda-subscriber.ts
import { cloudwatch as cloudwatch7, lambda as lambda14 } from "@pulumi/aws";
var BusLambdaSubscriber = class extends Component {
  fn;
  permission;
  rule;
  target;
  constructor(name, args, opts) {
    super(__pulumiType44, name, args, opts);
    const self = this;
    const bus = output51(args.bus);
    const rule = createRule(name, bus.name, args, self);
    const fn = createFunction();
    const permission2 = createPermission();
    const target = createTarget();
    this.fn = fn;
    this.permission = permission2;
    this.rule = rule;
    this.target = target;
    function createFunction() {
      return functionBuilder(
        `${name}Function`,
        args.subscriber,
        {
          description: interpolate24`Subscribed to ${bus.name}`
        },
        void 0,
        { parent: self }
      );
    }
    function createPermission() {
      return new lambda14.Permission(
        `${name}Permission`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn,
          principal: "events.amazonaws.com",
          sourceArn: rule.arn
        },
        { parent: self }
      );
    }
    function createTarget() {
      return new cloudwatch7.EventTarget(
        ...transform(
          args?.transform?.target,
          `${name}Target`,
          {
            arn: fn.arn,
            rule: rule.name,
            eventBusName: bus.name
          },
          { parent: self, dependsOn: [permission2] }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function that'll be notified.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda permission.
       */
      permission: this.permission,
      /**
       * The EventBus rule.
       */
      rule: this.rule,
      /**
       * The EventBus target.
       */
      target: this.target
    };
  }
};
var __pulumiType44 = "sst:aws:BusLambdaSubscriber";
BusLambdaSubscriber.__pulumiType = __pulumiType44;

// .sst/platform/src/components/aws/bus.ts
import { cloudwatch as cloudwatch9 } from "@pulumi/aws";

// .sst/platform/src/components/aws/bus-queue-subscriber.ts
import { output as output52 } from "@pulumi/pulumi";
import { cloudwatch as cloudwatch8 } from "@pulumi/aws";
var BusQueueSubscriber = class extends Component {
  policy;
  rule;
  target;
  constructor(name, args, opts) {
    super(__pulumiType45, name, args, opts);
    const self = this;
    const bus = output52(args.bus);
    const queueArn = output52(args.queue).apply(
      (queue) => queue instanceof Queue ? queue.arn : output52(queue)
    );
    const policy = createPolicy();
    const rule = createRule(name, bus.name, args, self);
    const target = createTarget();
    this.policy = policy;
    this.rule = rule;
    this.target = target;
    function createPolicy() {
      return Queue.createPolicy(`${name}Policy`, queueArn, { parent: self });
    }
    function createTarget() {
      return new cloudwatch8.EventTarget(
        ...transform(
          args?.transform?.target,
          `${name}Target`,
          {
            arn: queueArn,
            rule: rule.name,
            eventBusName: bus.name
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The SQS Queue policy.
       */
      policy: this.policy,
      /**
       * The EventBus rule.
       */
      rule: this.rule,
      /**
       * The EventBus target.
       */
      target: this.target
    };
  }
};
var __pulumiType45 = "sst:aws:BusQueueSubscriber";
BusQueueSubscriber.__pulumiType = __pulumiType45;

// .sst/platform/src/components/aws/bus.ts
var Bus = class _Bus extends Component {
  constructorName;
  constructorOpts;
  bus;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType46, name, args, opts);
    const self = this;
    this.constructorName = name;
    this.constructorOpts = opts;
    if (args && "ref" in args) {
      const ref = reference();
      this.bus = ref.bus;
      return;
    }
    const bus = createBus();
    this.bus = bus;
    function reference() {
      const ref = args;
      const bus2 = cloudwatch9.EventBus.get(
        `${name}Bus`,
        ref.busName,
        void 0,
        {
          parent: self
        }
      );
      return { bus: bus2 };
    }
    function createBus() {
      return new cloudwatch9.EventBus(
        ...transform(args.transform?.bus, `${name}Bus`, {}, { parent: self })
      );
    }
  }
  /**
   * The ARN of the EventBus.
   */
  get arn() {
    return this.bus.arn;
  }
  /**
   * The name of the EventBus.
   */
  get name() {
    return this.bus.name;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon EventBus resource.
       */
      bus: this.bus
    };
  }
  /**
   * Subscribe to this EventBus with a function.
   *
   * @param name The name of the subscription.
   * @param subscriber The function that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * ```js title="sst.config.ts"
   * bus.subscribe("MySubscription", "src/subscriber.handler");
   * ```
   *
   * You can add a pattern to the subscription.
   *
   * ```js
   * bus.subscribe("MySubscription", "src/subscriber.handler", {
   *   pattern: {
   *     source: ["my.source", "my.source2"],
   *     price_usd: [{numeric: [">=", 100]}]
   *   }
   * });
   * ```
   *
   * To customize the subscriber function:
   *
   * ```js
   * bus.subscribe("MySubscription", {
   *   handler: "src/subscriber.handler",
   *   timeout: "60 seconds"
   * });
   * ```
   *
   * Or pass in the ARN of an existing Lambda function.
   *
   * ```js title="sst.config.ts"
   * bus.subscribe("MySubscription", "arn:aws:lambda:us-east-1:123456789012:function:my-function");
   * ```
   */
  subscribe(name, subscriber, args = {}) {
    return _Bus._subscribeFunction(
      this.constructorName,
      name,
      this.nodes.bus.name,
      this.nodes.bus.arn,
      subscriber,
      args,
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Subscribe to an EventBus that was not created in your app with a function.
   *
   * @param name The name of the subscription.
   * @param busArn The ARN of the EventBus to subscribe to.
   * @param subscriber The function that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have an existing EventBus with the following ARN.
   *
   * ```js title="sst.config.ts"
   * const busArn = "arn:aws:events:us-east-1:123456789012:event-bus/my-bus";
   * ```
   *
   * You can subscribe to it by passing in the ARN.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bus.subscribe("MySubscription", busArn, "src/subscriber.handler");
   * ```
   *
   * To add a pattern to the subscription.
   *
   * ```js
   * sst.aws.Bus.subscribe("MySubscription", busArn, "src/subscriber.handler", {
   *   pattern: {
   *     price_usd: [{numeric: [">=", 100]}]
   *   }
   * });
   * ```
   *
   * Or customize the subscriber function.
   *
   * ```js
   * sst.aws.Bus.subscribe("MySubscription", busArn, {
   *   handler: "src/subscriber.handler",
   *   timeout: "60 seconds"
   * });
   * ```
   */
  static subscribe(name, busArn, subscriber, args) {
    return output53(busArn).apply((busArn2) => {
      const busName = parseEventBusArn(busArn2).busName;
      return this._subscribeFunction(
        busName,
        name,
        busName,
        busArn2,
        subscriber,
        args
      );
    });
  }
  static _subscribeFunction(name, subscriberName, busName, busArn, subscriber, args = {}, opts = {}) {
    return output53(args).apply((args2) => {
      return new BusLambdaSubscriber(
        `${name}Subscriber${subscriberName}`,
        {
          bus: { name: busName, arn: busArn },
          subscriber,
          ...args2
        },
        opts
      );
    });
  }
  /**
   * Subscribe to this EventBus with an SQS Queue.
   *
   * @param name The name of the subscription.
   * @param queue The queue that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have a queue.
   *
   * ```js title="sst.config.ts"
   * const queue = new sst.aws.Queue("MyQueue");
   * ```
   *
   * You can subscribe to this bus with it.
   *
   * ```js title="sst.config.ts"
   * bus.subscribeQueue("MySubscription", queue);
   * ```
   *
   * You can also add a filter to the subscription.
   *
   * ```js
   * bus.subscribeQueue("MySubscription", queue, {
   *   filter: {
   *     price_usd: [{numeric: [">=", 100]}]
   *   }
   * });
   * ```
   *
   * Or pass in the ARN of an existing SQS queue.
   *
   * ```js
   * bus.subscribeQueue("MySubscription", "arn:aws:sqs:us-east-1:123456789012:my-queue");
   * ```
   */
  subscribeQueue(name, queue, args = {}) {
    return _Bus._subscribeQueue(
      this.constructorName,
      name,
      this.nodes.bus.arn,
      this.nodes.bus.name,
      queue,
      args
    );
  }
  /**
   * Subscribe to an existing EventBus with an SQS Queue.
   *
   * @param name The name of the subscription.
   * @param busArn The ARN of the EventBus to subscribe to.
   * @param queue The queue that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * For example, let's say you have an existing EventBus and an SQS Queue.
   *
   * ```js title="sst.config.ts"
   * const busArn = "arn:aws:events:us-east-1:123456789012:event-bus/MyBus";
   * const queue = new sst.aws.Queue("MyQueue");
   * ```
   *
   * You can subscribe to the bus with the queue.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bus.subscribeQueue("MySubscription", busArn, queue);
   * ```
   *
   * Add a filter to the subscription.
   *
   * ```js title="sst.config.ts"
   * sst.aws.Bus.subscribeQueue(MySubscription, busArn, queue, {
   *   filter: {
   *     price_usd: [{numeric: [">=", 100]}]
   *   }
   * });
   * ```
   *
   * Or pass in the ARN of an existing SQS queue.
   *
   * ```js
   * sst.aws.Bus.subscribeQueue("MySubscription", busArn, "arn:aws:sqs:us-east-1:123456789012:my-queue");
   * ```
   */
  static subscribeQueue(name, busArn, queue, args) {
    return output53(busArn).apply((busArn2) => {
      const busName = parseEventBusArn(busArn2).busName;
      return this._subscribeQueue(busName, name, busArn2, busName, queue, args);
    });
  }
  static _subscribeQueue(name, subscriberName, busArn, busName, queue, args = {}) {
    return output53(args).apply((args2) => {
      return new BusQueueSubscriber(`${name}Subscriber${subscriberName}`, {
        bus: { name: busName, arn: busArn },
        queue,
        ...args2
      });
    });
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        name: this.name,
        arn: this.arn
      },
      include: [
        permission({
          actions: ["events:*"],
          resources: [this.nodes.bus.arn]
        })
      ]
    };
  }
  /**
   * Reference an existing EventBus with its ARN. This is useful when you create a
   * bus in one stage and want to share it in another stage. It avoids having to create
   * a new bus in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share EventBus across stages.
   * :::
   *
   * @param name The name of the component.
   * @param busName The name of the existing EventBus.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a bus in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new bus, you want to share the bus from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const bus = $app.stage === "frank"
   *   ? sst.aws.Bus.get("MyBus", "app-dev-MyBus")
   *   : new sst.aws.Bus("MyBus");
   * ```
   *
   * Here `app-dev-MyBus` is the name of the bus created in the `dev` stage. You can find
   * this by outputting the bus name in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return bus.name;
   * ```
   */
  static get(name, busName, opts) {
    return new _Bus(
      name,
      {
        ref: true,
        busName
      },
      opts
    );
  }
};
var __pulumiType46 = "sst:aws:Bus";
Bus.__pulumiType = __pulumiType46;

// .sst/platform/src/components/aws/cluster.ts
import { output as output58 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/service.ts
import {
  all as all29,
  interpolate as interpolate26,
  output as output55
} from "@pulumi/pulumi";
import {
  appautoscaling,
  ec2 as ec24,
  ecs as ecs2,
  getRegionOutput as getRegionOutput5,
  lb,
  servicediscovery as servicediscovery2
} from "@pulumi/aws";

// .sst/platform/src/components/aws/fargate.ts
import fs7 from "fs";
import path8 from "path";
import { interpolate as interpolate25, secret as secret3 } from "@pulumi/pulumi";
import { all as all28, output as output54 } from "@pulumi/pulumi";
import { Platform } from "@pulumi/docker-build";
import {
  cloudwatch as cloudwatch10,
  ecr as ecr2,
  ecs,
  getCallerIdentityOutput as getCallerIdentityOutput2,
  getPartitionOutput as getPartitionOutput4,
  getRegionOutput as getRegionOutput4,
  iam as iam12
} from "@pulumi/aws";

// .sst/platform/src/components/aws/helpers/container-builder.ts
import { all as all27 } from "@pulumi/pulumi";
import { Image as Image2 } from "@pulumi/docker-build";
var limiter2 = new Semaphore(
  parseInt(process.env.SST_BUILD_CONCURRENCY_CONTAINER || "1")
);
function imageBuilder(name, args, opts) {
  return all27([args]).apply(async ([args2]) => {
    await limiter2.acquire(name);
    const image = new Image2(
      name,
      {
        ...process.env.BUILDX_BUILDER ? { builder: { name: process.env.BUILDX_BUILDER } } : {},
        ...args2
      },
      opts
    );
    return image.urn.apply(() => {
      limiter2.release();
      return image;
    });
  });
}

// .sst/platform/src/components/cpu.ts
function toNumber(cpu) {
  const [count, unit] = cpu.split(" ");
  const countNum = parseFloat(count);
  if (unit === "vCPU") {
    return countNum * 1024;
  }
  throw new Error(`Invalid CPU ${cpu}`);
}

// .sst/platform/src/components/aws/fargate.ts
var supportedCpus = {
  "0.25 vCPU": 256,
  "0.5 vCPU": 512,
  "1 vCPU": 1024,
  "2 vCPU": 2048,
  "4 vCPU": 4096,
  "8 vCPU": 8192,
  "16 vCPU": 16384
};
var supportedMemories = {
  "0.25 vCPU": {
    "0.5 GB": 512,
    "1 GB": 1024,
    "2 GB": 2048
  },
  "0.5 vCPU": {
    "1 GB": 1024,
    "2 GB": 2048,
    "3 GB": 3072,
    "4 GB": 4096
  },
  "1 vCPU": {
    "2 GB": 2048,
    "3 GB": 3072,
    "4 GB": 4096,
    "5 GB": 5120,
    "6 GB": 6144,
    "7 GB": 7168,
    "8 GB": 8192
  },
  "2 vCPU": {
    "4 GB": 4096,
    "5 GB": 5120,
    "6 GB": 6144,
    "7 GB": 7168,
    "8 GB": 8192,
    "9 GB": 9216,
    "10 GB": 10240,
    "11 GB": 11264,
    "12 GB": 12288,
    "13 GB": 13312,
    "14 GB": 14336,
    "15 GB": 15360,
    "16 GB": 16384
  },
  "4 vCPU": {
    "8 GB": 8192,
    "9 GB": 9216,
    "10 GB": 10240,
    "11 GB": 11264,
    "12 GB": 12288,
    "13 GB": 13312,
    "14 GB": 14336,
    "15 GB": 15360,
    "16 GB": 16384,
    "17 GB": 17408,
    "18 GB": 18432,
    "19 GB": 19456,
    "20 GB": 20480,
    "21 GB": 21504,
    "22 GB": 22528,
    "23 GB": 23552,
    "24 GB": 24576,
    "25 GB": 25600,
    "26 GB": 26624,
    "27 GB": 27648,
    "28 GB": 28672,
    "29 GB": 29696,
    "30 GB": 30720
  },
  "8 vCPU": {
    "16 GB": 16384,
    "20 GB": 20480,
    "24 GB": 24576,
    "28 GB": 28672,
    "32 GB": 32768,
    "36 GB": 36864,
    "40 GB": 40960,
    "44 GB": 45056,
    "48 GB": 49152,
    "52 GB": 53248,
    "56 GB": 57344,
    "60 GB": 61440
  },
  "16 vCPU": {
    "32 GB": 32768,
    "40 GB": 40960,
    "48 GB": 49152,
    "56 GB": 57344,
    "64 GB": 65536,
    "72 GB": 73728,
    "80 GB": 81920,
    "88 GB": 90112,
    "96 GB": 98304,
    "104 GB": 106496,
    "112 GB": 114688,
    "120 GB": 122880
  }
};
function normalizeArchitecture(args) {
  return output54(args.architecture ?? "x86_64").apply((v) => v);
}
function normalizeCpu(args) {
  return output54(args.cpu ?? "0.25 vCPU").apply((v) => {
    if (!supportedCpus[v]) {
      throw new Error(
        `Unsupported CPU: ${v}. The supported values for CPU are ${Object.keys(
          supportedCpus
        ).join(", ")}`
      );
    }
    return v;
  });
}
function normalizeMemory(cpu, args) {
  return all28([cpu, args.memory ?? "0.5 GB"]).apply(([cpu2, v]) => {
    if (!(v in supportedMemories[cpu2])) {
      throw new Error(
        `Unsupported memory: ${v}. The supported values for memory for a ${cpu2} CPU are ${Object.keys(
          supportedMemories[cpu2]
        ).join(", ")}`
      );
    }
    return v;
  });
}
function normalizeStorage(args) {
  return output54(args.storage ?? "20 GB").apply((v) => {
    const storage = toGBs(v);
    if (storage < 20 || storage > 200)
      throw new Error(
        `Unsupported storage: ${v}. The supported value for storage is between "20 GB" and "200 GB"`
      );
    return v;
  });
}
function normalizeContainers(type, args, name, architecture) {
  if (args.containers && (args.image || args.logging || args.environment || args.environmentFiles || args.volumes || args.health || args.ssm)) {
    throw new VisibleError(
      type === "service" ? `You cannot provide both "containers" and "image", "logging", "environment", "environmentFiles", "volumes", "health" or "ssm".` : `You cannot provide both "containers" and "image", "logging", "environment", "environmentFiles", "volumes" or "ssm".`
    );
  }
  const containers = args.containers ?? [
    {
      name,
      cpu: void 0,
      memory: void 0,
      image: args.image,
      logging: args.logging,
      environment: args.environment,
      environmentFiles: args.environmentFiles,
      ssm: args.ssm,
      volumes: args.volumes,
      command: args.command,
      entrypoint: args.entrypoint,
      health: type === "service" ? args.health : void 0,
      dev: type === "service" ? args.dev : void 0
    }
  ];
  return output54(containers).apply(
    (containers2) => containers2.map((v) => {
      return {
        ...v,
        volumes: normalizeVolumes(),
        image: normalizeImage(),
        logging: normalizeLogging()
      };
      function normalizeVolumes() {
        return output54(v.volumes).apply(
          (volumes) => volumes?.map((volume) => ({
            path: volume.path,
            efs: volume.efs instanceof Efs ? {
              fileSystem: volume.efs.id,
              accessPoint: volume.efs.accessPoint
            } : volume.efs
          }))
        );
      }
      function normalizeImage() {
        return all28([v.image, architecture]).apply(([image, architecture2]) => {
          if (typeof image === "string") return image;
          return {
            ...image,
            context: image?.context ?? ".",
            platform: architecture2 === "arm64" ? Platform.Linux_arm64 : Platform.Linux_amd64
          };
        });
      }
      function normalizeLogging() {
        return all28([v.logging, args.cluster.nodes.cluster.name]).apply(
          ([logging, clusterName]) => ({
            ...logging,
            retention: logging?.retention ?? "1 month",
            name: logging?.name ?? // In the case of shared Cluster across stage, log group name can thrash
            // if Task name is the same. Need to suffix the task name with random hash.
            `/sst/cluster/${clusterName}/${physicalName(64, name)}/${v.name}`
          })
        );
      }
    })
  );
}
function createTaskRole(name, args, opts, parent, dev, additionalPermissions) {
  if (args.taskRole)
    return iam12.Role.get(`${name}TaskRole`, args.taskRole, {}, { parent });
  const policy = all28([
    args.permissions ?? [],
    Link.getInclude("aws.permission", args.link),
    additionalPermissions ?? []
  ]).apply(
    ([argsPermissions, linkPermissions, additionalPermissions2]) => iam12.getPolicyDocumentOutput({
      statements: [
        ...argsPermissions,
        ...linkPermissions,
        ...additionalPermissions2,
        {
          actions: [
            "ssmmessages:CreateControlChannel",
            "ssmmessages:CreateDataChannel",
            "ssmmessages:OpenControlChannel",
            "ssmmessages:OpenDataChannel"
          ],
          resources: ["*"]
        }
      ].map((item) => ({
        effect: (() => {
          const effect = item.effect ?? "allow";
          return effect.charAt(0).toUpperCase() + effect.slice(1);
        })(),
        actions: item.actions,
        resources: item.resources
      }))
    })
  );
  return new iam12.Role(
    ...transform(
      args.transform?.taskRole,
      `${name}TaskRole`,
      {
        assumeRolePolicy: iam12.assumeRolePolicyForPrincipal({
          Service: "ecs-tasks.amazonaws.com",
          ...dev ? { AWS: getCallerIdentityOutput2({}, opts).accountId } : {}
        }),
        inlinePolicies: policy.apply(
          ({ statements }) => statements ? [{ name: "inline", policy: policy.json }] : []
        )
      },
      { parent }
    )
  );
}
function createExecutionRole(name, args, opts, parent) {
  if (args.executionRole)
    return iam12.Role.get(
      `${name}ExecutionRole`,
      args.executionRole,
      {},
      { parent }
    );
  return new iam12.Role(
    ...transform(
      args.transform?.executionRole,
      `${name}ExecutionRole`,
      {
        assumeRolePolicy: iam12.assumeRolePolicyForPrincipal({
          Service: "ecs-tasks.amazonaws.com"
        }),
        managedPolicyArns: [
          interpolate25`arn:${getPartitionOutput4({}, opts).partition}:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy`
        ],
        inlinePolicies: [
          {
            name: "inline",
            policy: iam12.getPolicyDocumentOutput({
              statements: [
                {
                  sid: "ReadSsmAndSecrets",
                  actions: [
                    "ssm:GetParameters",
                    "ssm:GetParameter",
                    "ssm:GetParameterHistory",
                    "secretsmanager:GetSecretValue"
                  ],
                  resources: ["*"]
                },
                ...args.environmentFiles ? [
                  {
                    sid: "ReadEnvironmentFiles",
                    actions: ["s3:GetObject"],
                    resources: args.environmentFiles
                  }
                ] : []
              ]
            }).json
          }
        ]
      },
      { parent }
    )
  );
}
function createTaskDefinition(name, args, opts, parent, containers, architecture, cpu, memory, storage, taskRole, executionRole) {
  const clusterName = args.cluster.nodes.cluster.name;
  const region = getRegionOutput4({}, opts).name;
  const bootstrapData = region.apply((region2) => bootstrap.forRegion(region2));
  const linkEnvs = Link.propertiesToEnv(Link.getProperties(args.link));
  const containerDefinitions = output54(containers).apply(
    (containers2) => containers2.map((container) => ({
      name: container.name,
      image: (() => {
        if (typeof container.image === "string") return output54(container.image);
        const containerImage = container.image;
        const contextPath = path8.join(define_cli_default.paths.root, container.image.context);
        const dockerfile = container.image.dockerfile ?? "Dockerfile";
        const dockerfilePath = path8.join(contextPath, dockerfile);
        const dockerIgnorePath = fs7.existsSync(
          path8.join(contextPath, `${dockerfile}.dockerignore`)
        ) ? path8.join(contextPath, `${dockerfile}.dockerignore`) : path8.join(contextPath, ".dockerignore");
        const lines = fs7.existsSync(dockerIgnorePath) ? fs7.readFileSync(dockerIgnorePath).toString().split("\n") : [];
        if (!lines.find((line) => line === ".sst")) {
          fs7.writeFileSync(
            dockerIgnorePath,
            [...lines, "", "# sst", ".sst"].join("\n")
          );
        }
        const image = imageBuilder(
          ...transform(
            args.transform?.image,
            `${name}Image${container.name}`,
            {
              context: { location: contextPath },
              dockerfile: { location: dockerfilePath },
              buildArgs: containerImage.args,
              secrets: linkEnvs,
              target: container.image.target,
              platforms: [container.image.platform],
              tags: [container.name, ...container.image.tags ?? []].map(
                (tag) => interpolate25`${bootstrapData.assetEcrUrl}:${tag}`
              ),
              registries: [
                ecr2.getAuthorizationTokenOutput(
                  {
                    registryId: bootstrapData.assetEcrRegistryId
                  },
                  { parent }
                ).apply((authToken) => ({
                  address: authToken.proxyEndpoint,
                  password: secret3(authToken.password),
                  username: authToken.userName
                }))
              ],
              cacheFrom: [
                {
                  registry: {
                    ref: interpolate25`${bootstrapData.assetEcrUrl}:${container.name}-cache`
                  }
                }
              ],
              cacheTo: [
                {
                  registry: {
                    ref: interpolate25`${bootstrapData.assetEcrUrl}:${container.name}-cache`,
                    imageManifest: true,
                    ociMediaTypes: true,
                    mode: "max"
                  }
                }
              ],
              push: true
            },
            { parent }
          )
        );
        return interpolate25`${bootstrapData.assetEcrUrl}@${image.digest}`;
      })(),
      cpu: container.cpu ? toNumber(container.cpu) : void 0,
      memory: container.memory ? toMBs(container.memory) : void 0,
      command: container.command,
      entrypoint: container.entrypoint,
      healthCheck: container.health && {
        command: container.health.command,
        startPeriod: toSeconds(container.health.startPeriod ?? "0 seconds"),
        timeout: toSeconds(container.health.timeout ?? "5 seconds"),
        interval: toSeconds(container.health.interval ?? "30 seconds"),
        retries: container.health.retries ?? 3
      },
      pseudoTerminal: true,
      portMappings: [{ containerPortRange: "1-65535" }],
      logConfiguration: {
        logDriver: "awslogs",
        options: {
          "awslogs-group": (() => {
            return new cloudwatch10.LogGroup(
              ...transform(
                args.transform?.logGroup,
                `${name}LogGroup${container.name}`,
                {
                  name: container.logging.name,
                  retentionInDays: RETENTION[container.logging.retention]
                },
                { parent, ignoreChanges: ["name"] }
              )
            );
          })().name,
          "awslogs-region": region,
          "awslogs-stream-prefix": "/service"
        }
      },
      environment: linkEnvs.apply(
        (linkEnvs2) => Object.entries({
          ...container.environment,
          ...linkEnvs2
        }).map(([name2, value]) => ({ name: name2, value }))
      ),
      environmentFiles: container.environmentFiles?.map((file) => ({
        type: "s3",
        value: file
      })),
      linuxParameters: {
        initProcessEnabled: true
      },
      mountPoints: container.volumes?.map((volume) => ({
        sourceVolume: volume.efs.accessPoint,
        containerPath: volume.path
      })),
      secrets: Object.entries(container.ssm ?? {}).map(([name2, valueFrom]) => ({
        name: name2,
        valueFrom
      }))
    }))
  );
  return storage.apply(
    (storage2) => new ecs.TaskDefinition(
      ...transform(
        args.transform?.taskDefinition,
        `${name}Task`,
        {
          family: interpolate25`${clusterName}-${name}`,
          trackLatest: true,
          cpu: cpu.apply((v) => toNumber(v).toString()),
          memory: memory.apply((v) => toMBs(v).toString()),
          networkMode: "awsvpc",
          ephemeralStorage: (() => {
            const sizeInGib = toGBs(storage2);
            return sizeInGib === 20 ? void 0 : { sizeInGib };
          })(),
          requiresCompatibilities: ["FARGATE"],
          runtimePlatform: {
            cpuArchitecture: architecture.apply((v) => v.toUpperCase()),
            operatingSystemFamily: "LINUX"
          },
          executionRoleArn: executionRole.arn,
          taskRoleArn: taskRole.arn,
          volumes: output54(containers).apply((containers2) => {
            const uniqueAccessPoints = /* @__PURE__ */ new Set();
            return containers2.flatMap(
              (container) => (container.volumes ?? []).flatMap((volume) => {
                if (uniqueAccessPoints.has(volume.efs.accessPoint)) return [];
                uniqueAccessPoints.add(volume.efs.accessPoint);
                return {
                  name: volume.efs.accessPoint,
                  efsVolumeConfiguration: {
                    fileSystemId: volume.efs.fileSystem,
                    transitEncryption: "ENABLED",
                    authorizationConfig: {
                      accessPointId: volume.efs.accessPoint
                    }
                  }
                };
              })
            );
          }),
          containerDefinitions: jsonStringify(containerDefinitions)
        },
        { parent }
      )
    )
  );
}

// .sst/platform/src/components/aws/service.ts
var Service = class extends Component {
  _name;
  _service;
  cloudmapNamespace;
  cloudmapService;
  executionRole;
  taskRole;
  taskDefinition;
  loadBalancer;
  autoScalingTarget;
  domain;
  _url;
  devUrl;
  dev;
  constructor(name, args, opts = {}) {
    super(__pulumiType47, name, args, opts);
    this._name = name;
    const self = this;
    const clusterArn = args.cluster.nodes.cluster.arn;
    const clusterName = args.cluster.nodes.cluster.name;
    const region = getRegionOutput5({}, opts).name;
    const dev = normalizeDev();
    const wait = output55(args.wait ?? false);
    const architecture = normalizeArchitecture(args);
    const cpu = normalizeCpu(args);
    const memory = normalizeMemory(cpu, args);
    const storage = normalizeStorage(args);
    const containers = normalizeContainers("service", args, name, architecture);
    const lbArgs = normalizeLoadBalancer();
    const scaling = normalizeScaling();
    const capacity = normalizeCapacity();
    const vpc = normalizeVpc();
    const taskRole = createTaskRole(name, args, opts, self, !!dev);
    this.dev = !!dev;
    this.cloudmapNamespace = vpc.cloudmapNamespaceName;
    this.taskRole = taskRole;
    if (dev) {
      this.devUrl = !lbArgs ? void 0 : dev.url;
      registerReceiver();
      return;
    }
    const executionRole = createExecutionRole(name, args, opts, self);
    const taskDefinition = createTaskDefinition(
      name,
      args,
      opts,
      self,
      containers,
      architecture,
      cpu,
      memory,
      storage,
      taskRole,
      executionRole
    );
    const certificateArn = createSsl();
    const loadBalancer = createLoadBalancer();
    const targetGroups = createTargets();
    createListeners();
    const cloudmapService = createCloudmapService();
    const service = createService();
    const autoScalingTarget = createAutoScaling();
    createDnsRecords();
    this._service = service;
    this.cloudmapService = cloudmapService;
    this.executionRole = executionRole;
    this.taskDefinition = taskDefinition;
    this.loadBalancer = loadBalancer;
    this.autoScalingTarget = autoScalingTarget;
    this.domain = lbArgs?.domain ? lbArgs.domain.apply((domain) => domain?.name) : output55(void 0);
    this._url = !self.loadBalancer ? void 0 : all29([self.domain, self.loadBalancer?.dnsName]).apply(
      ([domain, loadBalancer2]) => domain ? `https://${domain}/` : `http://${loadBalancer2}`
    );
    this.registerOutputs({ _hint: this._url });
    registerReceiver();
    function normalizeDev() {
      if (true) return void 0;
      if (args.dev === false) return void 0;
      return {
        url: output55(args.dev?.url ?? URL_UNAVAILABLE)
      };
    }
    function normalizeVpc() {
      if (args.cluster.vpc instanceof Vpc2) {
        const vpc2 = args.cluster.vpc;
        return {
          isSstVpc: true,
          id: vpc2.id,
          loadBalancerSubnets: lbArgs?.pub.apply(
            (v) => v ? vpc2.publicSubnets : vpc2.privateSubnets
          ),
          containerSubnets: vpc2.publicSubnets,
          securityGroups: vpc2.securityGroups,
          cloudmapNamespaceId: vpc2.nodes.cloudmapNamespace.id,
          cloudmapNamespaceName: vpc2.nodes.cloudmapNamespace.name
        };
      }
      return output55(args.cluster.vpc).apply((vpc2) => ({
        isSstVpc: false,
        ...vpc2
      }));
    }
    function normalizeScaling() {
      return all29([lbArgs?.type, args.scaling]).apply(([type, v]) => {
        if (type !== "application" && v?.requestCount)
          throw new VisibleError(
            `Request count scaling is only supported for http/https protocols.`
          );
        return {
          min: v?.min ?? 1,
          max: v?.max ?? 1,
          cpuUtilization: v?.cpuUtilization ?? 70,
          memoryUtilization: v?.memoryUtilization ?? 70,
          requestCount: v?.requestCount ?? false
        };
      });
    }
    function normalizeCapacity() {
      if (!args.capacity) return;
      return output55(args.capacity).apply((v) => {
        if (v === "spot")
          return { spot: { weight: 1 }, fargate: { weight: 0 } };
        return v;
      });
    }
    function normalizeLoadBalancer() {
      const loadBalancer2 = args.loadBalancer ?? args.public;
      if (!loadBalancer2) return;
      const rules = all29([loadBalancer2, containers]).apply(
        ([lb4, containers2]) => {
          const lbRules = lb4.rules ?? lb4.ports;
          if (!lbRules || lbRules.length === 0)
            throw new VisibleError(
              `You must provide the ports to expose via "loadBalancer.rules".`
            );
          if (containers2.length > 1) {
            lbRules.forEach((v) => {
              if (!v.container)
                throw new VisibleError(
                  `You must provide a container name in "loadBalancer.rules" when there is more than one container.`
                );
            });
          }
          const rules2 = lbRules.map((v) => {
            const listenParts = v.listen.split("/");
            const listenPort = parseInt(listenParts[0]);
            const listenProtocol = listenParts[1];
            const listenConditions = v.conditions || v.path ? {
              path: v.conditions?.path ?? v.path,
              query: v.conditions?.query,
              header: v.conditions?.header
            } : void 0;
            if (protocolType(listenProtocol) === "network" && listenConditions)
              throw new VisibleError(
                `Invalid rule conditions for listen protocol "${v.listen}". Only "http" protocols support conditions.`
              );
            const redirectParts = v.redirect?.split("/");
            const redirectPort = redirectParts && parseInt(redirectParts[0]);
            const redirectProtocol = redirectParts && redirectParts[1];
            if (redirectPort && redirectProtocol) {
              if (protocolType(listenProtocol) !== protocolType(redirectProtocol))
                throw new VisibleError(
                  `The listen protocol "${v.listen}" must match the redirect protocol "${v.redirect}".`
                );
              return {
                type: "redirect",
                listenPort,
                listenProtocol,
                listenConditions,
                redirectPort,
                redirectProtocol
              };
            }
            const forwardParts = v.forward ? v.forward.split("/") : listenParts;
            const forwardPort = forwardParts && parseInt(forwardParts[0]);
            const forwardProtocol = forwardParts && forwardParts[1];
            if (protocolType(listenProtocol) !== protocolType(forwardProtocol))
              throw new VisibleError(
                `The listen protocol "${v.listen}" must match the forward protocol "${v.forward}".`
              );
            return {
              type: "forward",
              listenPort,
              listenProtocol,
              listenConditions,
              forwardPort,
              forwardProtocol,
              container: v.container ?? containers2[0].name
            };
          });
          const appProtocols = rules2.filter(
            (rule) => protocolType(rule.listenProtocol) === "application"
          );
          if (appProtocols.length > 0 && appProtocols.length < rules2.length)
            throw new VisibleError(
              `Protocols must be either all http/https, or all tcp/udp/tcp_udp/tls.`
            );
          rules2.forEach((rule) => {
            if (["https", "tls"].includes(rule.listenProtocol) && !lb4.domain) {
              throw new VisibleError(
                `You must provide a custom domain for ${rule.listenProtocol.toUpperCase()} protocol.`
              );
            }
          });
          return rules2;
        }
      );
      const domain = output55(loadBalancer2).apply((lb4) => {
        if (!lb4.domain) return void 0;
        const domain2 = typeof lb4.domain === "string" ? { name: lb4.domain } : lb4.domain;
        return {
          name: domain2.name,
          aliases: domain2.aliases ?? [],
          dns: domain2.dns === false ? void 0 : domain2.dns ?? dns(),
          cert: domain2.cert
        };
      });
      const type = output55(rules).apply(
        (rules2) => rules2[0].listenProtocol.startsWith("http") ? "application" : "network"
      );
      const pub = output55(loadBalancer2).apply((lb4) => lb4?.public ?? true);
      const health = all29([type, rules, loadBalancer2]).apply(
        ([type2, rules2, lb4]) => Object.fromEntries(
          Object.entries(lb4?.health ?? {}).map(([k, v]) => {
            if (!rules2.find(
              (r) => `${r.forwardPort}/${r.forwardProtocol}` === k
            ))
              throw new VisibleError(
                `Cannot configure health check for "${k}". Make sure it is defined in "loadBalancer.ports".`
              );
            return [
              k,
              {
                path: v.path ?? "/",
                interval: v.interval ? toSeconds(v.interval) : 30,
                timeout: v.timeout ? toSeconds(v.timeout) : type2 === "application" ? 5 : 6,
                healthyThreshold: v.healthyThreshold ?? 5,
                unhealthyThreshold: v.unhealthyThreshold ?? 2,
                matcher: v.successCodes ?? "200"
              }
            ];
          })
        )
      );
      return { type, rules, domain, pub, health };
    }
    function createLoadBalancer() {
      if (!lbArgs) return;
      const securityGroup = new ec24.SecurityGroup(
        ...transform(
          args?.transform?.loadBalancerSecurityGroup,
          `${name}LoadBalancerSecurityGroup`,
          {
            description: "Managed by SST",
            vpcId: vpc.id,
            egress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"]
              }
            ],
            ingress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"]
              }
            ]
          },
          { parent: self }
        )
      );
      return new lb.LoadBalancer(
        ...transform(
          args.transform?.loadBalancer,
          `${name}LoadBalancer`,
          {
            internal: lbArgs.pub.apply((v) => !v),
            loadBalancerType: lbArgs.type,
            subnets: vpc.loadBalancerSubnets,
            securityGroups: [securityGroup.id],
            enableCrossZoneLoadBalancing: true
          },
          { parent: self }
        )
      );
    }
    function createTargets() {
      if (!loadBalancer || !lbArgs) return;
      return all29([lbArgs.rules, lbArgs.health]).apply(([rules, health]) => {
        const targets = {};
        rules.forEach((r) => {
          if (r.type !== "forward") return;
          const container = r.container;
          const forwardProtocol = r.forwardProtocol.toUpperCase();
          const forwardPort = r.forwardPort;
          const targetId = `${container}${forwardProtocol}${forwardPort}`;
          const target = targets[targetId] ?? new lb.TargetGroup(
            ...transform(
              args.transform?.target,
              `${name}Target${targetId}`,
              {
                // TargetGroup names allow for 32 chars, but an 8 letter suffix
                // ie. "-1234567" is automatically added.
                // - If we don't specify "name" or "namePrefix", we need to ensure
                //   the component name is less than 24 chars. Hard to guarantee.
                // - If we specify "name", we need to ensure the $app-$stage-$name
                //   if less than 32 chars. Hard to guarantee.
                // - Hence we will use "namePrefix".
                namePrefix: forwardProtocol,
                port: forwardPort,
                protocol: forwardProtocol,
                targetType: "ip",
                vpcId: vpc.id,
                healthCheck: health[`${r.forwardPort}/${r.forwardProtocol}`]
              },
              { parent: self }
            )
          );
          targets[targetId] = target;
        });
        return targets;
      });
    }
    function createListeners() {
      if (!lbArgs || !loadBalancer || !targetGroups) return;
      return all29([lbArgs.rules, targetGroups, certificateArn]).apply(
        ([rules, targets, cert]) => {
          const listenersById = {};
          rules.forEach((r) => {
            const listenProtocol = r.listenProtocol.toUpperCase();
            const listenPort = r.listenPort;
            const listenerId = `${listenProtocol}${listenPort}`;
            listenersById[listenerId] = listenersById[listenerId] ?? [];
            listenersById[listenerId].push(r);
          });
          return Object.entries(listenersById).map(([listenerId, rules2]) => {
            const listenProtocol = rules2[0].listenProtocol.toUpperCase();
            const listenPort = rules2[0].listenPort;
            const defaultRule = rules2.find((r) => !r.listenConditions);
            const customRules = rules2.filter((r) => r.listenConditions);
            const buildActions = (r) => [
              ...!r ? [
                {
                  type: "fixed-response",
                  fixedResponse: {
                    statusCode: "403",
                    contentType: "text/plain",
                    messageBody: "Forbidden"
                  }
                }
              ] : [],
              ...r?.type === "forward" ? [
                {
                  type: "forward",
                  targetGroupArn: targets[`${r.container}${r.forwardProtocol.toUpperCase()}${r.forwardPort}`].arn
                }
              ] : [],
              ...r?.type === "redirect" ? [
                {
                  type: "redirect",
                  redirect: {
                    port: r.redirectPort.toString(),
                    protocol: r.redirectProtocol.toUpperCase(),
                    statusCode: "HTTP_301"
                  }
                }
              ] : []
            ];
            const listener = new lb.Listener(
              ...transform(
                args.transform?.listener,
                `${name}Listener${listenerId}`,
                {
                  loadBalancerArn: loadBalancer.arn,
                  port: listenPort,
                  protocol: listenProtocol,
                  certificateArn: ["HTTPS", "TLS"].includes(listenProtocol) ? cert : void 0,
                  defaultActions: buildActions(defaultRule)
                },
                { parent: self }
              )
            );
            customRules.forEach(
              (r) => new lb.ListenerRule(
                `${name}Listener${listenerId}Rule${hashStringToPrettyString(
                  JSON.stringify(r.listenConditions),
                  4
                )}`,
                {
                  listenerArn: listener.arn,
                  actions: buildActions(r),
                  conditions: [
                    {
                      pathPattern: r.listenConditions.path ? { values: [r.listenConditions.path] } : void 0,
                      queryStrings: r.listenConditions.query,
                      httpHeader: r.listenConditions.header ? {
                        httpHeaderName: r.listenConditions.header.name,
                        values: r.listenConditions.header.values
                      } : void 0
                    }
                  ]
                },
                { parent: self }
              )
            );
            return listener;
          });
        }
      );
    }
    function createSsl() {
      if (!lbArgs) return output55(void 0);
      return lbArgs.domain.apply((domain) => {
        if (!domain) return output55(void 0);
        if (domain.cert) return output55(domain.cert);
        return new DnsValidatedCertificate(
          `${name}Ssl`,
          {
            domainName: domain.name,
            alternativeNames: domain.aliases,
            dns: domain.dns
          },
          { parent: self }
        ).arn;
      });
    }
    function createCloudmapService() {
      return output55(vpc.cloudmapNamespaceId).apply((cloudmapNamespaceId) => {
        if (!cloudmapNamespaceId) return;
        return new servicediscovery2.Service(
          `${name}CloudmapService`,
          {
            name: `${name}.${define_app_default.stage}.${define_app_default.name}`,
            namespaceId: output55(vpc.cloudmapNamespaceId).apply((id) => id),
            forceDestroy: true,
            dnsConfig: {
              namespaceId: output55(vpc.cloudmapNamespaceId).apply((id) => id),
              dnsRecords: [
                ...args.serviceRegistry ? [{ ttl: 60, type: "SRV" }] : [],
                { ttl: 60, type: "A" }
              ]
            }
          },
          { parent: self }
        );
      });
    }
    function createService() {
      return cloudmapService.apply(
        (cloudmapService2) => new ecs2.Service(
          ...transform(
            args.transform?.service,
            `${name}Service`,
            {
              name,
              cluster: clusterArn,
              taskDefinition: taskDefinition.arn,
              desiredCount: scaling.min,
              ...capacity ? {
                // setting `forceNewDeployment` ensures that the service is not recreated
                // when the capacity provider config changes.
                forceNewDeployment: true,
                capacityProviderStrategies: capacity.apply((v) => [
                  ...v.fargate ? [
                    {
                      capacityProvider: "FARGATE",
                      base: v.fargate?.base,
                      weight: v.fargate?.weight
                    }
                  ] : [],
                  ...v.spot ? [
                    {
                      capacityProvider: "FARGATE_SPOT",
                      base: v.spot?.base,
                      weight: v.spot?.weight
                    }
                  ] : []
                ])
              } : (
                // @deprecated do not use `launchType`, set `capacityProviderStrategies`
                // to `[{ capacityProvider: "FARGATE", weight: 1 }]` instead
                {
                  launchType: "FARGATE"
                }
              ),
              networkConfiguration: {
                // If the vpc is an SST vpc, services are automatically deployed to the public
                // subnets. So we need to assign a public IP for the service to be accessible.
                assignPublicIp: vpc.isSstVpc,
                subnets: vpc.containerSubnets,
                securityGroups: vpc.securityGroups
              },
              deploymentCircuitBreaker: {
                enable: true,
                rollback: true
              },
              loadBalancers: lbArgs && all29([lbArgs.rules, targetGroups]).apply(
                ([rules, targets]) => Object.values(targets).map((target) => ({
                  targetGroupArn: target.arn,
                  containerName: target.port.apply(
                    (port) => rules.find((r) => r.forwardPort === port).container
                  ),
                  containerPort: target.port.apply((port) => port)
                }))
              ),
              enableExecuteCommand: true,
              serviceRegistries: cloudmapService2 && {
                registryArn: cloudmapService2.arn,
                port: args.serviceRegistry ? output55(args.serviceRegistry).port : void 0
              },
              waitForSteadyState: wait
            },
            { parent: self }
          )
        )
      );
    }
    function createAutoScaling() {
      const target = new appautoscaling.Target(
        ...transform(
          args.transform?.autoScalingTarget,
          `${name}AutoScalingTarget`,
          {
            serviceNamespace: "ecs",
            scalableDimension: "ecs:service:DesiredCount",
            resourceId: interpolate26`service/${clusterName}/${service.name}`,
            maxCapacity: scaling.max,
            minCapacity: scaling.min
          },
          { parent: self }
        )
      );
      output55(scaling.cpuUtilization).apply((cpuUtilization) => {
        if (cpuUtilization === false) return;
        new appautoscaling.Policy(
          `${name}AutoScalingCpuPolicy`,
          {
            serviceNamespace: target.serviceNamespace,
            scalableDimension: target.scalableDimension,
            resourceId: target.resourceId,
            policyType: "TargetTrackingScaling",
            targetTrackingScalingPolicyConfiguration: {
              predefinedMetricSpecification: {
                predefinedMetricType: "ECSServiceAverageCPUUtilization"
              },
              targetValue: cpuUtilization
            }
          },
          { parent: self }
        );
      });
      output55(scaling.memoryUtilization).apply((memoryUtilization) => {
        if (memoryUtilization === false) return;
        new appautoscaling.Policy(
          `${name}AutoScalingMemoryPolicy`,
          {
            serviceNamespace: target.serviceNamespace,
            scalableDimension: target.scalableDimension,
            resourceId: target.resourceId,
            policyType: "TargetTrackingScaling",
            targetTrackingScalingPolicyConfiguration: {
              predefinedMetricSpecification: {
                predefinedMetricType: "ECSServiceAverageMemoryUtilization"
              },
              targetValue: memoryUtilization
            }
          },
          { parent: self }
        );
      });
      all29([scaling.requestCount, targetGroups]).apply(
        ([requestCount, targetGroups2]) => {
          if (requestCount === false) return;
          if (!targetGroups2) return;
          const targetGroup = Object.values(targetGroups2)[0];
          new appautoscaling.Policy(
            `${name}AutoScalingRequestCountPolicy`,
            {
              serviceNamespace: target.serviceNamespace,
              scalableDimension: target.scalableDimension,
              resourceId: target.resourceId,
              policyType: "TargetTrackingScaling",
              targetTrackingScalingPolicyConfiguration: {
                predefinedMetricSpecification: {
                  predefinedMetricType: "ALBRequestCountPerTarget",
                  resourceLabel: all29([
                    loadBalancer?.arn,
                    targetGroup.arn
                  ]).apply(([loadBalancerArn, targetGroupArn]) => {
                    const lbPart = loadBalancerArn?.split(":").pop()?.split("/").slice(1).join("/");
                    const tgPart = targetGroupArn?.split(":").pop();
                    return `${lbPart}/${tgPart}`;
                  })
                },
                targetValue: requestCount
              }
            },
            { parent: self }
          );
        }
      );
      return target;
    }
    function createDnsRecords() {
      if (!lbArgs) return;
      lbArgs.domain.apply((domain) => {
        if (!domain?.dns) return;
        for (const recordName of [domain.name, ...domain.aliases]) {
          const namePrefix = recordName === domain.name ? name : `${name}${recordName}`;
          domain.dns.createAlias(
            namePrefix,
            {
              name: recordName,
              aliasName: loadBalancer.dnsName,
              aliasZone: loadBalancer.zoneId
            },
            { parent: self }
          );
        }
      });
    }
    function registerReceiver() {
      all29([containers]).apply(([val]) => {
        for (const container of val) {
          const title = val.length == 1 ? name : `${name}${container.name}`;
          new DevCommand(`${title}Dev`, {
            link: args.link,
            dev: {
              title,
              autostart: true,
              directory: (() => {
                if (!container.image) return "";
                if (typeof container.image === "string") return "";
                if (container.image.context) return container.image.context;
                return "";
              })(),
              ...container.dev
            },
            environment: {
              ...container.environment,
              AWS_REGION: region
            },
            aws: {
              role: taskRole.arn
            }
          });
        }
      });
    }
  }
  /**
   * The URL of the service.
   *
   * If `public.domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated load balancer URL.
   */
  get url() {
    const errorMessage = "Cannot access the URL because no public ports are exposed.";
    if (this.dev) {
      if (!this.devUrl) throw new VisibleError(errorMessage);
      return this.devUrl;
    }
    if (!this._url) throw new VisibleError(errorMessage);
    return this._url;
  }
  /**
   * The name of the Cloud Map service. This is useful for service discovery.
   */
  get service() {
    return all29([this.cloudmapNamespace, this.cloudmapService]).apply(
      ([namespace, service]) => {
        if (!namespace)
          throw new VisibleError(
            `Cannot access the AWS Cloud Map service name for the "${this._name}" Service. Cloud Map is not configured for the cluster.`
          );
        return this.dev ? interpolate26`dev.${namespace}` : interpolate26`${service.name}.${namespace}`;
      }
    );
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Amazon ECS Service.
       */
      get service() {
        if (self.dev)
          throw new VisibleError("Cannot access `nodes.service` in dev mode.");
        return self._service;
      },
      /**
       * The Amazon ECS Execution Role.
       */
      executionRole: this.executionRole,
      /**
       * The Amazon ECS Task Role.
       */
      taskRole: this.taskRole,
      /**
       * The Amazon ECS Task Definition.
       */
      get taskDefinition() {
        if (self.dev)
          throw new VisibleError(
            "Cannot access `nodes.taskDefinition` in dev mode."
          );
        return self.taskDefinition;
      },
      /**
       * The Amazon Elastic Load Balancer.
       */
      get loadBalancer() {
        if (self.dev)
          throw new VisibleError(
            "Cannot access `nodes.loadBalancer` in dev mode."
          );
        if (!self.loadBalancer)
          throw new VisibleError(
            "Cannot access `nodes.loadBalancer` when no public ports are exposed."
          );
        return self.loadBalancer;
      },
      /**
       * The Amazon Application Auto Scaling target.
       */
      get autoScalingTarget() {
        if (self.dev)
          throw new VisibleError(
            "Cannot access `nodes.autoScalingTarget` in dev mode."
          );
        return self.autoScalingTarget;
      },
      /**
       * The Amazon Cloud Map service.
       */
      get cloudmapService() {
        console.log("NODES GETTER");
        if (self.dev)
          throw new VisibleError(
            "Cannot access `nodes.cloudmapService` in dev mode."
          );
        return output55(self.cloudmapService).apply((service) => {
          if (!service)
            throw new VisibleError(
              `Cannot access "nodes.cloudmapService" for the "${self._name}" Service. Cloud Map is not configured for the cluster.`
            );
          return service;
        });
      }
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.dev ? this.devUrl : this._url,
        service: output55(this.cloudmapNamespace).apply(
          (namespace) => namespace ? this.service : void 0
        )
      }
    };
  }
};
function protocolType(protocol) {
  return ["http", "https"].includes(protocol) ? "application" : "network";
}
var __pulumiType47 = "sst:aws:Service";
Service.__pulumiType = __pulumiType47;

// .sst/platform/src/components/aws/cluster.ts
import { ecs as ecs5 } from "@pulumi/aws";

// .sst/platform/src/components/aws/service-v1.ts
import fs8 from "fs";
import path9 from "path";
import {
  all as all30,
  interpolate as interpolate27,
  output as output56,
  secret as secret4
} from "@pulumi/pulumi";
import { Image as Image3, Platform as Platform2 } from "@pulumi/docker-build";
import {
  appautoscaling as appautoscaling2,
  cloudwatch as cloudwatch11,
  ec2 as ec25,
  ecr as ecr3,
  ecs as ecs3,
  getRegionOutput as getRegionOutput6,
  iam as iam14,
  lb as lb2
} from "@pulumi/aws";
var Service2 = class extends Component {
  service;
  taskRole;
  taskDefinition;
  loadBalancer;
  domain;
  _url;
  devUrl;
  constructor(name, args, opts) {
    super(__pulumiType48, name, args, opts);
    const self = this;
    const cluster = output56(args.cluster);
    const vpc = normalizeVpc();
    const region = normalizeRegion();
    const architecture = normalizeArchitecture2();
    const imageArgs = normalizeImage();
    const cpu = normalizeCpu2();
    const memory = normalizeMemory2();
    const storage = normalizeStorage2();
    const scaling = normalizeScaling();
    const logging = normalizeLogging();
    const pub = normalizePublic();
    const linkData = buildLinkData();
    const linkPermissions = buildLinkPermissions();
    const taskRole = createTaskRole2();
    this.taskRole = taskRole;
    if (false) {
      this.devUrl = !pub ? void 0 : output56(args.dev?.url ?? URL_UNAVAILABLE);
      registerReceiver();
      return;
    }
    const bootstrapData = region.apply((region2) => bootstrap.forRegion(region2));
    const executionRole = createExecutionRole2();
    const image = createImage();
    const logGroup = createLogGroup();
    const taskDefinition = createTaskDefinition2();
    const certificateArn = createSsl();
    const { loadBalancer, targets } = createLoadBalancer();
    const service = createService();
    createAutoScaling();
    createDnsRecords();
    this.service = service;
    this.taskDefinition = taskDefinition;
    this.loadBalancer = loadBalancer;
    this.domain = pub?.domain ? pub.domain.apply((domain) => domain?.name) : output56(void 0);
    this._url = !self.loadBalancer ? void 0 : all30([self.domain, self.loadBalancer?.dnsName]).apply(
      ([domain, loadBalancer2]) => domain ? `https://${domain}/` : `http://${loadBalancer2}`
    );
    registerHint();
    registerReceiver();
    function normalizeVpc() {
      if (args.vpc instanceof Vpc2) {
        const result2 = {
          id: args.vpc.id,
          publicSubnets: args.vpc.publicSubnets,
          privateSubnets: args.vpc.privateSubnets,
          securityGroups: args.vpc.securityGroups
        };
        return args.vpc.nodes.natGateways.apply((natGateways) => {
          if (natGateways.length === 0)
            throw new VisibleError(
              `The VPC configured for the service does not have NAT enabled. Enable NAT by configuring "nat" on the "sst.aws.Vpc" component.`
            );
          return result2;
        });
      }
      return output56(args.vpc);
    }
    function normalizeRegion() {
      return getRegionOutput6(void 0, { parent: self }).name;
    }
    function normalizeArchitecture2() {
      return output56(args.architecture ?? "x86_64").apply((v) => v);
    }
    function normalizeImage() {
      return all30([args.image ?? {}, architecture]).apply(
        ([image2, architecture2]) => ({
          ...image2,
          context: image2.context ?? ".",
          platform: architecture2 === "arm64" ? Platform2.Linux_arm64 : Platform2.Linux_amd64
        })
      );
    }
    function normalizeCpu2() {
      return output56(args.cpu ?? "0.25 vCPU").apply((v) => {
        if (!supportedCpus2[v]) {
          throw new Error(
            `Unsupported CPU: ${v}. The supported values for CPU are ${Object.keys(
              supportedCpus2
            ).join(", ")}`
          );
        }
        return v;
      });
    }
    function normalizeMemory2() {
      return all30([cpu, args.memory ?? "0.5 GB"]).apply(([cpu2, v]) => {
        if (!(v in supportedMemories2[cpu2])) {
          throw new Error(
            `Unsupported memory: ${v}. The supported values for memory for a ${cpu2} CPU are ${Object.keys(
              supportedMemories2[cpu2]
            ).join(", ")}`
          );
        }
        return v;
      });
    }
    function normalizeStorage2() {
      return output56(args.storage ?? "21 GB").apply((v) => {
        const storage2 = toGBs(v);
        if (storage2 < 21 || storage2 > 200)
          throw new Error(
            `Unsupported storage: ${v}. The supported value for storage is between "21 GB" and "200 GB"`
          );
        return v;
      });
    }
    function normalizeScaling() {
      return output56(args.scaling).apply((v) => ({
        min: v?.min ?? 1,
        max: v?.max ?? 1,
        cpuUtilization: v?.cpuUtilization ?? 70,
        memoryUtilization: v?.memoryUtilization ?? 70
      }));
    }
    function normalizeLogging() {
      return output56(args.logging).apply((logging2) => ({
        ...logging2,
        retention: logging2?.retention ?? "1 month"
      }));
    }
    function normalizePublic() {
      if (!args.public) return;
      const ports = output56(args.public).apply((pub2) => {
        if (!pub2.ports || pub2.ports.length === 0)
          throw new VisibleError(
            `You must provide the ports to expose via "public.ports".`
          );
        const ports2 = pub2.ports.map((v) => {
          const listenParts = v.listen.split("/");
          const forwardParts = v.forward ? v.forward.split("/") : listenParts;
          return {
            listenPort: parseInt(listenParts[0]),
            listenProtocol: listenParts[1],
            forwardPort: parseInt(forwardParts[0]),
            forwardProtocol: forwardParts[1]
          };
        });
        const appProtocols = ports2.filter(
          (port) => ["http", "https"].includes(port.listenProtocol) && ["http", "https"].includes(port.forwardProtocol)
        );
        if (appProtocols.length > 0 && appProtocols.length < ports2.length)
          throw new VisibleError(
            `Protocols must be either all http/https, or all tcp/udp/tcp_udp/tls.`
          );
        ports2.forEach((port) => {
          if (["https", "tls"].includes(port.listenProtocol) && !pub2.domain) {
            throw new VisibleError(
              `You must provide a custom domain for ${port.listenProtocol.toUpperCase()} protocol.`
            );
          }
        });
        return ports2;
      });
      const domain = output56(args.public).apply((pub2) => {
        if (!pub2.domain) return void 0;
        const domain2 = typeof pub2.domain === "string" ? { name: pub2.domain } : pub2.domain;
        return {
          name: domain2.name,
          dns: domain2.dns === false ? void 0 : domain2.dns ?? dns(),
          cert: domain2.cert
        };
      });
      return { ports, domain };
    }
    function buildLinkData() {
      return output56(args.link || []).apply((links) => Link.build(links));
    }
    function buildLinkPermissions() {
      return Link.getInclude("aws.permission", args.link);
    }
    function createImage() {
      const imageArgsNew = imageArgs.apply((imageArgs2) => {
        const context = path9.join(define_cli_default.paths.root, imageArgs2.context);
        const dockerfile = imageArgs2.dockerfile ?? "Dockerfile";
        const file = (() => {
          let filePath = path9.join(context, `${dockerfile}.dockerignore`);
          if (fs8.existsSync(filePath)) return filePath;
          filePath = path9.join(context, ".dockerignore");
          if (fs8.existsSync(filePath)) return filePath;
        })();
        const content = file ? fs8.readFileSync(file).toString() : "";
        const lines = content.split("\n");
        if (!lines.find((line) => line === ".sst")) {
          fs8.writeFileSync(
            file ?? path9.join(context, ".dockerignore"),
            [...lines, "", "# sst", ".sst"].join("\n")
          );
        }
        return imageArgs2;
      });
      return new Image3(
        ...transform(
          args.transform?.image,
          `${name}Image`,
          {
            context: {
              location: imageArgsNew.apply(
                (v) => path9.join(define_cli_default.paths.root, v.context)
              )
            },
            dockerfile: {
              location: imageArgsNew.apply(
                (v) => v.dockerfile ? path9.join(define_cli_default.paths.root, v.dockerfile) : path9.join(define_cli_default.paths.root, v.context, "Dockerfile")
              )
            },
            buildArgs: imageArgsNew.apply((v) => v.args ?? {}),
            platforms: [imageArgs.platform],
            tags: [interpolate27`${bootstrapData.assetEcrUrl}:${name}`],
            registries: [
              ecr3.getAuthorizationTokenOutput({
                registryId: bootstrapData.assetEcrRegistryId
              }).apply((authToken) => ({
                address: authToken.proxyEndpoint,
                password: secret4(authToken.password),
                username: authToken.userName
              }))
            ],
            push: true
          },
          { parent: self }
        )
      );
    }
    function createLoadBalancer() {
      if (!pub) return {};
      const securityGroup = new ec25.SecurityGroup(
        ...transform(
          args?.transform?.loadBalancerSecurityGroup,
          `${name}LoadBalancerSecurityGroup`,
          {
            vpcId: vpc.id,
            egress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"]
              }
            ],
            ingress: [
              {
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"]
              }
            ]
          },
          { parent: self }
        )
      );
      const loadBalancer2 = new lb2.LoadBalancer(
        ...transform(
          args.transform?.loadBalancer,
          `${name}LoadBalancer`,
          {
            internal: false,
            loadBalancerType: pub.ports.apply(
              (ports) => ports[0].listenProtocol.startsWith("http") ? "application" : "network"
            ),
            subnets: vpc.publicSubnets,
            securityGroups: [securityGroup.id],
            enableCrossZoneLoadBalancing: true
          },
          { parent: self }
        )
      );
      const ret = all30([pub.ports, certificateArn]).apply(([ports, cert]) => {
        const listeners = {};
        const targets2 = {};
        ports.forEach((port) => {
          const forwardProtocol = port.forwardProtocol.toUpperCase();
          const forwardPort = port.forwardPort;
          const targetId = `${forwardProtocol}${forwardPort}`;
          const target = targets2[targetId] ?? new lb2.TargetGroup(
            ...transform(
              args.transform?.target,
              `${name}Target${targetId}`,
              {
                // TargetGroup names allow for 32 chars, but an 8 letter suffix
                // ie. "-1234567" is automatically added.
                // - If we don't specify "name" or "namePrefix", we need to ensure
                //   the component name is less than 24 chars. Hard to guarantee.
                // - If we specify "name", we need to ensure the $app-$stage-$name
                //   if less than 32 chars. Hard to guarantee.
                // - Hence we will use "namePrefix".
                namePrefix: forwardProtocol,
                port: forwardPort,
                protocol: forwardProtocol,
                targetType: "ip",
                vpcId: vpc.id
              },
              { parent: self }
            )
          );
          targets2[targetId] = target;
          const listenProtocol = port.listenProtocol.toUpperCase();
          const listenPort = port.listenPort;
          const listenerId = `${listenProtocol}${listenPort}`;
          const listener = listeners[listenerId] ?? new lb2.Listener(
            ...transform(
              args.transform?.listener,
              `${name}Listener${listenerId}`,
              {
                loadBalancerArn: loadBalancer2.arn,
                port: listenPort,
                protocol: listenProtocol,
                certificateArn: ["HTTPS", "TLS"].includes(listenProtocol) ? cert : void 0,
                defaultActions: [
                  {
                    type: "forward",
                    targetGroupArn: target.arn
                  }
                ]
              },
              { parent: self }
            )
          );
          listeners[listenerId] = listener;
        });
        return { listeners, targets: targets2 };
      });
      return { loadBalancer: loadBalancer2, targets: ret.targets };
    }
    function createSsl() {
      if (!pub) return output56(void 0);
      return pub.domain.apply((domain) => {
        if (!domain) return output56(void 0);
        if (domain.cert) return output56(domain.cert);
        return new DnsValidatedCertificate(
          `${name}Ssl`,
          {
            domainName: domain.name,
            dns: domain.dns
          },
          { parent: self }
        ).arn;
      });
    }
    function createLogGroup() {
      return new cloudwatch11.LogGroup(
        ...transform(
          args.transform?.logGroup,
          `${name}LogGroup`,
          {
            name: interpolate27`/sst/cluster/${cluster.name}/${name}`,
            retentionInDays: logging.apply(
              (logging2) => RETENTION[logging2.retention]
            )
          },
          { parent: self }
        )
      );
    }
    function createTaskRole2() {
      const policy = all30([args.permissions || [], linkPermissions]).apply(
        ([argsPermissions, linkPermissions2]) => iam14.getPolicyDocumentOutput({
          statements: [...argsPermissions, ...linkPermissions2].map(
            (item) => ({
              effect: (() => {
                const effect = item.effect ?? "allow";
                return effect.charAt(0).toUpperCase() + effect.slice(1);
              })(),
              actions: item.actions,
              resources: item.resources
            })
          )
        })
      );
      return new iam14.Role(
        ...transform(
          args.transform?.taskRole,
          `${name}TaskRole`,
          {
            assumeRolePolicy: true ? iam14.assumeRolePolicyForPrincipal({
              Service: "ecs-tasks.amazonaws.com"
            }) : iam14.assumeRolePolicyForPrincipal({
              AWS: interpolate27`arn:aws:iam::${getCallerIdentityOutput3().accountId}:root`
            }),
            inlinePolicies: policy.apply(
              ({ statements }) => statements ? [{ name: "inline", policy: policy.json }] : []
            )
          },
          { parent: self }
        )
      );
    }
    function createExecutionRole2() {
      return new iam14.Role(
        `${name}ExecutionRole`,
        {
          assumeRolePolicy: iam14.assumeRolePolicyForPrincipal({
            Service: "ecs-tasks.amazonaws.com"
          }),
          managedPolicyArns: [
            "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
          ]
        },
        { parent: self }
      );
    }
    function createTaskDefinition2() {
      return new ecs3.TaskDefinition(
        ...transform(
          args.transform?.taskDefinition,
          `${name}Task`,
          {
            family: interpolate27`${cluster.name}-${name}`,
            trackLatest: true,
            cpu: cpu.apply((v) => toNumber(v).toString()),
            memory: memory.apply((v) => toMBs(v).toString()),
            networkMode: "awsvpc",
            ephemeralStorage: {
              sizeInGib: storage.apply((v) => toGBs(v))
            },
            requiresCompatibilities: ["FARGATE"],
            runtimePlatform: {
              cpuArchitecture: architecture.apply((v) => v.toUpperCase()),
              operatingSystemFamily: "LINUX"
            },
            executionRoleArn: executionRole.arn,
            taskRoleArn: taskRole.arn,
            containerDefinitions: jsonStringify([
              {
                name,
                image: interpolate27`${bootstrapData.assetEcrUrl}@${image.digest}`,
                pseudoTerminal: true,
                portMappings: pub?.ports.apply(
                  (ports) => ports.map((port) => port.forwardPort).filter(
                    (value, index, self2) => self2.indexOf(value) === index
                  ).map((value) => ({ containerPort: value }))
                ),
                logConfiguration: {
                  logDriver: "awslogs",
                  options: {
                    "awslogs-group": logGroup.name,
                    "awslogs-region": region,
                    "awslogs-stream-prefix": "/service"
                  }
                },
                environment: all30([args.environment ?? [], linkData]).apply(
                  ([env2, linkData2]) => [
                    ...Object.entries(env2).map(([name2, value]) => ({
                      name: name2,
                      value
                    })),
                    ...linkData2.map((d) => ({
                      name: `SST_RESOURCE_${d.name}`,
                      value: JSON.stringify(d.properties)
                    })),
                    {
                      name: "SST_RESOURCE_App",
                      value: JSON.stringify({
                        name: define_app_default.name,
                        stage: define_app_default.stage
                      })
                    }
                  ]
                )
              }
            ])
          },
          { parent: self }
        )
      );
    }
    function createService() {
      return new ecs3.Service(
        ...transform(
          args.transform?.service,
          `${name}Service`,
          {
            name,
            cluster: cluster.arn,
            taskDefinition: taskDefinition.arn,
            desiredCount: scaling.min,
            launchType: "FARGATE",
            networkConfiguration: {
              assignPublicIp: false,
              subnets: vpc.privateSubnets,
              securityGroups: vpc.securityGroups
            },
            deploymentCircuitBreaker: {
              enable: true,
              rollback: true
            },
            loadBalancers: targets && targets.apply(
              (targets2) => Object.values(targets2).map((target) => ({
                targetGroupArn: target.arn,
                containerName: name,
                containerPort: target.port.apply((port) => port)
              }))
            )
          },
          { parent: self }
        )
      );
    }
    function createAutoScaling() {
      const target = new appautoscaling2.Target(
        `${name}AutoScalingTarget`,
        {
          serviceNamespace: "ecs",
          scalableDimension: "ecs:service:DesiredCount",
          resourceId: interpolate27`service/${cluster.name}/${service.name}`,
          maxCapacity: scaling.max,
          minCapacity: scaling.min
        },
        { parent: self }
      );
      new appautoscaling2.Policy(
        `${name}AutoScalingCpuPolicy`,
        {
          serviceNamespace: target.serviceNamespace,
          scalableDimension: target.scalableDimension,
          resourceId: target.resourceId,
          policyType: "TargetTrackingScaling",
          targetTrackingScalingPolicyConfiguration: {
            predefinedMetricSpecification: {
              predefinedMetricType: "ECSServiceAverageCPUUtilization"
            },
            targetValue: scaling.cpuUtilization
          }
        },
        { parent: self }
      );
      new appautoscaling2.Policy(
        `${name}AutoScalingMemoryPolicy`,
        {
          serviceNamespace: target.serviceNamespace,
          scalableDimension: target.scalableDimension,
          resourceId: target.resourceId,
          policyType: "TargetTrackingScaling",
          targetTrackingScalingPolicyConfiguration: {
            predefinedMetricSpecification: {
              predefinedMetricType: "ECSServiceAverageMemoryUtilization"
            },
            targetValue: scaling.memoryUtilization
          }
        },
        { parent: self }
      );
    }
    function createDnsRecords() {
      if (!pub) return;
      pub.domain.apply((domain) => {
        if (!domain?.dns) return;
        domain.dns.createAlias(
          name,
          {
            name: domain.name,
            aliasName: loadBalancer.dnsName,
            aliasZone: loadBalancer.zoneId
          },
          { parent: self }
        );
      });
    }
    function registerHint() {
      self.registerOutputs({ _hint: self._url });
    }
    function registerReceiver() {
      self.registerOutputs({
        _dev: imageArgs.apply((imageArgs2) => ({
          links: linkData.apply((input) => input.map((item) => item.name)),
          environment: {
            ...args.environment,
            AWS_REGION: region
          },
          aws: {
            role: taskRole.arn
          },
          autostart: output56(args.dev?.autostart).apply((val) => val ?? true),
          directory: output56(args.dev?.directory).apply(
            (dir) => dir || path9.join(
              imageArgs2.dockerfile ? path9.dirname(imageArgs2.dockerfile) : imageArgs2.context
            )
          ),
          command: args.dev?.command
        }))
      });
    }
  }
  /**
   * The URL of the service.
   *
   * If `public.domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated load balancer URL.
   */
  get url() {
    const errorMessage = "Cannot access the URL because no public ports are exposed.";
    if (false) {
      if (!this.devUrl) throw new VisibleError(errorMessage);
      return this.devUrl;
    }
    if (!this._url) throw new VisibleError(errorMessage);
    return this._url;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Amazon ECS Service.
       */
      get service() {
        if (false)
          throw new VisibleError("Cannot access `nodes.service` in dev mode.");
        return self.service;
      },
      /**
       * The Amazon ECS Task Role.
       */
      get taskRole() {
        return self.taskRole;
      },
      /**
       * The Amazon ECS Task Definition.
       */
      get taskDefinition() {
        if (false)
          throw new VisibleError(
            "Cannot access `nodes.taskDefinition` in dev mode."
          );
        return self.taskDefinition;
      },
      /**
       * The Amazon Elastic Load Balancer.
       */
      get loadBalancer() {
        if (false)
          throw new VisibleError(
            "Cannot access `nodes.loadBalancer` in dev mode."
          );
        if (!self.loadBalancer)
          throw new VisibleError(
            "Cannot access `nodes.loadBalancer` when no public ports are exposed."
          );
        return self.loadBalancer;
      }
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: { url: false ? this.devUrl : this._url }
    };
  }
};
var __pulumiType48 = "sst:aws:Service";
Service2.__pulumiType = __pulumiType48;

// .sst/platform/src/components/aws/cluster-v1.ts
import { ecs as ecs4 } from "@pulumi/aws";
var supportedCpus2 = {
  "0.25 vCPU": 256,
  "0.5 vCPU": 512,
  "1 vCPU": 1024,
  "2 vCPU": 2048,
  "4 vCPU": 4096,
  "8 vCPU": 8192,
  "16 vCPU": 16384
};
var supportedMemories2 = {
  "0.25 vCPU": {
    "0.5 GB": 512,
    "1 GB": 1024,
    "2 GB": 2048
  },
  "0.5 vCPU": {
    "1 GB": 1024,
    "2 GB": 2048,
    "3 GB": 3072,
    "4 GB": 4096
  },
  "1 vCPU": {
    "2 GB": 2048,
    "3 GB": 3072,
    "4 GB": 4096,
    "5 GB": 5120,
    "6 GB": 6144,
    "7 GB": 7168,
    "8 GB": 8192
  },
  "2 vCPU": {
    "4 GB": 4096,
    "5 GB": 5120,
    "6 GB": 6144,
    "7 GB": 7168,
    "8 GB": 8192,
    "9 GB": 9216,
    "10 GB": 10240,
    "11 GB": 11264,
    "12 GB": 12288,
    "13 GB": 13312,
    "14 GB": 14336,
    "15 GB": 15360,
    "16 GB": 16384
  },
  "4 vCPU": {
    "8 GB": 8192,
    "9 GB": 9216,
    "10 GB": 10240,
    "11 GB": 11264,
    "12 GB": 12288,
    "13 GB": 13312,
    "14 GB": 14336,
    "15 GB": 15360,
    "16 GB": 16384,
    "17 GB": 17408,
    "18 GB": 18432,
    "19 GB": 19456,
    "20 GB": 20480,
    "21 GB": 21504,
    "22 GB": 22528,
    "23 GB": 23552,
    "24 GB": 24576,
    "25 GB": 25600,
    "26 GB": 26624,
    "27 GB": 27648,
    "28 GB": 28672,
    "29 GB": 29696,
    "30 GB": 30720
  },
  "8 vCPU": {
    "16 GB": 16384,
    "20 GB": 20480,
    "24 GB": 24576,
    "28 GB": 28672,
    "32 GB": 32768,
    "36 GB": 36864,
    "40 GB": 40960,
    "44 GB": 45056,
    "48 GB": 49152,
    "52 GB": 53248,
    "56 GB": 57344,
    "60 GB": 61440
  },
  "16 vCPU": {
    "32 GB": 32768,
    "40 GB": 40960,
    "48 GB": 49152,
    "56 GB": 57344,
    "64 GB": 65536,
    "72 GB": 73728,
    "80 GB": 81920,
    "88 GB": 90112,
    "96 GB": 98304,
    "104 GB": 106496,
    "112 GB": 114688,
    "120 GB": 122880
  }
};
var Cluster = class extends Component {
  args;
  cluster;
  constructor(name, args, opts) {
    super(__pulumiType49, name, args, opts);
    const parent = this;
    const cluster = createCluster();
    this.args = args;
    this.cluster = cluster;
    function createCluster() {
      return new ecs4.Cluster(
        ...transform(args.transform?.cluster, `${name}Cluster`, {}, { parent })
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon ECS Cluster.
       */
      cluster: this.cluster
    };
  }
  /**
   * Add a service to the cluster.
   *
   * @param name Name of the service.
   * @param args Configure the service.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * cluster.addService("MyService");
   * ```
   *
   * Set a custom domain for the service.
   *
   * ```js {2} title="sst.config.ts"
   * cluster.addService("MyService", {
   *   domain: "example.com"
   * });
   * ```
   *
   * #### Enable auto-scaling
   *
   * ```ts title="sst.config.ts"
   * cluster.addService("MyService", {
   *   scaling: {
   *     min: 4,
   *     max: 16,
   *     cpuUtilization: 50,
   *     memoryUtilization: 50,
   *   }
   * });
   * ```
   */
  addService(name, args) {
    return new Service2(name, {
      cluster: {
        name: this.cluster.name,
        arn: this.cluster.arn
      },
      vpc: this.args.vpc,
      ...args
    });
  }
};
var __pulumiType49 = "sst:aws:Cluster";
Cluster.__pulumiType = __pulumiType49;

// .sst/platform/src/components/aws/task.ts
import { all as all31, output as output57 } from "@pulumi/pulumi";
var Task = class extends Component {
  _cluster;
  vpc;
  executionRole;
  taskRole;
  _taskDefinition;
  _publicIp;
  containerNames;
  dev;
  constructor(name, args, opts = {}) {
    super(__pulumiType50, name, args, opts);
    const self = this;
    const dev = normalizeDev();
    const architecture = normalizeArchitecture(args);
    const cpu = normalizeCpu(args);
    const memory = normalizeMemory(cpu, args);
    const storage = normalizeStorage(args);
    const containers = normalizeContainers("task", args, name, architecture);
    const vpc = normalizeVpc();
    const publicIp = normalizePublicIp();
    const taskRole = createTaskRole(
      name,
      args,
      opts,
      self,
      dev,
      dev ? [
        {
          actions: ["appsync:*"],
          resources: ["*"]
        }
      ] : []
    );
    this.dev = dev;
    this.taskRole = taskRole;
    const executionRole = createExecutionRole(name, args, opts, self);
    const taskDefinition = createTaskDefinition(
      name,
      args,
      opts,
      self,
      dev ? containers.apply(async (v) => {
        const appsync5 = await Function.appsync();
        return [
          {
            ...v[0],
            image: output57("ghcr.io/sst/sst/bridge-task:20241224005724"),
            environment: {
              ...v[0].environment,
              SST_TASK_ID: name,
              SST_REGION: process.env.SST_AWS_REGION,
              SST_APPSYNC_HTTP: appsync5.http,
              SST_APPSYNC_REALTIME: appsync5.realtime,
              SST_APP: define_app_default.name,
              SST_STAGE: define_app_default.stage
            }
          }
        ];
      }) : containers,
      architecture,
      cpu,
      memory,
      storage,
      taskRole,
      executionRole
    );
    this._cluster = args.cluster;
    this.vpc = vpc;
    this.executionRole = executionRole;
    this._taskDefinition = taskDefinition;
    this._publicIp = publicIp;
    this.containerNames = containers.apply((v) => v.map((v2) => output57(v2.name)));
    this.registerOutputs({
      _task: all31([args.dev, containers]).apply(([v, containers2]) => ({
        directory: (() => {
          if (!containers2[0].image) return "";
          if (typeof containers2[0].image === "string") return "";
          if (containers2[0].image.context) return containers2[0].image.context;
          return "";
        })(),
        ...v
      }))
    });
    function normalizeDev() {
      if (true) return false;
      if (args.dev === false) return false;
      return true;
    }
    function normalizeVpc() {
      if (args.cluster.vpc instanceof Vpc2) {
        const vpc2 = args.cluster.vpc;
        return {
          isSstVpc: true,
          containerSubnets: vpc2.publicSubnets,
          securityGroups: vpc2.securityGroups
        };
      }
      return {
        isSstVpc: false,
        containerSubnets: output57(args.cluster.vpc).apply(
          (v) => v.containerSubnets.map((v2) => output57(v2))
        ),
        securityGroups: output57(args.cluster.vpc).apply(
          (v) => v.securityGroups.map((v2) => output57(v2))
        )
      };
    }
    function normalizePublicIp() {
      return all31([args.publicIp, vpc.isSstVpc]).apply(
        ([publicIp2, isSstVpc]) => publicIp2 ?? isSstVpc
      );
    }
  }
  /**
   * The ARN of the ECS Task Definition.
   */
  get taskDefinition() {
    return this._taskDefinition.arn;
  }
  /**
   * The names of the containers in the task.
   * @internal
   */
  get containers() {
    return this.containerNames;
  }
  /**
   * The ARN of the cluster this task is deployed to.
   * @internal
   */
  get cluster() {
    return this._cluster.nodes.cluster.arn;
  }
  /**
   * The security groups for the task.
   * @internal
   */
  get securityGroups() {
    return this.vpc.securityGroups;
  }
  /**
   * The subnets for the task.
   * @internal
   */
  get subnets() {
    return this.vpc.containerSubnets;
  }
  /**
   * Whether to assign a public IP address to the task.
   * @internal
   */
  get assignPublicIp() {
    return this._publicIp;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon ECS Execution Role.
       */
      executionRole: this.executionRole,
      /**
       * The Amazon ECS Task Role.
       */
      taskRole: this.taskRole,
      /**
       * The Amazon ECS Task Definition.
       */
      taskDefinition: this._taskDefinition
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        cluster: this.cluster,
        containers: this.containers,
        taskDefinition: this.taskDefinition,
        subnets: this.subnets,
        securityGroups: this.securityGroups,
        assignPublicIp: this.assignPublicIp
      },
      include: [
        permission({
          actions: ["ecs:*"],
          resources: [
            this._taskDefinition.arn,
            // permissions to describe and stop the task
            this.cluster.apply(
              (v) => v.split(":cluster/").join(":task/") + "/*"
            )
          ]
        }),
        permission({
          actions: ["iam:PassRole"],
          resources: [this.executionRole.arn, this.taskRole.arn]
        })
      ]
    };
  }
};
var __pulumiType50 = "sst:aws:Task";
Task.__pulumiType = __pulumiType50;

// .sst/platform/src/components/aws/cluster.ts
var Cluster2 = class _Cluster extends Component {
  constructorOpts;
  cluster;
  _vpc;
  static v1 = Cluster;
  constructor(name, args, opts = {}) {
    super(__pulumiType51, name, args, opts);
    const _version = { major: 2, minor: 0 };
    const self = this;
    this.constructorOpts = opts;
    if (args && "ref" in args) {
      const ref = reference();
      const vpc2 = normalizeVpc();
      this.cluster = ref.cluster;
      this._vpc = vpc2;
      return;
    }
    registerVersion();
    const vpc = normalizeVpc();
    const cluster = createCluster();
    createCapacityProviders();
    this.cluster = output58(cluster);
    this._vpc = vpc;
    function reference() {
      const ref = args;
      const cluster2 = ecs5.Cluster.get(`${name}Cluster`, ref.id, void 0, {
        parent: self
      });
      const clusterValidated = cluster2.tags.apply((tags) => {
        const refVersion = tags?.["sst:ref:version"] ? parseComponentVersion(tags["sst:ref:version"]) : void 0;
        if (refVersion?.minor !== _version.minor) {
          throw new VisibleError(
            [
              `There have been some minor changes to the "Cluster" component that's being referenced by "${name}".
`,
              `To update, you'll need to redeploy the stage where the cluster was created. And then redeploy this stage.`
            ].join("\n")
          );
        }
        registerVersion(refVersion);
        return cluster2;
      });
      return { cluster: clusterValidated };
    }
    function normalizeVpc() {
      if (args.vpc instanceof Vpc) {
        throw new VisibleError(
          `You are using the "Vpc.v1" component. Please migrate to the latest "Vpc" component.`
        );
      }
      if (args.vpc instanceof Vpc2) {
        return args.vpc;
      }
      return output58(args.vpc).apply((vpc2) => {
        if (vpc2.containerSubnets && vpc2.serviceSubnets)
          throw new VisibleError(
            `You cannot provide both "vpc.containerSubnets" and "vpc.serviceSubnets" in the "${name}" Cluster component. The "serviceSubnets" property has been deprecated. Use "containerSubnets" instead.`
          );
        if (!vpc2.containerSubnets && !vpc2.serviceSubnets)
          throw new VisibleError(
            `Missing "vpc.containerSubnets" for the "${name}" Cluster component.`
          );
        if (vpc2.cloudmapNamespaceId && !vpc2.cloudmapNamespaceName || !vpc2.cloudmapNamespaceId && vpc2.cloudmapNamespaceName)
          throw new VisibleError(
            `You must provide both "vpc.cloudmapNamespaceId" and "vpc.cloudmapNamespaceName" for the "${name}" Cluster component.`
          );
        return {
          ...vpc2,
          containerSubnets: vpc2.containerSubnets ?? vpc2.serviceSubnets,
          serviceSubnets: void 0
        };
      });
    }
    function createCluster() {
      return new ecs5.Cluster(
        ...transform(
          args.transform?.cluster,
          `${name}Cluster`,
          {
            tags: {
              "sst:ref:version": `${_version.major}.${_version.minor}`
            }
          },
          { parent: self }
        )
      );
    }
    function registerVersion(overrideVersion) {
      const newMajorVersion = _version.major;
      const oldMajorVersion = overrideVersion?.major ?? define_cli_default.state.version[name];
      self.registerVersion({
        new: newMajorVersion,
        old: oldMajorVersion,
        message: [
          `There is a new version of "Cluster" that has breaking changes.`,
          ``,
          `What changed:`,
          `  - In the old version, load balancers were deployed in public subnets, and services were deployed in private subnets. The VPC was required to have NAT gateways.`,
          `  - In the latest version, both the load balancer and the services are deployed in public subnets. The VPC is not required to have NAT gateways. So the new default makes this cheaper to run.`,
          ``,
          `To upgrade:`,
          `  - Set \`forceUpgrade: "v${newMajorVersion}"\` on the "Cluster" component. Learn more https://sst.dev/docs/component/aws/cluster#forceupgrade`,
          ``,
          `To continue using v${define_cli_default.state.version[name]}:`,
          `  - Rename "Cluster" to "Cluster.v${define_cli_default.state.version[name]}". Learn more about versioning - https://sst.dev/docs/components/#versioning`
        ].join("\n"),
        forceUpgrade: args.forceUpgrade
      });
    }
    function createCapacityProviders() {
      return new ecs5.ClusterCapacityProviders(
        `${name}CapacityProviders`,
        {
          clusterName: cluster.name,
          capacityProviders: ["FARGATE", "FARGATE_SPOT"]
        },
        { parent: self }
      );
    }
  }
  /**
   * The cluster ID.
   */
  get id() {
    return this.cluster.id;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon ECS Cluster.
       */
      cluster: this.cluster
    };
  }
  /**
   * The VPC configuration for the cluster.
   * @internal
   */
  get vpc() {
    return this._vpc;
  }
  /**
   * Add a service to the cluster.
   *
   * @deprecated Use the `Service` component directly to create services. To migrate, change
   *
   * ```ts
   * cluster.addService("MyService", { ...args });
   * ```
   *
   * to
   *
   * ```ts
   * new sst.aws.Service("MyService", { cluster, ...args });
   * ```
   *
   * @param name Name of the service.
   * @param args? Configure the service.
   * @param opts? Resource options.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * cluster.addService("MyService");
   * ```
   *
   * You can also configure the service. For example, set a custom domain.
   *
   * ```js {2} title="sst.config.ts"
   * cluster.addService("MyService", {
   *   domain: "example.com"
   * });
   * ```
   *
   * Enable auto-scaling.
   *
   * ```ts title="sst.config.ts"
   * cluster.addService("MyService", {
   *   scaling: {
   *     min: 4,
   *     max: 16,
   *     cpuUtilization: 50,
   *     memoryUtilization: 50,
   *   }
   * });
   * ```
   *
   * By default this starts a single container. To add multiple containers in the service, pass in an array of containers args.
   *
   * ```ts title="sst.config.ts"
   * cluster.addService("MyService", {
   *   architecture: "arm64",
   *   containers: [
   *     {
   *       name: "app",
   *       image: "nginxdemos/hello:plain-text"
   *     },
   *     {
   *       name: "admin",
   *       image: {
   *         context: "./admin",
   *         dockerfile: "Dockerfile"
   *       }
   *     }
   *   ]
   * });
   * ```
   *
   * This is useful for running sidecar containers.
   */
  addService(name, args, opts) {
    return new Service(
      name,
      {
        cluster: this,
        ...args
      },
      { provider: this.constructorOpts.provider, ...opts }
    );
  }
  /**
   * Add a task to the cluster.
   *
   * @deprecated Use the `Task` component directly to create tasks. To migrate, change
   *
   * ```ts
   * cluster.addTask("MyTask", { ...args });
   * ```
   *
   * to
   *
   * ```ts
   * new sst.aws.Task("MyTask", { cluster, ...args });
   * ```
   *
   * @param name Name of the task.
   * @param args? Configure the task.
   * @param opts? Resource options.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * cluster.addTask("MyTask");
   * ```
   *
   * You can also configure the task. By default this starts a single container.
   * To add multiple containers in the task, pass in an array of containers args.
   *
   * ```ts title="sst.config.ts"
   * cluster.addTask("MyTask", {
   *   architecture: "arm64",
   *   containers: [
   *     {
   *       name: "app",
   *       image: "nginxdemos/hello:plain-text"
   *     },
   *     {
   *       name: "admin",
   *       image: {
   *         context: "./admin",
   *         dockerfile: "Dockerfile"
   *       }
   *     }
   *   ]
   * });
   * ```
   *
   * This is useful for running sidecar containers.
   */
  addTask(name, args, opts) {
    return new Task(
      name,
      {
        cluster: this,
        ...args
      },
      { provider: this.constructorOpts.provider, ...opts }
    );
  }
  /**
   * Reference an existing ECS Cluster with the given ID. This is useful when you
   * create a cluster in one stage and want to share it in another. It avoids
   * having to create a new cluster in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share cluster across stages.
   * :::
   *
   * @param name The name of the component.
   * @param args The arguments to get the cluster.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a cluster in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new cluster, you want to share the same cluster from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const cluster = $app.stage === "frank"
   *   ? sst.aws.Cluster.get("MyCluster", {
   *       id: "arn:aws:ecs:us-east-1:123456789012:cluster/app-dev-MyCluster",
   *       vpc,
   *     })
   *   : new sst.aws.Cluster("MyCluster", { vpc });
   * ```
   *
   * Here `arn:aws:ecs:us-east-1:123456789012:cluster/app-dev-MyCluster` is the ID of the
   * cluster created in the `dev` stage. You can find these by outputting the cluster ID
   * in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   id: cluster.id,
   * };
   * ```
   */
  static get(name, args, opts) {
    return new _Cluster(
      name,
      { ref: true, id: args.id, vpc: args.vpc },
      opts
    );
  }
};
var __pulumiType51 = "sst:aws:Cluster";
Cluster2.__pulumiType = __pulumiType51;

// .sst/platform/src/components/aws/cognito-identity-pool.ts
import { interpolate as interpolate28, output as output59 } from "@pulumi/pulumi";
import { cognito, getRegionOutput as getRegionOutput7, iam as iam16 } from "@pulumi/aws";
var CognitoIdentityPool = class _CognitoIdentityPool extends Component {
  identityPool;
  authRole;
  unauthRole;
  constructor(name, args = {}, opts) {
    super(__pulumiType52, name, args, opts);
    if (args && "ref" in args) {
      const ref = args;
      this.identityPool = ref.identityPool;
      this.authRole = ref.authRole;
      this.unauthRole = ref.unauthRole;
      return;
    }
    const parent = this;
    const region = getRegion();
    const identityPool = createIdentityPool();
    const authRole = createAuthRole();
    const unauthRole = createUnauthRole();
    createRoleAttachment();
    this.identityPool = identityPool;
    this.authRole = authRole;
    this.unauthRole = unauthRole;
    function getRegion() {
      return getRegionOutput7(void 0, { parent }).name;
    }
    function createIdentityPool() {
      return new cognito.IdentityPool(
        ...transform(
          args.transform?.identityPool,
          `${name}IdentityPool`,
          {
            identityPoolName: "",
            allowUnauthenticatedIdentities: true,
            cognitoIdentityProviders: args.userPools && output59(args.userPools).apply(
              (userPools) => userPools.map((v) => ({
                clientId: v.client,
                providerName: interpolate28`cognito-idp.${region}.amazonaws.com/${v.userPool}`
              }))
            ),
            supportedLoginProviders: {}
          },
          { parent }
        )
      );
    }
    function createAuthRole() {
      const policy = output59(args.permissions).apply(
        (permissions) => iam16.getPolicyDocumentOutput({
          statements: [
            {
              effect: "Allow",
              actions: [
                "mobileanalytics:PutEvents",
                "cognito-sync:*",
                "cognito-identity:*"
              ],
              resources: ["*"]
            },
            ...permissions?.authenticated || []
          ]
        })
      );
      return new iam16.Role(
        ...transform(
          args.transform?.authenticatedRole,
          `${name}AuthRole`,
          {
            assumeRolePolicy: iam16.getPolicyDocumentOutput({
              statements: [
                {
                  effect: "Allow",
                  principals: [
                    {
                      type: "Federated",
                      identifiers: ["cognito-identity.amazonaws.com"]
                    }
                  ],
                  actions: ["sts:AssumeRoleWithWebIdentity"],
                  conditions: [
                    {
                      test: "StringEquals",
                      variable: "cognito-identity.amazonaws.com:aud",
                      values: [identityPool.id]
                    },
                    {
                      test: "ForAnyValue:StringLike",
                      variable: "cognito-identity.amazonaws.com:amr",
                      values: ["authenticated"]
                    }
                  ]
                }
              ]
            }).json,
            inlinePolicies: [{ name: "inline", policy: policy.json }]
          },
          { parent }
        )
      );
    }
    function createUnauthRole() {
      const policy = output59(args.permissions).apply(
        (permissions) => iam16.getPolicyDocumentOutput({
          statements: [
            {
              effect: "Allow",
              actions: ["mobileanalytics:PutEvents", "cognito-sync:*"],
              resources: ["*"]
            },
            ...permissions?.unauthenticated || []
          ]
        })
      );
      return new iam16.Role(
        ...transform(
          args.transform?.unauthenticatedRole,
          `${name}UnauthRole`,
          {
            assumeRolePolicy: iam16.getPolicyDocumentOutput({
              statements: [
                {
                  effect: "Allow",
                  principals: [
                    {
                      type: "Federated",
                      identifiers: ["cognito-identity.amazonaws.com"]
                    }
                  ],
                  actions: ["sts:AssumeRoleWithWebIdentity"],
                  conditions: [
                    {
                      test: "StringEquals",
                      variable: "cognito-identity.amazonaws.com:aud",
                      values: [identityPool.id]
                    },
                    {
                      test: "ForAnyValue:StringLike",
                      variable: "cognito-identity.amazonaws.com:amr",
                      values: ["unauthenticated"]
                    }
                  ]
                }
              ]
            }).json,
            inlinePolicies: [{ name: "inline", policy: policy.json }]
          },
          { parent }
        )
      );
    }
    function createRoleAttachment() {
      return new cognito.IdentityPoolRoleAttachment(
        `${name}RoleAttachment`,
        {
          identityPoolId: identityPool.id,
          roles: {
            authenticated: authRole.arn,
            unauthenticated: unauthRole.arn
          }
        },
        { parent }
      );
    }
  }
  /**
   * The Cognito identity pool ID.
   */
  get id() {
    return this.identityPool.id;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon Cognito identity pool.
       */
      identityPool: this.identityPool,
      /**
       * The authenticated IAM role.
       */
      authenticatedRole: this.authRole,
      /**
       * The unauthenticated IAM role.
       */
      unauthenticatedRole: this.unauthRole
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        id: this.id
      },
      include: [
        permission({
          actions: ["cognito-identity:*"],
          resources: [this.identityPool.arn]
        })
      ]
    };
  }
  /**
   * Reference an existing Identity Pool with the given ID. This is useful when you
   * create a Identity Pool in one stage and want to share it in another. It avoids having to
   * create a new Identity Pool in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share Identity Pools across stages.
   * :::
   *
   * @param name The name of the component.
   * @param identityPoolID The ID of the existing Identity Pool.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a Identity Pool in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new pool, you want to share the same pool from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const identityPool = $app.stage === "frank"
   *   ? sst.aws.CognitoIdentityPool.get("MyIdentityPool", "us-east-1:02facf30-e2f3-49ec-9e79-c55187415cf8")
   *   : new sst.aws.CognitoIdentityPool("MyIdentityPool");
   * ```
   *
   * Here `us-east-1:02facf30-e2f3-49ec-9e79-c55187415cf8` is the ID of the Identity Pool created in the `dev` stage.
   * You can find this by outputting the Identity Pool ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   identityPool: identityPool.id
   * };
   * ```
   */
  static get(name, identityPoolID, opts) {
    const identityPool = cognito.IdentityPool.get(
      `${name}IdentityPool`,
      identityPoolID,
      void 0,
      opts
    );
    const attachment = cognito.IdentityPoolRoleAttachment.get(
      `${name}RoleAttachment`,
      identityPoolID,
      void 0,
      opts
    );
    const authRole = iam16.Role.get(
      `${name}AuthRole`,
      attachment.roles.authenticated.apply((arn) => parseRoleArn(arn).roleName),
      void 0,
      opts
    );
    const unauthRole = iam16.Role.get(
      `${name}UnauthRole`,
      attachment.roles.unauthenticated.apply(
        (arn) => parseRoleArn(arn).roleName
      ),
      void 0,
      opts
    );
    return new _CognitoIdentityPool(name, {
      ref: true,
      identityPool,
      authRole,
      unauthRole
    });
  }
};
var __pulumiType52 = "sst:aws:CognitoIdentityPool";
CognitoIdentityPool.__pulumiType = __pulumiType52;

// .sst/platform/src/components/aws/cognito-user-pool.ts
import { all as all32, output as output62 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/cognito-identity-provider.ts
import { output as output60 } from "@pulumi/pulumi";
import { cognito as cognito2 } from "@pulumi/aws";
var CognitoIdentityProvider = class extends Component {
  identityProvider;
  constructor(name, args, opts) {
    super(__pulumiType53, name, args, opts);
    const parent = this;
    const providerType = normalizeProviderType();
    const identityProvider = createIdentityProvider();
    this.identityProvider = identityProvider;
    function normalizeProviderType() {
      const type = output60(args.type).apply(
        (type2) => ({
          saml: "SAML",
          oidc: "OIDC",
          facebook: "Facebook",
          google: "Google",
          amazon: "LoginWithAmazon",
          apple: "SignInWithApple"
        })[type2]
      );
      if (!type) throw new VisibleError(`Invalid provider type: ${args.type}`);
      return type;
    }
    function createIdentityProvider() {
      return new cognito2.IdentityProvider(
        ...transform(
          args.transform?.identityProvider,
          `${name}IdentityProvider`,
          {
            userPoolId: args.userPool,
            providerName: name,
            providerType,
            providerDetails: args.details,
            attributeMapping: args.attributes
          },
          { parent }
        )
      );
    }
  }
  /**
   * The Cognito identity provider name.
   */
  get providerName() {
    return this.identityProvider.providerName;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Cognito identity provider.
       */
      identityProvider: this.identityProvider
    };
  }
};
var __pulumiType53 = "sst:aws:CognitoIdentityProvider";
CognitoIdentityProvider.__pulumiType = __pulumiType53;

// .sst/platform/src/components/aws/cognito-user-pool-client.ts
import { output as output61 } from "@pulumi/pulumi";
import { cognito as cognito3 } from "@pulumi/aws";
var CognitoUserPoolClient = class extends Component {
  client;
  constructor(name, args, opts) {
    super(__pulumiType54, name, args, opts);
    const parent = this;
    const providers = normalizeProviders();
    const client = createClient();
    this.client = client;
    function normalizeProviders() {
      if (!args.providers) return ["COGNITO"];
      return output61(args.providers);
    }
    function createClient() {
      return new cognito3.UserPoolClient(
        ...transform(
          args.transform?.client,
          `${name}Client`,
          {
            name,
            userPoolId: args.userPool,
            allowedOauthFlows: ["implicit", "code"],
            allowedOauthFlowsUserPoolClient: true,
            allowedOauthScopes: [
              "profile",
              "phone",
              "email",
              "openid",
              "aws.cognito.signin.user.admin"
            ],
            callbackUrls: ["https://example.com"],
            supportedIdentityProviders: providers
          },
          { parent }
        )
      );
    }
  }
  /**
   * The Cognito User Pool client ID.
   */
  get id() {
    return this.client.id;
  }
  /**
   * The Cognito User Pool client secret.
   */
  get secret() {
    return this.client.clientSecret;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Cognito User Pool client.
       */
      client: this.client
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        id: this.id,
        secret: this.secret
      }
    };
  }
};
var __pulumiType54 = "sst:aws:CognitoUserPoolClient";
CognitoUserPoolClient.__pulumiType = __pulumiType54;

// .sst/platform/src/components/aws/cognito-user-pool.ts
import { cognito as cognito4, lambda as lambda15 } from "@pulumi/aws";
var CognitoUserPool = class _CognitoUserPool extends Component {
  constructorOpts;
  userPool;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType55, name, args, opts);
    if (args && "ref" in args) {
      const ref = args;
      this.constructorOpts = opts;
      this.userPool = output62(ref.userPool);
      return;
    }
    const parent = this;
    normalizeAliasesAndUsernames();
    const triggers = normalizeTriggers();
    const verify = normalizeVerify();
    const userPool = createUserPool();
    this.constructorOpts = opts;
    this.userPool = userPool;
    function normalizeAliasesAndUsernames() {
      all32([args.aliases, args.usernames]).apply(([aliases, usernames]) => {
        if (aliases && usernames)
          throw new VisibleError(
            "You cannot set both aliases and usernames. Learn more about customizing sign-in attributes at https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases"
          );
      });
    }
    function normalizeTriggers() {
      if (!args.triggers) return;
      return output62(args.triggers).apply((triggers2) => {
        if ((triggers2.customEmailSender || triggers2.customSmsSender) && !triggers2.kmsKey)
          throw new VisibleError(
            "You must provide a KMS key via `kmsKey` when configuring `customEmailSender` or `customSmsSender`."
          );
        return {
          ...triggers2,
          preTokenGenerationVersion: triggers2.preTokenGenerationVersion === "v2" ? "V2_0" : "V1_0"
        };
      });
    }
    function normalizeVerify() {
      if (!args.verify) return;
      return output62(args.verify).apply((verify2) => {
        return {
          defaultEmailOption: "CONFIRM_WITH_CODE",
          emailMessage: verify2.emailMessage ?? "The verification code to your new account is {####}",
          emailSubject: verify2.emailSubject ?? "Verify your new account",
          smsMessage: verify2.smsMessage ?? "The verification code to your new account is {####}"
        };
      });
    }
    function createUserPool() {
      return output62(args.softwareToken).apply(
        (softwareToken) => new cognito4.UserPool(
          ...transform(
            args.transform?.userPool,
            `${name}UserPool`,
            {
              aliasAttributes: args.aliases && output62(args.aliases).apply((aliases) => [
                ...aliases.includes("email") ? ["email"] : [],
                ...aliases.includes("phone") ? ["phone_number"] : [],
                ...aliases.includes("preferred_username") ? ["preferred_username"] : []
              ]),
              usernameAttributes: args.usernames && output62(args.usernames).apply((usernames) => [
                ...usernames.includes("email") ? ["email"] : [],
                ...usernames.includes("phone") ? ["phone_number"] : []
              ]),
              accountRecoverySetting: {
                recoveryMechanisms: [
                  {
                    name: "verified_phone_number",
                    priority: 1
                  },
                  {
                    name: "verified_email",
                    priority: 2
                  }
                ]
              },
              adminCreateUserConfig: {
                allowAdminCreateUserOnly: false
              },
              usernameConfiguration: {
                caseSensitive: false
              },
              autoVerifiedAttributes: all32([
                args.aliases || [],
                args.usernames || []
              ]).apply(([aliases, usernames]) => {
                const attributes = [...aliases, ...usernames];
                return [
                  ...attributes.includes("email") ? ["email"] : [],
                  ...attributes.includes("phone") ? ["phone_number"] : []
                ];
              }),
              emailConfiguration: {
                emailSendingAccount: "COGNITO_DEFAULT"
              },
              verificationMessageTemplate: verify,
              userPoolAddOns: {
                advancedSecurityMode: output62(args.advancedSecurity).apply(
                  (v) => (v ?? "off").toUpperCase()
                )
              },
              mfaConfiguration: output62(args.mfa).apply(
                (v) => (v ?? "off").toUpperCase()
              ),
              smsAuthenticationMessage: args.smsAuthenticationMessage,
              smsConfiguration: args.sms,
              softwareTokenMfaConfiguration: softwareToken ? { enabled: true } : void 0,
              lambdaConfig: triggers && triggers.apply((triggers2) => {
                return {
                  kmsKeyId: triggers2.kmsKey,
                  createAuthChallenge: createTrigger("createAuthChallenge"),
                  customEmailSender: triggers2.customEmailSender === void 0 ? void 0 : {
                    lambdaArn: createTrigger("customEmailSender"),
                    lambdaVersion: "V1_0"
                  },
                  customMessage: createTrigger("customMessage"),
                  customSmsSender: triggers2.customSmsSender === void 0 ? void 0 : {
                    lambdaArn: createTrigger("customSmsSender"),
                    lambdaVersion: "V1_0"
                  },
                  defineAuthChallenge: createTrigger("defineAuthChallenge"),
                  postAuthentication: createTrigger("postAuthentication"),
                  postConfirmation: createTrigger("postConfirmation"),
                  preAuthentication: createTrigger("preAuthentication"),
                  preSignUp: createTrigger("preSignUp"),
                  preTokenGenerationConfig: triggers2.preTokenGeneration === void 0 ? void 0 : {
                    lambdaArn: createTrigger("preTokenGeneration"),
                    lambdaVersion: triggers2.preTokenGenerationVersion
                  },
                  userMigration: createTrigger("userMigration"),
                  verifyAuthChallengeResponse: createTrigger(
                    "verifyAuthChallengeResponse"
                  )
                };
                function createTrigger(key) {
                  if (!triggers2[key]) return;
                  const fn = functionBuilder(
                    `${name}Trigger${key}`,
                    triggers2[key],
                    {
                      description: `Subscribed to ${key} from ${name}`
                    },
                    void 0,
                    { parent }
                  );
                  new lambda15.Permission(
                    `${name}Permission${key}`,
                    {
                      action: "lambda:InvokeFunction",
                      function: fn.arn,
                      principal: "cognito-idp.amazonaws.com",
                      sourceArn: userPool.arn
                    },
                    { parent }
                  );
                  return fn.arn;
                }
              })
            },
            { parent }
          )
        )
      );
    }
  }
  /**
   * The Cognito User Pool ID.
   */
  get id() {
    return this.userPool.id;
  }
  /**
   * The Cognito User Pool ARN.
   */
  get arn() {
    return this.userPool.arn;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon Cognito User Pool.
       */
      userPool: this.userPool
    };
  }
  /**
   * Add a client to the User Pool.
   *
   * @param name Name of the client.
   * @param args Configure the client.
   * @param opts? Resource options.
   *
   * @example
   *
   * ```ts
   * userPool.addClient("Web");
   * ```
   */
  addClient(name, args) {
    return new CognitoUserPoolClient(
      name,
      {
        userPool: this.id,
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /**
   * Add a federated identity provider to the User Pool.
   *
   * @param name Name of the identity provider.
   * @param args Configure the identity provider.
   *
   * @example
   *
   * For example, add a GitHub (OIDC) identity provider.
   *
   * ```ts title="sst.config.ts"
   * const GithubClientId = new sst.Secret("GITHUB_CLIENT_ID");
   * const GithubClientSecret = new sst.Secret("GITHUB_CLIENT_SECRET");
   *
   * userPool.addIdentityProvider("GitHub", {
   *   type: "oidc",
   *   details: {
   *      authorize_scopes: "read:user user:email",
   *      client_id: GithubClientId.value,
   *      client_secret: GithubClientSecret.value,
   *      oidc_issuer: "https://github.com/",
   *   },
   *   attributes: {
   *     email: "email",
   *     username: "sub",
   *   },
   * });
   * ```
   *
   * Or add a Google identity provider.
   *
   * ```ts title="sst.config.ts"
   * const GoogleClientId = new sst.Secret("GOOGLE_CLIENT_ID");
   * const GoogleClientSecret = new sst.Secret("GOOGLE_CLIENT_SECRET");
   *
   * userPool.addIdentityProvider("Google", {
   *   type: "google",
   *   details: {
   *     authorize_scopes: "email profile",
   *     client_id: GoogleClientId.value,
   *     client_secret: GoogleClientSecret.value,
   *   },
   *   attributes: {
   *     email: "email",
   *     name: "name",
   *     username: "sub",
   *   },
   * });
   * ```
   */
  addIdentityProvider(name, args) {
    return new CognitoIdentityProvider(
      name,
      {
        userPool: this.id,
        ...args
      },
      { provider: this.constructorOpts.provider }
    );
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        id: this.id
      },
      include: [
        permission({
          actions: ["cognito-idp:*"],
          resources: [this.userPool.arn]
        })
      ]
    };
  }
  /**
   * Reference an existing User Pool with the given ID. This is useful when you
   * create a User Pool in one stage and want to share it in another. It avoids having to
   * create a new User Pool in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share User Pools across stages.
   * :::
   *
   * @param name The name of the component.
   * @param userPoolID The ID of the existing User Pool.
   *
   * @example
   * Imagine you create a User Pool in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new pool, you want to share the same pool from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const userPool = $app.stage === "frank"
   *   ? sst.aws.CognitoUserPool.get("MyUserPool", "us-east-1_gcF5PjhQK")
   *   : new sst.aws.CognitoUserPool("MyUserPool");
   * ```
   *
   * Here `us-east-1_gcF5PjhQK` is the ID of the User Pool created in the `dev` stage.
   * You can find this by outputting the User Pool ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   userPool: userPool.id
   * };
   * ```
   */
  static get(name, userPoolID, opts) {
    const userPool = cognito4.UserPool.get(
      `${name}UserPool`,
      userPoolID,
      void 0,
      opts
    );
    return new _CognitoUserPool(name, {
      ref: true,
      userPool
    });
  }
};
var __pulumiType55 = "sst:aws:CognitoUserPool";
CognitoUserPool.__pulumiType = __pulumiType55;

// .sst/platform/src/components/aws/dynamo.ts
import {
  all as all33,
  interpolate as interpolate29,
  output as output64
} from "@pulumi/pulumi";

// .sst/platform/src/components/aws/dynamo-lambda-subscriber.ts
import { output as output63 } from "@pulumi/pulumi";
import { lambda as lambda16 } from "@pulumi/aws";
var DynamoLambdaSubscriber = class extends Component {
  fn;
  eventSourceMapping;
  constructor(name, args, opts) {
    super(__pulumiType56, name, args, opts);
    const self = this;
    const dynamo = output63(args.dynamo);
    const fn = createFunction();
    const eventSourceMapping = createEventSourceMapping();
    this.fn = fn;
    this.eventSourceMapping = eventSourceMapping;
    function createFunction() {
      return functionBuilder(
        `${name}Function`,
        args.subscriber,
        {
          description: `Subscribed to ${name}`,
          permissions: [
            {
              actions: [
                "dynamodb:DescribeStream",
                "dynamodb:GetRecords",
                "dynamodb:GetShardIterator",
                "dynamodb:ListStreams"
              ],
              resources: [dynamo.streamArn]
            }
          ]
        },
        void 0,
        { parent: self }
      );
    }
    function createEventSourceMapping() {
      return new lambda16.EventSourceMapping(
        ...transform(
          args.transform?.eventSourceMapping,
          `${name}EventSourceMapping`,
          {
            eventSourceArn: dynamo.streamArn,
            functionName: fn.arn.apply(
              (arn) => parseFunctionArn(arn).functionName
            ),
            filterCriteria: args.filters ? output63(args.filters).apply((filters) => ({
              filters: filters.map((filter) => ({
                pattern: JSON.stringify(filter)
              }))
            })) : void 0,
            startingPosition: "LATEST"
          },
          { parent: args.disableParent ? void 0 : self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function that'll be notified.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda event source mapping.
       */
      eventSourceMapping: this.eventSourceMapping
    };
  }
};
var __pulumiType56 = "sst:aws:DynamoLambdaSubscriber";
DynamoLambdaSubscriber.__pulumiType = __pulumiType56;

// .sst/platform/src/components/aws/dynamo.ts
import { dynamodb } from "@pulumi/aws";
var Dynamo = class _Dynamo extends Component {
  constructorName;
  constructorOpts;
  table;
  isStreamEnabled = false;
  constructor(name, args, opts = {}) {
    super(__pulumiType57, name, args, opts);
    this.constructorName = name;
    this.constructorOpts = opts;
    if (args && "ref" in args) {
      const ref = args;
      this.table = output64(ref.table);
      return;
    }
    const parent = this;
    const table = createTable();
    this.table = table;
    this.isStreamEnabled = Boolean(args.stream);
    function createTable() {
      return all33([
        args.fields,
        args.primaryIndex,
        args.globalIndexes,
        args.localIndexes,
        args.stream,
        args.deletionProtection
      ]).apply(
        ([
          fields,
          primaryIndex,
          globalIndexes,
          localIndexes,
          stream,
          deletionProtection
        ]) => new dynamodb.Table(
          ...transform(
            args.transform?.table,
            `${name}Table`,
            {
              attributes: Object.entries(fields).map(([name2, type]) => ({
                name: name2,
                type: type === "string" ? "S" : type === "number" ? "N" : "B"
              })),
              billingMode: "PAY_PER_REQUEST",
              hashKey: primaryIndex.hashKey,
              rangeKey: primaryIndex.rangeKey,
              streamEnabled: Boolean(stream),
              streamViewType: stream ? stream.toUpperCase().replaceAll("-", "_") : void 0,
              pointInTimeRecovery: {
                enabled: true
              },
              ttl: args.ttl === void 0 ? void 0 : {
                attributeName: args.ttl,
                enabled: true
              },
              globalSecondaryIndexes: Object.entries(globalIndexes ?? {}).map(
                ([name2, index]) => ({
                  name: name2,
                  hashKey: index.hashKey,
                  rangeKey: index.rangeKey,
                  ...index.projection === "keys-only" ? { projectionType: "KEYS_ONLY" } : Array.isArray(index.projection) ? {
                    projectionType: "INCLUDE",
                    nonKeyAttributes: index.projection
                  } : { projectionType: "ALL" }
                })
              ),
              localSecondaryIndexes: Object.entries(localIndexes ?? {}).map(
                ([name2, index]) => ({
                  name: name2,
                  rangeKey: index.rangeKey,
                  ...index.projection === "keys-only" ? { projectionType: "KEYS_ONLY" } : Array.isArray(index.projection) ? {
                    projectionType: "INCLUDE",
                    nonKeyAttributes: index.projection
                  } : { projectionType: "ALL" }
                })
              ),
              deletionProtectionEnabled: deletionProtection
            },
            { parent }
          )
        )
      );
    }
  }
  /**
   * The ARN of the DynamoDB Table.
   */
  get arn() {
    return this.table.arn;
  }
  /**
   * The name of the DynamoDB Table.
   */
  get name() {
    return this.table.name;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon DynamoDB Table.
       */
      table: this.table
    };
  }
  subscribe(nameOrSubscriber, subscriberOrArgs, args) {
    const sourceName = this.constructorName;
    if (!this.isStreamEnabled)
      throw new Error(
        `Cannot subscribe to "${sourceName}" because stream is not enabled.`
      );
    return isFunctionSubscriber(subscriberOrArgs).apply(
      (v) => v ? _Dynamo._subscribe(
        nameOrSubscriber,
        // name
        this.constructorName,
        this.nodes.table.streamArn,
        subscriberOrArgs,
        // subscriber
        args,
        { provider: this.constructorOpts.provider }
      ) : _Dynamo._subscribeV1(
        this.constructorName,
        this.nodes.table.streamArn,
        nameOrSubscriber,
        // subscriber
        subscriberOrArgs,
        // args
        { provider: this.constructorOpts.provider }
      )
    );
  }
  static subscribe(nameOrStreamArn, streamArnOrSubscriber, subscriberOrArgs, args) {
    return isFunctionSubscriber(subscriberOrArgs).apply(
      (v) => v ? output64(streamArnOrSubscriber).apply(
        (streamArn) => this._subscribe(
          nameOrStreamArn,
          // name
          logicalName(parseDynamoStreamArn(streamArn).tableName),
          streamArn,
          subscriberOrArgs,
          // subscriber
          args
        )
      ) : output64(nameOrStreamArn).apply(
        (streamArn) => this._subscribeV1(
          logicalName(parseDynamoStreamArn(streamArn).tableName),
          streamArn,
          streamArnOrSubscriber,
          // subscriber
          subscriberOrArgs
          // args
        )
      )
    );
  }
  static _subscribe(subscriberName, name, streamArn, subscriber, args = {}, opts = {}) {
    return output64(args).apply(
      (args2) => new DynamoLambdaSubscriber(
        `${name}Subscriber${subscriberName}`,
        {
          dynamo: { streamArn },
          subscriber,
          ...args2
        },
        opts
      )
    );
  }
  static _subscribeV1(name, streamArn, subscriber, args = {}, opts = {}) {
    return all33([name, subscriber, args]).apply(([name2, subscriber2, args2]) => {
      const suffix = logicalName(
        hashStringToPrettyString(
          [
            typeof streamArn === "string" ? streamArn : outputId,
            JSON.stringify(args2.filters ?? {}),
            typeof subscriber2 === "string" ? subscriber2 : subscriber2.handler
          ].join(""),
          6
        )
      );
      return new DynamoLambdaSubscriber(
        `${name2}Subscriber${suffix}`,
        {
          dynamo: { streamArn },
          subscriber: subscriber2,
          disableParent: true,
          ...args2
        },
        opts
      );
    });
  }
  /**
   * Reference an existing DynamoDB Table with the given table name. This is useful when you
   * create a table in one stage and want to share it in another stage. It avoid having to
   * create a new table in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share a table across stages.
   * :::
   *
   * @param name The name of the component.
   * @param tableName The name of the DynamoDB Table.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a table in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new table, you want to share the table from `dev`.
   *
   * ```ts title=sst.config.ts"
   * const table = $app.stage === "frank"
   *  ? sst.aws.Dynamo.get("MyTable", "app-dev-mytable")
   *  : new sst.aws.Dynamo("MyTable");
   * ```
   *
   * Here `app-dev-mytable` is the name of the DynamoDB Table created in the `dev` stage.
   * You can find this by outputting the table name in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   table: table.name
   * };
   * ```
   */
  static get(name, tableName, opts) {
    return new _Dynamo(name, {
      ref: true,
      table: dynamodb.Table.get(`${name}Table`, tableName, void 0, opts)
    });
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        name: this.name
      },
      include: [
        permission({
          actions: ["dynamodb:*"],
          resources: [this.arn, interpolate29`${this.arn}/*`]
        })
      ]
    };
  }
};
var __pulumiType57 = "sst:aws:Dynamo";
Dynamo.__pulumiType = __pulumiType57;

// .sst/platform/src/components/aws/email.ts
import {
  all as all34,
  interpolate as interpolate30,
  output as output65
} from "@pulumi/pulumi";
import { ses, sesv2 } from "@pulumi/aws";
var Email = class _Email extends Component {
  _sender;
  identity;
  configurationSet;
  constructor(name, args, opts) {
    super(__pulumiType58, name, args, opts);
    const self = this;
    if (args && "ref" in args) {
      const ref = reference();
      this._sender = ref.identity.emailIdentity;
      this.identity = ref.identity;
      this.configurationSet = ref.configurationSet;
      return;
    }
    const isDomain = checkIsDomain();
    const dns2 = normalizeDns();
    const dmarc = normalizeDmarc();
    const configurationSet = createConfigurationSet();
    const identity = createIdentity();
    createEvents();
    isDomain.apply((isDomain2) => {
      if (!isDomain2) return;
      createDkimRecords();
      createDmarcRecord();
      waitForVerification();
    });
    this._sender = output65(args.sender);
    this.identity = identity;
    this.configurationSet = configurationSet;
    function reference() {
      const ref = args;
      const identity2 = sesv2.EmailIdentity.get(
        `${name}Identity`,
        ref.sender,
        void 0,
        { parent: self }
      );
      const configurationSet2 = sesv2.ConfigurationSet.get(
        `${name}Config`,
        identity2.configurationSetName.apply((v) => v),
        void 0,
        { parent: self }
      );
      return {
        identity: identity2,
        configurationSet: configurationSet2
      };
    }
    function checkIsDomain() {
      return output65(args.sender).apply((sender) => !sender.includes("@"));
    }
    function normalizeDns() {
      all34([args.dns, isDomain]).apply(([dns3, isDomain2]) => {
        if (!isDomain2 && dns3)
          throw new Error(
            `The "dns" property is only valid when "sender" is a domain.`
          );
      });
      return args.dns ?? dns();
    }
    function normalizeDmarc() {
      all34([args.dmarc, isDomain]).apply(([dmarc2, isDomain2]) => {
        if (!isDomain2 && dmarc2)
          throw new Error(
            `The "dmarc" property is only valid when "sender" is a domain.`
          );
      });
      return args.dmarc ?? `v=DMARC1; p=none;`;
    }
    function createConfigurationSet() {
      return new sesv2.ConfigurationSet(
        ...transform(
          args.transform?.configurationSet,
          `${name}Config`,
          { configurationSetName: "" },
          { parent: self }
        )
      );
    }
    function createIdentity() {
      return new sesv2.EmailIdentity(
        ...transform(
          args.transform?.identity,
          `${name}Identity`,
          {
            emailIdentity: args.sender,
            configurationSetName: configurationSet.configurationSetName
          },
          { parent: self }
        )
      );
    }
    function createEvents() {
      output65(args.events ?? []).apply(
        (events) => events.forEach((event) => {
          new sesv2.ConfigurationSetEventDestination(
            `${name}Event${event.name}`,
            {
              configurationSetName: configurationSet.configurationSetName,
              eventDestinationName: event.name,
              eventDestination: {
                matchingEventTypes: event.types.map(
                  (t) => t.toUpperCase().replaceAll("-", "_")
                ),
                ...event.bus ? { eventBridgeDestination: { eventBusArn: event.bus } } : {},
                ...event.topic ? { snsDestination: { topicArn: event.topic } } : {},
                enabled: true
              }
            },
            { parent: self }
          );
        })
      );
    }
    function createDkimRecords() {
      all34([dns2, identity?.dkimSigningAttributes.tokens]).apply(
        ([dns3, tokens]) => {
          if (!dns3) return;
          tokens?.map(
            (token) => dns3.createRecord(
              name,
              {
                type: "CNAME",
                name: interpolate30`${token}._domainkey.${args.sender}`,
                value: `${token}.dkim.amazonses.com`
              },
              { parent: self }
            )
          );
        }
      );
    }
    function createDmarcRecord() {
      output65(dns2).apply((dns3) => {
        if (!dns3) return;
        dns3.createRecord(
          name,
          {
            type: "TXT",
            name: interpolate30`_dmarc.${args.sender}`,
            value: dmarc
          },
          { parent: self }
        );
      });
    }
    function waitForVerification() {
      new ses.DomainIdentityVerification(
        `${name}Verification`,
        {
          domain: args.sender
        },
        { parent: self, dependsOn: identity }
      );
    }
  }
  /**
   * The sender email address or domain name.
   */
  get sender() {
    return this._sender;
  }
  /**
   * The name of the configuration set.
   */
  get configSet() {
    return this.configurationSet.configurationSetName;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon SES identity.
       */
      identity: this.identity,
      /**
       * The Amazon SES configuration set.
       */
      configurationSet: this.configurationSet
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        sender: this._sender,
        configSet: this.configSet
      },
      include: [
        permission({
          actions: ["ses:*"],
          resources: [this.identity.arn, this.configurationSet.arn]
        }),
        // When the SES account is in sandbox mode, it seems you have to include verified
        // receipients inside `resources`. Needs further investigation.
        permission({
          actions: [
            "ses:SendEmail",
            "ses:SendRawEmail",
            "ses:SendTemplatedEmail"
          ],
          resources: ["*"]
        })
      ]
    };
  }
  /**
   * Reference an existing Email component with the given Amazon SES identity. This is useful
   * when you create an SES identity in one stage and want to share it in another stage. It
   * avoids having to create a new Email component in the other stage.
   *
   * @param name The name of the component.
   * @param sender The email address or domain name of the existing SES identity.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create an Email component in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new component, you want to share the one from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const email = $app.stage === "frank"
   *   ? sst.aws.Email.get("MyEmail", "spongebob@example.com")
   *   : new sst.aws.Email("MyEmail", {
   *       sender: "spongebob@example.com",
   *     });
   * ```
   */
  static get(name, sender, opts) {
    return new _Email(
      name,
      {
        ref: true,
        sender
      },
      opts
    );
  }
};
var __pulumiType58 = "sst:aws:Email";
Email.__pulumiType = __pulumiType58;

// .sst/platform/src/components/aws/kinesis-stream.ts
import * as aws from "@pulumi/aws";
import { all as all35, output as output67 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/kinesis-stream-lambda-subscriber.ts
import { lambda as lambda18 } from "@pulumi/aws";
import { output as output66 } from "@pulumi/pulumi";
var KinesisStreamLambdaSubscriber = class extends Component {
  fn;
  eventSourceMapping;
  constructor(name, args, opts) {
    super(__pulumiType59, name, args, opts);
    const self = this;
    const stream = output66(args.stream);
    const fn = createFunction();
    const eventSourceMapping = createEventSourceMapping();
    this.fn = fn;
    this.eventSourceMapping = eventSourceMapping;
    function createFunction() {
      return output66(args.subscriber).apply((subscriber) => {
        return functionBuilder(
          `${name}Function`,
          subscriber,
          {
            description: `Subscribed to ${name}`,
            permissions: [
              {
                actions: [
                  "kinesis:DescribeStream",
                  "kinesis:DescribeStreamSummary",
                  "kinesis:GetRecords",
                  "kinesis:GetShardIterator",
                  "kinesis:ListShards",
                  "kinesis:ListStreams",
                  "kinesis:SubscribeToShard"
                ],
                resources: [stream.arn]
              }
            ]
          },
          void 0,
          { parent: self }
        );
      });
    }
    function createEventSourceMapping() {
      return new lambda18.EventSourceMapping(
        ...transform(
          args.transform?.eventSourceMapping,
          `${name}EventSourceMapping`,
          {
            eventSourceArn: stream.arn,
            functionName: fn.arn.apply(
              (arn) => parseFunctionArn(arn).functionName
            ),
            startingPosition: "LATEST",
            filterCriteria: args.filters && {
              filters: output66(args.filters).apply(
                (filters) => filters.map((filter) => ({
                  pattern: JSON.stringify(filter)
                }))
              )
            }
          },
          { parent: self }
        )
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function that'll be notified.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda event source mapping.
       */
      eventSourceMapping: self.eventSourceMapping
    };
  }
};
var __pulumiType59 = "sst:aws:KinesisStreamLambdaSubscriber";
KinesisStreamLambdaSubscriber.__pulumiType = __pulumiType59;

// .sst/platform/src/components/aws/kinesis-stream.ts
var KinesisStream = class _KinesisStream extends Component {
  constructorName;
  constructorOpts;
  stream;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType60, name, args, opts);
    const parent = this;
    const stream = createStream();
    this.stream = stream;
    this.constructorName = name;
    this.constructorOpts = opts;
    function createStream() {
      return new aws.kinesis.Stream(
        ...transform(
          args?.transform?.stream,
          `${name}Stream`,
          {
            streamModeDetails: {
              streamMode: "ON_DEMAND"
            }
          },
          { parent }
        )
      );
    }
  }
  subscribe(nameOrSubscriber, subscriberOrArgs, args) {
    return isFunctionSubscriber(subscriberOrArgs).apply(
      (v) => v ? _KinesisStream._subscribe(
        nameOrSubscriber,
        // name
        this.constructorName,
        this.nodes.stream.arn,
        subscriberOrArgs,
        // subscriber
        args,
        { provider: this.constructorOpts.provider }
      ) : _KinesisStream._subscribeV1(
        this.constructorName,
        this.nodes.stream.arn,
        nameOrSubscriber,
        // subscriber
        subscriberOrArgs,
        // args
        { provider: this.constructorOpts.provider }
      )
    );
  }
  static subscribe(nameOrStreamArn, streamArnOrSubscriber, subscriberOrArgs, args) {
    return isFunctionSubscriber(subscriberOrArgs).apply(
      (v) => v ? output67(streamArnOrSubscriber).apply(
        (streamArn) => this._subscribe(
          nameOrStreamArn,
          // name
          logicalName(parseKinesisStreamArn(streamArn).streamName),
          streamArn,
          subscriberOrArgs,
          // subscriber
          args
        )
      ) : output67(nameOrStreamArn).apply(
        (streamArn) => this._subscribeV1(
          logicalName(parseKinesisStreamArn(streamArn).streamName),
          streamArn,
          streamArnOrSubscriber,
          // subscriber
          subscriberOrArgs
          // args
        )
      )
    );
  }
  static _subscribe(subscriberName, name, streamArn, subscriber, args = {}, opts = {}) {
    return output67(args).apply(
      (args2) => new KinesisStreamLambdaSubscriber(
        `${name}Subscriber${subscriberName}`,
        {
          stream: { arn: streamArn },
          subscriber,
          ...args2
        },
        opts
      )
    );
  }
  static _subscribeV1(name, streamArn, subscriber, args = {}, opts = {}) {
    return all35([streamArn, subscriber, args]).apply(
      ([streamArn2, subscriber2, args2]) => {
        const suffix = logicalName(
          hashStringToPrettyString(
            [
              streamArn2,
              JSON.stringify(args2.filters ?? {}),
              typeof subscriber2 === "string" ? subscriber2 : subscriber2.handler
            ].join(""),
            6
          )
        );
        return new KinesisStreamLambdaSubscriber(
          `${name}Subscriber${suffix}`,
          {
            stream: { arn: streamArn2 },
            subscriber: subscriber2,
            ...args2
          },
          opts
        );
      }
    );
  }
  get name() {
    return this.stream.name;
  }
  get arn() {
    return this.stream.arn;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon Kinesis Data Stream.
       */
      stream: this.stream
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        name: this.stream.name
      },
      include: [
        permission({
          actions: ["kinesis:*"],
          resources: [this.nodes.stream.arn]
        })
      ]
    };
  }
};
var __pulumiType60 = "sst:aws:KinesisStream";
KinesisStream.__pulumiType = __pulumiType60;

// .sst/platform/src/components/aws/nextjs.ts
import fs9 from "fs";
import path10 from "path";
import { all as all36, output as output68 } from "@pulumi/pulumi";
import { dynamodb as dynamodb2, getRegionOutput as getRegionOutput8, lambda as lambda19 } from "@pulumi/aws";
var DEFAULT_OPEN_NEXT_VERSION = "3.6.6";
var Nextjs = class extends SsrSite {
  revalidationQueue;
  revalidationTable;
  revalidationFunction;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType61, name, args, opts);
  }
  normalizeBuildCommand(args) {
    return all36([args?.buildCommand, args?.openNextVersion]).apply(
      ([buildCommand, openNextVersion]) => {
        if (buildCommand) return buildCommand;
        const version = openNextVersion ?? DEFAULT_OPEN_NEXT_VERSION;
        const packageName = isALteB(version, "3.1.3") ? "open-next" : "@opennextjs/aws";
        return `npx --yes ${packageName}@${version} build`;
      }
    );
  }
  buildPlan(outputPath, name, args, { bucket }) {
    const parent = this;
    const ret = all36([outputPath, args?.imageOptimization]).apply(
      ([outputPath2, imageOptimization]) => {
        const { openNextOutput, buildId, prerenderManifest, base } = loadBuildOutput();
        if (Object.entries(openNextOutput.edgeFunctions).length) {
          throw new VisibleError(
            `Lambda@Edge runtime is deprecated. Update your OpenNext configuration to use the standard Lambda runtime and deploy to multiple regions using the "regions" option in your Nextjs component.`
          );
        }
        const { revalidationQueue, revalidationFunction } = createRevalidationQueue();
        const revalidationTable = createRevalidationTable();
        createRevalidationTableSeeder();
        const serverOrigin = openNextOutput.origins["default"];
        const imageOptimizerOrigin = openNextOutput.origins["imageOptimizer"];
        const s3Origin = openNextOutput.origins["s3"];
        const plan = all36([
          revalidationTable?.arn,
          revalidationTable?.name,
          bucket.arn,
          bucket.name,
          getRegionOutput8(void 0, { parent: bucket }).name,
          revalidationQueue?.arn,
          revalidationQueue?.url,
          getRegionOutput8(void 0, { parent: revalidationQueue }).name
        ]).apply(
          ([
            tableArn,
            tableName,
            bucketArn,
            bucketName,
            bucketRegion,
            queueArn,
            queueUrl,
            queueRegion
          ]) => ({
            base,
            server: {
              description: `${name} server`,
              bundle: path10.join(outputPath2, serverOrigin.bundle),
              handler: serverOrigin.handler,
              streaming: serverOrigin.streaming,
              runtime: "nodejs20.x",
              environment: {
                CACHE_BUCKET_NAME: bucketName,
                CACHE_BUCKET_KEY_PREFIX: "_cache",
                CACHE_BUCKET_REGION: bucketRegion,
                ...queueUrl && {
                  REVALIDATION_QUEUE_URL: queueUrl,
                  REVALIDATION_QUEUE_REGION: queueRegion
                },
                ...tableName && {
                  CACHE_DYNAMO_TABLE: tableName
                }
              },
              permissions: [
                // access to the cache data
                {
                  actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
                  resources: [`${bucketArn}/*`]
                },
                {
                  actions: ["s3:ListBucket"],
                  resources: [bucketArn]
                },
                ...queueArn ? [
                  {
                    actions: [
                      "sqs:SendMessage",
                      "sqs:GetQueueAttributes",
                      "sqs:GetQueueUrl"
                    ],
                    resources: [queueArn]
                  }
                ] : [],
                ...tableArn ? [
                  {
                    actions: [
                      "dynamodb:BatchGetItem",
                      "dynamodb:GetRecords",
                      "dynamodb:GetShardIterator",
                      "dynamodb:Query",
                      "dynamodb:GetItem",
                      "dynamodb:Scan",
                      "dynamodb:ConditionCheckItem",
                      "dynamodb:BatchWriteItem",
                      "dynamodb:PutItem",
                      "dynamodb:UpdateItem",
                      "dynamodb:DeleteItem",
                      "dynamodb:DescribeTable"
                    ],
                    resources: [tableArn, `${tableArn}/*`]
                  }
                ] : []
              ],
              injections: [
                [
                  `outer:if (process.env.SST_KEY_FILE) {`,
                  `  const { readFileSync } = await import("fs")`,
                  `  const { createDecipheriv } = await import("crypto")`,
                  `  const key = Buffer.from(process.env.SST_KEY, "base64");`,
                  `  const encryptedData = readFileSync(process.env.SST_KEY_FILE);`,
                  `  const nonce = Buffer.alloc(12, 0);`,
                  `  const decipher = createDecipheriv("aes-256-gcm", key, nonce);`,
                  `  const authTag = encryptedData.slice(-16);`,
                  `  const actualCiphertext = encryptedData.slice(0, -16);`,
                  `  decipher.setAuthTag(authTag);`,
                  `  let decrypted = decipher.update(actualCiphertext);`,
                  `  decrypted = Buffer.concat([decrypted, decipher.final()]);`,
                  `  const decryptedData = JSON.parse(decrypted.toString());`,
                  `  globalThis.SST_KEY_FILE_DATA = decryptedData;`,
                  `}`
                ].join("\n")
              ]
            },
            imageOptimizer: {
              prefix: "/_next/image",
              function: {
                description: `${name} image optimizer`,
                handler: imageOptimizerOrigin.handler,
                bundle: path10.join(outputPath2, imageOptimizerOrigin.bundle),
                runtime: "nodejs20.x",
                architecture: "arm64",
                environment: {
                  BUCKET_NAME: bucketName,
                  BUCKET_KEY_PREFIX: "_assets",
                  ...imageOptimization?.staticEtag ? { OPENNEXT_STATIC_ETAG: "true" } : {}
                },
                memory: imageOptimization?.memory ?? "1536 MB"
              }
            },
            assets: [
              {
                from: ".open-next/assets",
                to: "_assets",
                cached: true,
                versionedSubDir: "_next",
                deepRoute: "_next"
              }
            ],
            isrCache: {
              from: ".open-next/cache",
              to: "_cache"
            },
            buildId
          })
        );
        return {
          plan,
          revalidationQueue,
          revalidationTable,
          revalidationFunction
        };
        function loadBuildOutput() {
          const openNextOutputPath = path10.join(
            outputPath2,
            ".open-next",
            "open-next.output.json"
          );
          if (!fs9.existsSync(openNextOutputPath)) {
            throw new VisibleError(
              `Could not load OpenNext output file at "${openNextOutputPath}". Make sure your Next.js app was built correctly with OpenNext.`
            );
          }
          const content = fs9.readFileSync(openNextOutputPath).toString();
          const json = JSON.parse(content);
          if (json.additionalProps?.initializationFunction) {
            json.additionalProps.initializationFunction = {
              handler: "index.handler",
              bundle: ".open-next/dynamodb-provider"
            };
          }
          return {
            openNextOutput: json,
            base: loadBasePath(),
            buildId: loadBuildId(),
            prerenderManifest: loadPrerenderManifest()
          };
        }
        function loadBuildId() {
          try {
            return fs9.readFileSync(path10.join(outputPath2, ".next/BUILD_ID")).toString();
          } catch (e) {
            console.error(e);
            throw new VisibleError(
              `Build ID not found in ".next/BUILD_ID" for site "${name}". Ensure your Next.js app was built successfully.`
            );
          }
        }
        function loadBasePath() {
          try {
            const content = fs9.readFileSync(
              path10.join(outputPath2, ".next", "routes-manifest.json"),
              "utf-8"
            );
            const json = JSON.parse(content);
            return json.basePath === "" ? void 0 : json.basePath;
          } catch (e) {
            console.error(e);
            throw new VisibleError(
              `Base path configuration not found in ".next/routes-manifest.json" for site "${name}". Check your Next.js configuration.`
            );
          }
        }
        function loadPrerenderManifest() {
          try {
            const content = fs9.readFileSync(
              path10.join(outputPath2, ".next/prerender-manifest.json")
            ).toString();
            return JSON.parse(content);
          } catch (e) {
            console.debug("Failed to load prerender-manifest.json", e);
          }
        }
        function createRevalidationQueue() {
          if (openNextOutput.additionalProps?.disableIncrementalCache)
            return {};
          const revalidationFunction2 = openNextOutput.additionalProps?.revalidationFunction;
          if (!revalidationFunction2) return {};
          const queue = new Queue(
            `${name}RevalidationEvents`,
            {
              fifo: true,
              transform: {
                queue: (args2) => {
                  args2.receiveWaitTimeSeconds = 20;
                }
              }
            },
            { parent }
          );
          const subscriber = queue.subscribe(
            {
              description: `${name} ISR revalidator`,
              handler: revalidationFunction2.handler,
              bundle: path10.join(outputPath2, revalidationFunction2.bundle),
              runtime: "nodejs20.x",
              timeout: "30 seconds",
              permissions: [
                {
                  actions: [
                    "sqs:ChangeMessageVisibility",
                    "sqs:DeleteMessage",
                    "sqs:GetQueueAttributes",
                    "sqs:GetQueueUrl",
                    "sqs:ReceiveMessage"
                  ],
                  resources: [queue.arn]
                }
              ],
              dev: false,
              _skipMetadata: true
            },
            {
              transform: {
                eventSourceMapping: (args2) => {
                  args2.batchSize = 5;
                }
              }
            },
            { parent }
          );
          return {
            revalidationQueue: queue,
            revalidationFunction: subscriber.nodes.function
          };
        }
        function createRevalidationTable() {
          if (openNextOutput.additionalProps?.disableTagCache) return;
          return new dynamodb2.Table(
            `${name}RevalidationTable`,
            {
              attributes: [
                { name: "tag", type: "S" },
                { name: "path", type: "S" },
                { name: "revalidatedAt", type: "N" }
              ],
              hashKey: "tag",
              rangeKey: "path",
              pointInTimeRecovery: {
                enabled: true
              },
              billingMode: "PAY_PER_REQUEST",
              globalSecondaryIndexes: [
                {
                  name: "revalidate",
                  hashKey: "path",
                  rangeKey: "revalidatedAt",
                  projectionType: "ALL"
                }
              ]
            },
            { parent, retainOnDelete: false }
          );
        }
        function createRevalidationTableSeeder() {
          if (openNextOutput.additionalProps?.disableTagCache) return;
          if (!openNextOutput.additionalProps?.initializationFunction) return;
          const prerenderedRouteCount = Object.keys(
            prerenderManifest?.routes ?? {}
          ).length;
          const seedFn = new Function(
            `${name}RevalidationSeeder`,
            {
              description: `${name} ISR revalidation data seeder`,
              handler: openNextOutput.additionalProps.initializationFunction.handler,
              bundle: path10.join(
                outputPath2,
                openNextOutput.additionalProps.initializationFunction.bundle
              ),
              runtime: "nodejs20.x",
              timeout: "900 seconds",
              memory: `${Math.min(
                10240,
                Math.max(128, Math.ceil(prerenderedRouteCount / 4e3) * 128)
              )} MB`,
              permissions: [
                {
                  actions: [
                    "dynamodb:BatchWriteItem",
                    "dynamodb:PutItem",
                    "dynamodb:DescribeTable"
                  ],
                  resources: [revalidationTable.arn]
                }
              ],
              environment: {
                CACHE_DYNAMO_TABLE: revalidationTable.name
              },
              dev: false,
              _skipMetadata: true,
              _skipHint: true
            },
            { parent }
          );
          new lambda19.Invocation(
            `${name}RevalidationSeed`,
            {
              functionName: seedFn.nodes.function.name,
              triggers: {
                version: Date.now().toString()
              },
              input: JSON.stringify({
                RequestType: "Create"
              })
            },
            { parent }
          );
        }
      }
    );
    this.revalidationQueue = ret.revalidationQueue;
    this.revalidationTable = ret.revalidationTable;
    this.revalidationFunction = output68(ret.revalidationFunction);
    return ret.plan;
  }
  /**
   * The URL of the Next.js app.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      ...super.nodes,
      /**
       * The Amazon SQS queue that triggers the ISR revalidator.
       */
      revalidationQueue: this.revalidationQueue,
      /**
       * The Amazon DynamoDB table that stores the ISR revalidation data.
       */
      revalidationTable: this.revalidationTable,
      /**
       * The Lambda function that processes the ISR revalidation.
       */
      revalidationFunction: this.revalidationFunction
    };
  }
};
var __pulumiType61 = "sst:aws:Nextjs";
Nextjs.__pulumiType = __pulumiType61;

// .sst/platform/src/components/aws/opencontrol.ts
import { RandomPassword as RandomPassword2 } from "@pulumi/random";
var OpenControl = class extends Component {
  _server;
  _key;
  constructor(name, args, opts) {
    super(__pulumiType62, name, args, opts);
    const self = this;
    const key = createKey();
    const server = createServer();
    this._server = server;
    this._key = key;
    registerOutputs();
    function registerOutputs() {
      self.registerOutputs({
        _hint: self.url
      });
    }
    function createKey() {
      return new RandomPassword2(
        `${name}Key`,
        {
          length: 16,
          special: false
        },
        { parent: self }
      ).result;
    }
    function createServer() {
      return functionBuilder(
        `${name}Server`,
        args.server,
        {
          link: [],
          environment: {
            OPENCONTROL_KEY: key
          },
          url: true,
          _skipHint: true
        },
        (args2) => {
          args2.url = {
            cors: false
          };
        },
        { parent: self }
      ).apply((v) => v.getFunction());
    }
  }
  /**
   * The URL of the OpenControl server.
   */
  get url() {
    return this._server.url;
  }
  /**
   * The password for the OpenControl server.
   */
  get password() {
    return this._key;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Function component for the server.
       */
      server: this._server
    };
  }
};
var __pulumiType62 = "sst:aws:OpenControl";
OpenControl.__pulumiType = __pulumiType62;

// .sst/platform/src/components/aws/open-search.ts
import {
  interpolate as interpolate31,
  jsonStringify as jsonStringify9,
  output as output69
} from "@pulumi/pulumi";
import { iam as iam17, opensearch, secretsmanager as secretsmanager2 } from "@pulumi/aws";
import { RandomPassword as RandomPassword3 } from "@pulumi/random";
var OpenSearch = class _OpenSearch extends Component {
  domain;
  _username;
  _password;
  dev;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType63, name, args, opts);
    const self = this;
    if (args && "ref" in args) {
      const ref = reference();
      this.domain = ref.domain;
      this._username = ref.username;
      this._password = ref.password;
      return;
    }
    const engineVersion = output69(args.version).apply(
      (v) => v ?? "OpenSearch_2.17"
    );
    const instanceType = output69(args.instance).apply((v) => v ?? "t3.small");
    const username = output69(args.username).apply((v) => v ?? "admin");
    const storage = normalizeStorage2();
    const dev = registerDev();
    if (dev?.enabled) {
      this.dev = dev;
      return;
    }
    const password = createPassword();
    const secret5 = createSecret();
    const domain = createDomain();
    const policy = createPolicy();
    this.domain = domain;
    this._username = username;
    this._password = password;
    this.registerOutputs({
      _hint: this.url
    });
    function reference() {
      const ref = args;
      const domain2 = opensearch.Domain.get(`${name}Domain`, ref.id);
      const input = domain2.tags.apply((tags) => {
        if (!tags?.["sst:ref:username"])
          throw new VisibleError(
            `Failed to get username for OpenSearch ${name}.`
          );
        if (!tags?.["sst:ref:password"])
          throw new VisibleError(
            `Failed to get password for OpenSearch ${name}.`
          );
        return {
          username: tags["sst:ref:username"],
          password: tags["sst:ref:password"]
        };
      });
      const secret6 = secretsmanager2.getSecretVersionOutput(
        { secretId: input.password },
        { parent: self }
      );
      const password2 = jsonParse(secret6.secretString).apply(
        (v) => v.password
      );
      return { domain: domain2, username: input.username, password: password2 };
    }
    function normalizeStorage2() {
      return output69(args.storage ?? "10 GB").apply((v) => {
        const size = toGBs(v);
        if (size < 10) {
          throw new VisibleError(
            `Storage must be at least 10 GB for the ${name} OpenSearch domain.`
          );
        }
        return size;
      });
    }
    function registerDev() {
      if (!args.dev) return void 0;
      if (false) {
        throw new VisibleError(
          `You must provide the password to connect to your locally running OpenSearch domain either by setting the "dev.password" or by setting the top-level "password" property.`
        );
      }
      const dev2 = {
        enabled: false,
        url: output69(args.dev.url ?? "http://localhost:9200"),
        username: args.dev.username ? output69(args.dev.username) : username,
        password: output69(args.dev.password ?? args.password ?? "")
      };
      new DevCommand(`${name}Dev`, {
        dev: {
          title: name,
          autostart: true,
          command: `sst print-and-not-quit`
        },
        environment: {
          SST_DEV_COMMAND_MESSAGE: interpolate31`Make sure your local OpenSearch server is using:

  username: "${dev2.username}"
  password: "${dev2.password}"

Listening on "${dev2.url}"...`
        }
      });
      return dev2;
    }
    function createPassword() {
      return args.password ? output69(args.password) : new RandomPassword3(
        `${name}Password`,
        {
          length: 32,
          minLower: 1,
          minUpper: 1,
          minNumeric: 1,
          minSpecial: 1
        },
        { parent: self }
      ).result;
    }
    function createSecret() {
      const secret6 = new secretsmanager2.Secret(
        `${name}Secret`,
        {
          recoveryWindowInDays: 0
        },
        { parent: self }
      );
      new secretsmanager2.SecretVersion(
        `${name}SecretVersion`,
        {
          secretId: secret6.id,
          secretString: jsonStringify9({
            username,
            password
          })
        },
        { parent: self }
      );
      return secret6;
    }
    function createDomain() {
      return new opensearch.Domain(
        ...transform(
          args.transform?.domain,
          `${name}Domain`,
          {
            engineVersion,
            clusterConfig: {
              instanceType: interpolate31`${instanceType}.search`,
              instanceCount: 1,
              dedicatedMasterEnabled: false,
              zoneAwarenessEnabled: false
            },
            ebsOptions: {
              ebsEnabled: true,
              volumeSize: storage,
              volumeType: "gp3"
            },
            advancedSecurityOptions: {
              enabled: true,
              internalUserDatabaseEnabled: true,
              masterUserOptions: {
                masterUserName: username,
                masterUserPassword: password
              }
            },
            nodeToNodeEncryption: {
              enabled: true
            },
            encryptAtRest: {
              enabled: true
            },
            domainEndpointOptions: {
              enforceHttps: true,
              tlsSecurityPolicy: "Policy-Min-TLS-1-2-2019-07"
            },
            tags: {
              "sst:ref:password": secret5.id,
              "sst:ref:username": username
            }
          },
          { parent: self }
        )
      );
    }
    function createPolicy() {
      return new opensearch.DomainPolicy(
        `${name}DomainPolicy`,
        {
          domainName: domain.domainName,
          accessPolicies: iam17.getPolicyDocumentOutput({
            statements: [
              {
                principals: [{ type: "*", identifiers: ["*"] }],
                actions: ["*"],
                resources: ["*"]
              }
            ]
          }).json
        },
        { parent: self }
      );
    }
  }
  /**
   * The ID of the OpenSearch component.
   */
  get id() {
    if (this.dev?.enabled) return output69("placeholder");
    return this.domain.id;
  }
  /** The username of the master user. */
  get username() {
    if (this.dev?.enabled) return this.dev.username;
    return this._username;
  }
  /** The password of the master user. */
  get password() {
    if (this.dev?.enabled) return this.dev.password;
    return this._password;
  }
  /**
   * The endpoint of the domain.
   */
  get url() {
    if (this.dev?.enabled) return this.dev.url;
    return interpolate31`https://${this.domain.endpoint}`;
  }
  get nodes() {
    return {
      domain: this.domain
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        username: this.username,
        password: this.password,
        url: this.url
      }
    };
  }
  /**
   * Reference an existing OpenSearch domain with the given name. This is useful when you
   * create a domain in one stage and want to share it in another. It avoids
   * having to create a new domain in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share OpenSearch domains across stages.
   * :::
   *
   * @param name The name of the component.
   * @param id The ID of the existing OpenSearch component.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a domain in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new domain, you want to share the same domain from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const search = $app.stage === "frank"
   *   ? sst.aws.OpenSearch.get("MyOpenSearch", "arn:aws:es:us-east-1:123456789012:domain/app-dev-myopensearch-efsmkrbt")
   *   : new sst.aws.OpenSearch("MyOpenSearch");
   * ```
   *
   * Here `arn:aws:es:us-east-1:123456789012:domain/app-dev-myopensearch-efsmkrbt` is the
   * ID of the OpenSearch component created in the `dev` stage.
   * You can find this by outputting the ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   id: search.id
   * };
   * ```
   */
  static get(name, id, opts) {
    return new _OpenSearch(
      name,
      {
        ref: true,
        id
      },
      opts
    );
  }
};
var __pulumiType63 = "sst:aws:OpenSearch";
OpenSearch.__pulumiType = __pulumiType63;

// .sst/platform/src/components/aws/postgres.ts
import {
  all as all37,
  interpolate as interpolate32,
  jsonStringify as jsonStringify10,
  output as output71
} from "@pulumi/pulumi";
import { iam as iam18, rds as rds3, secretsmanager as secretsmanager4 } from "@pulumi/aws";
import { RandomPassword as RandomPassword4 } from "@pulumi/random";

// .sst/platform/src/components/aws/postgres-v1.ts
import {
  jsonParse as jsonParse2,
  output as output70
} from "@pulumi/pulumi";
import { rds as rds2, secretsmanager as secretsmanager3 } from "@pulumi/aws";
function parseACU2(acu) {
  const result2 = parseFloat(acu.split(" ")[0]);
  return result2;
}
var Postgres = class _Postgres extends Component {
  cluster;
  instance;
  constructor(name, args, opts) {
    super(__pulumiType64, name, args, opts);
    if (args && "ref" in args) {
      const ref = args;
      this.cluster = ref.cluster;
      this.instance = ref.instance;
      return;
    }
    const parent = this;
    const scaling = normalizeScaling();
    const version = normalizeVersion();
    const databaseName = normalizeDatabaseName();
    const subnetGroup = createSubnetGroup();
    const cluster = createCluster();
    const instance = createInstance();
    this.cluster = cluster;
    this.instance = instance;
    function normalizeScaling() {
      return output70(args.scaling).apply((scaling2) => ({
        minCapacity: parseACU2(scaling2?.min ?? "0.5 ACU"),
        maxCapacity: parseACU2(scaling2?.max ?? "4 ACU")
      }));
    }
    function normalizeVersion() {
      return output70(args.version).apply((version2) => version2 ?? "15.5");
    }
    function normalizeDatabaseName() {
      return output70(args.databaseName).apply(
        (name2) => name2 ?? define_app_default.name.replaceAll("-", "_")
      );
    }
    function createSubnetGroup() {
      if (args.vpc === "default") return;
      return new rds2.SubnetGroup(
        ...transform(
          args.transform?.subnetGroup,
          `${name}SubnetGroup`,
          {
            subnetIds: output70(args.vpc).privateSubnets
          },
          { parent }
        )
      );
    }
    function createCluster() {
      return new rds2.Cluster(
        ...transform(
          args.transform?.cluster,
          `${name}Cluster`,
          {
            engine: rds2.EngineType.AuroraPostgresql,
            engineMode: "provisioned",
            engineVersion: version,
            databaseName,
            masterUsername: "postgres",
            manageMasterUserPassword: true,
            serverlessv2ScalingConfiguration: scaling,
            skipFinalSnapshot: true,
            enableHttpEndpoint: true,
            dbSubnetGroupName: subnetGroup?.name,
            vpcSecurityGroupIds: args.vpc === "default" ? void 0 : output70(args.vpc).securityGroups
          },
          { parent }
        )
      );
    }
    function createInstance() {
      return new rds2.ClusterInstance(
        ...transform(
          args.transform?.instance,
          `${name}Instance`,
          {
            clusterIdentifier: cluster.id,
            instanceClass: "db.serverless",
            engine: rds2.EngineType.AuroraPostgresql,
            engineVersion: cluster.engineVersion,
            dbSubnetGroupName: subnetGroup?.name
          },
          { parent }
        )
      );
    }
  }
  _dbSecret;
  get secret() {
    return this.secretArn.apply((val) => {
      if (this._dbSecret) return this._dbSecret;
      if (!val) return;
      this._dbSecret = secretsmanager3.getSecretVersionOutput({
        secretId: val
      });
      return this._dbSecret;
    });
  }
  /**
   * The ID of the RDS Cluster.
   */
  get clusterID() {
    return this.cluster.id;
  }
  /**
   * The ARN of the RDS Cluster.
   */
  get clusterArn() {
    return this.cluster.arn;
  }
  /**
   * The ARN of the master user secret.
   */
  get secretArn() {
    return this.cluster.masterUserSecrets[0].secretArn;
  }
  /** The username of the master user. */
  get username() {
    return this.cluster.masterUsername;
  }
  /** The password of the master user. */
  get password() {
    return this.cluster.masterPassword.apply((val) => {
      if (val) return output70(val);
      const parsed = jsonParse2(
        this.secret.apply(
          (secret5) => secret5 ? secret5.secretString : output70("{}")
        )
      );
      return parsed.password;
    });
  }
  /**
   * The name of the database.
   */
  get database() {
    return this.cluster.databaseName;
  }
  /**
   * The port of the database.
   */
  get port() {
    return this.instance.port;
  }
  /**
   * The host of the database.
   */
  get host() {
    return this.instance.endpoint;
  }
  get nodes() {
    return {
      cluster: this.cluster,
      instance: this.instance
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        clusterArn: this.clusterArn,
        secretArn: this.secretArn,
        database: this.cluster.databaseName,
        username: this.username,
        password: this.password,
        port: this.port,
        host: this.host
      },
      include: [
        permission({
          actions: ["secretsmanager:GetSecretValue"],
          resources: [
            this.cluster.masterUserSecrets[0].secretArn.apply(
              (v) => v ?? "arn:aws:iam::rdsdoesnotusesecretmanager"
            )
          ]
        }),
        permission({
          actions: [
            "rds-data:BatchExecuteStatement",
            "rds-data:BeginTransaction",
            "rds-data:CommitTransaction",
            "rds-data:ExecuteStatement",
            "rds-data:RollbackTransaction"
          ],
          resources: [this.cluster.arn]
        })
      ]
    };
  }
  /**
   * Reference an existing Postgres cluster with the given cluster name. This is useful when you
   * create a Postgres cluster in one stage and want to share it in another. It avoids having to
   * create a new Postgres cluster in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share Postgres clusters across stages.
   * :::
   *
   * @param name The name of the component.
   * @param clusterID The id of the existing Postgres cluster.
   *
   * @example
   * Imagine you create a cluster in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new cluster, you want to share the same cluster from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const database = $app.stage === "frank"
   *   ? sst.aws.Postgres.v1.get("MyDatabase", "app-dev-mydatabase")
   *   : new sst.aws.Postgres.v1("MyDatabase");
   * ```
   *
   * Here `app-dev-mydatabase` is the ID of the cluster created in the `dev` stage.
   * You can find this by outputting the cluster ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   cluster: database.clusterID
   * };
   * ```
   */
  static get(name, clusterID) {
    const cluster = rds2.Cluster.get(`${name}Cluster`, clusterID);
    const instances = rds2.getInstancesOutput({
      filters: [{ name: "db-cluster-id", values: [clusterID] }]
    });
    const instance = rds2.ClusterInstance.get(
      `${name}Instance`,
      instances.apply((instances2) => {
        if (instances2.instanceIdentifiers.length === 0)
          throw new Error(`No instance found for cluster ${clusterID}`);
        return instances2.instanceIdentifiers[0];
      })
    );
    return new _Postgres(name, {
      ref: true,
      cluster,
      instance
    });
  }
};
var __pulumiType64 = "sst:aws:Postgres";
Postgres.__pulumiType = __pulumiType64;

// .sst/platform/src/components/aws/postgres.ts
var Postgres2 = class _Postgres extends Component {
  instance;
  _password;
  proxy;
  dev;
  static v1 = Postgres;
  constructor(name, args, opts) {
    super(__pulumiType65, name, args, opts);
    const _version = 2;
    const self = this;
    if (args && "ref" in args) {
      const ref = reference();
      this.instance = ref.instance;
      this._password = ref.password;
      this.proxy = output71(ref.proxy);
      return;
    }
    registerVersion();
    const multiAz = output71(args.multiAz).apply((v) => v ?? false);
    const engineVersion = output71(args.version).apply((v) => v ?? "16.4");
    const instanceType = output71(args.instance).apply((v) => v ?? "t4g.micro");
    const username = output71(args.username).apply((v) => v ?? "postgres");
    const storage = normalizeStorage2();
    const dbName = output71(args.database).apply(
      (v) => v ?? define_app_default.name.replaceAll("-", "_")
    );
    const vpc = normalizeVpc();
    const dev = registerDev();
    if (dev?.enabled) {
      this.dev = dev;
      return;
    }
    const password = createPassword();
    const secret5 = createSecret();
    const subnetGroup = createSubnetGroup();
    const parameterGroup = createParameterGroup();
    const instance = createInstance();
    createReplicas();
    const proxy = createProxy();
    this.instance = instance;
    this._password = password;
    this.proxy = proxy;
    function reference() {
      const ref = args;
      const instance2 = rds3.Instance.get(`${name}Instance`, ref.id, void 0, {
        parent: self
      });
      const input = instance2.tags.apply((tags) => {
        registerVersion(
          tags?.["sst:component-version"] ? parseInt(tags["sst:component-version"]) : void 0
        );
        return {
          proxyId: output71(ref.proxyId),
          passwordTag: tags?.["sst:lookup:password"]
        };
      });
      const proxy2 = input.proxyId.apply(
        (proxyId) => proxyId ? rds3.Proxy.get(`${name}Proxy`, proxyId, void 0, {
          parent: self
        }) : void 0
      );
      const password2 = input.passwordTag.apply((passwordTag) => {
        if (!passwordTag)
          throw new VisibleError(
            `Failed to get password for Postgres ${name}.`
          );
        const secret6 = secretsmanager4.getSecretVersionOutput(
          { secretId: passwordTag },
          { parent: self }
        );
        return jsonParse(secret6.secretString).apply(
          (v) => v.password
        );
      });
      return { instance: instance2, proxy: proxy2, password: password2 };
    }
    function registerVersion(overrideVersion) {
      self.registerVersion({
        new: _version,
        old: overrideVersion ?? define_cli_default.state.version[name],
        message: [
          `This component has been renamed. Please change:
`,
          `"sst.aws.Postgres" to "sst.aws.Postgres.v${define_cli_default.state.version[name]}"
`,
          `Learn more https://sst.dev/docs/components/#versioning`
        ].join("\n")
      });
    }
    function normalizeStorage2() {
      return output71(args.storage ?? "20 GB").apply((v) => {
        const size = toGBs(v);
        if (size < 20) {
          throw new VisibleError(
            `Storage must be at least 20 GB for the ${name} Postgres database.`
          );
        }
        if (size > 65536) {
          throw new VisibleError(
            `Storage cannot be greater than 65536 GB (64 TB) for the ${name} Postgres database.`
          );
        }
        return size;
      });
    }
    function normalizeVpc() {
      if (args.vpc instanceof Vpc) {
        throw new VisibleError(
          `You are using the "Vpc.v1" component. Please migrate to the latest "Vpc" component.`
        );
      }
      if (args.vpc instanceof Vpc2) {
        return {
          subnets: args.vpc.privateSubnets
        };
      }
      return output71(args.vpc);
    }
    function registerDev() {
      if (!args.dev) return void 0;
      if (false) {
        throw new VisibleError(
          `You must provide the password to connect to your locally running Postgres database either by setting the "dev.password" or by setting the top-level "password" property.`
        );
      }
      const dev2 = {
        enabled: false,
        host: output71(args.dev.host ?? "localhost"),
        port: output71(args.dev.port ?? 5432),
        username: args.dev.username ? output71(args.dev.username) : username,
        password: output71(args.dev.password ?? args.password ?? ""),
        database: args.dev.database ? output71(args.dev.database) : dbName
      };
      new DevCommand(`${name}Dev`, {
        dev: {
          title: name,
          autostart: true,
          command: `sst print-and-not-quit`
        },
        environment: {
          SST_DEV_COMMAND_MESSAGE: interpolate32`Make sure your local PostgreSQL server is using:

  username: "${dev2.username}"
  password: "${dev2.password}"
  database: "${dev2.database}"

Listening on "${dev2.host}:${dev2.port}"...`
        }
      });
      return dev2;
    }
    function createPassword() {
      return args.password ? output71(args.password) : new RandomPassword4(
        `${name}Password`,
        {
          length: 32,
          special: false
        },
        { parent: self }
      ).result;
    }
    function createSubnetGroup() {
      return new rds3.SubnetGroup(
        ...transform(
          args.transform?.subnetGroup,
          `${name}SubnetGroup`,
          {
            subnetIds: vpc.subnets
          },
          { parent: self }
        )
      );
    }
    function createParameterGroup() {
      return new rds3.ParameterGroup(
        ...transform(
          args.transform?.parameterGroup,
          `${name}ParameterGroup`,
          {
            family: engineVersion.apply((v) => `postgres${v.split(".")[0]}`),
            parameters: [
              {
                name: "rds.force_ssl",
                value: "0"
              },
              {
                name: "rds.logical_replication",
                value: "1",
                applyMethod: "pending-reboot"
              }
            ]
          },
          { parent: self }
        )
      );
    }
    function createSecret() {
      const secret6 = new secretsmanager4.Secret(
        `${name}ProxySecret`,
        {
          recoveryWindowInDays: 0
        },
        { parent: self }
      );
      new secretsmanager4.SecretVersion(
        `${name}ProxySecretVersion`,
        {
          secretId: secret6.id,
          secretString: jsonStringify10({
            username,
            password
          })
        },
        { parent: self }
      );
      return secret6;
    }
    function createInstance() {
      return new rds3.Instance(
        ...transform(
          args.transform?.instance,
          `${name}Instance`,
          {
            dbName,
            dbSubnetGroupName: subnetGroup.name,
            engine: "postgres",
            engineVersion,
            instanceClass: interpolate32`db.${instanceType}`,
            username,
            password,
            parameterGroupName: parameterGroup.name,
            skipFinalSnapshot: true,
            storageEncrypted: true,
            storageType: "gp3",
            allocatedStorage: 20,
            maxAllocatedStorage: storage,
            multiAz,
            backupRetentionPeriod: 7,
            performanceInsightsEnabled: true,
            tags: {
              "sst:component-version": _version.toString(),
              "sst:lookup:password": secret5.id
            }
          },
          { parent: self, deleteBeforeReplace: true }
        )
      );
    }
    function createReplicas() {
      return output71(args.replicas ?? 0).apply(
        (replicas) => Array.from({ length: replicas }).map(
          (_, i) => new rds3.Instance(
            `${name}Replica${i}`,
            {
              replicateSourceDb: instance.identifier,
              dbName: interpolate32`${instance.dbName}_replica${i}`,
              dbSubnetGroupName: instance.dbSubnetGroupName,
              availabilityZone: instance.availabilityZone,
              engine: instance.engine,
              engineVersion: instance.engineVersion,
              instanceClass: instance.instanceClass,
              username: instance.username,
              password: instance.password.apply((v) => v),
              parameterGroupName: instance.parameterGroupName,
              skipFinalSnapshot: true,
              storageEncrypted: instance.storageEncrypted.apply((v) => v),
              storageType: instance.storageType,
              allocatedStorage: instance.allocatedStorage,
              maxAllocatedStorage: instance.maxAllocatedStorage.apply(
                (v) => v
              )
            },
            { parent: self }
          )
        )
      );
    }
    function createProxy() {
      return output71(args.proxy).apply((proxy2) => {
        if (!proxy2) return;
        const credentials = proxy2 === true ? [] : proxy2.credentials ?? [];
        const secrets = credentials.map((credential) => {
          const secret6 = new secretsmanager4.Secret(
            `${name}ProxySecret${credential.username}`,
            {
              recoveryWindowInDays: 0
            },
            { parent: self }
          );
          new secretsmanager4.SecretVersion(
            `${name}ProxySecretVersion${credential.username}`,
            {
              secretId: secret6.id,
              secretString: jsonStringify10({
                username: credential.username,
                password: credential.password
              })
            },
            { parent: self }
          );
          return secret6;
        });
        const role = new iam18.Role(
          `${name}ProxyRole`,
          {
            assumeRolePolicy: iam18.assumeRolePolicyForPrincipal({
              Service: "rds.amazonaws.com"
            }),
            inlinePolicies: [
              {
                name: "inline",
                policy: iam18.getPolicyDocumentOutput({
                  statements: [
                    {
                      actions: ["secretsmanager:GetSecretValue"],
                      resources: [secret5.arn, ...secrets.map((s) => s.arn)]
                    }
                  ]
                }).json
              }
            ]
          },
          { parent: self }
        );
        const lookup = new RdsRoleLookup(
          `${name}ProxyRoleLookup`,
          { name: "AWSServiceRoleForRDS" },
          { parent: self }
        );
        const rdsProxy = new rds3.Proxy(
          ...transform(
            args.transform?.proxy,
            `${name}Proxy`,
            {
              engineFamily: "POSTGRESQL",
              auths: [
                {
                  authScheme: "SECRETS",
                  iamAuth: "DISABLED",
                  secretArn: secret5.arn
                },
                ...secrets.map((s) => ({
                  authScheme: "SECRETS",
                  iamAuth: "DISABLED",
                  secretArn: s.arn
                }))
              ],
              roleArn: role.arn,
              vpcSubnetIds: vpc.subnets
            },
            { parent: self, dependsOn: [lookup] }
          )
        );
        const targetGroup = new rds3.ProxyDefaultTargetGroup(
          `${name}ProxyTargetGroup`,
          {
            dbProxyName: rdsProxy.name
          },
          { parent: self }
        );
        new rds3.ProxyTarget(
          `${name}ProxyTarget`,
          {
            dbProxyName: rdsProxy.name,
            targetGroupName: targetGroup.name,
            dbInstanceIdentifier: instance.identifier
          },
          { parent: self }
        );
        return rdsProxy;
      });
    }
  }
  /**
   * The identifier of the Postgres instance.
   */
  get id() {
    if (this.dev?.enabled) return output71("placeholder");
    return this.instance.identifier;
  }
  /**
   * The name of the Postgres proxy.
   */
  get proxyId() {
    if (this.dev?.enabled) return output71("placeholder");
    return this.proxy.apply((v) => {
      if (!v) {
        throw new VisibleError(
          `Proxy is not enabled. Enable it with "proxy: true".`
        );
      }
      return v.id;
    });
  }
  /** The username of the master user. */
  get username() {
    if (this.dev?.enabled) return this.dev.username;
    return this.instance.username;
  }
  /** The password of the master user. */
  get password() {
    if (this.dev?.enabled) return this.dev.password;
    return this._password;
  }
  /**
   * The name of the database.
   */
  get database() {
    if (this.dev?.enabled) return this.dev.database;
    return this.instance.dbName;
  }
  /**
   * The port of the database.
   */
  get port() {
    if (this.dev?.enabled) return this.dev.port;
    return this.instance.port;
  }
  /**
   * The host of the database.
   */
  get host() {
    if (this.dev?.enabled) return this.dev.host;
    return all37([this.instance.endpoint, this.proxy]).apply(
      ([endpoint, proxy]) => proxy?.endpoint ?? output71(endpoint.split(":")[0])
    );
  }
  get nodes() {
    return {
      instance: this.instance
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        database: this.database,
        username: this.username,
        password: this.password,
        port: this.port,
        host: this.host
      }
    };
  }
  /**
   * Reference an existing Postgres database with the given name. This is useful when you
   * create a Postgres database in one stage and want to share it in another. It avoids
   * having to create a new Postgres database in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share Postgres databases across stages.
   * :::
   *
   * @param name The name of the component.
   * @param args The arguments to get the Postgres database.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a database in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new database, you want to share the same database from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const database = $app.stage === "frank"
   *   ? sst.aws.Postgres.get("MyDatabase", {
   *       id: "app-dev-mydatabase",
   *       proxyId: "app-dev-mydatabase-proxy"
   *     })
   *   : new sst.aws.Postgres("MyDatabase", {
   *       proxy: true
   *     });
   * ```
   *
   * Here `app-dev-mydatabase` is the ID of the database, and `app-dev-mydatabase-proxy`
   * is the ID of the proxy created in the `dev` stage. You can find these by outputting
   * the database ID and proxy ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   id: database.id,
   *   proxyId: database.proxyId
   * };
   * ```
   */
  static get(name, args, opts) {
    return new _Postgres(
      name,
      {
        ref: true,
        id: args.id,
        proxyId: args.proxyId
      },
      opts
    );
  }
};
var __pulumiType65 = "sst:aws:Postgres";
Postgres2.__pulumiType = __pulumiType65;

// .sst/platform/src/components/aws/mysql.ts
import {
  all as all38,
  interpolate as interpolate33,
  jsonStringify as jsonStringify11,
  output as output72
} from "@pulumi/pulumi";
import { iam as iam19, rds as rds4, secretsmanager as secretsmanager5 } from "@pulumi/aws";
import { RandomPassword as RandomPassword5 } from "@pulumi/random";
var Mysql = class _Mysql extends Component {
  instance;
  _password;
  proxy;
  dev;
  constructor(name, args, opts) {
    super(__pulumiType66, name, args, opts);
    const _version = 1;
    const self = this;
    if (args && "ref" in args) {
      const ref = reference();
      this.instance = ref.instance;
      this._password = ref.password;
      this.proxy = output72(ref.proxy);
      return;
    }
    const multiAz = output72(args.multiAz).apply((v) => v ?? false);
    const engineVersion = output72(args.version).apply((v) => v ?? "8.0.40");
    const instanceType = output72(args.instance).apply((v) => v ?? "t4g.micro");
    const username = output72(args.username).apply((v) => v ?? "root");
    const storage = normalizeStorage2();
    const dbName = output72(args.database).apply(
      (v) => v ?? define_app_default.name.replaceAll("-", "_")
    );
    const vpc = normalizeVpc();
    const dev = registerDev();
    if (dev?.enabled) {
      this.dev = dev;
      return;
    }
    const password = createPassword();
    const secret5 = createSecret();
    const subnetGroup = createSubnetGroup();
    const parameterGroup = createParameterGroup();
    const instance = createInstance();
    createReplicas();
    const proxy = createProxy();
    this.instance = instance;
    this._password = password;
    this.proxy = proxy;
    function reference() {
      const ref = args;
      const instance2 = rds4.Instance.get(`${name}Instance`, ref.id, void 0, {
        parent: self
      });
      const input = instance2.tags.apply((tags) => {
        return {
          proxyId: output72(ref.proxyId),
          passwordTag: tags?.["sst:ref:password"]
        };
      });
      const proxy2 = input.proxyId.apply(
        (proxyId) => proxyId ? rds4.Proxy.get(`${name}Proxy`, proxyId, void 0, {
          parent: self
        }) : void 0
      );
      const password2 = input.passwordTag.apply((passwordTag) => {
        if (!passwordTag)
          throw new VisibleError(`Failed to get password for MySQL ${name}.`);
        const secret6 = secretsmanager5.getSecretVersionOutput(
          { secretId: passwordTag },
          { parent: self }
        );
        return jsonParse(secret6.secretString).apply(
          (v) => v.password
        );
      });
      return { instance: instance2, proxy: proxy2, password: password2 };
    }
    function normalizeStorage2() {
      return output72(args.storage ?? "20 GB").apply((v) => {
        const size = toGBs(v);
        if (size < 20) {
          throw new VisibleError(
            `Storage must be at least 20 GB for the ${name} MySQL database.`
          );
        }
        if (size > 65536) {
          throw new VisibleError(
            `Storage cannot be greater than 65536 GB (64 TB) for the ${name} MySQL database.`
          );
        }
        return size;
      });
    }
    function normalizeVpc() {
      if (args.vpc instanceof Vpc) {
        throw new VisibleError(
          `You are using the "Vpc.v1" component. Please migrate to the latest "Vpc" component.`
        );
      }
      if (args.vpc instanceof Vpc2) {
        return {
          subnets: args.vpc.privateSubnets
        };
      }
      return output72(args.vpc);
    }
    function registerDev() {
      if (!args.dev) return void 0;
      if (false) {
        throw new VisibleError(
          `You must provide the password to connect to your locally running MySQL database either by setting the "dev.password" or by setting the top-level "password" property.`
        );
      }
      const dev2 = {
        enabled: false,
        host: output72(args.dev.host ?? "localhost"),
        port: output72(args.dev.port ?? 3306),
        username: args.dev.username ? output72(args.dev.username) : username,
        password: output72(args.dev.password ?? args.password ?? ""),
        database: args.dev.database ? output72(args.dev.database) : dbName
      };
      new DevCommand(`${name}Dev`, {
        dev: {
          title: name,
          autostart: true,
          command: `sst print-and-not-quit`
        },
        environment: {
          SST_DEV_COMMAND_MESSAGE: interpolate33`Make sure your local MySQL server is using:

  username: "${dev2.username}"
  password: "${dev2.password}"
  database: "${dev2.database}"

Listening on "${dev2.host}:${dev2.port}"...`
        }
      });
      return dev2;
    }
    function createPassword() {
      return args.password ? output72(args.password) : new RandomPassword5(
        `${name}Password`,
        {
          length: 32,
          special: false
        },
        { parent: self }
      ).result;
    }
    function createSubnetGroup() {
      return new rds4.SubnetGroup(
        ...transform(
          args.transform?.subnetGroup,
          `${name}SubnetGroup`,
          {
            subnetIds: vpc.subnets
          },
          { parent: self }
        )
      );
    }
    function createParameterGroup() {
      return new rds4.ParameterGroup(
        ...transform(
          args.transform?.parameterGroup,
          `${name}ParameterGroup`,
          {
            family: engineVersion.apply((v) => {
              const [major, minor, _patch] = v.split(".");
              return `mysql${major}.${minor}`;
            }),
            parameters: [
              {
                name: "require_secure_transport",
                value: "OFF"
              }
            ]
          },
          { parent: self }
        )
      );
    }
    function createSecret() {
      const secret6 = new secretsmanager5.Secret(
        `${name}ProxySecret`,
        {
          recoveryWindowInDays: 0
        },
        { parent: self }
      );
      new secretsmanager5.SecretVersion(
        `${name}ProxySecretVersion`,
        {
          secretId: secret6.id,
          secretString: jsonStringify11({
            username,
            password
          })
        },
        { parent: self }
      );
      return secret6;
    }
    function createInstance() {
      return new rds4.Instance(
        ...transform(
          args.transform?.instance,
          `${name}Instance`,
          {
            dbName,
            dbSubnetGroupName: subnetGroup.name,
            engine: "mysql",
            engineVersion,
            instanceClass: interpolate33`db.${instanceType}`,
            username,
            password,
            parameterGroupName: parameterGroup.name,
            skipFinalSnapshot: true,
            storageEncrypted: true,
            storageType: "gp3",
            allocatedStorage: 20,
            maxAllocatedStorage: storage,
            multiAz,
            backupRetentionPeriod: 7,
            // performance insights is only supported on .micro and .small MySQL instances
            // https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.Overview.Engines.html
            performanceInsightsEnabled: instanceType.apply(
              (v) => !v.endsWith(".micro") && !v.endsWith(".small")
            ),
            tags: {
              "sst:component-version": _version.toString(),
              "sst:ref:password": secret5.id
            }
          },
          { parent: self, deleteBeforeReplace: true }
        )
      );
    }
    function createReplicas() {
      return output72(args.replicas ?? 0).apply(
        (replicas) => Array.from({ length: replicas }).map(
          (_, i) => new rds4.Instance(
            `${name}Replica${i}`,
            {
              replicateSourceDb: instance.identifier,
              dbName: interpolate33`${instance.dbName}_replica${i}`,
              dbSubnetGroupName: instance.dbSubnetGroupName,
              availabilityZone: instance.availabilityZone,
              engine: instance.engine,
              engineVersion: instance.engineVersion,
              instanceClass: instance.instanceClass,
              username: instance.username,
              password: instance.password.apply((v) => v),
              parameterGroupName: instance.parameterGroupName,
              skipFinalSnapshot: true,
              storageEncrypted: instance.storageEncrypted.apply((v) => v),
              storageType: instance.storageType,
              allocatedStorage: instance.allocatedStorage,
              maxAllocatedStorage: instance.maxAllocatedStorage.apply(
                (v) => v
              )
            },
            { parent: self }
          )
        )
      );
    }
    function createProxy() {
      return output72(args.proxy).apply((proxy2) => {
        if (!proxy2) return;
        const credentials = proxy2 === true ? [] : proxy2.credentials ?? [];
        const secrets = credentials.map((credential) => {
          const secret6 = new secretsmanager5.Secret(
            `${name}ProxySecret${credential.username}`,
            {
              recoveryWindowInDays: 0
            },
            { parent: self }
          );
          new secretsmanager5.SecretVersion(
            `${name}ProxySecretVersion${credential.username}`,
            {
              secretId: secret6.id,
              secretString: jsonStringify11({
                username: credential.username,
                password: credential.password
              })
            },
            { parent: self }
          );
          return secret6;
        });
        const role = new iam19.Role(
          `${name}ProxyRole`,
          {
            assumeRolePolicy: iam19.assumeRolePolicyForPrincipal({
              Service: "rds.amazonaws.com"
            }),
            inlinePolicies: [
              {
                name: "inline",
                policy: iam19.getPolicyDocumentOutput({
                  statements: [
                    {
                      actions: ["secretsmanager:GetSecretValue"],
                      resources: [secret5.arn, ...secrets.map((s) => s.arn)]
                    }
                  ]
                }).json
              }
            ]
          },
          { parent: self }
        );
        const lookup = new RdsRoleLookup(
          `${name}ProxyRoleLookup`,
          { name: "AWSServiceRoleForRDS" },
          { parent: self }
        );
        const rdsProxy = new rds4.Proxy(
          ...transform(
            args.transform?.proxy,
            `${name}Proxy`,
            {
              engineFamily: "MYSQL",
              auths: [
                {
                  authScheme: "SECRETS",
                  iamAuth: "DISABLED",
                  secretArn: secret5.arn
                },
                ...secrets.map((s) => ({
                  authScheme: "SECRETS",
                  iamAuth: "DISABLED",
                  secretArn: s.arn
                }))
              ],
              roleArn: role.arn,
              vpcSubnetIds: vpc.subnets
            },
            { parent: self, dependsOn: [lookup] }
          )
        );
        const targetGroup = new rds4.ProxyDefaultTargetGroup(
          `${name}ProxyTargetGroup`,
          {
            dbProxyName: rdsProxy.name
          },
          { parent: self }
        );
        new rds4.ProxyTarget(
          `${name}ProxyTarget`,
          {
            dbProxyName: rdsProxy.name,
            targetGroupName: targetGroup.name,
            dbInstanceIdentifier: instance.identifier
          },
          { parent: self }
        );
        return rdsProxy;
      });
    }
  }
  /**
   * The identifier of the MySQL instance.
   */
  get id() {
    if (this.dev?.enabled) return output72("placeholder");
    return this.instance.identifier;
  }
  /**
   * The name of the MySQL proxy.
   */
  get proxyId() {
    if (this.dev?.enabled) return output72("placeholder");
    return this.proxy.apply((v) => {
      if (!v) {
        throw new VisibleError(
          `Proxy is not enabled. Enable it with "proxy: true".`
        );
      }
      return v.id;
    });
  }
  /** The username of the master user. */
  get username() {
    if (this.dev?.enabled) return this.dev.username;
    return this.instance.username;
  }
  /** The password of the master user. */
  get password() {
    if (this.dev?.enabled) return this.dev.password;
    return this._password;
  }
  /**
   * The name of the database.
   */
  get database() {
    if (this.dev?.enabled) return this.dev.database;
    return this.instance.dbName;
  }
  /**
   * The port of the database.
   */
  get port() {
    if (this.dev?.enabled) return this.dev.port;
    return this.instance.port;
  }
  /**
   * The host of the database.
   */
  get host() {
    if (this.dev?.enabled) return this.dev.host;
    return all38([this.instance.endpoint, this.proxy]).apply(
      ([endpoint, proxy]) => proxy?.endpoint ?? output72(endpoint.split(":")[0])
    );
  }
  get nodes() {
    return {
      instance: this.instance
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        database: this.database,
        username: this.username,
        password: this.password,
        port: this.port,
        host: this.host
      }
    };
  }
  /**
   * Reference an existing MySQL database with the given name. This is useful when you
   * create a MySQL database in one stage and want to share it in another. It avoids
   * having to create a new MySQL database in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share MySQL databases across stages.
   * :::
   *
   * @param name The name of the component.
   * @param args The arguments to get the MySQL database.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a database in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new database, you want to share the same database from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const database = $app.stage === "frank"
   *   ? sst.aws.Mysql.get("MyDatabase", {
   *       id: "app-dev-mydatabase",
   *       proxyId: "app-dev-mydatabase-proxy"
   *     })
   *   : new sst.aws.Mysql("MyDatabase", {
   *       proxy: true
   *     });
   * ```
   *
   * Here `app-dev-mydatabase` is the ID of the database, and `app-dev-mydatabase-proxy`
   * is the ID of the proxy created in the `dev` stage. You can find these by outputting
   * the database ID and proxy ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   id: database.id,
   *   proxyId: database.proxyId
   * };
   * ```
   */
  static get(name, args, opts) {
    return new _Mysql(
      name,
      {
        ref: true,
        id: args.id,
        proxyId: args.proxyId
      },
      opts
    );
  }
};
var __pulumiType66 = "sst:aws:Mysql";
Mysql.__pulumiType = __pulumiType66;

// .sst/platform/src/components/aws/realtime.ts
import { all as all39 } from "@pulumi/pulumi";

// .sst/platform/src/components/aws/realtime-lambda-subscriber.ts
import {
  interpolate as interpolate34,
  output as output73
} from "@pulumi/pulumi";
import { lambda as lambda20 } from "@pulumi/aws";
import { iot } from "@pulumi/aws";
var RealtimeLambdaSubscriber = class extends Component {
  fn;
  permission;
  rule;
  constructor(name, args, opts) {
    super(__pulumiType67, name, args, opts);
    const self = this;
    const normalizedIot = output73(args.iot);
    const filter = output73(args.filter);
    const fn = createFunction();
    const rule = createRule2();
    const permission2 = createPermission();
    this.fn = fn;
    this.permission = permission2;
    this.rule = rule;
    function createFunction() {
      return functionBuilder(
        `${name}Handler`,
        args.subscriber,
        {
          description: interpolate34`Subscribed to ${normalizedIot.name} on ${filter}`
        },
        void 0,
        { parent: self }
      );
    }
    function createRule2() {
      return new iot.TopicRule(
        ...transform(
          args?.transform?.topicRule,
          `${name}Rule`,
          {
            sqlVersion: "2016-03-23",
            sql: interpolate34`SELECT * FROM '${filter}'`,
            enabled: true,
            lambdas: [{ functionArn: fn.arn }]
          },
          { parent: self }
        )
      );
    }
    function createPermission() {
      return new lambda20.Permission(
        `${name}Permission`,
        {
          action: "lambda:InvokeFunction",
          function: fn.arn.apply((arn) => parseFunctionArn(arn).functionName),
          principal: "iot.amazonaws.com",
          sourceArn: rule.arn
        },
        { parent: self }
      );
    }
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const self = this;
    return {
      /**
       * The Lambda function that'll be notified.
       */
      get function() {
        return self.fn.apply((fn) => fn.getFunction());
      },
      /**
       * The Lambda permission.
       */
      permission: this.permission,
      /**
       * The IoT Topic rule.
       */
      rule: this.rule
    };
  }
};
var __pulumiType67 = "sst:aws:RealtimeLambdaSubscriber";
RealtimeLambdaSubscriber.__pulumiType = __pulumiType67;

// .sst/platform/src/components/aws/realtime.ts
import { iot as iot2, lambda as lambda21 } from "@pulumi/aws";
var Realtime = class extends Component {
  constructorName;
  constructorOpts;
  authHadler;
  iotAuthorizer;
  iotEndpoint;
  constructor(name, args, opts = {}) {
    super(__pulumiType68, name, args, opts);
    const parent = this;
    const authHadler = createAuthorizerFunction();
    const iotAuthorizer = createAuthorizer();
    createPermission();
    this.constructorOpts = opts;
    this.iotEndpoint = iot2.getEndpointOutput(
      { endpointType: "iot:Data-ATS" },
      { parent }
    ).endpointAddress;
    this.constructorName = name;
    this.authHadler = authHadler;
    this.iotAuthorizer = iotAuthorizer;
    function createAuthorizerFunction() {
      return Function.fromDefinition(
        `${name}AuthorizerHandler`,
        args.authorizer,
        {
          description: `Authorizer for ${name}`,
          permissions: [
            {
              actions: ["iot:*"],
              resources: ["*"]
            }
          ]
        },
        void 0,
        { parent }
      );
    }
    function createAuthorizer() {
      return new iot2.Authorizer(
        ...transform(
          args.transform?.authorizer,
          `${name}Authorizer`,
          {
            signingDisabled: true,
            authorizerFunctionArn: authHadler.arn
          },
          { parent }
        )
      );
    }
    function createPermission() {
      return new lambda21.Permission(
        `${name}Permission`,
        {
          action: "lambda:InvokeFunction",
          function: authHadler.arn,
          principal: "iot.amazonaws.com",
          sourceArn: iotAuthorizer.arn
        },
        { parent }
      );
    }
  }
  /**
   * The IoT endpoint.
   */
  get endpoint() {
    return this.iotEndpoint;
  }
  /**
   * The name of the IoT authorizer.
   */
  get authorizer() {
    return this.iotAuthorizer.name;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The IoT authorizer resource.
       */
      authorizer: this.iotAuthorizer,
      /**
       * The IoT authorizer function resource.
       */
      authHandler: this.authHadler
    };
  }
  /**
   * Subscribe to this Realtime server.
   *
   * @param subscriber The function that'll be notified.
   * @param args Configure the subscription.
   *
   * @example
   *
   * ```js title="sst.config.ts"
   * server.subscribe("src/subscriber.handler", {
   *   filter: `${$app.name}/${$app.stage}/chat/room1`
   * });
   * ```
   *
   * Customize the subscriber function.
   *
   * ```js title="sst.config.ts"
   * server.subscribe(
   *   {
   *     handler: "src/subscriber.handler",
   *     timeout: "60 seconds"
   *   },
   *   {
   *     filter: `${$app.name}/${$app.stage}/chat/room1`
   *   }
   * );
   * ```
   *
   * Or pass in the ARN of an existing Lambda function.
   *
   * ```js title="sst.config.ts"
   * server.subscribe("arn:aws:lambda:us-east-1:123456789012:function:my-function", {
   *   filter: `${$app.name}/${$app.stage}/chat/room1`
   * });
   * ```
   */
  subscribe(subscriber, args) {
    return all39([subscriber, args.filter]).apply(([subscriber2, filter]) => {
      const suffix = logicalName(
        hashStringToPrettyString(
          [
            filter,
            typeof subscriber2 === "string" ? subscriber2 : subscriber2.handler
          ].join(""),
          6
        )
      );
      return new RealtimeLambdaSubscriber(
        `${this.constructorName}Subscriber${suffix}`,
        {
          iot: { name: this.constructorName },
          subscriber: subscriber2,
          ...args
        },
        { provider: this.constructorOpts.provider }
      );
    });
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        endpoint: this.endpoint,
        authorizer: this.authorizer
      },
      include: [
        permission({
          actions: ["iot:Publish"],
          resources: ["*"]
        })
      ]
    };
  }
};
var __pulumiType68 = "sst:aws:Realtime";
Realtime.__pulumiType = __pulumiType68;

// .sst/platform/src/components/aws/react.ts
import fs10 from "fs";
import path11 from "path";
import { output as output74 } from "@pulumi/pulumi";
var React = class extends SsrSite {
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType69, name, args, opts);
  }
  normalizeBuildCommand() {
  }
  buildPlan(outputPath) {
    return output74(outputPath).apply((outputPath2) => {
      const assetsPath = path11.join("build", "client");
      const serverPath = (() => {
        const p = path11.join("build", "server");
        return fs10.existsSync(path11.join(outputPath2, p)) ? p : void 0;
      })();
      const indexPage = "index.html";
      const viteBase = (() => {
        try {
          const viteConfig = path11.join(outputPath2, "vite.config.ts");
          const content = fs10.readFileSync(viteConfig, "utf-8");
          const match = content.match(/["']?base["']?:\s*["']([^"]+)["']/);
          return match ? match[1] : void 0;
        } catch (e) {
        }
      })();
      const reactRouterBase = (() => {
        try {
          const rrConfig = path11.join(outputPath2, "react-router.config.ts");
          const content = fs10.readFileSync(rrConfig, "utf-8");
          const match = content.match(/["']?basename["']?:\s*["']([^"]+)["']/);
          return match ? match[1] : void 0;
        } catch (e) {
        }
      })();
      if (viteBase) {
        if (!viteBase.endsWith("/"))
          throw new Error(
            `The "base" value in vite.config.ts must end with a trailing slash ("/"). This is required for correct asset path construction.`
          );
        if (!reactRouterBase)
          throw new Error(
            `Found "base" configured in vite.config.ts but missing "basename" in react-router.config.ts. Both configurations are required.`
          );
      }
      if (reactRouterBase) {
        if (reactRouterBase.endsWith("/"))
          throw new Error(
            `The "basename" value in react-router.config.ts must not end with a trailing slash ("/"). This ensures the root URL is accessible without a trailing slash.`
          );
        if (!viteBase)
          throw new Error(
            `Found "basename" configured in react-router.config.ts but missing "base" in vite.config.ts. Both configurations are required.`
          );
      }
      return {
        base: reactRouterBase,
        server: serverPath ? (() => {
          fs10.copyFileSync(
            path11.join(
              define_cli_default.paths.platform,
              "functions",
              "react-server",
              "server.mjs"
            ),
            path11.join(outputPath2, "build", "server.mjs")
          );
          return {
            handler: path11.join(outputPath2, "build", "server.handler"),
            streaming: true
          };
        })() : void 0,
        assets: [
          {
            from: assetsPath,
            to: "",
            cached: true,
            versionedSubDir: "assets"
          }
        ],
        custom404: serverPath ? void 0 : `/${indexPage}`
      };
    });
  }
  /**
   * The URL of the React app.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
};
var __pulumiType69 = "sst:aws:React";
React.__pulumiType = __pulumiType69;

// .sst/platform/src/components/aws/redis.ts
import {
  all as all41,
  interpolate as interpolate36,
  jsonStringify as jsonStringify13,
  output as output76
} from "@pulumi/pulumi";
import { RandomPassword as RandomPassword7 } from "@pulumi/random";
import { elasticache as elasticache2, secretsmanager as secretsmanager7 } from "@pulumi/aws";

// .sst/platform/src/components/aws/redis-v1.ts
import {
  all as all40,
  interpolate as interpolate35,
  jsonStringify as jsonStringify12,
  output as output75
} from "@pulumi/pulumi";
import { RandomPassword as RandomPassword6 } from "@pulumi/random";
import { elasticache, secretsmanager as secretsmanager6 } from "@pulumi/aws";
var Redis = class _Redis extends Component {
  cluster;
  _authToken;
  dev;
  constructor(name, args, opts) {
    super(__pulumiType70, name, args, opts);
    if (args && "ref" in args) {
      const ref = args;
      this.cluster = ref.cluster;
      this._authToken = ref.authToken;
      return;
    }
    const parent = this;
    const engine = output75(args.engine).apply((v) => v ?? "redis");
    const version = all40([engine, args.version]).apply(
      ([engine2, v]) => v ?? (engine2 === "redis" ? "7.1" : "7.2")
    );
    const instance = output75(args.instance).apply((v) => v ?? "t4g.micro");
    const nodes = output75(args.nodes).apply((v) => v ?? 1);
    const vpc = normalizeVpc();
    const dev = registerDev();
    if (dev?.enabled) {
      this.dev = dev;
      return;
    }
    const { authToken, secret: secret5 } = createAuthToken();
    const subnetGroup = createSubnetGroup();
    const cluster = createCluster();
    this.cluster = cluster;
    this._authToken = authToken;
    function registerDev() {
      if (!args.dev) return void 0;
      const dev2 = {
        enabled: false,
        host: output75(args.dev.host ?? "localhost"),
        port: output75(args.dev.port ?? 6379),
        username: output75(args.dev.username ?? "default"),
        password: args.dev.password ? output75(args.dev.password) : void 0
      };
      new DevCommand(`${name}Dev`, {
        dev: {
          title: name,
          autostart: true,
          command: `sst print-and-not-quit`
        },
        environment: {
          SST_DEV_COMMAND_MESSAGE: interpolate35`Make sure your local Redis server is using:

  username: "${dev2.username}"
  password: ${dev2.password ? `"${dev2.password}"` : "\x1B[38;5;8m[no password]\x1B[0m"}

Listening on "${dev2.host}:${dev2.port}"...`
        }
      });
      return dev2;
    }
    function normalizeVpc() {
      if (args.vpc instanceof Vpc2) {
        return output75({
          subnets: args.vpc.privateSubnets,
          securityGroups: args.vpc.securityGroups
        });
      }
      return output75(args.vpc);
    }
    function createAuthToken() {
      const authToken2 = new RandomPassword6(
        `${name}AuthToken`,
        {
          length: 32,
          special: true,
          overrideSpecial: "!&#$^<>-"
        },
        { parent }
      ).result;
      const secret6 = new secretsmanager6.Secret(
        `${name}ProxySecret`,
        {
          recoveryWindowInDays: 0
        },
        { parent }
      );
      new secretsmanager6.SecretVersion(
        `${name}ProxySecretVersion`,
        {
          secretId: secret6.id,
          secretString: jsonStringify12({ authToken: authToken2 })
        },
        { parent }
      );
      return { secret: secret6, authToken: authToken2 };
    }
    function createSubnetGroup() {
      return new elasticache.SubnetGroup(
        ...transform(
          args.transform?.subnetGroup,
          `${name}SubnetGroup`,
          {
            description: "Managed by SST",
            subnetIds: vpc.subnets
          },
          { parent }
        )
      );
    }
    function createCluster() {
      return new elasticache.ReplicationGroup(
        ...transform(
          args.transform?.cluster,
          `${name}Cluster`,
          {
            description: "Managed by SST",
            engine,
            engineVersion: version,
            nodeType: interpolate35`cache.${instance}`,
            dataTieringEnabled: instance.apply((v) => v.startsWith("r6gd.")),
            port: 6379,
            automaticFailoverEnabled: true,
            clusterMode: "enabled",
            numNodeGroups: nodes,
            replicasPerNodeGroup: 0,
            multiAzEnabled: false,
            atRestEncryptionEnabled: true,
            transitEncryptionEnabled: true,
            transitEncryptionMode: "required",
            authToken,
            subnetGroupName: subnetGroup.name,
            securityGroupIds: vpc.securityGroups,
            tags: {
              "sst:auth-token-ref": secret5.id
            }
          },
          { parent }
        )
      );
    }
  }
  /**
   * The ID of the Redis cluster.
   */
  get clusterID() {
    return this.dev ? output75("placeholder") : this.cluster.id;
  }
  /**
   * The username to connect to the Redis cluster.
   */
  get username() {
    return this.dev ? this.dev.username : output75("default");
  }
  /**
   * The password to connect to the Redis cluster.
   */
  get password() {
    return this.dev ? this.dev.password ?? output75("") : this._authToken;
  }
  /**
   * The host to connect to the Redis cluster.
   */
  get host() {
    return this.dev ? this.dev.host : this.cluster.configurationEndpointAddress;
  }
  /**
   * The port to connect to the Redis cluster.
   */
  get port() {
    return this.dev ? this.dev.port : this.cluster.port.apply((v) => v);
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const _this = this;
    return {
      /**
       * The ElastiCache Redis cluster.
       */
      get cluster() {
        if (_this.dev)
          throw new VisibleError("Cannot access `nodes.cluster` in dev mode.");
        return _this.cluster;
      }
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        host: this.host,
        port: this.port,
        username: this.username,
        password: this.password
      }
    };
  }
  /**
   * Reference an existing Redis cluster with the given cluster name. This is useful when you
   * create a Redis cluster in one stage and want to share it in another. It avoids having to
   * create a new Redis cluster in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share Redis clusters across stages.
   * :::
   *
   * @param name The name of the component.
   * @param clusterID The id of the existing Redis cluster.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a cluster in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new cluster, you want to share the same cluster from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const redis = $app.stage === "frank"
   *   ? sst.aws.Redis.v1.get("MyRedis", "app-dev-myredis")
   *   : new sst.aws.Redis.v1("MyRedis");
   * ```
   *
   * Here `app-dev-myredis` is the ID of the cluster created in the `dev` stage.
   * You can find this by outputting the cluster ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   cluster: redis.clusterID
   * };
   * ```
   */
  static get(name, clusterID, opts) {
    const cluster = elasticache.ReplicationGroup.get(
      `${name}Cluster`,
      clusterID,
      void 0,
      opts
    );
    const secret5 = cluster.tags.apply(
      (tags) => tags?.["sst:auth-token-ref"] ? secretsmanager6.getSecretVersionOutput(
        {
          secretId: tags["sst:auth-token-ref"]
        },
        opts
      ) : output75(void 0)
    );
    const authToken = secret5.apply((v) => {
      if (!v)
        throw new VisibleError(`Failed to get auth token for Redis ${name}.`);
      return JSON.parse(v.secretString).authToken;
    });
    return new _Redis(name, {
      ref: true,
      cluster,
      authToken
    });
  }
};
var __pulumiType70 = "sst:aws:Redis";
Redis.__pulumiType = __pulumiType70;

// .sst/platform/src/components/aws/redis.ts
var Redis2 = class _Redis extends Component {
  cluster;
  _authToken;
  dev;
  static v1 = Redis;
  constructor(name, args, opts) {
    super(__pulumiType71, name, args, opts);
    const _version = 2;
    const self = this;
    if (args && "ref" in args) {
      const ref = reference();
      this.cluster = output76(ref.cluster);
      this._authToken = ref.authToken;
      return;
    }
    registerVersion();
    const engine = output76(args.engine).apply((v) => v ?? "redis");
    const version = all41([engine, args.version]).apply(
      ([engine2, v]) => v ?? (engine2 === "redis" ? "7.1" : "7.2")
    );
    const instance = output76(args.instance).apply((v) => v ?? "t4g.micro");
    const argsCluster = normalizeCluster();
    const vpc = normalizeVpc();
    const dev = registerDev();
    if (dev?.enabled) {
      this.dev = dev;
      return;
    }
    const { authToken, secret: secret5 } = createAuthToken();
    const subnetGroup = createSubnetGroup();
    const parameterGroup = createParameterGroup();
    const cluster = createCluster();
    this.cluster = cluster;
    this._authToken = authToken;
    function reference() {
      const ref = args;
      const cluster2 = elasticache2.ReplicationGroup.get(
        `${name}Cluster`,
        ref.clusterId,
        void 0,
        { parent: self }
      );
      const input = cluster2.tags.apply((tags) => {
        registerVersion(
          tags?.["sst:component-version"] ? parseInt(tags["sst:component-version"]) : void 0
        );
        if (!tags?.["sst:ref:secret"])
          throw new VisibleError(
            `Failed to lookup secret for Redis cluster "${name}".`
          );
        return {
          secretRef: tags?.["sst:ref:secret"]
        };
      });
      const secret6 = secretsmanager7.getSecretVersionOutput(
        { secretId: input.secretRef },
        { parent: self }
      );
      const authToken2 = secret6.secretString.apply((v) => {
        return JSON.parse(v).authToken;
      });
      return { cluster: cluster2, authToken: authToken2 };
    }
    function registerVersion(overrideVersion) {
      const oldVersion = overrideVersion ?? define_cli_default.state.version[name];
      self.registerVersion({
        new: _version,
        old: oldVersion,
        message: [
          `There is a new version of "Redis" that has breaking changes.`,
          ``,
          `To continue using the previous version, rename "Redis" to "Redis.v${oldVersion}".`,
          `Or recreate this component to update - https://sst.dev/docs/components/#versioning`
        ].join("\n")
      });
    }
    function registerDev() {
      if (!args.dev) return void 0;
      const dev2 = {
        enabled: false,
        host: output76(args.dev.host ?? "localhost"),
        port: output76(args.dev.port ?? 6379),
        username: output76(args.dev.username ?? "default"),
        password: args.dev.password ? output76(args.dev.password) : void 0
      };
      new DevCommand(`${name}Dev`, {
        dev: {
          title: name,
          autostart: true,
          command: `sst print-and-not-quit`
        },
        environment: {
          SST_DEV_COMMAND_MESSAGE: interpolate36`Make sure your local Redis server is using:

  username: "${dev2.username}"
  password: ${dev2.password ? `"${dev2.password}"` : "\x1B[38;5;8m[no password]\x1B[0m"}

Listening on "${dev2.host}:${dev2.port}"...`
        }
      });
      return dev2;
    }
    function normalizeVpc() {
      if (args.vpc instanceof Vpc2) {
        return output76({
          subnets: args.vpc.privateSubnets,
          securityGroups: args.vpc.securityGroups
        });
      }
      return output76(args.vpc);
    }
    function normalizeCluster() {
      return all41([args.cluster, args.nodes]).apply(([v, nodes]) => {
        if (v === false) return void 0;
        if (v === true) return { nodes: 1 };
        if (v === void 0) {
          if (nodes) return { nodes };
          return { nodes: 1 };
        }
        return v;
      });
    }
    function createAuthToken() {
      const authToken2 = new RandomPassword7(
        `${name}AuthToken`,
        {
          length: 32,
          special: true,
          overrideSpecial: "!&#$^<>-"
        },
        { parent: self }
      ).result;
      const secret6 = new secretsmanager7.Secret(
        `${name}ProxySecret`,
        {
          recoveryWindowInDays: 0
        },
        { parent: self }
      );
      new secretsmanager7.SecretVersion(
        `${name}ProxySecretVersion`,
        {
          secretId: secret6.id,
          secretString: jsonStringify13({ authToken: authToken2 })
        },
        { parent: self }
      );
      return { secret: secret6, authToken: authToken2 };
    }
    function createSubnetGroup() {
      return new elasticache2.SubnetGroup(
        ...transform(
          args.transform?.subnetGroup,
          `${name}SubnetGroup`,
          {
            description: "Managed by SST",
            subnetIds: vpc.subnets
          },
          { parent: self }
        )
      );
    }
    function createParameterGroup() {
      return new elasticache2.ParameterGroup(
        ...transform(
          args.transform?.parameterGroup,
          `${name}ParameterGroup`,
          {
            description: "Managed by SST",
            family: all41([engine, version]).apply(([engine2, version2]) => {
              const majorVersion = version2.split(".")[0];
              const defaultFamily = `${engine2}${majorVersion}`;
              return {
                redis4: "redis4.0",
                redis5: "redis5.0",
                redis6: "redis6.x"
              }[defaultFamily] ?? defaultFamily;
            }),
            parameters: all41([args.parameters ?? {}, argsCluster]).apply(
              ([parameters, argsCluster2]) => [
                {
                  name: "cluster-enabled",
                  value: argsCluster2 ? "yes" : "no"
                },
                ...Object.entries(parameters).map(([name2, value]) => ({
                  name: name2,
                  value
                }))
              ]
            )
          },
          { parent: self }
        )
      );
    }
    function createCluster() {
      return argsCluster.apply(
        (argsCluster2) => new elasticache2.ReplicationGroup(
          ...transform(
            args.transform?.cluster,
            `${name}Cluster`,
            {
              description: "Managed by SST",
              engine,
              engineVersion: version,
              nodeType: interpolate36`cache.${instance}`,
              dataTieringEnabled: instance.apply(
                (v) => v.startsWith("r6gd.")
              ),
              port: 6379,
              ...argsCluster2 ? {
                clusterMode: "enabled",
                numNodeGroups: argsCluster2.nodes,
                replicasPerNodeGroup: 0,
                automaticFailoverEnabled: true
              } : {
                clusterMode: "disabled"
              },
              multiAzEnabled: false,
              atRestEncryptionEnabled: true,
              transitEncryptionEnabled: true,
              transitEncryptionMode: "required",
              authToken,
              subnetGroupName: subnetGroup.name,
              parameterGroupName: parameterGroup.name,
              securityGroupIds: vpc.securityGroups,
              tags: {
                "sst:component-version": _version.toString(),
                "sst:ref:secret": secret5.id
              }
            },
            { parent: self }
          )
        )
      );
    }
  }
  /**
   * The ID of the Redis cluster.
   */
  get clusterId() {
    return this.dev ? output76("placeholder") : this.cluster.id;
  }
  /**
   * The username to connect to the Redis cluster.
   */
  get username() {
    return this.dev ? this.dev.username : output76("default");
  }
  /**
   * The password to connect to the Redis cluster.
   */
  get password() {
    return this.dev ? this.dev.password ?? output76("") : this._authToken;
  }
  /**
   * The host to connect to the Redis cluster.
   */
  get host() {
    return this.dev ? this.dev.host : this.cluster.clusterEnabled.apply(
      (enabled) => enabled ? this.cluster.configurationEndpointAddress : this.cluster.primaryEndpointAddress
    );
  }
  /**
   * The port to connect to the Redis cluster.
   */
  get port() {
    return this.dev ? this.dev.port : this.cluster.port.apply((v) => v);
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    const _this = this;
    return {
      /**
       * The ElastiCache Redis cluster.
       */
      get cluster() {
        if (_this.dev)
          throw new VisibleError("Cannot access `nodes.cluster` in dev mode.");
        return _this.cluster;
      }
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        host: this.host,
        port: this.port,
        username: this.username,
        password: this.password
      }
    };
  }
  /**
   * Reference an existing Redis cluster with the given cluster name. This is useful when you
   * create a Redis cluster in one stage and want to share it in another. It avoids having to
   * create a new Redis cluster in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share Redis clusters across stages.
   * :::
   *
   * @param name The name of the component.
   * @param clusterId The id of the existing Redis cluster.
   * @param opts? Resource options.
   *
   * @example
   * Imagine you create a cluster in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new cluster, you want to share the same cluster from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const redis = $app.stage === "frank"
   *   ? sst.aws.Redis.get("MyRedis", "app-dev-myredis")
   *   : new sst.aws.Redis("MyRedis");
   * ```
   *
   * Here `app-dev-myredis` is the ID of the cluster created in the `dev` stage.
   * You can find this by outputting the cluster ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   cluster: redis.clusterId
   * };
   * ```
   */
  static get(name, clusterId, opts) {
    return new _Redis(
      name,
      {
        ref: true,
        clusterId
      },
      opts
    );
  }
};
var __pulumiType71 = "sst:aws:Redis";
Redis2.__pulumiType = __pulumiType71;

// .sst/platform/src/components/aws/remix.ts
import fs11 from "fs";
import path12 from "path";
import { all as all42 } from "@pulumi/pulumi";
var Remix = class extends SsrSite {
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType72, name, args, opts);
  }
  normalizeBuildCommand() {
  }
  buildPlan(outputPath, _name, args) {
    return all42([outputPath, args.buildDirectory]).apply(
      async ([outputPath2, buildDirectory]) => {
        let assetsPath = "public";
        let assetsVersionedSubDir = "build";
        let buildPath = path12.join(outputPath2, "build");
        const viteConfig = await loadViteConfig();
        if (viteConfig) {
          assetsPath = path12.join(
            viteConfig.__remixPluginContext.remixConfig.buildDirectory,
            "client"
          );
          assetsVersionedSubDir = "assets";
          buildPath = path12.join(
            outputPath2,
            viteConfig.__remixPluginContext.remixConfig.buildDirectory
          );
        }
        const basepath = fs11.readFileSync(path12.join(outputPath2, "vite.config.ts"), "utf-8").match(/base: ['"](.*)['"]/)?.[1];
        return {
          base: basepath,
          server: createServerLambdaBundle(),
          assets: [
            {
              from: assetsPath,
              to: "",
              cached: true,
              versionedSubDir: assetsVersionedSubDir
            }
          ]
        };
        async function loadViteConfig() {
          const file = [
            "vite.config.ts",
            "vite.config.js",
            "vite.config.mts",
            "vite.config.mjs"
          ].find((filename) => fs11.existsSync(path12.join(outputPath2, filename)));
          if (!file) return;
          try {
            const vite = await import("vite");
            const config = await vite.loadConfigFromFile(
              { command: "build", mode: "production" },
              path12.join(outputPath2, file)
            );
            if (!config) throw new Error();
            return {
              __remixPluginContext: {
                remixConfig: {
                  buildDirectory: buildDirectory ?? "build"
                }
              }
            };
          } catch (e) {
            throw new VisibleError(
              `Could not load Vite configuration from "${file}". Check that your Remix project uses Vite and the file exists.`
            );
          }
        }
        function createServerLambdaBundle() {
          fs11.mkdirSync(buildPath, { recursive: true });
          const content = [
            // When using Vite config, the output build will be "server/index.js"
            // and when using Remix config it will be `server.js`.
            `// Import the server build that was produced by 'remix build'`,
            viteConfig ? `import * as remixServerBuild from "./server/index.js";` : `import * as remixServerBuild from "./index.js";`,
            ``,
            fs11.readFileSync(
              path12.join(
                define_cli_default.paths.platform,
                "functions",
                "remix-server",
                "regional-server.mjs"
              )
            )
          ].join("\n");
          fs11.writeFileSync(path12.join(buildPath, "server.mjs"), content);
          const polyfillDest = path12.join(buildPath, "polyfill.mjs");
          fs11.copyFileSync(
            path12.join(
              define_cli_default.paths.platform,
              "functions",
              "remix-server",
              "polyfill.mjs"
            ),
            polyfillDest
          );
          return {
            handler: path12.join(buildPath, "server.handler"),
            nodejs: {
              esbuild: {
                inject: [path12.resolve(polyfillDest)]
              }
            },
            streaming: true
          };
        }
      }
    );
  }
  /**
   * The URL of the Remix app.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
};
var __pulumiType72 = "sst:aws:Remix";
Remix.__pulumiType = __pulumiType72;

// .sst/platform/src/components/aws/solid-start.ts
import fs12 from "fs";
import path13 from "path";
var SolidStart = class extends SsrSite {
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType73, name, args, opts);
  }
  normalizeBuildCommand() {
  }
  buildPlan(outputPath) {
    return outputPath.apply((outputPath2) => {
      const nitro = JSON.parse(
        fs12.readFileSync(
          path13.join(outputPath2, ".output", "nitro.json"),
          "utf-8"
        )
      );
      if (!["aws-lambda"].includes(nitro.preset)) {
        throw new VisibleError(
          `SolidStart's app.config.ts must be configured to use the "aws-lambda" preset. It is currently set to "${nitro.preset}".`
        );
      }
      const appConfig = fs12.readFileSync(
        path13.join(outputPath2, "app.config.ts"),
        "utf-8"
      );
      const basepath = appConfig.match(/baseURL: ['"](.*)['"]/)?.[1];
      fs12.rmSync(path13.join(outputPath2, ".output", "public", "_server"), {
        recursive: true,
        force: true
      });
      return {
        base: basepath,
        server: {
          description: "Server handler for Solid",
          handler: "index.handler",
          bundle: path13.join(outputPath2, ".output", "server"),
          streaming: nitro?.config?.awsLambda?.streaming === true
        },
        assets: [
          {
            from: path13.join(".output", "public"),
            to: "",
            cached: true
          }
        ]
      };
    });
  }
  /**
   * The URL of the SolidStart app.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
};
var __pulumiType73 = "sst:aws:SolidStart";
SolidStart.__pulumiType = __pulumiType73;

// .sst/platform/src/components/aws/step-functions.ts
import {
  all as all44,
  interpolate as interpolate37,
  output as output80
} from "@pulumi/pulumi";
import { cloudwatch as cloudwatch13, iam as iam20, sfn } from "@pulumi/aws";

// .sst/platform/src/components/aws/step-functions/state.ts
import { randomBytes } from "crypto";
function isJSONata(value) {
  return value.startsWith("{%") && value.endsWith("%}");
}
var State = class {
  constructor(args) {
    this.args = args;
  }
  _parentGraphState;
  // only used for Parallel, Map
  _childGraphStates = [];
  // only used for Parallel, Map
  _prevState;
  _nextState;
  _retries;
  _catches;
  addChildGraph(state) {
    if (state._parentGraphState)
      throw new Error(
        `Cannot reuse the "${state.name}" state. States cannot be reused in Map or Parallel branches.`
      );
    this._childGraphStates.push(state);
    state._parentGraphState = this;
    return state;
  }
  addNext(state) {
    if (this._nextState)
      throw new Error(
        `The "${this.name}" state already has a next state. States cannot have multiple next states.`
      );
    this._nextState = state;
    state._prevState = this;
    return state;
  }
  addRetry(args) {
    this._retries = this._retries || [];
    this._retries.push({
      errors: ["States.ALL"],
      backoffRate: 2,
      interval: "1 second",
      maxAttempts: 3,
      ...args
    });
    return this;
  }
  addCatch(state, args = {}) {
    this._catches = this._catches || [];
    this._catches.push({
      next: state.getHead(),
      props: {
        errors: args.errors ?? ["States.ALL"]
      }
    });
    return this;
  }
  /**
   * @internal
   */
  get name() {
    return this.args.name;
  }
  /**
   * @internal
   */
  getRoot() {
    return this._prevState?.getRoot() ?? this._parentGraphState?.getRoot() ?? this;
  }
  /**
   * @internal
   */
  getHead() {
    return this._prevState?.getHead() ?? this;
  }
  /**
   * Assert that the state name is unique.
   * @internal
   */
  assertStateNameUnique(states = /* @__PURE__ */ new Map()) {
    const existing = states.get(this.name);
    if (existing && existing !== this)
      throw new Error(
        `Multiple states with the same name "${this.name}". State names must be unique.`
      );
    states.set(this.name, this);
    this._nextState?.assertStateNameUnique(states);
    this._catches?.forEach((c) => c.next.assertStateNameUnique(states));
    this._childGraphStates.forEach((c) => c.assertStateNameUnique(states));
  }
  /**
   * Assert that the state is not reused.
   * @internal
   */
  assertStateNotReused(states = /* @__PURE__ */ new Map(), graphId = "main") {
    const existing = states.get(this);
    if (existing && existing !== graphId)
      throw new Error(
        `Cannot reuse the "${this.name}" state. States cannot be reused in Map or Parallel branches.`
      );
    states.set(this, graphId);
    this._nextState?.assertStateNotReused(states, graphId);
    this._catches?.forEach((c) => c.next.assertStateNotReused(states, graphId));
    this._childGraphStates.forEach((c) => {
      const childGraphId = randomBytes(16).toString("hex");
      c.assertStateNotReused(states, childGraphId);
    });
  }
  /**
   * Get the permissions required for the state.
   * @internal
   */
  getPermissions() {
    return [
      ...this._nextState?.getPermissions() || [],
      ...(this._catches || []).flatMap((c) => c.next.getPermissions())
    ];
  }
  /**
   * Serialize the state into JSON state definition.
   * @internal
   */
  serialize() {
    return {
      [this.name]: this.toJSON(),
      ...this._nextState?.serialize(),
      ...this._catches?.reduce(
        (acc, c) => ({ ...acc, ...c.next.serialize() }),
        {}
      )
    };
  }
  toJSON() {
    return {
      QueryLanguage: "JSONata",
      Comment: this.args.comment,
      Output: this.args.output,
      Assign: this.args.assign,
      ...this._nextState ? { Next: this._nextState.name } : { End: true },
      Retry: this._retries?.map((r) => ({
        ErrorEquals: r.errors,
        IntervalSeconds: toSeconds(r.interval),
        MaxAttempts: r.maxAttempts,
        BackoffRate: r.backoffRate
      })),
      Catch: this._catches?.map((c) => ({
        ErrorEquals: c.props.errors,
        Next: c.next.name
      }))
    };
  }
};

// .sst/platform/src/components/aws/step-functions/choice.ts
var Choice = class extends State {
  constructor(args) {
    super(args);
    this.args = args;
  }
  choices = [];
  defaultNext;
  /**
   * Add a matching condition to the `Choice` state. If the given condition matches,
   * it'll continue execution to the given state.
   *
   * The condition needs to be a JSONata expression that evaluates to a boolean.
   *
   * @example
   *
   * ```ts
   * sst.aws.StepFunctions.choice({
   *   // ...
   * })
   * .when(
   *   "{% $states.input.status === 'unpaid' %}",
   *   state
   * );
   * ```
   *
   * @param condition The JSONata condition to evaluate.
   * @param next The state to transition to.
   */
  when(condition, next) {
    if (!isJSONata(condition))
      throw new Error("Condition must start with '{%' and end with '%}'.");
    this.choices.push({ condition, next });
    return this;
  }
  /**
   * Add a default next state to the `Choice` state. If no other condition matches,
   * continue execution with the given state.
   */
  otherwise(next) {
    this.defaultNext = next;
    return this;
  }
  /**
   * @internal
   */
  assertStateNameUnique(states = /* @__PURE__ */ new Map()) {
    super.assertStateNameUnique(states);
    this.choices.forEach((c) => c.next.assertStateNameUnique(states));
    this.defaultNext?.assertStateNameUnique(states);
  }
  /**
   * @internal
   */
  assertStateNotReused(states = /* @__PURE__ */ new Map(), graphId = "main") {
    super.assertStateNotReused(states, graphId);
    this.choices.forEach((c) => c.next.assertStateNotReused(states, graphId));
    this.defaultNext?.assertStateNotReused(states, graphId);
  }
  /**
   * @internal
   */
  getPermissions() {
    return [
      ...this.choices.flatMap((c) => c.next.getPermissions()),
      ...this.defaultNext?.getPermissions() || [],
      ...super.getPermissions()
    ];
  }
  /**
   * @internal
   */
  serialize() {
    return {
      ...super.serialize(),
      ...this.defaultNext?.serialize(),
      ...this.choices.reduce(
        (acc, c) => ({ ...acc, ...c.next.serialize() }),
        {}
      )
    };
  }
  toJSON() {
    return {
      Type: "Choice",
      Choices: this.choices.map((c) => ({
        Condition: c.condition,
        Next: c.next.name
      })),
      Default: this.defaultNext?.name,
      ...super.toJSON(),
      End: void 0
    };
  }
};

// .sst/platform/src/components/aws/step-functions/fail.ts
var Fail = class extends State {
  constructor(args) {
    super(args);
    this.args = args;
  }
  /**
   * Serialize the state into JSON state definition.
   */
  toJSON() {
    return {
      Type: "Fail",
      Error: this.args.error,
      Cause: this.args.cause,
      ...super.toJSON(),
      End: void 0
    };
  }
};

// .sst/platform/src/components/aws/step-functions/map.ts
import { output as output77 } from "@pulumi/pulumi";
var Map2 = class extends State {
  constructor(args) {
    super(args);
    this.args = args;
    this.processor = args.processor.getHead();
    this.addChildGraph(this.processor);
    this.mode = output77(args.mode ?? "inline");
  }
  processor;
  mode;
  /**
   * Add a next state to the `Map` state. If the state completes successfully,
   * continue execution to the given `state`.
   *
   * @param state The state to transition to.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.map({
   *   // ...
   * })
   * .next(state);
   * ```
   */
  next(state) {
    return this.addNext(state);
  }
  /**
   * Add a retry behavior to the `Map` state. If the state fails with any of the
   * specified errors, retry the execution.
   *
   * @param args Properties to define the retry behavior.
   *
   * @example
   *
   * This defaults to.
   *
   * ```ts title="sst.config.ts" {5-8}
   * sst.aws.StepFunctions.map({
   *   // ...
   * })
   * .retry({
   *   errors: ["States.ALL"],
   *   interval: "1 second",
   *   maxAttempts: 3,
   *   backoffRate: 2
   * });
   * ```
   */
  retry(args) {
    return this.addRetry(args);
  }
  /**
   * Add a catch behavior to the `Map` state. So if the state fails with any of the
   * specified errors, it'll continue execution to the given `state`.
   *
   * @param state The state to transition to on error.
   * @param args Properties to customize error handling.
   *
   * @example
   *
   * This defaults to.
   *
   * ```ts title="sst.config.ts" {5}
   * sst.aws.StepFunctions.map({
   *   // ...
   * })
   * .catch({
   *   errors: ["States.ALL"]
   * });
   * ```
   */
  catch(state, args = {}) {
    return this.addCatch(state, args);
  }
  /**
   * @internal
   */
  getPermissions() {
    return [...this.processor.getPermissions(), ...super.getPermissions()];
  }
  /**
   * Serialize the state into JSON state definition.
   */
  toJSON() {
    return {
      Type: "Map",
      Items: this.args.items,
      ItemSelector: this.args.itemSelector,
      ItemProcessor: {
        ProcessorConfig: this.mode.apply(
          (mode) => mode === "inline" ? { Mode: "INLINE" } : { Mode: "DISTRIBUTED", ExecutionType: mode.toUpperCase() }
        ),
        StartAt: this.processor.name,
        States: this.processor.serialize()
      },
      MaxConcurrency: this.args.maxConcurrency,
      ...super.toJSON()
    };
  }
};

// .sst/platform/src/components/aws/step-functions/parallel.ts
var Parallel = class extends State {
  constructor(args) {
    super(args);
    this.args = args;
  }
  branches = [];
  /**
   * Add a branch state to the `Parallel` state. Each branch runs concurrently.
   *
   * @param branch The state to add as a branch.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * const parallel = sst.aws.StepFunctions.parallel({ name: "Parallel" });
   * 
   * parallel.branch(processorA);
   * parallel.branch(processorB);
   * ```
   */
  branch(branch) {
    const head = branch.getHead();
    this.branches.push(head);
    this.addChildGraph(head);
    return this;
  }
  /**
   * Add a next state to the `Parallel` state. If all branches complete successfully,
   * this'll continue execution to the given `state`.
   *
   * @param state The state to transition to.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.parallel({
   *   // ...
   * })
   * .next(state);
   * ```
   */
  next(state) {
    return this.addNext(state);
  }
  /**
   * Add a retry behavior to the `Parallel` state. If the state fails with any of the
   * specified errors, retry execution using the specified parameters.
   *
   * @param args Properties to define the retry behavior.
   *
   * @example
   *
   * This defaults to.
   *
   * ```ts title="sst.config.ts" {5-8}
   * sst.aws.StepFunctions.parallel({
   *   // ...
   * })
   * .retry({
   *   errors: ["States.ALL"],
   *   interval: "1 second",
   *   maxAttempts: 3,
   *   backoffRate: 2
   * });
   * ```
   */
  retry(args) {
    return this.addRetry(args);
  }
  /**
   * Add a catch behavior to the `Parallel` state. So if the state fails with any
   * of the specified errors, it'll continue execution to the given `state`.
   *
   * @param state The state to transition to on error.
   * @param args Properties to customize error handling.
   *
   * @example
   *
   * This defaults to.
   *
   * ```ts title="sst.config.ts" {5}
   * sst.aws.StepFunctions.parallel({
   *   // ...
   * })
   * .catch({
   *   errors: ["States.ALL"]
   * });
   * ```
   */
  catch(state, args = {}) {
    return this.addCatch(state, args);
  }
  /**
   * @internal
   */
  getPermissions() {
    return [
      ...this.branches.flatMap((b) => b.getPermissions()),
      ...super.getPermissions()
    ];
  }
  /**
   * Serialize the state into JSON state definition.
   */
  toJSON() {
    if (this.branches.length === 0) {
      throw new Error(
        `The "${this.name}" Parallel state must have at least one branch.`
      );
    }
    return {
      Type: "Parallel",
      Branches: this.branches.map((b) => {
        return {
          StartAt: b.name,
          States: b.serialize()
        };
      }),
      ...super.toJSON()
    };
  }
};

// .sst/platform/src/components/aws/step-functions/pass.ts
var Pass = class extends State {
  constructor(args) {
    super(args);
    this.args = args;
  }
  /**
   * Add a next state to the `Pass` state. After this state completes, it'll
   * transition to the given `state`.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.pass({
   *   // ...
   * })
   * .next(state);
   * ```
   */
  next(state) {
    return this.addNext(state);
  }
  /**
   * Serialize the state into JSON state definition.
   */
  toJSON() {
    return {
      Type: "Pass",
      ...super.toJSON()
    };
  }
};

// .sst/platform/src/components/aws/step-functions/succeed.ts
var Succeed = class extends State {
  constructor(args) {
    super(args);
    this.args = args;
  }
  /**
   * Serialize the state into JSON state definition.
   */
  toJSON() {
    return {
      Type: "Succeed",
      ...super.toJSON(),
      End: void 0
    };
  }
};

// .sst/platform/src/components/aws/step-functions/task.ts
import { all as all43, output as output78 } from "@pulumi/pulumi";
var Task2 = class extends State {
  constructor(args) {
    super(args);
    this.args = args;
    const integration = output78(this.args.integration ?? "response");
    this.resource = all43([this.args.resource, integration]).apply(
      ([resource, integration2]) => {
        if (integration2 === "sync" && !resource.endsWith(".sync"))
          return `${resource}.sync`;
        if (integration2 === "token" && !resource.endsWith(".waitForTaskToken"))
          return `${resource}.waitForTaskToken`;
        return resource;
      }
    );
  }
  resource;
  /**
   * Add a next state to the `Task` state. If the state completes successfully,
   * continue execution to the given `state`.
   *
   * @param state The state to transition to.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.task({
   *   // ...
   * })
   * .next(state);
   * ```
   */
  next(state) {
    return this.addNext(state);
  }
  /**
   * Add a retry behavior to the `Task` state. If the state fails with any of the
   * specified errors, retry the execution.
   *
   * @param args Properties to define the retry behavior.
   *
   * @example
   *
   * This defaults to.
   *
   * ```ts title="sst.config.ts" {5-8}
   * sst.aws.StepFunctions.task({
   *   // ...
   * })
   * .retry({
   *   errors: ["States.ALL"],
   *   interval: "1 second",
   *   maxAttempts: 3,
   *   backoffRate: 2
   * });
   * ```
   */
  retry(args) {
    return this.addRetry(args);
  }
  /**
   * Add a catch behavior to the `Task` state. So if the state fails with any of the
   * specified errors, it'll continue execution to the given `state`.
   *
   * @param state The state to transition to on error.
   * @param args Properties to customize error handling.
   *
   * @example
   *
   * This defaults to.
   *
   * ```ts title="sst.config.ts" {5}
   * sst.aws.StepFunctions.task({
   *   // ...
   * })
   * .catch({
   *   errors: ["States.ALL"]
   * });
   * ```
   */
  catch(state, args = {}) {
    return this.addCatch(state, args);
  }
  /**
   * @internal
   */
  getPermissions() {
    return [...this.args.permissions || [], ...super.getPermissions()];
  }
  /**
   * Serialize the state into JSON state definition.
   */
  toJSON() {
    return {
      Type: "Task",
      ...super.toJSON(),
      Resource: this.resource,
      Credentials: this.args.role && {
        RoleArn: this.args.role
      },
      Timeout: this.args.timeout ? output78(this.args.timeout).apply(
        (t) => isJSONata(t) ? t : toSeconds(t)
      ) : void 0,
      Arguments: this.args.arguments
    };
  }
};

// .sst/platform/src/components/aws/step-functions/wait.ts
import { output as output79 } from "@pulumi/pulumi";
var Wait = class extends State {
  constructor(args) {
    super(args);
    this.args = args;
  }
  /**
   * Add a next state to the `Wait` state. After the wait completes, it'll transition
   * to the given `state`.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.wait({
   *   name: "Wait",
   *   time: "10 seconds"
   * })
   * .next(state);
   * ```
   */
  next(state) {
    return this.addNext(state);
  }
  /**
   * Serialize the state into JSON state definition.
   */
  toJSON() {
    return {
      Type: "Wait",
      Seconds: this.args.time ? output79(this.args.time).apply(
        (t) => isJSONata(t) ? t : toSeconds(t)
      ) : void 0,
      Timestamp: this.args.timestamp,
      ...super.toJSON()
    };
  }
};

// .sst/platform/src/components/aws/step-functions.ts
var StepFunctions = class extends Component {
  stateMachine;
  constructor(name, args, opts) {
    super(__pulumiType74, name, args, opts);
    const parent = this;
    const type = output80(args.type ?? "standard");
    const logging = normalizeLogging();
    const logGroup = createLogGroup();
    const role = createRole();
    const stateMachine = createStateMachine();
    this.stateMachine = stateMachine;
    function normalizeLogging() {
      return output80(args.logging).apply((logging2) => {
        if (logging2 === false) return void 0;
        return {
          retention: logging2?.retention ?? "1 month",
          level: logging2?.level ?? "error",
          includeData: logging2?.includeData ?? false
        };
      });
    }
    function createLogGroup() {
      return logging.apply((logging2) => {
        if (!logging2) return;
        return new cloudwatch13.LogGroup(
          ...transform(
            args.transform?.logGroup,
            `${name}LogGroup`,
            {
              name: interpolate37`/aws/states/${physicalName(
                64,
                `${name}StateMachine`
              )}`,
              retentionInDays: RETENTION[logging2.retention]
            },
            { parent, ignoreChanges: ["name"] }
          )
        );
      });
    }
    function createRole() {
      return new iam20.Role(
        `${name}Role`,
        {
          assumeRolePolicy: iam20.assumeRolePolicyForPrincipal({
            Service: "states.amazonaws.com"
          }),
          inlinePolicies: [
            {
              name: "inline",
              policy: iam20.getPolicyDocumentOutput({
                statements: [
                  {
                    actions: ["events:*"],
                    resources: ["*"]
                  },
                  {
                    actions: [
                      "logs:CreateLogDelivery",
                      "logs:CreateLogStream",
                      "logs:GetLogDelivery",
                      "logs:UpdateLogDelivery",
                      "logs:DeleteLogDelivery",
                      "logs:ListLogDeliveries",
                      "logs:PutLogEvents",
                      "logs:PutResourcePolicy",
                      "logs:DescribeResourcePolicies",
                      "logs:DescribeLogGroups"
                    ],
                    resources: ["*"]
                  },
                  {
                    actions: [
                      "states:StartExecution",
                      "states:DescribeExecution"
                    ],
                    resources: ["*"]
                  },
                  ...args.definition.getRoot().getPermissions()
                ]
              }).json
            }
          ]
        },
        { parent }
      );
    }
    function createStateMachine() {
      const root = args.definition.getRoot();
      root.assertStateNameUnique();
      root.assertStateNotReused();
      return new sfn.StateMachine(
        ...transform(
          args.transform?.stateMachine,
          `${name}StateMachine`,
          {
            type: type.apply((type2) => type2.toUpperCase()),
            definition: jsonStringify({
              StartAt: root.name,
              States: root.serialize()
            }),
            roleArn: role.arn,
            loggingConfiguration: all44([logging, logGroup]).apply(
              ([logging2, logGroup2]) => ({
                includeExecutionData: logging2?.includeData ?? false,
                level: (logging2?.level ?? "off").toUpperCase(),
                logDestination: interpolate37`${logGroup2?.arn}:*`
              })
            )
          },
          { parent }
        )
      );
    }
  }
  /**
   * The State Machine ARN.
   */
  get arn() {
    return this.stateMachine.arn;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Step Function State Machine resource.
       */
      stateMachine: this.stateMachine
    };
  }
  /**
   * A `Choice` state is used to conditionally continue to different states based
   * on the matched condition.
   *
   * @example
   * ```ts title="sst.config.ts"
   * const processPayment = sst.aws.StepFunctions.choice({ name: "ProcessPayment" });
   *
   * const makePayment = sst.aws.StepFunctions.lambdaInvoke({ name: "MakePayment" });
   * const sendReceipt = sst.aws.StepFunctions.lambdaInvoke({ name: "SendReceipt" });
   * const failure = sst.aws.StepFunctions.fail({ name: "Failure" });
   *
   * processPayment.when("{% $states.input.status === 'unpaid' %}", makePayment);
   * processPayment.when("{% $states.input.status === 'paid' %}", sendReceipt);
   * processPayment.otherwise(failure);
   * ```
   */
  static choice(args) {
    return new Choice(args);
  }
  /**
   * A `Fail` state is used to fail the execution of a state machine.
   *
   * @example
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.fail({ name: "Failure" });
   * ```
   */
  static fail(args) {
    return new Fail(args);
  }
  /**
   * A `Map` state is used to iterate over a list of items and execute a task for
   * each item.
   *
   * @example
   * ```ts title="sst.config.ts"
   * const processor = sst.aws.StepFunctions.lambdaInvoke({
   *   name: "Processor",
   *   function: "src/processor.handler"
   * });
   *
   * sst.aws.StepFunctions.map({
   *   processor,
   *   name: "Map",
   *   items: "{% $states.input.items %}"
   * });
   * ```
   */
  static map(args) {
    return new Map2(args);
  }
  /**
   * A `Parallel` state is used to execute multiple branches of a state in parallel.
   *
   * @example
   * ```ts title="sst.config.ts"
   * const processorA = sst.aws.StepFunctions.lambdaInvoke({
   *   name: "ProcessorA",
   *   function: "src/processorA.handler"
   * });
   *
   * const processorB = sst.aws.StepFunctions.lambdaInvoke({
   *   name: "ProcessorB",
   *   function: "src/processorB.handler"
   * });
   *
   * const parallel = sst.aws.StepFunctions.parallel({ name: "Parallel" });
   *
   * parallel.branch(processorA);
   * parallel.branch(processorB);
   * ```
   */
  static parallel(args) {
    return new Parallel(args);
  }
  /**
   * A `Pass` state is used to pass the input to the next state. It's useful for
   * transforming the input before passing it along.
   *
   * @example
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.pass({
   *   name: "Pass",
   *   output: "{% $states.input.message %}"
   * });
   * ```
   */
  static pass(args) {
    return new Pass(args);
  }
  /**
   * A `Succeed` state is used to indicate that the execution of a state machine
   * has succeeded.
   *
   * @example
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.succeed({ name: "Succeed" });
   * ```
   */
  static succeed(args) {
    return new Succeed(args);
  }
  /**
   * A `Wait` state is used to wait for a specific amount of time before continuing
   * to the next state.
   *
   * @example
   *
   * For example, wait for 10 seconds before continuing to the next state.
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.wait({
   *   name: "Wait",
   *   time: 10
   * });
   * ```
   *
   * Alternatively, you can wait until a specific timestamp.
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.wait({
   *   name: "Wait",
   *   timestamp: "2026-01-01T00:00:00Z"
   * });
   * ```
   */
  static wait(args) {
    return new Wait(args);
  }
  /**
   * A `Task` state can be used to make calls to AWS resources. We created a few
   * convenience methods for common tasks like:
   *
   * - `sst.aws.StepFunctions.lambdaInvoke` to invoke a Lambda function.
   * - `sst.aws.StepFunctions.ecsRunTask` to run an ECS task.
   * - `sst.aws.StepFunctions.eventBridgePutEvents` to send custom events to
   *   EventBridge.
   *
   * For everything else, you can use the `Task` state.
   *
   * @example
   *
   * For example, to start an AWS CodeBuild build.
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.task({
   *   name: "Task",
   *   resource: "arn:aws:states:::codebuild:startBuild",
   *   arguments: {
   *     projectName: "my-codebuild-project"
   *   },
   *   permissions: [
   *     {
   *       actions: ["codebuild:StartBuild"],
   *       resources: ["*"]
   *     }
   *   ]
   * });
   * ```
   */
  static task(args) {
    return new Task2(args);
  }
  /**
   * Create a `Task` state that invokes a Lambda function. [Learn more](https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html).
   *
   * @example
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.lambdaInvoke({
   *   name: "LambdaInvoke",
   *   function: "src/index.handler"
   * });
   * ```
   *
   * Customize the function.
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.lambdaInvoke({
   *   name: "LambdaInvoke",
   *   function: {
   *     handler: "src/index.handler"
   *     timeout: "60 seconds",
   *   }
   * });
   * ```
   *
   * Pass in an existing `Function` component.
   *
   * ```ts title="sst.config.ts"
   * const myLambda = new sst.aws.Function("MyLambda", {
   *   handler: "src/index.handler"
   * });
   *
   * sst.aws.StepFunctions.lambdaInvoke({
   *   name: "LambdaInvoke",
   *   function: myLambda
   * });
   * ```
   *
   * Or pass in the ARN of an existing Lambda function.
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.lambdaInvoke({
   *   name: "LambdaInvoke",
   *   function: "arn:aws:lambda:us-east-1:123456789012:function:my-function"
   * });
   * ```
   */
  static lambdaInvoke(args) {
    const fn = args.function instanceof Function ? args.function : functionBuilder(`${args.name}Function`, args.function, {});
    return new Task2({
      ...args,
      resource: "arn:aws:states:::lambda:invoke",
      arguments: {
        FunctionName: fn.arn,
        Payload: args.payload
      },
      permissions: [
        {
          actions: ["lambda:InvokeFunction"],
          resources: [fn.arn]
        }
      ]
    });
  }
  /**
   * Create a `Task` state that publishes a message to an SNS topic. [Learn more](https://docs.aws.amazon.com/sns/latest/api/API_Publish.html).
   *
   * @example
   * ```ts title="sst.config.ts"
   * const myTopic = new sst.aws.SnsTopic("MyTopic");
   *
   * sst.aws.StepFunctions.snsPublish({
   *   name: "SnsPublish",
   *   topic: myTopic,
   *   message: "Hello, world!"
   * });
   * ```
   */
  static snsPublish(args) {
    return new Task2({
      ...args,
      resource: "arn:aws:states:::sns:publish",
      arguments: {
        TopicArn: args.topic.arn,
        Message: args.message,
        MessageAttributes: args.messageAttributes,
        MessageDeduplicationId: args.messageDeduplicationId,
        MessageGroupId: args.messageGroupId,
        Subject: args.subject
      },
      permissions: [
        {
          actions: ["sns:Publish"],
          resources: [args.topic.arn]
        }
      ]
    });
  }
  /**
   * Create a `Task` state that sends a message to an SQS queue. [Learn more](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html).
   *
   * @example
   * ```ts title="sst.config.ts"
   * const myQueue = new sst.aws.Queue("MyQueue");
   *
   * sst.aws.StepFunctions.sqsSendMessage({
   *   name: "SqsSendMessage",
   *   queue: myQueue,
   *   messageBody: "Hello, world!"
   * });
   * ```
   */
  static sqsSendMessage(args) {
    return new Task2({
      ...args,
      resource: "arn:aws:states:::sqs:sendMessage",
      arguments: {
        QueueUrl: args.queue.url,
        MessageBody: args.messageBody,
        MessageAttributes: args.messageAttributes,
        MessageDeduplicationId: args.messageDeduplicationId,
        MessageGroupId: args.messageGroupId
      },
      permissions: [
        {
          actions: ["sqs:SendMessage"],
          resources: [args.queue.arn]
        }
      ]
    });
  }
  /**
   * Create a `Task` state that runs an ECS task using the [`Task`](/docs/component/aws/task) component. [Learn more](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html).
   *
   * @example
   * ```ts title="sst.config.ts"
   * const myCluster = new sst.aws.Cluster("MyCluster");
   * const myTask = new sst.aws.Task("MyTask", { cluster: myCluster });
   *
   * sst.aws.StepFunctions.ecsRunTask({
   *   name: "RunTask",
   *   task: myTask
   * });
   * ```
   */
  static ecsRunTask(args) {
    return new Task2({
      ...args,
      resource: "arn:aws:states:::ecs:runTask",
      arguments: {
        Cluster: args.task.cluster,
        TaskDefinition: args.task.taskDefinition,
        LaunchType: "FARGATE",
        NetworkConfiguration: {
          AwsvpcConfiguration: {
            Subnets: args.task.subnets,
            SecurityGroups: args.task.securityGroups,
            AssignPublicIp: args.task.assignPublicIp.apply(
              (v) => v ? "ENABLED" : "DISABLED"
            )
          }
        },
        Overrides: args.environment && all44([args.environment, args.task.containers]).apply(
          ([environment, containers]) => ({
            ContainerOverrides: containers.map((name) => ({
              Name: name,
              Environment: Object.entries(environment).map(
                ([name2, value]) => ({ Name: name2, Value: value })
              )
            }))
          })
        )
      },
      permissions: [
        {
          actions: ["ecs:RunTask"],
          resources: [args.task.nodes.taskDefinition.arn]
        },
        {
          actions: ["iam:PassRole"],
          resources: [
            args.task.nodes.executionRole.arn,
            args.task.nodes.taskRole.arn
          ]
        }
      ]
    });
  }
  /**
   * Create a `Task` state that sends custom events to one or more EventBridge buses
   * using the [`Bus`](/docs/component/aws/bus) component. [Learn more](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html).
   *
   * @example
   * ```ts title="sst.config.ts"
   * const myBus = new sst.aws.EventBus("MyBus");
   *
   * sst.aws.StepFunctions.eventBridgePutEvents({
   *   name: "EventBridgePutEvents",
   *   events: [
   *     {
   *       bus: myBus,
   *       source: "my-source"
   *     }
   *   ]
   * });
   * ```
   */
  static eventBridgePutEvents(args) {
    const busArns = output80(args.events).apply(
      (events) => all44(events.map((event) => event.bus.arn)).apply(
        (arns) => arns.filter((arn, index, self) => self.indexOf(arn) === index)
      )
    );
    return new Task2({
      ...args,
      resource: "arn:aws:states:::events:putEvents",
      arguments: {
        Entries: output80(args.events).apply(
          (events) => events.map((event) => ({
            EventBusName: event.bus.name,
            Source: event.source,
            DetailType: event.detailType,
            Detail: event.detail
          }))
        )
      },
      permissions: [
        {
          actions: ["events:PutEvents"],
          resources: busArns
        }
      ]
    });
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        arn: this.arn
      },
      include: [
        permission({
          actions: ["states:*"],
          resources: [
            this.arn,
            this.arn.apply(
              (arn) => `${arn.replace("stateMachine", "execution")}:*`
            )
          ]
        }),
        permission({
          actions: [
            "states:SendTaskSuccess",
            "states:SendTaskFailure",
            "states:SendTaskHeartbeat"
          ],
          resources: ["*"]
        })
      ]
    };
  }
};
var __pulumiType74 = "sst:aws:StepFunctions";
StepFunctions.__pulumiType = __pulumiType74;

// .sst/platform/src/components/aws/tan-stack-start.ts
import fs13 from "fs";
import path14 from "path";
var TanStackStart = class extends SsrSite {
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType75, name, args, opts);
  }
  normalizeBuildCommand() {
  }
  buildPlan(outputPath) {
    return outputPath.apply((outputPath2) => {
      const nitro = JSON.parse(
        fs13.readFileSync(
          path14.join(outputPath2, ".output", "nitro.json"),
          "utf-8"
        )
      );
      if (!["aws-lambda"].includes(nitro.preset)) {
        throw new VisibleError(
          `TanStackStart's app.config.ts must be configured to use the "aws-lambda" preset. It is currently set to "${nitro.preset}".`
        );
      }
      const serverOutputPath = path14.join(outputPath2, ".output", "server");
      let basepath;
      fs13.rmSync(path14.join(outputPath2, ".output", "public", "_server"), {
        recursive: true,
        force: true
      });
      fs13.rmSync(path14.join(outputPath2, ".output", "public", "api"), {
        recursive: true,
        force: true
      });
      return {
        base: basepath,
        server: {
          description: "Server handler for TanStack",
          handler: "index.handler",
          bundle: serverOutputPath,
          streaming: nitro?.config?.awsLambda?.streaming === true
        },
        assets: [
          {
            from: path14.join(".output", "public"),
            to: "",
            cached: true
          }
        ]
      };
    });
  }
  /**
   * The URL of the TanStack Start app.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
};
var __pulumiType75 = "sst:aws:TanstackStart";
TanStackStart.__pulumiType = __pulumiType75;

// .sst/platform/src/components/aws/nuxt.ts
import fs14 from "fs";
import path15 from "path";
var Nuxt = class extends SsrSite {
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType76, name, args, opts);
  }
  normalizeBuildCommand() {
  }
  buildPlan(outputPath) {
    return outputPath.apply((outputPath2) => {
      const basepath = fs14.readFileSync(path15.join(outputPath2, "nuxt.config.ts"), "utf-8").match(/baseURL: ['"](.*)['"]/)?.[1];
      return {
        base: basepath,
        server: {
          description: "Server handler for Nuxt",
          handler: "index.handler",
          bundle: path15.join(outputPath2, ".output", "server")
        },
        assets: [
          {
            from: path15.join(".output", "public"),
            to: "",
            cached: true
          }
        ]
      };
    });
  }
  /**
   * The URL of the Nuxt app.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
};
var __pulumiType76 = "sst:aws:Nuxt";
Nuxt.__pulumiType = __pulumiType76;

// .sst/platform/src/components/aws/static-site.ts
import fs16 from "fs";
import path17 from "path";
import crypto6 from "crypto";
import {
  all as all46,
  interpolate as interpolate38,
  output as output82
} from "@pulumi/pulumi";
import { globSync as globSync2 } from "glob";

// .sst/platform/src/components/base/base-static-site.ts
import fs15 from "fs";
import path16 from "path";
import { all as all45, output as output81 } from "@pulumi/pulumi";
function prepare(args) {
  const sitePath = normalizeSitePath();
  const environment = normalizeEnvironment();
  const indexPage = normalizeIndexPage();
  generateViteTypes();
  return {
    sitePath,
    environment,
    indexPage
  };
  function normalizeSitePath() {
    return output81(args.path).apply((sitePath2) => {
      if (!sitePath2) return ".";
      if (!fs15.existsSync(sitePath2)) {
        throw new VisibleError(`No site found at "${path16.resolve(sitePath2)}".`);
      }
      return sitePath2;
    });
  }
  function normalizeEnvironment() {
    return output81(args.environment).apply((environment2) => environment2 ?? {});
  }
  function normalizeIndexPage() {
    return output81(args.indexPage).apply(
      (indexPage2) => indexPage2 ?? "index.html"
    );
  }
  function generateViteTypes() {
    return all45([sitePath, args.vite, environment]).apply(
      ([sitePath2, vite, environment2]) => {
        let typesPath = vite?.types;
        if (!typesPath) {
          if (fs15.existsSync(path16.join(sitePath2, "vite.config.js")) || fs15.existsSync(path16.join(sitePath2, "vite.config.ts"))) {
            typesPath = "src/sst-env.d.ts";
          }
        }
        if (!typesPath) {
          return;
        }
        const filePath = path16.resolve(path16.join(sitePath2, typesPath));
        const content = `/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/// <reference types="vite/client" />
interface ImportMetaEnv {
${Object.keys(environment2).map((key) => `  readonly ${key}: string`).join("\n")}
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}`;
        const fileDir = path16.dirname(filePath);
        fs15.mkdirSync(fileDir, { recursive: true });
        fs15.writeFileSync(filePath, content);
      }
    );
  }
}
function buildApp2(parent, name, build, sitePath, environment) {
  if (!build) return sitePath;
  const result2 = siteBuilder(
    `${name}Builder`,
    {
      create: output81(build).command,
      update: output81(build).command,
      dir: output81(sitePath).apply(
        (sitePath2) => path16.join(define_cli_default.paths.root, sitePath2)
      ),
      environment,
      triggers: [Date.now().toString()]
    },
    {
      parent,
      ignoreChanges: process.env.SKIP ? ["*"] : void 0
    }
  );
  return all45([sitePath, build, result2.id]).apply(([sitePath2, build2, _]) => {
    const outputPath = path16.join(sitePath2, build2.output);
    if (!fs15.existsSync(outputPath)) {
      throw new VisibleError(
        `No build output found at "${path16.resolve(outputPath)}".`
      );
    }
    return outputPath;
  });
}

// .sst/platform/src/components/aws/static-site.ts
import { cloudfront as cloudfront5, getRegionOutput as getRegionOutput9, s3 as s38 } from "@pulumi/aws";
var StaticSite = class extends Component {
  cdn;
  bucket;
  devUrl;
  prodUrl;
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType77, name, args, opts);
    const self = this;
    validateDeprecatedProps();
    const { sitePath, environment, indexPage } = prepare(args);
    const dev = normalizeDev();
    if (dev.enabled) {
      this.devUrl = dev.url;
      this.registerOutputs({
        _metadata: {
          mode: "placeholder",
          path: sitePath,
          environment,
          url: this.url
        },
        _dev: dev.outputs
      });
      return;
    }
    const route = normalizeRoute();
    const errorPage = normalizeErrorPage();
    const assets = normalizeAsssets();
    const outputPath = buildApp2(self, name, args.build, sitePath, environment);
    const bucket = createBucket();
    const { bucketName, bucketDomain } = getBucketDetails();
    const assetsUploaded = uploadAssets();
    const kvNamespace = buildKvNamespace2();
    let distribution;
    let distributionId;
    let kvStoreArn;
    let invalidationDependsOn = [];
    let prodUrl;
    if (route) {
      kvStoreArn = route.routerKvStoreArn;
      distributionId = route.routerDistributionId;
      invalidationDependsOn = [updateRouterKvRoutes()];
      prodUrl = route.routerUrl;
    } else {
      kvStoreArn = createRequestKvStore();
      distribution = createDistribution();
      distributionId = distribution.nodes.distribution.id;
      prodUrl = distribution.domainUrl.apply(
        (domainUrl) => output82(domainUrl ?? distribution.url)
      );
    }
    const kvUpdated = createKvEntries();
    createInvalidation();
    this.bucket = bucket;
    this.cdn = distribution;
    this.prodUrl = prodUrl;
    this.registerOutputs({
      _hint: this.url,
      _metadata: {
        mode: "deployed",
        path: sitePath,
        environment,
        url: this.url
      },
      _dev: dev.outputs
    });
    function validateDeprecatedProps() {
      if (args.base !== void 0)
        throw new VisibleError(
          `"base" prop is deprecated. Use the "route.path" prop instead to set the base path of the site.`
        );
      if (args.cdn !== void 0)
        throw new VisibleError(
          `"cdn" prop is deprecated. Use the "route.router" prop instead to use an existing "Router" component to serve your site.`
        );
    }
    function normalizeRoute() {
      const route2 = normalizeRouteArgs(args.router, args.route);
      if (route2) {
        if (args.domain)
          throw new VisibleError(
            `Cannot provide both "domain" and "route". Use the "domain" prop on the "Router" component when serving your site through a Router.`
          );
        if (args.edge)
          throw new VisibleError(
            `Cannot provide both "edge" and "route". Use the "edge" prop on the "Router" component when serving your site through a Router.`
          );
      }
      return route2;
    }
    function normalizeDev() {
      const enabled = false;
      const devArgs = args.dev || {};
      return {
        enabled,
        url: output82(devArgs.url ?? URL_UNAVAILABLE),
        outputs: {
          title: devArgs.title,
          environment,
          command: output82(devArgs.command ?? "npm run dev"),
          autostart: output82(devArgs.autostart ?? true),
          directory: output82(devArgs.directory ?? sitePath)
        }
      };
    }
    function normalizeErrorPage() {
      return all46([indexPage, args.errorPage]).apply(
        ([indexPage2, errorPage2]) => {
          return "/" + (errorPage2 ?? indexPage2).replace(/^\//, "");
        }
      );
    }
    function normalizeAsssets() {
      return {
        ...args.assets,
        // remove leading and trailing slashes from the path
        path: args.assets?.path ? output82(args.assets?.path).apply(
          (v) => v.replace(/^\//, "").replace(/\/$/, "")
        ) : void 0,
        purge: output82(args.assets?.purge ?? true),
        // normalize to /path format
        routes: args.assets?.routes ? output82(args.assets?.routes).apply(
          (v) => v.map(
            (route2) => "/" + route2.replace(/^\//, "").replace(/\/$/, "")
          )
        ) : []
      };
    }
    function createBucket() {
      if (assets.bucket) return;
      return new Bucket(
        ...transform(
          args.transform?.assets,
          `${name}Assets`,
          { access: "cloudfront" },
          { parent: self, retainOnDelete: false }
        )
      );
    }
    function getBucketDetails() {
      const s3Bucket = bucket ? bucket.nodes.bucket : s38.BucketV2.get(`${name}Assets`, assets.bucket, void 0, {
        parent: self
      });
      return {
        bucketName: s3Bucket.bucket,
        bucketDomain: s3Bucket.bucketRegionalDomainName
      };
    }
    function uploadAssets() {
      return all46([outputPath, assets, route]).apply(
        async ([outputPath2, assets2, route2]) => {
          const bucketFiles = [];
          const fileOptions = assets2?.fileOptions ?? [
            {
              files: "**",
              cacheControl: "max-age=31536000,public,immutable"
            },
            {
              files: "**/*.html",
              cacheControl: "max-age=0,no-cache,no-store,must-revalidate"
            }
          ];
          const filesProcessed = [];
          for (const fileOption of fileOptions.reverse()) {
            const files = globSync2(fileOption.files, {
              cwd: path17.resolve(outputPath2),
              nodir: true,
              dot: true,
              ignore: [
                ".sst/**",
                ...typeof fileOption.ignore === "string" ? [fileOption.ignore] : fileOption.ignore ?? []
              ]
            }).filter((file) => !filesProcessed.includes(file));
            bucketFiles.push(
              ...await Promise.all(
                files.map(async (file) => {
                  const source = path17.resolve(outputPath2, file);
                  const content = await fs16.promises.readFile(source, "utf-8");
                  const hash = crypto6.createHash("sha256").update(content).digest("hex");
                  return {
                    source,
                    key: toPosix(
                      path17.join(
                        assets2.path ?? "",
                        route2?.pathPrefix?.replace(/^\//, "") ?? "",
                        file
                      )
                    ),
                    hash,
                    cacheControl: fileOption.cacheControl,
                    contentType: fileOption.contentType ?? getContentType(file, "UTF-8")
                  };
                })
              )
            );
            filesProcessed.push(...files);
          }
          return new BucketFiles(
            `${name}AssetFiles`,
            {
              bucketName,
              files: bucketFiles,
              purge: assets2.purge,
              region: getRegionOutput9(void 0, { parent: self }).name
            },
            { parent: self }
          );
        }
      );
    }
    function buildKvNamespace2() {
      return crypto6.createHash("md5").update(`${define_app_default.name}-${define_app_default.stage}-${name}`).digest("hex").substring(0, 4);
    }
    function createKvEntries() {
      const entries = all46([
        outputPath,
        assets,
        bucketDomain,
        errorPage,
        route
      ]).apply(async ([outputPath2, assets2, bucketDomain2, errorPage2, route2]) => {
        const kvEntries = {};
        const dirs = [];
        const expandDirs = [".well-known"];
        const processDir = (childPath = "", level = 0) => {
          const currentPath = path17.join(outputPath2, childPath);
          fs16.readdirSync(currentPath, { withFileTypes: true }).forEach(
            (item) => {
              if (item.isFile()) {
                kvEntries[toPosix(path17.join("/", childPath, item.name))] = "s3";
                return;
              }
              if (level === 0 && expandDirs.includes(item.name)) {
                processDir(path17.join(childPath, item.name), level + 1);
                return;
              }
              dirs.push(toPosix(path17.join("/", childPath, item.name)));
            }
          );
        };
        processDir();
        kvEntries["metadata"] = JSON.stringify({
          base: route2?.pathPrefix === "/" ? void 0 : route2?.pathPrefix,
          custom404: errorPage2,
          s3: {
            domain: bucketDomain2,
            dir: assets2.path ? "/" + assets2.path : "",
            routes: [...assets2.routes, ...dirs]
          }
        });
        return kvEntries;
      });
      return new KvKeys(
        `${name}KvKeys`,
        {
          store: kvStoreArn,
          namespace: kvNamespace,
          entries,
          purge: assets.purge
        },
        { parent: self }
      );
    }
    function updateRouterKvRoutes() {
      return new KvRoutesUpdate(
        `${name}RoutesUpdate`,
        {
          store: route.routerKvStoreArn,
          namespace: route.routerKvNamespace,
          key: "routes",
          entry: route.apply(
            (route2) => ["site", kvNamespace, route2.hostPattern, route2.pathPrefix].join(
              ","
            )
          )
        },
        { parent: self }
      );
    }
    function createRequestKvStore() {
      return output82(args.edge).apply((edge) => {
        const viewerRequest = edge?.viewerRequest;
        if (viewerRequest?.kvStore) return output82(viewerRequest?.kvStore);
        return new cloudfront5.KeyValueStore(
          `${name}KvStore`,
          {},
          { parent: self }
        ).arn;
      });
    }
    function createRequestFunction() {
      return output82(args.edge).apply((edge) => {
        const userInjection = edge?.viewerRequest?.injection ?? "";
        const blockCloudfrontUrlInjection = args.domain ? CF_BLOCK_CLOUDFRONT_URL_INJECTION : "";
        return new cloudfront5.Function(
          `${name}CloudfrontFunctionRequest`,
          {
            runtime: "cloudfront-js-2.0",
            keyValueStoreAssociations: kvStoreArn ? [kvStoreArn] : [],
            code: interpolate38`
import cf from "cloudfront";
async function handler(event) {
  ${userInjection}
  ${blockCloudfrontUrlInjection}
  ${CF_ROUTER_INJECTION}

  const kvNamespace = "${kvNamespace}";

  // Load metadata
  let metadata;
  try {
    const v = await cf.kvs().get(kvNamespace + ":metadata");
    metadata = JSON.parse(v);
  } catch (e) {}

  await routeSite(kvNamespace, metadata);
  return event.request;
}`
          },
          { parent: self }
        );
      });
    }
    function createResponseFunction() {
      return output82(args.edge).apply((edge) => {
        const userConfig = edge?.viewerResponse;
        const userInjection = userConfig?.injection;
        const kvStoreArn2 = userConfig?.kvStore ?? userConfig?.kvStores?.[0];
        if (!userInjection) return;
        return new cloudfront5.Function(
          `${name}CloudfrontFunctionResponse`,
          {
            runtime: "cloudfront-js-2.0",
            keyValueStoreAssociations: kvStoreArn2 ? [kvStoreArn2] : [],
            code: `
import cf from "cloudfront";
async function handler(event) {
  ${userInjection}
  return event.response;
}`
          },
          { parent: self }
        );
      });
    }
    function createDistribution() {
      return new Cdn(
        ...transform(
          args.transform?.cdn,
          `${name}Cdn`,
          {
            comment: `${name} site`,
            domain: args.domain,
            origins: [
              {
                originId: "default",
                domainName: "placeholder.sst.dev",
                customOriginConfig: {
                  httpPort: 80,
                  httpsPort: 443,
                  originProtocolPolicy: "https-only",
                  originReadTimeout: 20,
                  originSslProtocols: ["TLSv1.2"]
                }
              }
            ],
            defaultCacheBehavior: {
              targetOriginId: "default",
              viewerProtocolPolicy: "redirect-to-https",
              allowedMethods: [
                "DELETE",
                "GET",
                "HEAD",
                "OPTIONS",
                "PATCH",
                "POST",
                "PUT"
              ],
              cachedMethods: ["GET", "HEAD"],
              compress: true,
              // CloudFront's managed CachingOptimized policy
              cachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6",
              functionAssociations: all46([
                createRequestFunction(),
                createResponseFunction()
              ]).apply(([reqFn, resFn]) => [
                { eventType: "viewer-request", functionArn: reqFn.arn },
                ...resFn ? [{ eventType: "viewer-response", functionArn: resFn.arn }] : []
              ])
            }
          },
          { parent: self }
        )
      );
    }
    function createInvalidation() {
      all46([outputPath, args.assets, args.invalidation]).apply(
        ([outputPath2, assets2, invalidationRaw]) => {
          if (invalidationRaw === false) return;
          const invalidation = {
            wait: false,
            paths: "all",
            ...invalidationRaw
          };
          const invalidationPaths = invalidation.paths === "all" ? ["/*"] : invalidation.paths;
          if (invalidationPaths.length === 0) return;
          const hash = crypto6.createHash("md5");
          hash.update(JSON.stringify(assets2 ?? {}));
          globSync2("**", {
            dot: true,
            nodir: true,
            follow: true,
            cwd: path17.resolve(outputPath2)
          }).forEach(
            (filePath) => hash.update(
              fs16.readFileSync(path17.resolve(outputPath2, filePath), "utf-8")
            )
          );
          new DistributionInvalidation(
            `${name}Invalidation`,
            {
              distributionId,
              paths: invalidationPaths,
              version: hash.digest("hex"),
              wait: invalidation.wait
            },
            {
              parent: self,
              dependsOn: [assetsUploaded, kvUpdated, ...invalidationDependsOn]
            }
          );
        }
      );
    }
  }
  /**
   * The URL of the website.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return all46([this.prodUrl, this.devUrl]).apply(
      ([prodUrl, devUrl]) => prodUrl ?? devUrl
    );
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Amazon S3 Bucket that stores the assets.
       */
      assets: this.bucket,
      /**
       * The Amazon CloudFront CDN that serves the site.
       */
      cdn: this.cdn
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        url: this.url
      }
    };
  }
};
var __pulumiType77 = "sst:aws:StaticSite";
StaticSite.__pulumiType = __pulumiType77;

// .sst/platform/src/components/aws/svelte-kit.ts
import fs17 from "fs";
import path18 from "path";
var SvelteKit = class extends SsrSite {
  constructor(name, args = {}, opts = {}) {
    super(__pulumiType78, name, args, opts);
  }
  normalizeBuildCommand() {
  }
  buildPlan(outputPath) {
    return outputPath.apply((outputPath2) => {
      const serverOutputPath = path18.join(
        outputPath2,
        ".svelte-kit",
        "svelte-kit-sst",
        "server"
      );
      let basepath;
      try {
        const manifest = fs17.readFileSync(path18.join(serverOutputPath, "manifest.js")).toString();
        const appDir = manifest.match(/appDir: "(.+?)"/)?.[1];
        const appPath = manifest.match(/appPath: "(.+?)"/)?.[1];
        if (appDir && appPath && appPath.endsWith(appDir)) {
          basepath = appPath.substring(0, appPath.length - appDir.length);
        }
      } catch (e) {
      }
      return {
        base: basepath,
        server: {
          handler: path18.join(
            serverOutputPath,
            "lambda-handler",
            "index.handler"
          ),
          nodejs: {
            esbuild: {
              minify: process.env.SST_DEBUG ? false : true,
              sourcemap: process.env.SST_DEBUG ? "inline" : false,
              define: {
                "process.env.SST_DEBUG": process.env.SST_DEBUG ? "true" : "false"
              }
            }
          },
          copyFiles: [
            {
              from: path18.join(
                outputPath2,
                ".svelte-kit",
                "svelte-kit-sst",
                "prerendered"
              ),
              to: "prerendered"
            }
          ]
        },
        assets: [
          {
            from: path18.join(".svelte-kit", "svelte-kit-sst", "client"),
            to: "",
            cached: true,
            versionedSubDir: "_app"
          },
          {
            from: path18.join(".svelte-kit", "svelte-kit-sst", "prerendered"),
            to: "",
            cached: false
          }
        ]
      };
    });
  }
  /**
   * The URL of the SvelteKit app.
   *
   * If the `domain` is set, this is the URL with the custom domain.
   * Otherwise, it's the auto-generated CloudFront URL.
   */
  get url() {
    return super.url;
  }
};
var __pulumiType78 = "sst:aws:SvelteKit";
SvelteKit.__pulumiType = __pulumiType78;

// .sst/platform/src/components/aws/vector.ts
import path19 from "path";

// .sst/platform/src/components/aws/providers/vector-table.ts
import { dynamic as dynamic10 } from "@pulumi/pulumi";
var VectorTable = class extends dynamic10.Resource {
  constructor(name, args, opts) {
    super(
      new rpc.Provider("Aws.VectorTable"),
      `${name}.sst.aws.VectorTable`,
      args,
      opts
    );
  }
};

// .sst/platform/src/components/aws/vector.ts
var Vector = class _Vector extends Component {
  postgres;
  queryHandler;
  putHandler;
  removeHandler;
  constructor(name, args, opts) {
    super(__pulumiType79, name, args, opts);
    const parent = this;
    const tableName = normalizeTableName();
    let postgres;
    if (args && "ref" in args) {
      const ref = args;
      postgres = ref.postgres;
    } else {
      postgres = createDB();
      createDBTable();
    }
    const queryHandler = createQueryHandler();
    const putHandler = createPutHandler();
    const removeHandler = createRemoveHandler();
    this.postgres = postgres;
    this.queryHandler = queryHandler;
    this.putHandler = putHandler;
    this.removeHandler = removeHandler;
    function normalizeTableName() {
      return "embeddings";
    }
    function createDB() {
      return new Postgres(
        ...transform(
          args?.transform?.postgres,
          `${name}Database`,
          { vpc: "default" },
          { parent }
        )
      );
    }
    function createDBTable() {
      new VectorTable(
        `${name}Table`,
        {
          clusterArn: postgres.nodes.cluster.arn,
          secretArn: postgres.nodes.cluster.masterUserSecrets[0].secretArn,
          databaseName: postgres.database,
          tableName,
          dimension: args.dimension
        },
        { parent, dependsOn: postgres.nodes.instance }
      );
    }
    function createQueryHandler() {
      return new Function(
        `${name}Query`,
        {
          description: `${name} query handler`,
          bundle: useBundlePath(),
          handler: "index.query",
          environment: useHandlerEnvironment(),
          permissions: useHandlerPermissions(),
          dev: false
        },
        { parent }
      );
    }
    function createPutHandler() {
      return new Function(
        `${name}Put`,
        {
          description: `${name} put handler`,
          bundle: useBundlePath(),
          handler: "index.put",
          environment: useHandlerEnvironment(),
          permissions: useHandlerPermissions(),
          dev: false
        },
        { parent }
      );
    }
    function createRemoveHandler() {
      return new Function(
        `${name}Remove`,
        {
          description: `${name} remove handler`,
          bundle: useBundlePath(),
          handler: "index.remove",
          environment: useHandlerEnvironment(),
          permissions: useHandlerPermissions(),
          dev: false
        },
        { parent }
      );
    }
    function useBundlePath() {
      return path19.join(define_cli_default.paths.platform, "dist", "vector-handler");
    }
    function useHandlerEnvironment() {
      return {
        CLUSTER_ARN: postgres.nodes.cluster.arn,
        SECRET_ARN: postgres.nodes.cluster.masterUserSecrets[0].secretArn,
        DATABASE_NAME: postgres.database,
        TABLE_NAME: tableName
      };
    }
    function useHandlerPermissions() {
      return [
        {
          actions: ["secretsmanager:GetSecretValue"],
          resources: [postgres.nodes.cluster.masterUserSecrets[0].secretArn]
        },
        {
          actions: ["rds-data:ExecuteStatement"],
          resources: [postgres.nodes.cluster.arn]
        }
      ];
    }
  }
  /**
   * Reference an existing Vector database with the given name. This is useful when you
   * create a Vector database in one stage and want to share it in another. It avoids having to
   * create a new Vector database in the other stage.
   *
   * :::tip
   * You can use the `static get` method to share Vector databases across stages.
   * :::
   *
   * @param name The name of the component.
   * @param clusterID The RDS cluster id of the existing Vector database.
   *
   * @example
   * Imagine you create a vector database  in the `dev` stage. And in your personal stage `frank`,
   * instead of creating a new database, you want to share the same database from `dev`.
   *
   * ```ts title="sst.config.ts"
   * const vector = $app.stage === "frank"
   *   ? sst.aws.Vector.get("MyVectorDB", "app-dev-myvectordb")
   *   : new sst.aws.Vector("MyVectorDB", {
   *       dimension: 1536
   *     });
   * ```
   *
   * Here `app-dev-myvectordb` is the ID of the underlying Postgres cluster created in the `dev` stage.
   * You can find this by outputting the cluster ID in the `dev` stage.
   *
   * ```ts title="sst.config.ts"
   * return {
   *   cluster: vector.clusterID
   * };
   * ```
   *
   * :::note
   * The Vector component creates a Postgres cluster and lambda functions for interfacing with the VectorDB.
   * The `static get` method only shares the underlying Postgres cluster. Each stage will have its own
   * lambda functions.
   * :::
   */
  static get(name, clusterID) {
    const postgres = Postgres.get(`${name}Database`, clusterID);
    return new _Vector(name, {
      ref: true,
      postgres
    });
  }
  /**
   * The ID of the RDS Postgres Cluster.
   */
  get clusterID() {
    return this.postgres.nodes.cluster.id;
  }
  /**
   * The underlying [resources](/docs/components/#nodes) this component creates.
   */
  get nodes() {
    return {
      /**
       * The Postgres database.
       */
      postgres: this.postgres
    };
  }
  /** @internal */
  getSSTLink() {
    return {
      properties: {
        /** @internal */
        queryFunction: this.queryHandler.name,
        /** @internal */
        putFunction: this.putHandler.name,
        /** @internal */
        removeFunction: this.removeHandler.name
      },
      include: [
        permission({
          actions: ["lambda:InvokeFunction"],
          resources: [
            this.queryHandler.nodes.function.arn,
            this.putHandler.nodes.function.arn,
            this.removeHandler.nodes.function.arn
          ]
        })
      ]
    };
  }
};
var __pulumiType79 = "sst:aws:Vector";
Vector.__pulumiType = __pulumiType79;

// .sst/platform/src/components/aws/iam-edit.ts
import { jsonStringify as jsonStringify14, output as output83 } from "@pulumi/pulumi";
import { iam as iam21 } from "@pulumi/aws";
function iamEdit(policy, cb) {
  return output83(policy).apply((v) => {
    const json = typeof v === "string" ? JSON.parse(v) : v;
    cb(json);
    return iam21.getPolicyDocumentOutput({
      sourcePolicyDocuments: [jsonStringify14(json)]
    }).json;
  });
}

// .sst/platform/src/components/index.ts
var linkable3 = Link.linkable;

// sst.config.ts
var sst_config_default = $config({
  app(input) {
    return {
      name: "budget-dev",
      home: "aws",
      removal: input?.stage === "production" ? "retain" : "remove"
    };
  },
  async run() {
    const userPool = new aws_exports.CognitoUserPool("MyUserPool", {
      triggers: {
        preSignUp: {
          handler: "functions/preSignUp.main"
        }
      }
    });
    const client = userPool.addClient("Web");
    const identityPool = new aws_exports.CognitoIdentityPool("MyIdentityPool", {
      userPools: [{ userPool: userPool.id, client: client.id }]
    });
    const prefix = `/identity/${define_app_default.name}/${define_app_default.stage}`;
    new aws2.ssm.Parameter("CognitoUserPoolIdParam", {
      name: `${prefix}/COGNITO_USER_POOL_ID`,
      type: "String",
      value: userPool.id,
      overwrite: true
    });
    new aws2.ssm.Parameter("CognitoUserPoolIdParam", {
      name: `${prefix}/COGNITO_USER_POOL_ID`,
      type: "String",
      value: userPool.id,
      overwrite: true
    });
    new aws2.ssm.Parameter("CognitoUserPoolArnParam", {
      name: `${prefix}/COGNITO_USER_POOL_ARN`,
      type: "String",
      value: userPool.arn,
      overwrite: true
    });
    new aws2.ssm.Parameter("CognitoClientIdParam", {
      name: `${prefix}/COGNITO_CLIENT_ID`,
      type: "String",
      value: client.id,
      overwrite: true
    });
    new aws2.ssm.Parameter("CognitoIdentityPoolIdParam", {
      name: `${prefix}/COGNITO_IDENTITY_POOL_ID`,
      type: "String",
      value: identityPool.id,
      overwrite: true
    });
    return {
      UserPool: userPool.id,
      Client: client.id,
      IdentityPool: identityPool.id
    };
  }
});

// eval.ts
var result = await run(sst_config_default.run);
var eval_default = result;
export {
  eval_default as default
};
//# sourceMappingURL=sst.config.1757833804099.mjs.map

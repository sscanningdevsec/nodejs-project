var config_local = {
  db: {
    server: "postgres://postgres:postgres@127.0.0.1",
    database: "vulnerablenode"
  },
  apiKey: "AIzaSyB9P-L4XaCyZtVbLX-ZByVrQF8-ULy9EVe", // API Key
  privateKey: `-----BEGIN PRIVATE KEY-----MIIEvQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBALnXzI4Ub2mJg12oe0QdJphlhB/tiJEVfMbqwyUm7Z9Exx7/KIfE7Rxl4RT3HukwNKKRMpkA27Cpb0bPYDL7zfsYYBdplZTRn7StNhPypElSMUtdpyL6FwnUHU82Y+fSx7v2E6gjXk3vQ/EWG9cA3w0N3rRIiGtQywWVIZp6FFrXAgMBAAECgYBpYZz9wZg8KdI+3QUxIb1+xCQLKcdXZETFn9K2+4MfFxrG94byz+EFPh+oj6BmCNwG/9OsC+nctP8JOU/mqymUsF9x3D7Xc/svIrDHyD+xeL6Z/Jr4KjBVLoQv9cDjaTxWkNjK42uAMse5z8Mg7Bp3u6DqTxZ9kHv+jhGeSMm7oQJBAOOU+ggRLN5jdzTCZ5ZZq7yyKbZZXEvZN7AdE2EdFi0n2q+YbNklCvBp8X6HFDzT07ygG9EvCuNdS6hCgqY6dN8CQQDP8qghu/O72FDK6iFYW4OHZ5wjjNQmjG6JHRukHbzGLniHPFxlPlsFBWArE4J/GfxxHpWLRD5WX4e0tkNZfIk5AkEAzWws44E+ZTnAl+UXHzFSX/wfwR93Wvo97MI36jf1oX6cv/EH5gygTFG+SHZeLdcAvPKPG0iJ9YKPczJ1fJZtAQJABsN9HzSvz9gmL24Ic3UXeBXeJBgHZ3Ku+XxoIyk4vwogP/Bp4dDVa1YeDqIAtFwL2T9CbH1FTI1LXxAr9Ow3QwJBAIbL/QaVHaW1WRGnF5IoPmMbV5InGYUl/FXPdFGV5aAsJDOB6lpI83wXhWjD1OBW8XvmTpOk3+0zzQd7OBZr6fo=-----END PRIVATE KEY-----
` // Private Encryption Key
};


var config_devel = {
    // Customer module configs
    "db": {
        "server": "postgres://postgres:postgres@10.211.55.70",
        "database": "vulnerablenode"
    }
}

var config_docker = {
    // Customer module configs
    "db": {
        "server": "postgres://postgres:postgres@postgres_db",
        "database": "vulnerablenode"
    },
	apiKey: "SK1234567890abcdef1234567890abcdef123456"
}

// Select correct config
var config = null;

switch (process.env.STAGE){
    case "DOCKER":
        config = config_docker;
        break;

    case "LOCAL":
        config = config_local;
        break;

    case "DEVEL":
        config = config_devel;
        break;

    default:
        config = config_devel;
}

// Build connection string
config.db.connectionString = config.db.server + "/" + config.db.database

module.exports = config;

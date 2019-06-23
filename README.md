# hexchainiot

Deploy

1. PostgreSQL

```
cd postgresql/
kubectl apply -f postgresql-secret.yml
kubectl apply -f postgresql-volumeclaim.yaml
kubectl apply -f postgresql-deployment.yml
kubectl apply -f postgresql-service.yml
```

2. Nginx Ingress

```
cd nginx-ingress/
kubectl apply -f mandatory.yml
kubectl apply -f cloud-generic.yml
```

3. Cert Manager

```
cd ../cert-manager/
kubectl apply -f namespace.yaml
kubectl apply -f 00-crds.yaml
kubectl apply -f cert-manager.yaml
kubectl apply -f le-prod-issuer.yaml
```

4. Graphql Server

```
cd ../graphql-server/
kubectl apply -f secret.yml
kubectl apply -f deployment-service.yml
kubectl apply -f ingress.yaml
```

```
CREATE TABLE blocks (
  id                UUID        NOT NULL DEFAULT gen_random_uuid(),
  block_num         INTEGER     NOT NULL,
  block_id          TEXT        NOT NULL,
  state_root_hash   TEXT        NOT NULL,
  address           TEXT        NOT NULL,
  value             JSONB       NOT NULL,
  PRIMARY KEY (id)
);
```

```
CREATE OR REPLACE VIEW "public"."blocks_view_by_value" AS
 SELECT
    blocks.id,
    blocks.block_id,
    blocks.address,
    blocks.block_num,
    blocks.state_root_hash,
    (blocks.value ->> 'timestamp'::text) AS "timestamp",
    (blocks.value ->> 'temperature'::text) AS "temperature",
    (blocks.value ->> 'humidity'::text) AS "humidity"

FROM blocks;
```

5. Sawtooth K8s single node

```
cd ../sawtooth/k8s-single/
kubectl apply -f deployment.yml
```
